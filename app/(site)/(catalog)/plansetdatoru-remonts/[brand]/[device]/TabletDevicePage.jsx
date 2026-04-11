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
  LuTabletSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuDroplets,
} from 'react-icons/lu';

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
} from '@/lib/seo/jsonldHelpers';
import { buildDeviceHref, buildCategoryHref } from '@/lib/routes/routeI18n';
import { db } from '@/lib/firebaseAdmin';

import s from '@/app/(site)/(catalog)/plansetdatoru-remonts/[brand]/[device]/Device.module.scss';

const DEFAULT_CURRENCY = 'EUR';
const TABLET_CATEGORY_KEY = 'plansetdatoru-remonts';

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

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      categoryName: 'Ремонт планшетов',
      modelMetaFallback:
        'Ремонт планшетов: экран, батарея, зарядка, камера. Бесплатная диагностика и гарантия 90 дней.',
      heroAltSuffix: 'ремонт',
      servicesTitle: (name) => `Популярные ремонты ${name ?? 'этой модели'}`,
      priceTitle: 'Цены и сроки ремонта',
      faqTitle: 'Часто задаваемые вопросы',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Быстро проверяем планшет и подтверждаем проблему: экран, батарея, зарядка, звук и другие неисправности.',
        },
        {
          title: 'Цена и срок',
          text: 'До начала ремонта согласовываем стоимость и срок выполнения.',
        },
        {
          title: 'Ремонт',
          text: 'Сертифицированные мастера выполняют ремонт с использованием качественных деталей.',
        },
        {
          title: 'Проверка',
          text: 'После ремонта тестируем экран, сенсор, зарядку, звук и другие важные функции.',
        },
        {
          title: 'Гарантия',
          text: 'Гарантия 90 дней на детали и работу, плюс рекомендации по дальнейшему использованию.',
        },
      ],
      modelServices: [
        {
          title: 'Замена дисплея',
          text: 'трещины, пятна, сенсор не реагирует.',
          icon: LuTabletSmartphone,
        },
        {
          title: 'Замена аккумулятора',
          text: 'быстро разряжается, выключается на 10–20%.',
          icon: LuBatteryCharging,
        },
        {
          title: 'Ремонт разъёма зарядки',
          text: 'кабель не держится, зарядка медленная или нестабильная.',
          icon: LuPlugZap,
        },
        {
          title: 'Ремонт камеры',
          text: 'размытые фото, проблемы с фокусировкой.',
          icon: LuCamera,
        },
        {
          title: 'Повреждение влагой',
          text: 'диагностика и восстановление, если это возможно.',
          icon: LuDroplets,
        },
      ],
      breadcrumbsHome: 'Главная',
      brandCategoryName: (brandLabel) => `Ремонт планшетов ${brandLabel}`,
      modelRepairName: (deviceName) => `Ремонт ${deviceName}`,
      howToName: (deviceName) => `Процесс ремонта ${deviceName} в iLab`,
      howToDescription:
        'Как шаг за шагом проходит диагностика, ремонт и тестирование планшета в сервисе iLab в Риге.',
      howToStepsLd: [
        {
          '@type': 'HowToStep',
          name: '1. Диагностика',
          text: 'Быстро проверяем планшет, подтверждаем неисправность и оцениваем объём повреждения.',
        },
        {
          '@type': 'HowToStep',
          name: '2. Цена и срок',
          text: 'До начала ремонта согласовываем стоимость, тип детали и срок выполнения.',
        },
        {
          '@type': 'HowToStep',
          name: '3. Ремонт',
          text: 'Сертифицированные мастера выполняют ремонт экрана, батареи, разъёма зарядки, камеры или других компонентов с использованием качественных деталей.',
        },
        {
          '@type': 'HowToStep',
          name: '4. Проверка',
          text: 'После ремонта тестируем экран, сенсор, звук, зарядку, сеть и другие важные для повседневного использования функции.',
        },
        {
          '@type': 'HowToStep',
          name: '5. Гарантия и выдача',
          text: 'Выдаём планшет с гарантией 90 дней на детали и работу, а также даём рекомендации по дальнейшему использованию.',
        },
      ],
      defaultHeaderTitle: 'Ремонт планшета',
      defaultHeaderLead:
        'Ремонт планшетов в Риге — замена экрана, батареи, разъёма зарядки и других компонентов с быстрой диагностикой, качественными деталями и гарантией 90 дней.',
      pricesCtaLabel: 'Смотреть цены',
    };
  }

  return {
    categoryName: 'Planšetdatoru remonts',
    modelMetaFallback:
      'Planšetdatoru remonts: displejs, baterija, uzlāde, kamera. Bezmaksas diagnostika un 90 dienu garantija.',
    heroAltSuffix: 'remonts',
    servicesTitle: (name) => `Populārākie ${name ?? 'šī modeļa'} remonti`,
    priceTitle: 'Cenas un remonta laiks',
    faqTitle: 'Biežāk uzdotie jautājumi',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Ātri pārbaudām planšetdatoru un apstiprinām problēmu (ekrāns, baterija, uzlāde, skaņa u.c.).',
      },
      {
        title: 'Cena un termiņš',
        text: 'Pirms remonta sākšanas saskaņojam izmaksas un izpildes laiku.',
      },
      {
        title: 'Remonts',
        text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
      },
      {
        title: 'Pārbaude',
        text: 'Pēc remonta testējam ekrānu, skārienu, uzlādi, skaņu un citas funkcijas.',
      },
      {
        title: 'Garantija',
        text: '90 dienu garantija uz detaļu un darbu, plus ieteikumi turpmākai lietošanai.',
      },
    ],
    modelServices: [
      {
        title: 'Displeja (ekrāna) maiņa',
        text: 'plaisas, plankumi, nereaģē skāriens.',
        icon: LuTabletSmartphone,
      },
      {
        title: 'Akumulatora maiņa',
        text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
        icon: LuBatteryCharging,
      },
      {
        title: 'Uzlādes ligzdas remonts',
        text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
        icon: LuPlugZap,
      },
      {
        title: 'Kameras remonts',
        text: 'miglaini attēli, fokusēšanās problēmas.',
        icon: LuCamera,
      },
      {
        title: 'Ūdens bojājumi',
        text: 'diagnostika un atjaunošana, ja tas iespējams.',
        icon: LuDroplets,
      },
    ],
    breadcrumbsHome: 'Sākums',
    brandCategoryName: (brandLabel) => `${brandLabel} planšetdatoru remonts`,
    modelRepairName: (deviceName) => `${deviceName} remonts`,
    howToName: (deviceName) => `${deviceName} remonta process iLab`,
    howToDescription:
      'Kā soli pa solim notiek planšetdatora diagnostika, remonts un testēšana iLab servisā Rīgā.',
    howToStepsLd: [
      {
        '@type': 'HowToStep',
        name: '1. Diagnostika',
        text: 'Ātri pārbaudām planšetdatoru, apstiprinām problēmu (displejs, baterija, uzlāde, skaņa u.c.) un izvērtējam bojājuma apmēru.',
      },
      {
        '@type': 'HowToStep',
        name: '2. Cena un termiņš',
        text: 'Pirms remonta sākšanas saskaņojam izmaksas, detaļu veidu (oriģināls vai OEM) un izpildes termiņu.',
      },
      {
        '@type': 'HowToStep',
        name: '3. Remonts',
        text: 'Sertificēti meistari veic ekrāna, baterijas, uzlādes ligzdas, kameras vai citu komponentu remontu, izmantojot kvalitatīvas detaļas.',
      },
      {
        '@type': 'HowToStep',
        name: '4. Pārbaude',
        text: 'Pēc remonta testējam ekrānu, skārienu, skaņu, uzlādi, tīklu un citas ikdienai svarīgas funkcijas, lai pārliecinātos par stabilu darbību.',
      },
      {
        '@type': 'HowToStep',
        name: '5. Garantija un izsniegšana',
        text: 'Izsniedzam planšetdatoru ar 90 dienu garantiju uz detaļu un darbu, sniedzam ieteikumus turpmākai lietošanai.',
      },
    ],
    defaultHeaderTitle: 'Planšetdatoru remonts',
    defaultHeaderLead:
      'Planšetdatoru remonts Rīgā — ekrāna, baterijas, uzlādes ligzdas un citu komponentu remonts ar ātru diagnostiku, kvalitatīvām detaļām un 90 dienu garantiju.',
    pricesCtaLabel: 'Skatīt cenas',
  };
}

