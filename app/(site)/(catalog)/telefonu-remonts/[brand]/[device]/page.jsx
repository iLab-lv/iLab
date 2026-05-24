import { notFound, redirect } from 'next/navigation';

import PhoneDevicePage from './PhoneDevicePage';

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

const locale = 'lv';

const CATEGORY_KEY = 'telefonu-remonts';
const IPHONE_HUB_PATH = '/iphone-remonts';

function isAppleBrand(brand) {
  return String(brand || '').toLowerCase() === 'apple';
}

function normalizeBrandSlug(value = '') {
  return String(value || '').trim().toLowerCase();
}

function getIphoneDevicePath(device) {
  return `${IPHONE_HUB_PATH}/${device}`;
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
  homeCrumb: 'Sākums',
  categoryCrumb: 'Telefonu remonts',
  faqTitle: 'Biežāk uzdotie jautājumi',
  priceTitle: 'Cenas un remonta laiks',
  heroAltSuffix: 'remonts',
  serviceTypeSuffix: 'remonts',
  howToName: 'Telefonu remonts',
  defaultHeaderTitle: 'Telefonu remonts',
  defaultHeaderLead:
    'Telefonu remonts Rīgā - ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku, kvalitatīvām detaļām un 90 dienu garantiju.',
  pricesCtaLabel: 'Skatīt cenas',
  metaFallbackTitle: (brandLabel) => `${brandLabel} telefonu remonts | iLab`,
  metaFallbackDescriptionModel: (name) =>
    `${name} remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzdas remonts, kameras un citi bojājumi. Ātra diagnostika, godīgas cenas un garantija.`,
  metaFallbackDescriptionCategory:
    'Telefonu remonts: ekrāna maiņa, baterijas maiņa, uzlādes ligzda, kamera un citi bojājumi. Ātra diagnostika un garantija iLab servisā Rīgā.',
  brandCrumb: (brandLabel) => `${brandLabel} telefonu remonts`,
  serviceLdName: (name) => `${name} remonts`,
  servicesTitle: (name) => `Populārākie ${name ?? 'šī modeļa'} remonti`,
  imageAlt: 'Telefonu remonts Rīgā',
};

const processSteps = [
  {
    name: 'Diagnostika',
    text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.',
  },
  {
    name: 'Cena un termiņš',
    text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
  },
  {
    name: 'Remonts',
    text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
  },
  {
    name: 'Pārbaude',
    text: 'Pēc remonta testējam visu funkcionalitāti un drošību.',
  },
  {
    name: 'Garantija',
    text: '90 dienu garantija un ieteikumi turpmākai lietošanai.',
  },
];

function getModelServices() {
  const categoryPath = getCategoryPath();

  return [
    {
      title: 'Ekrāna maiņa',
      href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina') || `${categoryPath}/ekrana-maina`,
      text: 'plaisas, līnijas, tumši plankumi, nereaģē skārienjūtīgais ekrāns.',
      icon: LuSmartphone,
    },
    {
      title: 'Baterijas maiņa',
      href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina') || `${categoryPath}/baterijas-maina`,
      text: 'strauji krīt uzlādes līmenis, telefons izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
    },
    {
      title: 'Uzlādes ligzdas maiņa',
      href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina') || `${categoryPath}/uzlades-ligzdas-maina`,
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
    },
    {
      title: 'Kameras remonts',
      href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts') || `${categoryPath}/kameras-remonts`,
      text: 'miglaini attēli, melni plankumi, fokusēšanās problēmas.',
      icon: LuCamera,
    },
    {
      title: 'Skaļruņu un mikrofona remonts',
      href: buildServiceHref(locale, CATEGORY_KEY, 'skalruni-mikrofona-remonts') || `${categoryPath}/skalruni-mikrofona-remonts`,
      text: 'klusa skaņa, krakšķi, sarunas laikā nedzird vai neviens nedzird jūs.',
      icon: LuVolume2,
    },
    {
      title: 'Ūdens bojājumu remonts',
      href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts') || `${categoryPath}/udens-bojajumu-remonts`,
      text: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
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
      title: 'iPhone remonts Rīgā | iLab',
      description: 'iPhone remonts Rīgā iLab servisā.',
      lvPath: getIphoneDevicePath(deviceSlug),
      ruPath: `/ru/remont-iphone/${deviceSlug}`,
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
        id={`telefonu-remonts-${data.brandSlug}-${data.device.slug}-jsonld`}
        data={data.jsonLd}
      />

      <PhoneDevicePage locale={locale} {...data} />
    </>
  );
}