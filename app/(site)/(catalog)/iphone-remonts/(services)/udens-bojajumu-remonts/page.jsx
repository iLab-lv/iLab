import IphoneWaterDamageServicePage from './IphoneWaterDamageServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const SERVICE_IDS = ['water-damage-clean'];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'udens-bojajumu-remonts';

const routePath = '/iphone-remonts/udens-bojajumu-remonts';
const ruPath = '/ru/remont-iphone/remont-posle-popadaniya-vlagi';
const hubPath = '/iphone-remonts';
const allModelsHref = '/iphone-remonts#iphone-modeli';

const strings = {
  title: 'iPhone ūdens bojājumi - diagnostika un remonts Rīgā | iLab',
  description:
    'iPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas? Veicam ūdens bojājumu diagnostiku, tīrīšanu un oksidācijas novēršanu. Ātra palīdzība un 90 dienu garantija.',

  heroAlt: 'iPhone ūdens bojājumi',
  heroImage: '/images/categories/udens_bojajumi.webp',
  heroBodyHtml:
    '<p><strong>IPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas?</strong> Veicam <strong>ūdens bojājumu diagnostiku un remontu</strong> Rīgā - tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa. Jo ātrāk atnesīsi, jo labākas izredzes. <strong>90 dienu garantija</strong>.</p>',

  introTitle: 'iPhone ūdens bojājumi - ko darīt?',
  introP1:
    'Ja <strong>iPhone iekrita ūdenī</strong>, jūrā, baseinā vai uz tā izlija šķidrums, svarīgi rīkoties nekavējoties. Ūdens izraisa <strong>oksidāciju un koroziju</strong>, bojā savienojumus un var radīt īssavienojumu. Pareiza rīcība pirmajās minūtēs ievērojami palielina iespēju ierīci pilnībā atjaunot.',
  introP2: 'Mūsu speciālisti visbiežāk saskaras ar situācijām, kad telefons:',
  introList: [
    'vairs <strong>neieslēdzas</strong> pēc ūdens;',
    '<strong>neuzlādējas</strong> vai uzlāde pārtrūkst;',
    'kļūst <strong>karsts</strong> vai strauji izlādējas;',
    'pazūd skaņa, kamera vai tīkls;',
    'ekrānā parādās <strong>plankumi</strong> vai līnijas.',
  ],
  introP3:
    'Labā ziņa - ja ierīci atnes tajā pašā dienā, <strong>vairāk nekā 90% gadījumu</strong> izdodas to pilnībā atjaunot.',

  selectedModelPrefix: 'Atlasīts modelis:',
  selectedModelSuffix: 'Ritiniet uz',
  selectedModelLink: 'cenām',

  priceTitle: 'Ūdens bojājumu remonta cenas pēc modeļa',
  priceIntro:
    'Izvēlies savu iPhone modeli, lai redzētu ūdens bojājumu remonta izmaksas. Izmaksas atkarīgas no bojājuma apmēra un nepieciešamajām detaļām.',
  ctaLabel: 'Pieteikties remontam',

  processTitle: 'Kā notiek ūdens bojājumu remonts',
  processSteps: [
    {
      title: 'Diagnostika',
      text: 'Atveram ierīci un novērtējam oksidācijas un korozijas apmēru.',
    },
    {
      title: 'Tīrīšana un žāvēšana',
      text: 'Ultraskaņas tīrīšana, kontakti, savienojumu atjaunošana.',
    },
    {
      title: 'Bojāto komponentu maiņa',
      text: 'Pēc vajadzības mainām bateriju, uzlādes portu, kameras u.c.',
    },
    {
      title: 'Pilna pārbaude',
      text: 'Testējam skaņu, kameru, tīklu, sensorus un uzlādi.',
    },
    {
      title: 'Garantija',
      text: '90 dienas gan detaļām, gan darbam.',
    },
  ],

  faqTitle: 'Biežāk uzdotie jautājumi',

  breadcrumbServiceName: 'Ūdens bojājumi',
  serviceName: 'iPhone ūdens bojājumi - diagnostika un remonts Rīgā',
  serviceType: 'iPhone ūdens bojājumi - diagnostika un remonts',
  serviceDescription:
    'iPhone ūdens bojājumu diagnostika, tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa ar garantiju.',

  applyHref: '#pieteikties',

  homeCrumb: 'Sākums',
  hubCrumb: 'iPhone remonts',

  headerTitle: 'iPhone ūdens bojājumu diagnostika un remonts Rīgā',
  headerLead:
    'Ja iPhone iekritis ūdenī vai pēc mitruma vairs nedarbojas pareizi, atnes to uz diagnostiku pēc iespējas ātrāk. Veicam tīrīšanu, oksidācijas novēršanu un bojāto komponentu atjaunošanu ar 90 dienu garantiju.',
  headerCtaLabel: 'Skatīt cenas',

  applyAria: 'Pieteikties remontam',

  processName: 'iPhone ūdens bojājumu remonts',
  processDescription:
    'Kā iLab servisā notiek iPhone ūdens bojājumu remonts: diagnostika, tīrīšana, oksidācijas novēršana, bojāto detaļu maiņa un pārbaude.',
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
        strings.otherModels || 'Citi modeļi',
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