'use client';

import { useRouter } from 'next/navigation';
import BookingForm from '@components/booking/BookingForm';
import s from './PierakstiesPanel.module.scss';

export default function PierakstiesPanel({ onClose }) {
  const router = useRouter();

  const handleHomeClick = () => {
    // 1) Close the fullscreen panel (if parent provided handler)
    if (onClose) onClose();

    // 2) Navigate to homepage
    router.push('/');
  };

  return (
    <div className={s.root}>
      <BookingForm
        submitMode="fetch"
        onError={(msg) => console.error(msg)}
        onHomeClick={handleHomeClick}
      />
    </div>
  );
}
