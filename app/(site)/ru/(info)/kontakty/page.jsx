import ContactsPage, {
  getBusinessFacts,
  getContactsPageStrings,
} from '@site/(info)/kontakti/ContactsPage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getSiteSettings } from '@/lib/siteSettings';

import { absoluteUrl, buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';

import {
  localizedHomePath,
  localizedInfoPath,
} from '@/lib/routes/localizedPath';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const labels = getContactsPageStrings(locale);

const lvPath = localizedInfoPath('kontakti', 'lv');
const ruPath = localizedInfoPath('kontakti', 'ru');

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;

    if (ao !== bo) return ao - bo;

    return String(a?.q || '').localeCompare(String(b?.q || ''));
  });
}

function normalizeFaqItems(items = []) {
  return sortFaqItems(
    items
      .filter((item) => {
        if (!item) return false;
        if (item.isHidden === true) return false;

        const q = String(item.q || '').trim();
        const answer = String(item.aHtml || item.a || '').trim();

        return q && answer;
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
}

async function getContactFaq(locale = 'lv') {
  const docId = `contact_${locale}`;
  const snap = await db.collection('faqGroups').doc(docId).get();

  if (!snap.exists) return null;

  const data = snap.data() || {};

  if (data.isPublished === false) return null;

  const items = normalizeFaqItems(Array.isArray(data.items) ? data.items : []);

  if (!items.length) return null;

  return {
    id: docId,
    title: String(data.title || '').trim(),
    items,
    renderItems: toFaqRenderItems(items),
  };
}

function cleanSchemaText(value = '') {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

function buildContactPageLd(strings, locale = 'lv') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${absoluteUrl(strings.pagePath)}#contact-page`,
    url: absoluteUrl(strings.pagePath),
    name: strings.pageCrumb,
    description: strings.headerLead,
    inLanguage: locale,
    isPartOf: {
      '@id': `${absoluteUrl('/')}#website`,
    },
    about: {
      '@id': `${absoluteUrl('/')}#organization`,
    },
  };
}

function buildFaqLd(contactFaq, path) {
  if (!contactFaq?.items?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: contactFaq.items.map((item, index) => ({
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

async function getContactsData() {
  const [siteSettings, contactFaq] = await Promise.all([
    getSiteSettings(),
    getContactFaq(locale),
  ]);

  const breadcrumbs = [
    {
      label: labels.homeCrumb,
      href: localizedHomePath(locale),
    },
    {
      label: labels.pageCrumb,
      href: labels.pagePath,
    },
  ];

  const jsonLd = [
    buildBreadcrumbsLd(breadcrumbs),
    buildContactPageLd(labels, locale),
    buildFaqLd(contactFaq, labels.pagePath),
  ].filter(Boolean);

  return {
    siteSettings,
    contactFaq,
    breadcrumbs,
    businessFacts: getBusinessFacts(siteSettings, labels),
    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata({
    locale,
    title: labels.metaTitle,
    description: labels.metaDescription,
    lvPath,
    ruPath,
  });
}

export default async function Page() {
  const data = await getContactsData();

  return (
    <>
      <JsonLd id="kontakti-ru-jsonld" data={data.jsonLd} />

      <ContactsPage
        locale={locale}
        labels={labels}
        siteSettings={data.siteSettings}
        breadcrumbs={data.breadcrumbs}
        businessFacts={data.businessFacts}
        contactFaqTitle={data.contactFaq?.title || labels.faqTitleFallback}
        contactFaqItems={data.contactFaq?.renderItems || []}
      />
    </>
  );
}