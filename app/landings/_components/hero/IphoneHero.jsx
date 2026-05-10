'use client';

import Image from 'next/image';
import Button from '@components/button/Button';
import GoogleReviewsBadge from '@sections/reviews/GoogleReviewsBadge';

import s from './IphoneHero.module.scss';

const DEFAULT_REPAIRS = [
  'Ekrāna maiņa',
  'Baterijas maiņa',
  'Uzlādes ligzda',
  'Diagnostika',
];

const DEFAULT_TRUST_ITEMS = [
  'Remonts tajā pašā dienā',
  '90 dienu garantija',
  'Domina & Spice',
];

export default function IphoneAdsHeroV2({
  locale = 'lv',
  reviewsSummary,

  title = 'iPhone remonts tajā pašā dienā',
  highlight = 'Rīgā',
  eyebrow = 'iPhone remonts Rīgā',
  subtitle = 'Ekrāna, baterijas un citu bojājumu remonts iLab darbnīcās Domina un Spice.',
  disclaimer =
    'iLab ir neatkarīga remonta darbnīca un NAV Apple autorizēts servisa centrs. iPhone ir Apple Inc. preču zīme.',

  repairs = DEFAULT_REPAIRS,
  trustItems = DEFAULT_TRUST_ITEMS,

  imageSrc = '/images/categories/iphone_remonts.webp',
  imageAlt = 'iPhone remonts iLab darbnīcās Rīgā',
  imageWidth = 900,
  imageHeight = 900,

  primaryCta = {
    label: 'Uzzināt remonta cenu',
    href: '#pieraksts',
    variant: 'primary',
    ariaLabel: 'Uzzināt iPhone remonta cenu',
  },
  secondaryCta = {
    label: 'Skatīt pakalpojumus',
    href: '#services',
    variant: 'secondary',
    ariaLabel: 'Skatīt iPhone remonta pakalpojumus',
  },

  headingId = 'iphone-ads-hero-title',
}) {
  const primaryHref = primaryCta?.href || '#pieraksts';
  const secondaryHref = secondaryCta?.href || '#services';

  return (
    <section className={s.hero} aria-labelledby={headingId}>
      <div className={s.bgGlow} aria-hidden="true" />

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

          {subtitle ? <p className={s.sub}>{subtitle}</p> : null}

          {repairs?.length ? (
            <ul className={s.repairList} aria-label="Populārākie iPhone remonta pakalpojumi">
              {repairs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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

          {trustItems?.length ? (
            <ul className={s.trustList} aria-label="iLab priekšrocības">
              {trustItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {disclaimer ? (
            <p className={s.disclaimer} role="note" aria-label="Svarīga informācija">
              {disclaimer}
            </p>
          ) : null}
        </div>

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
              sizes="(min-width: 1024px) 50vw, 92vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}