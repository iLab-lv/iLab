// lib/content/devices.js
import 'server-only';

import { unstable_cache } from 'next/cache';

import { db } from '@/lib/firebaseAdmin';

function normalizeDevice(device = {}, docId = null) {
  return {
    slug: device.slug || docId || null,
    type: device.type || 'device',

    categoryKey: device.categoryKey || null,
    brandKey: device.brandKey || null,
    seriesKey: device.seriesKey || null,

    name: device.name || '',
    year: Number.isFinite(Number(device.year)) ? Number(device.year) : null,
    image: device.image || '',
    order: Number.isFinite(Number(device.order)) ? Number(device.order) : 9999,

    h1: device.h1 || '',
    metaTitle: device.metaTitle || '',
    metaDescription: device.metaDescription || '',
    bodyHtml: device.bodyHtml || '',
  };
}

function sortDevices(list) {
  return list.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;

    return String(a.name).localeCompare(String(b.name), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
}

async function getDevicesUncached() {
  const snap = await db.collection('devices').get();

  return sortDevices(
    snap.docs.map((doc) => normalizeDevice(doc.data(), doc.id))
  );
}

async function getDeviceBySlugUncached(slug) {
  if (!slug) return null;

  const doc = await db.collection('devices').doc(slug).get();

  if (!doc.exists) return null;

  return normalizeDevice(doc.data(), doc.id);
}

async function getDevicesByCategoryUncached(categoryKey) {
  if (!categoryKey) return [];

  const snap = await db
    .collection('devices')
    .where('categoryKey', '==', categoryKey)
    .get();

  return sortDevices(
    snap.docs.map((doc) => normalizeDevice(doc.data(), doc.id))
  );
}

async function getDevicesByCategoryAndBrandUncached(categoryKey, brandKey) {
  if (!categoryKey || !brandKey) return [];

  const snap = await db
    .collection('devices')
    .where('categoryKey', '==', categoryKey)
    .where('brandKey', '==', brandKey)
    .get();

  return sortDevices(
    snap.docs.map((doc) => normalizeDevice(doc.data(), doc.id))
  );
}

export const getDevices = unstable_cache(getDevicesUncached, ['devices:all'], {
  revalidate: 3600,
});

export const getDeviceBySlug = unstable_cache(
  getDeviceBySlugUncached,
  ['devices:by-slug'],
  { revalidate: 3600 }
);

export const getDevicesByCategory = unstable_cache(
  getDevicesByCategoryUncached,
  ['devices:by-category'],
  { revalidate: 3600 }
);

export const getDevicesByCategoryAndBrand = unstable_cache(
  getDevicesByCategoryAndBrandUncached,
  ['devices:by-category-brand'],
  { revalidate: 3600 }
);
