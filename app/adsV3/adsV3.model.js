import { getCtaMainContent } from '../(site)/ui/cta-main/ctaMainContent.js';
import { getTrustItems } from '../adsV2/sourceContent.js';

export function getAdsV3Locale(value) {
  return value === 'ru' ? 'ru' : 'lv';
}

export function getAdsV3PricesHref(locale) {
  return new URL(getCtaMainContent(getAdsV3Locale(locale)).prices.href, 'https://ilab.lv').href;
}

// Derive proof from the existing review source; missing values never become ratings.
export function getAdsV3ReviewProof(places, locale) {
  const ratings = places.map(place => place.rating)
    .filter(value => value != null && value !== '')
    .map(Number).filter(value => Number.isFinite(value) && value > 0 && value <= 5);
  const counts = places.map(place => place.count)
    .filter(value => value != null && value !== '')
    .map(Number).filter(value => Number.isInteger(value) && value >= 0);
  const format = new Intl.NumberFormat(locale === 'ru' ? 'ru-LV' : 'lv-LV', {
    minimumFractionDigits: 1, maximumFractionDigits: 1,
  });
  return {
    rating: ratings.length ? [...new Set([Math.min(...ratings), Math.max(...ratings)].map(value => format.format(value)))].join('–') : null,
    count: counts.length ? counts.reduce((sum, value) => sum + value, 0) : null,
  };
}

export function getAdsV3TrustItems(locale, reviewsSummary = {}) {
  const items = getTrustItems(locale, reviewsSummary).map((item, index) => index === 0 ? { ...item, value: '13+' } : item);
  const proof = getAdsV3ReviewProof(Object.values(reviewsSummary || {}).filter(Boolean), locale);
  if (!proof.count) return items.slice(0, 2);
  const rounded = proof.count >= 10 ? Math.floor(proof.count / 10) * 10 : proof.count;
  return [...items.slice(0, 2), {
    ...items[2], value: `${rounded}+`,
    text: proof.rating ? `${proof.rating}★ ${locale === 'ru' ? 'рейтинг Google' : 'Google vērtējums'}` : '',
  }];
}

export function getAdsV3LocaleHref(currentHref, locale) {
  const url = new URL(currentHref, 'https://ilab.lv');
  url.searchParams.set('lang', locale === 'ru' ? 'lv' : 'ru');
  return '/adsV3' + url.search + url.hash;
}

export function getAdsV3Inquiry(params, services, locations) {
  const service = services.find(item => item.id === params.service);
  const location = locations.find(item => item.id === params.location);
  return {
    mode: ['booking', 'price', 'delivery'].includes(params.form) ? params.form : null,
    values: {
      ...(service ? { fault: service.title } : {}),
      ...(location ? { location: location.id } : {}),
    },
  };
}

// Existing GTM consumes dataLayer. Only consented, anonymous UI intent is queued;
// this preview does not emit lead/conversion events or change the booking form.
export function trackAdsV3Cta(action, placement, locale, browser = globalThis.window) {
  if (!browser || !['booking', 'contact', 'call', 'whatsapp', 'prices', 'delivery'].includes(action)
    || !['hero', 'mobile_dock', 'desktop_dock', 'header', 'speed', 'services', 'brands', 'delivery', 'final'].includes(placement)) return;
  const accepted = browser.document.cookie.split(';').some(cookie => cookie.trim() === 'ilab_cookie_consent=accepted');
  if (!accepted) return;
  browser.dataLayer = browser.dataLayer || [];
  browser.dataLayer.push({
    event: 'ads_v3_cta_click', page_variant: 'ads_v3', preview: true,
    action, placement, locale: getAdsV3Locale(locale),
  });
}