async function getTabletDeviceBySlug(brandSlug, slug) {
  const normalizedBrand = norm(brandSlug);
  const normalizedSlug = norm(slug);

  const directSnap = await db
    .collection('devices')
    .where('slug', '==', normalizedSlug)
    .where('categoryKey', '==', TABLET_CATEGORY_KEY)
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
    .where('categoryKey', '==', TABLET_CATEGORY_KEY)
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

async function buildPriceListItems(modelSlug, locale = 'lv') {
  const [services, pricingRows] = await Promise.all([
    getServicesByCategory(TABLET_CATEGORY_KEY),
    getServicePricingByModel(modelSlug),
  ]);

  const pricingByServiceId = new Map(
    pricingRows
      .filter((row) => row?.serviceId)
      .map((row) => [row.serviceId, row])
  );

  const fallbackTimeText =
    locale === 'ru' ? 'В тот же день' : 'Tajā pašā dienā';

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
        fallbackTimeText;

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

function getFaqData(locale = 'lv') {
  const phoneFaq = getFaqItems(FAQ_CONTEXT.PHONE)?.items ?? [];
  const homeFaq = !phoneFaq.length ? getFaqItems(FAQ_CONTEXT.HOME)?.items ?? [] : [];
  const items = phoneFaq.length ? phoneFaq : homeFaq;
  const ld = phoneFaq.length ? getFaqLd(FAQ_CONTEXT.PHONE) : getFaqLd(FAQ_CONTEXT.HOME);

  return { items, ld };
}

async function generateMetadataImpl({ params, locale = 'lv' }) {
  const { brand, device } = await params;
  const slug = norm(device);
  const brandSlug = norm(brand);

  const d = await getTabletDeviceBySlug(brandSlug, slug);
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
      : `${strings.categoryName} | iLab`);

  const description =
    pickLocalizedField(d?.metaDescription, locale) ||
    strings.modelMetaFallback;

  const canonicalPath = d
    ? buildDeviceHref(locale, TABLET_CATEGORY_KEY, brandSlug, slug)
    : buildCategoryHref(locale, TABLET_CATEGORY_KEY);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
  };
}

