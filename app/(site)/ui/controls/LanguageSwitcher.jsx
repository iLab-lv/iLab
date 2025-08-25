'use client';

import { useState } from 'react';
import s from './LanguageSwitcher.module.scss';

/** Minimal LV/RU toggle that we portal between topbar (mobile) and controls (desktop) */
export default function LanguageSwitcher({ initial = 'lv', onChange }) {
  const [value, setValue] = useState(initial);

  const handle = (next) => {
    setValue(next);
    onChange?.(next);
  };

  return (
    <div className={s.switch}>
      <button
        type="button"
        className={`${s.btn} ${value === 'lv' ? s.active : ''}`}
        onClick={() => handle('lv')}
        aria-pressed={value === 'lv'}
      >
        LV
      </button>
      <span className={s.sep} aria-hidden>·</span>
      <button
        type="button"
        className={`${s.btn} ${value === 'ru' ? s.active : ''}`}
        onClick={() => handle('ru')}
        aria-pressed={value === 'ru'}
      >
        RU
      </button>
    </div>
  );
}
