'use client';

import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';

import GoogleReviewsBadge from '@sections/reviews/GoogleReviewsBadge';

import LandingTrustBar from './HeroTrustBar';

import s from './IphoneHero.module.scss';

export default function IphoneHero({
  locale = 'lv',
  reviewsSummary,

  title = 'Aifonu labošana',
  highlight = 'tajā pašā dienā',

  imageSrc = '/images/categories/landing_hero.webp',
  imageAlt = 'iLab remonta darbnīcās Rīgā',
  imageWidth = 900,
  imageHeight = 900,

  headingId = 'hero-title',
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
            sizes="(min-width: 1024px) 44vw, (min-width: 768px) 52vw, 96vw"
          />
        </div>
      </div>

      <div className={s.inner}>
        <div className={s.textCol}>
          <div className={s.rating}>
            <GoogleReviewsBadge locale={locale} data={reviewsSummary} />
          </div>

          <h1 id={headingId} className={s.heading}>
            {title}
            {highlight ? <span>{highlight}</span> : null}
          </h1>

          <div className={s.sub}>
            <span className={s.subDesktop}>
              Displeju, bateriju un citu bojājumu novēršana mūsu darbnīcās{' '}
              <a href="#domina" className={s.locationLink}>
                <FaLocationDot aria-hidden="true" />
                <span>T/C Domina Shopping</span>
              </a>{' '}
              un{' '}
              <a href="#spice" className={s.locationLink}>
                <FaLocationDot aria-hidden="true" />
                <span>T/C Spice Life</span>
              </a>
            </span>

            <span className={s.subMobile}>
              <a href="#domina" className={s.locationLink}>
                <FaLocationDot aria-hidden="true" />
                <span>T/C Domina Shopping</span>
              </a>{' '}
              un{' '}
              <a href="#spice" className={s.locationLink}>
                <FaLocationDot aria-hidden="true" />
                <span>T/C Spice Life</span>
              </a>
            </span>
          </div>

          <LandingTrustBar />
        </div>
      </div>
    </section>
  );
}