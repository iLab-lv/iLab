import HomePage from '@site/HomePage';

import JsonLd from '@components/seo/JsonLd';

import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getSiteSettings } from '@/lib/siteSettings';
import { getFaqGroups, getHomeBreadcrumbLabel } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { getStaticPageSeo } from '@/lib/seo/getStaticPageSeo';

import {
  absoluteUrl,
  buildBreadcrumbsLd,
  buildFaqLd,
  buildJsonLdGraph,
  buildWebPageLd,
} from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const seo = getStaticPageSeo('home', locale);

const breadcrumbId = `${absoluteUrl(seo.ruPath)}#breadcrumb`;
const faqId = `${absoluteUrl(seo.ruPath)}#faq`;

export const metadata = buildSeoMetadata(seo);

export default async function Page() {
  const [reviewsSummary, siteSettings, faq] = await Promise.all([
    getReviewsSummary(),
    getSiteSettings(),
    getFaqGroups([{ scopeType: 'basic' }], locale),
  ]);

  const faqRenderItems = toFaqRenderItems(faq.items);

  const faqLd = buildFaqLd(faq.items, {
    id: faqId,
  });

  const jsonLd = buildJsonLdGraph([
    buildWebPageLd({
      path: seo.ruPath,
      name: seo.title,
      description: seo.description,
      locale,
      breadcrumbId,
      primaryEntityId: faqLd ? faqId : undefined,
    }),

    buildBreadcrumbsLd(
      [{ name: getHomeBreadcrumbLabel(locale), url: seo.ruPath }],
      { id: breadcrumbId }
    ),

    faqLd,
  ]);

  return (
    <>
      <JsonLd id="home-ru-jsonld" data={jsonLd} />

      <HomePage
        locale={locale}
        reviewsSummary={reviewsSummary}
        siteSettings={siteSettings}
        faqTitle={faq.title}
        faqItems={faqRenderItems}
      />
    </>
  );
}