import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import * as originalCopy from '../app/adsV2/sourceContent.js';
import { getAdsV3Content } from '../app/adsV3/adsV3.i18n.js';
import {
  getAdsV3Locale, getAdsV3LocaleHref, getAdsV3Inquiry,
  getAdsV3ReviewProof, getAdsV3TrustItems, getAdsV3PricesHref, trackAdsV3Cta,
} from '../app/adsV3/adsV3.model.js';

test('preview locale switching preserves campaign, form, selected issue and fragment without changing route', () => {
  const href = getAdsV3LocaleHref('https://ilab.lv/adsV3?utm_source=fixture&gclid=click-id&service=battery&form=booking#ads-v3-main', 'lv');
  const url = new URL(href, 'https://ilab.lv');
  assert.equal(url.pathname, '/adsV3');
  assert.equal(url.searchParams.get('lang'), 'ru');
  assert.equal(url.searchParams.get('gclid'), 'click-id');
  assert.equal(url.searchParams.get('utm_source'), 'fixture');
  assert.equal(url.searchParams.get('service'), 'battery');
  assert.equal(url.searchParams.get('form'), 'booking');
  assert.equal(url.hash, '#ads-v3-main');
  for (const unknown of [undefined, ['ru'], 'en', 'RU']) assert.equal(getAdsV3Locale(unknown), 'lv');
});

test('inquiry context accepts only existing service and branch identities and supported form modes', () => {
  const services = [{ id: 'battery', title: 'Akumulatora maiņa' }];
  const locations = [{ id: 'spice' }];
  assert.deepEqual(getAdsV3Inquiry({ form: 'booking', service: 'battery', location: 'spice' }, services, locations), {
    mode: 'booking', values: { fault: 'Akumulatora maiņa', location: 'spice' },
  });
  assert.deepEqual(getAdsV3Inquiry({ form: 'unexpected', service: 'unknown', location: 'obsolete', fault: 'Untrusted free text' }, services, locations), { mode: null, values: {} });
});

test('review proof preserves branch rating range instead of inventing an aggregate or missing-data fallback', () => {
  assert.deepEqual(getAdsV3ReviewProof([{ rating: 4.9, count: 867 }, { rating: 5, count: 398 }], 'lv'), { rating: '4,9–5,0', count: 1265 });
  assert.deepEqual(getAdsV3ReviewProof([{ rating: null, count: null }, { rating: 'invalid', count: -1 }, { rating: 6, count: 1.5 }], 'lv'), { rating: null, count: null });
  assert.deepEqual(getAdsV3ReviewProof([{ rating: 5, count: 0 }], 'lv'), { rating: '5,0', count: 0 });
});

test('trust band uses the approved 13+ years and derives review count and rating range from the existing source', () => {
  const summary = { domina: { rating: 4.9, count: 867 }, spice: { rating: 5, count: 398 } };
  for (const locale of ['lv', 'ru']) {
    const items = getAdsV3TrustItems(locale, summary);
    const original = originalCopy.getTrustItems(locale, summary);
    assert.deepEqual(items[0], { ...original[0], value: '13+' });
    assert.deepEqual(items[1], original[1]);
    assert.equal(items[2].value, '1260+');
    assert.equal(items[2].label, originalCopy.getTrustItems(locale, summary)[2].label);
    assert.match(items[2].text, /^4,9–5,0★/);
    assert.match(items[2].text, /Google/);
  }
});

test('trust band omits unavailable review claims and never substitutes a default rating', () => {
  assert.equal(getAdsV3TrustItems('lv', {}).length, 2);
  assert.equal(getAdsV3TrustItems('lv', null).length, 2);
  assert.equal(getAdsV3TrustItems('ru', { domina: null, spice: { count: 'invalid', rating: 8 } }).length, 2);
  const unrated = getAdsV3TrustItems('lv', { domina: { count: 1264 } });
  assert.equal(unrated[2].value, '1260+');
  assert.equal(unrated[2].text, '');
});

test('preview CTA tracking requires existing consent and emits only the anonymous allowlisted action', () => {
  for (const cookie of ['', 'ilab_cookie_consent=rejected', 'other=ilab_cookie_consent=accepted']) {
    const browser = { document: { cookie } };
    trackAdsV3Cta('booking', 'hero', 'lv', browser);
    assert.equal(browser.dataLayer, undefined);
  }
  const browser = { document: { cookie: 'other=x; ilab_cookie_consent=accepted' }, dataLayer: [] };
  trackAdsV3Cta('booking', 'hero', 'ru', browser);
  trackAdsV3Cta('contact', 'mobile_dock', 'lv', browser);
  trackAdsV3Cta('submit', 'hero', 'lv', browser);
  trackAdsV3Cta('booking', 'unknown', 'lv', browser);
  assert.deepEqual(browser.dataLayer, [
    { event: 'ads_v3_cta_click', page_variant: 'ads_v3', preview: true, action: 'booking', placement: 'hero', locale: 'ru' },
    { event: 'ads_v3_cta_click', page_variant: 'ads_v3', preview: true, action: 'contact', placement: 'mobile_dock', locale: 'lv' },
  ]);
});

