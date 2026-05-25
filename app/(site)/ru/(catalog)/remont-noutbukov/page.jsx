import ComputerRepairPage, {
  getComputerPageStrings,
  pickLocalized,
} from '@site/(catalog)/datoru-remonts/ComputerRepairPage';

import JsonLd from '@components/seo/JsonLd';

import { resolveCategoryPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import {
  absoluteUrl,
  buildItemListLd,
  buildRepairPageJsonLd,
} from '@/lib/seo/jsonld';

import { buildCategoryHref } from '@/lib/routes/routeI18n';
import { localizedCategoryPath } from '@/lib/routes/localizedPath';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';
import { buildComputerPopularServices } from '@sections/services/services.i18n';

const CATEGORY_KEY = 'datoru-remonts';

const locale = 'ru';

const lvPath = localizedCategoryPath(CATEGORY_KEY, 'lv');
const ruPath = localizedCategoryPath(CATEGORY_KEY, 'ru');

const labels = getComputerPageStrings(locale);

function normalizeRoutePath(path = '', locale = 'lv') {
  if (!path) return '';

  const clean = String(path).trim();

  if (locale === 'lv') return clean;

  if (clean === '/') return '/ru';
  if (clean === '/ru' || clean.startsWith('/ru/')) return clean;

  return `/ru${clean.startsWith('/') ? clean : `/${clean}`}`;
}

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
    null
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
  return page?.hero?.image || '/images/categories/datoru_remonts.webp';
}

function getHeroHtml(page) {
  return (
    pickLocalized(page?.source?.category?.bodyHtml, locale, '') ||
    labels.heroBodyHtml
  );
}

function getBreadcrumbs(page, headerTitle, basePath) {
  return [
    {
      label: page?.labels?.homeCrumb || 'Главная',
      href: '/ru',
    },
    {
      label: page?.seo?.breadcrumbName || headerTitle,
      href: basePath,
    },
  ];
}

function buildBrandItemList(brands = [], basePath) {
  return buildItemListLd(
    brands
      .map((brand) => {
        const key = brand?.key || brand?.brandSlug || '';

        if (!key) {
          return null;
        }

        const routePath =
          normalizeRoutePath(brand?.route?.brandPath || '', locale) ||
          `${basePath}/${key}`;

        const brandName = pickLocalized(brand?.labels, locale, key);

        return {
          name: `Ремонт компьютеров ${brandName}`,
          url: routePath,
        };
      })
      .filter(Boolean),
    {
      id: `${absoluteUrl(basePath)}#brand-list`,
    }
  );
}

async function getComputerRepairData() {
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
  const { page, faq } = await getComputerRepairData();

  if (!page) {
    return null;
  }

  const basePath =
    page.route?.publicPath || buildCategoryHref(locale, CATEGORY_KEY);

  const brands = Array.isArray(page.source?.category?.brands)
    ? page.source.category.brands
    : [];

  const headerTitle = getHeaderTitle(page);
  const headerLead = getHeaderLead(page);
  const breadcrumbs = getBreadcrumbs(page, headerTitle, basePath);

  const faqSourceItems = faq.items.length > 0 ? faq.items : labels.faqItems;
  const faqRenderItems = toFaqRenderItems(faqSourceItems);

  const hasVisibleFaq = Boolean(
    page.sections?.hasFaq && faqSourceItems.length > 0
  );

  const hasVisibleProcess = Boolean(page.sections?.hasProcess);

  const itemListLd = buildBrandItemList(brands, basePath);

  const jsonLd = buildRepairPageJsonLd({
    path: basePath,
    locale,

    pageName: getPageTitle(page),
    pageDescription: getPageDescription(page),

    breadcrumbs,

    serviceName: getServiceName(page),
    serviceDescription: getServiceDescription(page),
    serviceType: getServiceType(page),
    serviceImage: getHeroImage(page),

    faqItems: faqSourceItems,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: labels.serviceName,
          description: labels.serviceDescription,
          image: getHeroImage(page),
          steps: labels.processSteps.map((step) => ({
            name: step.title,
            text: step.text,
          })),
        }
      : null,

    extra: [itemListLd],
  });

  return (
    <>
      <JsonLd id="remont-noutbukov-jsonld" data={jsonLd} />

      <ComputerRepairPage
        locale={locale}
        page={page}
        basePath={basePath}
        headerTitle={headerTitle}
        headerLead={headerLead}
        breadcrumbs={breadcrumbs}
        brands={brands}
        faqTitle={faq.title || labels.faqTitle}
        faqItems={faqRenderItems}
        labels={labels}
        popularServices={buildComputerPopularServices(locale)}
        heroImage={getHeroImage(page)}
        heroHtml={getHeroHtml(page)}
      />
    </>
  );
}