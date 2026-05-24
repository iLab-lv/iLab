import PhoneRepairPage from '@site/(catalog)/telefonu-remonts/PhoneRepairPage';

import JsonLd from '@components/seo/JsonLd';

import { getDevices } from '@/lib/content/devices';
import { resolveCategoryPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import {
  buildItemListLd,
  buildRepairPageJsonLd,
} from '@/lib/seo/jsonld';

import { buildCategoryHref, buildServiceHref } from '@/lib/routes/routeI18n';
import { localizedCategoryPath } from '@/lib/routes/localizedPath';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

const CATEGORY_KEY = 'telefonu-remonts';

const locale = 'ru';

const lvPath = localizedCategoryPath(CATEGORY_KEY, 'lv');
const ruPath = localizedCategoryPath(CATEGORY_KEY, 'ru');

const fallbackMetaTitle =
  'Ремонт телефонов в Риге - цены, быстро, гарантия | iLab';

const fallbackDescription =
  'Ремонт телефонов всех брендов: экран, батарея, разъём зарядки, камера, повреждения от влаги. Быстрая диагностика, честные цены, гарантия 90 дней.';

const labels = {
  heroAlt: 'ремонт телефонов в Риге',
  heroBodyHtml:
    '<p><strong>Быстрый и безопасный ремонт телефонов в Риге</strong> - замена экрана, батареи и камеры в тот же день. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>',
  introTitle: 'Ремонт телефонов - что мы делаем',
  introLead:
    'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы. Стоимость согласовываем до начала работ, самые частые ремонты выполняем в тот же день. Выберите свой бренд и откройте страницу конкретной модели.',
  introP1:
    'Ежедневно выполняем <strong>ремонт телефонов</strong> - от <strong>замены экрана</strong> и <strong>батареи</strong> до <strong>ремонта разъёма зарядки</strong>, <strong>проблем с камерой</strong> и устранения <strong>повреждений после попадания влаги</strong>. До начала работ согласовываем <strong>цену и срок</strong>, самые частые ремонты выполняем в тот же день. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
  introP2:
    'Работаем со <strong>всеми популярными брендами</strong>: <a href="/ru/remont-iphone">ремонт iPhone</a>, <a href="/ru/remont-telefonov/samsung">ремонт Samsung</a>, <a href="/ru/remont-telefonov/huawei">ремонт Huawei</a>, <a href="/ru/remont-telefonov/oneplus">ремонт OnePlus</a> и др. Для каждого бренда доступны отдельные <strong>страницы моделей</strong> с типовыми неисправностями и решениями.',
  introP3:
    'Самые частые работы: <strong>ремонт дисплея</strong> (трещины, тёмные пятна, сенсор не реагирует), <strong>замена батареи</strong> (заряд быстро падает, телефон выключается при 10–20%), <strong>разъём зарядки</strong> (кабель не держится, зарядка медленная/нестабильная), <strong>камера</strong> (мутные фото, ошибки фокусировки), <strong>динамики/микрофон</strong> (тихий звук, хрипы, во время разговора не слышно), а также <strong>повреждения от влаги</strong>. Если не уверены в названии модели, выберите бренд ниже и найдите модель в списке.',
  fallbackTitle: 'Ремонт телефонов в Риге',
  homeCrumb: 'Главная',
  serviceName: 'Ремонт телефонов',
  serviceDescription:
    'Ремонт телефонов - дисплеи, батареи, разъёмы зарядки, камеры и другие работы. Быстрая диагностика, понятные цены, гарантия.',
  serviceType: 'Ремонт телефонов',
  servicesTitle: 'Популярный ремонт',
  faqTitle: 'Часто задаваемые вопросы',
  processTitle: 'Как проходит ремонт',
  processSteps: [
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
      text: 'После ремонта тестируем функциональность и безопасность устройства.',
    },
    {
      title: 'Гарантия',
      text: 'Гарантия 90 дней и рекомендации по дальнейшему использованию.',
    },
  ],
  scrollCta: {
    label: 'Смотреть бренды',
    targetId: 'brand-list',
  },
  imageAlt: 'Ремонт телефонов в Риге',
};

const servicesItems = [
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
    text: 'тихий звук, хрипы, во время разговора не слышно.',
    icon: LuVolume2,
    href: buildServiceHref(locale, CATEGORY_KEY, 'skalruni-mikrofona-remonts'),
  },
  {
    title: 'Повреждения от влаги',
    text: 'диагностика и восстановление, если это возможно.',
    icon: LuDroplets,
    href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts'),
  },
];

function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') return value || fallback;

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

function sortDevices(list = []) {
  return [...list].sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : 99999;
    const bo = typeof b.order === 'number' ? b.order : 99999;

    if (ao !== bo) return ao - bo;

    if (a.year && b.year && a.year !== b.year) {
      return b.year - a.year;
    }

    return String(a.name || '').localeCompare(String(b.name || ''), 'ru');
  });
}

function getPhoneBrandHref({ brandKey, locale = 'lv', basePath }) {
  if (brandKey === 'apple') {
    return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
  }

  return `${basePath}/${brandKey}`;
}

