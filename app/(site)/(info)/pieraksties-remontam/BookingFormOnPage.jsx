'use client';

import BookingForm from '@components/booking/BookingForm';
import { useState } from 'react';

export default function BookingFormOnPage({
  locale = 'lv',
  locations = [],
}) {
  const [error, setError] = useState('');
  function handleHomeClick() {
    window.location.href = locale === 'ru'
      ? '/ru/zapisatsja-na-remont'
      : '/pieraksties-remontam';
  }

  return (
    <>
    {error && <p role="alert">{error}</p>}
    <BookingForm
      locale={locale}
      locations={locations}
      submitMode="fetch"
      presentation="drawer"
      serviceInteractions
      onError={setError}
      onHomeClick={handleHomeClick}
    />
    </>
  );
}
