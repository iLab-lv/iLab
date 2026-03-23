import React from 'react';

export function faqItem(q, a) {
  return { q, a };
}

export function makeFaq(title, items) {
  return { title, items };
}

export function getDefaultFaqTitle(locale = 'lv') {
  return locale === 'ru'
    ? 'Часто задаваемые вопросы'
    : 'Biežāk uzdotie jautājumi';
}

export function normalizeText(text = '') {
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .replace(/\s([.,!?;:])/g, '$1')
    .trim();
}

export function nodeToText(node) {
  if (node == null || typeof node === 'boolean') return '';

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return normalizeText(node.map(nodeToText).join(' '));
  }

  if (React.isValidElement(node)) {
    return nodeToText(node.props.children);
  }

  return '';
}

export function htmlToPlainText(html = '') {
  return normalizeText(html);
}

export function mergeFaqGroups(...groups) {
  const validGroups = groups.filter(Boolean);

  if (validGroups.length === 0) {
    return {
      title: getDefaultFaqTitle('lv'),
      items: [],
    };
  }

  const [firstGroup] = validGroups;

  return {
    title: firstGroup.title || getDefaultFaqTitle('lv'),
    items: validGroups.flatMap((group) => group.items || []),
  };
}

export function toFaqRenderItems(items = []) {
  return items.map(({ q, a, aHtml }) => ({
    q,
    a:
      typeof aHtml === 'string' && aHtml.trim()
        ? aHtml
        : a,
  }));
}

export function toFaqLd(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a, aHtml }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          typeof aHtml === 'string' && aHtml.trim()
            ? htmlToPlainText(aHtml)
            : nodeToText(a),
      },
    })),
  };
}