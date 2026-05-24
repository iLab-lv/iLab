import { db } from '@/lib/firebaseAdmin';

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

const ALLOWED_SCOPE_TYPES = new Set(['basic', 'category', 'service']);

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
  };
}

function buildFaqDocId(source, locale = 'lv') {
  const safeLocale = normalizeLocale(locale);

  if (source.scopeType === 'basic') {
    return `basic_${safeLocale}`;
  }

  return `${source.scopeType}_${source.scopeKey}_${safeLocale}`;
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
  return sortFaqItems(rawItems.map(normalizeFaqItem).filter(Boolean));
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
  const snap = await db.collection(COLLECTION).doc(docId).get();

  if (!snap.exists) {
    return null;
  }

  const data = snap.data() || {};
  const group = normalizeFirebaseFaqGroup(docId, source, data, locale);

  if (!group.isPublished) {
    return null;
  }

  return group;
}

function getFallbackFaqGroup(source, locale = 'lv') {
  if (source.scopeType === 'basic') {
    return getBasicFaq(locale);
  }

  if (source.scopeType === 'category') {
    return getCategoryFaq(source.scopeKey, locale);
  }

  if (source.scopeType === 'service') {
    return getServiceFaq(source.scopeKey, locale);
  }

  return {
    title: getFallbackTitle(locale),
    items: [],
  };
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

  if (firebaseGroup) {
    return firebaseGroup;
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

export async function getFaqGroups(sources = [], locale = 'lv') {
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

  const sortedGroups = [...groups].sort((a, b) => {
    if ((a.order ?? 10) !== (b.order ?? 10)) {
      return (a.order ?? 10) - (b.order ?? 10);
    }

    return String(a.docId || '').localeCompare(String(b.docId || ''));
  });

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