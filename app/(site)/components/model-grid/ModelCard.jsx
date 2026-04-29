'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import s from './SeriesGrid.module.scss';

const PLACEHOLDER = '/images/placeholders/phone.webp';

function getModelCardStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      suffix: ' ремонт и цены',
      imageFallbackAlt: 'Изображение телефона',
      altFallback: (brand, slug) => `${brand} ${slug} ремонт и цены`,
      label: (name) => `${name} ремонт и цены`.trim(),
      alt: (name) => `${name} ремонт и цены`,
    };
  }

  return {
    suffix: ' remonts un cenas',
    imageFallbackAlt: 'Tālruņa attēls',
    altFallback: (brand, slug) => `${brand} ${slug} remonts un cenas`,
    label: (name) => `${name} remonts un cenas`.trim(),
    alt: (name) => `${name} remonts un cenas`,
  };
}

function resolveSrc(d) {
  const direct = (d?.image && String(d.image).trim()) || '';
  if (direct) return direct;

  const pathy = (d?.imagePath && String(d.imagePath).trim()) || '';
  if (pathy) return `/images/${pathy.replace(/^\/+/, '')}`;

  return '';
}

function ImgWithFallback({ src, alt, className }) {
  const normalized = (src || '').trim();
  const [current, setCurrent] = useState(PLACEHOLDER);
  const [attemptedSrc, setAttemptedSrc] = useState('');

  useEffect(() => {
    setCurrent(PLACEHOLDER);
    setAttemptedSrc('');
  }, [normalized]);

  useEffect(() => {
    if (!normalized) return;
    if (attemptedSrc === normalized) return;

    setAttemptedSrc(normalized);
    setCurrent(normalized);
  }, [normalized, attemptedSrc]);

  const onError = useCallback(() => {
    if (current !== PLACEHOLDER) setCurrent(PLACEHOLDER);
  }, [current]);

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

export default function ModelCard({ device, baseHref, locale = 'lv' }) {
  const strings = getModelCardStrings(locale);

  const name = device?.name || '';
  const href = `${baseHref}/${device.slug}`;
  const src = resolveSrc(device);

  const fullLabel = strings.label(name);

  const alt =
    (device?.name && strings.alt(device.name)) ||
    (device?.brand &&
      device?.slug &&
      strings.altFallback(device.brand, device.slug)) ||
    strings.imageFallbackAlt;

  return (
    <Link href={href} className={s.card} aria-label={fullLabel}>
      <ImgWithFallback src={src} alt={alt} className={s.img} />

      <div className={s.meta}>
        <h3 className={s.name}>
          <span className={s.modelLine}>
            {name}
            <span className={s.remontsSuffix}>{strings.suffix}</span>
          </span>
        </h3>
      </div>
    </Link>
  );
}