function buildBrandBlocks({ category, devices, locale = 'lv', basePath }) {
  const categoryBrands = Array.isArray(category?.brands) ? category.brands : [];

  const phoneDevices = devices.filter((device) => {
    if (!device) return false;
    if (device.type !== 'device') return false;
    if (device.categoryKey !== CATEGORY_KEY) return false;
    if (!device.brandKey || !device.slug || !device.name) return false;
    if (device.isHidden === true) return false;
    return true;
  });

  const devicesByBrand = new Map();

  for (const device of phoneDevices) {
    const brandKey = String(device.brandKey).trim().toLowerCase();

    if (!brandKey) continue;

    if (!devicesByBrand.has(brandKey)) {
      devicesByBrand.set(brandKey, []);
    }

    devicesByBrand.get(brandKey).push(device);
  }

  return categoryBrands
    .map((brand) => {
      const brandKey = String(brand?.key || '').trim().toLowerCase();

      if (!brandKey) return null;

      const brandDevices = sortDevices(devicesByBrand.get(brandKey) || []);

      if (!brandDevices.length) return null;

      const href = getPhoneBrandHref({
        brandKey,
        locale,
        basePath,
      });

      return {
        slug: brandKey,
        name: pickLocalized(brand?.labels, locale, brandKey),
        href,
        items: brandDevices.slice(0, 4),
        total: brandDevices.length,
        order: Number.isFinite(Number(brand?.order))
          ? Number(brand.order)
          : 9999,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

function getPageTitle(page) {
  return (
    page?.seo?.metaTitle ||
    page?.seo?.title ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    fallbackMetaTitle
  );
}

function getPageDescription(page) {
  return (
    page?.seo?.metaDescription ||
    page?.seo?.description ||
    page?.seo?.schemaDescription ||
    fallbackDescription
  );
}

function getHeaderTitle(page) {
  return page?.seo?.h1 || page?.seo?.breadcrumbName || labels.fallbackTitle;
}

function getHeaderLead(page) {
  return (
    page?.intro?.lead ||
    page?.seo?.metaDescription ||
    page?.seo?.schemaDescription ||
    null
  );
}

function getServiceName(page) {
  return (
    page?.seo?.schemaName ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    labels.serviceName
  );
}

function getServiceDescription(page) {
  return (
    page?.seo?.schemaDescription ||
    page?.seo?.metaDescription ||
    labels.serviceDescription
  );
}

function getServiceType(page) {
  return page?.seo?.serviceType || getServiceName(page) || labels.serviceType;
}

function getHeroImage(page) {
  return page?.hero?.image || '/images/categories/telefonu_remonts.webp';
}

function getBreadcrumbs(page, headerTitle, basePath) {
  return [
    {
      label: page?.labels?.homeCrumb || labels.homeCrumb,
      href: '/ru',
    },
    {
      label: page?.seo?.breadcrumbName || headerTitle,
      href: basePath,
    },
  ];
}

async function getPhoneRepairData() {
  const [page, devices, faq] = await Promise.all([
    resolveCategoryPage(CATEGORY_KEY, locale),
    getDevices(),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  return {
    page,
    devices,
    faq,
  };
}

export async function generateMetadata() {
  const page = await resolveCategoryPage(CATEGORY_KEY, locale);

  const title = getPageTitle(page);
  const description = getPageDescription(page);

  const image = page?.seo?.ogImage || '/images/og/home.jpg';

  const imageAlt =
    page?.seo?.ogImageAlt ||
    page?.seo?.imageAlt ||
    page?.seo?.breadcrumbName ||
    labels.imageAlt;

  return buildSeoMetadata({
    locale,
    title,
    description,
    lvPath,
    ruPath,
    image,
    imageAlt,
  });
}

export default async function Page() {
  const { page, devices, faq } = await getPhoneRepairData();

  if (!page) {
    return null;
  }

  const basePath = buildCategoryHref(locale, CATEGORY_KEY);

  const brandBlocks = buildBrandBlocks({
    category: page.source?.category,
    devices,
    locale,
    basePath,
  });

  const headerTitle = getHeaderTitle(page);
  const headerLead = getHeaderLead(page);
  const breadcrumbs = getBreadcrumbs(page, headerTitle, basePath);

  const faqRenderItems = toFaqRenderItems(faq.items);
  const hasVisibleFaq = Boolean(page.sections?.hasFaq && faq.items.length > 0);
  const hasVisibleProcess = Boolean(page.sections?.hasProcess);

  const itemListLd = buildItemListLd(
    brandBlocks.map((brand) => ({
      name: `Ремонт телефонов ${brand.name}`,
      url: brand.href,
    })),
    {
      id: `${basePath}#brand-list`,
    }
  );

  const jsonLd = buildRepairPageJsonLd({
    path: basePath,
    locale,

    pageName: getPageTitle(page),
    pageDescription: getPageDescription(page),

    breadcrumbs,

    serviceName: getServiceName(page),
    serviceDescription: getServiceDescription(page),
    serviceType: getServiceType(page),
    serviceImage: getHeroImage(page),

    faqItems: faq.items,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: labels.serviceName,
          description: labels.serviceDescription,
          image: getHeroImage(page),
          steps: labels.processSteps.map((step) => ({
            name: step.title,
            text: step.text,
          })),
        }
      : null,

    extra: [itemListLd],
  });

  return (
    <>
      <JsonLd id="remont-telefonov-jsonld" data={jsonLd} />

      <PhoneRepairPage
        locale={locale}
        page={page}
        headerTitle={headerTitle}
        headerLead={headerLead}
        breadcrumbs={breadcrumbs}
        brandBlocks={brandBlocks}
        faqTitle={faq.title}
        faqItems={faqRenderItems}
        labels={labels}
        servicesItems={servicesItems}
      />
    </>
  );
}