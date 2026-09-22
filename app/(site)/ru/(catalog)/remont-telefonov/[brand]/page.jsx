import { notFound, redirect } from 'next/navigation';

import PhoneBrandPage from '@site/(catalog)/telefonu-remonts/[brand]/PhoneBrandPage';

import JsonLd from '@components/seo/JsonLd';

import {
  getCategoryBySlug,
  getSeriesMetaByCategoryBrand,
} from '@/lib/content/categories';
import { getDevices } from '@/lib/content/devices';
import { resolveBrandPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import {
  buildItemListLd,
  buildRepairPageJsonLd,
} from '@/lib/seo/jsonld';

import { buildCategoryHref, buildServiceHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

export const dynamicParams = false;

const CATEGORY_KEY = 'telefonu-remonts';
const locale = 'ru';

const IPHONE_HUB_PATH_RU = '/ru/remont-iphone';

const fallbackMetaTitle = 'Ремонт телефонов в Риге | iLab';
const fallbackDescription =
  'Ремонт телефонов в Риге - быстрая диагностика, честные цены и гарантия в сервисе iLab.';

function isAppleBrand(brand) {
  return String(brand || '').toLowerCase() === 'apple';
}

function normalizeBrandSlug(brand) {
  return String(brand || '').trim().toLowerCase();
}

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

const processSteps = [
  {
    title: 'Диагностика',
    text: 'Быстро проверяем устройство и подтверждаем проблему.',
  },
  {
    title: 'Цена и срок',
    text: 'Согласовываем стоимость и срок выполнения до начала работ.',
  },
  {
    title: 'Ремонт',
    text: 'Сертифицированные мастера выполняют ремонт с использованием качественных деталей.',
  },
  {
    title: 'Проверка',
    text: 'После ремонта тестируем всю функциональность и безопасность устройства.',
  },
  {
    title: 'Гарантия',
    text: 'Гарантия до 1 года и рекомендации по дальнейшему использованию.',
  },
];

function getPopularRepairs() {
  return [
    {
      title: 'Замена дисплея (экрана)',
      text: 'трещины, тёмные пятна, сенсор не реагирует.',
      icon: LuSmartphone,
      href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina'),
    },
    {
      title: 'Замена батареи',
      text: 'заряд быстро падает, выключается при 10–20%.',
      icon: LuBatteryCharging,
      href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina'),
    },
    {
      title: 'Разъём зарядки',
      text: 'кабель не держится, зарядка медленная или нестабильная.',
      icon: LuPlugZap,
      href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina'),
    },
    {
      title: 'Камера',
      text: 'мутные фото, проблемы с фокусировкой.',
      icon: LuCamera,
      href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts'),
    },
    {
      title: 'Динамики/микрофон',
      text: 'тихий звук, хрипы, во время разговора плохо слышно.',
      icon: LuVolume2,
      href: buildServiceHref(
        locale,
        CATEGORY_KEY,
        'skalruni-mikrofona-remonts'
      ),
    },
    {
      title: 'Повреждения от влаги',
      text: 'диагностика и восстановление, если это возможно.',
      icon: LuDroplets,
      href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts'),
    },
  ];
}

function getPageStrings({ brandName, page }) {
  const selectorHeading =
    page?.selector?.heading || `Выберите модель ${brandName}`;

  const selectorIntro =
    page?.selector?.intro ||
    'Найдите нужную модель по названию или откройте нужную серию и выберите своё устройство.';

  const heroHtml =
    pickLocalized(page?.source?.brand?.page?.bodyHtml, locale, '') ||
    `<p><strong>${brandName} ремонт телефонов в Риге</strong> - замена экрана, батареи, камеры и разъёма зарядки с быстрой диагностикой и <strong>гарантией до 1 года</strong>.</p>`;

  return {
    introTitle: `${brandName} ремонт телефонов - что мы делаем`,
    introLead:
      'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы. Цена зависит от модели - откройте страницу своей модели, чтобы увидеть конкретные цены и сроки.',
    introParagraph:
      'Самые частые работы: <strong>замена экрана</strong> (трещины, тёмные пятна, сенсор не реагирует), <strong>замена батареи</strong> (быстрая разрядка, выключается при 10–20%), <strong>разъём зарядки</strong> (кабель не держится, зарядка медленная или нестабильная), <strong>камера</strong> (мутные фото, ошибки фокусировки), <strong>динамики/микрофон</strong> (тихий звук, хрипы), а также <strong>повреждения от влаги</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
    servicesTitle: 'Популярный ремонт',
    modelGridHeading: selectorHeading,
    modelGridIntro: selectorIntro,
    modelsNote:
      'Цена зависит от модели - откройте страницу своей модели, чтобы увидеть стоимость ремонта.',
    noModels: 'Пока для этого бренда не добавлены модели.',
    processTitle: 'Как проходит ремонт',
    heroHtml,
    heroAlt: `${brandName} ремонт телефонов`,
    categoryName: 'Ремонт телефонов',
    serviceName: `${brandName} ремонт телефонов`,
    serviceDescription: `${brandName} ремонт телефонов: дисплей, батарея, разъём зарядки, камера и другие работы. Быстрая диагностика, честные цены, гарантия.`,
    homeCrumb: 'Главная',
    scrollCta: { label: 'Смотреть модели', targetId: 'brand-modeli' },
    fallbackTitle: `${brandName} ремонт телефонов`,
  };
}

async function getPhoneBrandStaticParams() {
  const category = await getCategoryBySlug(CATEGORY_KEY);

  if (!category || !Array.isArray(category.brands)) {
    return [];
  }

  return category.brands
    .map((brand) => normalizeBrandSlug(brand?.key))
    .filter((brand) => brand && brand !== 'apple')
    .map((brand) => ({ brand }));
}

export async function generateStaticParams() {
  const params = await getPhoneBrandStaticParams();

  return [...params, { brand: 'apple' }];
}

function getBrandName(page, brandSlug) {
  return pickLocalized(
    page?.source?.brand?.labels,
    locale,
    page?.source?.brand?.name || brandSlug
  );
}

function getBaseCategoryPath() {
  return buildCategoryHref(locale, CATEGORY_KEY);
}

function getBaseHref(brandSlug) {
  return `${getBaseCategoryPath()}/${brandSlug}`;
}

function getAlternatePaths(brandSlug) {
  return {
    lvPath: `/telefonu-remonts/${brandSlug}`,
    ruPath: `/ru/remont-telefonov/${brandSlug}`,
  };
}

function getPageTitle(page, brandName) {
  return page?.seo?.metaTitle || `${brandName} ремонт телефонов в Риге | iLab`;
}

function getPageDescription(page, strings) {
  return page?.seo?.metaDescription || strings.serviceDescription;
}

function getHeaderTitle(page, strings) {
  return page?.seo?.h1 || page?.seo?.breadcrumbName || strings.fallbackTitle;
}

function getHeaderLead(page) {
  return (
    page?.intro?.lead ||
    page?.seo?.metaDescription ||
    page?.seo?.schemaDescription ||
    null
  );
}

function getBreadcrumbs({
  page,
  strings,
  headerTitle,
  baseCategoryPath,
  baseHref,
}) {
  return [
    {
      label: page?.labels?.homeCrumb || strings.homeCrumb,
      href: '/ru',
    },
    {
      label: strings.categoryName,
      href: baseCategoryPath,
    },
    {
      label: page?.seo?.breadcrumbName || headerTitle,
      href: baseHref,
    },
  ];
}

function getBrandPhoneList({ devicesAll, brandSlug }) {
  return devicesAll.filter(
    (device) =>
      device?.type === 'device' &&
      device.categoryKey === CATEGORY_KEY &&
      device.brandKey === brandSlug &&
      device.isHidden !== true
  );
}

async function getPhoneBrandPageData(brandSlug) {
  if (!brandSlug || isAppleBrand(brandSlug)) {
    return null;
  }

  const [page, devicesAll, seriesMeta, faq] = await Promise.all([
    resolveBrandPage(CATEGORY_KEY, brandSlug, locale),
    getDevices(),
    getSeriesMetaByCategoryBrand(CATEGORY_KEY, brandSlug, locale),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  if (!page) {
    return null;
  }

  const brandName = getBrandName(page, brandSlug);
  const strings = getPageStrings({ brandName, page });

  const baseCategoryPath = getBaseCategoryPath();
  const baseHref = getBaseHref(brandSlug);

  const brandPhoneList = getBrandPhoneList({ devicesAll, brandSlug });

  const headerTitle = getHeaderTitle(page, strings);
  const headerLead = getHeaderLead(page);
  const breadcrumbs = getBreadcrumbs({
    page,
    strings,
    headerTitle,
    baseCategoryPath,
    baseHref,
  });

  const faqRenderItems = toFaqRenderItems(faq.items);

  const hasVisibleFaq = Boolean(
    page.sections?.hasFaq !== false && faq.items.length > 0
  );

  const hasVisibleProcess = Boolean(page.sections?.hasProcess);

  const serviceImage =
    page.hero?.image || '/images/categories/telefonu_remonts.webp';

  const itemListLd = buildItemListLd(
    brandPhoneList.map((device) => ({
      name: pickLocalized(device.name, locale, device.name || device.slug),
      url: `${baseHref}/${device.slug}`,
    })),
    {
      id: `${baseHref}#model-list`,
    }
  );

  const jsonLd = buildRepairPageJsonLd({
    path: baseHref,
    locale,

    pageName: getPageTitle(page, brandName),
    pageDescription: getPageDescription(page, strings),

    breadcrumbs,

    serviceName: page.seo?.schemaName || strings.serviceName,
    serviceDescription:
      page.seo?.schemaDescription || strings.serviceDescription,
    serviceType: page.seo?.serviceType || strings.serviceName,
    serviceImage,

    faqItems: faq.items,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: strings.serviceName,
          description: strings.serviceDescription,
          image: serviceImage,
          steps: processSteps.map((step) => ({
            name: step.title,
            text: step.text,
          })),
        }
      : null,

    extra: [itemListLd],
  });

  return {
    page,
    brandSlug,
    brandName,
    devicesAll,
    seriesMeta,
    brandPhoneList,
    baseHref,
    headerTitle,
    headerLead,
    breadcrumbs,
    strings,
    processSteps,
    popularRepairs: getPopularRepairs(),

    hasVisibleFaq,
    faqTitle: faq.title,
    faqItems: faqRenderItems,

    jsonLd,
  };
}

export async function generateMetadata({ params }) {
  const brandSlug = normalizeBrandSlug(params.brand);

  if (isAppleBrand(brandSlug)) {
    const metadata = buildSeoMetadata({
      locale,
      title: 'Ремонт iPhone в Риге | iLab',
      description: 'Ремонт iPhone в Риге в сервисе iLab.',
      lvPath: '/iphone-remonts',
      ruPath: IPHONE_HUB_PATH_RU,
    });

    return {
      ...metadata,
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const page = await resolveBrandPage(CATEGORY_KEY, brandSlug, locale);

  if (!page) {
    return buildSeoMetadata({
      locale,
      title: fallbackMetaTitle,
      description: fallbackDescription,
      ...getAlternatePaths(brandSlug),
    });
  }

  const brandName = getBrandName(page, brandSlug);
  const strings = getPageStrings({ brandName, page });

  const image = page?.seo?.ogImage || '/images/og/home.jpg';

  const imageAlt =
    page?.seo?.ogImageAlt ||
    page?.seo?.imageAlt ||
    page?.seo?.breadcrumbName ||
    strings.heroAlt;

  return buildSeoMetadata({
    locale,
    title: getPageTitle(page, brandName),
    description: getPageDescription(page, strings),
    ...getAlternatePaths(brandSlug),
    image,
    imageAlt,
  });
}

export default async function Page({ params }) {
  const brandSlug = normalizeBrandSlug(params.brand);

  if (isAppleBrand(brandSlug)) {
    redirect(IPHONE_HUB_PATH_RU);
  }

  const data = await getPhoneBrandPageData(brandSlug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`remont-telefonov-${data.brandSlug}-jsonld`}
        data={data.jsonLd}
      />

      <PhoneBrandPage locale={locale} {...data} />
    </>
  );
}