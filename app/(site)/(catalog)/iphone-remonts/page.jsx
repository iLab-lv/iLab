import IphoneRepairPage from './IphoneRepairPage';

import JsonLd from '@components/seo/JsonLd';

import { getDevices } from '@/lib/content/devices';
import { getSeriesMetaByCategoryBrand } from '@/lib/content/categories';
import { resolveDedicatedBrandHubPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { localizedCategoryPath } from '@/lib/routes/localizedPath';
import { buildCategoryHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const HUB_KEY = 'iphone-remonts';

const locale = 'lv';

const lvPath = localizedCategoryPath(HUB_KEY, 'lv');
const ruPath = localizedCategoryPath(HUB_KEY, 'ru');

const fallbackMetaTitle = 'iPhone remonts Rīgā | iLab';

const fallbackDescription =
  'iPhone remonts Rīgā - displeja, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana. Ātra diagnostika, skaidras cenas un 90 dienu garantija iLab servisā Rīgā.';

const fallbackH1 = 'iPhone remonts Rīgā';

const labels = {
  homeCrumb: 'Sākums',
  imageAlt: 'iPhone remonts Rīgā',
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
};

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
  return page?.seo?.h1 || page?.seo?.breadcrumbName || fallbackH1;
}

function getHeaderLead(page) {
  return (
    page?.intro?.lead ||
    page?.seo?.metaDescription ||
    page?.seo?.schemaDescription ||
    null
  );
}

function getServiceName(page, headerTitle) {
  return (
    page?.seo?.schemaName ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    headerTitle
  );
}

function getServiceDescription(page, headerLead) {
  return (
    page?.seo?.schemaDescription ||
    page?.seo?.metaDescription ||
    headerLead ||
    fallbackDescription
  );
}

function getServiceType(page, headerTitle) {
  return (
    page?.seo?.serviceType ||
    page?.seo?.schemaName ||
    page?.seo?.breadcrumbName ||
    headerTitle
  );
}

function getHeroImage(page) {
  return page?.hero?.image || '/images/categories/iphone_remonts.webp';
}

function getBreadcrumbs(page, headerTitle, baseHref) {
  return [
    {
      label: page?.labels?.homeCrumb || labels.homeCrumb,
      href: '/',
    },
    {
      label: page?.seo?.breadcrumbName || headerTitle,
      href: baseHref,
    },
  ];
}

async function getIphoneRepairData() {
  const [page, devicesAll, seriesMeta, faq] = await Promise.all([
    resolveDedicatedBrandHubPage(CATEGORY_KEY, BRAND_KEY, locale),
    getDevices(),
    getSeriesMetaByCategoryBrand(CATEGORY_KEY, BRAND_KEY, locale),
    getFaqGroups([{ scopeType: 'category', scopeKey: HUB_KEY }], locale),
  ]);

  return {
    page,
    devicesAll,
    seriesMeta,
    faq,
  };
}

export async function generateMetadata() {
  const page = await resolveDedicatedBrandHubPage(
    CATEGORY_KEY,
    BRAND_KEY,
    locale
  );

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
  const { page, devicesAll, seriesMeta, faq } = await getIphoneRepairData();

  if (!page) {
    return null;
  }

  const baseHref = buildCategoryHref(locale, HUB_KEY);

  const headerTitle = getHeaderTitle(page);
  const headerLead = getHeaderLead(page);
  const breadcrumbs = getBreadcrumbs(page, headerTitle, baseHref);

  const pageName = getPageTitle(page);
  const pageDescription = getPageDescription(page);

  const serviceName = getServiceName(page, headerTitle);
  const serviceDescription = getServiceDescription(page, headerLead);
  const serviceType = getServiceType(page, headerTitle);
  const serviceImage = getHeroImage(page);

  const faqRenderItems = toFaqRenderItems(faq.items);
  const hasVisibleFaq = Boolean(page.sections?.hasFaq && faq.items.length > 0);
  const hasVisibleProcess = Boolean(page.sections?.hasProcess);

  const jsonLd = buildRepairPageJsonLd({
    path: baseHref,
    locale,

    pageName,
    pageDescription,

    breadcrumbs,

    serviceName,
    serviceDescription,
    serviceType,
    serviceImage,

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

  return (
    <>
      <JsonLd id="iphone-remonts-jsonld" data={jsonLd} />

      <IphoneRepairPage
        locale={locale}
        page={page}
        devicesAll={devicesAll}
        seriesMeta={seriesMeta}
        baseHref={baseHref}
        headerTitle={headerTitle}
        headerLead={headerLead}
        breadcrumbs={breadcrumbs}
        faqTitle={faq.title}
        faqItems={faqRenderItems}
      />
    </>
  );
}