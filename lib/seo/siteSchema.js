const FALLBACK_ORIGIN = 'https://ilab.lv';

const DAY_MAP = {
  P: 'Monday',
  O: 'Tuesday',
  T: 'Wednesday',
  C: 'Thursday',
  Pk: 'Friday',
  S: 'Saturday',
  Sv: 'Sunday',
};

const DEFAULT_DESCRIPTION =
  'Profesionāls telefonu, datoru un Dyson ierīču serviss Rīgā. iLab veic diagnostiku, remontu un detaļu maiņu Domina Shopping un Spice Life filiālēs.';

function stripTrailingSlash(value = '') {
  return String(value).replace(/\/+$/, '');
}

function getOrigin(company = {}) {
  return stripTrailingSlash(company.url || FALLBACK_ORIGIN);
}

function toAbsoluteUrl(value, origin) {
  if (!value) return undefined;

  const url = String(value);

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (!url.startsWith('/')) {
    return `${origin}/${url}`;
  }

  return `${origin}${url}`;
}

function cleanObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null || value === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
}

function buildOpeningHoursSpecification(hours = []) {
  return hours
    .map((h) => {
      const dayOfWeek = DAY_MAP[h.day];
      if (!dayOfWeek || !h.opens || !h.closes) return null;

      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek,
        opens: h.opens,
        closes: h.closes,
      };
    })
    .filter(Boolean);
}

function buildPostalAddress(loc = {}) {
  return cleanObject({
    '@type': 'PostalAddress',
    streetAddress: loc.address,
    postalCode: loc.postalCode,
    addressLocality: loc.city || 'Rīga',
    addressCountry: 'LV',
  });
}

function buildGeo(loc = {}) {
  if (
    loc.geo &&
    typeof loc.geo.lat === 'number' &&
    typeof loc.geo.lng === 'number'
  ) {
    return {
      '@type': 'GeoCoordinates',
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    };
  }

  return undefined;
}

export function buildSiteSchemaGraph(siteSettings = {}) {
  const company = siteSettings.company || {};
  const socials = siteSettings.socials || {};
  const locations = siteSettings.locations || [];

  const origin = getOrigin(company);

  const companyName = company.name || 'iLab';
  const description = company.description || DEFAULT_DESCRIPTION;
  const logoUrl = toAbsoluteUrl(company.logo, origin);
  const imageUrl = toAbsoluteUrl(
    company.image || company.ogImage || company.logo,
    origin
  );

  const sameAs = [
    socials.facebook,
    socials.instagram,
    socials.tiktok,
    company.sameAs,
  ]
    .flat()
    .filter(Boolean);

  const orgLd = cleanObject({
    '@type': 'Organization',
    '@id': `${origin}#organization`,
    name: companyName,
    url: origin,
    email: company.email,
    telephone: company.phoneMain,
    logo: logoUrl,
    image: imageUrl,
    description,
    foundingDate: company.foundingDate || '2013',
    sameAs,

    contactPoint: company.phoneMain
      ? [
          cleanObject({
            '@type': 'ContactPoint',
            telephone: company.phoneMain,
            contactType: 'customer service',
            areaServed: 'LV',
            availableLanguage: ['lv', 'ru'],
          }),
        ]
      : undefined,
  });

  const webSiteLd = cleanObject({
    '@type': 'WebSite',
    '@id': `${origin}#website`,
    url: origin,
    name: companyName,
    publisher: {
      '@id': `${origin}#organization`,
    },
  });

  const localBusinessLd = locations.map((loc) => {
    const openingHoursSpecification = buildOpeningHoursSpecification(loc.hours);

    return cleanObject({
      '@type': ['LocalBusiness', 'RepairService'],
      '@id': `${origin}#${loc.id}`,
      name: `${companyName} ${loc.label}`,
      url: loc.url ? toAbsoluteUrl(loc.url, origin) : origin,
      image: toAbsoluteUrl(loc.image || company.image || company.logo, origin),
      telephone: loc.tel || company.phoneMain,
      email: loc.email || company.email,
      priceRange: loc.priceRange || company.priceRange || '€€',
      paymentAccepted:
        loc.paymentAccepted ||
        company.paymentAccepted ||
        'Cash, Card, Apple Pay, Google Pay',

      address: buildPostalAddress(loc),
      geo: buildGeo(loc),
      hasMap: loc.maps || loc.mapUrl,

      openingHoursSpecification,

      areaServed: {
        '@type': 'City',
        name: loc.city || 'Rīga',
      },

      branchOf: {
        '@id': `${origin}#organization`,
      },

      parentOrganization: {
        '@id': `${origin}#organization`,
      },
    });
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      orgLd,
      webSiteLd,
      ...localBusinessLd,
    ],
  };
}