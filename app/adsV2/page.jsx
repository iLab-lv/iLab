import { getSiteSettings } from '@/lib/siteSettings';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import AdsV2 from './AdsV2';

export const metadata = {
  title: 'iLab — Ads V2 priekšskatījums',
  description: 'iLab reklāmas lapas priekšskatījums.',
  robots: { index: false, follow: false },
};

export default async function AdsV2Page({ searchParams }) {
  const params = await searchParams;
  const locale = params?.lang === 'ru' ? 'ru' : 'lv';
  const [siteSettings, reviewsSummary] = await Promise.all([getSiteSettings(), getReviewsSummary()]);
  return <AdsV2 locale={locale} siteSettings={siteSettings} reviewsSummary={reviewsSummary} />;
}
