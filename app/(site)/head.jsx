const ORIGIN = 'https://ilab.lv';

import { COMPANY, SOCIALS, LOCATIONS } from '@/data/site.config';

const DAY_MAP = {
  P: 'Monday',
  O: 'Tuesday',
  T: 'Wednesday',
  C: 'Thursday',
  Pk: 'Friday',
  S: 'Saturday',
  Sv: 'Sunday',
};

export default function Head() {
  // ----------------------------
  // Organization
  // ----------------------------
  const orgLd = {
    '@type': 'Organization',
    '@id': `${ORIGIN}#organization`,
    name: COMPANY.name,
    url: ORIGIN,
    email: COMPANY.email,
    telephone: COMPANY.phoneMain,
    logo: `${ORIGIN}${COMPANY.logo}`,
    sameAs: [
      SOCIALS.facebook,
      SOCIALS.instagram,
      SOCIALS.tiktok,
    ].filter(Boolean),
  };

  // ----------------------------
  // Website
  // ----------------------------
  const webSiteLd = {
    '@type': 'WebSite',
    '@id': `${ORIGIN}#website`,
    url: ORIGIN,
    name: COMPANY.name,
    publisher: {
      '@id': `${ORIGIN}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${ORIGIN}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // ----------------------------
  // LocalBusiness (multi-location)
  // ----------------------------
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

    if (
      loc.geo &&
      typeof loc.geo.lat === 'number' &&
      typeof loc.geo.lng === 'number'
    ) {
      base.geo = {
        '@type': 'GeoCoordinates',
        latitude: loc.geo.lat,
        longitude: loc.geo.lng,
      };
    }

    return base;
  });

  // ----------------------------
  // Final schema graph
  // ----------------------------
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      orgLd,
      webSiteLd,
      ...localBusinessLd,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaGraph),
      }}
    />
  );
}