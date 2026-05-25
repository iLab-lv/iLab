import IphoneWaterDamageServicePage from '@site/(catalog)/iphone-remonts/(services)/udens-bojajumu-remonts/IphoneWaterDamageServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const SERVICE_IDS = ['water-damage-clean'];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'udens-bojajumu-remonts';

const lvPath = '/iphone-remonts/udens-bojajumu-remonts';
const routePath = '/ru/remont-iphone/remont-posle-popadaniya-vlagi';
const hubPath = '/ru/remont-iphone';
const allModelsHref = '/ru/remont-iphone#iphone-modeli';

const strings = {
  title: 'Ремонт iPhone после попадания влаги в Риге | iLab',
  description:
    'iPhone упал в воду или не включается после влаги? Выполняем диагностику, чистку и устранение последствий попадания влаги. Быстрая помощь и гарантия 90 дней.',

  heroAlt: 'Повреждение iPhone после попадания влаги',
  heroImage: '/images/categories/udens_bojajumi.webp',
  heroBodyHtml:
    '<p><strong>iPhone упал в воду или перестал включаться после влаги?</strong> Выполняем <strong>диагностику и ремонт после попадания влаги</strong> в Риге - чистка, устранение окисления и замена поврежденных деталей. Чем быстрее принесёте, тем выше шанс восстановления. <strong>Гарантия 90 дней</strong>.</p>',

  introTitle: 'Повреждение iPhone водой - что делать?',
  introP1:
    'Если <strong>iPhone упал в воду</strong>, в море, бассейн или на него попала жидкость, важно действовать сразу. Вода вызывает <strong>окисление и коррозию</strong>, повреждает соединения и может привести к короткому замыканию. Правильные действия в первые минуты заметно повышают шанс полного восстановления устройства.',
  introP2: 'Наши специалисты чаще всего сталкиваются с ситуациями, когда телефон:',
  introList: [
    'после воды <strong>не включается</strong>;',
    '<strong>не заряжается</strong> или зарядка прерывается;',
    'становится <strong>горячим</strong> или быстро разряжается;',
    'пропадает звук, камера или сеть;',
    'на экране появляются <strong>пятна</strong> или полосы.',
  ],
  introP3:
    'Хорошая новость - если принести устройство в тот же день, <strong>более чем в 90% случаев</strong> его удаётся полностью восстановить.',

  selectedModelPrefix: 'Выбрана модель:',
  selectedModelSuffix: 'Прокрутите к',
  selectedModelLink: 'ценам',

  priceTitle: 'Цены на ремонт после попадания влаги по моделям',
  priceIntro:
    'Выберите модель iPhone, чтобы посмотреть стоимость ремонта после попадания влаги. Цена зависит от степени повреждения и необходимых деталей.',
  ctaLabel: 'Записаться на ремонт',

  processTitle: 'Как проходит ремонт после попадания влаги',
  processSteps: [
    {
      title: 'Диагностика',
      text: 'Открываем устройство и оцениваем степень окисления и коррозии.',
    },
    {
      title: 'Чистка и сушка',
      text: 'Ультразвуковая чистка, обработка контактов и восстановление соединений.',
    },
    {
      title: 'Замена поврежденных компонентов',
      text: 'При необходимости меняем батарею, разъём зарядки, камеры и другие детали.',
    },
    {
      title: 'Полная проверка',
      text: 'Тестируем звук, камеру, сеть, датчики и зарядку.',
    },
    {
      title: 'Гарантия',
      text: '90 дней гарантии на детали и выполненные работы.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  breadcrumbServiceName: 'Ремонт после попадания влаги',
  serviceName: 'Ремонт iPhone после попадания влаги в Риге',
  serviceType: 'Ремонт iPhone после попадания влаги',
  serviceDescription:
    'Диагностика, чистка после попадания влаги, устранение окисления и замена поврежденных деталей iPhone с гарантией.',

  applyHref: '#pieteikties',

  homeCrumb: 'Главная',
  hubCrumb: 'Ремонт iPhone',

  headerTitle: 'Ремонт iPhone после попадания влаги в Риге',
  headerLead:
    'Если iPhone упал в воду или перестал нормально работать после влаги, принесите его на диагностику как можно быстрее. Выполняем чистку, устранение окисления и восстановление устройства с гарантией 90 дней.',
  headerCtaLabel: 'Смотреть цены',

  applyAria: 'Записаться на ремонт',

  processName: 'Ремонт iPhone после попадания влаги',
  processDescription:
    'Как проходит ремонт iPhone после попадания влаги в iLab: диагностика, чистка, устранение окисления, замена повреждённых деталей и проверка.',
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
        strings.otherModels || 'Другие модели',
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
      href: '/ru',
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
    lvPath,
    ruPath: routePath,
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
      <JsonLd id="iphone-water-damage-service-ru-jsonld" data={data.jsonLd} />

      <IphoneWaterDamageServicePage locale={locale} {...data} />
    </>
  );
}