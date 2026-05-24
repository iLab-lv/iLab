import { notFound } from 'next/navigation';

import IphoneDevicePage from '@site/(catalog)/iphone-remonts/[device]/IphoneDevicePage';

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

import { localizedCategoryPath } from '@/lib/routes/localizedPath';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';
import {
  buildIphonePopularServices,
  getIphonePopularServicesTitle,
} from '@sections/services/services.i18n';

export const revalidate = 0;

const locale = 'ru';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const HUB_KEY = 'iphone-remonts';

const lvHubPath = localizedCategoryPath(HUB_KEY, 'lv');
const ruHubPath = localizedCategoryPath(HUB_KEY, 'ru');

const labels = {
  heroAltSuffix: 'ремонт в Риге',
  pricesTitle: 'Цены и сроки ремонта',
  homeCrumb: 'Главная',
  hubCrumb: 'Ремонт iPhone',
  serviceTypeSuffix: 'ремонт',
  howToName: 'Ремонт iPhone',
  howToDescription:
    'Как проходит ремонт iPhone в сервисе iLab в Риге: диагностика, согласование цены, ремонт, проверка и гарантия.',
  howToSteps: [
    {
      name: 'Диагностика',
      text: 'Проверяем iPhone и определяем причину неисправности.',
    },
    {
      name: 'Цена и сроки',
      text: 'Перед началом работы согласовываем стоимость ремонта и срок выполнения.',
    },
    {
      name: 'Ремонт',
      text: 'Выполняем замену детали или ремонт, используя качественные комплектующие.',
    },
    {
      name: 'Проверка',
      text: 'После ремонта проверяем основные функции iPhone.',
    },
    {
      name: 'Гарантия',
      text: 'Предоставляем гарантию 90 дней на выполненную работу и установленные детали.',
    },
  ],
  defaultMetaTitle: 'Ремонт iPhone в Риге | iLab',
  defaultMetaDescription:
    'Ремонт iPhone в Риге: замена экрана, аккумулятора, разъёма зарядки, камеры и устранение других неисправностей. Быстрая диагностика и гарантия в сервисе iLab.',
  defaultHeaderTitle: 'Ремонт iPhone',
  defaultHeaderLead:
    'Ремонт iPhone в Риге - замена экрана, аккумулятора, камеры и разъёма зарядки с быстрой диагностикой, качественными деталями и гарантией 90 дней.',
  pricesCtaLabel: 'Смотреть цены',
  imageAlt: 'Ремонт iPhone в сервисе iLab в Риге',
};

function getDeviceName(device) {
  return pickLocalizedField(device?.name, locale) || device?.name || 'iPhone';
}

function getModelPath(slug) {
  return `/ru/remont-iphone/${slug}`;
}

function getAlternatePaths(slug) {
  return {
    lvPath: `/iphone-remonts/${slug}`,
    ruPath: `/ru/remont-iphone/${slug}`,
  };
}

function getMetaTitle(device, deviceName) {
  return (
    pickLocalizedField(device?.metaTitle, locale) ||
    (device
      ? `Ремонт ${deviceName} в Риге | iLab`
      : labels.defaultMetaTitle)
  );
}

function getMetaDescription(device, deviceName) {
  return (
    pickLocalizedField(device?.metaDescription, locale) ||
    (device
      ? `${deviceName} в Риге: замена экрана, аккумулятора, разъёма зарядки, камеры и другие ремонты. Быстрая диагностика, честные цены и гарантия.`
      : labels.defaultMetaDescription)
  );
}

