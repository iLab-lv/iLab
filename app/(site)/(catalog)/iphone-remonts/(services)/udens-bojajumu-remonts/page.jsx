import IphoneWaterDamageServicePage from './IphoneWaterDamageServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const seo = getStaticPageSeo('iphoneWaterDamageRepair', locale);

const SERVICE_IDS = ['water-damage'];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'udens-bojajumu-remonts';

const routePath = seo.lvPath;
const ruPath = seo.ruPath;
const hubPath = '/iphone-remonts';
const allModelsHref = '/iphone-remonts#iphone-modeli';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/udens_bojajumi.webp',
  heroBodyHtml:
    '<p><strong>iPhone pēc ūdens vai mitruma</strong> jānogādā servisā pēc iespējas ātrāk. iLab veic diagnostiku, tīrīšanu, oksidācijas novēršanu un bojāto mezglu pārbaudi. Mērķis - pēc iespējas saglabāt ierīci un datus.</p>',

  headerTitle: 'iPhone ūdens bojājumu remonts Rīgā',
  headerLead:
    'Ja iPhone iekritis ūdenī, saņēmis mitrumu vai pēc šķidruma vairs neieslēdzas, svarīgi neriskēt ar atkārtotu lādēšanu. Veicam diagnostiku, tīrīšanu, korozijas novēršanu un pārbaudām, vai iespējams saglabāt datus.',
  headerCtaLabel: 'Pieteikt diagnostiku',

  introTitle: 'Ko darīt, ja iPhone bijis ūdenī?',
  introP1:
    'Pēc mitruma bojājuma svarīgākais ir rīkoties ātri: izslēgt ierīci, nelādēt to un nenodarboties ar žāvēšanu uz radiatora vai ar fēnu. Šķidrums var izraisīt oksidāciju, īssavienojumu un bojāt mātesplati vai citus svarīgus mezglus.',
  introP2:
    'iLab servisā veicam profesionālu diagnostiku, tīrīšanu un oksidācijas novēršanu. Ja nepieciešams, pārbaudām arī datu saglabāšanas iespējas. Remonta iespējas un cenu saskaņojam pēc diagnostikas.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'informācijai',

  modelPickerTitle: 'Izvēlies iPhone modeli',
  priceTitle: 'Ūdens bojājumu diagnostika un remonts',
  priceIntro:
    'Ūdens bojājumu gadījumā precīzu cenu iespējams noteikt tikai pēc diagnostikas. Izvēlies modeli, lai pieteiktu pārbaudi vai konsultāciju.',
  ctaLabel: 'Pieteikt diagnostiku',

  processTitle: 'Kā notiek ūdens bojājumu diagnostika',
  processSteps: [
    {
      title: 'Ātra pieņemšana',
      text: 'Piefiksējam situāciju, kad un kā ierīce saskārās ar šķidrumu.',
    },
    {
      title: 'Diagnostika',
      text: 'Pārbaudām mātesplati, savienojumus, displeju, bateriju un uzlādes mezglu.',
    },
    {
      title: 'Tīrīšana',
      text: 'Veicam mitruma un oksidācijas pēdu tīrīšanu ar piemērotiem līdzekļiem.',
    },
    {
      title: 'Remonta izvērtēšana',
      text: 'Nosakām bojātās detaļas un saskaņojam iespējamo remonta risinājumu.',
    },
    {
      title: 'Datu iespējas',
      text: 'Ja ierīces atjaunošana nav izdevīga, izvērtējam datu saglabāšanas iespējas.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  breadcrumbServiceName: 'Ūdens bojājumu remonts',
  serviceName: 'iPhone ūdens bojājumu remonts Rīgā',
  serviceType: 'iPhone ūdens bojājumu remonts',
  serviceDescription:
    'iPhone ūdens bojājumu diagnostika Rīgā: tīrīšana, oksidācijas novēršana, bojāto mezglu pārbaude un datu saglabāšanas iespējas.',

  homeCrumb: 'Sākums',
  hubCrumb: 'iPhone remonts',

  applyAria: 'Pieteikt diagnostiku',

  processName: 'iPhone ūdens bojājumu diagnostika',
  processDescription:
    'Kā iLab servisā notiek iPhone ūdens bojājumu diagnostika: pieņemšana, pārbaude, tīrīšana, remonta izvērtēšana un datu iespēju pārbaude.',
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

async function getIphoneWaterDamageServiceData({ selectedModel }) {
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

  const data = await getIphoneWaterDamageServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="iphone-water-damage-service-jsonld" data={data.jsonLd} />

      <IphoneWaterDamageServicePage locale={locale} {...data} />
    </>
  );
}
