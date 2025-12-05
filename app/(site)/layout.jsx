// app/(site)/layout.jsx
import NavBar from './ui/navbar/NavBar';
import Controls from './ui/controls/Controls';
import BottomBar from './ui/bottombar/BottomBar';
import { COMPANY, SOCIALS, LOCATIONS } from '@/data/site.config';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';
import Footer from './ui/footer/Footer';
import Script from 'next/script';
import l from './Layout.module.scss';

// Derive origin from config, with a safe fallback
const ORIGIN = COMPANY?.url || 'https://www.ilab.lv';

// Map your internal day codes to Schema.org day names
const DAY_MAP = {
  P: 'Monday',
  O: 'Tuesday',
  T: 'Wednesday',
  C: 'Thursday',
  Pk: 'Friday',
  S: 'Saturday',
  Sv: 'Sunday',
};

export default function SiteLayout({ children }) {
  // ------------------------------
  // Site-wide JSON-LD payloads
  // ------------------------------

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${ORIGIN}#organization`,
    name: COMPANY.name,
    url: COMPANY.url,
    email: COMPANY.email,
    telephone: COMPANY.phoneMain,
    logo: `${ORIGIN}${COMPANY.logo}`, // e.g. /brand/logo.svg
    sameAs: [SOCIALS.facebook, SOCIALS.instagram, SOCIALS.tiktok].filter(Boolean),
  };

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ORIGIN}#website`,
    url: COMPANY.url,
    name: COMPANY.name,
    publisher: { '@id': `${ORIGIN}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${ORIGIN}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Build LocalBusiness entities for each physical location (Domina, Spice)
  const localBusinessLd = LOCATIONS.map((loc) => {
    const openingHoursSpecification = (loc.hours || [])
      .map((h) => {
        const dayOfWeek = DAY_MAP[h.day];
        if (!dayOfWeek) return null;
        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek,
          opens: h.opens,
          closes: h.closes,
        };
      })
      .filter(Boolean);

    const base = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${ORIGIN}#${loc.id}`, // e.g. https://www.ilab.lv#domina
      name: `${COMPANY.name} ${loc.label}`, // "iLab Domina Shopping"
      url: COMPANY.url, // if you later have per-location URLs, update this
      telephone: loc.tel,
      email: loc.email || COMPANY.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address, // full string; simple but safe
        addressLocality: 'Rīga',
        addressCountry: 'LV',
      },
      openingHoursSpecification,
      // Connect branch to the main organization
      branchOf: {
        '@id': `${ORIGIN}#organization`,
      },
    };

    // Optional geo support: if you later add loc.geo = { lat, lng } in site.config
    if (loc.geo && typeof loc.geo.lat === 'number' && typeof loc.geo.lng === 'number') {
      base.geo = {
        '@type': 'GeoCoordinates',
        latitude: loc.geo.lat,
        longitude: loc.geo.lng,
      };
    }

    return base;
  });

  return (
    <div className={l.siteRoot}>
      {/* Site-wide JSON-LD: Organization */}
      <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(orgLd)}
      </Script>

      {/* Site-wide JSON-LD: WebSite */}
      <Script id="website-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(webSiteLd)}
      </Script>

      {/* Site-wide JSON-LD: LocalBusiness branches (Domina, Spice) */}
      <Script id="localbusiness-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(localBusinessLd)}
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
