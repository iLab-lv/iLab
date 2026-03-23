import { db } from '@/lib/firebaseAdmin';
import { getBasicFaq, getCategoryFaq, getServiceFaq } from './faq.i18n';
import { getDefaultFaqTitle } from './faq.helpers';

const COLLECTION = 'faqGroups';

function normalizeFirebaseFaqItem(item = {}) {
  return {
    q: typeof item.q === 'string' ? item.q.trim() : '',
    aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
  };
}

function normalizeFirebaseFaqGroup(docData = {}, locale = 'lv') {
  const title =
    typeof docData.title === 'string' && docData.title.trim()
      ? docData.title.trim()
      : getDefaultFaqTitle(locale);

  const items = Array.isArray(docData.items)
    ? docData.items.map(normalizeFirebaseFaqItem).filter((item) => item.q && item.aHtml)
    : [];

  return { title, items };
}

async function getFaqGroupDoc(scopeType, scopeKey, locale = 'lv') {
  const docId =
    scopeType === 'basic'
      ? `basic_${locale}`
      : `${scopeType}_${scopeKey}_${locale}`;

  const snap = await db.collection(COLLECTION).doc(docId).get();

  if (!snap.exists) return null;

  const data = snap.data() || {};

  if (data.isPublished === false) return null;

  return normalizeFirebaseFaqGroup(data, locale);
}

export async function getBasicFaqGroup(locale = 'lv') {
  const firebaseGroup = await getFaqGroupDoc('basic', null, locale);
  if (firebaseGroup) return firebaseGroup;

  return getBasicFaq(locale);
}

export async function getCategoryFaqGroup(categoryKey, locale = 'lv') {
  const firebaseGroup = await getFaqGroupDoc('category', categoryKey, locale);
  if (firebaseGroup) return firebaseGroup;

  return getCategoryFaq(categoryKey, locale);
}

export async function getServiceFaqGroup(serviceKey, locale = 'lv') {
  const firebaseGroup = await getFaqGroupDoc('service', serviceKey, locale);
  if (firebaseGroup) return firebaseGroup;

  return getServiceFaq(serviceKey, locale);
}