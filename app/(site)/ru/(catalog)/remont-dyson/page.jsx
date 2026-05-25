import DysonRepairPage, {
  CATEGORY_KEY,
  getDysonFallbackFaqItems,
  getDysonPageStrings,
} from '@site/(catalog)/dyson-remonts/DysonRepairPage';

import JsonLd from '@components/seo/JsonLd';

import { resolveCategoryPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';

import { buildCategoryHref } from '@/lib/routes/routeI18n';
import { localizedCategoryPath } from '@/lib/routes/localizedPath';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const labels = getDysonPageStrings(locale);

const lvPath = localizedCategoryPath(CATEGORY_KEY, 'lv');
const ruPath = localizedCategoryPath(CATEGORY_KEY, 'ru');

function getPageTitle(page) {
  return (
    page?.seo?.metaTitle ||
    page?.seo?.title ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    labels.metaTitle
  );
}

function getPageDescription(page) {
  return (
    page?.seo?.metaDescription ||
    page?.seo?.description ||
    page?.seo?.schemaDescription ||
    labels.metaDescription
  );
}

function getHeaderTitle(page) {
  return page?.seo?.h1 || page?.seo?.breadcrumbName || labels.fallbackTitle;
}

function getHeaderLead(page) {
  return (
    page?.intro?.lead ||
    page?.seo?.metaDescription ||
    page?.seo?.schemaDescription ||
    labels.metaDescription
  );
}

function getServiceName(page) {
  return (
    page?.seo?.schemaName ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    labels.serviceName
  );
}

function getServiceDescription(page) {
  return (
    page?.seo?.schemaDescription ||
    page?.seo?.metaDescription ||
    labels.serviceDescription
  );
}

function getServiceType(page) {
  return page?.seo?.serviceType || getServiceName(page) || labels.serviceType;
}

function getHeroImage(page) {
  return page?.hero?.image || '/images/categories/dyson_remonts.webp';
}

function getBreadcrumbs(page, headerTitle, basePath) {
  return [
    {
      label: page?.labels?.homeCrumb || labels.homeCrumb,
      href: '/ru',
    },
    {
      label: page?.seo?.breadcrumbName || headerTitle,
      href: basePath,
    },
  ];
}

async function getDysonRepairData() {
  const [page, faq] = await Promise.all([
    resolveCategoryPage(CATEGORY_KEY, locale),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  return {
    page,
    faq,
  };
}

export async function generateMetadata() {
  const page = await resolveCategoryPage(CATEGORY_KEY, locale);

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
  const { page, faq } = await getDysonRepairData();

  const basePath =
    page?.route?.publicPath || buildCategoryHref(locale, CATEGORY_KEY);

  const headerTitle = getHeaderTitle(page);
  const headerLead = getHeaderLead(page);
  const breadcrumbs = getBreadcrumbs(page, headerTitle, basePath);

  const fallbackFaqItems = getDysonFallbackFaqItems(locale);
  const faqSourceItems = faq.items.length > 0 ? faq.items : fallbackFaqItems;
  const faqRenderItems = toFaqRenderItems(faqSourceItems);

  const hasVisibleFaq = Boolean(
    (page?.sections?.hasFaq ?? true) && faqSourceItems.length > 0
  );

  const hasVisibleProcess = Boolean(page?.sections?.hasProcess ?? true);

  const heroImage = getHeroImage(page);

  const jsonLd = buildRepairPageJsonLd({
    path: basePath,
    locale,

    pageName: getPageTitle(page),
    pageDescription: getPageDescription(page),

    breadcrumbs,

    serviceName: getServiceName(page),
    serviceDescription: getServiceDescription(page),
    serviceType: getServiceType(page),
    serviceImage: heroImage,

    faqItems: faqSourceItems,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: labels.processTitle,
          description:
            'Процесс в сервисных центрах iLab в Риге: диагностика, цена и срок, ремонт, проверка, гарантия.',
          image: heroImage,
          steps: labels.processSteps.map((step) => ({
            name: step.title,
            text: step.text,
          })),
        }
      : null,
  });

  return (
    <>
      <JsonLd id="remont-dyson-jsonld" data={jsonLd} />

      <DysonRepairPage
        locale={locale}
        page={page}
        headerTitle={headerTitle}
        headerLead={headerLead}
        breadcrumbs={breadcrumbs}
        labels={labels}
        faqTitle={faq.title || labels.faqTitle}
        faqItems={faqRenderItems}
        hasVisibleFaq={hasVisibleFaq}
        heroImage={heroImage}
      />
    </>
  );
}