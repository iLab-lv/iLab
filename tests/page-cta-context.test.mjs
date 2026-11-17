import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
const require = createRequire(import.meta.url);
const { transformSync } = require('next/dist/build/swc');
function load(file) {
  const { code } = transformSync(readFileSync(file, 'utf8'), { filename: file, jsc: { parser: { syntax: 'ecmascript' } }, module: { type: 'commonjs' } });
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', code)(id => id.startsWith('.') ? load(resolve(dirname(file), id + '.js')) : require(id), compiled, compiled.exports);
  return compiled.exports;
}
const { buildPageCtaCatalog, getPageCtaActions, resolvePageCtaContext, mergeBookingValues } = load('lib/navigation/pageCtaContext.js');
const categories = [
  { key: 'telefonu-remonts', slug: 'telefonu-remonts', labels: { lv: 'Telefons', ru: 'Телефон' }, brands: [
    { key: 'apple', labels: { lv: 'Apple iPhone', ru: 'Apple iPhone' }, route: { dedicatedHubPath: '/iphone-remonts', preferDedicatedHub: true } },
    { key: 'samsung', name: 'Samsung' },
  ] },
  { key: 'plansetdatoru-remonts', slug: 'plansetdatoru-remonts', labels: { lv: 'Planšetdators', ru: 'Планшет' }, brands: [{ key: 'ipad', name: 'Apple iPad' }] },
  { key: 'datoru-remonts', slug: 'datoru-remonts', name: 'Dators', brands: [{ key: 'macbook', name: 'MacBook' }] },
  { key: 'dyson-remonts', slug: 'dyson-remonts', name: 'Dyson', brands: [] },
];
const devices = [
  ...['iphone-13', 'iphone-14', 'new-model'].map(slug => ({ slug, categoryKey: 'telefonu-remonts', brandKey: 'apple', name: slug === 'new-model' ? 'New Model' : 'iPhone ' + slug.split('-')[1] })),
  { slug: 'galaxy-s24', categoryKey: 'telefonu-remonts', brandKey: 'samsung', name: 'Samsung Galaxy S24' },
  { slug: 'ipad-air', categoryKey: 'plansetdatoru-remonts', brandKey: 'ipad', name: 'iPad Air' },
  { slug: 'macbook-pro', categoryKey: 'datoru-remonts', brandKey: 'macbook', name: 'MacBook Pro' },
];
const priceDevices = devices.filter(device => device.slug !== 'new-model').map(device => ({ ...device, category: device.categoryKey, brandSlug: device.brandKey }));
const catalog = buildPageCtaCatalog({ categories, devices, priceDevices,
  servicePages: ['/iphone-remonts/baterijas-maina', '/telefonu-remonts/baterijas-maina'],
  serviceLabels: { 'baterijas-maina': { lv: 'Baterijas maiņa', ru: 'Замена батареи' } },
});
const actions = (path, query = '') => getPageCtaActions(path, new URLSearchParams(query), catalog, path.startsWith('/ru') ? '/ru/ceny' : '/cenas');

