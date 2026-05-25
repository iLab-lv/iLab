import { notFound } from 'next/navigation';

import ComputerDevicePage from '@site/(catalog)/datoru-remonts/[brand]/[device]/ComputerDevicePage';

import JsonLd from '@components/seo/JsonLd';

import {
  buildPriceListItems,
  buildServiceOffersFromPriceItems,
  getDeviceBySlug,
  normalizeSlug,
  pickLocalizedField,
} from '@/lib/content/catalogDevices';

import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { buildCategoryHref, buildServiceHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

import {
  LuBatteryCharging,
  LuMonitor,
  LuDroplets,
  LuWrench,
  LuKeyboard,
  LuMouse,
} from 'react-icons/lu';

export const revalidate = 0;

const locale = 'ru';

const CATEGORY_KEY = 'datoru-remonts';

export const pageHeader = {
  scrollCta: { label: 'Смотреть цены', targetId: 'cenas' },
};

export const headerProps = pageHeader;

function normalizeBrandSlug(value = '') {
  return String(value || '').trim().toLowerCase();
}

function getCategoryPath() {
  return buildCategoryHref(locale, CATEGORY_KEY);
}

function getBrandPath(brandSlug) {
  return `${getCategoryPath()}/${brandSlug}`;
}

function getModelPath(brandSlug, deviceSlug) {
  return `${getBrandPath(brandSlug)}/${deviceSlug}`;
}

function getAlternatePaths(brandSlug, deviceSlug) {
  return {
    lvPath: `/datoru-remonts/${brandSlug}/${deviceSlug}`,
    ruPath: `/ru/remont-noutbukov/${brandSlug}/${deviceSlug}`,
  };
}

const labels = {
  homeCrumb: 'Главная',
  categoryCrumb: 'Ремонт компьютеров',
  faqTitle: 'Часто задаваемые вопросы',
  priceTitle: 'Цены и срок ремонта',
  heroAltSuffix: 'ремонт',
  serviceTypeSuffix: 'ремонт',
  howToName: 'Ремонт компьютеров',
  defaultHeaderTitle: 'Ремонт компьютеров',
  defaultHeaderLead:
    'Ремонт компьютеров в Риге - замена аккумулятора и дисплея, восстановление после попадания жидкости, профилактика, замена клавиатуры и touchpad с быстрой диагностикой, качественными деталями и гарантией.',
  pricesCtaLabel: 'Смотреть цены',
  metaFallbackTitle: (brandLabel) => `${brandLabel} ремонт компьютеров | iLab`,
  metaFallbackDescriptionModel: (name) =>
    `${name} ремонт в Риге: замена аккумулятора и дисплея, восстановление после попадания жидкости, профилактика, клавиатура, touchpad. Быстрая диагностика, честные цены и гарантия.`,
  metaFallbackDescriptionCategory:
    'Ремонт компьютеров: замена аккумулятора, дисплея, восстановление после попадания жидкости, профилактика, клавиатура, touchpad. Быстрая диагностика и гарантия в сервисе iLab в Риге.',
  brandCrumb: (brandLabel) => `${brandLabel} ремонт компьютеров`,
  serviceLdName: (name) => `${name} ремонт`,
  servicesTitle: (name) => `Популярный ремонт ${name ?? 'этой модели'}`,
  imageAlt: 'Ремонт компьютеров в Риге',
};

const processSteps = [
  {
    name: 'Диагностика',
    text: 'Проверяем устройство, определяем неисправность и уточняем возможные варианты ремонта.',
  },
  {
    name: 'Цена и срок',
    text: 'Согласовываем стоимость и срок выполнения до начала работ.',
  },
  {
    name: 'Ремонт',
    text: 'Выполняем ремонт, замену деталей, чистку, настройку системы или программные работы.',
  },
  {
    name: 'Проверка',
    text: 'После ремонта тестируем устройство и основные функции.',
  },
  {
    name: 'Гарантия',
    text: 'Выдаём устройство с гарантией на выполненную работу и установленные детали.',
  },
];

function getModelServices() {
  const categoryPath = getCategoryPath();

  return [
    {
      title: 'Замена аккумулятора',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina') ||
        `${categoryPath}/baterijas-maina`,
      text: 'если заряд быстро падает, компьютер выключается или не работает без зарядного устройства.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Замена дисплея',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina') ||
        `${categoryPath}/ekrana-maina`,
      text: 'трещины, полосы, тёмные пятна, мерцание или отсутствие изображения.',
      icon: LuMonitor,
    },
    {
      title: 'Восстановление после попадания жидкости',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts') ||
        `${categoryPath}/udens-bojajumu-remonts`,
      text: 'диагностика и восстановление после попадания жидкости, если ремонт возможен.',
      icon: LuDroplets,
    },
    {
      title: 'Профилактика и техническое обслуживание',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'profilakse-tirisana') ||
        `${categoryPath}/profilakse-tirisana`,
      text: 'чистка, замена термопасты, проверка и стабильная работа.',
      icon: LuWrench,
    },
    {
      title: 'Замена клавиатуры',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'tastaturas-maina') ||
        `${categoryPath}/tastaturas-maina`,
      text: 'не работают клавиши, залипание, следы жидкости или физические повреждения.',
      icon: LuKeyboard,
    },
    {
      title: 'Замена touchpad',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'touchpad-maina') ||
        `${categoryPath}/touchpad-maina`,
      text: 'не реагирует, курсор двигается сам, не работает клик или есть физические повреждения.',
      icon: LuMouse,
    },
  ];
}

