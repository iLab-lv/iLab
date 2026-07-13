import { notFound } from 'next/navigation';

import IphoneDevicePage from './IphoneDevicePage';

import JsonLd from '@components/seo/JsonLd';

import {
  buildPriceListItems,
  buildServiceOffersFromPriceItems,
  getDeviceBySlug,
  normalizeSlug,
  pickLocalizedField,
} from '@/lib/content/catalogDevices';

import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getDevicesByCategoryAndBrand } from '@/lib/content/devices';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { localizedCategoryPath } from '@/lib/routes/localizedPath';
import { buildCategoryHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

export const revalidate = 0;

const locale = 'lv';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const HUB_KEY = 'iphone-remonts';

const lvHubPath = localizedCategoryPath(HUB_KEY, 'lv');
const ruHubPath = localizedCategoryPath(HUB_KEY, 'ru');

const labels = {
  heroAltSuffix: 'remonts Rīgā',
  pricesTitle: 'Cenas un remonta laiks',
  homeCrumb: 'Sākums',
  hubCrumb: 'iPhone remonts',
  serviceTypeSuffix: 'remonts',
  howToName: 'iPhone remonts',
  howToDescription:
    'Kā iLab servisā Rīgā notiek iPhone remonts: diagnostika, cenas saskaņošana, remonts, pārbaude un garantija.',
  howToSteps: [
    {
      name: 'Diagnostika',
      text: 'Pārbaudām iPhone un nosakām bojājuma iemeslu.',
    },
    {
      name: 'Cena un termiņš',
      text: 'Pirms darba sākšanas saskaņojam remonta cenu un izpildes laiku.',
    },
    {
      name: 'Remonts',
      text: 'Veicam nepieciešamo detaļas maiņu vai remontu, izmantojot kvalitatīvas detaļas.',
    },
    {
      name: 'Pārbaude',
      text: 'Pēc remonta pārbaudām galvenās iPhone funkcijas.',
    },
    {
      name: 'Garantija',
      text: 'Izsniedzam 90 dienu garantiju veiktajam darbam un uzstādītajām detaļām.',
    },
  ],
  defaultMetaTitle: 'iPhone remonts Rīgā | iLab',
  defaultMetaDescription:
    'iPhone remonts Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzda, kamera un citi bojājumi. Ātra diagnostika un garantija iLab servisā.',
  defaultHeaderTitle: 'iPhone remonts',
  defaultHeaderLead:
    'iPhone remonts Rīgā - ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku, kvalitatīvām detaļām un 90 dienu garantiju.',
  pricesCtaLabel: 'Skatīt cenas',
  imageAlt: 'iPhone remonts Rīgā',
};

function getDeviceName(device) {
  return pickLocalizedField(device?.name, locale) || device?.name || 'iPhone';
}

function getModelPath(slug) {
  return `/iphone-remonts/${slug}`;
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
      ? `${deviceName} remonts Rīgā | iLab`
      : labels.defaultMetaTitle)
  );
}

function getMetaDescription(device, deviceName) {
  return (
    pickLocalizedField(device?.metaDescription, locale) ||
    (device
      ? `${deviceName} Rīgā: ekrāna maiņa, baterijas maiņa, uzlādes ligzdas remonts, kameras un citi bojājumi. Ātra diagnostika, godīgas cenas un garantija.`
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
      href: '/',
    },
    {
      label: labels.hubCrumb,
      href: lvHubPath,
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

  const [{ items: priceItems, currency }, faq, reviewsSummary, relatedDevices] = await Promise.all([
    buildPriceListItems(device.slug || deviceSlug, {
      categoryKey: CATEGORY_KEY,
      locale,
    }),
    getFaqGroups([{ scopeType: 'category', scopeKey: HUB_KEY }], locale),
    getReviewsSummary(),
    getDevicesByCategoryAndBrand(CATEGORY_KEY, BRAND_KEY),
  ]);

  const headerTitle = getHeaderTitle(device, deviceName);
  const headerLead = getHeaderLead(device);
  const breadcrumbs = getBreadcrumbs(headerTitle, modelPath);

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
    priceItems,
    currency,
    pricesTitle: labels.pricesTitle,
    reviewsSummary,
    relatedDevices,
    relatedBaseHref: lvHubPath,
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
        id={`iphone-device-${data.device.slug}-jsonld`}
        data={data.jsonLd}
      />

      <IphoneDevicePage locale={locale} {...data} />
    </>
  );
}
