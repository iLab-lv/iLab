'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BookingForm from '@components/booking/BookingForm';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import s from './PierakstiesPanel.module.scss';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';

export default function PierakstiesPanel({
  onClose,
  locale = 'lv',
  locations = [],
  initialValues,
}) {
  const { serviceRedesign } = useUiDialogs();
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
      {serviceRedesign && <p className={s.intro}>{resolvedLocale === 'ru' ? 'Заполните форму с вашим устройством и проблемой — наш мастер свяжется с вами, согласует стоимость и время ремонта.' : 'Aizpildi formu ar savu ierīci un problēmu — mūsu meistars sazināsies, saskaņos izmaksas un remonta laiku.'}</p>}
      {error ? <p className={s.error} role="alert">{error}</p> : null}
      <BookingForm
        initialValues={initialValues}
        locale={resolvedLocale}
        locations={locations}
        submitMode="fetch"
        presentation="drawer"
        serviceInteractions={serviceRedesign}
        onError={setError}
        onSuccess={() => setError('')}
        onHomeClick={handleHomeClick}
      />
    </div>
  );
}
