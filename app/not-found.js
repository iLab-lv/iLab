import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Page not found</h1>
        <p style={{ marginTop: '0.75rem', opacity: 0.8 }}>
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <div style={{ marginTop: '1.25rem' }}>
          <Link href="/" style={{ textDecoration: 'underline' }}>
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
