import { SITE_URL } from '../../app/data/site.config.js';

const FALLBACK_ORIGIN = SITE_URL;

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

const DEFAULT_PAYMENT_ACCEPTED = 'Cash, Card, Apple Pay, Google Pay';
const DEFAULT_PRICE_RANGE = '€€';

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

function cleanObject(obj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null || value === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
}

function uniqueArray(items = []) {
  return Array.from(new Set(items.flat().filter(Boolean)));
}

function buildOpeningHoursSpecification(hours = []) {
  return hours
    .map((h) => {
      const dayOfWeek = DAY_MAP[h.day];

      if (!dayOfWeek || !h.opens || !h.closes) {
        return null;
      }

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
  const address = cleanObject({
    '@type': 'PostalAddress',
    streetAddress: loc.streetAddress || loc.address,
    postalCode: loc.postalCode,
    addressLocality: loc.city || 'Rīga',
    addressCountry: loc.country || 'LV',
  });

  return address.streetAddress ? address : undefined;
}

function buildGeo(loc = {}) {
  const lat = loc.geo?.lat;
  const lng = loc.geo?.lng;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return undefined;
  }

  return {
    '@type': 'GeoCoordinates',
    latitude: lat,
    longitude: lng,
  };
}

function buildLocationUrl(loc = {}, origin) {
  if (loc.url) {
    return toAbsoluteUrl(loc.url, origin);
  }

  if (loc.id) {
    return `${origin}/kontakti#${loc.id}`;
  }

  return origin;
}

function buildLocationImage(loc = {}, company = {}, origin) {
  return toAbsoluteUrl(
    loc.image || company.image || company.ogImage || company.logo,
    origin
  );
}

export function buildSiteSchemaGraph(siteSettings = {}) {
  const company = siteSettings.company || {};
  const socials = siteSettings.socials || {};
  const locations = Array.isArray(siteSettings.locations)
    ? siteSettings.locations
    : [];

  const origin = getOrigin(company);

  const companyName = company.name || 'iLab';
  const legalName = company.legalName || 'SIA iLab';
  const description = company.description || DEFAULT_DESCRIPTION;

  const logoUrl = toAbsoluteUrl(company.logo, origin);
  const imageUrl = toAbsoluteUrl(
    company.image || company.ogImage || company.logo,
    origin
  );

  const sameAs = uniqueArray([
    socials.facebook,
    socials.instagram,
    socials.tiktok,
    company.sameAs,
  ]);

  const orgLd = cleanObject({
    '@type': 'Organization',
    '@id': `${origin}#organization`,
    name: companyName,
    legalName,
    url: origin,
    email: company.email,
    telephone: company.phoneMain,
    logo: logoUrl,
    image: imageUrl,
    description,
    foundingDate: company.foundingDate || '2013',
    taxID: company.taxID || company.registrationNumber,
    vatID: company.vatID,
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
    inLanguage: ['lv', 'ru'],
    publisher: {
      '@id': `${origin}#organization`,
    },
  });

  const localBusinessLd = locations
    .filter((loc) => loc?.id)
    .map((loc) => {
      const openingHoursSpecification = buildOpeningHoursSpecification(
        loc.hours || siteSettings.hours
      );

      return cleanObject({
        '@type': ['LocalBusiness', 'RepairService'],
        '@id': `${origin}#${loc.id}`,
        name: loc.name || `${companyName} ${loc.label}`,
        url: buildLocationUrl(loc, origin),
        image: buildLocationImage(loc, company, origin),
        telephone: loc.tel || company.phoneMain,
        email: loc.email || company.email,
        priceRange: loc.priceRange || company.priceRange || DEFAULT_PRICE_RANGE,
        paymentAccepted:
          loc.paymentAccepted ||
          company.paymentAccepted ||
          DEFAULT_PAYMENT_ACCEPTED,

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
    '@graph': [orgLd, webSiteLd, ...localBusinessLd],
  };
}
