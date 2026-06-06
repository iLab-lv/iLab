'use client';

import { useUiDialogs } from '../../ui/providers/UiDialogsProvider';

export default function BookButton({ className, label }) {
  const { openBook } = useUiDialogs();

  return (
    <button
      type="button"
      className={className}
      onClick={(e) => openBook?.(e.currentTarget)}
      aria-haspopup="dialog"
      aria-controls="pieraksties-panel"
    >
      {label}
    </button>
  );
}
