import { notFound } from 'next/navigation';

import ComputerBrandPage, {
  CATEGORY_KEY,
  getComputerBrandFallbackFaqItems,
  getComputerBrandPageStrings,
  getPopularRepairsForType,
  normalizeComputerBrand,
} from './ComputerBrandPage';

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

const locale = 'lv';

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

function getHeroImage(page, cfg) {
  return page?.hero?.image || cfg.heroImage;
}

function getBreadcrumbs(page, strings, headerTitle, baseCategoryPath, path) {
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
      href: path,
    },
  ];
}

function getBrandDevices(devices = [], brandKey) {
  return devices.filter(
    (device) =>
      device?.type === 'device' &&
      device.categoryKey === CATEGORY_KEY &&
      String(device.brandKey || '').toLowerCase() === brandKey &&
      device.isHidden !== true
  );
}

function buildModelItemList(brandDevices = [], path) {
  return buildItemListLd(
    brandDevices
      .map((device) => {
        if (!device?.name || !device?.slug) {
          return null;
        }

        return {
          name: device.name,
          url: `${path}/${device.slug}`,
        };
      })
      .filter(Boolean),
    {
      id: `${absoluteUrl(path)}#model-list`,
    }
  );
}

async function getComputerBrandData(brandSlug) {
  const [page, devices, seriesMeta, faq] = await Promise.all([
    resolveBrandPage(CATEGORY_KEY, brandSlug, locale),
    getDevices(),
    getSeriesMetaByCategoryBrand(CATEGORY_KEY, brandSlug, locale),
    getFaqGroups([{ scopeType: 'category', scopeKey: CATEGORY_KEY }], locale),
  ]);

  return {
    page,
    devices,
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
      title: 'Datoru remonts | iLab',
      description:
        'Datoru remonts Rīgā - portatīvie un galda datori. Ātra diagnostika, godīgas cenas, garantija.',
      lvPath: getBrandPath(brandSlug, 'lv'),
      ruPath: getBrandPath(brandSlug, 'ru'),
    });
  }

  const cfg = normalizeComputerBrand(page.source?.brand, locale);
  const strings = getComputerBrandPageStrings(cfg, locale);

  const title = getPageTitle(page, strings);
  const description = getPageDescription(page, strings);

  const image = page?.seo?.ogImage || '/images/og/home.jpg';

  const imageAlt =
    page?.seo?.ogImageAlt ||
    page?.seo?.imageAlt ||
    page?.seo?.breadcrumbName ||
    strings.imageAlt;

  return buildSeoMetadata({
    locale,
    title,
    description,
    lvPath: getBrandPath(brandSlug, 'lv'),
    ruPath: getBrandPath(brandSlug, 'ru'),
    image,
    imageAlt,
  });
}

export default async function Page({ params }) {
  const brandSlug = normalizeBrandSlug(params?.brand);

  if (!brandSlug) {
    notFound();
  }

  const { page, devices, seriesMeta, faq } = await getComputerBrandData(brandSlug);

  if (!page) {
    notFound();
  }

  const cfg = normalizeComputerBrand(page.source?.brand, locale);
  const strings = getComputerBrandPageStrings(cfg, locale);
  const popularRepairs = getPopularRepairsForType(cfg.deviceType, locale);

  const baseCategoryPath = getCategoryPath(locale);
  const path = getBrandPath(cfg.key || brandSlug, locale);

  const brandDevices = getBrandDevices(devices, cfg.key);

  const headerTitle = getHeaderTitle(page, strings);
  const headerLead = getHeaderLead(page);

  const breadcrumbs = getBreadcrumbs(
    page,
    strings,
    headerTitle,
    baseCategoryPath,
    path
  );

  const fallbackFaqItems = getComputerBrandFallbackFaqItems(locale);
  const faqSourceItems = faq.items.length > 0 ? faq.items : fallbackFaqItems;
  const faqRenderItems = toFaqRenderItems(faqSourceItems);

  const hasVisibleFaq = Boolean(
    page.sections?.hasFaq && faqSourceItems.length > 0
  );

  const hasVisibleProcess = Boolean(page.sections?.hasProcess);

  const modelItemListLd =
    cfg.hasModels && brandDevices.length > 0
      ? buildModelItemList(brandDevices, path)
      : null;

  const jsonLd = buildRepairPageJsonLd({
    path,
    locale,

    pageName: getPageTitle(page, strings),
    pageDescription: getPageDescription(page, strings),

    breadcrumbs,

    serviceName: getServiceName(page, strings),
    serviceDescription: getServiceDescription(page, strings),
    serviceType: getServiceType(page, strings),
    serviceImage: getHeroImage(page, cfg),

    faqItems: faqSourceItems,
    includeFaq: hasVisibleFaq,

    includeHowTo: hasVisibleProcess,
    howTo: hasVisibleProcess
      ? {
          name: strings.serviceName,
          description: strings.serviceDescription,
          image: getHeroImage(page, cfg),
          steps: strings.processSteps.map((step) => ({
            name: step.title,
            text: step.text,
          })),
        }
      : null,

    extra: [modelItemListLd],
  });

  return (
    <>
      <JsonLd id={`${cfg.key}-datoru-remonts-jsonld`} data={jsonLd} />

      <ComputerBrandPage
        locale={locale}
        page={page}
        brandSlug={cfg.key}
        brandConfig={cfg}
        devicesAll={devices}
        seriesMeta={seriesMeta}
        brandDevices={brandDevices}
        baseHref={path}
        headerTitle={headerTitle}
        headerLead={headerLead}
        breadcrumbs={breadcrumbs}
        strings={strings}
        popularRepairs={popularRepairs}
        hasVisibleFaq={hasVisibleFaq}
        faqTitle={faq.title || strings.faqTitle}
        faqItems={faqRenderItems}
      />
    </>
  );
}
