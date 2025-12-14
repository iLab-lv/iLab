// app/(site)/sections/hero/Hero.jsx
'use client';

import Image from 'next/image';
import Button from '@components/button/Button';
import GoogleReviewsBadge from '../reviews/GoogleReviewsBadge';
import s from './Hero.module.scss';

export default function Hero({
  id = 'hero',
  title,
  subtitle,
  cta,            // { label, href, variant? }
  secondaryCta,   // { label, href, variant? }
  tertiaryCta,    // { label, href, variant? }   ✅ NEW
  align = 'center',
  background = 'gradient',

  imageSrc = '/images/hero.webp',
  posDesktop,
  offsetDesktop,
  offsetMobile,
  imageInlineMobile = true,
  imageLiftMobile = 0,
  imageMaxWidthMobile = 1100,
  imageWidth = 1600,
  imageHeight = 900,
  imageAlt,
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

        {(cta || secondaryCta || tertiaryCta) && (
          <div className={s.ctaRow}>
            {cta && (
              <Button
                variant={cta.variant || 'secondary'} // outlined by default
                size="lg"
                href={cta.href}
                aria-label={cta.label}
              >
                {cta.label}
              </Button>
            )}

            {secondaryCta && (
              <Button
                variant={secondaryCta.variant || 'primary'} // solid by default
                size="lg"
                href={secondaryCta.href}
                aria-label={secondaryCta.label}
              >
                {secondaryCta.label}
              </Button>
            )}

            {tertiaryCta && (
              <Button
                variant={tertiaryCta.variant || 'ghost'} // ✅ pick whatever your Button supports
                size="lg"
                href={tertiaryCta.href}
                aria-label={tertiaryCta.label}
              >
                {tertiaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>

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
