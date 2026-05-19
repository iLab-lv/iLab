'use client';

import BookingForm from '@components/booking/BookingForm';
import { useUiDialogs } from '@/app/(site)/ui/providers/UiDialogsProvider';

export default function BookingFormFromSettings({ locale: fallbackLocale = 'lv' }) {
  const {
    locale: contextLocale,
    locations,
  } = useUiDialogs();

  return (
    <BookingForm
      locale={contextLocale || fallbackLocale}
      locations={locations}
      submitMode="fetch"
      onError={(msg) => alert(msg)}
    />
  );
}