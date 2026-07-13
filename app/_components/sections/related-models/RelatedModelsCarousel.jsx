'use client';

import { useRef } from 'react';
import Link from 'next/link';

import s from './RelatedModels.module.scss';

export default function RelatedModelsCarousel({ models, labels }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

  return (
    <div className={s.carousel}>
      {models.length > 5 && <button type="button" className={`${s.control} ${s.prev}`} onClick={() => scroll(-1)} aria-label={labels.prev}>←</button>}
      {models.length > 5 && <button type="button" className={`${s.control} ${s.next}`} onClick={() => scroll(1)} aria-label={labels.next}>→</button>}
      <div className={s.track} ref={trackRef}>
        {models.map((model) => (
          <Link className={s.card} href={model.href} key={model.slug}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={model.image} alt={`${model.name} ${labels.suffix}`} loading="lazy" decoding="async" />
            <span>{model.name}</span>
            <small>{labels.suffix}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