test('homepage and unknown/invalid paths have empty booking and default localized prices', () => {
  for (const path of ['/', '/ru', '/par-mums', '/iphone-remonts/obsolete', '/iphone-remonts/unknown-service', '/%bad', '/iphone-remonts/iphone-13/unknown/extra']) {
    assert.deepEqual(actions(path), { booking: {}, pricesHref: path.startsWith('/ru') ? '/ru/ceny#brand-list' : '/cenas#brand-list' });
  }
});
test('hubs and brand pages use real category/brand data and existing picker identifiers', () => {
  assert.deepEqual(actions('/iphone-remonts'), { booking: { device: 'iPhone' }, pricesHref: '/cenas?brand=iphone#brand-list' });
  assert.deepEqual(actions('/ru/remont-iphone'), { booking: { device: 'iPhone' }, pricesHref: '/ru/ceny?brand=iphone#brand-list' });
  assert.deepEqual(actions('/ru/remont-planshetov'), { booking: { device: 'Планшет' }, pricesHref: '/ru/ceny?brand=ipad#brand-list' });
  assert.deepEqual(actions('/telefonu-remonts/samsung'), { booking: { device: 'Samsung' }, pricesHref: '/cenas?brand=samsung#brand-list' });
  assert.deepEqual(actions('/dyson-remonts'), { booking: { device: 'Dyson' }, pricesHref: '/cenas#brand-list' });
  assert.equal(actions('/telefonu-remonts').pricesHref, '/cenas?brand=samsung#brand-list');
  assert.equal(actions('/ru/remont-telefonov').pricesHref, '/ru/ceny?brand=samsung#brand-list');
  assert.equal(actions('/datoru-remonts').pricesHref, '/cenas?brand=macbook#brand-list');
  assert.equal(actions('/ru/remont-noutbukov').pricesHref, '/ru/ceny?brand=macbook#brand-list');
});
test('exact model resolution validates its category and brand and changes with LV/RU paths', () => {
  for (const [path, device, href] of [
    ['/iphone-remonts/iphone-13', 'iPhone 13', '/cenas?brand=iphone&model=iphone-13#brand-list'],
    ['/ru/remont-iphone/iphone-14', 'iPhone 14', '/ru/ceny?brand=iphone&model=iphone-14#brand-list'],
    ['/telefonu-remonts/samsung/galaxy-s24', 'Samsung Galaxy S24', '/cenas?brand=samsung&model=galaxy-s24#brand-list'],
  ]) assert.deepEqual(actions(path), { booking: { device }, pricesHref: href });
  assert.deepEqual(actions('/telefonu-remonts/samsung/iphone-13').booking, {});
  assert.equal(actions('/iphone-remonts/new-model').booking.device, 'New Model');
  assert.equal(actions('/iphone-remonts/new-model').pricesHref, '/cenas?brand=iphone#brand-list');
});
test('service model queries reuse exact catalog models and localized service copy', () => {
  assert.deepEqual(actions('/iphone-remonts/baterijas-maina'), { booking: { device: 'iPhone', fault: 'Baterijas maiņa' }, pricesHref: '/cenas?brand=iphone#brand-list' });
  assert.deepEqual(actions('/ru/remont-iphone/zamena-batarei', 'model=iphone-13'), { booking: { device: 'iPhone 13', fault: 'Замена батареи' }, pricesHref: '/ru/ceny?brand=iphone&model=iphone-13#brand-list' });
  for (const model of ['obsolete', 'galaxy-s24', 'ipad-air']) assert.equal(actions('/iphone-remonts/baterijas-maina', 'model=' + model).booking.device, 'iPhone');
  assert.equal(actions('/telefonu-remonts/baterijas-maina', 'model=galaxy-s24').booking.device, 'Samsung Galaxy S24');
  assert.deepEqual(actions('/', 'model=iphone-13').booking, {});
});
test('explicit inline context wins and incompatible inferred faults are dropped', () => {
  const inferred = { device: 'iPhone 13', fault: 'Baterijas maiņa' };
  assert.deepEqual(mergeBookingValues(inferred, { fault: 'Exact price row' }), { device: 'iPhone 13', fault: 'Exact price row' });
  assert.deepEqual(mergeBookingValues(inferred, { device: 'Samsung' }), { device: 'Samsung' });
  assert.deepEqual(mergeBookingValues(inferred, { device: '', fault: '' }), { device: '', fault: '' });
  assert.deepEqual(mergeBookingValues(inferred, { location: 'spice' }), { ...inferred, location: 'spice' });
  assert.deepEqual(inferred, { device: 'iPhone 13', fault: 'Baterijas maiņa' });
});
test('existing generic service brand queries constrain model context and retain localized fault text', () => {
  assert.deepEqual(actions('/telefonu-remonts/baterijas-maina', 'brand=samsung'), { booking: { device: 'Samsung', fault: 'Baterijas maiņa' }, pricesHref: '/cenas?brand=samsung#brand-list' });
  assert.deepEqual(actions('/ru/remont-telefonov/zamena-batarei', 'brand=samsung&model=galaxy-s24'), { booking: { device: 'Samsung Galaxy S24', fault: 'Замена батареи' }, pricesHref: '/ru/ceny?brand=samsung&model=galaxy-s24#brand-list' });
  assert.equal(actions('/telefonu-remonts/baterijas-maina', 'brand=samsung&model=iphone-13').booking.device, 'Samsung');
  assert.equal(actions('/telefonu-remonts/baterijas-maina', 'brand=obsolete').booking.device, 'Telefons');
  assert.equal(actions('/iphone-remonts/baterijas-maina', 'brand=samsung').booking.device, 'iPhone');
});
test('new catalog models work without adding dock exceptions', () => {
  const context = resolvePageCtaContext('/plansetdatoru-remonts/ipad/ipad-air', new URLSearchParams(), catalog);
  assert.equal(context.model, 'ipad-air');
  assert.equal(context.booking.device, 'iPad Air');
  assert.equal(context.priceBrand, 'ipad');
});
