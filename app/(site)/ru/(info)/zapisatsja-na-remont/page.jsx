import PierakstiesPage, {
  getPierakstiesPageStrings,
} from '@site/(info)/pieraksties-remontam/PierakstiesPage';

import JsonLd from '@components/seo/JsonLd';

import { getSiteSettings } from '@/lib/siteSettings';
import { absoluteUrl, buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';

const locale = 'ru';

const labels = getPierakstiesPageStrings(locale);

const lvPath = '/pieraksties-remontam';
const ruPath = '/ru/zapisatsja-na-remont';

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

function buildWebPageLd(strings, locale = 'lv') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(strings.canonicalPath)}#webpage`,
    url: absoluteUrl(strings.canonicalPath),
    name: strings.headerTitle,
    description: strings.metaDescription,
    inLanguage: locale,
    isPartOf: {
      '@id': `${absoluteUrl('/')}#website`,
    },
    about: {
      '@id': `${absoluteUrl('/')}#organization`,
    },
  };
}

function getPierakstiesData() {
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
    buildWebPageLd(labels, locale),
  ];

  return {
    breadcrumbs,
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
  const { breadcrumbs, jsonLd } = getPierakstiesData();
  const siteSettings = await getSiteSettings();

  return (
    <>
      <JsonLd id="zapisatsja-na-remont-jsonld" data={jsonLd} />

      <PierakstiesPage
        locale={locale}
        labels={labels}
        breadcrumbs={breadcrumbs}
        siteSettings={siteSettings}
      />
    </>
  );
}