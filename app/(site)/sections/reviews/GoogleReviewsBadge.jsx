import s from './GoogleReviewsBadge.module.scss';

function formatRatingRange(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;

  if (Math.abs(min - max) < 0.01) {
    return min.toFixed(1);
  }

  const lo = Math.min(min, max);
  const hi = Math.max(min, max);

  return `${lo.toFixed(1)}–${hi.toFixed(1)}`;
}

export default function GoogleReviewsBadge({
  className,
  href = '#reviews',
  locale = 'lv',
  data,
}) {
  const values = Object.values(data || {}).filter(Boolean);
  if (!values.length) return null;

  const ratings = values
    .map((v) => Number(v.rating))
    .filter((n) => Number.isFinite(n));

  const counts = values
    .map((v) => Number(v.count))
    .filter((n) => Number.isFinite(n));

  if (!ratings.length || !counts.length) return null;

  const min = Math.min(...ratings);
  const max = Math.max(...ratings);
  const totalCount = counts.reduce((sum, n) => sum + n, 0);
  const ratingText = formatRatingRange(min, max);

  if (!ratingText || totalCount == null) return null;

  const isRu = locale === 'ru';
  const reviewsLabel = isRu ? 'отзывов' : 'atsauksmes';

  const ariaLabel = ratingText.includes('–')
    ? isRu
      ? `Рейтинг Google от ${ratingText} из 5, на основе ${totalCount} отзывов`
      : `Google vērtējums no ${ratingText} no 5, balstoties uz ${totalCount} atsauksmēm`
    : isRu
      ? `Рейтинг Google ${ratingText} из 5, на основе ${totalCount} отзывов`
      : `Google vērtējums ${ratingText} no 5, balstoties uz ${totalCount} atsauksmēm`;

  const cls = [s.badge, className].filter(Boolean).join(' ');

  return (
    <a href={href} className={cls} aria-label={ariaLabel}>
      <span className={s.star} aria-hidden>
        ★
      </span>
      <span className={s.text}>
        {ratingText} · {totalCount} {reviewsLabel} · Google
      </span>
    </a>
  );
}