'use client';

import BookingForm from '@components/booking/BookingForm';

export default function PierakstiesPage() {
  return (
    <main className="container" style={{ padding: '2rem 0' }}>
      <BookingForm
        submitMode="fetch"
        onError={(msg) => alert(msg)}
      />
    </main>
  );
}
