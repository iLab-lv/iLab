import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
const { transformSync } = require('next/dist/build/swc');
const base = 'app/_components/sections/';
const read = f => readFileSync(new URL('../' + f, import.meta.url), 'utf8');
function load(file) {
  const { code } = transformSync(read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const m = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id.endsWith('.scss')) return { __esModule: true, default: {} };
    if (id.includes('UiDialogsProvider')) return { useUiDialogs: () => ({ openContact: () => {} }) };
    if (id.endsWith('/ContactActions')) return load(base + 'contact-actions/ContactActions.jsx');
    if (id.includes('useLocationClock')) return load(base + 'full-locations/useLocationClock.js');
    if (id.endsWith('/locationState')) return load(base + 'full-locations/locationState.js');
    if (id.endsWith('/fullLocations.content')) return load(base + 'full-locations/fullLocations.content.js');
    if (id.includes('locations.i18n')) return load('app/(site)/sections/locations/locations.i18n.js');
    return require(id);
  }, m, m.exports, React);
  return m.exports;
}
const Quick = load(base + 'quick-contacts/QuickContacts.jsx').default;
const Actions = load(base + 'contact-actions/ContactActions.jsx');
const locations = ['domina', 'spice'].map((id, i) => ({ id, label: i ? 'Spice Life' : 'Domina Shopping', address: 'Address ' + i, tel: '+371 1234567' + i, telLink: 'tel:+3711234567' + i, email: id + '@example.com', wa: 'https://wa.me/3711234567' + i, maps: 'https://maps.example/' + id, waze: 'https://waze.example/' + id }));
test('Quick Contacts preserves two compact branch presentations and localized hours actions without a map', () => {
  for (const locale of ['lv', 'ru']) {
    const html = renderToStaticMarkup(React.createElement(Quick, { locale, locations }));
    assert.equal((html.match(/<article/g) || []).length, 2);
    assert.equal((html.match(/data-contact-call/g) || []).length, 2);
    assert.equal((html.match(/data-contact-whatsapp/g) || []).length, 2);
    assert.equal((html.match(/data-contact-directions/g) || []).length, 2);
    assert.equal((html.match(/<button/g) || []).length, 2);
    assert.match(html, locale === 'ru' ? /Как добраться/ : /Maršruts uz servisu/);
    assert.match(html, locale === 'ru' ? /Время работы/ : /Darba laiks/);
    assert.doesNotMatch(html, /<img|data-full-locations|Spice Home/);
    for (const location of locations) for (const value of [location.label, location.address, location.telLink, location.email, location.wa, location.maps, location.waze]) assert.ok(html.includes(value), value);
  }
  assert.equal(renderToStaticMarkup(React.createElement(Quick)), '');
});
test('shared contact actions retain genuine destinations and separate route navigation', () => {
  for (const location of locations) {
    const html = renderToStaticMarkup(React.createElement(Actions.default, { location }));
    assert.ok(html.includes(location.telLink));
    assert.ok(html.includes(location.wa));
    assert.doesNotMatch(html, /Waze|Google Maps|mailto:/);
    const routes = renderToStaticMarkup(React.createElement(Actions.ContactDirections, { location }));
    assert.ok(routes.includes(location.waze));
    assert.ok(routes.includes(location.maps));
    assert.doesNotMatch(routes, /data-contact-call|data-contact-whatsapp/);
  }
});
test('WhatsApp palette follows the read-only AdsV2 reference and retains reduced-motion/focus treatment', () => {
  const css = read(base + 'contact-actions/ContactActions.module.scss').replace(/\s/g, '');
  const reference = read('app/adsV2/AdsV2.module.scss').replace(/\s/g, '');
  for (const value of ['rgba(37,211,102,.12)', 'rgba(37,211,102,.34)', '#7deba6']) { assert.ok(css.includes(value)); assert.ok(reference.includes(value)); }
  assert.match(css, /:hover.*background:#25d366/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /outline:2pxsolidvar\(--service-signal\)/);
});
test('shared brand/model/service/info templates receive one compact section and hubs retain full maps', () => {
  const consumers = ['telefonu-remonts/[brand]/PhoneBrandPage', 'plansetdatoru-remonts/[brand]/TabletBrandPage', 'datoru-remonts/[brand]/ComputerBrandPage', 'iphone-remonts/[device]/IphoneDevicePage'].map(f => 'app/(site)/(catalog)/' + f + '.jsx');
  consumers.push(base + 'device-detail/DeviceDetailPage.jsx', 'app/(site)/(info)/cenas/CenasPage.jsx', 'app/(site)/(info)/buj/BujPage.jsx');
  function services(dir) { for (const e of readdirSync(new URL('../' + dir, import.meta.url), { withFileTypes: true })) { const f = dir + '/' + e.name; if (e.isDirectory()) services(f); else if (/ServicePage\.jsx$/.test(e.name)) consumers.push(f); } }
  services('app/(site)/(catalog)/iphone-remonts/(services)');
  services('app/(site)/(catalog)/telefonu-remonts/(services)');
  assert.equal(consumers.length, 21);
  for (const file of consumers) { const s = read(file); assert.equal((s.match(/<QuickContactsSection\b/g) || []).length, 1, file); assert.doesNotMatch(s, /<FullLocations\b|<ModelLocations\b|<ServiceLocations\b/, file); }
  for (const f of ['telefonu-remonts/PhoneRepairPage', 'plansetdatoru-remonts/TabletRepairPage', 'datoru-remonts/ComputerRepairPage']) assert.equal((read('app/(site)/(catalog)/' + f + '.jsx').match(/<HubLocations\b/g) || []).length, 1);
  const home = read('app/(site)/HomePage.jsx');
  assert.equal((home.match(/<QuickContacts\b/g) || []).length, 1);
  assert.equal((home.match(/<FullLocations\b/g) || []).length, 1);
  assert.ok(home.indexOf('<QuickContacts ') < home.indexOf('<FullLocations '));
});
test('data is resolved at the server boundary; dedicated Contacts/About/Booking avoid redundant quick sections', () => {
  const adapter = read(base + 'quick-contacts/QuickContactsSection.jsx');
  assert.match(adapter, /getSiteSettings\(\)/);
  assert.match(adapter, /locations=\{settings.locations\}/);
  assert.doesNotMatch(read(base + 'quick-contacts/QuickContacts.jsx'), /firebase|getSiteSettings|collection\(/i);
  for (const file of ['kontakti/ContactsPage', 'par-mums/AboutPage', 'pieraksties-remontam/PierakstiesPage', 'noteikumi/TermsPage']) assert.doesNotMatch(read('app/(site)/(info)/' + file + '.jsx'), /<QuickContacts/);
});
