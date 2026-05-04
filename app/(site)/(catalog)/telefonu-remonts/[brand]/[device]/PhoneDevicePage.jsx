import Script from 'next/script';
import { notFound } from 'next/navigation';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import PriceList from '@sections/pricing/PriceList';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import { FAQ_CONTEXT, getFaqItems, getFaqLd } from '@/data/faq';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
  buildStandardRepairHowToLd,
} from '@/lib/seo/jsonldHelpers';

import { db } from '@/lib/firebaseAdmin';

import s from '@/app/(site)/(catalog)/telefonu-remonts/[brand]/[device]/Device.module.scss';

export const revalidate = 0;

const DEFAULT_CURRENCY = 'EUR';
const PHONE_CATEGORY_KEY = 'telefonu-remonts';

function norm(value = '') {
  return decodeURIComponent(String(value)).trim();
}

function pickLocalizedField(value, locale = 'lv', fallback = 'lv') {
  if (!value) return '';

  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'object') {
    if (typeof value[locale] === 'string' && value[locale].trim()) {
      return value[locale].trim();
    }
    if (typeof value[fallback] === 'string' && value[fallback].trim()) {
      return value[fallback].trim();
    }
  }

  return '';
}

function slugifyBrandKey(value = '') {
  return String(value).trim().toLowerCase();
}

