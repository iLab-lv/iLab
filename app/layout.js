// app/layout.jsx

import '@/styles/globals.scss';

import { Inter } from 'next/font/google';
import Script from 'next/script';
import { headers } from 'next/headers';

const SITE_URL = 'https://www.ilab.lv';

const DEFAULT_TITLE = 'iLab — telefonu, datoru un Dyson remonts Rīgā';

const DEFAULT_DESCRIPTION =
  'iLab serviss Rīgā — telefonu, planšetdatoru, datoru un Dyson ierīču diagnostika, remonts un detaļu maiņa. 90 dienu garantija, filiāles Domina Shopping un Spice Life.';

const DEFAULT_OG_IMAGE = '/images/hero.webp';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

function getLocaleFromPathname(pathname = '/') {
  return pathname.startsWith('/ru') ? 'ru' : 'lv';
}

export const metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: 'iLab',

  title: {
    default: DEFAULT_TITLE,
    template: '%s',
  },

  description: DEFAULT_DESCRIPTION,

  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },

  openGraph: {
    siteName: 'iLab',
    type: 'website',
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'iLab serviss Rīgā',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default async function RootLayout({ children }) {
  const headersList = await headers();

  const pathname =
    headersList.get('x-pathname') ||
    headersList.get('x-invoke-path') ||
    '/';

  const locale = getLocaleFromPathname(pathname);

  return (
    <html lang={locale} className={inter.className}>
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