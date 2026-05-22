import {
  ROUTE_TRANSLATIONS,
  DEFAULT_ROUTE_LOCALE,
  SUPPORTED_ROUTE_LOCALES,
} from './routeTranslations';

function normalizeLocale(locale = DEFAULT_ROUTE_LOCALE) {
  return SUPPORTED_ROUTE_LOCALES.includes(locale)
    ? locale
    : DEFAULT_ROUTE_LOCALE;
}

function getLocalePrefix(locale = DEFAULT_ROUTE_LOCALE) {
  return normalizeLocale(locale) === DEFAULT_ROUTE_LOCALE ? '' : `/${locale}`;
}

function getTranslatedSlug(group, key, locale = DEFAULT_ROUTE_LOCALE) {
  const safeLocale = normalizeLocale(locale);
  const value = ROUTE_TRANSLATIONS?.[group]?.[key];

  if (!value) {
    return key;
  }

  return value[safeLocale] || value[DEFAULT_ROUTE_LOCALE] || key;
}

export function localizedInfoPath(key, locale = DEFAULT_ROUTE_LOCALE) {
  const safeLocale = normalizeLocale(locale);
  const slug = getTranslatedSlug('info', key, safeLocale);

  return `${getLocalePrefix(safeLocale)}/${slug}`;
}

export function localizedCategoryPath(categoryKey, locale = DEFAULT_ROUTE_LOCALE) {
  const safeLocale = normalizeLocale(locale);
  const categorySlug = getTranslatedSlug('categories', categoryKey, safeLocale);

  return `${getLocalePrefix(safeLocale)}/${categorySlug}`;
}

export function localizedServicePath(
  categoryKey,
  serviceKey,
  locale = DEFAULT_ROUTE_LOCALE
) {
  const safeLocale = normalizeLocale(locale);
  const categorySlug = getTranslatedSlug('categories', categoryKey, safeLocale);
  const serviceSlug = getTranslatedSlug('services', serviceKey, safeLocale);

  return `${getLocalePrefix(safeLocale)}/${categorySlug}/${serviceSlug}`;
}

export function localizedHomePath(locale = DEFAULT_ROUTE_LOCALE) {
  const safeLocale = normalizeLocale(locale);

  return safeLocale === DEFAULT_ROUTE_LOCALE ? '/' : `/${safeLocale}`;
}