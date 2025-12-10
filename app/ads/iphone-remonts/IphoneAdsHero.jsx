// app/ads/iphone-remonts/IphoneAdsHero.jsx

'use client';

import Image from 'next/image';
import Button from '@components/button/Button';
import GoogleReviewsBadge from '@sections/reviews/GoogleReviewsBadge';

import s from './IphoneAdsHero.module.scss';

export default function IphoneAdsHero() {
  return (
    <section className={s.hero} aria-labelledby="iphone-ads-hero-title">
      <div className={s.inner}>
        {/* Text column (shown on the right on desktop via flex reverse) */}
        <div className={s.textCol}>
          <div className={s.rating}>
            <GoogleReviewsBadge />
          </div>

          <h1 id="iphone-ads-hero-title" className={s.heading}>
            iPhone remonts tajā pašā dienā
          </h1>

          <p className={s.sub}>
            Displeja un baterijas maiņa, uzlādes un citu bojājumu remonts.
            90&nbsp;dienu garantija, divi servisa centri&nbsp;Rīgā – Domina un Spice Home.
          </p>

          <div className={s.ctaRow}>
            <Button
              variant="secondary"
              size="lg"
              href="#services"
              aria-label="Skatīt iPhone remontus"
            >
              Skatīt iPhone remontus
            </Button>

            <Button
              variant="primary"
              size="lg"
              href="#price-teaser"
              aria-label="Skatīt remontu cenas"
            >
              Skatīt remontu cenas
            </Button>
          </div>
        </div>

        {/* Image column (appears left on desktop) */}
        <div className={s.imageCol}>
          <div className={s.imageFrame}>
            <Image
              src="/images/categories/iphone_remonts.webp"
              alt="iPhone remonts iLab servisa centros Rīgā"
              width={900}
              height={900}
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
