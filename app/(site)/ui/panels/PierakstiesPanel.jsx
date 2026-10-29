'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BookingForm from '@components/booking/BookingForm';
import s from './PierakstiesPanel.module.scss';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';

export default function PierakstiesPanel({
  onClose,
  locale = 'lv',
  locations = [],
}) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const resolvedLocale = getNavLocaleFromPathname(pathname) || locale || 'lv';
  const [error, setError] = useState('');

  const handleHomeClick = () => {
    if (onClose) onClose();

    router.push(resolvedLocale === 'ru' ? '/ru' : '/');
  };

  return (
    <div className={s.root}>
      {error ? <p className={s.error} role="alert">{error}</p> : null}
      <BookingForm
        locale={resolvedLocale}
        locations={locations}
        submitMode="fetch"
        presentation="drawer"
        onError={setError}
        onSuccess={() => setError('')}
        onHomeClick={handleHomeClick}
      />
    </div>
  );
}
