'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import s from './ModelGrid.module.scss';

const PLACEHOLDER = '/images/placeholders/phone.webp';

function resolveSrc(d) {
  const url = (d?.image && String(d.image).trim()) ||
              (d?.imagePath && `/images/${String(d.imagePath).trim().replace(/^\/+/, '')}`) ||
              '';
  return url;
}

function ImageWithFallback({ src, alt, className }) {
  const PLACEHOLDER = '/images/placeholders/phone.webp';
  const normalized = (src || '').trim();

  const [current, setCurrent] = useState(PLACEHOLDER);
  const [attemptedSrc, setAttemptedSrc] = useState(''); // remember what we tried

  // Reset when the incoming src changes
  useEffect(() => {
    setCurrent(PLACEHOLDER);
    setAttemptedSrc('');
  }, [normalized]);

  // After mount, attempt to load the real src ONCE per value
  useEffect(() => {
    if (!normalized) return;
    if (attemptedSrc === normalized) return; // already tried this URL
    setAttemptedSrc(normalized);
    setCurrent(normalized);
  }, [normalized, attemptedSrc]);

  const handleError = useCallback(() => {
    // If real image fails, stick to placeholder (no further retries for this src)
    if (current !== PLACEHOLDER) setCurrent(PLACEHOLDER);
  }, [current]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={handleError}
      draggable={false}
    />
  );
}


export default function ModelGrid({ devices = [], baseHref }) {
  // Deduplicate
  const seen = new Set();
  const list = [];
  for (const d of devices) {
    const k = `${d.category || '-'}:${d.brandSlug || '-'}:${d.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    list.push(d);
  }

  if (list.length === 0) {
    return <p className={s.empty}>Šobrīd modeļi nav pieejami.</p>;
  }

  return (
    <div className={s.grid}>
      {list.map((d) => {
        const key = `${d.category || '-'}:${d.brandSlug || '-'}:${d.slug}`;
        const href = `${baseHref}/${d.slug}`;
        const alt =
          (d?.name && `${d.name} remonts`) ||
          (d?.brand && d?.slug && `${d.brand} ${d.slug} remonts`) ||
          'Tālruņa attēls';
        const src = resolveSrc(d);

        return (
          <Link key={key} href={href} className={s.card}>
            <ImageWithFallback src={src} alt={alt} className={s.img} />
            <div className={s.meta}>
              <h3 className={s.name}>{d.name}</h3>
              {d.year && <div className={s.sub}>{d.year}</div>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
