'use client';

import { useUiDialogs } from '../../ui/providers/UiDialogsProvider';
import s from './PriceList.module.scss';

export default function BookRepairButton({ label }) {
  const { openBook } = useUiDialogs();

  return (
    <button
      type="button"
      className={s.bookBtn}
      onClick={(event) => openBook?.(event.currentTarget)}
      aria-haspopup="dialog"
      aria-controls="pieraksties-panel"
    >
      {label}
    </button>
  );
}
