import PhoneAudioServicePage from '@site/(catalog)/telefonu-remonts/(services)/skalruni-mikrofona-remonts/PhoneAudioServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'skalruni-mikrofona-remonts';

const lvPath = '/telefonu-remonts/skalruni-mikrofona-remonts';
const routePath = '/ru/remont-telefonov/remont-dinamika-mikrofona';
const categoryPath = '/ru/remont-telefonov';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/ru/remont-telefonov#brand-list',

  title: 'Ремонт динамика и микрофона телефона в Риге | iLab',
  description:
    'Тихий звук, хрипы или во время разговора не слышно? Ремонт и чистка динамика и микрофона телефона в Риге. Бесплатная диагностика и гарантия 90 дней.',

  pageTitle: 'Ремонт динамика и микрофона телефона в Риге',
  pageDescription:
    'Тихий звук, хрипы или во время разговора не слышно? Ремонт и чистка динамика и микрофона телефона в Риге. Бесплатная диагностика и гарантия 90 дней.',

  homeCrumb: 'Главная',
  categoryCrumb: 'Ремонт телефонов',
  pageCrumb: 'Ремонт динамика и микрофона',

  headerTitle: 'Ремонт динамика и микрофона телефона в Риге',
  headerLead:
    'Ремонтируем динамик и микрофон телефона, если звук тихий, искажённый, с хрипами или вас не слышно во время разговора. До ремонта проводим диагностику и после ремонта выдаём гарантию 90 дней.',
  headerCtaLabel: 'Смотреть цены',

  heroAlt: 'Ремонт динамика и микрофона телефона в Риге',
  heroImage: '/images/categories/mikrofona_remonts.webp',
  heroBodyHtml:
    '<p><strong>Ремонт динамика и микрофона в Риге</strong> - если во время разговора не слышно, звук тихий, с хрипами или в записи голоса есть шум, выполним чистку или замену модулей. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>',

  introTitle: 'Ремонт динамика и микрофона телефона',
  introP1:
    'Типичные симптомы: <strong>тихий звук</strong>, <strong>искажённый звук</strong>, <strong>хрипы</strong>, <strong>во время разговора плохо слышно</strong> или слышно с <strong>сильным шумом/фоном</strong>, а также <strong>запись голоса без звука</strong>. Во многих случаях достаточно <strong>чистки сеток динамика и микрофона</strong>, но если модуль повреждён или окислился, выполняем <strong>замену динамика или микрофона</strong>.',
  introP2:
    'После ремонта проверяем разговорный динамик, мультимедийный динамик, все микрофоны и шумоподавление в разных сценариях: разговор, громкая связь и запись голоса. Популярные модели обычно ремонтируем за <strong>45–90 минут</strong>. На работу и детали действует <strong>гарантия 90 дней</strong>.',

  selectedModelPrefix: 'Выбрана модель:',
  selectedModelSuffix: 'Прокрутите к',
  selectedModelLink: 'ценам',

  brandPickerTitle: 'Выберите бренд',
  pricelistTitle: 'Цены на ремонт динамика и микрофона по модели',
  pricelistIntro:
    'Выберите бренд и модель, чтобы увидеть цену чистки или замены динамика и микрофона.',
  ctaLabel: 'Записаться на ремонт',

  processTitle: 'Как проходит ремонт динамика и микрофона',
  processSteps: [
    {
      title: 'Диагностика',
      text: 'Проверяем динамики, микрофоны, сетки, контакты и разъёмы; тестируем звонок, мультимедийный звук и запись голоса.',
    },
    {
      title: 'Цена и срок',
      text: 'Объясняем, достаточно ли чистки или нужна замена модуля, и согласовываем стоимость и срок до начала ремонта.',
    },
    {
      title: 'Ремонт или замена',
      text: 'Выполняем чистку сеток и контактов либо замену повреждённых модулей динамика/микрофона, устраняем следы окисления при необходимости.',
    },
    {
      title: 'Проверка',
      text: 'Тестируем звонки, динамики, запись голоса и шумоподавление в разных режимах и на разной громкости.',
    },
    {
      title: 'Гарантия',
      text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, а также даём рекомендации по защите от пыли и влаги.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  serviceName: 'Ремонт динамика и микрофона телефона в Риге',
  serviceType: 'Ремонт динамика и микрофона телефона',
  serviceDescription:
    'Ремонт и чистка динамика и микрофона телефона в Риге: тихий звук, хрипы, проблемы во время разговора или шум. Бесплатная диагностика и гарантия 90 дней.',

  processHowToName: 'Процесс ремонта динамика и микрофона телефона в iLab',
  processHowToDescription:
    'Как шаг за шагом проходит ремонт и чистка динамика и микрофона телефона в сервисе iLab в Риге.',

  applyAria: 'Записаться на ремонт',
};

function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') {
    return value || fallback;
  }

  if (typeof value === 'object') {
    return (
      value?.[locale] ??
      value?.lv ??
      Object.values(value).find(Boolean) ??
      fallback
    );
  }

  return fallback;
}

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = String(item?.q || item?.question || '')
      .trim()
      .toLowerCase();

    if (!key || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

async function getPhoneDevices() {
  const snap = await db
    .collection('devices')
    .where('categoryKey', '==', CATEGORY_KEY)
    .get();

  return snap.docs
    .map((doc) => {
      const data = doc.data() || {};

      return {
        id: doc.id,
        slug: data.slug || doc.id,
        name: data.name || '',
        image: data.image || '',
        year: typeof data.year === 'number' ? data.year : null,
        brandSlug: data.brandKey || data.brandSlug || '',
        category: data.categoryKey || CATEGORY_KEY,
        series: data.seriesLabel || data.originalSeriesLabel || '',
        isHidden: data.isHidden === true,
      };
    })
    .filter((device) => device.slug && device.brandSlug && !device.isHidden);
}

async function getPhoneBrandOptions(devices = []) {
  const category = await getCategoryBySlug(CATEGORY_KEY);
  const categoryBrands = Array.isArray(category?.brands) ? category.brands : [];

  const devicesByBrand = new Set(
    devices
      .map((device) => String(device.brandSlug || '').trim().toLowerCase())
      .filter(Boolean)
  );

  const brandOptions = categoryBrands
    .map((brand) => {
      const slug = String(brand?.key || brand?.slug || '').trim().toLowerCase();

      if (!slug || !devicesByBrand.has(slug)) {
        return null;
      }

      return {
        slug,
        name: pickLocalized(brand.labels, locale, brand.name || slug),
        order: Number.isFinite(Number(brand.order)) ? Number(brand.order) : 9999,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)
    .map(({ slug, name }) => ({ slug, name }));

  const hasSamsung = brandOptions.some((brand) => brand.slug === 'samsung');

  return {
    brandOptions,
    defaultBrand: hasSamsung ? 'samsung' : brandOptions[0]?.slug || 'samsung',
  };
}

function buildBreadcrumbs() {
  return [
    {
      label: strings.homeCrumb,
      href: '/ru',
    },
    {
      label: strings.categoryCrumb,
      href: strings.categoryPath,
    },
    {
      label: strings.pageCrumb,
      href: strings.servicePath,
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

async function getPhoneAudioServiceData({ selectedModel }) {
  const [devices, faq] = await Promise.all([
    getPhoneDevices(),
    getFaqGroups(
      [
        { scopeType: 'service', scopeKey: SERVICE_KEY },
        { scopeType: 'basic' },
      ],
      locale
    ),
  ]);

  const { brandOptions, defaultBrand } = await getPhoneBrandOptions(devices);

  const faqSections = buildFaqSections(faq.groups);

  const mergedFaqItems = dedupeFaqItems(
    faqSections.flatMap((section) => section.rawItems || [])
  );

  const breadcrumbs = buildBreadcrumbs();

  const hasVisibleFaq = mergedFaqItems.length > 0;

  const jsonLd = buildRepairPageJsonLd({
    path: strings.servicePath,
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
      name: strings.processHowToName,
      description: strings.processHowToDescription,
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
    brandOptions,
    defaultBrand,
    selectedModel,

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

  const data = await getPhoneAudioServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="phone-audio-service-ru-jsonld" data={data.jsonLd} />

      <PhoneAudioServicePage locale={locale} {...data} />
    </>
  );
}