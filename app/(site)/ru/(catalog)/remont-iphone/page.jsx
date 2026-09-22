import IphoneRepairPage from '@site/(catalog)/iphone-remonts/IphoneRepairPage';

import JsonLd from '@components/seo/JsonLd';

import { getDevices } from '@/lib/content/devices';
import { getSeriesMetaByCategoryBrand } from '@/lib/content/categories';
import { resolveDedicatedBrandHubPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { localizedCategoryPath } from '@/lib/routes/localizedPath';
import { buildCategoryHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const HUB_KEY = 'iphone-remonts';

const locale = 'ru';

const lvPath = localizedCategoryPath(HUB_KEY, 'lv');
const ruPath = localizedCategoryPath(HUB_KEY, 'ru');

const fallbackMetaTitle = 'Ремонт iPhone в Риге | iLab';

const fallbackDescription =
  'Ремонт iPhone в Риге - замена экрана, батареи, камеры и разъёма зарядки, устранение последствий попадания влаги. Быстрая диагностика, понятные цены и гарантия до 1 года в сервисе iLab.';

const fallbackH1 = 'Ремонт iPhone в Риге';

const labels = {
  homeCrumb: 'Главная',
  imageAlt: 'Ремонт iPhone в сервисе iLab в Риге',
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
      text: 'Предоставляем гарантию до 1 года на выполненную работу и установленные детали.',
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
      href: '/ru',
    },
    {
      label: page?.seo?.breadcrumbName || headerTitle,
      href: baseHref,
    },
  ];
}

async function getIphoneRepairData() {
  const [page, devicesAll, seriesMeta, faq, reviewsSummary] = await Promise.all([
    resolveDedicatedBrandHubPage(CATEGORY_KEY, BRAND_KEY, locale),
    getDevices(),
    getSeriesMetaByCategoryBrand(CATEGORY_KEY, BRAND_KEY, locale),
    getFaqGroups([{ scopeType: 'category', scopeKey: HUB_KEY }], locale),
    getReviewsSummary(),
  ]);

  return {
    page,
    devicesAll,
    seriesMeta,
    faq,
    reviewsSummary,
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
  const { page, devicesAll, seriesMeta, faq, reviewsSummary } =
    await getIphoneRepairData();

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
      <JsonLd id="iphone-remonts-ru-jsonld" data={jsonLd} />

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
        reviewsSummary={reviewsSummary}
      />
    </>
  );
}
