'use client';

import Image from 'next/image';
import s from './DeviceHero.module.scss';

/**
 * DeviceHero
 * A responsive hero band that:
 * - overlaps the page header (small on mobile, larger on desktop)
 * - bleeds the device image to the viewport edge on desktop
 * - shows optional SEO copy on the left (mobile: copy above image)
 *
 * Props:
 *  image: string              // image src (required to show image)
 *  alt?: string               // image alt
 *  focal?: 'right'|'left'|'center'  (default 'right')
 *  overlapDesktop?: number    // px; negative top margin amount on ≥960px (default 96)
 *  overlapMobile?: number     // px; negative top margin amount on <960px (default 16)
 *  maxHeight?: number         // px; max visual height of the hero image (default 520)
 *  bodyHtml?: string|null     // optional HTML copy (SEO-oriented)
 */
export default function DeviceHero({
  image,
  alt = '',
  focal = 'right',
  overlapDesktop = 96,
  overlapMobile = 16,
  maxHeight = 520,
  bodyHtml = null,
}) {
  const hasImage = Boolean(image);
  const hasCopy = Boolean(bodyHtml);

  // if there's truly nothing to show, render nothing
  if (!hasImage && !hasCopy) return null;

  const focalClass =
    focal === 'left' ? s.focalLeft : focal === 'center' ? s.focalCenter : s.focalRight;

  return (
    <section
      className={`${s.hero} ${focalClass}`}
      style={{
        '--overlap-desktop': `${overlapDesktop}px`,
        '--overlap-mobile': `${overlapMobile}px`,
        '--hero-max-h': `${maxHeight}px`,
      }}
      aria-label="Ierīces vizuālais hero"
    >
      <div className={s.inner}>
        {hasCopy && (
          <div
            className={s.copy}
            // bodyHtml is controlled content from your data files
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )}

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
      </div>
    </section>
  );
}
