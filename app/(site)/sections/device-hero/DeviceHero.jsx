

import Image from 'next/image';
import s from './DeviceHero.module.scss';

/**
 * DeviceHero
 * - Overlaps header via negative margin on the <section>
 * - Image bleeds outside container on desktop via abs-pos .media
 * - This version adds copy offsets (desktop/mobile) so text can be nudged down
 *
 * Props:
 *  image: string (required to show image)
 *  alt?: string
 *  focal?: 'right'|'left'|'center' (default 'right')
 *  overlapDesktop?: number    // px; how far hero climbs into header on ≥960px (default 96)
 *  overlapMobile?: number     // px; how far hero climbs into header on <960px (default 16)
 *  maxHeight?: number         // px; max visual height of the hero image (default 520)
 *  bodyHtml?: string|null     // optional HTML copy (SEO-oriented)
 *  copyOffsetDesktop?: number // px; nudge copy downward on desktop (default 32)
 *  copyOffsetMobile?: number  // px; nudge copy downward on mobile  (default 8)
 */
export default function DeviceHero({
  image,
  alt = '',
  focal = 'right',
  overlapDesktop = 96,
  overlapMobile = 16,
  maxHeight = 520,
  bodyHtml = null,
  copyOffsetDesktop = 32,
  copyOffsetMobile = 8,
}) {
  const hasImage = Boolean(image);
  const hasCopy = Boolean(bodyHtml);
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
        // NEW: copy offsets (can be tuned per-model or left as defaults)
        '--copy-offset-desktop': `${copyOffsetDesktop}px`,
        '--copy-offset-mobile': `${copyOffsetMobile}px`,
      }}
      aria-label="Ierīces vizuālais hero"
    >
      <div className={s.inner}>
        {hasCopy && (
          <div
            className={s.copy}
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
