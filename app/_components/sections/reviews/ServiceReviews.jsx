/* eslint-disable @next/next/no-img-element */
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import ReviewLocation from './ReviewLocation';
import { getServiceReviewPlaces, getTotalReviewCount, getQuantityReviewTitle, getReviewsCopy } from './serviceReviews.model';
import home from '@/app/(site)/HomePage.module.scss';
import s from './ServiceReviews.module.scss';

export default async function ServiceReviews({
  id = 'reviews', locale = 'lv', reviewsSummary, variant = 'compact',
  title, subtitle, headerVariant = variant === 'full' ? 'standard' : 'quantity',
}) {
  const summary = reviewsSummary ?? await getReviewsSummary();
  const places = getServiceReviewPlaces(summary, locale);
  if (!places.length) return null;
  const copy = getReviewsCopy(locale);
  const total = getTotalReviewCount(places);
  const heading = title ?? (headerVariant === 'quantity' ? getQuantityReviewTitle(total, locale) : copy.title);
  return <section id={id} className={`${home.section} ${home.reviews} ${s.scope}`} data-service-reviews={variant} aria-labelledby={`${id}-title`}>
    <header className={`${home.reviewHead} ${s.heading}`}>
      <div><h2 id={`${id}-title`}>{heading}</h2><p>{subtitle ?? copy.subtitle}{headerVariant === 'standard' && total != null && <small>{total} {copy.word} · Google</small>}</p></div>
      <div className={home.googleMark}><img src="/images/home/google-logo-white.png" alt="Google" width="3748" height="1328" loading="lazy" decoding="async" /></div>
    </header>
    <div className={`${home.reviewGrid} ${s.grid}`} style={{ '--review-rows': variant === 'full' ? 4 : 2 }}>
      {places.map((place, index) => <ReviewLocation key={place.key} place={place} index={index} variant={variant} locale={locale} copy={copy} />)}
    </div>
  </section>;
}
