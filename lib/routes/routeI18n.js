// lib/routes/routeI18n.js

import {
  ROUTE_TRANSLATIONS,
  SUPPORTED_ROUTE_LOCALES,
  DEFAULT_ROUTE_LOCALE,
} from './routeTranslations';

const norm = (s = '') => decodeURIComponent(String(s)).trim().toLowerCase();

function reverseMap(groupName, locale) {
  const group = ROUTE_TRANSLATIONS[groupName] || {};
  const out = {};

  Object.entries(group).forEach(([canonicalKey, localized]) => {
    const publicSlug = localized?.[locale];
    if (publicSlug) {
      out[norm(publicSlug)] = canonicalKey;
    }
  });

  return out;
}

function forwardMap(groupName, locale) {
  const group = ROUTE_TRANSLATIONS[groupName] || {};
  const out = {};

  Object.entries(group).forEach(([canonicalKey, localized]) => {
    const publicSlug = localized?.[locale];
    if (publicSlug) {
      out[canonicalKey] = publicSlug;
    }
  });

  return out;
}

export function parseLocalizedPath(pathname = '/') {
  const rawParts = pathname.split('/').filter(Boolean).map(norm);

  const hasLocalePrefix =
    rawParts.length > 0 &&
    rawParts[0] !== DEFAULT_ROUTE_LOCALE &&
    SUPPORTED_ROUTE_LOCALES.includes(rawParts[0]);

  const locale = hasLocalePrefix ? rawParts[0] : DEFAULT_ROUTE_LOCALE;
  const segments = hasLocalePrefix ? rawParts.slice(1) : rawParts;

  return {
    locale,
    rawParts,
    segments,
    hasLocalePrefix,
  };
}

export function localizeCategorySlug(publicSlug, locale) {
  if (!publicSlug) return '';

  if (locale === DEFAULT_ROUTE_LOCALE) {
    return norm(publicSlug);
  }

  const map = reverseMap('categories', locale);
  return map[norm(publicSlug)] || '';
}

export function localizeInfoSlug(publicSlug, locale) {
  if (!publicSlug) return '';

  if (locale === DEFAULT_ROUTE_LOCALE) {
    return norm(publicSlug);
  }

  const map = reverseMap('info', locale);
  return map[norm(publicSlug)] || '';
}

export function localizeServiceSlug(publicSlug, locale) {
  if (!publicSlug) return '';

  if (locale === DEFAULT_ROUTE_LOCALE) {
    return norm(publicSlug);
  }

  const map = reverseMap('services', locale);
  return map[norm(publicSlug)] || '';
}

export function getPublicCategorySlug(canonicalSlug, locale) {
  if (!canonicalSlug) return '';

  if (locale === DEFAULT_ROUTE_LOCALE) {
    return canonicalSlug;
  }

  const map = forwardMap('categories', locale);
  return map[canonicalSlug] || canonicalSlug;
}

export function getPublicInfoSlug(canonicalSlug, locale) {
  if (!canonicalSlug) return '';

  if (locale === DEFAULT_ROUTE_LOCALE) {
    return canonicalSlug;
  }

  const map = forwardMap('info', locale);
  return map[canonicalSlug] || canonicalSlug;
}

export function getPublicServiceSlug(canonicalSlug, locale) {
  if (!canonicalSlug) return '';

  if (locale === DEFAULT_ROUTE_LOCALE) {
    return canonicalSlug;
  }

  const map = forwardMap('services', locale);
  return map[canonicalSlug] || canonicalSlug;
}

export function buildLocalizedPath(locale, segments = []) {
  const cleanSegments = segments
    .filter(Boolean)
    .map((seg) => String(seg).replace(/^\/+|\/+$/g, ''));

  if (cleanSegments.length === 0) {
    return '/';
  }

  const path = `/${cleanSegments.join('/')}`;
  return locale === DEFAULT_ROUTE_LOCALE ? path : `/${locale}${path}`;
}

export function buildCategoryHref(locale, canonicalCategorySlug) {
  const publicCategory = getPublicCategorySlug(canonicalCategorySlug, locale);
  return buildLocalizedPath(locale, [publicCategory]);
}

export function buildInfoHref(locale, canonicalInfoSlug) {
  const publicInfo = getPublicInfoSlug(canonicalInfoSlug, locale);
  return buildLocalizedPath(locale, [publicInfo]);
}

export function buildServiceHref(locale, canonicalCategorySlug, canonicalServiceSlug) {
  const publicCategory = getPublicCategorySlug(canonicalCategorySlug, locale);
  const publicService = getPublicServiceSlug(canonicalServiceSlug, locale);
  return buildLocalizedPath(locale, [publicCategory, publicService]);
}

export function buildBrandHref(locale, canonicalCategorySlug, brandSlug) {
  const publicCategory = getPublicCategorySlug(canonicalCategorySlug, locale);
  return buildLocalizedPath(locale, [publicCategory, brandSlug]);
}

export function buildDeviceHref(locale, canonicalCategorySlug, brandOrDeviceSlug, deviceSlug = '') {
  const publicCategory = getPublicCategorySlug(canonicalCategorySlug, locale);

  if (!deviceSlug) {
    return buildLocalizedPath(locale, [publicCategory, brandOrDeviceSlug]);
  }

  return buildLocalizedPath(locale, [publicCategory, brandOrDeviceSlug, deviceSlug]);
}

export function normalizeRouteIdentity(pathname = '/') {
  const { locale, segments, hasLocalePrefix } = parseLocalizedPath(pathname);

  const first = segments[0] || '';
  const second = segments[1] || '';
  const third = segments[2] || '';

  const firstCategoryCanonical = localizeCategorySlug(first, locale);
  const firstInfoCanonical = localizeInfoSlug(first, locale);
  const secondServiceCanonical = localizeServiceSlug(second, locale);

  const canonicalFirst = firstCategoryCanonical || firstInfoCanonical || (locale === DEFAULT_ROUTE_LOCALE ? first : '');
  const canonicalSecond = secondServiceCanonical || (locale === DEFAULT_ROUTE_LOCALE ? second : second);
  const canonicalThird = third || '';

  const canonicalSegments = [canonicalFirst, canonicalSecond, canonicalThird].filter(Boolean);

  return {
    locale,
    hasLocalePrefix,
    publicSegments: segments,
    canonicalSegments,
    firstPublic: first,
    secondPublic: second,
    thirdPublic: third,
    firstCategoryCanonical,
    firstInfoCanonical,
    secondServiceCanonical,
  };
}