// app/ads/iphone-remonts/IphoneAdsHero.jsx

'use client';

import Image from 'next/image';
import Button from '@components/button/Button';
import GoogleReviewsBadge from '@sections/reviews/GoogleReviewsBadge';

import s from './IphoneAdsHero.module.scss';

export default function IphoneAdsHero({
  title = 'Mobilo ierīču serviss Rīgā',
  subtitle = (
    <>
      Displeja un baterijas maiņa, uzlādes un citu bojājumu remonts.
      90&nbsp;dienu garantija, divi servisa centri&nbsp;Rīgā – Domina un Spice Home.
    </>
  ),

  // Image
  imageSrc = '/images/categories/iphone_remonts.webp',
  imageAlt = 'iPhone remonts iLab servisa centros Rīgā',
  imageWidth = 900,
  imageHeight = 900,

  // Primary/Secondary in-hero buttons (anchors)
  primaryCta = {
    label: 'Skatīt iPhone remontu cenas',
    href: '#price-teaser',
    variant: 'primary',
    ariaLabel: 'Skatīt remontu cenas',
  },
  secondaryCta = {
    label: 'Skatīt servisa darbus',
    href: '#services',
    variant: 'secondary',
    ariaLabel: 'Skatīt iPhone remontus',
  },

  // a11y
  headingId = 'iphone-ads-hero-title',
}) {
  return (
    <section className={s.hero} aria-labelledby={headingId}>
      <div className={s.inner}>
        {/* Text column (shown on the right on desktop via flex reverse) */}
        <div className={s.textCol}>
          <div className={s.rating}>
            <GoogleReviewsBadge />
          </div>

          <h1 id={headingId} className={s.heading}>
            {title}
          </h1>

          <p className={s.sub}>{subtitle}</p>

          <div className={s.ctaRow}>
            {secondaryCta?.label && secondaryCta?.href && (
              <Button
                variant={secondaryCta.variant || 'secondary'}
                size="lg"
                href={secondaryCta.href}
                aria-label={secondaryCta.ariaLabel || secondaryCta.label}
              >
                {secondaryCta.label}
              </Button>
            )}

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

        {/* Image column (appears left on desktop) */}
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
