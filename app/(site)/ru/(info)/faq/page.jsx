import BujPage, {
  getBujPageStrings,
} from '@site/(info)/buj/BujPage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';

import { absoluteUrl, buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';

import {
  normalizeText,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

const locale = 'ru';

const labels = getBujPageStrings(locale);

const seo = getStaticPageSeo('faq', locale);

const lvPath = seo.lvPath;
const ruPath = seo.ruPath;

function cleanSchemaText(value = '') {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = normalizeText(item?.q || '').toLowerCase();

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;

    if (ao !== bo) return ao - bo;

    const aq = String(a?.q || '');
    const bq = String(b?.q || '');

    return aq.localeCompare(bq);
  });
}

function parseFaqGroupDocId(docId = '', locale = 'lv') {
  const strings = getBujPageStrings(locale);
  const suffix = `_${locale}`;
  const cleanId = String(docId || '').trim();

  if (!cleanId.endsWith(suffix)) {
    return {
      key: cleanId,
      title: strings.fallbackGroupTitle,
      type: 'unknown',
      order: 999,
    };
  }

  const base = cleanId.slice(0, -suffix.length);

  if (base === 'basic') {
    return {
      key: base,
      title: strings.basicTitle,
      type: 'basic',
      order: 0,
    };
  }

  if (base.startsWith('category_')) {
    const categoryKey = base.slice('category_'.length);

    return {
      key: base,
      title: strings.groupTitles[categoryKey] || categoryKey,
      type: 'category',
      order: 100,
    };
  }

  if (base.startsWith('service_')) {
    const serviceKey = base.slice('service_'.length);

    return {
      key: base,
      title: strings.groupTitles[serviceKey] || serviceKey,
      type: 'service',
      order: 200,
    };
  }

  return {
    key: base,
    title: strings.groupTitles[base] || base,
    type: 'other',
    order: 300,
  };
}

async function getFaqSections(locale = 'lv') {
  const suffix = `_${locale}`;
  const snap = await db.collection('faqGroups').get();

  const sections = snap.docs
    .map((doc) => {
      const id = doc.id;

      if (!id.endsWith(suffix)) {
        return null;
      }

      const data = doc.data() || {};
      const parsed = parseFaqGroupDocId(id, locale);
      const rawItems = Array.isArray(data.items) ? data.items : [];

      const items = sortFaqItems(
        rawItems
          .filter((item) => {
            if (!item) return false;
            if (!String(item.q || '').trim()) return false;

            const hasAnswer =
              String(item.aHtml || '').trim() ||
              String(item.a || '').trim();

            if (!hasAnswer) return false;
            if (item.isHidden === true) return false;

            return true;
          })
          .map((item) => ({
            q: String(item.q || '').trim(),
            aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
            a: typeof item.a === 'string' ? item.a.trim() : '',
            order:
              typeof item.order === 'number' && Number.isFinite(item.order)
                ? item.order
                : 9999,
          }))
      );

      if (!items.length) {
        return null;
      }

      return {
        id,
        key: parsed.key,
        title: parsed.title,
        type: parsed.type,
        order: parsed.order,
        items,
        renderItems: toFaqRenderItems(items),
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });

  return sections;
}

function buildBreadcrumbsLd(breadcrumbs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

function buildFaqLd(items = [], path = '/ru/faq') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((item, index) => ({
      '@type': 'Question',
      '@id': `${absoluteUrl(path)}#faq-q${index + 1}`,
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: cleanSchemaText(item.aHtml || item.a),
      },
    })),
  };
}

async function getBujData() {
  const sections = await getFaqSections(locale);
  const faqItems = dedupeFaqItems(
    sections.flatMap((section) => section.items || [])
  );

  const breadcrumbs = [
    {
      label: labels.homeCrumb,
      href: '/ru',
    },
    {
      label: labels.pageCrumb,
      href: labels.pagePath,
    },
  ];

  const jsonLd = [
    buildBreadcrumbsLd(breadcrumbs),
    faqItems.length ? buildFaqLd(faqItems, labels.pagePath) : null,
  ].filter(Boolean);

  return {
    sections,
    faqItems,
    breadcrumbs,
    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata(seo);
}

export default async function Page() {
  const { sections, breadcrumbs, jsonLd } = await getBujData();

  return (
    <>
      <JsonLd id="faq-jsonld" data={jsonLd} />

      <BujPage
        locale={locale}
        labels={labels}
        sections={sections}
        headerTitle={labels.headerTitle}
        headerLead={labels.headerLead}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}