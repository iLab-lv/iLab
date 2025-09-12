// app/(site)/sections/home/Hero.jsx
import s from './Hero.module.scss';

export default function Hero({
  id = 'hero',
  title,
  subtitle,
  rating,   // { value, count, sourceLabel, href, ariaLabel? }
  cta,      // { label, href }
  align = 'center',
  background = 'gradient',
}) {
  const sectionClass = [
    s.hero,
    align === 'start' ? s.alignStart : s.alignCenter,
    background === 'gradient' ? s.bgGradient : null,
  ].filter(Boolean).join(' ');

  const ratingAria =
    rating?.ariaLabel ??
    (rating
      ? `${rating.sourceLabel} vērtējums ${rating.value} no 5, ${rating.count} atsauksmes`
      : undefined);

  return (
    <section id={id} className={sectionClass} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        {title ? (
          <h1 id={`${id}-title`} className={s.heading}>
            {title}
          </h1>
        ) : null}

        {subtitle ? <p className={s.sub}>{subtitle}</p> : null}

        {rating ? (
          <div className={s.rating}>
            <a href={rating.href} className={s.ratingBadge} aria-label={ratingAria}>
              <span className={s.star} aria-hidden="true">★</span>
              <span className={s.ratingText}>
                {rating.value}/5 · {rating.count} atsauksmes · {rating.sourceLabel}
              </span>
            </a>
          </div>
        ) : null}

        {cta ? (
          <div className={s.ctaRow}>
            <a href={cta.href} className={s.linkButton} aria-label={cta.label}>
              {cta.label}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