function getBrandLabel(device, brandSlug) {
  return (
    pickLocalizedField(device?.brandName, locale) ||
    pickLocalizedField(device?.brandLabel, locale) ||
    device?.brandKey ||
    brandSlug.toUpperCase()
  );
}

function getModelName(device, deviceSlug) {
  return pickLocalizedField(device?.name, locale) || device?.name || deviceSlug;
}

function getMetaTitle(device, modelName, brandLabel) {
  return (
    pickLocalizedField(device?.metaTitle, locale) ||
    (device
      ? `${modelName} ремонт в Риге | iLab`
      : labels.metaFallbackTitle(brandLabel))
  );
}

function getMetaDescription(device, modelName) {
  return (
    pickLocalizedField(device?.metaDescription, locale) ||
    (device
      ? labels.metaFallbackDescriptionModel(modelName)
      : labels.metaFallbackDescriptionCategory)
  );
}

function getHeaderTitle(device, modelName) {
  return (
    pickLocalizedField(device?.h1, locale) ||
    (modelName
      ? `${modelName} ${labels.serviceTypeSuffix}`
      : labels.defaultHeaderTitle)
  );
}

function getHeaderLead(device) {
  return (
    pickLocalizedField(device?.lead, locale) ||
    pickLocalizedField(device?.metaDescription, locale) ||
    labels.defaultHeaderLead
  );
}

function getBreadcrumbs({ brandLabel, brandPath, headerTitle, modelPath }) {
  return [
    {
      label: labels.homeCrumb,
      href: '/ru',
    },
    {
      label: labels.categoryCrumb,
      href: getCategoryPath(),
    },
    {
      label: labels.brandCrumb(brandLabel),
      href: brandPath,
    },
    {
      label: headerTitle,
      href: modelPath,
    },
  ];
}

