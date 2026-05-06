// app/layout.jsx

import '@/styles/globals.scss';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import { getSiteSettings } from '@/lib/siteSettings';

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

export default async function RootLayout({ children }) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="lv" className={inter.className}>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K8C3GNKB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}

        {/* Temporary debug check. Remove after confirming Firestore loads. */}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log('siteSettings loaded:', ${JSON.stringify(
                siteSettings
              )});`,
            }}
          />
        )}

        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K8C3GNKB');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </body>
    </html>
  );
}