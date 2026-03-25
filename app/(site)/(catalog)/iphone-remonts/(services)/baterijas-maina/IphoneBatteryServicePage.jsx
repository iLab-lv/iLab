import Script from 'next/script';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@sections/service-pricelist/ServicePricelist';

import { db } from '@/lib/firebaseAdmin';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

const SERVICE_IDS = ['phone-battery'];

const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst iPhone baterijas maiņa?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — baterijas maiņa datus neietekmē.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan darbam.',
  },
];

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/zamena-batarei'
    : '/iphone-remonts/baterijas-maina';
}

function getHubPath(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
}

function getAllModelsHref(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone#iphone-modeli'
    : '/iphone-remonts#iphone-modeli';
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'Замена батареи iPhone',
      priceTitle: 'Цены на замену батареи по моделям',
      ctaLabel: 'Записаться на ремонт',
      faqTitle: 'Вопросы',
      breadcrumbServiceName: 'Замена батареи',
      serviceName: 'Замена батареи iPhone в Риге',
      serviceType: 'Замена батареи iPhone',
      serviceDescription:
        'Замена батареи iPhone в Риге: бесплатная диагностика, гарантия 90 дней.',
      homeCrumb: 'Главная',
      hubCrumb: 'Ремонт iPhone',
      otherModels: 'Другие модели',
    };
  }

  return {
    heroAlt: 'iPhone baterijas maiņa',
    priceTitle: 'Baterijas maiņas cenas pēc modeļa',
    ctaLabel: 'Pieteikties remontam',
    faqTitle: 'Jautājumi',
    breadcrumbServiceName: 'Baterijas maiņa',
    serviceName: 'iPhone baterijas maiņa Rīgā',
    serviceType: 'iPhone baterijas maiņa',
    serviceDescription:
      'iPhone baterijas maiņa Rīgā: bezmaksas diagnostika, 90 dienu garantija.',
    homeCrumb: 'Sākums',
    hubCrumb: 'iPhone remonts',
    otherModels: 'Citi modeļi',
  };
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

export function getIphoneBatteryServiceMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Замена батареи iPhone в Риге | iLab',
      description:
        'Быстрая и качественная замена батареи iPhone в Риге. Бесплатная диагностика, гарантия 90 дней, оригинальные или OEM детали. Часто в тот же день.',
      alternates: {
        canonical: getRoutePath(locale),
      },
    };
  }

  return {
    title: 'iPhone baterijas maiņa Rīgā | iLab',
    description:
      'Ātra un kvalitatīva iPhone baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',
    alternates: {
      canonical: getRoutePath(locale),
    },
  };
}

function buildFaqLd() {
  return buildFaqLdFromPairs(FAQ_ITEMS);
}

function buildBreadcrumbs(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.hubCrumb, url: abs(getHubPath(locale)) },
    { name: strings.breadcrumbServiceName, url: abs(getRoutePath(locale)) },
  ]);
}

function buildServiceLd(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildServiceLdForCity({
    path: getRoutePath(locale),
    name: strings.serviceName,
    serviceType: strings.serviceType,
    description: strings.serviceDescription,
  });
}

async function getAppleSeriesLabelMap(locale = 'lv') {
  const doc = await db.collection('categories').doc('telefonu-remonts').get();
  if (!doc.exists) return new Map();

  const data = doc.data() || {};
  const brands = Array.isArray(data.brands) ? data.brands : [];
  const appleBrand = brands.find((brand) => brand?.key === 'apple');

  if (!appleBrand) return new Map();

  const series = Array.isArray(appleBrand.series) ? appleBrand.series : [];
  const map = new Map();

  for (const item of series) {
    if (!item?.key) continue;

    const label =
      pickLocalizedField(item.labels, locale) ||
      pickLocalizedField(item.labels, 'lv') ||
      item.key;

    map.set(item.key, label);
  }

  return map;
}

