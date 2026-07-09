import Image from 'next/image';

import s from '@/app/landings/_components/reviews/LandingReviews.module.scss';

const PLACE_KEYS = ['domina', 'spice'];

const strings = {
  ariaLabel: 'Google atsauksmes',
  basedOn: 'balstīts uz {count} atsauksmēm',
  ratingAria: 'Vērtējums: {rating} no 5',
  viewAllPrefix: 'Skatīt visas atsauksmes:',
  viewAllDomina: 'T/C Domina',
  viewAllSpice: 'T/C Spice',
  googleTitle: 'Google Reviews',
  empty: 'Atsauksmes drīzumā būs redzamas.',
  and: 'un',
};

function getPlaceName(value, fallback) {
  return value?.latest?.name || value?.name || fallback;
}

function getPlaceReviewsUrl(value) {
  if (value?.reviewsUrl) return value.reviewsUrl;
  if (value?.googleReviewsUrl) return value.googleReviewsUrl;
  if (value?.mapsUrl) return value.mapsUrl;

  const placeId = value?.placeId || value?.latest?.placeId;

  if (placeId) {
    return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(
      placeId
    )}`;
  }

  return null;
}

function pickFeaturedReviews(value) {
  const byLocale = value?.featuredReviewsByLocale;

  if (byLocale && Array.isArray(byLocale.lv)) {
    return byLocale.lv;
  }

  if (Array.isArray(value?.featuredReviews)) {
    return value.featuredReviews;
  }

  return [];
}

function clampRating(value) {
  const num = Number(value);

  if (!Number.isFinite(num)) return null;

  return Math.max(0, Math.min(5, Math.round(num)));
}

function renderStars(rating) {
  const safeRating = clampRating(rating);

  if (safeRating == null) return null;

  return {
    filled: '★'.repeat(safeRating),
    empty: '☆'.repeat(5 - safeRating),
    value: safeRating,
  };
}

function buildMixedReviews(domina, spice) {
  const dominaReviews =
    domina?.featuredReviews?.map((review, idx) => ({
      ...review,
      id: review.id || `domina-${idx}`,
      placeLabel: domina.label,
    })) || [];

  const spiceReviews =
    spice?.featuredReviews?.map((review, idx) => ({
      ...review,
      id: review.id || `spice-${idx}`,
      placeLabel: spice.label,
    })) || [];

  const mixed = [];
  let d = 0;
  let sp = 0;

  while (d < dominaReviews.length || sp < spiceReviews.length) {
    if (sp < spiceReviews.length) mixed.push(spiceReviews[sp++]);
    if (d < dominaReviews.length) mixed.push(dominaReviews[d++]);
    if (d < dominaReviews.length) mixed.push(dominaReviews[d++]);
    if (sp < spiceReviews.length) mixed.push(spiceReviews[sp++]);
    if (sp < spiceReviews.length) mixed.push(spiceReviews[sp++]);
  }

  return mixed;
}

function SummaryRating({ place, showSeparator = false }) {
  if (!place) return null;

  return (
    <div className={s.ratingSlot}>
      {showSeparator && <span className={s.separator} aria-hidden="true" />}

      <div className={s.ratingContent}>
        <div className={s.placeName}>{place.label}</div>

        <div className={s.ratingRow}>
          <span className={s.ratingStar} aria-hidden="true">
            ★
          </span>

          <span className={s.ratingValue}>
            {place.rating != null ? Number(place.rating).toFixed(1) : '-'}
          </span>
        </div>

        {place.count != null && (
          <div className={s.ratingMeta}>
            {strings.basedOn.replace('{count}', String(place.count))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const stars = renderStars(review.rating);
  const text = review.text || '';

  if (!text) return null;

  return (
    <article className={s.reviewCard}>
      <div className={s.reviewTop}>
        <div className={s.reviewAuthorBlock}>
          {review.author && <h3 className={s.author}>{review.author}</h3>}

          {stars && (
            <div
              className={s.stars}
              aria-label={strings.ratingAria.replace(
                '{rating}',
                String(stars.value)
              )}
            >
              <span className={s.starsFilled}>{stars.filled}</span>
              <span className={s.starsEmpty}>{stars.empty}</span>
            </div>
          )}
        </div>

        {review.placeLabel && (
          <span className={s.placeBadge}>{review.placeLabel}</span>
        )}
      </div>

      <p className={s.reviewText}>{text}</p>
    </article>
  );
}

export default function IphoneLandingReviewsSection({
  id = 'reviews',
  reviewsSummary = null,
}) {
  const places = PLACE_KEYS.map((key) => {
    const value = reviewsSummary?.[key];

    if (!value) return null;

    return {
      key,
      label: getPlaceName(value, key),
      href: getPlaceReviewsUrl(value),
      rating: value.latest?.rating ?? value.rating ?? null,
      count: value.latest?.count ?? value.count ?? null,
      featuredReviews: pickFeaturedReviews(value),
    };
  }).filter(Boolean);

  const domina = places.find((place) => place.key === 'domina');
  const spice = places.find((place) => place.key === 'spice');
  const mixedReviews = buildMixedReviews(domina, spice);
  const visibleReviews = mixedReviews.slice(0, 6);

  return (
    <section id={id} className={s.section} aria-label={strings.ariaLabel}>
      <div className={s.container}>
        <div className={s.reviewsCard}>
          <div className={s.summaryRow}>
            <div className={s.logoSlot}>
              <Image
                className={s.logo}
                src="/images/logos/Google-Review-Logo.webp"
                alt={strings.googleTitle}
                width={260}
                height={80}
              />
            </div>

            <div className={s.ratingsGroup}>
              <SummaryRating place={domina} />
              <SummaryRating place={spice} showSeparator />
            </div>
          </div>

          {visibleReviews.length > 0 ? (
            <div className={s.carouselWrap}>
              <div className={s.track}>
                {visibleReviews.map((review) => (
                  <div key={review.id} className={s.slide}>
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className={s.emptyText}>{strings.empty}</p>
          )}

          {(domina?.href || spice?.href) && (
            <p className={s.linksLine}>
              {strings.viewAllPrefix}{' '}

              {spice?.href && (
                <a href={spice.href} target="_blank" rel="noopener noreferrer">
                  {strings.viewAllSpice}
                </a>
              )}

              {spice?.href && domina?.href && <span> {strings.and} </span>}

              {domina?.href && (
                <a href={domina.href} target="_blank" rel="noopener noreferrer">
                  {strings.viewAllDomina}
                </a>
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
