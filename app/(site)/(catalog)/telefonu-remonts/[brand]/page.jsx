import { notFound, redirect } from 'next/navigation';

import PhoneBrandPage from './PhoneBrandPage';

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
const locale = 'lv';

const IPHONE_HUB_PATH = '/iphone-remonts';

const fallbackMetaTitle = 'Telefonu remonts Rīgā | iLab';
const fallbackDescription =
  'Telefonu remonts Rīgā - ātra diagnostika, godīgas cenas un garantija iLab servisā.';

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
    title: 'Diagnostika',
    text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.',
  },
  {
    title: 'Cena un termiņš',
    text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
  },
  {
    title: 'Remonts',
    text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
  },
  {
    title: 'Pārbaude',
    text: 'Pēc remonta testējam visu funkcionalitāti un drošību.',
  },
  {
    title: 'Garantija',
    text: '90 dienu garantija un ieteikumi turpmākai lietošanai.',
  },
];

function getPopularRepairs() {
  return [
    {
      title: 'Displeja (ekrāna) maiņa',
      text: 'plaisas, tumši plankumi, nereaģē skāriens.',
      icon: LuSmartphone,
      href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina'),
    },
    {
      title: 'Akumulatora maiņa',
      text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
      icon: LuBatteryCharging,
      href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina'),
    },
    {
      title: 'Uzlādes ligzda',
      text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      icon: LuPlugZap,
      href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina'),
    },
    {
      title: 'Kamera',
      text: 'miglaini attēli, fokusēšanās problēmas.',
      icon: LuCamera,
      href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts'),
    },
    {
      title: 'Skaļruņi/mikrofons',
      text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
      icon: LuVolume2,
      href: buildServiceHref(
        locale,
        CATEGORY_KEY,
        'skalruni-mikrofona-remonts'
      ),
    },
    {
      title: 'Ūdens bojājumi',
      text: 'diagnostika un atjaunošana, ja tas iespējams.',
      icon: LuDroplets,
      href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts'),
    },
  ];
}

function getPageStrings({ brandName, page }) {
  const selectorHeading =
    page?.selector?.heading || `Izvēlies savu ${brandName} modeli`;

  const selectorIntro =
    page?.selector?.intro ||
    'Atrodi vajadzīgo modeli pēc nosaukuma vai atver sēriju un izvēlies savu ierīci.';

  const heroHtml =
    pickLocalized(page?.source?.brand?.page?.bodyHtml, locale, '') ||
    `<p><strong>${brandName} telefonu remonts Rīgā</strong> - ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku un <strong>90 dienu garantiju</strong>.</p>`;

  return {
    introTitle: `${brandName} telefonu remonts - ko mēs darām`,
    introLead:
      'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas atšķiras pēc modeļa - atver sava modeļa lapu, lai redzētu konkrētas <strong>remonta cenas</strong> un termiņus.',
    introParagraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong> (plaisas, tumši plankumi, nereaģē skāriens), <strong>baterijas maiņa</strong> (strauja izlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzda</strong> (nenoturas kabelis, lēna/nekonsekventa uzlāde), <strong>kamera</strong> (miglaini attēli, fokusēšanās kļūdas), <strong>skaļruņi/mikrofons</strong> (klusa skaņa, krakšķi), kā arī <strong>mitruma bojājumi</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
    servicesTitle: 'Populārākie remonti',
    modelGridHeading: selectorHeading,
    modelGridIntro: selectorIntro,
    modelsNote:
      'Cenas atšķiras pēc modeļa - atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels: 'Pagaidām šim zīmolam nav pievienotu modeļu.',
    processTitle: 'Kā notiek remonts',
    heroHtml,
    heroAlt: `${brandName} telefonu remonts`,
    categoryName: 'Telefonu remonts',
    serviceName: `${brandName} telefonu remonts`,
    serviceDescription: `${brandName} tālruņu remonts: displejs, baterija, uzlādes ligzda, kamera un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
    homeCrumb: 'Sākums',
    scrollCta: { label: 'Skatīt modeļus', targetId: 'brand-modeli' },
    fallbackTitle: `${brandName} telefonu remonts`,
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
  return page?.seo?.metaTitle || `${brandName} telefonu remonts Rīgā | iLab`;
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
      href: '/',
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
      title: 'iPhone remonts Rīgā | iLab',
      description: 'iPhone remonts Rīgā iLab servisā.',
      lvPath: IPHONE_HUB_PATH,
      ruPath: '/ru/remont-iphone',
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
    redirect(IPHONE_HUB_PATH);
  }

  const data = await getPhoneBrandPageData(brandSlug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`telefonu-remonts-${data.brandSlug}-jsonld`}
        data={data.jsonLd}
      />

      <PhoneBrandPage locale={locale} {...data} />
    </>
  );
}