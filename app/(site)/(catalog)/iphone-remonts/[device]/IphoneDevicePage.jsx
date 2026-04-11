// app/(site)/iphone-remonts/[device]/IphoneDevicePage.jsx

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
import {
  buildIphonePopularServices,
  getIphonePopularServicesTitle,
} from '@sections/services/services.i18n';

import { FAQ_CONTEXT, getFaqItems, getFaqLd } from '@/data/faq';

import {
  ORIGIN,
  abs,
  buildBreadcrumbsLd,
  buildProvidersFromLocations,
  buildStandardRepairHowToLd,
} from '@/lib/seo/jsonldHelpers';

import { db } from '@/lib/firebaseAdmin';

import s from '@/app/(site)/(catalog)/iphone-remonts/[device]/Device.module.scss';

const DEFAULT_CURRENCY = 'EUR';
const IPHONE_CATEGORY_KEY = 'telefonu-remonts';
const IPHONE_BRAND_KEY = 'apple';
const DEBUG_PRICING = true;

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

async function getIphoneDeviceBySlug(slug) {
  const snap = await db
    .collection('devices')
    .where('slug', '==', slug)
    .where('categoryKey', '==', IPHONE_CATEGORY_KEY)
    .where('brandKey', '==', IPHONE_BRAND_KEY)
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
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
    getServicesByCategory(IPHONE_CATEGORY_KEY),
    getServicePricingByModel(modelSlug),
  ]);

  const pricingByServiceId = new Map(
    pricingRows
      .filter((row) => row?.serviceId)
      .map((row) => [row.serviceId, row])
  );

  if (DEBUG_PRICING) {
    console.log('=== buildPriceListItems debug ===');
    console.log('modelSlug:', modelSlug);
    console.log('locale:', locale);
    console.log('services count:', services.length);
    console.log('pricing rows count:', pricingRows.length);

    console.log(
      'service labels check:',
      services.map((service) => ({
        id: service.id,
        lv: service.labels?.lv ?? null,
        ru: service.labels?.ru ?? null,
        picked: pickLocalizedField(service.labels, locale),
        titleFallback: service.title ?? null,
      }))
    );

    console.log(
      'pricing map check:',
      pricingRows.map((row) => ({
        id: row.id,
        serviceId: row.serviceId ?? null,
        price: row.price ?? null,
        isStartingFrom: row.isStartingFrom ?? null,
        isHidden: row.isHidden ?? null,
      }))
    );
  }

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

  if (DEBUG_PRICING) {
    console.log(
      'final price items:',
      items.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        isStartingFrom: item.isStartingFrom,
        isHidden: item.isHidden,
        timeText: item.timeText,
      }))
    );
    console.log('=== end buildPriceListItems debug ===');
  }

  return { items, currency: DEFAULT_CURRENCY };
}

function buildFaqForIphoneModel() {
  const iphoneFaq = getFaqItems(FAQ_CONTEXT.IPHONE)?.items ?? [];
  if (iphoneFaq.length) {
    return {
      faqItems: iphoneFaq,
      faqLd: getFaqLd(FAQ_CONTEXT.IPHONE),
    };
  }

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

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт iPhone в Риге',
      pricesTitle: 'Цены и сроки ремонта',
      faqTitle: 'Часто задаваемые вопросы',
      homeCrumb: 'Главная',
      hubCrumb: 'Ремонт iPhone',
      serviceTypeSuffix: 'ремонт',
      howToName: 'Ремонт iPhone',
      defaultMetaTitle: 'Ремонт iPhone в Риге | iLab',
      defaultMetaDescription:
        'Ремонт iPhone в Риге: замена экрана, аккумулятора, разъёма зарядки, камеры и устранение других неисправностей. Быстрая диагностика и гарантия в сервисе iLab.',
      defaultHeaderTitle: 'Ремонт iPhone',
      defaultHeaderLead:
        'Ремонт iPhone в Риге — замена экрана, аккумулятора, камеры и разъёма зарядки с быстрой диагностикой, качественными деталями и гарантией 90 дней.',
      pricesCtaLabel: 'Смотреть цены',
    };
  }

  return {
    heroAlt: 'remonts Rīgā',
    pricesTitle: 'Cenas un remonta laiks',
    faqTitle: 'Biežāk uzdotie jautājumi',
    homeCrumb: 'Sākums',
    hubCrumb: 'iPhone remonts',
    serviceTypeSuffix: 'remonts',
    howToName: 'iPhone remonts',
    defaultMetaTitle: 'iPhone remonts Rīgā | iLab',
    defaultMetaDescription:
      'iPhone remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzda, kamera un citi bojājumi. Ātra diagnostika un garantija iLab servisā.',
    defaultHeaderTitle: 'iPhone remonts',
    defaultHeaderLead:
      'iPhone remonts Rīgā — ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku, kvalitatīvām detaļām un 90 dienu garantiju.',
    pricesCtaLabel: 'Skatīt cenas',
  };
}

