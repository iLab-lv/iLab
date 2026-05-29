import AboutPage, {
  getAboutStrings,
  getBusinessFacts,
} from '@site/(info)/par-mums/AboutPage';

import JsonLd from '@components/seo/JsonLd';

import { db } from '@/lib/firebaseAdmin';
import { getSiteSettings } from '@/lib/siteSettings';

import { absoluteUrl, buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';

import {
  localizedHomePath,
  localizedInfoPath,
} from '@/lib/routes/localizedPath';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const labels = getAboutStrings(locale);

const seo = getStaticPageSeo('about', locale);

const lvPath = seo.lvPath;
const ruPath = seo.ruPath;

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

async function getBasicFaq(locale = 'lv') {
  const docId = `basic_${locale}`;
  const snap = await db.collection('faqGroups').doc(docId).get();

  if (!snap.exists) {
    return {
      title: labels.faqTitle,
      items: [],
      renderItems: [],
    };
  }

  const data = snap.data() || {};
  const items = normalizeFaqItems(Array.isArray(data.items) ? data.items : []);

  return {
    title:
      typeof data.title === 'string' && data.title.trim()
        ? data.title.trim()
        : labels.faqTitle,
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

function buildAboutPageLd(strings, locale = 'lv') {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${absoluteUrl(strings.pagePath)}#about-page`,
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

function buildFaqLd(faq, path) {
  if (!faq?.items?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faq.items.map((item, index) => ({
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

async function getAboutData() {
  const [siteSettings, basicFaq] = await Promise.all([
    getSiteSettings(),
    getBasicFaq(locale),
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
    buildAboutPageLd(labels, locale),
    buildFaqLd(basicFaq, labels.pagePath),
  ].filter(Boolean);

  return {
    siteSettings,
    basicFaq,
    breadcrumbs,
    businessFacts: getBusinessFacts(siteSettings, labels),
    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata(seo);
}

export default async function Page() {
  const data = await getAboutData();

  return (
    <>
      <JsonLd id="o-nas-jsonld" data={data.jsonLd} />

      <AboutPage
        locale={locale}
        labels={labels}
        siteSettings={data.siteSettings}
        breadcrumbs={data.breadcrumbs}
        businessFacts={data.businessFacts}
        faqTitle={data.basicFaq.title}
        faqItems={data.basicFaq.renderItems}
      />
    </>
  );
}