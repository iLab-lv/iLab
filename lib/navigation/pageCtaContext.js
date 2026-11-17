import { normalizeRouteIdentity, localizeServiceSlug, buildCategoryHref, buildBrandHref } from '../routes/routeI18n';
import { getPickerBrandSlug, normalizeBrandName, buildPricesHref, getHubPriceBrand } from '../pricing/priceNavigation';

const localized = (value, locale) => typeof value === 'string' ? value : value?.[locale] || value?.lv || '';
const labels = (record, priceBrand = '') => Object.fromEntries(['lv', 'ru'].map(locale => [locale,
  normalizeBrandName(priceBrand, localized(record.labels, locale) || localized(record.name, locale)),
]));

// Build from the same public catalog and route metadata used by page adapters.
// No model/service lists live in the dock or dialog provider.
export function buildPageCtaCatalog({ categories = [], devices = [], priceDevices = [], servicePages = [], serviceLabels = {} } = {}) {
  const pages = {};
  const models = {};
  const priceBrandsFor = (categoryKey, brandKey) => [...new Set(priceDevices
    .filter(device => (device.category || device.categoryKey) === categoryKey && (!brandKey || (device.brandSlug || device.brandKey) === brandKey))
    .map(getPickerBrandSlug).filter(Boolean))];
  for (const category of categories) {
    const categoryKey = category.key || category.slug;
    const categoryPath = buildCategoryHref('lv', category.slug);
    const categoryBrands = priceBrandsFor(categoryKey);
    pages[categoryPath] = { categoryKey, device: labels(category), priceBrand: getHubPriceBrand(categoryKey, categoryBrands) };
    for (const brand of category.brands || []) {
      const brandKey = brand.key || brand.slug;
      const supported = priceBrandsFor(categoryKey, brandKey);
      const priceBrand = supported.length === 1 ? supported[0] : '';
      const context = { categoryKey, brandKey, device: labels(brand, priceBrand), priceBrand };
      const brandPath = brand.route?.brandPath || buildBrandHref('lv', category.slug, brand.slug || brandKey);
      const dedicatedPath = brand.route?.dedicatedHubPath;
      pages[brandPath] = context;
      if (dedicatedPath) pages[dedicatedPath] = context;
      const modelBase = brand.route?.preferDedicatedHub && dedicatedPath ? dedicatedPath : brandPath;
      for (const device of devices.filter(device => device.categoryKey === categoryKey && device.brandKey === brandKey)) {
        const priced = priceDevices.some(item => item.slug === device.slug && (item.category || item.categoryKey) === categoryKey && getPickerBrandSlug(item) === priceBrand);
        const model = { ...context, device: labels(device), model: device.slug, priceModel: priced ? device.slug : '' };
        models[device.slug] = model;
        pages[`${modelBase}/${device.slug}`] = model;
      }
    }
  }
  for (const path of servicePages) {
    const route = normalizeRouteIdentity(path);
    const base = pages['/' + route.firstPublic];
    const serviceKey = localizeServiceSlug(route.secondPublic, route.locale);
    if (base && serviceLabels[serviceKey] && route.publicSegments.length === 2) {
      pages[path] = { ...base, serviceKey, fault: serviceLabels[serviceKey] };
    }
  }
  return { pages, models };
}

export function resolvePageCtaContext(pathname, searchParams, catalog = {}) {
  let route;
  try { route = normalizeRouteIdentity(pathname); } catch { return {}; }
  if (route.publicSegments.length > 3) return {};
  const path = '/' + route.canonicalSegments.join('/');
  let context = catalog.pages?.[path];
  if (!context) return {};
  // Generic service selectors already synchronize their selected brand to the URL.
  if (context.serviceKey && !context.brandKey) {
    const requestedBrand = searchParams?.get('brand')?.toLowerCase().trim();
    const brand = requestedBrand && Object.values(catalog.pages || {}).find(candidate =>
      candidate.categoryKey === context.categoryKey && candidate.brandKey && !candidate.model && !candidate.serviceKey &&
      (candidate.brandKey === requestedBrand || candidate.priceBrand === requestedBrand));
    if (brand) context = { ...brand, serviceKey: context.serviceKey, fault: context.fault };
  }
  // Existing service pages expose model-specific pricing through ?model=.
  const model = context.serviceKey && catalog.models?.[searchParams?.get('model')];
  if (model && model.categoryKey === context.categoryKey && (!context.brandKey || model.brandKey === context.brandKey)) {
    context = { ...model, serviceKey: context.serviceKey, fault: context.fault };
  }
  return {
    ...context,
    booking: {
      ...(localized(context.device, route.locale) ? { device: localized(context.device, route.locale) } : {}),
      ...(localized(context.fault, route.locale) ? { fault: localized(context.fault, route.locale) } : {}),
    },
  };
}

export function getPageCtaActions(pathname, searchParams, catalog, pricesHref) {
  const context = resolvePageCtaContext(pathname, searchParams, catalog);
  return { booking: context.booking || {}, pricesHref: buildPricesHref(pricesHref, context) };
}

export function mergeBookingValues(pageValues = {}, explicitValues) {
  if (!explicitValues) return pageValues;
  // An explicitly different device must not inherit a fault inferred for another one.
  const inferred = Object.hasOwn(explicitValues, 'device') && explicitValues.device !== pageValues.device ? {} : pageValues;
  return { ...inferred, ...explicitValues };
}
