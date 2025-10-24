'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import s from './DeviceHero.module.scss';

/**
 * Simple in-flow DeviceHero
 * - image overlaps upward into header on ≥960px
 * - stays contained on mobile
 * - runtime fallback to placeholder if the source 404s
 */
export default function DeviceHero({
  image,
  alt = '',
  bodyHtml = null,
  focal = 'right', // 'left' | 'center' | 'right'
  placeholderSrc = '/images/placeholders/phone.webp',
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

  return (
    <section className={`${s.hero} ${focalClass}`} aria-label="Ierīces vizuālais hero">
      <div className={s.inner}>
        {hasImage && (
          <div className={s.media} aria-hidden={hasCopy ? 'true' : undefined}>
            <Image
              src={currentSrc}
              alt={alt || 'Ierīces attēls'}
              fill
              priority
              sizes="(max-width: 959px) 80vw, 50vw"
              onError={onError}
            />
          </div>
        )}

        {hasCopy && (
          <div className={s.copy} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        )}
      </div>
    </section>
  );
}