async function getPhoneDeviceBySlug(brandSlug, slug) {
  const normalizedBrand = norm(brandSlug);
  const normalizedSlug = norm(slug);

  const directSnap = await db
    .collection('devices')
    .where('slug', '==', normalizedSlug)
    .where('categoryKey', '==', PHONE_CATEGORY_KEY)
    .where('brandKey', '==', normalizedBrand)
    .limit(1)
    .get();

  if (!directSnap.empty) {
    const doc = directSnap.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  const fallbackSnap = await db
    .collection('devices')
    .where('slug', '==', normalizedSlug)
    .where('categoryKey', '==', PHONE_CATEGORY_KEY)
    .limit(10)
    .get();

  if (fallbackSnap.empty) return null;

  const match =
    fallbackSnap.docs.find((doc) => {
      const data = doc.data() || {};
      const candidates = [
        data.brandKey,
        data.brandSlug,
        data.brandId,
        data.brand,
      ]
        .filter(Boolean)
        .map((v) => slugifyBrandKey(v));

      return candidates.includes(slugifyBrandKey(normalizedBrand));
    }) || null;

  if (!match) return null;

  return {
    id: match.id,
    ...match.data(),
  };
}

async function getServicesByCategory(categoryId) {
  const snap = await db
    .collection('services')
    .where('categoryId', '==', categoryId)
    .get();

  return snap.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((service) => service?.isActive !== false);
}

async function getServicePricingByModel(modelId) {
  const snap = await db
    .collection('servicePricing')
    .where('modelId', '==', modelId)
    .get();

  return snap.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((row) => row?.isActive !== false);
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      canonicalCategoryPath: '/ru/remont-telefonov',
      homeCrumb: 'Главная',
      categoryCrumb: 'Ремонт телефонов',
      faqTitle: 'Часто задаваемые вопросы',
      priceTitle: 'Цены и сроки ремонта',
      heroAltSuffix: 'ремонт',
      servicesTitle: (name) => `Популярные ремонты ${name ?? 'этой модели'}`,
      serviceLdName: (name) => `Ремонт ${name}`,
      brandCrumb: (brandLabel) => `Ремонт телефонов ${brandLabel}`,
      modelCrumb: (name) => `Ремонт ${name}`,
      metaFallbackTitle: (brandLabel) => `Ремонт телефонов ${brandLabel} | iLab`,
      metaFallbackDescriptionModel: (name) =>
        `Ремонт ${name} в Риге: замена экрана, батареи, ремонт разъёма зарядки, камеры и другие неисправности. Быстрая диагностика, понятные цены и гарантия.`,
      metaFallbackDescriptionCategory:
        'Ремонт телефонов: замена экрана, батареи, разъёма зарядки, камеры и устранение других неисправностей. Быстрая диагностика и гарантия в сервисе iLab в Риге.',
      serviceTypeSuffix: 'ремонт',
      howToName: 'Ремонт телефона',
      defaultHeaderTitle: 'Ремонт телефона',
      defaultHeaderLead:
        'Ремонт телефонов в Риге - замена экрана, аккумулятора, камеры и разъёма зарядки с быстрой диагностикой, качественными деталями и гарантией 90 дней.',
      pricesCtaLabel: 'Смотреть цены',
      services: (categoryPath) => [
        {
          title: 'Замена экрана',
          href: `${categoryPath}/zamena-ekrana`,
          text: 'трещины, полосы, тёмные пятна, не работает сенсор.',
          icon: LuSmartphone,
        },
        {
          title: 'Замена аккумулятора',
          href: `${categoryPath}/zamena-batarei`,
          text: 'быстро падает заряд, телефон выключается на 10–20%.',
          icon: LuBatteryCharging,
        },
        {
          title: 'Замена разъёма зарядки',
          href: `${categoryPath}/remont-razema-zaryadki`,
          text: 'кабель не держится, зарядка медленная или нестабильная.',
          icon: LuPlugZap,
        },
        {
          title: 'Ремонт камеры',
          href: `${categoryPath}/remont-kamery`,
          text: 'размытые фото, чёрные пятна, проблемы с фокусировкой.',
          icon: LuCamera,
        },
        {
          title: 'Ремонт динамика и микрофона',
          href: `${categoryPath}/remont-dinamika-i-mikrofona`,
          text: 'тихий звук, хрипы, во время звонка не слышно вас или собеседника.',
          icon: LuVolume2,
        },
        {
          title: 'Ремонт после попадания влаги',
          href: `${categoryPath}/remont-posle-popadaniya-vlagi`,
          text: 'диагностика и восстановление после попадания жидкости, если это возможно.',
          icon: LuDroplets,
        },
      ],
    };
  }

  return {
    canonicalCategoryPath: '/telefonu-remonts',
    homeCrumb: 'Sākums',
    categoryCrumb: 'Telefonu remonts',
    faqTitle: 'Biežāk uzdotie jautājumi',
    priceTitle: 'Cenas un remonta laiks',
    heroAltSuffix: 'remonts',
    servicesTitle: (name) => `Populārākie ${name ?? 'šī modeļa'} remonti`,
    serviceLdName: (name) => `${name} remonts`,
    brandCrumb: (brandLabel) => `${brandLabel} telefonu remonts`,
    modelCrumb: (name) => `${name} remonts`,
    metaFallbackTitle: (brandLabel) => `${brandLabel} telefonu remonts | iLab`,
    metaFallbackDescriptionModel: (name) =>
      `${name} remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzdas remonts, kameras un citi bojājumi. Ātra diagnostika, godīgas cenas un garantija.`,
    metaFallbackDescriptionCategory:
      'Telefonu remonts: ekrāna maiņa, baterijas maiņa, uzlādes ligzda, kamera un citi bojājumi. Ātra diagnostika un garantija iLab servisā Rīgā.',
    serviceTypeSuffix: 'remonts',
    howToName: 'Telefonu remonts',
    defaultHeaderTitle: 'Telefonu remonts',
    defaultHeaderLead:
      'Telefonu remonts Rīgā - ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku, kvalitatīvām detaļām un 90 dienu garantiju.',
    pricesCtaLabel: 'Skatīt cenas',
    services: (categoryPath) => [
      {
        title: 'Ekrāna maiņa',
        href: `${categoryPath}/ekrana-maina`,
        text: 'plaisas, līnijas, tumši plankumi, nereaģē skārienjūtīgais ekrāns.',
        icon: LuSmartphone,
      },
      {
        title: 'Baterijas maiņa',
        href: `${categoryPath}/baterijas-maina`,
        text: 'strauji krīt uzlādes līmenis, telefons izslēdzas pie 10–20%.',
        icon: LuBatteryCharging,
      },
      {
        title: 'Uzlādes ligzdas maiņa',
        href: `${categoryPath}/uzlades-ligzdas-maina`,
        text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
        icon: LuPlugZap,
      },
      {
        title: 'Kameras remonts',
        href: `${categoryPath}/kameras-remonts`,
        text: 'miglaini attēli, melni plankumi, fokusēšanās problēmas.',
        icon: LuCamera,
      },
      {
        title: 'Skaļruņu un mikrofona remonts',
        href: `${categoryPath}/skalruni-mikrofona-remonts`,
        text: 'klusa skaņa, krakšķi, sarunas laikā nedzird vai neviens nedzird jūs.',
        icon: LuVolume2,
      },
      {
        title: 'Ūdens bojājumu remonts',
        href: `${categoryPath}/udens-bojajumu-remonts`,
        text: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
        icon: LuDroplets,
      },
    ],
  };
}

