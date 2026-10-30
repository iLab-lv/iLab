'use client';

import { useUiDialogs } from '@/app/(site)/ui/providers/UiDialogsProvider';

export default function CatalogBookingButton({ children, className }) {
  const { openBooking } = useUiDialogs();

  return (
    <button
      type="button"
      className={className}
      onClick={(event) => openBooking(event.currentTarget)}
    >
      {children}
    </button>
  );
}
