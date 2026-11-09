// lib/content/catalogDevices.js

import 'server-only';

import { db } from '@/lib/firebaseAdmin';
import { resolveServicePriceItems } from '@/lib/pricing/resolveServicePricing';

const DEFAULT_CURRENCY = 'EUR';

function normalizeString(value = '') {
  return String(value || '').trim();
}

export function normalizeSlug(value = '') {
  return decodeURIComponent(String(value || '')).trim();
}

export { pickLocalizedField } from '@/lib/pricing/resolveServicePricing';

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

  return {
    items: resolveServicePriceItems(services, pricingRows, { model, locale }),
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
