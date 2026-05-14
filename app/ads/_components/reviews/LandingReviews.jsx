'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import s from './LandingReviews.module.scss';

const PLACE_KEYS = ['domina', 'spice'];
const AUTO_DELAY = 5500;

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getStrings(locale) {
  const safeLocale = normalizeLocale(locale);

  if (safeLocale === 'ru') {
    return {
      ariaLabel: 'Отзывы Google',
      loading: 'Загружаем отзывы…',
      error: 'Не удалось загрузить отзывы',
      basedOn: 'на основе {count} отзывов',
      ratingAria: 'Оценка: {rating} из 5',
      prev: 'Предыдущий отзыв',
      next: 'Следующий отзыв',
      viewAllPrefix: 'Смотреть все отзывы:',
      viewAllDomina: 'T/C Domina',
      viewAllSpice: 'T/C Spice',
      googleTitle: 'Google Reviews',
      empty: 'Отзывы скоро появятся.',
      and: 'и',
    };
  }

  return {
    ariaLabel: 'Google atsauksmes',
    loading: 'Ielādē atsauksmes…',
    error: 'Neizdevās ielādēt atsauksmes',
    basedOn: 'balstīts uz {count} atsauksmēm',
    ratingAria: 'Vērtējums: {rating} no 5',
    prev: 'Iepriekšējā atsauksme',
    next: 'Nākamā atsauksme',
    viewAllPrefix: 'Skatīt visas atsauksmes:',
    viewAllDomina: 'T/C Domina',
    viewAllSpice: 'T/C Spice',
    googleTitle: 'Google Reviews',
    empty: 'Atsauksmes drīzumā būs redzamas.',
    and: 'un',
  };
}

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
      placeKey: 'domina',
      placeLabel: domina.label,
    })) || [];

  const spiceReviews =
    spice?.featuredReviews?.map((review, idx) => ({
      ...review,
      id: review.id || `spice-${idx}`,
      placeKey: 'spice',
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

function SummaryRating({
  place,
  strings,
  showSeparator = false,
}) {
  if (!place) return null;

  return (
    <div className={s.ratingSlot}>
      {showSeparator && (
        <span className={s.separator} aria-hidden="true" />
      )}

      <div className={s.ratingContent}>
        <div className={s.placeName}>
          {place.label}
        </div>

        <div className={s.ratingRow}>
          <span className={s.ratingStar} aria-hidden="true">
            ★
          </span>

          <span className={s.ratingValue}>
            {place.rating != null
              ? Number(place.rating).toFixed(1)
              : '-'}
          </span>
        </div>

        {place.count != null && (
          <div className={s.ratingMeta}>
            {strings.basedOn.replace(
              '{count}',
              String(place.count)
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  strings,
}) {
  const stars = renderStars(review.rating);
  const text = review.text || '';

  if (!text) return null;

  return (
    <article className={s.reviewCard}>
      <div className={s.reviewTop}>
        <div className={s.reviewAuthorBlock}>
          {review.author && (
            <h3 className={s.author}>
              {review.author}
            </h3>
          )}

          {stars && (
            <div
              className={s.stars}
              aria-label={strings.ratingAria.replace(
                '{rating}',
                String(stars.value)
              )}
            >
              <span className={s.starsFilled}>
                {stars.filled}
              </span>

              <span className={s.starsEmpty}>
                {stars.empty}
              </span>
            </div>
          )}
        </div>

        {review.placeLabel && (
          <span className={s.placeBadge}>
            {review.placeLabel}
          </span>
        )}
      </div>

      <p className={s.reviewText}>
        {text}
      </p>
    </article>
  );
}

export default function LandingReviews({
  id = 'reviews',
  locale = 'lv',
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const trackRef = useRef(null);

  const safeLocale = normalizeLocale(locale);

  const strings = useMemo(
    () => getStrings(safeLocale),
    [safeLocale]
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/reviews', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to load reviews');
        }

        const json = await res.json();

        if (cancelled) return;

        setData(json || {});
        setLoading(false);
      } catch (err) {
        if (cancelled) return;

        console.error(
          'LandingReviews: failed to load',
          err
        );

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
    if (!data) return [];

    return PLACE_KEYS.map((key) => {
      const value = data[key];

      if (!value) return null;

      return {
        key,
        label: getPlaceName(value, key),
        href: getPlaceReviewsUrl(value),
        rating:
          value.latest?.rating ??
          value.rating ??
          null,
        count:
          value.latest?.count ??
          value.count ??
          null,
        featuredReviews: pickFeaturedReviews(
          value,
          safeLocale
        ),
      };
    }).filter(Boolean);
  }, [data, safeLocale]);

  const domina = places.find(
    (place) => place.key === 'domina'
  );

  const spice = places.find(
    (place) => place.key === 'spice'
  );

  const mixedReviews = useMemo(
    () => buildMixedReviews(domina, spice),
    [domina, spice]
  );

  const loopedReviews = useMemo(() => {
    if (!mixedReviews.length) return [];

    return [
      ...mixedReviews,
      ...mixedReviews,
      ...mixedReviews,
    ];
  }, [mixedReviews]);

  const getRealIndex = (index) => {
    if (!mixedReviews.length) return 0;

    return (
      (index + mixedReviews.length) %
      mixedReviews.length
    );
  };

  const scrollToIndex = (
    index,
    behavior = 'smooth'
  ) => {
    const track = trackRef.current;
    const slide = track?.children?.[index];

    if (!track || !slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      behavior,
    });
  };

  const goTo = (index) => {
    if (
      !loopedReviews.length ||
      !mixedReviews.length
    ) {
      return;
    }

    const safeIndex =
      ((index % loopedReviews.length) +
        loopedReviews.length) %
      loopedReviews.length;

    setActiveIndex(safeIndex);

    scrollToIndex(safeIndex);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    if (!mixedReviews.length) return;

    const startIndex = mixedReviews.length;

    setActiveIndex(startIndex);

    window.requestAnimationFrame(() => {
      scrollToIndex(startIndex, 'auto');
    });
  }, [mixedReviews.length]);

  useEffect(() => {
    if (
      paused ||
      mixedReviews.length <= 1
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      goNext();
    }, AUTO_DELAY);

    return () => window.clearInterval(timer);
  }, [
    activeIndex,
    paused,
    mixedReviews.length,
  ]);

  useEffect(() => {
    if (
      !mixedReviews.length ||
      !loopedReviews.length
    ) {
      return undefined;
    }

    const track = trackRef.current;

    if (!track) return undefined;

    let scrollTimer;

    const handleScroll = () => {
      window.clearTimeout(scrollTimer);

      scrollTimer = window.setTimeout(() => {
        const slides = Array.from(track.children);

        if (!slides.length) return;

        const nearestIndex = slides.reduce(
          (closestIndex, slide, index) => {
            const closest =
              slides[closestIndex];

            const currentDistance =
              Math.abs(
                track.scrollLeft -
                  slide.offsetLeft
              );

            const closestDistance =
              Math.abs(
                track.scrollLeft -
                  closest.offsetLeft
              );

            return currentDistance <
              closestDistance
              ? index
              : closestIndex;
          },
          0
        );

        setActiveIndex(nearestIndex);

        if (
          nearestIndex <
          mixedReviews.length
        ) {
          const resetIndex =
            nearestIndex +
            mixedReviews.length;

          setActiveIndex(resetIndex);

          scrollToIndex(resetIndex, 'auto');
        }

        if (
          nearestIndex >=
          mixedReviews.length * 2
        ) {
          const resetIndex =
            nearestIndex -
            mixedReviews.length;

          setActiveIndex(resetIndex);

          scrollToIndex(resetIndex, 'auto');
        }
      }, 120);
    };

    track.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.clearTimeout(scrollTimer);

      track.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, [
    mixedReviews.length,
    loopedReviews.length,
  ]);

  return (
    <section
      id={id}
      className={s.section}
      aria-label={strings.ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={s.container}>
        {loading && (
          <div className={s.statusText}>
            {strings.loading}
          </div>
        )}

        {error && !loading && (
          <div className={s.statusTextError}>
            {error}
          </div>
        )}

        {!loading && !error && (
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
                <SummaryRating
                  place={domina}
                  strings={strings}
                />

                <SummaryRating
                  place={spice}
                  strings={strings}
                  showSeparator
                />
              </div>
            </div>

            {loopedReviews.length > 0 ? (
              <div className={s.carouselWrap}>
                <button
                  type="button"
                  className={`${s.controlButton} ${s.controlPrev}`}
                  onClick={goPrev}
                  aria-label={strings.prev}
                >
                  ←
                </button>

                <button
                  type="button"
                  className={`${s.controlButton} ${s.controlNext}`}
                  onClick={goNext}
                  aria-label={strings.next}
                >
                  →
                </button>

                <div
                  ref={trackRef}
                  className={s.track}
                >
                  {loopedReviews.map(
                    (review, index) => (
                      <div
                        key={`${review.id}-${index}`}
                        className={s.slide}
                        aria-hidden={
                          getRealIndex(index) !==
                          getRealIndex(
                            activeIndex
                          )
                            ? undefined
                            : undefined
                        }
                      >
                        <ReviewCard
                          review={review}
                          strings={strings}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <p className={s.emptyText}>
                {strings.empty}
              </p>
            )}

            {(domina?.href ||
              spice?.href) && (
              <p className={s.linksLine}>
                {strings.viewAllPrefix}{' '}

                {spice?.href && (
                  <a
                    href={spice.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {strings.viewAllSpice}
                  </a>
                )}

                {spice?.href &&
                  domina?.href && (
                    <span>
                      {' '}
                      {strings.and}{' '}
                    </span>
                  )}

                {domina?.href && (
                  <a
                    href={domina.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {strings.viewAllDomina}
                  </a>
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}