import ServiceReviews from './ServiceReviews';

// Compatibility entry point for existing Service consumers.
export default function Reviews({ id = 'reviews', locale = 'lv', reviewsSummary }) {
  return <ServiceReviews id={id} variant="compact" locale={locale} reviewsSummary={reviewsSummary} />;
}
