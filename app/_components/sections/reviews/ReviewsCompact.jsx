import Image from 'next/image';

import { getReviewPlaces, getStars } from '../../features/reviews/reviews.helpers';

import s from './ReviewsCompact.module.scss';

export default function ReviewsCompact({ id = 'reviews', locale = 'lv', reviewsSummary = null }) {
  const places = getReviewPlaces(reviewsSummary, locale);
  const reviews = places.flatMap((place) => place.reviews.map((review, index) => ({ ...review, id: review.id || `${place.key}-${index}`, place: place.label }))).slice(0, 6);
  const isRu = locale === 'ru';
  if (!places.length) return null;

  return <section id={id} className={s.section} aria-label={isRu ? 'Отзывы Google' : 'Google atsauksmes'}><div className={s.container}><div className={s.card}><header><Image src="/images/logos/Google-Review-Logo.webp" alt="Google Reviews" width={260} height={80} /><div className={s.ratings}>{places.map((place) => <div key={place.key}><strong>{place.label}</strong><span>★ {place.rating != null ? Number(place.rating).toFixed(1) : '-'}</span></div>)}</div></header><div className={s.grid}>{reviews.map((review) => { const stars = getStars(review.rating); return <article key={review.id}><strong>{review.author}</strong>{stars && <span className={s.stars}>{stars.filled}<i>{stars.empty}</i></span>}<p>{review.text}</p><small>{review.place}</small></article>; })}</div></div></div></section>;
}
