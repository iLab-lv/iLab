import ServiceReviews from '../reviews/ServiceReviews';

export default function HubReviews({ locale = 'lv', reviewsSummary }) {
  return <ServiceReviews variant="compact" locale={locale} reviewsSummary={reviewsSummary} />;
}
