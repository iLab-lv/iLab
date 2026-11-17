import { FaStar } from 'react-icons/fa6';
import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getServiceReviewPlaces, getReviewsCopy } from './serviceReviews.model';
import s from './HeroReviewsBadge.module.scss';

export function ReviewsBadge({ locale = 'lv', reviewsSummary, locations = [], className = '' }) {
  const places = getServiceReviewPlaces(reviewsSummary, locale);
  // Match the Reviews section's empty-data gate; never create a dead page anchor.
  if (!places.length) return null;
  const numberLocale = locale === 'ru' ? 'ru-RU' : 'lv-LV';
  const numberFormat = new Intl.NumberFormat(numberLocale, { useGrouping: true });
  const ratingFormat = new Intl.NumberFormat(numberLocale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const countLabel = (count, withGoogle = false) => {
    const plural = new Intl.PluralRules(locale).select(count);
    const word = locale === 'ru'
      ? ({ one: 'отзыв', few: 'отзыва', many: 'отзывов', other: 'отзыва' })[plural]
      : ({ one: 'atsauksme', zero: 'atsauksmju', other: 'atsauksmes' })[plural];
    const formatted = numberFormat.format(count);
    if (withGoogle) return locale === 'ru' ? `${formatted} ${word} в Google` : `${formatted} Google ${word}`;
    return `${formatted} ${word}`;
  };
  const hasCount = place => place.count != null && Number.isFinite(Number(place.count)) && Number(place.count) >= 0;
  const total = places.every(hasCount) ? places.reduce((sum, place) => sum + Number(place.count), 0) : null;
  const ratedPlaces = places.filter(place => Number(place.rating) > 0 && Number(place.rating) <= 5);
  const ratings = ratedPlaces.map(place => Number(place.rating));
  const range = ratings.length ? [...new Set([ratingFormat.format(Math.min(...ratings)), ratingFormat.format(Math.max(...ratings))])].join('–') : null;
  const details = ratedPlaces.map(place => {
    const name = locations.find(location => location.id === place.key)?.label || place.label;
    return `${name}: ${ratingFormat.format(Number(place.rating))} / 5${hasCount(place) ? ', ' + countLabel(Number(place.count)) : ''}`;
  }).join('; ');
  return <a data-hero-reviews className={`${s.badge} ${className}`} href="#reviews"
    title={details || undefined} aria-label={['Google', details, getReviewsCopy(locale).all].filter(Boolean).join('. ')}>
    {range && <span className={s.reviewStars} aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <FaStar key={index} />)}</span>}
    {range && <strong>{range}</strong>}
    <span className={s.heroReviewMeta}>{range && <span aria-hidden="true">· </span>}{total != null ? countLabel(total, true) : locale === 'ru' ? 'Отзывы Google' : 'Google atsauksmes'}</span>
    <span className={s.reviewArrow} aria-hidden="true">↗</span>
  </a>;
}

export default async function HeroReviewsBadge(props) {
  const summary = props.reviewsSummary ?? await getReviewsSummary();
  return <ReviewsBadge {...props} reviewsSummary={summary} />;
}
