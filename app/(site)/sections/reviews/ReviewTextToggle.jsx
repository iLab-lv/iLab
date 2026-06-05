'use client';

import { useState } from 'react';

import s from './Reviews.module.scss';

export default function ReviewTextToggle({
  text = '',
  moreLabel = 'Vairāk',
  lessLabel = 'Mazāk',
  limit = 220,
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > limit;
  const visibleText =
    !isLong || expanded ? text : `${text.slice(0, limit).trimEnd()}...`;

  return (
    <p className={s.reviewText}>
      {visibleText}{' '}
      {isLong && (
        <button
          type="button"
          className={s.reviewMore}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      )}
    </p>
  );
}
