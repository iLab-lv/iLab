'use client';

import Image from 'next/image';
import Button from '@components/button/Button';
import GoogleReviewsBadge from '@sections/reviews/GoogleReviewsBadge';

import s from './IphoneAdsHero.module.scss';

export default function IphoneAdsHero({
  // Locale / reviews
  locale = 'lv',
  reviewsSummary,

  // Copy
  title = 'iPhone remonts Rīgā',
  brandLine = 'iLab - neatkarīga remonta darbnīca Rīgā.',
  subtitle = 'Ekrāna un baterijas nomaiņa klātienē mūsu darbnīcās Rīgā.',
  disclaimer =
    'iLab ir neatkarīga remonta darbnīca un NAV Apple autorizēts servisa centrs. iPhone ir Apple Inc. preču zīme.',

  // Image
  imageSrc = '/images/categories/iphone_remonts.webp',
  imageAlt = 'iPhone remonts iLab remonta darbnīcās Rīgā',
  imageWidth = 900,
  imageHeight = 900,

  // Primary/Secondary in-hero buttons
  primaryCta = {
    label: 'Pieteikt remontu',
    href: '#pieraksts',
    variant: 'primary',
    ariaLabel: 'Pieteikt remontu',
  },
  secondaryCta = {
    label: 'Skatīt pakalpojumus',
    href: '#services',
    variant: 'secondary',
    ariaLabel: 'Skatīt remonta pakalpojumus',
  },

  // a11y
  headingId = 'iphone-ads-hero-title',
}) {
  const primaryHref = primaryCta?.href || '#pieraksts';
  const secondaryHref = secondaryCta?.href || '#services';

  return (
    <section className={s.hero} aria-labelledby={headingId}>
      <div className={s.inner}>
        <div className={s.textCol}>
          <div className={s.rating}>
            <GoogleReviewsBadge locale={locale} data={reviewsSummary} />
          </div>

          <h1 id={headingId} className={s.heading}>
            {title}
          </h1>

          {brandLine ? <p className={s.brandLine}>{brandLine}</p> : null}

          {subtitle ? <p className={s.sub}>{subtitle}</p> : null}

          {disclaimer ? (
            <p className={s.disclaimer} role="note" aria-label="Svarīga informācija">
              {disclaimer}
            </p>
          ) : null}

          <div className={s.ctaRow}>
            {primaryCta?.label && primaryHref ? (
              <Button
                variant={primaryCta.variant || 'primary'}
                size="lg"
                href={primaryHref}
                aria-label={primaryCta.ariaLabel || primaryCta.label}
              >
                {primaryCta.label}
              </Button>
            ) : null}

            {secondaryCta?.label && secondaryHref ? (
              <Button
                variant={secondaryCta.variant || 'secondary'}
                size="lg"
                href={secondaryHref}
                aria-label={secondaryCta.ariaLabel || secondaryCta.label}
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>

        <div className={s.imageCol}>
          <div className={s.imageFrame}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              priority
              fetchPriority="high"
              className={s.image}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}