async function buildPriceListItems(modelSlug, locale = 'lv') {
  const [services, pricingRows] = await Promise.all([
    getServicesByCategory(PHONE_CATEGORY_KEY),
    getServicePricingByModel(modelSlug),
  ]);

  const pricingByServiceId = new Map(
    pricingRows
      .filter((row) => row?.serviceId)
      .map((row) => [row.serviceId, row])
  );

  const items = services
    .map((service) => {
      const pricing = pricingByServiceId.get(service.id) || null;

      if (!pricing) return null;
      if (pricing.isHidden === true) return null;

      const title =
        pickLocalizedField(service.labels, locale) ||
        (typeof service.title === 'string' ? service.title.trim() : '') ||
        service.id;

      const family =
        pickLocalizedField(service.familyLabels, locale) ||
        (typeof service.family === 'string' ? service.family.trim() : '');

      const defaultTimeText =
        pickLocalizedField(service.defaultTimeText, locale) ||
        (locale === 'ru' ? 'В тот же день' : 'Tajā pašā dienā');

      const overrideTimeText =
        pickLocalizedField(pricing?.timeTextOverride, locale) ||
        pickLocalizedField(pricing?.timeText, locale) ||
        (typeof pricing?.timeTextOverride === 'string'
          ? pricing.timeTextOverride.trim()
          : '') ||
        (typeof pricing?.timeText === 'string' ? pricing.timeText.trim() : '');

      const timeText = overrideTimeText || defaultTimeText;

      const warrantyDays =
        typeof pricing?.warrantyDaysOverride === 'number'
          ? pricing.warrantyDaysOverride
          : typeof service.defaultWarrantyDays === 'number'
            ? service.defaultWarrantyDays
            : null;

      const price =
        typeof pricing?.price === 'number' && Number.isFinite(pricing.price)
          ? pricing.price
          : null;

      const isStartingFrom = pricing?.isStartingFrom === true;

      return {
        id: service.id,
        title,
        family,
        order: typeof service.order === 'number' ? service.order : 9999,
        timeText,
        warrantyDays,
        price,
        isStartingFrom,
        isHidden: pricing?.isHidden === true,
        popular: false,
        href: service.slug ? `/${service.slug}` : undefined,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if ((a.order ?? 9999) !== (b.order ?? 9999)) {
        return (a.order ?? 9999) - (b.order ?? 9999);
      }
      return (a.title || '').localeCompare(b.title || '');
    });

  return { items, currency: DEFAULT_CURRENCY };
}

function buildFaqForModel() {
  const phoneFaq = getFaqItems(FAQ_CONTEXT.PHONE)?.items ?? [];
  if (phoneFaq.length) {
    return {
      faqItems: phoneFaq,
      faqLd: getFaqLd(FAQ_CONTEXT.PHONE),
    };
  }

  const homeFaq = getFaqItems(FAQ_CONTEXT.HOME)?.items ?? [];
  return {
    faqItems: homeFaq,
    faqLd: getFaqLd(FAQ_CONTEXT.HOME),
  };
}

export async function generateMetadataImpl({ params, locale = 'lv' }) {
  const { brand, device } = await params;
  const slug = norm(device);
  const brandSlug = norm(brand);

  const d = await getPhoneDeviceBySlug(brandSlug, slug);
  const strings = getPageStrings(locale);

  const brandLabel =
    pickLocalizedField(d?.brandName, locale) ||
    pickLocalizedField(d?.brandLabel, locale) ||
    d?.brandKey ||
    brandSlug.toUpperCase();

  const modelName =
    pickLocalizedField(d?.name, locale) ||
    d?.name ||
    slug;

  const title =
    pickLocalizedField(d?.metaTitle, locale) ||
    (d
      ? locale === 'ru'
        ? `Ремонт ${modelName} в Риге | iLab`
        : `${modelName} remonts Rīgā | iLab`
      : strings.metaFallbackTitle(brandLabel));

  const description =
    pickLocalizedField(d?.metaDescription, locale) ||
    (d
      ? strings.metaFallbackDescriptionModel(modelName)
      : strings.metaFallbackDescriptionCategory);

  return {
    title,
    description,
    alternates: {
      canonical: `${strings.canonicalCategoryPath}/${brandSlug}/${slug}`,
    },
  };
}

async function PhoneDevicePage({ params, locale = 'lv' }) {
  const { brand, device } = await params;
  const slug = norm(device);
  const brandSlug = norm(brand);

  const d = await getPhoneDeviceBySlug(brandSlug, slug);
  if (!d) return notFound();

  const strings = getPageStrings(locale);

  const modelName =
    pickLocalizedField(d.name, locale) ||
    d.name ||
    slug;

  const brandLabel =
    pickLocalizedField(d.brandName, locale) ||
    pickLocalizedField(d.brandLabel, locale) ||
    d.brandKey ||
    brandSlug.toUpperCase();

  const localizedBodyHtml =
    pickLocalizedField(d.bodyHtml, locale) || null;

  const headerTitle =
    pickLocalizedField(d.h1, locale) ||
    (modelName
      ? `${modelName} ${strings.serviceTypeSuffix}`
      : strings.defaultHeaderTitle);

  const headerLead =
    pickLocalizedField(d.lead, locale) ||
    pickLocalizedField(d.metaDescription, locale) ||
    strings.defaultHeaderLead;

  const { items: priceItems, currency } = await buildPriceListItems(d.slug, locale);
  const modelServices = strings.services(strings.canonicalCategoryPath);
  const { faqItems: finalFaqItems, faqLd } = buildFaqForModel();

  const modelPath = `${strings.canonicalCategoryPath}/${brandSlug}/${d.slug}`;
  const brandPath = `${strings.canonicalCategoryPath}/${brandSlug}`;
  const provider = buildProvidersFromLocations();

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.categoryCrumb,
      href: strings.canonicalCategoryPath,
    },
    {
      label: strings.brandCrumb(brandLabel),
      href: brandPath,
    },
    {
      label: headerTitle,
      href: modelPath,
    },
  ];

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.categoryCrumb, url: abs(strings.canonicalCategoryPath) },
    {
      name: strings.brandCrumb(brandLabel),
      url: abs(brandPath),
    },
    {
      name: headerTitle,
      url: abs(modelPath),
    },
  ]);

  const offers = priceItems.map((item) => {
    const numericPrice =
      typeof item.price === 'number' && Number.isFinite(item.price)
        ? item.price
        : undefined;

    return {
      '@type': 'Offer',
      name: item.title,
      ...(numericPrice !== undefined
        ? {
            price: numericPrice,
            priceCurrency: currency,
          }
        : {}),
      url: abs(`${modelPath}#cenas`),
      itemOffered: {
        '@type': 'Service',
        name: `${modelName} - ${item.title}`,
        serviceType: item.title,
        provider,
      },
      availability: 'https://schema.org/InStock',
    };
  });

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${modelPath}#service`,
    serviceType: strings.serviceLdName(modelName),
    name: strings.serviceLdName(modelName),
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  const processHowToLd = buildStandardRepairHowToLd(strings.howToName);

  const headerScrollCta = priceItems.length
    ? { label: strings.pricesCtaLabel, targetId: 'cenas' }
    : null;

  return (
    <>
      <Script
        id={`breadcrumbs-jsonld-phone-${d.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`service-jsonld-phone-${d.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      {faqLd && (
        <Script
          id={`faq-jsonld-phone-${d.slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      )}

      <Script
        id={`process-jsonld-phone-${d.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(processHowToLd)}
      </Script>

      <PageHeader
        title={headerTitle}
        lead={headerLead}
        scrollCta={headerScrollCta}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image={d.image}
        alt={`${modelName} ${strings.heroAltSuffix}`}
        bodyHtml={localizedBodyHtml}
      />

      <section className={s.section}>
        <Services
          id="telefonu-services"
          title={strings.servicesTitle(modelName)}
          items={modelServices}
        />
      </section>

      {!!priceItems.length && (
        <section className={s.section}>
          <PriceList
            id="cenas"
            title={strings.priceTitle}
            items={priceItems}
            currency={currency}
            headingLevel={2}
            locale={locale}
          />
        </section>
      )}

      <section className={s.section}>
        <Why locale={locale} />
      </section>

      <section className={s.section}>
        <Process locale={locale} />
      </section>

      {!!finalFaqItems.length && (
        <section className={s.section}>
          <Faq
            id="model-faq"
            title={strings.faqTitle}
            items={finalFaqItems}
            locale={locale}
          />
        </section>
      )}

      <section className={s.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}

PhoneDevicePage.generateMetadata = generateMetadataImpl;

export default PhoneDevicePage;