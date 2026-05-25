'use client';

import BookingForm from '@components/booking/BookingForm';

export default function BookingFormOnPage({
  locale = 'lv',
  locations = [],
}) {
  function handleHomeClick() {
    window.location.href = locale === 'ru'
      ? '/ru/zapisatsja-na-remont'
      : '/pieraksties-remontam';
  }

  return (
    <BookingForm
      locale={locale}
      locations={locations}
      submitMode="fetch"
      onError={(msg) => alert(msg)}
      onHomeClick={handleHomeClick}
    />
  );
}