async function getDevicesForIphone(locale = 'lv') {
  const strings = getPageStrings(locale);
  const [snap, seriesLabelMap] = await Promise.all([
    db
      .collection('devices')
      .where('categoryKey', '==', 'telefonu-remonts')
      .where('brandKey', '==', 'apple')
      .get(),
    getAppleSeriesLabelMap(locale),
  ]);

  return snap.docs.map((doc) => {
    const data = doc.data() || {};
    const seriesKey = data.seriesKey || '';

    return {
      id: doc.id,
      slug: data.slug || '',
      name: data.name || '',
      image: data.image || '',
      year: typeof data.year === 'number' ? data.year : null,
      brandSlug: data.brandKey || '',
      category: data.categoryKey || '',
      series:
        seriesLabelMap.get(seriesKey) ||
        data.seriesLabel ||
        data.originalSeriesLabel ||
        strings.otherModels,
    };
  });
}

async function buildPricing() {
  const pricing = {};

  const deviceSnap = await db
    .collection('devices')
    .where('categoryKey', '==', 'telefonu-remonts')
    .where('brandKey', '==', 'apple')
    .get();

  deviceSnap.forEach((doc) => {
    const data = doc.data() || {};
    if (data.slug) {
      pricing[data.slug] = { items: [] };
    }
  });

  const snap = await db
    .collection('servicePricing')
    .where('categoryId', '==', 'telefonu-remonts')
    .where('serviceId', 'in', SERVICE_IDS)
    .get();

  snap.forEach((doc) => {
    const data = doc.data() || {};
    const modelId = data.modelId;
    const serviceId = data.serviceId;

    if (!modelId || !serviceId || !pricing[modelId]) return;

    pricing[modelId].items.push({
      id: serviceId,
      price:
        typeof data.price === 'number' && Number.isFinite(data.price)
          ? data.price
          : null,
      isStartingFrom: data.isStartingFrom === true,
    });
  });

  return pricing;
}

async function getServiceMetaMap(serviceIds) {
  const snap = await db
    .collection('services')
    .where('categoryId', '==', 'telefonu-remonts')
    .where('isActive', '==', true)
    .get();

  const map = {};

  snap.forEach((doc) => {
    const data = doc.data() || {};
    if (!serviceIds.includes(doc.id)) return;

    map[doc.id] = {
      id: doc.id,
      labels: {
        lv: data.labels?.lv || '',
        ru: data.labels?.ru || '',
      },
      order: typeof data.order === 'number' ? data.order : 9999,
    };
  });

  return map;
}

export default async function IphoneBatteryServicePage({
  locale = 'lv',
  searchParams,
}) {
  const selectedModel = searchParams?.model;
  const [devices, pricing, serviceMeta] = await Promise.all([
    getDevicesForIphone(locale),
    buildPricing(),
    getServiceMetaMap(SERVICE_IDS),
  ]);

  const strings = getPageStrings(locale);
  const faqLd = buildFaqLd();
  const breadcrumbsLd = buildBreadcrumbs(locale);
  const serviceLd = buildServiceLd(locale);

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>

      <DeviceHero
        image="/images/categories/baterijas_maina.webp"
        alt={strings.heroAlt}
        className="service"
      />

      <section id="brand-list" className={s.section}>
        <ServicePricelist
          devices={devices}
          pricing={pricing}
          serviceMeta={serviceMeta}
          brandSlug="apple"
          categorySlug="telefonu-remonts"
          serviceIds={SERVICE_IDS}
          title={strings.priceTitle}
          allModelsHref={getAllModelsHref(locale)}
          cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
          selectedModel={selectedModel}
          locale={locale}
        />
      </section>

      <Process locale={locale} />
      <Why locale={locale} />
      <Faq title={strings.faqTitle} groups={[{ items: FAQ_ITEMS }]} locale={locale} />
      <section id="pieteikties">
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}