async function TabletDevicePage({ params, locale = 'lv' }) {
  const { brand, device } = await params;
  const slug = norm(device);
  const brandSlug = norm(brand);

  const d = await getTabletDeviceBySlug(brandSlug, slug);
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
    strings.modelRepairName(modelName) ||
    strings.defaultHeaderTitle;

  const headerLead =
    pickLocalizedField(d.lead, locale) ||
    pickLocalizedField(d.metaDescription, locale) ||
    strings.defaultHeaderLead;

  const { items: priceItems, currency } = await buildPriceListItems(d.slug, locale);
  const { items: faqItems, ld: faqLd } = getFaqData(locale);

  const provider = buildProvidersFromLocations();

  const categoryPath = buildCategoryHref(locale, TABLET_CATEGORY_KEY);
  const brandPath = `${categoryPath}/${brandSlug}`;
  const modelPath = buildDeviceHref(
    locale,
    TABLET_CATEGORY_KEY,
    brandSlug,
    d.slug
  );

  const headerCrumbs = [
    {
      label: strings.breadcrumbsHome,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.categoryName,
      href: categoryPath,
    },
    {
      label: strings.brandCategoryName(brandLabel),
      href: brandPath,
    },
    {
      label: headerTitle,
      href: modelPath,
    },
  ];

  const breadcrumbsLd = buildBreadcrumbsLd([
    {
      name: strings.breadcrumbsHome,
      url: abs(locale === 'ru' ? '/ru' : '/'),
    },
    {
      name: strings.categoryName,
      url: abs(categoryPath),
    },
    {
      name: strings.brandCategoryName(brandLabel),
      url: abs(brandPath),
    },
    {
      name: headerTitle,
      url: abs(modelPath),
    },
  ]);

  const offers = priceItems.map((it) => {
    const numericPrice =
      typeof it.price === 'number' && Number.isFinite(it.price)
        ? it.price
        : undefined;

    return {
      '@type': 'Offer',
      name: it.title,
      ...(numericPrice !== undefined
        ? {
            price: numericPrice,
            priceCurrency: currency,
          }
        : {}),
      url: abs(`${modelPath}#cenas`),
      itemOffered: {
        '@type': 'Service',
        name: `${modelName} — ${it.title}`,
        serviceType: it.title,
        provider,
      },
      availability: 'https://schema.org/InStock',
    };
  });

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${modelPath}#service`,
    serviceType: strings.modelRepairName(modelName),
    name: strings.modelRepairName(modelName),
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  const processHowToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGIN}${modelPath}#howto`,
    name: strings.howToName(modelName),
    description: strings.howToDescription,
    step: strings.howToStepsLd,
  };

  const headerScrollCta = priceItems.length
    ? { label: strings.pricesCtaLabel, targetId: 'cenas' }
    : null;

  return (
    <>
      <Script
        id={`breadcrumbs-jsonld-tablet-${d.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`service-jsonld-tablet-${d.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      {faqLd && (
        <Script
          id={`faq-jsonld-tablet-${d.slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      )}

      <Script
        id={`process-jsonld-tablet-${d.slug}`}
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
          id="tablet-services"
          title={strings.servicesTitle(modelName)}
          items={strings.modelServices}
          headingLevel={2}
          variant="list"
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
        <Process
          id="process"
          title={strings.processTitle}
          steps={strings.processSteps}
          headingLevel={2}
          variant="cards"
        />
      </section>

      {!!faqItems.length && (
        <section className={s.section}>
          <Faq
            id="tablet-model-faq"
            title={strings.faqTitle}
            items={faqItems}
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

TabletDevicePage.generateMetadata = generateMetadataImpl;

export default TabletDevicePage;