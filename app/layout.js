// app/layout.jsx
import '@/styles/globals.scss';

export const metadata = {
  title: 'iLab',           // placeholder; real meta will come later from Firebase
  description: 'iLab site', // placeholder
  cons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }, // most modern browsers use this
      { url: '/icon.png', type: 'image/png' },     // single PNG fallback (512)
      // Optional perf win:
      // { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],           // iOS home screen
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
