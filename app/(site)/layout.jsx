import { headers } from 'next/headers';

import { getSiteSettings } from '@/lib/siteSettings';
import { getPageCtaCatalog } from '@/lib/navigation/getPageCtaCatalog';

import StructuredData from './StructuredData';
import ServiceMotion from './ServiceMotion';
import motion from './ServiceMotion.module.scss';
import headlineEntrance from './HeadlineEntrance.module.scss';
import NavBar from './ui/navbar/NavBar';
import BottomBar from './ui/bottombar/BottomBar';
import NavigationRulers from './ui/navigation-rulers/NavigationRulers';
import Footer from './ui/footer/Footer';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';
import CookieConsent from './ui/cookie-consent/CookieConsent';

import l from './Layout.module.scss';
import foundation from './serviceFoundation.module.scss';
import { preloadServiceFonts, serviceFontClassName } from './ServiceFontResources';

function getLocaleFromPathname(pathname = '/') {
  return pathname.startsWith('/ru') ? 'ru' : 'lv';
}

export default async function SiteLayout({ children }) {
  preloadServiceFonts();
  const [siteSettings, headersList, pageCtaCatalog] = await Promise.all([
    getSiteSettings(),
    headers(),
    getPageCtaCatalog(),
  ]);

  const pathname =
    headersList.get('x-pathname') ||
    headersList.get('x-invoke-path') ||
    '/';

  const locale = getLocaleFromPathname(pathname);
  const serviceClassName = `${foundation.scope} ${serviceFontClassName}`;
  return (
    <div className={`${l.siteRoot} ${serviceClassName} ${motion.scope} ${headlineEntrance.scope}`} data-service-redesign="" data-headline-motion-off={headersList.get('x-ilab-motion-off') === '1' ? '' : undefined}>
      <StructuredData siteSettings={siteSettings} />

      <UiDialogsProvider locale={locale} siteSettings={siteSettings} serviceRedesign serviceClassName={serviceClassName} pageCtaCatalog={pageCtaCatalog}>
        <ServiceMotion />
        <a href="#main" className={l.skipLink}>
          {locale === 'ru' ? 'Перейти к содержанию' : 'Pāriet uz saturu'}
        </a>

        <NavBar locale={locale} pathname={pathname} adaptiveNavigation />

        <BottomBar />
        <NavigationRulers />

        <main id="main">{children}</main>

        <Footer locale={locale} siteSettings={siteSettings} />

        <CookieConsent locale={locale} />
      </UiDialogsProvider>
    </div>
  );
}
