import IphoneWaterDamageServicePage from '@site/(catalog)/iphone-remonts/(services)/udens-bojajumu-remonts/IphoneWaterDamageServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const seo = getStaticPageSeo('iphoneWaterDamageRepair', locale);

const SERVICE_IDS = ['water-damage'];

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const SERVICE_KEY = 'udens-bojajumu-remonts';

const lvPath = seo.lvPath;
const routePath = seo.ruPath;
const hubPath = '/ru/remont-iphone';
const allModelsHref = '/ru/remont-iphone#iphone-modeli';

const strings = {
  title: seo.title,
  description: seo.description,

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/udens_bojajumi.webp',
  heroBodyHtml:
    '<p><strong>iPhone после воды или влаги</strong> нужно как можно быстрее доставить в сервис. iLab проводит диагностику, чистку, устранение окисления и проверку повреждённых узлов. Цель - по возможности сохранить устройство и данные.</p>',

  headerTitle: 'Ремонт iPhone после влаги в Риге',
  headerLead:
    'Если iPhone упал в воду, получил влагу или после жидкости больше не включается, важно не рисковать повторной зарядкой. Проводим диагностику, чистку, устранение коррозии и проверяем возможность сохранить данные.',
  headerCtaLabel: 'Записаться на диагностику',

  introTitle: 'Что делать, если iPhone попал в воду?',
  introP1:
    'После попадания влаги самое важное - действовать быстро: выключить устройство, не заряжать его и не сушить на батарее или феном. Жидкость может вызвать окисление, короткое замыкание и повредить плату или другие важные узлы.',
  introP2:
    'В сервисе iLab выполняем профессиональную диагностику, чистку и устранение окисления. При необходимости проверяем возможность сохранить данные. Варианты ремонта и цену согласовываем после диагностики.',

  selectedModelPrefix: 'Выбрана модель:',
  selectedModelSuffix: 'Прокрутите к',
  selectedModelLink: 'информации',

  modelPickerTitle: 'Выберите модель iPhone',
  priceTitle: 'Диагностика и ремонт после влаги',
  priceIntro:
    'При попадании воды точную цену можно определить только после диагностики. Выберите модель, чтобы записаться на проверку или консультацию.',
  ctaLabel: 'Записаться на диагностику',

  processTitle: 'Как проходит диагностика после влаги',
  processSteps: [
    {
      title: 'Быстрый приём',
      text: 'Фиксируем ситуацию: когда и как устройство контактировало с жидкостью.',
    },
    {
      title: 'Диагностика',
      text: 'Проверяем плату, соединения, дисплей, батарею и узел зарядки.',
    },
    {
      title: 'Чистка',
      text: 'Удаляем следы влаги и окисления подходящими средствами.',
    },
    {
      title: 'Оценка ремонта',
      text: 'Определяем повреждённые детали и согласовываем возможное решение.',
    },
    {
      title: 'Данные',
      text: 'Если восстановление устройства невыгодно, оцениваем возможность сохранить данные.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  breadcrumbServiceName: 'Ремонт после влаги',
  serviceName: 'Ремонт iPhone после влаги в Риге',
  serviceType: 'Ремонт iPhone после влаги',
  serviceDescription:
    'Диагностика iPhone после влаги в Риге: чистка, устранение окисления, проверка повреждённых узлов и возможность сохранить данные.',

  homeCrumb: 'Главная',
  hubCrumb: 'Ремонт iPhone',

  applyAria: 'Записаться на диагностику',

  processName: 'Диагностика iPhone после влаги',
  processDescription:
    'Как проходит диагностика iPhone после влаги в iLab: приём, проверка, чистка, оценка ремонта и проверка возможности сохранить данные.',
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
        'Другие модели',
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
      <JsonLd id="iphone-water-damage-service-ru-jsonld" data={data.jsonLd} />

      <IphoneWaterDamageServicePage locale={locale} {...data} />
    </>
  );
}
