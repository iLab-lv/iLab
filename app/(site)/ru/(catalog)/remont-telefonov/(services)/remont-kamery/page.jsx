import PhoneCameraServicePage from '@site/(catalog)/telefonu-remonts/(services)/kameras-remonts/PhoneCameraServicePage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getCategoryBySlug } from '@/lib/content/categories';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const seo = getStaticPageSeo('phoneCameraRepair', locale);

const CATEGORY_KEY = 'telefonu-remonts';
const SERVICE_KEY = 'kameras-remonts';

const lvPath = seo.lvPath;
const routePath = seo.ruPath;
const categoryPath = '/ru/remont-telefonov';

const strings = {
  servicePath: routePath,
  categoryPath,
  allModelsHref: '/ru/remont-telefonov#brand-list',

  title: seo.title,
  description: seo.description,

  pageTitle: 'Ремонт камеры телефона в Риге',
  pageDescription:
    'Размытые фото, проблемы с фокусировкой или не работает камера? Ремонт и замена камеры телефона в Риге. Бесплатная диагностика и гарантия 90 дней.',

  homeCrumb: 'Главная',
  categoryCrumb: 'Ремонт телефонов',
  pageCrumb: 'Ремонт камеры',

  headerTitle: 'Ремонт камеры телефона в Риге',
  headerLead:
    'Ремонтируем камеру телефона при размытых фото, проблемах с фокусировкой, повреждённом стекле камеры или ошибках камеры. До ремонта проводим диагностику и после ремонта выдаём гарантию 90 дней.',
  headerCtaLabel: 'Смотреть цены',

  heroAlt: seo.imageAlt,
  heroImage: '/images/categories/kameras_remonts.webp',
  heroBodyHtml:
    '<p><strong>Ремонт камеры телефона в Риге</strong> - размытое изображение, повреждённое стекло или проблемы с фокусировкой? Выполняем диагностику и при необходимости <strong>замену модуля камеры или стекла</strong>. Бесплатная проверка и <strong>гарантия 90 дней</strong>.</p>',

  introTitle: 'Ремонт камеры телефона в Риге',
  introP1:
    'Симптомы, указывающие на <strong>повреждение камеры</strong>: <strong>размытое или зернистое изображение</strong>, <strong>неправильные цвета</strong>, <strong>полосы или пыль в кадре</strong>, <strong>нестабильный автофокус</strong>, чёрный экран в камере или ошибка приложения камеры. Если повреждено только <strong>стекло</strong>, часто достаточно замены стекла; если повреждён сам модуль, необходима <strong>замена камеры</strong>.',
  introP2:
    'После ремонта проверяем фокусировку, стабилизацию, качество фото и видео, а также работу приложения камеры. Популярные модели обычно ремонтируем за <strong>1–3 часа</strong>. На все работы и детали действует <strong>гарантия 90 дней</strong>.',

  selectedModelPrefix: 'Выбрана модель:',
  selectedModelSuffix: 'Прокрутите к',
  selectedModelLink: 'ценам',

  brandPickerTitle: 'Выберите бренд',
  pricelistTitle: 'Цены на ремонт камеры по модели',
  pricelistIntro:
    'Выберите бренд и модель, чтобы увидеть цену ремонта или замены камеры.',
  ctaLabel: 'Записаться на ремонт',

  processTitle: 'Как проходит ремонт камеры',
  processSteps: [
    {
      title: 'Диагностика',
      text: 'Проверяем модуль камеры, стекло, соединения и приложение камеры, чтобы точно определить неисправность.',
    },
    {
      title: 'Цена и срок',
      text: 'Согласовываем, менять ли стекло или весь модуль, а также стоимость и срок до начала ремонта.',
    },
    {
      title: 'Ремонт или замена',
      text: 'Выполняем замену модуля камеры или стекла, очищаем пыль и загрязнения, при необходимости восстанавливаем уплотнение.',
    },
    {
      title: 'Проверка',
      text: 'Тестируем фокус, резкость, стабилизацию, цвета и видеорежимы, чтобы камера снова работала корректно.',
    },
    {
      title: 'Гарантия',
      text: 'Выдаём устройство с гарантией 90 дней на деталь и работу, а также даём рекомендации по бережному использованию камеры.',
    },
  ],

  faqTitle: 'Часто задаваемые вопросы',

  serviceName: 'Ремонт камеры телефона в Риге',
  serviceType: 'Ремонт камеры телефона',
  serviceDescription:
    'Ремонт и замена камеры телефона в Риге: размытые фото, проблемы с фокусировкой, повреждённое стекло. Бесплатная диагностика и гарантия 90 дней.',

  processHowToName: 'Процесс ремонта камеры телефона в iLab',
  processHowToDescription:
    'Как шаг за шагом проходит ремонт и замена камеры телефона в сервисе iLab в Риге.',

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

async function getPhoneCameraServiceData({ selectedModel }) {
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
  return buildSeoMetadata(seo);
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedModel = resolvedSearchParams?.model
    ? String(resolvedSearchParams.model)
    : null;

  const data = await getPhoneCameraServiceData({
    selectedModel,
  });

  return (
    <>
      <JsonLd id="phone-camera-service-ru-jsonld" data={data.jsonLd} />

      <PhoneCameraServicePage locale={locale} {...data} />
    </>
  );
}