function getHeaderTitle(device, deviceName) {
  return (
    pickLocalizedField(device?.h1, locale) ||
    (deviceName
      ? `${deviceName} ${labels.serviceTypeSuffix}`
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

function getBreadcrumbs(headerTitle, modelPath) {
  return [
    {
      label: labels.homeCrumb,
      href: '/ru',
    },
    {
      label: labels.hubCrumb,
      href: ruHubPath,
    },
    {
      label: headerTitle,
      href: modelPath,
    },
  ];
}

async function getIphoneDevicePageData(slug) {
  const deviceSlug = normalizeSlug(slug);

  const device = await getDeviceBySlug(deviceSlug, {
    categoryKey: CATEGORY_KEY,
    brandKey: BRAND_KEY,
  });

  if (!device) {
    return null;
  }

  const deviceName = getDeviceName(device);
  const modelPath = getModelPath(device.slug || deviceSlug);

  const [{ items: priceItems, currency }, faq] = await Promise.all([
    buildPriceListItems(device.slug || deviceSlug, {
      categoryKey: CATEGORY_KEY,
      locale,
    }),
    getFaqGroups([{ scopeType: 'category', scopeKey: HUB_KEY }], locale),
  ]);

  const headerTitle = getHeaderTitle(device, deviceName);
  const headerLead = getHeaderLead(device);
  const breadcrumbs = getBreadcrumbs(headerTitle, modelPath);

  const modelServices = buildIphonePopularServices(locale);
  const modelServicesTitle = getIphonePopularServicesTitle(deviceName, locale);

  const faqRenderItems = toFaqRenderItems(faq.items);
  const hasVisibleFaq = faq.items.length > 0;
  const hasVisibleProcess = true;

  const serviceOffers = buildServiceOffersFromPriceItems({
    priceItems,
    currency,
    modelPath,
    deviceName,
  });

  const pageName = getMetaTitle(device, deviceName);
  const pageDescription = getMetaDescription(device, deviceName);

  const serviceName = `${deviceName} ${labels.serviceTypeSuffix}`;
  const serviceDescription = pageDescription;
  const serviceType = serviceName;
  const serviceImage = device.image || '/images/categories/iphone_remonts.webp';

  const jsonLd = buildRepairPageJsonLd({
    path: modelPath,
    locale,

    pageName,
    pageDescription,

    breadcrumbs,

    serviceName,
    serviceDescription,
    serviceType,
    serviceImage,
    serviceOffers,

    faqItems: faq.items,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: labels.howToName,
          description: labels.howToDescription,
          image: serviceImage,
          steps: labels.howToSteps,
        }
      : null,
  });

  return {
    device,
    deviceName,
    modelPath,
    headerTitle,
    headerLead,
    headerCrumbs: breadcrumbs,
    headerScrollCta: priceItems.length
      ? { label: labels.pricesCtaLabel, targetId: 'cenas' }
      : null,
    heroImage: device.image,
    heroAlt: `${deviceName} ${labels.heroAltSuffix}`,
    bodyHtml: pickLocalizedField(device.bodyHtml, locale) || null,
    modelServices,
    modelServicesTitle,
    priceItems,
    currency,
    pricesTitle: labels.pricesTitle,
    faqTitle: faq.title,
    faqItems: faqRenderItems,
    jsonLd,
  };
}

export async function generateMetadata({ params }) {
  const slug = normalizeSlug(params.device);

  const device = await getDeviceBySlug(slug, {
    categoryKey: CATEGORY_KEY,
    brandKey: BRAND_KEY,
  });

  const deviceName = getDeviceName(device);
  const title = getMetaTitle(device, deviceName);
  const description = getMetaDescription(device, deviceName);

  const image = device?.seo?.ogImage || device?.image || '/images/og/home.jpg';

  const imageAlt =
    device?.seo?.ogImageAlt ||
    device?.seo?.imageAlt ||
    deviceName ||
    labels.imageAlt;

  const { lvPath, ruPath } = getAlternatePaths(device?.slug || slug);

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

export default async function Page({ params }) {
  const slug = normalizeSlug(params.device);
  const data = await getIphoneDevicePageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`iphone-device-ru-${data.device.slug}-jsonld`}
        data={data.jsonLd}
      />

      <IphoneDevicePage locale={locale} {...data} />
    </>
  );
}