import HomePage from '@site/HomePage';

import JsonLd from '@components/seo/JsonLd';

import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getSiteSettings } from '@/lib/siteSettings';
import { getFaqGroups, getHomeBreadcrumbLabel } from '@/lib/faq/getFaqGroups';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';

import {
  absoluteUrl,
  buildBreadcrumbsLd,
  buildFaqLd,
  buildJsonLdGraph,
  buildWebPageLd,
} from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'ru';

const title = 'Сервис телефонов и компьютеров в Риге | iLab';

const description =
  'Ремонт телефонов, планшетов и компьютеров в Риге. Ремонт в тот же день, гарантия 90 дней и два филиала: Domina Shopping и Spice Life.';

const lvPath = '/';
const ruPath = '/ru';

const breadcrumbId = `${absoluteUrl(ruPath)}#breadcrumb`;
const faqId = `${absoluteUrl(ruPath)}#faq`;

export const metadata = buildSeoMetadata({
  locale,
  title,
  description,
  lvPath,
  ruPath,
  image: '/images/og/home.jpg',
  imageAlt: 'iLab сервис телефонов и компьютеров в Риге',
});

export default async function Page() {
  const [reviewsSummary, siteSettings, faq] = await Promise.all([
    getReviewsSummary(),
    getSiteSettings(),
    getFaqGroups(['basic'], locale),
  ]);

  const faqRenderItems = toFaqRenderItems(faq.items);

  const faqLd = buildFaqLd(faq.items, {
    id: faqId,
  });

  const jsonLd = buildJsonLdGraph([
    buildWebPageLd({
      path: ruPath,
      name: title,
      description,
      locale,
      breadcrumbId,
      primaryEntityId: faqLd ? faqId : undefined,
    }),

    buildBreadcrumbsLd(
      [{ name: getHomeBreadcrumbLabel(locale), url: ruPath }],
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