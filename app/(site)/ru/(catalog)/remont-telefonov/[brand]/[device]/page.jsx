import { notFound, redirect } from 'next/navigation';

import PhoneDevicePage from '@site/(catalog)/telefonu-remonts/[brand]/[device]/PhoneDevicePage';

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
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

export const revalidate = 0;

const locale = 'ru';

const CATEGORY_KEY = 'telefonu-remonts';
const IPHONE_HUB_PATH_RU = '/ru/remont-iphone';

function isAppleBrand(brand) {
  return String(brand || '').toLowerCase() === 'apple';
}

function normalizeBrandSlug(value = '') {
  return String(value || '').trim().toLowerCase();
}

function getIphoneDevicePath(device) {
  return `${IPHONE_HUB_PATH_RU}/${device}`;
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
    lvPath: `/telefonu-remonts/${brandSlug}/${deviceSlug}`,
    ruPath: `/ru/remont-telefonov/${brandSlug}/${deviceSlug}`,
  };
}

const labels = {
  homeCrumb: 'Главная',
  categoryCrumb: 'Ремонт телефонов',
  faqTitle: 'Часто задаваемые вопросы',
  priceTitle: 'Цены и сроки ремонта',
  heroAltSuffix: 'ремонт',
  serviceTypeSuffix: 'ремонт',
  howToName: 'Ремонт телефона',
  defaultHeaderTitle: 'Ремонт телефона',
  defaultHeaderLead:
    'Ремонт телефонов в Риге - замена экрана, аккумулятора, камеры и разъёма зарядки с быстрой диагностикой, качественными деталями и гарантией 90 дней.',
  pricesCtaLabel: 'Смотреть цены',
  metaFallbackTitle: (brandLabel) => `Ремонт телефонов ${brandLabel} | iLab`,
  metaFallbackDescriptionModel: (name) =>
    `Ремонт ${name} в Риге: замена экрана, батареи, ремонт разъёма зарядки, камеры и другие неисправности. Быстрая диагностика, понятные цены и гарантия.`,
  metaFallbackDescriptionCategory:
    'Ремонт телефонов: замена экрана, батареи, разъёма зарядки, камеры и устранение других неисправностей. Быстрая диагностика и гарантия в сервисе iLab в Риге.',
  brandCrumb: (brandLabel) => `Ремонт телефонов ${brandLabel}`,
  serviceLdName: (name) => `Ремонт ${name}`,
  servicesTitle: (name) => `Популярные ремонты ${name ?? 'этой модели'}`,
  imageAlt: 'Ремонт телефонов в Риге',
};

const processSteps = [
  {
    name: 'Диагностика',
    text: 'Быстро проверяем устройство и подтверждаем проблему.',
  },
  {
    name: 'Цена и срок',
    text: 'Согласовываем стоимость и срок выполнения до начала работ.',
  },
  {
    name: 'Ремонт',
    text: 'Сертифицированные мастера выполняют ремонт с использованием качественных деталей.',
  },
  {
    name: 'Проверка',
    text: 'После ремонта тестируем всю функциональность и безопасность устройства.',
  },
  {
    name: 'Гарантия',
    text: 'Гарантия 90 дней и рекомендации по дальнейшему использованию.',
  },
];

