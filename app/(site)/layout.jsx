import { headers } from 'next/headers';

import { getSiteSettings } from '@/lib/siteSettings';

import StructuredData from './StructuredData';
import NavBar from './ui/navbar/NavBar';
import Controls from './ui/controls/Controls';
import BottomBar from './ui/bottombar/BottomBar';
import Footer from './ui/footer/Footer';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';
import CookieConsent from './ui/cookie-consent/CookieConsent';

import l from './Layout.module.scss';

function getLocaleFromPathname(pathname = '/') {
  return pathname.startsWith('/ru') ? 'ru' : 'lv';
}

export default async function SiteLayout({ children }) {
  const [siteSettings, headersList] = await Promise.all([
    getSiteSettings(),
    headers(),
  ]);

  const pathname =
    headersList.get('x-pathname') ||
    headersList.get('x-invoke-path') ||
    '/';

  const locale = getLocaleFromPathname(pathname);
  const socials = siteSettings?.socials || {};

  return (
    <div className={l.siteRoot}>
      <StructuredData siteSettings={siteSettings} />

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

        <NavBar locale={locale} pathname={pathname} />

        <div className={l.controlsDesktopOnly}>
          <Controls
            facebookUrl={socials.facebook}
            instagramUrl={socials.instagram}
            tiktokUrl={socials.tiktok}
          />
        </div>

        <BottomBar socials={socials} />

        <main id="main">{children}</main>

        <Footer locale={locale} siteSettings={siteSettings} />

        <CookieConsent locale={locale} />
      </UiDialogsProvider>
    </div>
  );
}
