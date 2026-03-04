// app/ads/layout.jsx
import Script from 'next/script';

import NavBar from '@ui/navbar/NavBar';
import BottomBar from '@ui/bottombar/BottomBar';
import { UiDialogsProvider } from '@ui/providers/UiDialogsProvider';
import { COMPANY, LOCATIONS } from '@/data/site.config';
import Footer from '@ui/footer/Footer';

import l from './Layout.module.scss';

// Same GA4 ID as your main site
const GA_MEASUREMENT_ID = 'G-KYDSG504F8';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdsLayout({ children }) {
  return (
    <div className={l.adsRoot}>
      {/* GA4 global tag */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <UiDialogsProvider>
        {/* a11y: skip link */}
        <a href="#main" className={l.skipLink}>
          Skip to content
        </a>

        {/* Same topbar as main site, but without navigation links */}
        <NavBar showNavigation={false} showHeaderCtas={true} logoHref="https://ilab.lv"/>

        {/* Mobile/Tablet bottom CTAs (unchanged) */}
        <BottomBar />
        
        

        {/* Ads page content */}
        <main id="main" className={l.main}>
          {children}
        </main>

        {/* Minimal NAP footer */}
<Footer variant="ads" />

      </UiDialogsProvider>
    </div>
  );
}
