import 'server-only';

import { getCategoryBySlug, getBrandByCategory } from '@/lib/content/categories';
import { buildCategoryHref, buildBrandHref } from '@/lib/routes/routeI18n';

const DEFAULT_LOCALE = 'lv';

function pickLocalized(value, locale = DEFAULT_LOCALE, fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') {
    return value || fallback;
  }

  if (typeof value === 'object') {
    return (
      value?.[locale] ??
      value?.[DEFAULT_LOCALE] ??
      Object.values(value).find(Boolean) ??
      fallback
    );
  }

  return fallback;
}

function boolOrDefault(value, fallback = true) {
  return typeof value === 'boolean' ? value : fallback;
}

function normalizeRoutePath(path = '', locale = DEFAULT_LOCALE) {
  if (!path) return '';

  const clean = String(path).trim();

  if (locale === DEFAULT_LOCALE) return clean;

  if (clean === '/') return '/ru';
  if (clean === '/ru' || clean.startsWith('/ru/')) return clean;

  return `/ru${clean.startsWith('/') ? clean : `/${clean}`}`;
}

function getBrandSeries(brand, locale = DEFAULT_LOCALE) {
  if (!Array.isArray(brand?.series)) return [];

  return [...brand.series]
    .map((series) => ({
      key: series.key || null,
      slug: series.slug || series.key || null,
      order: Number.isFinite(Number(series.order)) ? Number(series.order) : 9999,
      label: pickLocalized(
        series.labels,
        locale,
        series.label || series.name || series.key || ''
      ),
    }))
    .sort((a, b) => a.order - b.order);
}

function resolveSeo({
  publicPath,
  image,
  h1,
  lead,
  metaTitle,
  metaDescription,
  breadcrumbName,
}) {
  return {
    metaTitle,
    metaDescription,
    h1,
    breadcrumbName: breadcrumbName || h1,
    schemaName: h1,
    schemaDescription: metaDescription || lead || '',
    canonicalPath: publicPath,
    image: image || '',
    robots: {
      index: true,
      follow: true,
    },
  };
}

function resolveSharedLabels(locale = DEFAULT_LOCALE) {
  return {
    homeCrumb: locale === 'ru' ? 'Главная' : 'Sākums',
  };
}

function resolveSharedSections(baseSections = {}, pageSections = {}) {
  return {
    variant: pageSections?.variant || baseSections?.variant || 'category',
    hasFaq: boolOrDefault(pageSections?.hasFaq, boolOrDefault(baseSections?.hasFaq, true)),
    hasGuide: boolOrDefault(
      pageSections?.hasCustomGuide ?? pageSections?.hasGuide,
      boolOrDefault(baseSections?.hasCustomGuide ?? baseSections?.hasGuide, true)
    ),
    hasProcess: boolOrDefault(
      pageSections?.hasProcess,
      boolOrDefault(baseSections?.hasProcess, true)
    ),
    hasReviews: boolOrDefault(
      pageSections?.hasReviews,
      boolOrDefault(baseSections?.hasReviews, true)
    ),
    hasWhy: boolOrDefault(pageSections?.hasWhy, boolOrDefault(baseSections?.hasWhy, true)),
    hasConvertBand: boolOrDefault(
      pageSections?.hasConvertBand,
      boolOrDefault(baseSections?.hasConvertBand, true)
    ),
  };
}

function buildCategoryPageObject(category, locale = DEFAULT_LOCALE) {
  const publicPath = buildCategoryHref(locale, category.slug);

  const h1 = pickLocalized(category.h1, locale, category.name || '');
  const lead = pickLocalized(category.lead, locale, '');
  const bodyHtml = pickLocalized(category.bodyHtml, locale, '');
  const metaTitle = pickLocalized(category.metaTitle, locale, h1);
  const metaDescription = pickLocalized(category.metaDescription, locale, lead || '');
  const image = category.image || '';

  const sections = resolveSharedSections(category.sections || {}, {});
  const labels = resolveSharedLabels(locale);

  return {
    identity: {
      pageType: 'category',
      locale,
      categoryKey: category.key || category.slug,
      brandKey: null,
      variant: sections.variant,
    },

    route: {
      publicPath,
      canonicalPath: publicPath,
      brandPath: '',
      preferDedicatedHub: false,
    },

    seo: resolveSeo({
      publicPath,
      image,
      h1,
      lead,
      metaTitle,
      metaDescription,
      breadcrumbName: h1,
    }),

    hero: {
      image,
      alt: h1,
      bodyHtml: '',
    },

    intro: {
      title: h1,
      lead,
      bodyHtml,
    },

    selector: {
      heading: '',
      intro: '',
      series: [],
    },

    sections,

    labels,

    source: {
      category,
      brand: null,
    },
  };
}

