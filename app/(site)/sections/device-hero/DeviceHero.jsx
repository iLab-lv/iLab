'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import s from './DeviceHero.module.scss';

/**
 * DeviceHero with runtime 404 → placeholder fallback
 * - Tries `image` first; if it fails to load, swaps to `placeholderSrc`
 * - Treats empty strings as "missing"
 */
export default function DeviceHero({
  image,
  alt = '',
  bodyHtml = null,
  focal = 'right',
  placeholderSrc = '/images/placeholders/phone.webp',
}) {
  // Normalize incoming values
  const cleanedImage = (image || '').trim();
  const cleanedPlaceholder = (placeholderSrc || '').trim();

  // Start with the provided image if present, else placeholder
  const [currentSrc, setCurrentSrc] = useState(cleanedImage || cleanedPlaceholder);

  // Avoid infinite loops if placeholder also fails
  const triedPlaceholderRef = useRef(!cleanedImage); // true if we started on placeholder

  const handleImgError = () => {
    // If we haven't tried the placeholder yet and it's available, switch to it
    if (!triedPlaceholderRef.current && cleanedPlaceholder) {
      triedPlaceholderRef.current = true;
      setCurrentSrc(cleanedPlaceholder);
    }
  };

  const hasImage = Boolean(currentSrc);
  const hasCopy = Boolean(bodyHtml);
  if (!hasImage && !hasCopy) return null;

  const focalClass =
    focal === 'left' ? s.focalLeft : focal === 'center' ? s.focalCenter : s.focalRight;

  const isPlaceholder = currentSrc === cleanedPlaceholder;
  const effectiveAlt = isPlaceholder ? (alt || 'Ilustratīvs attēls') : alt;

  return (
    <section className={`${s.hero} ${focalClass}`} aria-label="Ierīces vizuālais hero">
      <div className={s.inner}>
        {hasImage && (
          <div className={s.media} aria-hidden={hasCopy ? 'true' : undefined}>
            <Image
              src={currentSrc}
              alt={effectiveAlt}
              fill
              priority
              sizes="(max-width: 959px) 80vw, 50vw"
              onError={handleImgError}
            />
          </div>
        )}

        {hasCopy && (
          <div
            className={s.copy}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )}
      </div>
    </section>
  );
}
