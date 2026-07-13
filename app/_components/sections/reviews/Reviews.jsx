import Image from 'next/image';

import { getReviewPlaces, getStars } from '../../features/reviews/reviews.helpers';
import ReviewTextToggle from './ReviewTextToggle';

import s from './Reviews.module.scss';

function strings(locale) {
  return locale === 'ru'
    ? { aria: 'Отзывы Google', based: 'На основе {count} отзывов', more: 'Больше', less: 'Меньше', empty: 'Сейчас для этого филиала нет избранных отзывов.', all: 'Смотреть все отзывы в Google Maps ->', rating: 'Оценка: {rating} из 5' }
    : { aria: 'Google atsauksmes', based: 'Balstīts uz {count} atsauksmēm', more: 'Vairāk', less: 'Mazāk', empty: 'Šobrīd šai filiālei vēl nav izceltu atsauksmju.', all: 'Skatīt visas atsauksmes Google Maps ->', rating: 'Vērtējums: {rating} no 5' };
}

export default function Reviews({ id = 'reviews', locale = 'lv', reviewsSummary = null }) {
  const copy = strings(locale);
  const places = getReviewPlaces(reviewsSummary, locale);
  if (!places.length) return null;

  return <section id={id} className={s.section} aria-label={copy.aria}><div className={s.container}><div className={s.logoRow}><Image src="/images/logos/Google-Review-Logo.webp" alt="Google Reviews" width={260} height={80} /></div><div className={s.grid}>{places.map((place) => <article className={s.place} key={place.key}><header><h3>{place.label}</h3><div className={s.rating}><span aria-hidden="true">★</span><strong>{place.rating != null ? Number(place.rating).toFixed(1) : '-'}</strong></div>{place.count != null && <p className={s.meta}>{copy.based.replace('{count}', String(place.count))}</p>}</header>{place.reviews.length ? <ul>{place.reviews.map((review, index) => { const stars = getStars(review.rating); return <li key={review.id || index}>{review.author && <strong className={s.author}>{review.author}</strong>}{stars && <span className={s.stars} aria-label={copy.rating.replace('{rating}', String(stars.value))}>{stars.filled}<span>{stars.empty}</span></span>}<ReviewTextToggle text={review.text || ''} moreLabel={copy.more} lessLabel={copy.less} /></li>; })}</ul> : <p className={s.empty}>{copy.empty}</p>}{place.href && <a className={s.link} href={place.href} target="_blank" rel="noopener noreferrer">{copy.all}</a>}</article>)}</div></div></section>;
}
