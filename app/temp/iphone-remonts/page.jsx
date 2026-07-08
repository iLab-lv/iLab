import IphoneRepairPage from './IphoneRepairPage';

import { getDevices } from '@/lib/content/devices';
import { getSeriesMetaByCategoryBrand } from '@/lib/content/categories';
import { resolveDedicatedBrandHubPage } from '@/lib/content/resolvers/catalogPages';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';

import { buildCategoryHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const HUB_KEY = 'iphone-remonts';

const locale = 'lv';

export const metadata = {
  title: 'Temp preview: iPhone remonts Rīgā',
  robots: {
    index: false,
    follow: false,
  },
};

function getHeaderTitle(page) {
  return page?.seo?.h1 || page?.seo?.breadcrumbName || 'iPhone remonts Rīgā';
}

function getHeaderLead(page) {
  return (
    page?.intro?.lead ||
    page?.seo?.metaDescription ||
    page?.seo?.schemaDescription ||
    null
  );
}

function getBreadcrumbs(page, headerTitle, baseHref) {
  return [
    {
      label: page?.labels?.homeCrumb || 'Sākums',
      href: '/',
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
  const faqRenderItems = toFaqRenderItems(faq.items);

  return (
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
  );
}
