'use client';

import { useUiDialogs } from '@/app/(site)/ui/providers/UiDialogsProvider';
import Button from '@components/button/Button';

export default function CatalogBookingButton({ children, className, model = false, initialValues }) {
  const { openBook } = useUiDialogs();

  return (
    <Button
      type="button"
      className={className}
      onClick={(event) => model
        ? openBook(event.currentTarget, initialValues)
        : openBook(event.currentTarget)}
    >
      {children}
    </Button>
  );
}
