'use client';

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

  const handleHomeClick = () => {
    if (onClose) onClose();

    router.push(resolvedLocale === 'ru' ? '/ru' : '/');
  };

  return (
    <div className={s.root}>
      <BookingForm
        locale={resolvedLocale}
        locations={locations}
        submitMode="fetch"
        onError={(msg) => console.error(msg)}
        onHomeClick={handleHomeClick}
      />
    </div>
  );
}