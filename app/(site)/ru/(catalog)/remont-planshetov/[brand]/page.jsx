import { notFound } from 'next/navigation';

import TabletBrandPage, {
  CATEGORY_KEY,
  getTabletBrandFallbackFaqItems,
  getTabletBrandPopularServices,
  getTabletBrandProcessSteps,
  getTabletBrandStrings,
  pickLocalized,
} from '@site/(catalog)/plansetdatoru-remonts/[brand]/TabletBrandPage';

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
  absoluteUrl,
  buildItemListLd,
  buildRepairPageJsonLd,
} from '@/lib/seo/jsonld';

import { buildCategoryHref } from '@/lib/routes/routeI18n';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

export const dynamicParams = false;

export async function generateStaticParams() {
  const category = await getCategoryBySlug(CATEGORY_KEY);

  if (!category || !Array.isArray(category.brands)) {
    return [];
  }

  return category.brands
    .map((brand) => String(brand?.key || '').toLowerCase())
    .filter(Boolean)
    .map((brand) => ({ brand }));
}

function normalizeBrandSlug(value = '') {
  return String(value || '').trim().toLowerCase();
}

function getCategoryPath(locale = 'lv') {
  return buildCategoryHref(locale, CATEGORY_KEY);
}

function getBrandPath(brandSlug, locale = 'lv') {
  return `${getCategoryPath(locale)}/${brandSlug}`;
}

function getBrandName(page, brandSlug, locale = 'lv') {
  return pickLocalized(
    page?.source?.brand?.labels,
    locale,
    page?.source?.brand?.name || brandSlug
  );
}

function getPageTitle(page, strings) {
  return (
    page?.seo?.metaTitle ||
    page?.seo?.title ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    strings.fallbackMetaTitle
  );
}

