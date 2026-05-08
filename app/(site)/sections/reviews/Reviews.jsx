'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
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
      loading: 'Загружаем отзывы…',
      error: 'Не удалось загрузить отзывы',
      more: 'Больше',
      less: 'Меньше',
      basedOn: 'Основано на {count} отзывах',
      empty: 'Сейчас для этого филиала ещё нет избранных отзывов.',
      viewAll: 'Смотреть все отзывы в Google Maps →',
      ratingAria: 'Оценка: {rating} из 5',
    };
  }

  return {
    ariaLabel: 'Google atsauksmes',
    loading: 'Ielādē atsauksmes…',
    error: 'Neizdevās ielādēt atsauksmes',
    more: 'Vairāk',
    less: 'Mazāk',
    basedOn: 'Balstīts uz {count} atsauksmēm',
    empty: 'Šobrīd šai filiālei vēl nav izceltu atsauksmju.',
    viewAll: 'Skatīt visas atsauksmes Google Maps →',
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
    if (days < 7) {
      return days === 1 ? '1 день назад' : `${days} дн. назад`;
    }

    const weeks = Math.floor(days / 7);
    if (days < 35) {
      return weeks <= 1 ? '1 неделю назад' : `${weeks} нед. назад`;
    }

    const months = Math.floor(days / 30);
    if (days < 365) {
      return months <= 1 ? '1 месяц назад' : `${months} мес. назад`;
    }

    const years = Math.floor(days / 365);
    return years <= 1 ? '1 год назад' : `${years} г. назад`;
  }

  if (days < 7) {
    return days === 1 ? 'pirms 1 dienas' : `pirms ${days} dienām`;
  }

  const weeks = Math.floor(days / 7);
  if (days < 35) {
    return weeks <= 1 ? 'pirms 1 nedēļas' : `pirms ${weeks} nedēļām`;
  }

  const months = Math.floor(days / 30);
  if (days < 365) {
    return months <= 1 ? 'pirms 1 mēneša' : `pirms ${months} mēnešiem`;
  }

  const years = Math.floor(days / 365);
  return years <= 1 ? 'pirms 1 gada' : `pirms ${years} gadiem`;
}

function ReviewItem({ author, text, date, rating, locale, strings }) {
  const [expanded, setExpanded] = useState(false);

  const LIMIT = 220;
  const safeText = text || '';
  const isLong = safeText.length > LIMIT;
  const visibleText =
    !isLong || expanded
      ? safeText
      : `${safeText.slice(0, LIMIT).trimEnd()}…`;

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

      <p className={s.reviewText}>
        {visibleText}{' '}
        {isLong && (
          <button
            type="button"
            className={s.reviewMore}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? strings.less : strings.more}
          </button>
        )}
      </p>
    </li>
  );
}

export default function Reviews({ id = 'reviews', locale = 'lv' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const safeLocale = normalizeLocale(locale);
  const strings = useMemo(() => getStrings(safeLocale), [safeLocale]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load reviews');

        const json = await res.json();

        if (cancelled) return;

        setData(json || {});
        setLoading(false);
      } catch (err) {
        if (cancelled) return;

        console.error('Reviews section: failed to load', err);
        setError(strings.error);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [strings.error]);

  const places = useMemo(() => {
    if (!data) return null;

    return PLACE_KEYS.map((key) => {
      const value = data[key];
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
  }, [data, safeLocale]);

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

        {loading && <div className={s.statusText}>{strings.loading}</div>}

        {error && !loading && (
          <div className={s.statusTextError}>{error}</div>
        )}

        {!loading && !error && places && places.length > 0 && (
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
                    {place.featuredReviews.map((r, idx) => (
                      <ReviewItem
                        key={r.id || `${place.key}-${idx}`}
                        author={r.author}
                        text={r.text}
                        date={r.date}
                        rating={r.rating}
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
        )}
      </div>
    </section>
  );
}