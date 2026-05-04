'use client';

import Image from 'next/image';
import Button from '@components/button/Button';
import GoogleReviewsBadge from '@sections/reviews/GoogleReviewsBadge';

import s from './AdsHero.module.scss';

export default function IphoneAdsHero({
  // Copy (ULTRA SAFE defaults)
  title = 'Ierīču apkope un tehniska palīdzība Rīgā',
  brandLine = 'iLab - klātienes ierīču apkalpošanas centri Rīgā.',
  subtitle = 'Apkalpošana notiek tikai klātienē mūsu servisa centros.',
  disclaimer = 'Svarīgi: mēs nesniedzam attālinātu tehnisko atbalstu, tiešsaistes konsultācijas vai palīdzību pa telefonu.',

  // Image (neutral)
  imageSrc = '/images/categories/iphone_remonts.webp',
  imageAlt = 'iLab servisa centri Rīgā',
  imageWidth = 900,
  imageHeight = 900,

  // Primary/Secondary in-hero buttons
  primaryCta = {
    label: 'Skatīt servisa centrus',
    href: '#locations',
    variant: 'primary',
    ariaLabel: 'Skatīt servisa centrus Rīgā',
  },

  // a11y
  headingId = 'ads-hero-title',
}) {
  return (
    <section className={s.hero} aria-labelledby={headingId}>
      <div className={s.inner}>
        {/* Text column */}
        <div className={s.textCol}>
          <div className={s.rating}>
            <GoogleReviewsBadge />
          </div>

          <h1 id={headingId} className={s.heading}>
            {title}
          </h1>

          {brandLine ? <p className={s.brandLine}>{brandLine}</p> : null}

          {subtitle ? <p className={s.sub}>{subtitle}</p> : null}

          {disclaimer ? (
            <div className={s.disclaimer} role="note" aria-label="Svarīga informācija">
              {disclaimer}
            </div>
          ) : null}

          <div className={s.ctaRow}>
            {primaryCta?.label && primaryCta?.href && (
              <Button
                variant={primaryCta.variant || 'primary'}
                size="lg"
                href={primaryCta.href}
                aria-label={primaryCta.ariaLabel || primaryCta.label}
              >
                {primaryCta.label}
              </Button>
            )}


          </div>
        </div>

        {/* Image column */}
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
