import Image from 'next/image';

import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import s from './Reviews.module.scss';

const PLACE_KEYS = ['domina', 'spice'];

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getPlaceName(value, fallback) {
  return value?.latest?.name || value?.name || fallback;
}

function getPlaceReviewsUrl(value) {
  if (value?.reviewsUrl) return value.reviewsUrl;
  if (value?.googleReviewsUrl) return value.googleReviewsUrl;
  if (value?.mapsUrl) return value.mapsUrl;

  if (value?.placeId) {
    return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(
      value.placeId
    )}`;
  }

  if (value?.latest?.placeId) {
    return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(
      value.latest.placeId
    )}`;
  }

  return null;
}

function getStrings(locale) {
  const safeLocale = normalizeLocale(locale);

  if (safeLocale === 'ru') {
    return {
      ariaLabel: 'Отзывы Google',
      more: 'Больше',
      less: 'Меньше',
      basedOn: 'Основано на {count} отзывах',
      empty: 'Сейчас для этого филиала ещё нет избранных отзывов.',
      viewAll: 'Смотреть все отзывы в Google Maps ->',
      ratingAria: 'Оценка: {rating} из 5',
    };
  }

  return {
    ariaLabel: 'Google atsauksmes',
    more: 'Vairāk',
    less: 'Mazāk',
    basedOn: 'Balstīts uz {count} atsauksmēm',
    empty: 'Šobrīd šai filiālei vēl nav izceltu atsauksmju.',
    viewAll: 'Skatīt visas atsauksmes Google Maps ->',
    ratingAria: 'Vērtējums: {rating} no 5',
  };
}

function pickFeaturedReviews(value, locale) {
  const safeLocale = normalizeLocale(locale);
  const byLocale = value?.featuredReviewsByLocale;

  if (byLocale && Array.isArray(byLocale[safeLocale])) {
    return byLocale[safeLocale];
  }

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

  const filled = '★'.repeat(safeRating);
  const empty = '☆'.repeat(5 - safeRating);

  return { filled, empty, value: safeRating };
}

function formatRelativeDate(dateValue, locale) {
  if (!dateValue) return '';

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.max(1, Math.floor(diffMs / dayMs));
  const safeLocale = normalizeLocale(locale);

  if (safeLocale === 'ru') {
    if (days < 7) return days === 1 ? '1 день назад' : `${days} дн. назад`;

    const weeks = Math.floor(days / 7);
    if (days < 35) return weeks <= 1 ? '1 неделю назад' : `${weeks} нед. назад`;

    const months = Math.floor(days / 30);
    if (days < 365) return months <= 1 ? '1 месяц назад' : `${months} мес. назад`;

    const years = Math.floor(days / 365);
    return years <= 1 ? '1 год назад' : `${years} г. назад`;
  }

  if (days < 7) return days === 1 ? 'pirms 1 dienas' : `pirms ${days} dienām`;

  const weeks = Math.floor(days / 7);
  if (days < 35) return weeks <= 1 ? 'pirms 1 nedēļas' : `pirms ${weeks} nedēļām`;

  const months = Math.floor(days / 30);
  if (days < 365) return months <= 1 ? 'pirms 1 mēneša' : `pirms ${months} mēnešiem`;

  const years = Math.floor(days / 365);
  return years <= 1 ? 'pirms 1 gada' : `pirms ${years} gadiem`;
}

function ReviewItem({ author, text, date, rating, locale, strings }) {
  const safeText = text || '';
  const stars = renderStars(rating);
  const relativeDate = formatRelativeDate(date, locale);

  if (!safeText) return null;

  return (
    <li className={s.reviewItem}>
      {author && <div className={s.reviewAuthor}>{author}</div>}

      {(stars || relativeDate) && (
        <div className={s.reviewMeta}>
          {stars ? (
            <span
              className={s.reviewRating}
              aria-label={strings.ratingAria.replace(
                '{rating}',
                String(stars.value)
              )}
            >
              <span className={s.reviewStarsFilled}>{stars.filled}</span>
              <span className={s.reviewStarsEmpty}>{stars.empty}</span>
            </span>
          ) : (
            <span />
          )}

          {relativeDate && <span className={s.reviewDate}>{relativeDate}</span>}
        </div>
      )}

      <p className={s.reviewText}>{safeText}</p>
    </li>
  );
}

export default async function Reviews({ id = 'reviews', locale = 'lv' }) {
  const safeLocale = normalizeLocale(locale);
  const strings = getStrings(safeLocale);
  const data = await getReviewsSummary();

  const places = PLACE_KEYS.map((key) => {
    const value = data?.[key];
    if (!value) return null;

    return {
      key,
      label: getPlaceName(value, key),
      href: getPlaceReviewsUrl(value),
      rating: value.latest?.rating ?? value.rating ?? null,
      count: value.latest?.count ?? value.count ?? null,
      featuredReviews: pickFeaturedReviews(value, safeLocale),
    };
  }).filter(Boolean);

  if (places.length === 0) return null;

  return (
    <section
      id={id}
      className={`${s.section} ${s.reviews}`}
      aria-label={strings.ariaLabel}
    >
      <div className={s.container}>
        <div className={s.logoRow}>
          <Image
            className={s.logo}
            src="/images/logos/Google-Review-Logo.webp"
            alt="Google Reviews"
            width={260}
            height={80}
            priority
          />
        </div>

        <div className={s.placesGrid}>
          {places.map((place) => (
            <article key={place.key} className={s.placeCard}>
              <header className={s.placeHeader}>
                <h3 className={s.placeName}>{place.label}</h3>

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
              </header>

              {place.featuredReviews?.length ? (
                <ul className={s.reviewList}>
                  {place.featuredReviews.map((review, index) => (
                    <ReviewItem
                      key={review.id || `${place.key}-${index}`}
                      author={review.author}
                      text={review.text}
                      date={review.date}
                      rating={review.rating}
                      locale={safeLocale}
                      strings={strings}
                    />
                  ))}
                </ul>
              ) : (
                <p className={s.emptyText}>{strings.empty}</p>
              )}

              {place.href && (
                <div className={s.placeCta}>
                  <a
                    href={place.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.placeLink}
                  >
                    {strings.viewAll}
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
