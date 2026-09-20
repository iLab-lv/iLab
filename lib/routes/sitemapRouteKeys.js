// lib/routes/sitemapRouteKeys.js

import fs from 'fs';
import path from 'path';

import { ROUTE_TRANSLATIONS } from './routeTranslations.js';

export const SITE_LAST_MODIFIED = '2026-05-22T00:00:00.000Z';

export const INFO_PAGE_KEYS = [
  'par-mums',
  'kontakti',
  'cenas',
  'buj',
  'noteikumi',
  'booking',
];

export const CATEGORY_PAGE_KEYS = [
  'iphone-remonts',
  'telefonu-remonts',
  'plansetdatoru-remonts',
  'datoru-remonts',
  'dyson-remonts',
  'fotoaparatu-remonts',
];

const FALLBACK_SERVICE_PAGE_KEYS = [
  // iPhone SEO service pages
  {
    categoryKey: 'iphone-remonts',
    serviceKey: 'ekrana-maina',
  },
  {
    categoryKey: 'iphone-remonts',
    serviceKey: 'baterijas-maina',
  },
  {
    categoryKey: 'iphone-remonts',
    serviceKey: 'uzlades-ligzdas-maina',
  },
  {
    categoryKey: 'iphone-remonts',
    serviceKey: 'kameras-remonts',
  },
  {
    categoryKey: 'iphone-remonts',
    serviceKey: 'skalruni-mikrofona-remonts',
  },
  {
    categoryKey: 'iphone-remonts',
    serviceKey: 'udens-bojajumu-remonts',
  },
  {
    categoryKey: 'iphone-remonts',
    serviceKey: 'aizmugures-vacina-maina',
  },
  {
    categoryKey: 'iphone-remonts',
    serviceKey: 'iphone-plates-remonts',
  },

  // Generic phone SEO service pages
  {
    categoryKey: 'telefonu-remonts',
    serviceKey: 'ekrana-maina',
  },
  {
    categoryKey: 'telefonu-remonts',
    serviceKey: 'baterijas-maina',
  },
  {
    categoryKey: 'telefonu-remonts',
    serviceKey: 'uzlades-ligzdas-maina',
  },
  {
    categoryKey: 'telefonu-remonts',
    serviceKey: 'kameras-remonts',
  },
  {
    categoryKey: 'telefonu-remonts',
    serviceKey: 'skalruni-mikrofona-remonts',
  },
  {
    categoryKey: 'telefonu-remonts',
    serviceKey: 'udens-bojajumu-remonts',
  },
];

const CATALOG_ROOT = path.join(process.cwd(), 'app', '(site)', '(catalog)');

function hasPageFile(directory) {
  return (
    fs.existsSync(path.join(directory, 'page.jsx')) ||
    fs.existsSync(path.join(directory, 'page.js')) ||
    fs.existsSync(path.join(directory, 'page.tsx')) ||
    fs.existsSync(path.join(directory, 'page.ts'))
  );
}

function toServiceRoutePair(categoryKey, serviceKey) {
  const categoryExists = Boolean(ROUTE_TRANSLATIONS.categories?.[categoryKey]);
  const serviceExists = Boolean(ROUTE_TRANSLATIONS.services?.[serviceKey]);

  if (!categoryExists || !serviceExists) {
    return null;
  }

  return { categoryKey, serviceKey };
}

function discoverServicePageKeys() {
  if (!fs.existsSync(CATALOG_ROOT)) {
    return [];
  }

  const entries = [];
  const categoryDirectories = fs.readdirSync(CATALOG_ROOT, {
    withFileTypes: true,
  });

  for (const categoryDirectory of categoryDirectories) {
    if (!categoryDirectory.isDirectory()) continue;

    const categoryKey = categoryDirectory.name;
    const servicesDirectory = path.join(CATALOG_ROOT, categoryKey, '(services)');

    if (!fs.existsSync(servicesDirectory)) continue;

    const serviceDirectories = fs.readdirSync(servicesDirectory, {
      withFileTypes: true,
    });

    for (const serviceDirectory of serviceDirectories) {
      if (!serviceDirectory.isDirectory()) continue;

      const servicePath = path.join(servicesDirectory, serviceDirectory.name);
      if (!hasPageFile(servicePath)) continue;

      const pair = toServiceRoutePair(categoryKey, serviceDirectory.name);
      if (pair) {
        entries.push(pair);
      }
    }
  }

  return entries;
}

export function getSeoServicePageKeys() {
  const discovered = discoverServicePageKeys();

  return discovered.length > 0 ? discovered : FALLBACK_SERVICE_PAGE_KEYS;
}
