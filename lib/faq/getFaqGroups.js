import { unstable_cache } from 'next/cache';

import { db } from '@/lib/firebaseAdmin';
import { getFaqDocumentId } from './faqIdentity';
import { normalizeFaqItems as prepareItems, dedupeFaqGroups } from './faqModel';
import migration from './faqMigration.manifest.json';
import { FAQ_DIRECTORY_SOURCES } from './faqPolicy';

import {
  getBasicFaq,
  getCategoryFaq,
  getServiceFaq,
} from '@sections/faq/faq.i18n';

import { getDefaultFaqTitle } from '@sections/faq/faq.helpers';

const COLLECTION = 'faqGroups';

const HOME_LABELS = {
  lv: 'Sākums',
  ru: 'Главная',
};

const ALLOWED_SCOPE_TYPES = new Set(['basic', 'category', 'service', 'page']);

export function getHomeBreadcrumbLabel(locale = 'lv') {
  return HOME_LABELS[locale] || HOME_LABELS.lv;
}

function getFallbackTitle(locale = 'lv') {
  return getDefaultFaqTitle(locale);
}

function normalizeLocale(locale = 'lv') {
  return locale === 'ru' ? 'ru' : 'lv';
}

function normalizeFaqSource(source) {
  if (!source) {
    return null;
  }

  if (typeof source === 'string') {
    if (source === 'basic') {
      return {
        scopeType: 'basic',
        scopeKey: null,
      };
    }

    return {
      scopeType: 'category',
      scopeKey: source,
    };
  }

  const scopeType = source.scopeType || source.type || 'category';
  const rawScopeKey = source.scopeKey ?? source.key ?? null;

  if (!ALLOWED_SCOPE_TYPES.has(scopeType)) {
    return null;
  }

  if (scopeType === 'basic') {
    return {
      scopeType: 'basic',
      scopeKey: null,
    };
  }

  const scopeKey = String(rawScopeKey || '').trim();

  if (!scopeKey) {
    return null;
  }

  return {
    scopeType,
    scopeKey,
    fallback: source.fallback,
  };
}

function buildFaqDocId(source, locale = 'lv') {
  return getFaqDocumentId({ ...source, locale: normalizeLocale(locale) });
}

function normalizeFaqItem(item = {}) {
  const q =
    typeof item.q === 'string'
      ? item.q.trim()
      : typeof item.question === 'string'
        ? item.question.trim()
        : typeof item.title === 'string'
          ? item.title.trim()
          : '';

  const aHtml =
    typeof item.aHtml === 'string'
      ? item.aHtml.trim()
      : typeof item.answerHtml === 'string'
        ? item.answerHtml.trim()
        : '';

  const a =
    typeof item.a === 'string'
      ? item.a.trim()
      : typeof item.answer === 'string'
        ? item.answer.trim()
        : '';

  if (!q) return null;
  if (!aHtml && !a) return null;
  if (item.isHidden === true) return null;

  return {
    q,
    aHtml,
    a,
    order:
      typeof item.order === 'number' && Number.isFinite(item.order)
        ? item.order
        : 9999,
  };
}

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;

    if (ao !== bo) return ao - bo;

    return String(a?.q || '').localeCompare(String(b?.q || ''));
  });
}

function normalizeFaqItems(rawItems = []) {
  return prepareItems(sortFaqItems(rawItems.map(normalizeFaqItem).filter(Boolean)));
}

function normalizeFirebaseFaqGroup(docId, source, data = {}, locale = 'lv') {
  return {
    id: docId,
    docId,
    scopeType: data.scopeType || source.scopeType,
    scopeKey:
      typeof data.scopeKey === 'string'
        ? data.scopeKey
        : source.scopeKey || '',
    locale: normalizeLocale(data.locale || locale),
    title:
      typeof data.title === 'string' && data.title.trim()
        ? data.title.trim()
        : getFallbackTitle(locale),
    isPublished: data.isPublished !== false,
    order:
      typeof data.order === 'number' && Number.isFinite(data.order)
        ? data.order
        : 10,
    items: normalizeFaqItems(Array.isArray(data.items) ? data.items : []),
  };
}

