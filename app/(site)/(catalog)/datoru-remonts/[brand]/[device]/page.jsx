import { notFound } from 'next/navigation';

import ComputerDevicePage from './ComputerDevicePage';

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

const locale = 'lv';

const CATEGORY_KEY = 'datoru-remonts';

export const pageHeader = {
  scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
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
  homeCrumb: 'Sākums',
  categoryCrumb: 'Datoru remonts',
  faqTitle: 'Biežāk uzdotie jautājumi',
  priceTitle: 'Cenas un remonta laiks',
  heroAltSuffix: 'remonts',
  serviceTypeSuffix: 'remonts',
  howToName: 'Datoru remonts',
  defaultHeaderTitle: 'Datoru remonts',
  defaultHeaderLead:
    'Datoru remonts Rīgā - akumulatora un displeja nomaiņa, atjaunošana pēc šķidruma bojājumiem, profilakse, tastatūras un touchpad remonts ar ātru diagnostiku, kvalitatīvām detaļām un garantiju.',
  pricesCtaLabel: 'Skatīt cenas',
  metaFallbackTitle: (brandLabel) => `${brandLabel} datoru remonts | iLab`,
  metaFallbackDescriptionModel: (name) =>
    `${name} remonts Rīgā: akumulatora un displeja nomaiņa, atjaunošana pēc šķidruma bojājumiem, profilakse, tastatūra, touchpad. Ātra diagnostika, godīgas cenas un garantija.`,
  metaFallbackDescriptionCategory:
    'Datoru remonts: akumulatora maiņa, displejs, šķidruma bojājumi, profilakse, tastatūra, touchpad. Ātra diagnostika un garantija iLab servisā Rīgā.',
  brandCrumb: (brandLabel) => `${brandLabel} datoru remonts`,
  serviceLdName: (name) => `${name} remonts`,
  servicesTitle: (name) => `Populārākie ${name ?? 'šī modeļa'} remonti`,
  imageAlt: 'Datoru remonts Rīgā',
};

const processSteps = [
  {
    name: 'Diagnostika',
    text: 'Pārbaudām ierīci, nosakām bojājumu un precizējam iespējamos remonta risinājumus.',
  },
  {
    name: 'Cena un termiņš',
    text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
  },
  {
    name: 'Remonts',
    text: 'Veicam remontu, detaļu maiņu, tīrīšanu, sistēmas uzstādīšanu vai programmatūras darbus.',
  },
  {
    name: 'Pārbaude',
    text: 'Pēc remonta testējam ierīci un galvenās funkcijas.',
  },
  {
    name: 'Garantija',
    text: 'Izsniedzam ierīci ar garantiju veiktajam darbam un uzstādītajām detaļām.',
  },
];

function getModelServices() {
  const categoryPath = getCategoryPath();

  return [
    {
      title: 'Akumulatora nomaiņa',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina') ||
        `${categoryPath}/baterijas-maina`,
      text: 'ja strauji krīt uzlāde, dators izslēdzas vai nedarbojas bez lādētāja.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Displeja nomaiņa',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina') ||
        `${categoryPath}/ekrana-maina`,
      text: 'plaisas, līnijas, tumši plankumi, mirgošana vai nav attēla.',
      icon: LuMonitor,
    },
    {
      title: 'Atjaunošana pēc šķidruma bojājumiem',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts') ||
        `${categoryPath}/udens-bojajumu-remonts`,
      text: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
      icon: LuDroplets,
    },
    {
      title: 'Profilakse un tehniskā apkalpošana',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'profilakse-tirisana') ||
        `${categoryPath}/profilakse-tirisana`,
      text: 'tīrīšana, termopastas nomaiņa, pārbaude un stabila darbība.',
      icon: LuWrench,
    },
    {
      title: 'Tastatūras nomaiņa',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'tastaturas-maina') ||
        `${categoryPath}/tastaturas-maina`,
      text: 'nedarbojas taustiņi, pielipšana, šķidruma bojājumi vai fiziski defekti.',
      icon: LuKeyboard,
    },
    {
      title: 'Touchpad nomaiņa',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'touchpad-maina') ||
        `${categoryPath}/touchpad-maina`,
      text: 'nereaģē, “lec” kursors, klikšķis nestrādā vai ir fiziski bojājumi.',
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
      ? `${modelName} remonts Rīgā | iLab`
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
      href: '/',
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
        id={`datoru-remonts-${data.brandSlug}-${data.device.slug}-jsonld`}
        data={data.jsonLd}
      />

      <ComputerDevicePage locale={locale} {...data} />
    </>
  );
}