import { getSiteSettings } from '@/lib/siteSettings';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import HeroReviewsBadge from '../_components/sections/reviews/HeroReviewsBadge';
import ReviewsCompact from '../_components/sections/reviews/ReviewsCompact';
import { getServicesContent } from '../adsV2/sourceContent';
import { getAdsV3Content } from './adsV3.i18n';
import { getAdsV3Inquiry, getAdsV3Locale, getAdsV3TrustItems } from './adsV3.model';
import AdsV3 from './AdsV3';

export async function generateMetadata({ searchParams }) {
  const locale = getAdsV3Locale((await searchParams)?.lang);
  const t = getAdsV3Content(locale);
  const canonical = `https://ilab.lv/adsV3${locale === 'ru' ? '?lang=ru' : ''}`;
  return {
    title: t.metaTitle, description: t.metaDescription,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: canonical, siteName: 'iLab', type: 'website', locale: locale === 'ru' ? 'ru_LV' : 'lv_LV' },
    twitter: { card: 'summary', title: t.metaTitle, description: t.metaDescription },
  };
}

export default async function AdsV3Page({ searchParams }) {
  const params = await searchParams || {};
  const locale = getAdsV3Locale(params.lang);
  const [settings, reviews] = await Promise.all([getSiteSettings(), getReviewsSummary()]);
  const locations = (settings.locations || []).map(location => ({
    ...location, label: location.label || location.name || location.title || '',
    tel: location.tel || location.phone || '',
    wa: location.wa || location.whatsapp || '',
  }));
  const inquiry = getAdsV3Inquiry(params, getServicesContent(locale).services, locations);
  return <AdsV3 locale={locale} locations={locations} defaultHours={settings.hours || []} pinPositions={settings.pinPositions || {}} company={settings.company || {}} initialInquiry={inquiry} trustItems={getAdsV3TrustItems(locale, reviews)}
    reviewBadge={<HeroReviewsBadge locale={locale} reviewsSummary={reviews} locations={locations} />}
    reviewsSection={<ReviewsCompact locale={locale} reviewsSummary={reviews} softTransitions />} />;
}
