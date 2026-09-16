// lib/content/catalogDevices.js

import 'server-only';

import { db } from '@/lib/firebaseAdmin';

const DEFAULT_CURRENCY = 'EUR';

function normalizeString(value = '') {
  return String(value || '').trim();
}

export function normalizeSlug(value = '') {
  return decodeURIComponent(String(value || '')).trim();
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

function normalizeDevice(doc) {
  if (!doc?.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
}

export async function getDeviceBySlug(
  slug,
  {
    categoryKey,
    brandKey,
  } = {}
) {
  const safeSlug = normalizeSlug(slug);

  if (!safeSlug) {
    return null;
  }

  let query = db.collection('devices').where('slug', '==', safeSlug);

  if (categoryKey) {
    query = query.where('categoryKey', '==', categoryKey);
  }

  if (brandKey) {
    query = query.where('brandKey', '==', brandKey);
  }

  const snap = await query.limit(1).get();

  if (snap.empty) {
    return null;
  }

  return normalizeDevice(snap.docs[0]);
}

export async function getServicesByCategory(categoryKey) {
  if (!categoryKey) {
    return [];
  }

  const snap = await db
    .collection('services')
    .where('categoryId', '==', categoryKey)
    .get();

  return snap.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    .filter((service) => service?.isActive !== false);
}

export async function getServicePricingByModel(modelId) {
  const safeModelId = normalizeString(modelId);

  if (!safeModelId) {
    return [];
  }

  const snap = await db
    .collection('servicePricing')
    .where('modelId', '==', safeModelId)
    .get();

  return snap.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    .filter((row) => row?.isActive !== false);
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

export async function buildPriceListItems(
  modelId,
  {
    categoryKey,
    model = null,
    locale = 'lv',
    currency = DEFAULT_CURRENCY,
  } = {}
) {
  if (!modelId || !categoryKey) {
    return {
      items: [],
      currency,
    };
  }

  const [services, pricingRows] = await Promise.all([
    getServicesByCategory(categoryKey),
    getServicePricingByModel(modelId),
  ]);

  const pricingByServiceId = buildPricingMap(pricingRows);

  const items = services
    .filter((service) => isServiceApplicable(service, model))
    .map((service) => {
      const pricing = pricingByServiceId.get(service.id) || null;
      return buildPriceListItem(service, pricing, locale);
    })
    .filter(Boolean);

  return {
    items: sortPriceListItems(items),
    currency,
  };
}

export function buildServiceOffersFromPriceItems({
  priceItems = [],
  currency = DEFAULT_CURRENCY,
  modelPath,
  deviceName,
} = {}) {
  if (!Array.isArray(priceItems) || priceItems.length === 0 || !modelPath) {
    return [];
  }

  return priceItems.map((item) => {
    const numericPrice =
      typeof item.price === 'number' && Number.isFinite(item.price)
        ? item.price
        : undefined;

    return {
      '@type': 'Offer',
      name: item.title,
      ...(numericPrice !== undefined
        ? {
            price: numericPrice,
            priceCurrency: currency,
          }
        : {}),
      url: `${modelPath}#cenas`,
      itemOffered: {
        '@type': 'Service',
        name: deviceName ? `${deviceName} - ${item.title}` : item.title,
        serviceType: item.title,
      },
      availability: 'https://schema.org/InStock',
    };
  });
}
