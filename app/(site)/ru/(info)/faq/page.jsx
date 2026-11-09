import BujPage, {
  getBujPageStrings,
} from '@site/(info)/buj/BujPage';

import JsonLd from '@components/seo/JsonLd';

import { getFaqDirectory } from '@/lib/faq/getFaqGroups';
import { directoryGroupPresentation } from '@/lib/faq/faqPolicy';

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

async function getFaqSections(locale = 'lv') {
  const strings = getBujPageStrings(locale);
  return (await getFaqDirectory(locale)).map(group => ({
    ...directoryGroupPresentation(group, strings),
    renderItems: toFaqRenderItems(group.items),
  })).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
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