function getPageDescription(page, strings) {
  return (
    page?.seo?.metaDescription ||
    page?.seo?.description ||
    page?.seo?.schemaDescription ||
    strings.fallbackMetaDescription
  );
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

function getServiceName(page, strings) {
  return (
    page?.seo?.schemaName ||
    page?.seo?.h1 ||
    page?.seo?.breadcrumbName ||
    strings.serviceName
  );
}

function getServiceDescription(page, strings) {
  return (
    page?.seo?.schemaDescription ||
    page?.seo?.metaDescription ||
    strings.serviceDescription
  );
}

function getServiceType(page, strings) {
  return page?.seo?.serviceType || getServiceName(page, strings) || strings.serviceType;
}

function getHeroImage(page) {
  return page?.hero?.image || '/images/categories/plansetdatoru_remonts.webp';
}

function getBreadcrumbs(page, strings, headerTitle, baseCategoryPath, baseHref) {
  return [
    {
      label: page?.labels?.homeCrumb || strings.homeCrumb,
      href: '/ru',
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

function getBrandDevices(devicesAll = [], brandSlug) {
  return devicesAll.filter(
    (device) =>
      device?.type === 'device' &&
      device.categoryKey === CATEGORY_KEY &&
      String(device.brandKey || '').toLowerCase() === brandSlug &&
      device.isHidden !== true
  );
}

function buildModelItemList(brandDevices = [], baseHref) {
  return buildItemListLd(
    brandDevices
      .map((device) => {
        if (!device?.name || !device?.slug) {
          return null;
        }

        return {
          name: device.name,
          url: `${baseHref}/${device.slug}`,
        };
      })
      .filter(Boolean),
    {
      id: `${absoluteUrl(baseHref)}#model-list`,
    }
  );
}

async function getTabletBrandData(brandSlug) {
  const [page, devicesAll, seriesMeta, faq] = await Promise.all([
    resolveBrandPage(CATEGORY_KEY, brandSlug, locale),
    getDevices(),
    getSeriesMetaByCategoryBrand(CATEGORY_KEY, brandSlug, locale),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  return {
    page,
    devicesAll,
    seriesMeta,
    faq,
  };
}

export async function generateMetadata({ params }) {
  const brandSlug = normalizeBrandSlug(params?.brand);

  const page = await resolveBrandPage(CATEGORY_KEY, brandSlug, locale);

  if (!page) {
    return buildSeoMetadata({
      locale,
      title: 'Ремонт планшетов | iLab',
      description:
        'Ремонт планшетов в Риге - быстрая диагностика, честные цены, гарантия.',
      lvPath: getBrandPath(brandSlug, 'lv'),
      ruPath: getBrandPath(brandSlug, 'ru'),
    });
  }

  const brandName = getBrandName(page, brandSlug, locale);
  const strings = getTabletBrandStrings({ brandName, page, locale });

  return buildSeoMetadata({
    locale,
    title: getPageTitle(page, strings),
    description: getPageDescription(page, strings),
    lvPath: getBrandPath(brandSlug, 'lv'),
    ruPath: getBrandPath(brandSlug, 'ru'),
    image: page?.seo?.ogImage || '/images/og/home.jpg',
    imageAlt:
      page?.seo?.ogImageAlt ||
      page?.seo?.imageAlt ||
      page?.seo?.breadcrumbName ||
      strings.imageAlt,
  });
}

export default async function Page({ params }) {
  const brandSlug = normalizeBrandSlug(params?.brand);

  if (!brandSlug) {
    notFound();
  }

  const { page, devicesAll, seriesMeta, faq } =
    await getTabletBrandData(brandSlug);

  if (!page) {
    notFound();
  }

  const brandName = getBrandName(page, brandSlug, locale);
  const strings = getTabletBrandStrings({ brandName, page, locale });

  const processSteps = getTabletBrandProcessSteps(locale);
  const popularServices = getTabletBrandPopularServices(locale);

  const baseCategoryPath = getCategoryPath(locale);
  const baseHref = getBrandPath(brandSlug, locale);

  const brandTabletList = getBrandDevices(devicesAll, brandSlug);

  const headerTitle = getHeaderTitle(page, strings);
  const headerLead = getHeaderLead(page);

  const breadcrumbs = getBreadcrumbs(
    page,
    strings,
    headerTitle,
    baseCategoryPath,
    baseHref
  );

  const fallbackFaqItems = getTabletBrandFallbackFaqItems(locale);
  const faqSourceItems = faq.items.length > 0 ? faq.items : fallbackFaqItems;
  const faqRenderItems = toFaqRenderItems(faqSourceItems);

  const hasVisibleFaq = Boolean(
    page.sections?.hasFaq && faqSourceItems.length > 0
  );

  const hasVisibleProcess = Boolean(page.sections?.hasProcess);

  const modelItemListLd =
    brandTabletList.length > 0
      ? buildModelItemList(brandTabletList, baseHref)
      : null;

  const heroImage = getHeroImage(page);

  const jsonLd = buildRepairPageJsonLd({
    path: baseHref,
    locale,

    pageName: getPageTitle(page, strings),
    pageDescription: getPageDescription(page, strings),

    breadcrumbs,

    serviceName: getServiceName(page, strings),
    serviceDescription: getServiceDescription(page, strings),
    serviceType: getServiceType(page, strings),
    serviceImage: heroImage,

    faqItems: faqSourceItems,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: strings.processTitle,
          description: strings.processDescription,
          image: heroImage,
          steps: processSteps.map((step) => ({
            name: step.title,
            text: step.text,
          })),
        }
      : null,

    extra: [modelItemListLd],
  });

  return (
    <>
      <JsonLd id={`${brandSlug}-remont-planshetov-jsonld`} data={jsonLd} />

      <TabletBrandPage
        locale={locale}
        page={page}
        brandSlug={brandSlug}
        devicesAll={devicesAll}
        seriesMeta={seriesMeta}
        brandTabletList={brandTabletList}
        baseHref={baseHref}
        headerTitle={headerTitle}
        headerLead={headerLead}
        breadcrumbs={breadcrumbs}
        strings={strings}
        processSteps={processSteps}
        popularServices={popularServices}
        hasVisibleFaq={hasVisibleFaq}
        faqTitle={faq.title || strings.faqTitle}
        faqItems={faqRenderItems}
      />
    </>
  );
}