'use client';

import Image from 'next/image';
import Button from '@components/button/Button';
import GoogleReviewsBadge from '../reviews/GoogleReviewsBadge';
import s from './Hero.module.scss';

export default function Hero({
  id = 'hero',
  title,
  subtitle,
  // rating,  // no longer used; badge handles its own data
  cta,
  align = 'center',
  background = 'gradient',

  // Desktop / tablet background image (used via CSS var)
  imageSrc = '/images/hero.webp',
  posDesktop,                 // e.g. '50% 20%' (desktop BG framing)
  offsetDesktop,              // number (vh) or string ('-6vh')

  // Mobile text offset (vh or 'px')
  offsetMobile,

  // MOBILE INLINE IMAGE (since BG is off in mobileInline mode)
  imageInlineMobile = true,   // keep mobile inline mode
  imageLiftMobile = 0,        // lift image UP from bottom (px or 'vh'), does NOT grow hero
  imageMaxWidthMobile = 1100, // px cap for inline image on mobile

  // Optional intrinsic size for next/image (avoid layout shifts)
  imageWidth = 1600,
  imageHeight = 900,

  // NEW: SEO-oriented alt for hero image
  imageAlt, // string
}) {
  const sectionClass = [
    s.hero,
    align === 'start' ? s.alignStart : s.alignCenter,
    background === 'gradient' ? s.bgGradient : null,
    imageInlineMobile ? s.mobileInline : null,
  ]
    .filter(Boolean)
    .join(' ');

  const styleVars = {
    '--hero-image': `url('${imageSrc}')`,

    ...(posDesktop && {
      '--hero-pos-x-d': posDesktop.split(' ')[0],
      '--hero-pos-y-d': posDesktop.split(' ')[1] || '50%',
    }),

    ...(offsetDesktop != null && {
      '--hero-offset-d':
        typeof offsetDesktop === 'number'
          ? `${offsetDesktop}vh`
          : String(offsetDesktop),
    }),
    ...(offsetMobile != null && {
      '--hero-offset-m':
        typeof offsetMobile === 'number'
          ? `${offsetMobile}vh`
          : String(offsetMobile),
    }),

    // mobile inline image tuning
    ...(imageLiftMobile != null && {
      '--hero-media-lift-m':
        typeof imageLiftMobile === 'number'
          ? `${imageLiftMobile}px`
          : String(imageLiftMobile),
    }),
    ...(imageMaxWidthMobile && {
      '--hero-media-maxw-m':
        typeof imageMaxWidthMobile === 'number'
          ? `${imageMaxWidthMobile}px`
          : String(imageMaxWidthMobile),
    }),
  };

  // Default, SEO-oriented alt:
  const computedAlt =
    imageAlt ||
    (title
      ? `${title} — iLab serviss Rīgā`
      : 'iLab — mobilo telefonu, planšetdatoru un datoru remonts Rīgā');

  return (
    <section
      id={id}
      className={sectionClass}
      aria-labelledby={`${id}-title`}
      style={styleVars}
    >
      <div className={s.container}>
        <div className={s.rating}>
          <GoogleReviewsBadge />
        </div>

        {title && (
          <h1 id={`${id}-title`} className={s.heading}>
            {title}
          </h1>
        )}
        {subtitle && <p className={s.sub}>{subtitle}</p>}

        {cta && (
          <div className={s.ctaRow}>
            <Button
              variant="ctaChip"
              chipDir="right"
              size="lg"
              href={cta.href}
              aria-label={cta.label}
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>

      {/* Inline image shows on mobile only; anchored to bottom then lifted up by imageLiftMobile */}
      {imageInlineMobile && (
        <div className={s.mediaWrap}>
          <Image
            src={imageSrc}
            alt={computedAlt}
            className={s.media}
            width={imageWidth}
            height={imageHeight}
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
      )}
    </section>
  );
}
