// Shared strict identity contract. Never coerce an unknown scope or locale.
export function getFaqDocumentId({ scopeType, scopeKey, locale } = {}) {
  if (locale !== 'lv' && locale !== 'ru') throw new Error('Unsupported FAQ locale');
  if (!['basic', 'category', 'service', 'page'].includes(scopeType)) {
    throw new Error('Unsupported FAQ scope');
  }
  if (scopeType === 'basic') {
    if (scopeKey !== null && scopeKey !== undefined && scopeKey !== '') {
      throw new Error('Basic FAQ cannot have a scope key');
    }
    return `basic_${locale}`;
  }
  if (typeof scopeKey !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(scopeKey)) {
    throw new Error('Invalid FAQ scope key');
  }
  if (scopeType === 'page' && scopeKey === 'contacts') return `contact_${locale}`;
  return `${scopeType}_${scopeKey}_${locale}`;
}

export function validateFaqIdentity(group) {
  const expected = getFaqDocumentId(group);
  if (group?.id !== expected) throw new Error('FAQ document ID does not match scope, key and locale');
  return expected;
}
