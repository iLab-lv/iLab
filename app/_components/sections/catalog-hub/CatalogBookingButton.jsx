'use client';

import { useUiDialogs } from '@/app/(site)/ui/providers/UiDialogsProvider';
import Button from '@components/button/Button';

export default function CatalogBookingButton({ children, className, initialValues }) {
  const { openBook } = useUiDialogs();

  return (
    <Button
      type="button"
      glow
      className={className}
      onClick={(event) => initialValues
        ? openBook(event.currentTarget, initialValues)
        : openBook(event.currentTarget)}
    >
      {children}
    </Button>
  );
}