async function getFirebaseFaqGroup(source, locale = 'lv') {
  const docId = buildFaqDocId(source, locale);
  try {
    const snap = await db.collection(COLLECTION).doc(docId).get();
    if (!snap.exists) return { state: 'missing' };
    const data = snap.data() || {};
    if (data.locale && data.locale !== normalizeLocale(locale)) return { state: 'error' };
    if (data.isPublished === false) return { state: 'unpublished' };
    const group = normalizeFirebaseFaqGroup(docId, source, data, locale);
    return { state: group.items.length ? 'published' : 'empty', group };
  } catch {
    // Supplementary FAQ content must not fail an otherwise valid public page.
    return { state: 'error' };
  }
}

function getFallbackFaqGroup(source, locale = 'lv') {
  const transitional = migration.documents.find(doc => doc.id === buildFaqDocId(source, locale));
  if (transitional) return transitional.data;
  if (source.scopeType === 'basic' || source.fallback === 'basic') return getBasicFaq(locale);
  const categories = ['iphone-remonts', 'telefonu-remonts', 'plansetdatoru-remonts', 'datoru-remonts', 'dyson-remonts'];
  const services = ['ekrana-maina', 'baterijas-maina', 'uzlades-ligzdas-maina', 'kameras-remonts', 'skalruni-mikrofona-remonts', 'udens-bojajumu-remonts'];
  if (source.scopeType === 'category' && categories.includes(source.scopeKey)) return getCategoryFaq(source.scopeKey, locale);
  if (source.scopeType === 'service' && services.includes(source.scopeKey)) return getServiceFaq(source.scopeKey, locale);
  return { title: getFallbackTitle(locale), items: [] };
}

async function getFaqGroup(sourceInput, locale = 'lv') {
  const source = normalizeFaqSource(sourceInput);

  if (!source) {
    return {
      title: getFallbackTitle(locale),
      items: [],
    };
  }

  const firebaseGroup = await getFirebaseFaqGroup(source, locale);

  if (firebaseGroup.group) {
    return { ...firebaseGroup.group, state: firebaseGroup.state };
  }

  const fallbackGroup = getFallbackFaqGroup(source, locale);
  const docId = buildFaqDocId(source, locale);

  return {
    id: docId,
    docId,
    scopeType: source.scopeType,
    scopeKey: source.scopeKey || '',
    locale: normalizeLocale(locale),
    title: fallbackGroup?.title || getFallbackTitle(locale),
    isPublished: true,
    order: 10,
    items: normalizeFaqItems(fallbackGroup?.items || []),
    state: firebaseGroup.state,
    contentSource: 'transition-fallback',
  };
}

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = String(item.q || '').trim().toLowerCase();

    if (!key) return false;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

async function getFaqGroupsUncached(sources = [], locale = 'lv', { publishedOnly = false } = {}) {
  const normalizedSources = sources.map(normalizeFaqSource).filter(Boolean);

  if (normalizedSources.length === 0) {
    return {
      title: getFallbackTitle(locale),
      groups: [],
      items: [],
    };
  }

  const groups = await Promise.all(
    normalizedSources.map((source) => getFaqGroup(source, locale))
  );

  const sortedGroups = dedupeFaqGroups(groups.filter(group => !publishedOnly || group.state === 'published').sort((a, b) => {
    if ((a.order ?? 10) !== (b.order ?? 10)) {
      return (a.order ?? 10) - (b.order ?? 10);
    }

    return String(a.docId || '').localeCompare(String(b.docId || ''));
  }));

  const items = dedupeFaqItems(
    sortedGroups.flatMap((group) => group.items || [])
  );

  const firstGroupWithItems = sortedGroups.find(
    (group) => group.items?.length > 0
  );

  const firstGroupWithTitle = sortedGroups.find((group) => group.title);

  return {
    title:
      firstGroupWithItems?.title ||
      firstGroupWithTitle?.title ||
      getFallbackTitle(locale),
    groups: sortedGroups,
    items,
  };
}

export const getFaqGroups = unstable_cache(
  getFaqGroupsUncached,
  ['faq-groups'],
  { revalidate: 3600 }
);

// The directory includes only approved records actually available in Firebase.
export async function getFaqDirectory(locale = 'lv') {
  const faq = await getFaqGroups(FAQ_DIRECTORY_SOURCES, locale, { publishedOnly: true });
  return faq.groups.filter(group => group.state === 'published' && group.items.length);
}
