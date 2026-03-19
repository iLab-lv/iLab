// app/(site)/layout.jsx
import NavBar from './ui/navbar/NavBar';
import Controls from './ui/controls/Controls';
import BottomBar from './ui/bottombar/BottomBar';
import { COMPANY, SOCIALS, LOCATIONS } from '@/data/site.config';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';
import Footer from './ui/footer/Footer';
import ResolvedPageHeader from './ui/page-header/ResolvedPageHeader';
import Script from 'next/script';
import l from './Layout.module.scss';

// ✅ Canonical origin (force non-www)
const ORIGIN = 'https://ilab.lv';

// ✅ Next.js metadata base for absolute canonicals/OG URLs
export const metadata = {
  metadataBase: new URL(ORIGIN),
};

// GA4 measurement ID (ilab-v2 property)
const GA_MEASUREMENT_ID = 'G-KYDSG504F8';

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
    url: ORIGIN,
    email: COMPANY.email,
    telephone: COMPANY.phoneMain,
    logo: `${ORIGIN}${COMPANY.logo}`,
    sameAs: [SOCIALS.facebook, SOCIALS.instagram, SOCIALS.tiktok].filter(Boolean),
  };

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ORIGIN}#website`,
    url: ORIGIN,
    name: COMPANY.name,
    publisher: { '@id': `${ORIGIN}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${ORIGIN}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

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
      '@id': `${ORIGIN}#${loc.id}`,
      name: `${COMPANY.name} ${loc.label}`,
      url: ORIGIN,
      telephone: loc.tel,
      email: loc.email || COMPANY.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address,
        addressLocality: 'Rīga',
        addressCountry: 'LV',
      },
      openingHoursSpecification,
      branchOf: {
        '@id': `${ORIGIN}#organization`,
      },
    };

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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />

      <UiDialogsProvider>
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

        <NavBar />

        <div className={l.controlsDesktopOnly}>
          <Controls
            facebookUrl={SOCIALS.facebook}
            instagramUrl={SOCIALS.instagram}
            tiktokUrl={SOCIALS.tiktok}
          />
        </div>

        <BottomBar />

        <ResolvedPageHeader />

        <main id="main">{children}</main>

        <Footer />
      </UiDialogsProvider>
    </div>
  );
}