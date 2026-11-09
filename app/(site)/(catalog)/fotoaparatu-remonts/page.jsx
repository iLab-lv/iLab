import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import JsonLd from '@components/seo/JsonLd';
import PhotoRepairPage from '@/_components/page-sections/photo-repair/PhotoRepairPage';
import { getPhotoRepairContent } from '@/_components/page-sections/photo-repair/photoRepairContent';

import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getSiteSettings } from '@/lib/siteSettings';
import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';
import { localizedCategoryPath } from '@/lib/routes/localizedPath';

const ROUTE_KEY = 'fotoaparatu-remonts';
const locale = 'lv';
const copy = getPhotoRepairContent(locale);
const lvPath = localizedCategoryPath(ROUTE_KEY, 'lv');
const ruPath = localizedCategoryPath(ROUTE_KEY, 'ru');
const heroImage = '/images/categories/fotoaparatu_remonts.webp';
const lensImage = '/images/categories/lens-repair.webp';

export const metadata = buildSeoMetadata({
  locale,
  title: copy.meta.title,
  description: copy.meta.description,
  lvPath,
  ruPath,
  imageAlt: copy.meta.imageAlt,
  openGraphTitle: copy.meta.title,
  openGraphDescription: copy.meta.ogDescription,
});

export default async function Page() {
  const [siteSettings, reviewsSummary] = await Promise.all([
    getSiteSettings(),
    getReviewsSummary(),
  ]);
  const breadcrumbs = [
    { label: copy.home, href: '/' },
    { label: copy.breadcrumb, href: lvPath },
  ];
  const faq = await getFaqGroups([{ scopeType: 'category', scopeKey: ROUTE_KEY }], locale);
  const faqItems = faq.items;
  const jsonLd = buildRepairPageJsonLd({
    path: lvPath,
    locale,
    pageName: copy.h1,
    pageDescription: copy.meta.description,
    breadcrumbs,
    serviceName: copy.h1,
    serviceDescription: copy.meta.description,
    serviceType: 'fotoaparātu remonts, fotoaparātu diagnostika, objektīvu remonts, objektīvu diagnostika, fototehnikas remonts, fototehnikas diagnostika',
    serviceImage: heroImage,
    faqItems,
    includeFaq: faqItems.length > 0,
    includeHowTo: true,
    howTo: {
      name: copy.process.title,
      description: copy.process.intro,
      image: heroImage,
      steps: copy.process.items.map(({ title: name, text }) => ({ name, text })),
    },
  });

  return (
    <>
      <JsonLd id="fotoaparatu-remonts-jsonld" data={jsonLd} />
      <PhotoRepairPage faqItems={faqItems} faqTitle={faq.title} locale={locale} baseHref={lvPath} siteSettings={siteSettings} reviewsSummary={reviewsSummary} heroImage="/images/heroes/camera-repair-r75d.webp" lensImage={lensImage} />
    </>
  );
}
