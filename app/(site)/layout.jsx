import { headers } from 'next/headers';

import { getSiteSettings } from '@/lib/siteSettings';

import StructuredData from './StructuredData';
import ServiceMotion from './ServiceMotion';
import motion from './ServiceMotion.module.scss';
import NavBar from './ui/navbar/NavBar';
import BottomBar from './ui/bottombar/BottomBar';
import NavigationRulers from './ui/navigation-rulers/NavigationRulers';
import Footer from './ui/footer/Footer';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';
import CookieConsent from './ui/cookie-consent/CookieConsent';

import l from './Layout.module.scss';
import foundation from './serviceFoundation.module.scss';
import { serviceSans, serviceMono } from './serviceFonts';

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
  const serviceClassName = `${foundation.scope} ${serviceSans.variable} ${serviceMono.variable}`;
  return (
    <div className={`${l.siteRoot} ${serviceClassName} ${motion.scope}`} data-service-redesign="">
      <StructuredData siteSettings={siteSettings} />

      <UiDialogsProvider locale={locale} siteSettings={siteSettings} serviceRedesign serviceClassName={serviceClassName}>
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
