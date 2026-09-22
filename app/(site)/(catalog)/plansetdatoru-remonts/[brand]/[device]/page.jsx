import { notFound } from 'next/navigation';

import TabletDevicePage from './TabletDevicePage';

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

import { buildCategoryHref, buildDeviceHref, buildServiceHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

import {
  LuTabletSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuDroplets,
} from 'react-icons/lu';

export const revalidate = 0;

const locale = 'lv';

const CATEGORY_KEY = 'plansetdatoru-remonts';

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
  return buildDeviceHref(locale, CATEGORY_KEY, brandSlug, deviceSlug);
}

function getAlternatePaths(brandSlug, deviceSlug) {
  return {
    lvPath: `/plansetdatoru-remonts/${brandSlug}/${deviceSlug}`,
    ruPath: `/ru/remont-planshetov/${brandSlug}/${deviceSlug}`,
  };
}

const labels = {
  homeCrumb: 'Sākums',
  categoryCrumb: 'Planšetdatoru remonts',
  faqTitle: 'Biežāk uzdotie jautājumi',
  priceTitle: 'Cenas un remonta laiks',
  heroAltSuffix: 'remonts',
  serviceTypeSuffix: 'remonts',
  howToName: 'Planšetdatoru remonts',
  defaultHeaderTitle: 'Planšetdatoru remonts',
  defaultHeaderLead:
    'Planšetdatoru remonts Rīgā - ekrāna, baterijas, uzlādes ligzdas un citu komponentu remonts ar ātru diagnostiku, kvalitatīvām detaļām un garantiju līdz 1 gadam.',
  pricesCtaLabel: 'Skatīt cenas',
  metaFallbackTitle: (brandLabel) => `${brandLabel} planšetdatoru remonts | iLab`,
  metaFallbackDescriptionModel: (name) =>
    `${name} remonts Rīgā: displejs, baterija, uzlādes ligzda, kamera un citi bojājumi. Ātra diagnostika, godīgas cenas un garantija līdz 1 gadam.`,
  metaFallbackDescriptionCategory:
    'Planšetdatoru remonts: displejs, baterija, uzlāde, kamera. Bezmaksas diagnostika un garantija līdz 1 gadam.',
  brandCrumb: (brandLabel) => `${brandLabel} planšetdatoru remonts`,
  serviceLdName: (name) => `${name} remonts`,
  servicesTitle: (name) => `Populārākie ${name ?? 'šī modeļa'} remonti`,
  imageAlt: 'Planšetdatoru remonts Rīgā',
  processTitle: 'Kā notiek remonts',
  processDescription:
    'Kā soli pa solim notiek planšetdatora diagnostika, remonts un testēšana iLab servisā Rīgā.',
};

const processSteps = [
  {
    title: 'Diagnostika',
    text: 'Ātri pārbaudām planšetdatoru un apstiprinām problēmu: displejs, baterija, uzlāde, skaņa un citi bojājumi.',
  },
  {
    title: 'Cena un termiņš',
    text: 'Pirms remonta sākšanas saskaņojam izmaksas, detaļu veidu un izpildes termiņu.',
  },
  {
    title: 'Remonts',
    text: 'Sertificēti meistari veic displeja, baterijas, uzlādes ligzdas, kameras vai citu komponentu remontu.',
  },
  {
    title: 'Pārbaude',
    text: 'Pēc remonta testējam ekrānu, skārienu, skaņu, uzlādi, tīklu un citas svarīgas funkcijas.',
  },
  {
    title: 'Garantija',
    text: 'Izsniedzam planšetdatoru ar garantiju līdz 1 gadam uz detaļu un darbu.',
  },
];