export async function getIphoneDeviceMetadata(slug, { locale = 'lv' } = {}) {
  const deviceSlug = norm(slug);
  const device = await getIphoneDeviceBySlug(deviceSlug);
  const strings = getPageStrings(locale);

  const deviceName =
    pickLocalizedField(device?.name, locale) ||
    device?.name ||
    'iPhone';

  const title =
    pickLocalizedField(device?.metaTitle, locale) ||
    (device
      ? locale === 'ru'
        ? `Ремонт ${deviceName} в Риге | iLab`
        : `${deviceName} remonts Rīgā | iLab`
      : strings.defaultMetaTitle);

  const description =
    pickLocalizedField(device?.metaDescription, locale) ||
    (device
      ? locale === 'ru'
        ? `${deviceName} в Риге: замена экрана, аккумулятора, разъёма зарядки, камеры и другие ремонты. Быстрая диагностика, честные цены и гарантия.`
        : `${deviceName} Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzdas remonts, kameras un citi bojājumi. Ātra diagnostika, godīgas cenas un garantija.`
      : strings.defaultMetaDescription);

  const canonicalBase =
    locale === 'ru'
      ? `/ru/remont-iphone/${deviceSlug}`
      : `/iphone-remonts/${deviceSlug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalBase },
  };
}

export default async function IphoneDevicePage({
  deviceSlug,
  locale = 'lv',
}) {
  const slug = norm(deviceSlug);
  const device = await getIphoneDeviceBySlug(slug);

  if (DEBUG_PRICING) {
    console.log('=== IphoneDevicePage debug ===');
    console.log('incoming deviceSlug:', deviceSlug);
    console.log('normalized slug:', slug);
    console.log('incoming locale:', locale);
    console.log(
      'resolved device:',
      device
        ? {
            id: device.id,
            slug: device.slug,
            name: device.name,
            categoryKey: device.categoryKey,
            brandKey: device.brandKey,
            h1Lv: device.h1?.lv ?? null,
            h1Ru: device.h1?.ru ?? null,
            metaDescriptionLv: device.metaDescription?.lv ?? null,
            metaDescriptionRu: device.metaDescription?.ru ?? null,
            bodyHtmlLv: device.bodyHtml?.lv ?? null,
            bodyHtmlRu: device.bodyHtml?.ru ?? null,
          }
        : null
    );
  }

  if (!device) return notFound();

  const strings = getPageStrings(locale);

  const localizedBodyHtml = pickLocalizedField(device.bodyHtml, locale) || null;
  const deviceName =
    pickLocalizedField(device.name, locale) || device.name || '';

  const headerTitle =
    pickLocalizedField(device.h1, locale) ||
    (deviceName
      ? `${deviceName} ${strings.serviceTypeSuffix}`
      : strings.defaultHeaderTitle);

  const headerLead =
    pickLocalizedField(device.lead, locale) ||
    pickLocalizedField(device.metaDescription, locale) ||
    strings.defaultHeaderLead;

  const { items: priceItems, currency } = await buildPriceListItems(slug, locale);
  const modelServices = buildIphonePopularServices(locale);
  const modelServicesTitle = getIphonePopularServicesTitle(deviceName, locale);
  const { faqItems, faqLd } = buildFaqForIphoneModel();

  const modelPath =
    locale === 'ru'
      ? `/ru/remont-iphone/${device.slug}`
      : `/iphone-remonts/${device.slug}`;

  const provider = buildProvidersFromLocations();

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.hubCrumb,
      href: locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts',
    },
    {
      label: headerTitle,
      href: modelPath,
    },
  ];

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    {
      name: strings.hubCrumb,
      url: abs(locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts'),
    },
    { name: headerTitle, url: abs(modelPath) },
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
        name: `${deviceName} — ${item.title}`,
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
    serviceType: `${deviceName} ${strings.serviceTypeSuffix}`,
    name: `${deviceName} ${strings.serviceTypeSuffix}`,
    url: abs(modelPath),
    areaServed: { '@type': 'City', name: 'Rīga' },
    provider,
    ...(offers.length ? { offers } : {}),
  };

  const howToLd = buildStandardRepairHowToLd(strings.howToName);

  const headerScrollCta = priceItems.length
    ? { label: strings.pricesCtaLabel, targetId: 'cenas' }
    : null;

  return (
    <>
      <Script
        id={`breadcrumbs-jsonld-iphone-${device.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`service-jsonld-iphone-${device.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>

      {faqLd && (
        <Script
          id={`faq-jsonld-iphone-${device.slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      )}

      <Script
        id={`process-jsonld-iphone-${device.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(howToLd)}
      </Script>

      <PageHeader
        title={headerTitle}
        lead={headerLead}
        scrollCta={headerScrollCta}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image={device.image}
        alt={`${deviceName} ${strings.heroAlt}`}
        bodyHtml={localizedBodyHtml}
      />

      <section className={s.section}>
        <Services
          id="iphone-services"
          title={modelServicesTitle}
          items={modelServices}
        />
      </section>

      {!!priceItems.length && (
        <section className={s.section}>
          <PriceList
            id="cenas"
            title={strings.pricesTitle}
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

      {!!faqItems.length && (
        <section className={s.section}>
          <Faq
            id="model-faq"
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