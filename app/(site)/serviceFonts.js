import localFont from 'next/font/local';

// Unique generated families keep self-hosted service typography out of legacy shells.
export const serviceSans = localFont({
  src: './fonts/Geologica.ttf',
  weight: '100 900',
  style: 'normal',
  variable: '--font-service-sans',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

export const serviceMono = localFont({
  src: [
    { path: './fonts/IBMPlexMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexMono-Medium.ttf', weight: '500', style: 'normal' },
  ],
  variable: '--font-service-mono',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
});
