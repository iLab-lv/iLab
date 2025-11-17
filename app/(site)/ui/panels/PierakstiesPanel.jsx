import BookingForm from '@components/booking/BookingForm';
import s from './PierakstiesPanel.module.scss';

export default function PierakstiesPanel({ onClose }) {
  return (
    <div className={s.root}>
      <BookingForm
        submitMode="fetch"
        successRedirect="/pieraksties/paldies"
        onSuccess={onClose}
        onError={(msg) => console.error(msg)}
      />
    </div>
  );
}
