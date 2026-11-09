import { validateFaqIdentity } from './faqIdentity';

export function getFaqAdminRevision(timestamp) {
  return `${timestamp.seconds}:${timestamp.nanoseconds}`;
}

export function getFaqAdminAnswer(item = {}) {
  const html = typeof item.aHtml === 'string' ? item.aHtml : item.answerHtml;
  const plain = typeof item.a === 'string' ? item.a : item.answer;
  return (typeof html === 'string' && html.trim()) ? html : typeof plain === 'string' ? plain : '';
}

export function toFaqAdminGroup(id, data, revision) {
  return {
    scopeType: data.scopeType,
    scopeKey: data.scopeKey,
    locale: data.locale,
    title: data.title,
    isPublished: data.isPublished,
    order: data.order,
    id,
    revision,
    items: Array.isArray(data.items)
      ? data.items.map((item, index) => ({
          q: item.q,
          ...(typeof item.aHtml === 'string' ? { aHtml: item.aHtml } : {}),
          ...(typeof item.a === 'string' ? { a: item.a } : {}),
          ...(typeof item.answerHtml === 'string' ? { answerHtml: item.answerHtml } : {}),
          ...(typeof item.answer === 'string' ? { answer: item.answer } : {}),
          ...(Number.isFinite(item.order) ? { order: item.order } : {}),
          _sourceIndex: index,
        }))
      : [],
  };
}

// Only supported editorial fields can change. All other stored fields survive.
// Source indices refer to the transaction's original array, including on reorder.
export function prepareFaqAdminUpdate(body, existing) {
  validateFaqIdentity(body);
  validateFaqIdentity({ ...existing, id: body.id });
  if (typeof body.title !== 'string' || !Array.isArray(body.items)) {
    throw new Error('FAQ title and items are required');
  }
  const used = new Set();
  const items = body.items.map(item => {
    if (!item || typeof item !== 'object' || typeof item.q !== 'string') {
      throw new Error('Invalid FAQ item');
    }
    const index = item._sourceIndex;
    let original = {};
    if (index !== undefined) {
      if (!Number.isInteger(index) || index < 0 || index >= (existing.items || []).length || used.has(index)) {
        throw new Error('Invalid FAQ item identity');
      }
      used.add(index);
      original = existing.items[index];
    }
    const result = { ...original, q: item.q };
    if (Object.hasOwn(item, 'aHtml')) {
      if (typeof item.aHtml !== 'string') throw new Error('Invalid FAQ HTML answer');
      result.aHtml = item.aHtml;
    }
    if (!['aHtml', 'answerHtml', 'a', 'answer'].some(key => typeof result[key] === 'string')) {
      throw new Error('FAQ answer is required');
    }
    if (index === undefined && !Number.isFinite(item.order)) throw new Error('New FAQ item order is required');
    if (Object.hasOwn(item, 'order')) {
      if (!Number.isFinite(item.order)) throw new Error('Invalid FAQ item order');
      result.order = item.order;
    }
    return result;
  });
  return { title: body.title, items };
}
