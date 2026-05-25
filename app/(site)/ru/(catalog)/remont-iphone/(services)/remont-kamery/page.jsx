import IphoneCameraServicePage from '@site/(catalog)/iphone-remonts/(services)/kameras-remonts/IphoneCameraServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const SERVICE_IDS = ['camera-glass', 'camera'];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'kameras-remonts';

const lvPath = '/iphone-remonts/kameras-remonts';
const routePath = '/ru/remont-iphone/remont-kamery';
const hubPath = '/ru/remont-iphone';
const allModelsHref = '/ru/remont-iphone#iphone-modeli';

const strings = {
  title: 'Ремонт камеры iPhone в Риге | iLab',
  description:
    'Мутные фото или проблемы с фокусировкой? Ремонт и замена камеры iPhone в Риге - диагностика, замена стекла камеры и модуля по необходимости. Гарантия 90 дней.',

  heroAlt: 'Ремонт камеры iPhone в Риге',
  heroImage: '/images/categories/kameras_remonts.webp',
  heroBodyHtml:
    '<p><strong>Мутные фото или проблемы с фокусировкой?</strong> Выполняем <strong>ремонт и замену камеры iPhone</strong> - диагностика, замена стекла камеры или модуля по необходимости. <strong>Гарантия 90 дней.</strong></p>',

  introTitle: 'Ремонт и замена камеры iPhone в Риге',
  introP1:
    'Если фотографии получаются мутными, с пятнами или телефон не может сфокусироваться, сначала проверяем <strong>стекло камеры и модуль</strong>. Если повреждено только стекло, часто достаточно его замены. Если поврежден сам модуль - предложим замену модуля с полной проверкой.',
  introP2:
    'После ремонта проверяем <strong>фокусировку, стабилизацию, цветопередачу и вспышку</strong>. Популярные модели обычно ремонтируем за <strong>45–90 минут</strong>. На все работы и детали действует <strong>гарантия 90 дней</strong>.',

  selectedModelPrefix: 'Выбрана модель:',
  selectedModelSuffix: 'Прокрутите к',
  selectedModelLink: 'ценам',

  modelPickerTitle: 'Выберите модель iPhone',
  priceTitle: 'Цены на замену стекла камеры и модуля по моделям',
  priceIntro:
    'Посмотрите стоимость замены стекла камеры и модуля iPhone по моделям. Сначала проводим диагностику, чтобы определить, какой вариант нужен.',
  ctaLabel: 'Записаться на ремонт',

  processTitle: 'Как проходит ремонт',
  processSteps: [
    {
      title: 'Диагностика',
      text: 'Проверяем стекло камеры, модуль, соединения и программную часть.',
    },
    {
      title: 'Цена и срок',
      text: 'Согласовываем стоимость и время ремонта до начала работ.',
    },
    {
      title: 'Ремонт',
      text: 'Меняем стекло или модуль камеры, при необходимости выполняем калибровку.',
    },
    {
      title: 'Тесты',
      text: 'Проверяем фокусировку, стабилизацию, вспышку и качество изображения.',
    },
    {
      title: 'Гарантия',
      text: 'Гарантия 90 дней на детали и выполненные работы.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  breadcrumbServiceName: 'Ремонт камеры',
  serviceName: 'Ремонт камеры iPhone в Риге',
  serviceType: 'Ремонт камеры iPhone',
  serviceDescription:
    'Ремонт камеры iPhone в Риге: диагностика, замена стекла камеры и замена модуля по необходимости. Гарантия 90 дней.',

  homeCrumb: 'Главная',
  hubCrumb: 'Ремонт iPhone',
  otherModels: 'Другие модели',

  headerTitle: 'Ремонт камеры iPhone в Риге',
  headerLead:
    'Ремонтируем камеру iPhone при мутных фото, пятнах, проблемах с фокусировкой и повреждённом стекле камеры. До ремонта проводим диагностику, согласовываем стоимость и после ремонта выдаём гарантию 90 дней.',
  headerCtaLabel: 'Смотреть цены',

  applyAria: 'Записаться на ремонт',

  processName: 'Ремонт камеры iPhone',
  processDescription:
    'Как проходит ремонт камеры iPhone в iLab: диагностика, согласование цены, замена стекла или модуля, тесты и гарантия.',
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

  const data = await getIphoneCameraServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="iphone-camera-service-ru-jsonld" data={data.jsonLd} />

      <IphoneCameraServicePage locale={locale} {...data} />
    </>
  );
}