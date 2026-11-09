// Shared by model pages and service selectors. Firestore service IDs retain each variant.
function normalizeString(value = '') {
  return String(value || '').trim();
}

export function pickLocalizedField(value, locale = 'lv', fallback = 'lv') {
  if (!value) return '';

  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'object') {
    if (typeof value[locale] === 'string' && value[locale].trim()) {
      return value[locale].trim();
    }

    if (typeof value[fallback] === 'string' && value[fallback].trim()) {
      return value[fallback].trim();
    }
  }

  return '';
}

function buildPricingMap(pricingRows = []) {
  return new Map(
    pricingRows
      .filter((row) => row?.serviceId)
      .map((row) => [row.serviceId, row])
  );
}

function getServiceTitle(service, locale = 'lv') {
  return (
    pickLocalizedField(
      service?.labels,
      locale,
      locale === 'ru' ? 'lv' : 'ru'
    ) ||
    service?.id ||
    ''
  );
}

function isServiceApplicable(service, model) {
  if (!service || service.isActive === false) {
    return false;
  }

  if (service.iphoneOnly !== true || !model) {
    return true;
  }

  return normalizeString(model.brandKey).toLowerCase() === 'apple';
}

function getServiceFamily(service, locale = 'lv') {
  return (
    pickLocalizedField(service?.familyLabels, locale) ||
    normalizeString(service?.family)
  );
}

function getDefaultTimeText(service, locale = 'lv') {
  return (
    pickLocalizedField(service?.defaultTimeText, locale) ||
    (locale === 'ru' ? 'В тот же день' : 'Tajā pašā dienā')
  );
}

function getPricingTimeText(pricing, locale = 'lv') {
  return (
    pickLocalizedField(pricing?.timeTextOverride, locale) ||
    pickLocalizedField(pricing?.timeText, locale) ||
    normalizeString(pricing?.timeTextOverride) ||
    normalizeString(pricing?.timeText)
  );
}

function getWarrantyDays(service, pricing) {
  if (
    typeof pricing?.warrantyDaysOverride === 'number' &&
    Number.isFinite(pricing.warrantyDaysOverride)
  ) {
    return pricing.warrantyDaysOverride;
  }

  if (
    typeof service?.defaultWarrantyDays === 'number' &&
    Number.isFinite(service.defaultWarrantyDays)
  ) {
    return service.defaultWarrantyDays;
  }

  return null;
}

function getPrice(pricing) {
  if (typeof pricing?.price === 'number' && Number.isFinite(pricing.price)) {
    return pricing.price;
  }

  return null;
}

function buildPriceListItem(service, pricing, locale = 'lv') {
  if (!service) {
    return null;
  }

  if (pricing?.isHidden === true) {
    return null;
  }

  const title = getServiceTitle(service, locale);

  if (!title) {
    return null;
  }

  const defaultTimeText = getDefaultTimeText(service, locale);
  const overrideTimeText = getPricingTimeText(pricing, locale);

  return {
    id: service.id,
    title,
    family: getServiceFamily(service, locale),
    order: Number.isFinite(Number(service.order))
      ? Number(service.order)
      : 9999,
    timeText: overrideTimeText || defaultTimeText,
    warrantyDays: getWarrantyDays(service, pricing),
    price: getPrice(pricing),
    isStartingFrom: pricing?.isStartingFrom === true,
    isHidden: pricing?.isHidden === true,
    popular: pricing?.popular === true || service?.popular === true,
    href: service.slug ? `/${service.slug}` : undefined,
    serviceSlug: service.slug || null,
    serviceId: service.id,
    pricingId: pricing?.id || null,
  };
}

function sortPriceListItems(items = []) {
  return [...items].sort((a, b) => {
    const orderA = Number.isFinite(Number(a?.order)) ? Number(a.order) : 9999;
    const orderB = Number.isFinite(Number(b?.order)) ? Number(b.order) : 9999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    const titleComparison = String(a?.title || '').localeCompare(
      String(b?.title || '')
    );
    if (titleComparison !== 0) return titleComparison;
    return String(a?.id || '').localeCompare(String(b?.id || ''));
  });
}


export function resolveServicePriceItems(services = [], pricingRows = [], { model = null, locale = 'lv' } = {}) {
  const pricingByServiceId = buildPricingMap(pricingRows.filter((row) => row?.isActive !== false));
  return sortPriceListItems(services
    .filter((service) => isServiceApplicable(service, model))
    .map((service) => buildPriceListItem(service, pricingByServiceId.get(service.id) || null, locale))
    .filter(Boolean));
}

// Exact requested option stays primary even when only another variant has a numeric price.
export function pickPrimaryPriceItem(items = [], serviceIds = []) {
  if (serviceIds.length) return resolveSelectorServiceIds(serviceIds, items).map((id) => items.find((item) => item.id === id)).find(Boolean) || null;
  return items.find((item) => item.popular) || items[0] || null;
}

// Legacy presentation IDs omit "phone-"; resolve only IDs present in the live catalog.
export function resolveSelectorServiceIds(serviceIds, services) {
  const ids = new Set(services.map((service) => service.id));
  return serviceIds.map((id) => ids.has(id) ? id : ids.has(`phone-${id}`) ? `phone-${id}` : id);
}

// A hub's "from" amount is a bound across its listed models for ONE exact
// service ID. Never collapse original/alternative parts or different repairs.
export function resolveStartingServicePriceItems(services = [], pricingRows = [], models = [], { locale = 'lv' } = {}) {
  const byModel = new Map();
  for (const row of pricingRows) {
    if (!byModel.has(row.modelId)) byModel.set(row.modelId, []);
    byModel.get(row.modelId).push(row);
  }
  const starting = new Map();
  for (const model of models) {
    if (!model?.slug) continue;
    for (const item of resolveServicePriceItems(services, byModel.get(model.slug) || [], { model, locale })) {
      if (typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price < 0) continue;
      const previous = starting.get(item.id);
      if (!previous || item.price < previous.price) starting.set(item.id, { ...item, isStartingFrom: true });
    }
  }
  return sortPriceListItems([...starting.values()]);
}