function getModelServices() {
  const categoryPath = getCategoryPath();

  return [
    {
      title: 'Displeja (ekrāna) maiņa',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina') ||
        `${categoryPath}/ekrana-maina`,
      text: 'plaisas, plankumi, nereaģē skāriens.',
      icon: LuTabletSmartphone,
    },
    {
      title: 'Akumulatora maiņa',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina') ||
        `${categoryPath}/baterijas-maina`,
      text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Uzlādes ligzdas remonts',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina') ||
        `${categoryPath}/uzlades-ligzdas-maina`,
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
    },
    {
      title: 'Kameras remonts',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts') ||
        `${categoryPath}/kameras-remonts`,
      text: 'miglaini attēli, fokusēšanās problēmas.',
      icon: LuCamera,
    },
    {
      title: 'Ūdens bojājumi',
      href:
        buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts') ||
        `${categoryPath}/udens-bojajumu-remonts`,
      text: 'diagnostika un atjaunošana, ja tas iespējams.',
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

async function getTabletDevicePageData({ brand, device }) {
  const brandSlug = normalizeBrandSlug(brand);
  const deviceSlug = normalizeSlug(device);

  if (!brandSlug || !deviceSlug) {
    return null;
  }

  const tabletDevice = await getDeviceBySlug(deviceSlug, {
    categoryKey: CATEGORY_KEY,
    brandKey: brandSlug,
  });

  if (!tabletDevice) {
    return null;
  }

  const modelName = getModelName(tabletDevice, deviceSlug);
  const brandLabel = getBrandLabel(tabletDevice, brandSlug);

  const brandPath = getBrandPath(brandSlug);
  const modelPath = getModelPath(
    brandSlug,
    tabletDevice.slug || deviceSlug
  );

  const [{ items: priceItems, currency }, faq] = await Promise.all([
    buildPriceListItems(tabletDevice.slug || deviceSlug, {
      categoryKey: CATEGORY_KEY,
      locale,
    }),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  const headerTitle = getHeaderTitle(tabletDevice, modelName);
  const headerLead = getHeaderLead(tabletDevice);

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
    tabletDevice.image || '/images/categories/plansetdatoru_remonts.webp';

  const serviceOffers = buildServiceOffersFromPriceItems({
    priceItems,
    currency,
    modelPath,
    deviceName: modelName,
  });

  const jsonLd = buildRepairPageJsonLd({
    path: modelPath,
    locale,

    pageName: getMetaTitle(tabletDevice, modelName, brandLabel),
    pageDescription: getMetaDescription(tabletDevice, modelName),

    breadcrumbs,

    serviceName: labels.serviceLdName(modelName),
    serviceDescription: getMetaDescription(tabletDevice, modelName),
    serviceType: labels.serviceLdName(modelName),
    serviceImage,
    serviceOffers,

    faqItems: faq.items,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: labels.howToName,
          description: labels.processDescription,
          image: serviceImage,
          steps: processSteps.map((step) => ({
            name: step.title,
            text: step.text,
          })),
        }
      : null,
  });

  return {
    device: tabletDevice,
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

    heroImage: tabletDevice.image,
    heroAlt: `${modelName} ${labels.heroAltSuffix}`,
    bodyHtml: pickLocalizedField(tabletDevice.bodyHtml, locale) || null,

    modelServices: getModelServices(),
    modelServicesTitle: labels.servicesTitle(modelName),

    priceItems,
    currency,
    priceTitle: labels.priceTitle,

    processTitle: labels.processTitle,
    processSteps,

    faqTitle: faq.title || labels.faqTitle,
    faqItems: faqRenderItems,

    jsonLd,
  };
}

export async function generateMetadata({ params }) {
  const brandSlug = normalizeBrandSlug(params.brand);
  const deviceSlug = normalizeSlug(params.device);

  const tabletDevice = await getDeviceBySlug(deviceSlug, {
    categoryKey: CATEGORY_KEY,
    brandKey: brandSlug,
  });

  const brandLabel = getBrandLabel(tabletDevice, brandSlug);
  const modelName = getModelName(tabletDevice, deviceSlug);

  const image =
    tabletDevice?.seo?.ogImage ||
    tabletDevice?.image ||
    '/images/og/home.jpg';

  const imageAlt =
    tabletDevice?.seo?.ogImageAlt ||
    tabletDevice?.seo?.imageAlt ||
    modelName ||
    labels.imageAlt;

  return buildSeoMetadata({
    locale,
    title: getMetaTitle(tabletDevice, modelName, brandLabel),
    description: getMetaDescription(tabletDevice, modelName),
    ...getAlternatePaths(brandSlug, tabletDevice?.slug || deviceSlug),
    image,
    imageAlt,
  });
}

export default async function Page({ params }) {
  const brandSlug = normalizeBrandSlug(params.brand);
  const deviceSlug = normalizeSlug(params.device);

  const data = await getTabletDevicePageData({
    brand: brandSlug,
    device: deviceSlug,
  });

  if (!data) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`plansetdatoru-remonts-${data.brandSlug}-${data.device.slug}-jsonld`}
        data={data.jsonLd}
      />

      <TabletDevicePage locale={locale} {...data} />
    </>
  );
}