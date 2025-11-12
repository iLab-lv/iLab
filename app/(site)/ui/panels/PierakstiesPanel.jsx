import BookingForm from '@components/booking/BookingForm';

export default function PierakstiesPanel({ onClose }) {
  return (
    <BookingForm
      submitMode="fetch"
      onSuccess={onClose}
      onError={(msg) => console.error(msg)} // replace with your toast if you want
    />
  );
}
