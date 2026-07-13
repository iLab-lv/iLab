// app/(site)/sections/device-hero/DeviceHero.jsx
import Image from 'next/image';
import s from './DeviceHero.module.scss';

/**
 * DeviceHero - server-rendered hero with a shared media treatment and optional
 * brand logo overlay.
 * Key perf changes:
 * - No 'use client'
 * - No useEffect/useState (LCP image src is available immediately)
 * - sizes aligned to CSS (mobile 80vw, desktop capped)
 */
export default function DeviceHero({
  image,
  alt = '',
  bodyHtml = null,
  focal = 'right', // 'left' | 'center' | 'right'
  placeholderSrc = '/images/placeholders/phone.webp',

  // Brand visuals (optional)
  brandLogo = null,
  brandKey = null,
  // Logo placement tunables
  logoShift = '220px',
  logoShiftMobile = '0px',

  // Image tuning
  priority = false,
  sizes = '(max-width: 959px) 80vw, (max-width: 1439px) 50vw, 900px',
}) {
  const src = (image || '').trim() || (placeholderSrc || '').trim() || '';

  const hasImage = Boolean(src);
  const hasCopy = Boolean(bodyHtml);
  if (!hasImage && !hasCopy) return null;

  const focalClass =
    focal === 'left' ? s.focalLeft : focal === 'center' ? s.focalCenter : s.focalRight;

  const styleVars = {
    ...(logoShift ? { ['--logo-shift']: logoShift } : null),
    ...(logoShiftMobile ? { ['--logo-shift-mobile']: logoShiftMobile } : null),
  };

  return (
    <section
      className={`${s.hero} ${focalClass}`}
      aria-label="Ierīces vizuālais hero"
      data-brand={brandKey || undefined}
      style={styleVars}
    >
      <div className={s.inner}>
        {hasImage && (
          <div className={s.media} aria-hidden={hasCopy ? 'true' : undefined}>
            <span className={s.tint} aria-hidden="true" />

            <Image
              src={src}
              alt={alt || 'Ierīces attēls'}
              fill
              priority={priority}
              sizes={sizes}
            />

            {brandLogo && (
              <div className={s.brandOverlay} aria-hidden="true">
                <Image
                  src={brandLogo}
                  alt=""
                  width={160}
                  height={48}
                  sizes="160px"
                />
              </div>
            )}
          </div>
        )}

        {hasCopy && (
          <div className={s.copy} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        )}
      </div>
    </section>
  );
}