test('contact dock intents retain consent gating and identify desktop/mobile placement without contact data', () => {
  const browser = { document: { cookie: 'ilab_cookie_consent=accepted' }, dataLayer: [] };
  trackAdsV3Cta('call', 'mobile_dock', 'lv', browser);
  trackAdsV3Cta('whatsapp', 'desktop_dock', 'ru', browser);
  assert.deepEqual(browser.dataLayer.map(({ action, placement, locale }) => ({ action, placement, locale })), [
    { action: 'call', placement: 'mobile_dock', locale: 'lv' },
    { action: 'whatsapp', placement: 'desktop_dock', locale: 'ru' },
  ]);
  assert.ok(browser.dataLayer.every(event => !('phone' in event) && !('location' in event) && event.preview));
  browser.document.cookie = 'ilab_cookie_consent=rejected';
  trackAdsV3Cta('call', 'desktop_dock', 'lv', browser);
  assert.equal(browser.dataLayer.length, 2);
});

test('hero trust claims and ordering follow the original advertising hero without adding figures or guarantees', () => {
  const original = readFileSync(new URL('../app/ads/_components/hero/HeroTrustBar.jsx', import.meta.url), 'utf8');
  const facts = [...original.matchAll(/title: '([^']+)',\s+text: '([^']+)'/g)].map(([, title, text]) => ({ title, text }));
  assert.equal(facts.length, 4);
  assert.deepEqual(getAdsV3Content('lv').trust, facts);
  assert.deepEqual(getAdsV3Content('ru').trust.map(item => `${item.title} ${item.text}`), [
    'Гарантия на выполненные работы', 'Диагностика бесплатно', 'Качественные детали', 'Безопасность данных',
  ]);
});

test('desktop pricing preserves the original destination and uses the existing RU price route', () => {
  const original = readFileSync(new URL('../app/ads/_components/ui/dock/components/FormCtaButtons.jsx', import.meta.url), 'utf8');
  const href = original.match(/const PRICE_PAGE_URL = '([^']+)'/)[1];
  assert.equal(getAdsV3PricesHref('lv'), href);
  assert.equal(getAdsV3PricesHref('ru'), 'https://ilab.lv/ru/ceny');
  assert.ok(original.includes(getAdsV3Content('lv').book));
  assert.ok(original.includes(getAdsV3Content('lv').priceCta));
  const browser = { document: { cookie: 'ilab_cookie_consent=accepted' }, dataLayer: [] };
  trackAdsV3Cta('prices', 'desktop_dock', 'ru', browser);
  assert.equal(browser.dataLayer[0].action, 'prices');
  assert.equal(browser.dataLayer[0].placement, 'desktop_dock');
});

test('assembly content helpers preserve the original advertising copy in both languages', () => {
  const sources = [
    ['speed/LandingSpeed', 'getContent', 'getSpeedContent', 'export default'],
    ['services/LandingServices', 'getServices', 'getServicesContent', 'function ServiceSelector'],
    ['process/LandingProcess', 'getContent', 'getProcessContent', 'export default'],
    ['delivery/LandingDelivery', 'getContent', 'getDeliveryContent', 'export default'],
    ['faq/LandingFaq', 'getContent', 'getFaqContent', 'export default'],
    ['locations/LandingLocations', 'getStrings', 'getLocationStrings', 'function cleanTel'],
    ['final-cta/LandingFinalCta', 'getContent', 'getFinalContent', 'export default'],
    ['footer/LandingFooter', 'getContent', 'getFooterContent', 'function cleanUrl'],
  ];
  const visibleCopy = value => JSON.parse(JSON.stringify(value, (key, item) => ['icon', 'visual'].includes(key) ? undefined : item));
  for (const [file, factory, reused, end] of sources) {
    const source = readFileSync(new URL(`../app/ads/_components/${file}.jsx`, import.meta.url), 'utf8');
    const start = source.indexOf(`function ${factory}(`);
    const finish = source.indexOf(end, start);
    assert.ok(start >= 0 && finish > start, file);
    const body = source.slice(start, finish).replace(/icon: <[A-Za-z]+ \/>,?/g, '');
    const original = vm.runInNewContext(`const normalizeLocale=x=>x==='ru'?'ru':'lv'; ${body}; ${factory}`);
    for (const locale of ['lv', 'ru']) assert.deepEqual(visibleCopy(originalCopy[reused](locale)), visibleCopy(original(locale)), `${file}: ${locale}`);
  }
});

test('brands use the approved device coverage and retain the availability qualification', () => {
  assert.equal(getAdsV3Content('lv').brands.title, 'Profesionāls remonts populārāko zīmolu ierīcēm');
  assert.equal(getAdsV3Content('lv').brands.text, 'Remontējam Apple, Samsung, Xiaomi, Huawei un citu populāru zīmolu telefonus, planšetdatorus un datorus.');
  assert.equal(getAdsV3Content('ru').brands.title, 'Профессиональный ремонт устройств популярных брендов');
  assert.equal(getAdsV3Content('ru').brands.text, 'Ремонтируем телефоны, планшеты и компьютеры Apple, Samsung, Xiaomi, Huawei и других популярных брендов.');
  assert.match(getAdsV3Content('lv').brands.note, /Precizēsim, kā varam palīdzēt/);
});
