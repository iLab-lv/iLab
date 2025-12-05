// app/lib/seo/jsonldHelpers.js

import { COMPANY, LOCATIONS } from '@/data/site.config';

/**
 * Base site origin derived from COMPANY.url
 * Trailing slash is removed for consistency.
 */
export const ORIGIN =
  (COMPANY?.url || 'https://www.ilab.lv').replace(/\/+$/, '');

/**
 * Build absolute URL from a path.
 * - abs('/')           -> 'https://www.ilab.lv/'
 * - abs('/iphone')     -> 'https://www.ilab.lv/iphone'
 * - abs('iphone')      -> 'https://www.ilab.lv/iphone'
 */
export function abs(path = '/') {
  if (!path) return `${ORIGIN}/`;
  if (!path.startsWith('/')) path = `/${path}`;
  if (path === '/') return `${ORIGIN}/`;
  return `${ORIGIN}${path}`;
}

/**
 * Build a provider field referencing LocalBusiness entities.
 * - If locationIds provided -> those IDs
 * - Else -> all locations from site.config (domina, spice, ...)
 *
 * Returns:
 *   - single object { "@id": "..." } when there is exactly one
 *   - array of objects when there are multiple
 */
export function buildProvidersFromLocations(locationIds) {
  let ids = locationIds && locationIds.length ? locationIds : LOCATIONS.map((loc) => loc.id);

  // De-duplicate and filter falsy
  ids = Array.from(new Set(ids.filter(Boolean)));

  if (ids.length === 0) {
    // Fallback to organization if no locations available
    return { '@id': `${ORIGIN}#organization` };
  }

  if (ids.length === 1) {
    return { '@id': `${ORIGIN}#${ids[0]}` };
  }

  return ids.map((id) => ({ '@id': `${ORIGIN}#${id}` }));
}

/**
 * Build BreadcrumbList JSON-LD.
 *
 * items = [
 *   { name: 'Sākums', url: abs('/') },
 *   { name: 'iPhone remonts Rīgā', url: abs('/iphone-remonts') },
 * ]
 */
export function buildBreadcrumbsLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: (items || []).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Build a generic Service JSON-LD for city-level repair pages
 * (e.g. /iphone-remonts, /telefonu-remonts).
 *
 * options = {
 *   path: '/iphone-remonts',
 *   name: 'iPhone remonts Rīgā',
 *   description: '...',
 *   serviceType: 'iPhone remonts Rīgā', // optional; falls back to name
 *   city: 'Rīga',                       // optional; default Rīga
 *   locationIds: ['domina', 'spice'],   // optional; default all LOCATIONS
 * }
 */
export function buildServiceLdForCity(options = {}) {
  const {
    path,
    name,
    description,
    serviceType,
    city = 'Rīga',
    locationIds,
  } = options;

  if (!path || !name) {
    throw new Error('buildServiceLdForCity: "path" and "name" are required');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}${path}#service`,
    serviceType: serviceType || name,
    areaServed: { '@type': 'City', name: city },
    provider: buildProvidersFromLocations(locationIds),
    url: `${ORIGIN}${path}`,
    name,
    description,
  };
}

/**
 * Build an ItemList JSON-LD.
 *
 * items = [
 *   { name: 'Samsung telefonu remonts', url: abs('/telefonu-remonts/samsung') },
 *   { name: 'Huawei telefonu remonts',  url: abs('/telefonu-remonts/huawei') },
 * ]
 */
export function buildItemListLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: (items || []).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      name: item.name,
    })),
  };
}

/**
 * Build a standard 5-step HowTo for repair processes.
 *
 * topicName example:
 *   'iPhone remonts'  -> "Kā notiek iPhone remonts"
 *   'telefonu remonts' -> "Kā notiek telefonu remonts"
 */
export function buildStandardRepairHowToLd(topicName) {
  const baseName = topicName || 'remonts';

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Kā notiek ${baseName}`,
    description:
      `Kā iLab servisā Rīgā notiek ${baseName}: diagnostika, cena, remonts, pārbaude un garantija.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Diagnostika',
        text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Cena un termiņš',
        text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Remonts',
        text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Pārbaude',
        text: 'Pēc remonta testējam visu funkcionalitāti un drošību.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Garantija',
        text: '90 dienu garantija un ieteikumi turpmākai lietošanai.',
      },
    ],
  };
}

/**
 * Build a FAQPage JSON-LD from a simple Q/A list.
 *
 * qa = [
 *   { q: 'Cik ilgi ilgst telefona displeja maiņa?', a: 'Bieži 1–3 stundas...' },
 *   { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
 * ]
 */
export function buildFaqLdFromPairs(qa) {
  const items = qa || [];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
