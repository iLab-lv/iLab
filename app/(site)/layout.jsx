import Script from 'next/script';
import { headers } from 'next/headers';

import { getSiteSettings } from '@/lib/siteSettings';

import StructuredData from './StructuredData';
import NavBar from './ui/navbar/NavBar';
import Controls from './ui/controls/Controls';
import BottomBar from './ui/bottombar/BottomBar';
import Footer from './ui/footer/Footer';
import FooterClientWrapper from './ui/footer/FooterClientWrapper';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';

import l from './Layout.module.scss';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

function getLocaleFromPathname(pathname = '/') {
  return pathname.startsWith('/ru') ? 'ru' : 'lv';
}

export default async function SiteLayout({ children }) {
  const siteSettings = await getSiteSettings();

  const headersList = await headers();
  const pathname =
    headersList.get('x-pathname') ||
    headersList.get('x-invoke-path') ||
    headersList.get('referer') ||
    '/';

  const locale = getLocaleFromPathname(pathname);
  const socials = siteSettings?.socials || {};

  return (
    <div className={l.siteRoot}>
      <StructuredData />

      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      <UiDialogsProvider locale={locale} siteSettings={siteSettings}>
        <a
          href="#main"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 'auto',
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {locale === 'ru' ? 'Перейти к содержанию' : 'Pāriet uz saturu'}
        </a>

        <NavBar />

        <div className={l.controlsDesktopOnly}>
          <Controls
            facebookUrl={socials.facebook}
            instagramUrl={socials.instagram}
            tiktokUrl={socials.tiktok}
          />
        </div>

        <BottomBar socials={socials} />

        <main id="main">{children}</main>

        <FooterClientWrapper
          lv={<Footer locale="lv" siteSettings={siteSettings} />}
          ru={<Footer locale="ru" siteSettings={siteSettings} />}
        />
      </UiDialogsProvider>
    </div>
  );
}