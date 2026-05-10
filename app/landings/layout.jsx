// app/landings/layout.jsx

import Script from 'next/script';

import LandingCtaProvider from './_components/ui/providers/LandingCtaProvider';
import LandingCtaDock from './_components/ui/dock/LandingCtaDock';

import { getSiteSettings } from '@/lib/siteSettings';

import l from './layout.module.scss';

const GA_MEASUREMENT_ID = 'G-KYDSG504F8';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LandingsLayout({ children }) {
  const siteSettings = await getSiteSettings();

  return (
    <div className={l.root}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga4-init-landings" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <LandingCtaProvider siteSettings={siteSettings}>
        <a href="#main" className={l.skipLink}>
          Skip to content
        </a>

        <LandingCtaDock siteSettings={siteSettings} />

        <main id="main" className={l.main}>
          {children}
        </main>
      </LandingCtaProvider>
    </div>
  );
}