import LandingCtaProvider from './_components/ui/providers/LandingCtaProvider';
import LandingCtaDock from './_components/ui/dock/LandingCtaDock';

import { getSiteSettings } from '@/lib/siteSettings';

import l from './layout2.module.scss';

export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LandingsLayout({ children }) {
  const siteSettings = await getSiteSettings();

  return (
    <div className={l.root}>
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
