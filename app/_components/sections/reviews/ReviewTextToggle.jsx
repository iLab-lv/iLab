'use client';

import { useState } from 'react';

import s from './Reviews.module.scss';

export default function ReviewTextToggle({ text = '', moreLabel, lessLabel }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 220;
  const visible = !isLong || expanded ? text : `${text.slice(0, 220).trimEnd()}...`;

  return <p className={s.reviewText}>{visible} {isLong && <button type="button" className={s.more} onClick={() => setExpanded((value) => !value)}>{expanded ? lessLabel : moreLabel}</button>}</p>;
}
