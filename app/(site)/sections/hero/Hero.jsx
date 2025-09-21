import s from './Hero.module.scss';

export default function Hero({
  id = 'hero',
  title,
  subtitle,
  rating,
  cta,
  align = 'center',
  background = 'gradient',

  // Desktop / tablet background image
  imageSrc = '/images/hero.png',
  posDesktop,                 // e.g. '50% 20%' (desktop BG framing)
  offsetDesktop,              // number (vh) or string ('-6vh')

  // Mobile text offset (vh or 'px')
  offsetMobile,

  // MOBILE INLINE IMAGE (since BG is off in mobileInline mode)
  imageInlineMobile = true,   // keep mobile inline mode
  imageLiftMobile = 0,        // lift image UP from bottom (px or 'vh'), does NOT grow hero
  imageMaxWidthMobile = 1100, // px cap for inline image on mobile
}) {
  const sectionClass = [
    s.hero,
    align === 'start' ? s.alignStart : s.alignCenter,
    background === 'gradient' ? s.bgGradient : null,
    imageInlineMobile ? s.mobileInline : null,
  ].filter(Boolean).join(' ');

  const styleVars = {
    '--hero-image': `url('${imageSrc}')`,

    ...(posDesktop && {
      '--hero-pos-x-d': posDesktop.split(' ')[0],
      '--hero-pos-y-d': posDesktop.split(' ')[1] || '50%',
    }),

    ...(offsetDesktop != null && {
      '--hero-offset-d':
        typeof offsetDesktop === 'number' ? `${offsetDesktop}vh` : String(offsetDesktop),
    }),
    ...(offsetMobile != null && {
      '--hero-offset-m':
        typeof offsetMobile === 'number' ? `${offsetMobile}vh` : String(offsetMobile),
    }),

    // mobile inline image tuning
    ...(imageLiftMobile != null && {
      '--hero-media-lift-m':
        typeof imageLiftMobile === 'number' ? `${imageLiftMobile}px` : String(imageLiftMobile),
    }),
    ...(imageMaxWidthMobile && {
      '--hero-media-maxw-m':
        typeof imageMaxWidthMobile === 'number'
          ? `${imageMaxWidthMobile}px`
          : String(imageMaxWidthMobile),
    }),
  };

  const ratingAria =
    rating?.ariaLabel ??
    (rating ? `${rating.sourceLabel} vērtējums ${rating.value} no 5, ${rating.count} atsauksmes` : undefined);

  return (
    <section id={id} className={sectionClass} aria-labelledby={`${id}-title`} style={styleVars}>
      <div className={s.container}>
        {rating && (
          <div className={s.rating}>
            <a href={rating.href} className={s.ratingBadge} aria-label={ratingAria}>
              <span className={s.star} aria-hidden>★</span>
              <span className={s.ratingText}>
                {rating.value}/5 · {rating.count} atsauksmes · {rating.sourceLabel}
              </span>
            </a>
          </div>
        )}

        {title && <h1 id={`${id}-title`} className={s.heading}>{title}</h1>}
        {subtitle && <p className={s.sub}>{subtitle}</p>}

        {cta && (
          <div className={s.ctaRow}>
            <a href={cta.href} className={s.linkButton} aria-label={cta.label}>{cta.label}</a>
          </div>
        )}
      </div>

      {/* Inline image shows on mobile only; anchored to bottom then lifted up by imageLiftMobile */}
      {imageInlineMobile && (
        <div className={s.mediaWrap}>
          <img src={imageSrc} alt="" className={s.media} />
        </div>
      )}
    </section>
  );
}
