// app/(site)/layout.jsx
import NavBar from './ui/navbar/NavBar';
import Controls from './ui/controls/Controls';
import BottomBar from './ui/bottombar/BottomBar';
import { SOCIALS } from '@/data/site.config';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';
import Footer from './ui/footer/Footer';
import Script from 'next/script'; // ← ADD THIS
import l from './Layout.module.scss';

const ORIGIN = 'https://www.ilab.lv'; // adjust if you use a different canonical

export default function SiteLayout({ children }) {
  // Site-wide JSON-LD payloads (kept simple and accurate)
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${ORIGIN}#organization`,
    name: 'iLab',
    url: ORIGIN,
    logo: `${ORIGIN}/brand/logo.svg`, // placeholder path (you said logos as placeholders are OK)
    sameAs: [SOCIALS.facebook, SOCIALS.instagram, SOCIALS.tiktok].filter(Boolean),
  };

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ORIGIN}#website`,
    url: ORIGIN,
    name: 'iLab',
    publisher: { '@id': `${ORIGIN}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${ORIGIN}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className={l.siteRoot}>
      {/* Site-wide JSON-LD */}
      <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(orgLd)}
      </Script>
      <Script id="website-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(webSiteLd)}
      </Script>

      <UiDialogsProvider>
        {/* a11y: skip link */}
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
          Skip to content
        </a>

        {/* Sticky, semi-transparent topbar */}
        <NavBar />

        {/* Desktop-only overlay Controls */}
        <div className={l.controlsDesktopOnly}>
          <Controls
            facebookUrl={SOCIALS.facebook}
            instagramUrl={SOCIALS.instagram}
            tiktokUrl={SOCIALS.tiktok}
          />
        </div>

        {/* Mobile/Tablet bottom actions */}
        <BottomBar />

        {/* Main content */}
        <main id="main">{children}</main>

        {/* Footer */}
        <Footer />
      </UiDialogsProvider>
    </div>
  );
}
