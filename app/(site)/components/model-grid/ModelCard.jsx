'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import s from './SeriesGrid.module.scss';

const PLACEHOLDER = '/images/placeholders/phone.webp';

// Decide which URL to try (direct `image` or local logical `imagePath`)
function resolveSrc(d) {
  const direct = (d?.image && String(d.image).trim()) || '';
  if (direct) return direct;
  const pathy = (d?.imagePath && String(d.imagePath).trim()) || '';
  if (pathy) return `/images/${pathy.replace(/^\/+/, '')}`;
  return '';
}

/**
 * Image that:
 * - starts as placeholder (pre-hydration safe),
 * - tries the real URL once after mount,
 * - falls back to placeholder if it 404s (no retry loop).
 */
function ImgWithFallback({ src, alt, className }) {
  const normalized = (src || '').trim();
  const [current, setCurrent] = useState(PLACEHOLDER);
  const [attemptedSrc, setAttemptedSrc] = useState('');

  // Reset on src change
  useEffect(() => {
    setCurrent(PLACEHOLDER);
    setAttemptedSrc('');
  }, [normalized]);

  // Attempt real src ONCE per src value
  useEffect(() => {
    if (!normalized) return;
    if (attemptedSrc === normalized) return;
    setAttemptedSrc(normalized);
    setCurrent(normalized);
  }, [normalized, attemptedSrc]);

  const onError = useCallback(() => {
    if (current !== PLACEHOLDER) setCurrent(PLACEHOLDER);
  }, [current]);

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={onError}
      draggable={false}
    />
  );
}

export default function ModelCard({ device, baseHref }) {
  const name = device?.name || '';
  const href = `${baseHref}/${device.slug}`;
  const src = resolveSrc(device);

  // Full phrase for accessibility/SEO (no year to avoid ambiguity)
  const fullLabel = `${name} remonts un cenas`.trim();

  // Prefer “Brand Model remonts un cenas” if name missing
  const alt =
    (device?.name && `${device.name} remonts un cenas`) ||
    (device?.brand && device?.slug && `${device.brand} ${device.slug} remonts un cenas`) ||
    'Tālruņa attēls';

  return (
    <Link href={href} className={s.card} aria-label={fullLabel}>
      <ImgWithFallback src={src} alt={alt} className={s.img} />

      <div className={s.meta}>
        <h3 className={s.name}>
          {/* First line: model name + subtle suffix (this line clamps on mobile) */}
          <span className={s.modelLine}>
            {name}
            <span className={s.remontsSuffix}> remonts un cenas</span>
          </span>
          {/* Year removed from UI to avoid “2024 prices” confusion */}
        </h3>
      </div>
    </Link>
  );
}
