import HomePage from './HomePage';

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

const locale = 'lv';

const title = 'Telefonu un datoru serviss Rīgā | iLab';

const description =
  'Telefonu, planšetdatoru un datoru remonts Rīgā. Remonts tajā pašā dienā, 90 dienu garantija un divas filiāles: Domina Shopping un Spice Life.';

const lvPath = '/';
const ruPath = '/ru';

const breadcrumbId = `${absoluteUrl(lvPath)}#breadcrumb`;
const faqId = `${absoluteUrl(lvPath)}#faq`;

export const metadata = buildSeoMetadata({
  locale,
  title,
  description,
  lvPath,
  ruPath,
  image: '/images/og/home.jpg',
  imageAlt: 'iLab telefonu un datoru serviss Rīgā',
});

export default async function Page() {
  const [reviewsSummary, siteSettings, faq] = await Promise.all([
    getReviewsSummary(),
    getSiteSettings(),
    getFaqGroups([{ scopeType: 'basic' }], locale)
  ]);

  const faqRenderItems = toFaqRenderItems(faq.items);

  const faqLd = buildFaqLd(faq.items, {
    id: faqId,
  });

  const jsonLd = buildJsonLdGraph([
    buildWebPageLd({
      path: lvPath,
      name: title,
      description,
      locale,
      breadcrumbId,
      primaryEntityId: faqLd ? faqId : undefined,
    }),

    buildBreadcrumbsLd(
      [{ name: getHomeBreadcrumbLabel(locale), url: lvPath }],
      { id: breadcrumbId }
    ),

    faqLd,
  ]);

  return (
    <>
      <JsonLd id="home-jsonld" data={jsonLd} />

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