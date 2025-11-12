'use client';

import { useRouter } from 'next/navigation';
import BookingForm from '@components/booking/BookingForm';

// OPTIONAL: if you want the exact same styling as your fullscreen panel,
// pass the panel's CSS module classes here. Adjust the import to your path.
// import panelStyles from '@sections/panel/PierakstiesPanel.module.scss';

export default function PierakstiesPage() {
  const router = useRouter();

  return (
    <main className="container" style={{ padding: '2rem 0' }}>


      <BookingForm
        submitMode="fetch"
        onSuccess={() => router.push('/pieraksties/paldies')}
        onError={(msg) => alert(msg)}
        // classes={panelStyles} // ← uncomment when you import your panel module
      />
    </main>
  );
}