function getModelServices() {
  const categoryPath = getCategoryPath();

  return [
    {
      title: 'Замена экрана',
      href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina') || `${categoryPath}/zamena-ekrana`,
      text: 'трещины, полосы, тёмные пятна, не работает сенсор.',
      icon: LuSmartphone,
    },
    {
      title: 'Замена аккумулятора',
      href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina') || `${categoryPath}/zamena-batarei`,
      text: 'быстро падает заряд, телефон выключается на 10–20%.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Замена разъёма зарядки',
      href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina') || `${categoryPath}/zamena-razema-zaryadki`,
      text: 'кабель не держится, зарядка медленная или нестабильная.',
      icon: LuPlugZap,
    },
    {
      title: 'Ремонт камеры',
      href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts') || `${categoryPath}/remont-kamery`,
      text: 'размытые фото, чёрные пятна, проблемы с фокусировкой.',
      icon: LuCamera,
    },
    {
      title: 'Ремонт динамика и микрофона',
      href: buildServiceHref(locale, CATEGORY_KEY, 'skalruni-mikrofona-remonts') || `${categoryPath}/remont-dinamika-mikrofona`,
      text: 'тихий звук, хрипы, во время звонка не слышно вас или собеседника.',
      icon: LuVolume2,
    },
    {
      title: 'Ремонт после попадания влаги',
      href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts') || `${categoryPath}/remont-posle-popadaniya-vlagi`,
      text: 'диагностика и восстановление после попадания жидкости, если это возможно.',
      icon: LuDroplets,
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
      ? `Ремонт ${modelName} в Риге | iLab`
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

async function getPhoneDevicePageData({ brand, device }) {
  const brandSlug = normalizeBrandSlug(brand);
  const deviceSlug = normalizeSlug(device);

  if (!brandSlug || !deviceSlug || isAppleBrand(brandSlug)) {
    return null;
  }

  const phoneDevice = await getDeviceBySlug(deviceSlug, {
    categoryKey: CATEGORY_KEY,
    brandKey: brandSlug,
  });

  if (!phoneDevice) {
    return null;
  }

  const modelName = getModelName(phoneDevice, deviceSlug);
  const brandLabel = getBrandLabel(phoneDevice, brandSlug);

  const brandPath = getBrandPath(brandSlug);
  const modelPath = getModelPath(brandSlug, phoneDevice.slug || deviceSlug);

  const [{ items: priceItems, currency }, faq] = await Promise.all([
    buildPriceListItems(phoneDevice.slug || deviceSlug, {
      categoryKey: CATEGORY_KEY,
      model: phoneDevice,
      locale,
    }),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  const headerTitle = getHeaderTitle(phoneDevice, modelName);
  const headerLead = getHeaderLead(phoneDevice);

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
    phoneDevice.image || '/images/categories/telefonu_remonts.webp';

  const serviceOffers = buildServiceOffersFromPriceItems({
    priceItems,
    currency,
    modelPath,
    deviceName: modelName,
  });

  const jsonLd = buildRepairPageJsonLd({
    path: modelPath,
    locale,

    pageName: getMetaTitle(phoneDevice, modelName, brandLabel),
    pageDescription: getMetaDescription(phoneDevice, modelName),

    breadcrumbs,

    serviceName: labels.serviceLdName(modelName),
    serviceDescription: getMetaDescription(phoneDevice, modelName),
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
    device: phoneDevice,
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

    heroImage: phoneDevice.image,
    heroAlt: `${modelName} ${labels.heroAltSuffix}`,
    bodyHtml: pickLocalizedField(phoneDevice.bodyHtml, locale) || null,

    modelServices: getModelServices(),
    modelServicesTitle: labels.servicesTitle(modelName),

    priceItems,
    currency,
    priceTitle: labels.priceTitle,

    faqTitle: faq.title,
    faqItems: faqRenderItems,

    jsonLd,
  };
}

export async function generateMetadata({ params }) {
  const brandSlug = normalizeBrandSlug(params.brand);
  const deviceSlug = normalizeSlug(params.device);

  if (isAppleBrand(brandSlug)) {
    const metadata = buildSeoMetadata({
      locale,
      title: 'Ремонт iPhone в Риге | iLab',
      description: 'Ремонт iPhone в Риге в сервисе iLab.',
      lvPath: `/iphone-remonts/${deviceSlug}`,
      ruPath: getIphoneDevicePath(deviceSlug),
    });

    return {
      ...metadata,
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const phoneDevice = await getDeviceBySlug(deviceSlug, {
    categoryKey: CATEGORY_KEY,
    brandKey: brandSlug,
  });

  const brandLabel = getBrandLabel(phoneDevice, brandSlug);
  const modelName = getModelName(phoneDevice, deviceSlug);

  const image =
    phoneDevice?.seo?.ogImage || phoneDevice?.image || '/images/og/home.jpg';

  const imageAlt =
    phoneDevice?.seo?.ogImageAlt ||
    phoneDevice?.seo?.imageAlt ||
    modelName ||
    labels.imageAlt;

  return buildSeoMetadata({
    locale,
    title: getMetaTitle(phoneDevice, modelName, brandLabel),
    description: getMetaDescription(phoneDevice, modelName),
    ...getAlternatePaths(brandSlug, phoneDevice?.slug || deviceSlug),
    image,
    imageAlt,
  });
}

export default async function Page({ params }) {
  const brandSlug = normalizeBrandSlug(params.brand);
  const deviceSlug = normalizeSlug(params.device);

  if (isAppleBrand(brandSlug)) {
    redirect(getIphoneDevicePath(deviceSlug));
  }

  const data = await getPhoneDevicePageData({
    brand: brandSlug,
    device: deviceSlug,
  });

  if (!data) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`remont-telefonov-${data.brandSlug}-${data.device.slug}-jsonld`}
        data={data.jsonLd}
      />

      <PhoneDevicePage locale={locale} {...data} />
    </>
  );
}
