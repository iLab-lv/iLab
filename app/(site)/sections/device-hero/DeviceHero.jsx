'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import s from './DeviceHero.module.scss';

/**
 * DeviceHero — hero with always-on tint + optional brand logo overlay
 * - Desktop image overlaps upward into header
 * - Mobile stays contained
 * - Brand logo sits at TOP, offset horizontally from center
 * - Tint is ALWAYS rendered; brand-specific via data-brand or overridden via `tint` prop
 */
export default function DeviceHero({
  image,
  alt = '',
  bodyHtml = null,
  focal = 'right',                 // 'left' | 'center' | 'right'
  placeholderSrc = '/images/placeholders/phone.webp',

  // Brand visuals (optional)
  brandLogo = null,               // e.g. "/images/logos/samsung-logo.svg"
  brandKey = null,                // e.g. "samsung" → used for data-brand styling hooks
  tint = null,                    // CSS color string; overrides brand preset (e.g. 'rgba(0,120,255,.22)')

  // Logo placement tunables (can override per page)
  logoShift = '220px',            // desktop horizontal shift from center (+ → right)
  logoShiftMobile = '0px',        // mobile horizontal shift from center
}) {
  const srcInitial = (image || '').trim() || (placeholderSrc || '').trim();
  const [currentSrc, setCurrentSrc] = useState(srcInitial);
  const triedPlaceholderRef = useRef(srcInitial === placeholderSrc);

  const onError = () => {
    if (!triedPlaceholderRef.current && placeholderSrc) {
      triedPlaceholderRef.current = true;
      setCurrentSrc(placeholderSrc);
    }
  };

  const hasImage = Boolean(currentSrc);
  const hasCopy = Boolean(bodyHtml);
  if (!hasImage && !hasCopy) return null;

  const focalClass =
    focal === 'left' ? s.focalLeft : focal === 'center' ? s.focalCenter : s.focalRight;

  // Inline CSS vars: only set when a prop is provided (otherwise brand preset/default applies)
  const styleVars = {
    ...(tint ? { ['--brand-tint']: tint } : null),
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
            {/* Tint is always on; color comes from --brand-tint (brand preset or override) */}
            <span className={s.tint} aria-hidden="true" />

            <Image
              src={currentSrc}
              alt={alt || 'Ierīces attēls'}
              fill
              priority
              sizes="(max-width: 959px) 100vw, 60vw"
              onError={onError}
            />

            {brandLogo && (
              <div className={s.brandOverlay} aria-hidden="true">
                <Image
                  src={brandLogo}
                  alt=""           // decorative; brand is in H1/metadata
                  width={160}
                  height={48}
                  priority={false}
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
