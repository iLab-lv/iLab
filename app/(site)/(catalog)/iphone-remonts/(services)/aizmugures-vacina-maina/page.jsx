import IphoneBackCoverServicePage from './IphoneBackCoverServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const seo = getStaticPageSeo('iphoneBackCoverReplacement', locale);

const SERVICE_IDS = ['phone-back-cover'];
const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'aizmugures-vacina-maina';

const routePath = seo.lvPath;
const hubPath = '/iphone-remonts';
const allModelsHref = '/iphone-remonts#iphone-modeli';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/back-cover.webp',
  heroBodyHtml:
    '<p><strong>iPhone aizmugures vāciņa maiņa Rīgā</strong> iLab servisā - kvalitatīva korpusa detaļas nomaiņa, precīza diagnostika un <strong>garantija līdz 1 gadam</strong>. Palīdzam, ja aizmugures stikls ir saplaisājis, atdalījies vai bojāts pēc kritiena.</p>',

  priceTitle: 'Aizmugures vāciņa maiņas cenas pēc modeļa',
  ctaLabel: 'Pieteikties remontam',

  faqTitle: 'Jautājumi',

  breadcrumbServiceName: 'Aizmugures vāciņa maiņa',
  serviceName: 'iPhone aizmugures vāciņa maiņa Rīgā',
  serviceType: 'iPhone aizmugures vāciņa maiņa',
  serviceDescription:
    'iPhone aizmugures vāciņa maiņa Rīgā. Bezmaksas diagnostika un garantija līdz 1 gadam.',

  homeCrumb: 'Sākums',
  hubCrumb: 'iPhone remonts',
  otherModels: 'Citi modeļi',

  headerTitle: 'iPhone aizmugures vāciņa maiņa Rīgā',
  headerLead:
    'Mainām iPhone aizmugures stiklu vai korpusa vāciņu, ja tas ir saplaisājis, atlīmējies, saskrāpēts vai bojāts pēc kritiena. Pirms remonta veicam diagnostiku, saskaņojam izmaksas un pēc nomaiņas sniedzam garantiju līdz 1 gadam.',
  headerCtaLabel: 'Skatīt cenas',

  applyAria: 'Pieteikties remontam',

  processName: 'iPhone aizmugures vāciņa maiņa',
  processDescription:
    'Kā iLab servisā notiek iPhone aizmugures vāciņa maiņa: diagnostika, cenas saskaņošana, detaļas nomaiņa, pārbaude un garantija.',
  processSteps: [
    {
      name: 'Diagnostika',
      text: 'Pārbaudām korpusu, kameras stiklu, bezvadu uzlādi un iPhone darbību.',
    },
    {
      name: 'Cena un termiņš',
      text: 'Pirms darba sākšanas saskaņojam aizmugures vāciņa maiņas cenu un izpildes laiku.',
    },
    {
      name: 'Vāciņa maiņa',
      text: 'Nomainām bojāto aizmugures stiklu vai korpusa detaļu un pārbaudām savienojumus.',
    },
    {
      name: 'Pārbaude',
      text: 'Testējam kameras zonu, bezvadu uzlādi un galvenās funkcijas.',
    },
    {
      name: 'Garantija',
      text: 'Izsniedzam garantiju līdz 1 gadam veiktajam darbam un uzstādītajai detaļai.',
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

async function getIphoneBackCoverServiceData({ selectedModel }) {
  const [devices, pricing, serviceMeta, faq, reviewsSummary] = await Promise.all([
    getDevicesForIphone(),
    buildPricing(),
    getServiceMetaMap(SERVICE_IDS),
    getFaqGroups(
      [{ scopeType: 'service', scopeKey: SERVICE_KEY }],
      locale
    ),
    getReviewsSummary(),
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
    reviewsSummary,

    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata(seo);
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedModel = resolvedSearchParams?.model;

  const data = await getIphoneBackCoverServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="iphone-back-cover-service-jsonld" data={data.jsonLd} />

      <IphoneBackCoverServicePage locale={locale} {...data} />
    </>
  );
}
