const SITE_URL = 'https://www.ilab.lv';

const DEFAULT_LOCATION_IDS = ['domina', 'spice'];

function stripTrailingSlash(value = '') {
  return String(value).replace(/\/+$/, '');
}

export const ORIGIN = stripTrailingSlash(SITE_URL);

export function absoluteUrl(path = '/') {
  if (!path) {
    return `${ORIGIN}/`;
  }

  const value = String(path);

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (value === '/') {
    return `${ORIGIN}/`;
  }

  return value.startsWith('/') ? `${ORIGIN}${value}` : `${ORIGIN}/${value}`;
}

export function cleanObject(obj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null || value === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
}

export function cleanSchemaText(value = '') {
  if (!value) {
    return '';
  }

  return String(value)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<\/li>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&rsquo;/gi, '’')
    .replace(/&lsquo;/gi, '‘')
    .replace(/&rdquo;/gi, '”')
    .replace(/&ldquo;/gi, '“')
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&euro;/gi, '€')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeLocationIds(locationIds) {
  const ids =
    Array.isArray(locationIds) && locationIds.length > 0
      ? locationIds
      : DEFAULT_LOCATION_IDS;

  return Array.from(new Set(ids.filter(Boolean)));
}

export function buildProviderReferences(locationIds) {
  const ids = normalizeLocationIds(locationIds);

  if (ids.length === 0) {
    return { '@id': `${ORIGIN}#organization` };
  }

  if (ids.length === 1) {
    return { '@id': `${ORIGIN}#${ids[0]}` };
  }

  return ids.map((id) => ({ '@id': `${ORIGIN}#${id}` }));
}

export function buildJsonLdGraph(items = []) {
  const graph = items.flat().filter(Boolean);

  if (graph.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildWebPageLd({
  path = '/',
  name,
  description,
  locale = 'lv',
  breadcrumbId,
  primaryEntityId,
} = {}) {
  if (!name) {
    return null;
  }

  const url = absoluteUrl(path);
  const id = `${url}#webpage`;

  return cleanObject({
    '@type': 'WebPage',
    '@id': id,
    url,
    name,
    description: cleanSchemaText(description),
    inLanguage: locale,
    isPartOf: {
      '@id': `${ORIGIN}#website`,
    },
    publisher: {
      '@id': `${ORIGIN}#organization`,
    },
    breadcrumb: breadcrumbId ? { '@id': breadcrumbId } : undefined,
    primaryEntity: primaryEntityId ? { '@id': primaryEntityId } : undefined,
  });
}

export function buildBreadcrumbsLd(items = [], { id } = {}) {
  const normalizedItems = items
    .filter((item) => item?.name && item?.url)
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: cleanSchemaText(item.name),
      item: absoluteUrl(item.url),
    }));

  if (normalizedItems.length === 0) {
    return null;
  }

  return cleanObject({
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: normalizedItems,
  });
}

export function buildServiceLd({
  path,
  name,
  description,
  serviceType,
  areaServed = 'Rīga',
  locationIds,
  image,
  offers,
} = {}) {
  if (!path || !name) {
    return null;
  }

  const url = absoluteUrl(path);
  const id = `${url}#service`;

  return cleanObject({
    '@type': 'Service',
    '@id': id,
    url,
    name: cleanSchemaText(name),
    description: cleanSchemaText(description),
    serviceType: cleanSchemaText(serviceType || name),
    provider: buildProviderReferences(locationIds),
    areaServed: {
      '@type': 'City',
      name: areaServed,
    },
    image: image ? absoluteUrl(image) : undefined,
    offers,
  });
}

export function buildFaqLd(faqItems = [], { id } = {}) {
  const seenQuestions = new Set();

  const mainEntity = faqItems
    .map((item) => {
      const question =
        item.question ||
        item.q ||
        item.title ||
        item.name ||
        '';

      const answer =
        item.answer ||
        item.a ||
        item.aHtml ||
        item.text ||
        item.body ||
        item.content ||
        '';

      const cleanQuestion = cleanSchemaText(question);
      const cleanAnswer = cleanSchemaText(answer);

      if (!cleanQuestion || !cleanAnswer) {
        return null;
      }

      const questionKey = cleanQuestion.toLowerCase();

      if (seenQuestions.has(questionKey)) {
        return null;
      }

      seenQuestions.add(questionKey);

      return {
        '@type': 'Question',
        name: cleanQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: cleanAnswer,
        },
      };
    })
    .filter(Boolean);

  if (mainEntity.length === 0) {
    return null;
  }

  return cleanObject({
    '@type': 'FAQPage',
    '@id': id,
    mainEntity,
  });
}

export function buildItemListLd(items = [], { id } = {}) {
  const itemListElement = items
    .filter((item) => item?.name && item?.url)
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: cleanSchemaText(item.name),
      url: absoluteUrl(item.url),
    }));

  if (itemListElement.length === 0) {
    return null;
  }

  return cleanObject({
    '@type': 'ItemList',
    '@id': id,
    itemListElement,
  });
}