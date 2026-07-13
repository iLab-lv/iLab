import IphoneBatteryServicePage from '@site/(catalog)/iphone-remonts/(services)/baterijas-maina/IphoneBatteryServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const seo = getStaticPageSeo('iphoneBatteryReplacement', locale);

const SERVICE_IDS = ['phone-battery'];
const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'baterijas-maina';

const lvPath = seo.lvPath;
const routePath = seo.ruPath;
const hubPath = '/ru/remont-iphone';
const allModelsHref = '/ru/remont-iphone#iphone-modeli';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/baterijas_maina.webp',
  heroBodyHtml:
    '<p><strong>Замена батареи iPhone в Риге</strong> в сервисе iLab - быстрая диагностика, качественные детали и <strong>гарантия 90 дней</strong>. Часто замену аккумулятора выполняем в тот же день.</p>',

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

  headerTitle: 'Замена батареи iPhone в Риге',
  headerLead:
    'Меняем аккумулятор iPhone, если батарея быстро разряжается, телефон выключается, греется или нестабильно показывает заряд. До ремонта проводим диагностику, согласовываем стоимость и после замены выдаём гарантию 90 дней.',
  headerCtaLabel: 'Смотреть цены',

  applyAria: 'Записаться на ремонт',

  processName: 'Замена батареи iPhone',
  processDescription:
    'Как проходит замена батареи iPhone в iLab: диагностика, согласование цены, замена, проверка и гарантия.',
  processSteps: [
    {
      name: 'Диагностика',
      text: 'Проверяем состояние батареи и работу iPhone.',
    },
    {
      name: 'Цена и сроки',
      text: 'Согласовываем стоимость и срок замены до начала работы.',
    },
    {
      name: 'Замена батареи',
      text: 'Меняем аккумулятор и проверяем подключение новой детали.',
    },
    {
      name: 'Проверка',
      text: 'Тестируем зарядку, стабильность работы и основные функции.',
    },
    {
      name: 'Гарантия',
      text: 'Предоставляем гарантию 90 дней на работу и установленную деталь.',
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

async function getIphoneBatteryServiceData({ selectedModel }) {
  const [devices, pricing, serviceMeta, faq, reviewsSummary] = await Promise.all([
    getDevicesForIphone(),
    buildPricing(),
    getServiceMetaMap(SERVICE_IDS),
    getFaqGroups(
      [
        { scopeType: 'service', scopeKey: SERVICE_KEY },
      ],
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

  const data = await getIphoneBatteryServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="iphone-battery-service-ru-jsonld" data={data.jsonLd} />

      <IphoneBatteryServicePage locale={locale} {...data} />
    </>
  );
}
