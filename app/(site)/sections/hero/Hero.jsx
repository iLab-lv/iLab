import Image from 'next/image';
import Button from '@components/button/Button';
import GoogleReviewsBadge from '../reviews/GoogleReviewsBadge';
import { getHeroContent } from './hero.i18n';
import s from './Hero.module.scss';

export default function Hero({
  id = 'hero',
  locale = 'lv',
  variant = 'default',

  title,
  subtitle,
  cta,
  secondaryCta,
  reviewsSummary,

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
  const content = getHeroContent(locale, variant);

  const sectionTitle = title || content.title;
  const sectionSubtitle = subtitle || content.subtitle;
  const sectionCta = cta || content.cta;
  const sectionSecondaryCta = secondaryCta || content.secondaryCta;

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
    content.imageAlt ||
    (sectionTitle
      ? `${sectionTitle} — iLab serviss Rīgā`
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
          <GoogleReviewsBadge locale={locale} data={reviewsSummary} />
        </div>

        {sectionTitle && (
          <h1 id={`${id}-title`} className={s.heading}>
            {sectionTitle}
          </h1>
        )}

        {sectionSubtitle && <p className={s.sub}>{sectionSubtitle}</p>}

        {(sectionCta || sectionSecondaryCta) && (
          <div className={s.ctaRow}>
            {sectionCta && (
              <Button
                variant={sectionCta.variant || 'secondary'}
                size="lg"
                href={sectionCta.href}
                aria-label={sectionCta.label}
              >
                {sectionCta.label}
              </Button>
            )}

            {sectionSecondaryCta && (
              <Button
                variant={sectionSecondaryCta.variant || 'primary'}
                size="lg"
                href={sectionSecondaryCta.href}
                aria-label={sectionSecondaryCta.label}
              >
                {sectionSecondaryCta.label}
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