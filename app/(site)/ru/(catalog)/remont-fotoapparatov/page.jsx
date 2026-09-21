import JsonLd from '@components/seo/JsonLd';
import PhotoRepairPage from '@/_components/page-sections/photo-repair/PhotoRepairPage';
import { getPhotoRepairContent } from '@/_components/page-sections/photo-repair/photoRepairContent';

import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getSiteSettings } from '@/lib/siteSettings';
import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';
import { buildRepairPageJsonLd } from '@/lib/seo/jsonld';
import { localizedCategoryPath } from '@/lib/routes/localizedPath';

const ROUTE_KEY = 'fotoaparatu-remonts';
const locale = 'ru';
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
    { label: copy.home, href: '/ru' },
    { label: copy.breadcrumb, href: ruPath },
  ];
  const faqItems = copy.faq.map(([question, answer]) => ({ question, answer }));
  const jsonLd = buildRepairPageJsonLd({
    path: ruPath,
    locale,
    pageName: copy.h1,
    pageDescription: copy.meta.description,
    breadcrumbs,
    serviceName: copy.h1,
    serviceDescription: copy.meta.description,
    serviceType: 'ремонт фотоаппаратов, диагностика фотоаппаратов, ремонт объективов, диагностика объективов, ремонт фототехники, диагностика фототехники',
    serviceImage: heroImage,
    faqItems,
    includeFaq: true,
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
      <JsonLd id="remont-fotoapparatov-jsonld" data={jsonLd} />
      <PhotoRepairPage locale={locale} baseHref={ruPath} siteSettings={siteSettings} reviewsSummary={reviewsSummary} heroImage={heroImage} lensImage={lensImage} />
    </>
  );
}
