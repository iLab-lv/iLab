import { getSiteSettings } from '@/lib/siteSettings';

import StructuredData from './StructuredData';
import NavBar from './ui/navbar/NavBar';
import Controls from './ui/controls/Controls';
import DeferredBottomBar from './ui/bottombar/DeferredBottomBar';
import Footer from './ui/footer/Footer';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';
import DeferredCookieConsent from './ui/cookie-consent/DeferredCookieConsent';

import l from './Layout.module.scss';

export default async function SiteLayout({ children }) {
  const siteSettings = await getSiteSettings();
  const socials = siteSettings?.socials || {};

  return (
    <div className={l.siteRoot}>
      <StructuredData siteSettings={siteSettings} />

      <UiDialogsProvider siteSettings={siteSettings}>
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
          Pāriet uz saturu
        </a>

        <NavBar />

        <div className={l.controlsDesktopOnly}>
          <Controls
            facebookUrl={socials.facebook}
            instagramUrl={socials.instagram}
            tiktokUrl={socials.tiktok}
          />
        </div>

        <DeferredBottomBar socials={socials} />

        <main id="main">{children}</main>

        <Footer siteSettings={siteSettings} />

        <DeferredCookieConsent />
      </UiDialogsProvider>
    </div>
  );
}
