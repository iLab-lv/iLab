import Script from 'next/script';

import NavBar from '@ui/navbar/NavBar';
import BottomBar from '@ui/bottombar/BottomBar';
import Footer from '@ui/footer/Footer';
import { UiDialogsProvider } from '@ui/providers/UiDialogsProvider';
import { getSiteSettings } from '@/lib/siteSettings';

import l from './Layout.module.scss';

const GA_MEASUREMENT_ID = 'G-KYDSG504F8';

export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default async function AdsLayout({ children }) {
  const siteSettings = await getSiteSettings();
  const socials = siteSettings?.socials || {};

  return (
    <div className={l.adsRoot}>
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

      <UiDialogsProvider siteSettings={siteSettings}>
        <a href="#main" className={l.skipLink}>
          Skip to content
        </a>

        <NavBar
          showNavigation={false}
          showHeaderCtas={true}
          logoHref="https://ilab.lv"
        />

        <BottomBar socials={socials} />

        <main id="main" className={l.main}>
          {children}
        </main>

        <Footer
          variant="ads"
          locale="lv"
          siteSettings={siteSettings}
        />
      </UiDialogsProvider>
    </div>
  );
}