function buildBrandPageObject(category, brand, locale = DEFAULT_LOCALE) {
  const page = brand?.page || {};
  const pageRoute = brand?.route || {};
  const publicPath =
    normalizeRoutePath(pageRoute.brandPath, locale) ||
    buildBrandHref(locale, category.slug, brand.slug || brand.key);

  const h1 =
    pickLocalized(page.h1, locale, '') ||
    `${pickLocalized(brand.labels, locale, brand.name || brand.key || '')} ${pickLocalized(
      category.labels,
      locale,
      category.name || category.slug || ''
    )}`;

  const lead =
    pickLocalized(page.lead, locale, '') ||
    pickLocalized(category.lead, locale, '');

  const metaTitle =
    pickLocalized(page.metaTitle, locale, '') ||
    pickLocalized(category.metaTitle, locale, h1);

  const metaDescription =
    pickLocalized(page.metaDescription, locale, '') ||
    pickLocalized(category.metaDescription, locale, lead || '');

  const image = brand.image || category.image || '';
  const sections = resolveSharedSections(category.sections || {}, page.sections || page);
  const labels = resolveSharedLabels(locale);

  return {
    identity: {
      pageType: 'brand',
      locale,
      categoryKey: category.key || category.slug,
      brandKey: brand.key || brand.slug,
      variant: page.variant || 'brand',
    },

    route: {
      publicPath,
      canonicalPath: publicPath,
      brandPath: publicPath,
      preferDedicatedHub: false,
    },

    seo: resolveSeo({
      publicPath,
      image,
      h1,
      lead,
      metaTitle,
      metaDescription,
      breadcrumbName: h1,
    }),

    hero: {
      image,
      alt: h1,
      bodyHtml: '',
    },

    intro: {
      title: h1,
      lead,
      bodyHtml: '',
    },

    selector: {
      heading: '',
      intro: '',
      series: getBrandSeries(brand, locale),
    },

    sections,

    labels,

    source: {
      category,
      brand,
    },
  };
}

function buildDedicatedHubPageObject(category, brand, locale = DEFAULT_LOCALE) {
  const page = brand?.page || {};
  const pageRoute = brand?.route || {};
  const dedicatedHubPath = normalizeRoutePath(pageRoute.dedicatedHubPath, locale);
  const brandPath =
    normalizeRoutePath(pageRoute.brandPath, locale) ||
    buildBrandHref(locale, category.slug, brand.slug || brand.key);

  const publicPath = dedicatedHubPath || brandPath;

  const h1 =
    pickLocalized(page.h1, locale, '') ||
    pickLocalized(category.h1, locale, category.name || '');

  const lead =
    pickLocalized(page.lead, locale, '') ||
    pickLocalized(category.lead, locale, '');

  const metaTitle =
    pickLocalized(page.metaTitle, locale, '') ||
    pickLocalized(category.metaTitle, locale, h1);

  const metaDescription =
    pickLocalized(page.metaDescription, locale, '') ||
    pickLocalized(category.metaDescription, locale, lead || '');

  const image = brand.image || category.image || '';
  const sections = resolveSharedSections(category.sections || {}, page.sections || page);
  const labels = resolveSharedLabels(locale);

  return {
    identity: {
      pageType: 'categoryBrandHub',
      locale,
      categoryKey: category.key || category.slug,
      brandKey: brand.key || brand.slug,
      variant: page.variant || 'hub',
    },

    route: {
      publicPath,
      canonicalPath: publicPath,
      brandPath,
      preferDedicatedHub: Boolean(pageRoute.preferDedicatedHub),
    },

    seo: resolveSeo({
      publicPath,
      image,
      h1,
      lead,
      metaTitle,
      metaDescription,
      breadcrumbName: h1,
    }),

    hero: {
      image,
      alt: h1,
      bodyHtml: '',
    },

    intro: {
      title: '',
      lead,
      bodyHtml: '',
    },

    selector: {
      heading: pickLocalized(page.modelGridHeading, locale, ''),
      intro: pickLocalized(page.modelGridIntro, locale, ''),
      series: getBrandSeries(brand, locale),
    },

    sections,

    labels,

    source: {
      category,
      brand,
    },
  };
}

export async function resolveCategoryPage(categorySlug, locale = DEFAULT_LOCALE) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return null;

  return buildCategoryPageObject(category, locale);
}

export async function resolveBrandPage(
  categorySlug,
  brandKey,
  locale = DEFAULT_LOCALE
) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return null;

  const brand = await getBrandByCategory(categorySlug, brandKey);
  if (!brand) return null;

  return buildBrandPageObject(category, brand, locale);
}

export async function resolveDedicatedBrandHubPage(
  categorySlug,
  brandKey,
  locale = DEFAULT_LOCALE
) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return null;

  const brand = await getBrandByCategory(categorySlug, brandKey);
  if (!brand) return null;

  return buildDedicatedHubPageObject(category, brand, locale);
}