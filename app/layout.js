// app/layout.jsx
import '@/styles/globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'iLab',
  description: 'iLab site',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="lv" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
