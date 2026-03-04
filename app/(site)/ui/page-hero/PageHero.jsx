

import Image from 'next/image';
import s from './PageHero.module.scss';

// tiny classnames helper
function cx(...args) {
  return args.flat().filter(Boolean).join(' ');
}

/**
 * PageHero
 * - 1-col on mobile, 2-col (copy | media) from 960px
 * - Image overlaps header on desktop/tablet via --hero-overlap
 * - Mobile: contained (no overlap)
 * - Works in intrinsic mode (preferred) or fill mode (when width/height unknown)
 *
 * Props:
 *  - imageSrc: string (required)
 *  - alt: string (required for a11y)
 *  - children: ReactNode (hero copy)
 *  - focal: 'left' | 'center' | 'right' (default 'right')
 *  - bleed: 'none' | 'left' | 'right' (default 'right')
 *  - overlap: CSS length (default 'min(18vh, 220px)')
 *  - maxMediaWidth: CSS length (default '900px')
 *  - sizes: string for <Image> (default '(max-width: 959px) 80vw, (max-width: 1440px) 45vw, 900px')
 *  - priority: boolean (default false)
 *  - className: string
 *  - width, height: numbers (optional; if provided, uses intrinsic image mode)
 *  - aspectRatio: string (e.g. '9/16'); used only when width/height are NOT provided (fill mode)
 */
export default function PageHero({
  imageSrc,
  alt = '',
  children,
  focal = 'right',
  bleed = 'right',
  overlap = 'min(18vh, 220px)',
  maxMediaWidth = '900px',
  sizes = '(max-width: 959px) 80vw, (max-width: 1440px) 45vw, 900px',
  priority = false,
  className,
  width,
  height,
  aspectRatio = '9/16',
}) {
  if (!imageSrc && !children) return null;

  const styleVars = {
    ['--hero-overlap']: overlap,
    ['--hero-media-max']: maxMediaWidth,
    ['--container-max']: '1200px',
  };

  const intrinsic = Number.isFinite(width) && Number.isFinite(height);

  return (
    <section
      className={cx(
        s.hero,
        className,
        bleed === 'left' && s.bleedLeft,
        bleed === 'right' && s.bleedRight
      )}
      data-focal={focal}
      style={styleVars}
      aria-label="Hero"
    >
      <div className={s.inner}>
        {children && <div className={s.copy}>{children}</div>}

        {imageSrc && (
          <div
            className={cx(s.media, intrinsic ? s.modeIntrinsic : s.modeFill)}
            style={!intrinsic ? { aspectRatio } : undefined}
            aria-hidden={children ? 'true' : undefined}
          >
            {intrinsic ? (
              <Image
                src={imageSrc}
                alt={alt || 'Attēls'}
                width={width}
                height={height}
                sizes={sizes}
                priority={priority}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            ) : (
              <Image
                src={imageSrc}
                alt={alt || 'Attēls'}
                fill
                sizes={sizes}
                priority={priority}
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
