import ContactsPage, {
  getBusinessFacts,
  getContactsPageStrings,
} from './ContactsPage';

import JsonLd from '@components/seo/JsonLd';

import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import { getSiteSettings } from '@/lib/siteSettings';

import { absoluteUrl, buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';

import {
  localizedHomePath,
  localizedInfoPath,
} from '@/lib/routes/localizedPath';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const labels = getContactsPageStrings(locale);

const seo = getStaticPageSeo('contacts', locale);

const lvPath = seo.lvPath;
const ruPath = seo.ruPath;

async function getContactFaq(locale = 'lv') {
  const faq = await getFaqGroups([{ scopeType: 'page', scopeKey: 'contacts' }], locale);
  return { ...faq, renderItems: toFaqRenderItems(faq.items) };
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
  return buildSeoMetadata(seo);
}

export default async function Page() {
  const data = await getContactsData();

  return (
    <>
      <JsonLd id="kontakti-jsonld" data={data.jsonLd} />

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