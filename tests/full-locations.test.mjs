import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
const { transformSync } = require('next/dist/build/swc');
const base = 'app/_components/sections/full-locations/';
const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
function load(file) {
  const { code } = transformSync(read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const m = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id.endsWith('/ContactActions')) return load('app/_components/sections/contact-actions/ContactActions.jsx');
    if (id.includes('useLocationClock')) return load(base + 'useLocationClock.js');
    if (id.endsWith('.scss')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
    if (id.endsWith('/locationState')) return load(base + 'locationState.js');
    if (id.endsWith('/fullLocations.content')) return load(base + 'fullLocations.content.js');
    if (id.includes('locations.i18n')) return load('app/(site)/sections/locations/locations.i18n.js');
    return require(id);
  }, m, m.exports, React);
  return m.exports;
}
const { getAvailability, locationLinks } = load(base + 'locationState.js');
const FullLocations = load(base + 'FullLocations.jsx').default;
const hours = Array.from({ length: 7 }, () => ({ opens: '10:00', closes: '21:00' }));
const location = { id: 'domina', label: 'Domina Shopping', address: 'Address', tel: '+371 12345678', email: 'branch@example.com', hours };

test('Riga status respects opening/closing boundaries, location hours, locale and hydration placeholder', () => {
  assert.equal(getAvailability(location, [], null, 'lv').text, 'Darba laiks');
  assert.equal(getAvailability(location, [], new Date('2026-11-09T07:59:00Z'), 'lv').open, false);
  assert.equal(getAvailability(location, [], new Date('2026-11-09T08:00:00Z'), 'lv').open, true);
  assert.equal(getAvailability(location, [], new Date('2026-11-09T18:59:00Z'), 'ru').text, 'Открыто - до 21:00');
  assert.equal(getAvailability(location, [], new Date('2026-11-09T19:00:00Z'), 'lv').open, false);
  const spice = { ...location, hours: hours.map((h, i) => i === 6 ? { ...h, closes: '20:00' } : h) };
  assert.equal(getAvailability(spice, [], new Date('2026-11-08T18:00:00Z'), 'ru').open, false);
  assert.equal(getAvailability(location, [], new Date('2026-11-08T18:00:00Z'), 'ru').open, true);
  assert.equal(getAvailability(location, [], new Date('2026-03-29T07:00:00Z'), 'lv').open, true);
});
test('date overrides and fallback schedules survive extraction', () => {
  const now = new Date('2026-11-09T10:00:00Z');
  const overridden = { ...location, hoursOverride: { date: '2026-11-09', closed: true } };
  const state = getAvailability(overridden, [], now, 'ru');
  assert.equal(state.open, false);
  assert.equal(state.override.closed, true);
  assert.match(state.text, /завтра 10:00/);
  assert.equal(getAvailability({ ...overridden, hoursOverride: { date: '2026-11-10', closed: true } }, [], now, 'lv').open, true);
  assert.equal(getAvailability({ ...location, hours: [] }, hours, now, 'lv').open, true);
  assert.equal(getAvailability({ ...location, hours: hours.map(() => ({ closed: true })) }, [], now, 'lv').text, 'Slēgts');
});
test('contact/navigation destinations preserve configured links and existing fallbacks', () => {
  const links = locationLinks({ ...location, telLink: 'tel:+37187654321', wa: 'https://wa.me/37187654321', waze: 'https://waze.com/ul?favorite=yes', maps: 'https://maps.example/branch' });
  assert.deepEqual(links, { tel: 'tel:+37187654321', wa: 'https://wa.me/37187654321', waze: 'https://waze.com/ul?favorite=yes', maps: 'https://maps.example/branch' });
  assert.equal(locationLinks(location).tel, 'tel:+37112345678');
  assert.equal(locationLinks(location).wa, 'https://wa.me/37112345678');
  assert.match(locationLinks({ ...location, geo: { lat: 56.9, lng: 24.1 } }).waze, /ll=56.9,24.1/);
  assert.match(locationLinks(location).waze, /q=Domina%20Shopping%2C%20Address/);
  assert.equal(locationLinks({}).tel, null);
  assert.equal(locationLinks({}).wa, null);
});
test('LV/RU server output has one panel before the map, native hours, selected tab/marker and correct link hierarchy', () => {
  for (const locale of ['lv', 'ru']) {
    const html = renderToStaticMarkup(React.createElement(FullLocations, { locale, locations: [location, { ...location, id: 'spice', label: 'Spice Life' }] }));
    assert.match(html, /role="tablist"/);
    assert.equal((html.match(/role="tabpanel"/g) || []).length, 1);
    assert.equal((html.match(/aria-selected="true"/g) || []).length, 1);
    assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1);
    assert.ok(html.indexOf('role="tabpanel"') < html.indexOf('data-scan="x"'));
    assert.ok(html.indexOf('mailto:') < html.indexOf('<details'));
    assert.ok(html.indexOf('data-contact-actions') < html.indexOf('data-contact-directions'));
    assert.match(html, /<details[^>]*><summary>/);
    assert.equal((html.match(/<tr>/g) || []).length, 7);
    assert.match(html, locale === 'ru' ? /Как добраться/ : /Maršruts uz servisu/);
  }
  assert.equal(renderToStaticMarkup(React.createElement(FullLocations)), '');
});
test('Service consumers share Full Locations; protected legacy and compact contacts retain their exports', () => {
  for (const file of ['app/(site)/HomePage.jsx', 'app/(site)/(info)/kontakti/ContactsPage.jsx', 'app/(site)/(info)/par-mums/AboutPage.jsx', 'app/_components/page-sections/photo-repair/PhotoRepairPage.jsx', 'app/_components/sections/catalog-hub/HubLocations.jsx']) {
    const source = read(file);
    assert.match(source, /<FullLocations\b/, file);
    assert.doesNotMatch(source, /LandingCtaProvider|<LandingLocations\b/, file);
  }
  assert.match(read('app/(site)/HomeInteractions.jsx'), /export function HomeBranchStrip/);
  assert.match(read('app/(site)/HomeInteractions.jsx'), /export function HomeLocations/);
});
