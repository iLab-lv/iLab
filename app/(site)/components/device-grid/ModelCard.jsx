'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

import s from './ModelCard.module.scss';

const PLACEHOLDER = '/images/placeholders/phone.webp';

function resolveSrc(device) {
  const direct = (device?.image && String(device.image).trim()) || '';
  if (direct) return direct;

  const pathy = (device?.imagePath && String(device.imagePath).trim()) || '';
  if (pathy) return `/images/${pathy.replace(/^\/+/, '')}`;

  return '';
}

function getCardStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      suffix: 'ремонт и цены',
      fallbackAlt: 'Изображение устройства',
    };
  }

  return {
    suffix: 'remonts un cenas',
    fallbackAlt: 'Ierīces attēls',
  };
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

export default function ModelCard({ device, baseHref, locale = 'lv' }) {
  const strings = getCardStrings(locale);
  const name = device?.name || '';
  const href = `${baseHref}/${device.slug}`;
  const src = resolveSrc(device);

  const fullLabel = `${name} ${strings.suffix}`.trim();

  const alt =
    (device?.name && `${device.name} ${strings.suffix}`) ||
    (device?.brand && device?.slug && `${device.brand} ${device.slug} ${strings.suffix}`) ||
    strings.fallbackAlt;

  return (
    <Link href={href} className={s.card} aria-label={fullLabel}>
      <ImgWithFallback src={src} alt={alt} className={s.img} />

      <div className={s.meta}>
        <h3 className={s.name}>
          <span className={s.modelLine}>
            {name}
            <span className={s.remontsSuffix}> {strings.suffix}</span>
          </span>
        </h3>
      </div>
    </Link>
  );
}