async function getComputerDevicePageData({ brand, device }) {
  const brandSlug = normalizeBrandSlug(brand);
  const deviceSlug = normalizeSlug(device);

  if (!brandSlug || !deviceSlug) {
    return null;
  }

  const computerDevice = await getDeviceBySlug(deviceSlug, {
    categoryKey: CATEGORY_KEY,
    brandKey: brandSlug,
  });

  if (!computerDevice) {
    return null;
  }

  const modelName = getModelName(computerDevice, deviceSlug);
  const brandLabel = getBrandLabel(computerDevice, brandSlug);

  const brandPath = getBrandPath(brandSlug);
  const modelPath = getModelPath(
    brandSlug,
    computerDevice.slug || deviceSlug
  );

  const [{ items: priceItems, currency }, faq] = await Promise.all([
    buildPriceListItems(computerDevice.slug || deviceSlug, {
      categoryKey: CATEGORY_KEY,
      locale,
    }),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  const headerTitle = getHeaderTitle(computerDevice, modelName);
  const headerLead = getHeaderLead(computerDevice);

  const breadcrumbs = getBreadcrumbs({
    brandLabel,
    brandPath,
    headerTitle,
    modelPath,
  });

  const faqRenderItems = toFaqRenderItems(faq.items);
  const hasVisibleFaq = faq.items.length > 0;
  const hasVisibleProcess = true;

  const serviceImage =
    computerDevice.image || '/images/categories/datoru_remonts.webp';

  const serviceOffers = buildServiceOffersFromPriceItems({
    priceItems,
    currency,
    modelPath,
    deviceName: modelName,
  });

  const jsonLd = buildRepairPageJsonLd({
    path: modelPath,
    locale,

    pageName: getMetaTitle(computerDevice, modelName, brandLabel),
    pageDescription: getMetaDescription(computerDevice, modelName),

    breadcrumbs,

    serviceName: labels.serviceLdName(modelName),
    serviceDescription: getMetaDescription(computerDevice, modelName),
    serviceType: labels.serviceLdName(modelName),
    serviceImage,
    serviceOffers,

    faqItems: faq.items,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: labels.howToName,
          description: labels.metaFallbackDescriptionCategory,
          image: serviceImage,
          steps: processSteps,
        }
      : null,
  });

  return {
    device: computerDevice,
    modelName,
    brandLabel,
    brandSlug,
    modelPath,

    headerTitle,
    headerLead,
    headerCrumbs: breadcrumbs,
    headerScrollCta: priceItems.length
      ? { label: labels.pricesCtaLabel, targetId: 'cenas' }
      : null,

    heroImage: computerDevice.image,
    heroAlt: `${modelName} ${labels.heroAltSuffix}`,
    bodyHtml: pickLocalizedField(computerDevice.bodyHtml, locale) || null,

    modelServices: getModelServices(),
    modelServicesTitle: labels.servicesTitle(modelName),

    priceItems,
    currency,
    priceTitle: labels.priceTitle,

    faqTitle: faq.title || labels.faqTitle,
    faqItems: faqRenderItems,

    jsonLd,
  };
}

export async function generateMetadata({ params }) {
  const brandSlug = normalizeBrandSlug(params.brand);
  const deviceSlug = normalizeSlug(params.device);

  const computerDevice = await getDeviceBySlug(deviceSlug, {
    categoryKey: CATEGORY_KEY,
    brandKey: brandSlug,
  });

  const brandLabel = getBrandLabel(computerDevice, brandSlug);
  const modelName = getModelName(computerDevice, deviceSlug);

  const image =
    computerDevice?.seo?.ogImage ||
    computerDevice?.image ||
    '/images/og/home.jpg';

  const imageAlt =
    computerDevice?.seo?.ogImageAlt ||
    computerDevice?.seo?.imageAlt ||
    modelName ||
    labels.imageAlt;

  return buildSeoMetadata({
    locale,
    title: getMetaTitle(computerDevice, modelName, brandLabel),
    description: getMetaDescription(computerDevice, modelName),
    ...getAlternatePaths(brandSlug, computerDevice?.slug || deviceSlug),
    image,
    imageAlt,
  });
}

export default async function Page({ params }) {
  const brandSlug = normalizeBrandSlug(params.brand);
  const deviceSlug = normalizeSlug(params.device);

  const data = await getComputerDevicePageData({
    brand: brandSlug,
    device: deviceSlug,
  });

  if (!data) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`remont-noutbukov-${data.brandSlug}-${data.device.slug}-jsonld`}
        data={data.jsonLd}
      />

      <ComputerDevicePage locale={locale} {...data} />
    </>
  );
}