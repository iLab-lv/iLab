// Shared public presentation rules. Raw editor/migration content is never rewritten here.
const tags = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'a', 'ul', 'ol', 'li', 'span', 'code', 'blockquote']);
const escapeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function sanitizeFaqHtml(value = '') {
  const html = String(value).replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|iframe|object|svg|math)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  return html.split(/(<[^>]*>)/g).map(part => {
    if (!part.startsWith('<') || !part.endsWith('>')) return part.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const match = part.match(/^<\s*(\/?)\s*([a-z0-9]+)\b[\s\S]*>$/i);
    if (!match || !tags.has(match[2].toLowerCase())) return '';
    const tag = match[2].toLowerCase();
    if (match[1]) return tag === 'br' ? '' : `</${tag}>`;
    if (tag !== 'a') return `<${tag}>`;
    const hrefMatch = part.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
    const href = (hrefMatch?.[1] ?? hrefMatch?.[2] ?? hrefMatch?.[3] ?? '').replace(/&amp;/gi, '&');
    // Encoded/control-character schemes and protocol-relative URLs are intentionally excluded.
    const safe = !/[\u0000-\u0020\u007f\\]/.test(href) && !/&(?:#|[a-z]+;)/i.test(href)
      && (/^\/(?!\/)/.test(href) || /^#/.test(href) || /^(https?:\/\/|mailto:|tel:)/i.test(href));
    return safe ? `<a href="${escapeAttribute(href)}">` : '<a>';
  }).join('');
}

export function normalizeFaqItems(items = [], { limit = Infinity } = {}) {
  const seen = new Set();
  return items.filter(Boolean).filter(item => item.isHidden !== true).map(item => {
    const q = String(item.q ?? item.question ?? item.title ?? '').trim();
    const raw = item.aHtml || item.answerHtml || item.a || item.answer || '';
    const a = typeof raw === 'string' ? sanitizeFaqHtml(raw.trim()) : raw;
    return { ...item, q, a, ...(typeof a === 'string' ? { aHtml: a } : {}) };
  }).filter(item => {
    const key = item.q.toLowerCase();
    if (!key || !item.a || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, Math.max(0, limit));
}

export function dedupeFaqGroups(groups = []) {
  const seen = new Set();
  return groups.map(group => ({ ...group, items: normalizeFaqItems(group.items).filter(item => {
    const key = item.q.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }) }));
}
