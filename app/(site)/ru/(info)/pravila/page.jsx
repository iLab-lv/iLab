import TermsPage, {
  UPDATED_DATE,
  getTermsPageStrings,
} from '@site/(info)/noteikumi/TermsPage';

import JsonLd from '@components/seo/JsonLd';

import { absoluteUrl, buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';

const locale = 'ru';

const labels = getTermsPageStrings(locale);

const seo = getStaticPageSeo('terms', locale);

const lvPath = seo.lvPath;
const ruPath = seo.ruPath;

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

function buildTermsLd(strings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TermsOfService',
    '@id': `${absoluteUrl(strings.canonicalPath)}#terms`,
    name: strings.tosName,
    url: absoluteUrl(strings.canonicalPath),
    provider: {
      '@id': `${absoluteUrl('/')}#organization`,
    },
    inLanguage: strings.inLanguage,
    description: strings.tosDescription,
    dateModified: UPDATED_DATE,
  };
}

function getTermsData() {
  const breadcrumbs = [
    {
      label: labels.breadcrumbHome,
      href: '/ru',
    },
    {
      label: labels.breadcrumbPage,
      href: labels.canonicalPath,
    },
  ];

  const jsonLd = [
    buildBreadcrumbsLd(breadcrumbs),
    buildTermsLd(labels),
  ];

  return {
    breadcrumbs,
    jsonLd,
  };
}

export async function generateMetadata() {
  return buildSeoMetadata(seo);
}

export default function Page() {
  const { breadcrumbs, jsonLd } = getTermsData();

  return (
    <>
      <JsonLd id="pravila-jsonld" data={jsonLd} />

      <TermsPage
        locale={locale}
        labels={labels}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}