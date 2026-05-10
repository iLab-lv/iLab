'use client';

import Image from 'next/image';

import GoogleReviewsBadge from '@sections/reviews/GoogleReviewsBadge';

import LandingTrustBar from './HeroTrustBar';

import s from './IphoneHero.module.scss';

export default function IphoneHero({
  locale = 'lv',
  reviewsSummary,

  eyebrow = 'iPhone remonts Rīgā',

  title = 'iPhone remonts',
  highlight = 'tajā pašā dienā',

  subtitle = (
    <>
      Displeju, bateriju un citu iPhone bojājumu remonts mūsu servisa centros{' '}
      <span>T/C Domina Shopping</span> un <span>T/C Spice Home</span>.
    </>
  ),

  imageSrc = '/images/categories/iphone_remonts.webp',
  imageAlt = 'iPhone remonts iLab remonta darbnīcās Rīgā',
  imageWidth = 900,
  imageHeight = 900,

  headingId = 'iphone-hero-title',
}) {
  return (
    <section className={s.hero} aria-labelledby={headingId}>
      <div className={s.bgGlow} aria-hidden="true" />

      <div className={s.imageCol} aria-hidden="true">
        <div className={s.imageAura} />
        <div className={s.imageFrame}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority
            fetchPriority="high"
            className={s.image}
            sizes="(min-width: 1024px) 44vw, (min-width: 768px) 52vw, 86vw"
          />
        </div>
      </div>

      <div className={s.inner}>
        <div className={s.textCol}>
          <div className={s.rating}>
            <GoogleReviewsBadge locale={locale} data={reviewsSummary} />
          </div>

          {eyebrow ? <p className={s.eyebrow}>{eyebrow}</p> : null}

          <h1 id={headingId} className={s.heading}>
            {title}
            {highlight ? <span>{highlight}</span> : null}
          </h1>

          {subtitle ? <div className={s.sub}>{subtitle}</div> : null}

          <LandingTrustBar />
        </div>
      </div>
    </section>
  );
}