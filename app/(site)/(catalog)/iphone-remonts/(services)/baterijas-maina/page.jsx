import IphoneBatteryServicePage from './IphoneBatteryServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const SERVICE_IDS = ['phone-battery'];
const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'baterijas-maina';

const routePath = '/iphone-remonts/baterijas-maina';
const ruPath = '/ru/remont-iphone/zamena-batarei';
const hubPath = '/iphone-remonts';
const allModelsHref = '/iphone-remonts#iphone-modeli';

const strings = {
  title: 'iPhone baterijas maiņa Rīgā | iLab',
  description:
    'Ātra un kvalitatīva iPhone baterijas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija, oriģinālas vai OEM detaļas. Bieži tajā pašā dienā.',

  heroAlt: 'iPhone baterijas maiņa',
  heroImage: '/images/categories/baterijas_maina.webp',
  heroBodyHtml:
    '<p><strong>iPhone baterijas maiņa Rīgā</strong> iLab servisā - ātra diagnostika, kvalitatīvas detaļas un <strong>90 dienu garantija</strong>. Bieži akumulatora nomaiņu paveicam tajā pašā dienā.</p>',

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

  headerTitle: 'iPhone baterijas maiņa Rīgā',
  headerLead:
    'Mainām iPhone akumulatoru, ja baterija ātri izlādējas, telefons izslēdzas, sakarst vai neuzrāda stabilu uzlādi. Pirms remonta veicam diagnostiku, saskaņojam izmaksas un pēc nomaiņas sniedzam 90 dienu garantiju.',
  headerCtaLabel: 'Skatīt cenas',

  applyAria: 'Pieteikties remontam',

  processName: 'iPhone baterijas maiņa',
  processDescription:
    'Kā iLab servisā notiek iPhone baterijas maiņa: diagnostika, cenas saskaņošana, nomaiņa, pārbaude un garantija.',
  processSteps: [
    {
      name: 'Diagnostika',
      text: 'Pārbaudām baterijas stāvokli un iPhone darbību.',
    },
    {
      name: 'Cena un termiņš',
      text: 'Pirms darba sākšanas saskaņojam nomaiņas cenu un izpildes laiku.',
    },
    {
      name: 'Baterijas maiņa',
      text: 'Nomainām akumulatoru un pārbaudām jaunās detaļas pieslēgumu.',
    },
    {
      name: 'Pārbaude',
      text: 'Testējam uzlādi, stabilu darbību un galvenās funkcijas.',
    },
    {
      name: 'Garantija',
      text: 'Izsniedzam 90 dienu garantiju veiktajam darbam un uzstādītajai detaļai.',
    },
  ],
};

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

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = String(item?.q || item?.question || '')
      .trim()
      .toLowerCase();

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

async function getAppleSeriesLabelMap() {
  const doc = await db.collection('categories').doc(CATEGORY_KEY).get();

  if (!doc.exists) {
    return new Map();
  }

  const data = doc.data() || {};
  const brands = Array.isArray(data.brands) ? data.brands : [];
  const appleBrand = brands.find((brand) => brand?.key === BRAND_KEY);

  if (!appleBrand) {
    return new Map();
  }

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

async function getDevicesForIphone() {
  const [snap, seriesLabelMap] = await Promise.all([
    db
      .collection('devices')
      .where('categoryKey', '==', CATEGORY_KEY)
      .where('brandKey', '==', BRAND_KEY)
      .get(),
    getAppleSeriesLabelMap(),
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
    .where('categoryKey', '==', CATEGORY_KEY)
    .where('brandKey', '==', BRAND_KEY)
    .get();

  deviceSnap.forEach((doc) => {
    const data = doc.data() || {};

    if (data.slug) {
      pricing[data.slug] = { items: [] };
    }
  });

  const snap = await db
    .collection('servicePricing')
    .where('categoryId', '==', CATEGORY_KEY)
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
    .where('categoryId', '==', CATEGORY_KEY)
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

function buildBreadcrumbs() {
  return [
    {
      label: strings.homeCrumb,
      href: '/',
    },
    {
      label: strings.hubCrumb,
      href: hubPath,
    },
    {
      label: strings.breadcrumbServiceName,
      href: routePath,
    },
  ];
}

function buildFaqSections(faqGroups = []) {
  return faqGroups
    .filter((group) => Array.isArray(group.items) && group.items.length > 0)
    .map((group, index) => ({
      id: group.id || group.docId || `faq-group-${index + 1}`,
      title: group.title,
      items: toFaqRenderItems(group.items),
      rawItems: group.items,
    }));
}

async function getIphoneBatteryServiceData({ selectedModel }) {
  const [devices, pricing, serviceMeta, faq] = await Promise.all([
    getDevicesForIphone(),
    buildPricing(),
    getServiceMetaMap(SERVICE_IDS),
    getFaqGroups(
      [
        { scopeType: 'service', scopeKey: SERVICE_KEY },
        { scopeType: 'basic' },
      ],
      locale
    ),
  ]);

  const faqSections = buildFaqSections(faq.groups);

  const mergedFaqItems = dedupeFaqItems(
    faqSections.flatMap((section) => section.rawItems || [])
  );

  const breadcrumbs = buildBreadcrumbs();

  const hasVisibleFaq = mergedFaqItems.length > 0;

  const jsonLd = buildRepairPageJsonLd({
    path: routePath,
    locale,

    pageName: strings.title,
    pageDescription: strings.description,

    breadcrumbs,

    serviceName: strings.serviceName,
    serviceDescription: strings.serviceDescription,
    serviceType: strings.serviceType,
    serviceImage: strings.heroImage,

    faqItems: mergedFaqItems,
    includeFaq: hasVisibleFaq,

    includeHowTo: true,
    howTo: {
      name: strings.processName,
      description: strings.processDescription,
      image: strings.heroImage,
      steps: strings.processSteps,
    },
  });

  return {
    strings,

    devices,
    pricing,
    serviceMeta,
    selectedModel,

    routePath,
    hubPath,
    allModelsHref,

    breadcrumbs,

    faqSections,
    hasVisibleFaq,

    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata({
    locale,
    title: strings.title,
    description: strings.description,
    lvPath: routePath,
    ruPath,
    image: '/images/og/home.jpg',
    imageAlt: strings.heroAlt,
  });
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedModel = resolvedSearchParams?.model;

  const data = await getIphoneBatteryServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="iphone-battery-service-jsonld" data={data.jsonLd} />

      <IphoneBatteryServicePage locale={locale} {...data} />
    </>
  );
}