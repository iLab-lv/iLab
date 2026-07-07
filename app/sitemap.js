// app/sitemap.js

import { db } from '@/lib/firebaseAdmin';

import {
  localizedHomePath,
  localizedInfoPath,
  localizedCategoryPath,
  localizedServicePath,
} from '@/lib/routes/localizedPath';

import {
  INFO_PAGE_KEYS,
  CATEGORY_PAGE_KEYS,
  getSeoServicePageKeys,
  SITE_LAST_MODIFIED,
} from '@/lib/routes/sitemapRouteKeys';

import { SITE_URL } from './data/site.config.js';

const ORIGIN = SITE_URL.replace(/\/+$/, '');

const LOCALES = ['lv', 'ru'];

const PHONE_CATEGORY_KEY = 'telefonu-remonts';
const IPHONE_CATEGORY_KEY = 'iphone-remonts';
const APPLE_BRAND_KEY = 'apple';

function toAbsoluteUrl(path) {
  return `${ORIGIN}${path}`;
}

function normalizeKey(value = '') {
  return String(value || '').trim().toLowerCase();
}

function uniqByUrl(entries) {
  const seen = new Set();

  return entries.filter((entry) => {
    if (!entry?.url) return false;
    if (seen.has(entry.url)) return false;

    seen.add(entry.url);
    return true;
  });
}

function timestampToIso(value) {
  if (!value) return SITE_LAST_MODIFIED;

  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString();
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value?.value === 'string') {
    return value.value;
  }

  return SITE_LAST_MODIFIED;
}

function createAlternates(lvPath, ruPath) {
  return {
    languages: {
      lv: toAbsoluteUrl(lvPath),
      ru: toAbsoluteUrl(ruPath),
      'x-default': toAbsoluteUrl(lvPath),
    },
  };
}

function createEntry({
  path,
  lvPath,
  ruPath,
  lastModified = SITE_LAST_MODIFIED,
  changeFrequency = 'weekly',
  priority = 0.5,
}) {
  return {
    url: toAbsoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    alternates: createAlternates(lvPath, ruPath),
  };
}

function createPairedEntries({
  lvPath,
  ruPath,
  lastModified = SITE_LAST_MODIFIED,
  changeFrequency = 'weekly',
  priority = 0.5,
}) {
  return [
    createEntry({
      path: lvPath,
      lvPath,
      ruPath,
      lastModified,
      changeFrequency,
      priority,
    }),
    createEntry({
      path: ruPath,
      lvPath,
      ruPath,
      lastModified,
      changeFrequency,
      priority,
    }),
  ];
}

function buildHomeEntries() {
  return createPairedEntries({
    lvPath: localizedHomePath('lv'),
    ruPath: localizedHomePath('ru'),
    priority: 0.8,
  });
}

function buildInfoEntries() {
  return INFO_PAGE_KEYS.flatMap((key) =>
    createPairedEntries({
      lvPath: localizedInfoPath(key, 'lv'),
      ruPath: localizedInfoPath(key, 'ru'),
      priority: key === 'kontakti' || key === 'booking' || key === 'cenas' ? 0.7 : 0.5,
    })
  );
}

function buildCategoryEntries() {
  return CATEGORY_PAGE_KEYS.flatMap((categoryKey) =>
    createPairedEntries({
      lvPath: localizedCategoryPath(categoryKey, 'lv'),
      ruPath: localizedCategoryPath(categoryKey, 'ru'),
      priority: 0.7,
    })
  );
}

function buildSeoServiceEntries() {
  return getSeoServicePageKeys().flatMap(({ categoryKey, serviceKey }) =>
    createPairedEntries({
      lvPath: localizedServicePath(categoryKey, serviceKey, 'lv'),
      ruPath: localizedServicePath(categoryKey, serviceKey, 'ru'),
      priority: 0.6,
    })
  );
}

function getBrandKey(brand) {
  return normalizeKey(brand?.key || brand?.slug || brand?.brandKey);
}

function getBrandCategoryKey(category) {
  return normalizeKey(category?.slug || category?.id);
}

function getDedicatedCategoryKeyFromPath(path) {
  const firstSegment = String(path || '').split('/').filter(Boolean)[0];
  return normalizeKey(firstSegment);
}

function buildBrandPathPair(category, brand) {
  const brandKey = getBrandKey(brand);
  const categoryKey = getBrandCategoryKey(category);

  if (!brandKey || !categoryKey) return null;

  const route = brand?.route || {};

  if (route.preferDedicatedHub && route.dedicatedHubPath) {
    const dedicatedCategoryKey = getDedicatedCategoryKeyFromPath(
      route.dedicatedHubPath
    );

    if (!dedicatedCategoryKey) return null;

    return {
      lvPath: localizedCategoryPath(dedicatedCategoryKey, 'lv'),
      ruPath: localizedCategoryPath(dedicatedCategoryKey, 'ru'),
    };
  }

  return {
    lvPath: `${localizedCategoryPath(categoryKey, 'lv')}/${brandKey}`,
    ruPath: `${localizedCategoryPath(categoryKey, 'ru')}/${brandKey}`,
  };
}

function buildBrandEntries(categories) {
  const entries = [];

  for (const category of categories) {
    const brands = Array.isArray(category?.brands) ? category.brands : [];
    const lastModified = timestampToIso(category?.updatedAt);

    for (const brand of brands) {
      const pair = buildBrandPathPair(category, brand);
      if (!pair) continue;

      entries.push(
        ...createPairedEntries({
          ...pair,
          priority: 0.6,
          lastModified,
        })
      );
    }
  }

  return entries;
}

function buildDevicePathPair(device) {
  const categoryKey = normalizeKey(device?.categoryKey);
  const brandKey = normalizeKey(device?.brandKey);
  const slug = normalizeKey(device?.slug);

  if (!categoryKey || !brandKey || !slug) return null;

  const isIphone =
    categoryKey === PHONE_CATEGORY_KEY && brandKey === APPLE_BRAND_KEY;

  if (isIphone) {
    return {
      lvPath: `${localizedCategoryPath(IPHONE_CATEGORY_KEY, 'lv')}/${slug}`,
      ruPath: `${localizedCategoryPath(IPHONE_CATEGORY_KEY, 'ru')}/${slug}`,
    };
  }

  return {
    lvPath: `${localizedCategoryPath(categoryKey, 'lv')}/${brandKey}/${slug}`,
    ruPath: `${localizedCategoryPath(categoryKey, 'ru')}/${brandKey}/${slug}`,
  };
}

function buildDeviceEntries(devices) {
  const entries = [];

  for (const device of devices) {
    const pair = buildDevicePathPair(device);
    if (!pair) continue;

    entries.push(
      ...createPairedEntries({
        ...pair,
        priority: 0.5,
        lastModified: timestampToIso(device?.updatedAt),
      })
    );
  }

  return entries;
}

async function getCategories() {
  const snap = await db.collection('categories').get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

async function getDevices() {
  const snap = await db.collection('devices').get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default async function sitemap() {
  const [categories, devices] = await Promise.all([
    getCategories(),
    getDevices(),
  ]);

  const entries = [
    ...buildHomeEntries(),
    ...buildInfoEntries(),
    ...buildCategoryEntries(),
    ...buildSeoServiceEntries(),
    ...buildBrandEntries(categories),
    ...buildDeviceEntries(devices),
  ];

  return uniqByUrl(entries);
}
