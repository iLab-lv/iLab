'use client';

import Image from 'next/image';
import s from './DeviceHero.module.scss';

/**
 * Minimal DeviceHero
 * Props:
 *  - image (string): required to render image block
 *  - alt (string): image alt
 *  - bodyHtml (string|null): optional SEO copy (renders below H1 area)
 *  - focal: 'right' | 'left' | 'center' (default 'right')
 */
export default function DeviceHero({
  image,
  alt = '',
  bodyHtml = null,
  focal = 'right',
}) {
  const hasImage = Boolean(image);
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
              src={image}
              alt={alt}
              fill
              priority
              sizes="(max-width: 959px) 80vw, 50vw"
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
