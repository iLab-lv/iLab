import IphoneCameraServicePage from './IphoneCameraServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const seo = getStaticPageSeo('iphoneCameraRepair', locale);

const SERVICE_IDS = ['phone-camera'];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'kameras-remonts';

const routePath = seo.lvPath;
const ruPath = seo.ruPath;
const hubPath = '/iphone-remonts';
const allModelsHref = '/iphone-remonts#iphone-modeli';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/kameras_remonts.webp',
  heroBodyHtml:
    '<p><strong>iPhone kameras remonts Rīgā</strong> iLab servisā - kameras stikliņa maiņa, kameras moduļa nomaiņa, fokusēšanas un attēla kvalitātes problēmu diagnostika. Skaidra cena pirms darba un <strong>garantija līdz 1 gadam</strong>.</p>',

  headerTitle: 'iPhone kameras remonts Rīgā',
  headerLead:
    'Palīdzam, ja iPhone kamera nefokusējas, rāda melnu ekrānu, attēls ir miglains, stikliņš ir saplaisājis vai kamera pēc kritiena vairs darbojas nekorekti. Pirms remonta veicam diagnostiku, saskaņojam izmaksas un pēc darba sniedzam garantiju līdz 1 gadam.',
  headerCtaLabel: 'Skatīt cenas',

  introTitle: 'iPhone kameras remonts un stikliņa maiņa',
  introP1:
    'Kameras problēmas ne vienmēr nozīmē, ka jāmaina viss modulis. Dažreiz pietiek ar <strong>kameras stikliņa maiņu</strong>, tīrīšanu vai savienojumu pārbaudi. Ja kamera nefokusējas, kratās, nerāda attēlu vai pēc kritiena darbojas nestabili, iLab servisā veicam diagnostiku un piemeklējam atbilstošu risinājumu.',
  introP2:
    'Pārbaudām priekšējo un aizmugurējo kameru, zibspuldzi, fokusēšanu un attēla kvalitāti. Pirms darba sākšanas saskaņojam cenu un pēc remonta veicam gala testus. Darbam un uzstādītajām detaļām ir <strong>garantija līdz 1 gadam</strong>.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'cenām',

  modelPickerTitle: 'Izvēlies iPhone modeli',
  priceTitle: 'Kameras remonta cenas pēc modeļa',
  priceIntro:
    'Izvēlies savu iPhone modeli, lai redzētu kameras remonta cenu. Daudzos gadījumos kameras stikliņu vai moduli iespējams nomainīt tajā pašā dienā.',
  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek kameras remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Pārbaudām kameru, fokusēšanu, stikliņu, zibspuldzi un savienojumus.',
    },
    {
      title: 'Risinājums',
      text: 'Nosakām, vai nepieciešama tīrīšana, stikliņa maiņa vai kameras moduļa nomaiņa.',
    },
    {
      title: 'Remonts',
      text: 'Veicam detaļas maiņu vai savienojumu atjaunošanu atbilstoši bojājumam.',
    },
    {
      title: 'Testi',
      text: 'Pārbaudām foto, video, fokusēšanu, portreta režīmu un zibspuldzi.',
    },
    {
      title: 'Garantija',
      text: 'Pēc remonta sniedzam garantiju līdz 1 gadam darbam un uzstādītajām detaļām.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  breadcrumbServiceName: 'Kameras remonts',
  serviceName: 'iPhone kameras remonts Rīgā',
  serviceType: 'iPhone kameras remonts',
  serviceDescription:
    'iPhone kameras remonts Rīgā: kameras stikliņa maiņa, kameras moduļa nomaiņa, diagnostika, skaidra cena un garantija līdz 1 gadam.',

  homeCrumb: 'Sākums',
  hubCrumb: 'iPhone remonts',

  applyAria: 'Pieteikties remontam',

  processName: 'iPhone kameras remonts',
  processDescription:
    'Kā iLab servisā notiek iPhone kameras remonts: diagnostika, risinājuma izvēle, detaļas maiņa, testi un garantija.',
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
        strings.otherModels ||
        'Citi modeļi',
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

async function getIphoneCameraServiceData({ selectedModel }) {
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
      steps: strings.processSteps.map((step) => ({
        name: step.title,
        text: step.text,
      })),
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
  return buildSeoMetadata(seo);
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedModel = resolvedSearchParams?.model
    ? String(resolvedSearchParams.model)
    : null;

  const data = await getIphoneCameraServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="iphone-camera-service-jsonld" data={data.jsonLd} />

      <IphoneCameraServicePage locale={locale} {...data} />
    </>
  );
}