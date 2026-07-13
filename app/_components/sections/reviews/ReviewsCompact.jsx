'use client';

import { useRef } from 'react';
import Image from 'next/image';

import { getReviewPlaces, getStars } from '../../features/reviews/reviews.helpers';
import s from './ReviewsCompact.module.scss';

function getStrings(locale) {
  return locale === 'ru'
    ? {
        aria: 'Отзывы Google', based: 'на основе {count} отзывов', prev: 'Предыдущий отзыв', next: 'Следующий отзыв',
        rating: 'Оценка: {rating} из 5', all: 'Смотреть все отзывы:',
        empty: 'Отзывы скоро появятся.', and: 'и',
      }
    : {
        aria: 'Google atsauksmes', based: 'balstīts uz {count} atsauksmēm', prev: 'Iepriekšējā atsauksme', next: 'Nākamā atsauksme',
        rating: 'Vērtējums: {rating} no 5', all: 'Skatīt visas atsauksmes:',
        empty: 'Atsauksmes drīzumā būs redzamas.', and: 'un',
      };
}

function mixReviews(places) {
  const queues = places.map((place) =>
    place.reviews.map((review, index) => ({
      ...review,
      id: review.id || `${place.key}-${index}`,
      place: place.label,
    }))
  );
  const mixed = [];
  while (queues.some((queue) => queue.length)) {
    queues.forEach((queue) => { if (queue.length) mixed.push(queue.shift()); });
  }
  return mixed.slice(0, 6);
}

export default function ReviewsCompact({
  id = 'reviews',
  locale = 'lv',
  reviewsSummary = null,
}) {
  const places = getReviewPlaces(reviewsSummary, locale);
  const reviews = mixReviews(places);
  const copy = getStrings(locale);
  const trackRef = useRef(null);
  if (!places.length) return null;

  const scrollReviews = (direction) => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section id={id} className={s.section} aria-label={copy.aria}>
      <div className={s.container}>
        <div className={s.summaryRow}>
          <div className={s.logoSlot}>
            <Image className={s.logo} src="/images/logos/Google-Review-Logo.webp" alt="Google Reviews" width={260} height={80} />
          </div>
          <div className={s.ratingsGroup}>
            {places.map((place, index) => (
              <div className={s.ratingSlot} key={place.key}>
                {index > 0 && <span className={s.separator} aria-hidden="true" />}
                <div className={s.ratingContent}>
                  <div className={s.placeName}>{place.label}</div>
                  <div className={s.ratingRow}><span aria-hidden="true">★</span><strong>{place.rating != null ? Number(place.rating).toFixed(1) : '-'}</strong></div>
                  {place.count != null && <div className={s.ratingMeta}>{copy.based.replace('{count}', String(place.count))}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {reviews.length ? (
          <div className={s.carouselWrap}>
            <button type="button" className={`${s.controlButton} ${s.controlPrev}`} onClick={() => scrollReviews(-1)} aria-label={copy.prev}>←</button>
            <button type="button" className={`${s.controlButton} ${s.controlNext}`} onClick={() => scrollReviews(1)} aria-label={copy.next}>→</button>
            <div ref={trackRef} className={s.track}>
              {reviews.map((review) => {
              const stars = getStars(review.rating);
              return (
                <article className={s.reviewCard} key={review.id}>
                  <div className={s.reviewTop}>
                    <div>{review.author && <h3>{review.author}</h3>}{stars && <span className={s.stars} aria-label={copy.rating.replace('{rating}', String(stars.value))}>{stars.filled}<i>{stars.empty}</i></span>}</div>
                    <span className={s.placeBadge}>{review.place}</span>
                  </div>
                  <p>{review.text}</p>
                </article>
              );
              })}
            </div>
          </div>
        ) : <p className={s.empty}>{copy.empty}</p>}

        {places.some((place) => place.href) && (
          <p className={s.links}>{copy.all}{' '}{places.filter((place) => place.href).map((place, index) => <span key={place.key}>{index > 0 && ` ${copy.and} `}<a href={place.href} target="_blank" rel="noopener noreferrer">{place.label}</a></span>)}</p>
        )}
      </div>
    </section>
  );
}
