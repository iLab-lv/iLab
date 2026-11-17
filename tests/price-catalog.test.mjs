import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const { transformSync } = require('next/dist/build/swc');
function load(file) {
  const { code } = transformSync(readFileSync(file, 'utf8'), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id.endsWith('.scss')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
    if (id === 'react') return React;
    if (id === 'next/image') return { __esModule: true, default: ({ alt }) => React.createElement('img', { alt }) };
    if (id === 'next/link') return { __esModule: true, default: ({ href, children }) => React.createElement('a', { href }, children) };
    return id.startsWith('.') ? load(resolve(dirname(file), id + '.js')) : require(id);
  }, compiled, compiled.exports, React);
  return compiled.exports;
}
const { buildPriceDevices } = load('lib/pricing/priceCatalog.js');
const { buildPageCtaCatalog, getPageCtaActions } = load('lib/navigation/pageCtaContext.js');
const Pricelist = load('app/(site)/sections/service-pricelist/ServicePricelist.jsx').default;
const categories = [{ key: 'telefonu-remonts', slug: 'telefonu-remonts', brands: [{
  key: 'apple', labels: { lv: 'Apple iPhone', ru: 'Apple iPhone' },
  route: { dedicatedHubPath: '/iphone-remonts', preferDedicatedHub: true },
  series: [
    { key: 'duo', labels: { lv: 'iPhone Duo', ru: '' }, order: 0 },
    { key: '18', labels: { lv: 'iPhone 18 sērija', ru: 'Серия iPhone 18' }, order: 10 },
    { key: '17', labels: { lv: 'iPhone 17 sērija', ru: 'Серия iPhone 17' }, order: 20 },
  ],
}] }];
const devices = [
  { slug: 'iphone-18-pro', name: { lv: 'iPhone 18 Pro', ru: 'iPhone 18 Pro' }, categoryKey: 'telefonu-remonts', brandKey: 'apple', seriesKey: '18', year: 2026, image: '/live-18.webp' },
  { slug: 'iphone-duo', name: 'iPhone Duo', categoryKey: 'telefonu-remonts', brandKey: 'apple', seriesKey: 'duo', year: 2026 },
  { slug: 'iphone-17', name: 'iPhone 17', categoryKey: 'telefonu-remonts', brandKey: 'apple', seriesKey: '17', year: 2025 },
];
const legacy = [
  { slug: 'iphone-17', name: 'Old label', category: 'telefonu-remonts', brandSlug: 'apple', series: 'Old series', year: 2025, image: '/legacy-17.webp' },
  { slug: 'legacy-samsung', name: 'Legacy Samsung', category: 'telefonu-remonts', brandSlug: 'samsung', year: 2020 },
];

test('live models extend the price picker, override duplicates and preserve legacy coverage without mutating sources', () => {
  const before = structuredClone({ devices, categories, legacy });
  const result = buildPriceDevices(devices, categories, legacy);
  assert.equal(result.length, 4);
  assert.equal(result.filter(device => device.slug === 'iphone-17').length, 1);
  assert.equal(result.find(device => device.slug === 'iphone-17').name, 'iPhone 17');
  assert.equal(result.find(device => device.slug === 'iphone-17').image, '/legacy-17.webp');
  assert.equal(result.find(device => device.slug === 'iphone-18-pro').pickerBrandSlug, 'iphone');
  assert.equal(result.find(device => device.slug === 'iphone-18-pro').series, 'iPhone 18 sērija');
  assert.ok(result.some(device => device.slug === 'legacy-samsung'));
  assert.deepEqual({ devices, categories, legacy }, before);
});

test('LV/RU series labels follow the public metadata and its existing Latvian fallback', () => {
  const result = buildPriceDevices(devices, categories, legacy, 'ru');
  assert.equal(result.find(device => device.slug === 'iphone-18-pro').series, 'Серия iPhone 18');
  assert.equal(result.find(device => device.slug === 'iphone-duo').series, 'iPhone Duo');
  assert.deepEqual(buildPriceDevices([{ slug: 'incomplete' }], categories), []);
  assert.deepEqual(buildPriceDevices([{ slug: 'unconfigured', categoryKey: 'other', brandKey: 'other' }], categories), []);
});

test('the actual selector follows configured series order and selects a new model without requiring a published price', () => {
  for (const locale of ['lv', 'ru']) {
    const models = buildPriceDevices(devices, categories, legacy, locale);
    const render = props => renderToStaticMarkup(React.createElement(Pricelist, { devices: models, brandSlug: 'iphone', locale, cta: null, ...props }));
    const initial = render({});
    assert.ok(initial.indexOf('iPhone Duo') < initial.indexOf(locale === 'ru' ? 'Серия iPhone 18' : 'iPhone 18 sērija'));
    const selected = render({ selectedModel: 'iphone-18-pro' });
    assert.match(selected, /class="modelName">iPhone 18 Pro</);
    assert.match(selected, locale === 'ru' ? /по запросу/ : /pēc pieprasījuma/);
    const free = render({ selectedModel: 'iphone-18-pro', pricing: { 'iphone-18-pro': { items: [{ id: 'diagnostic', price: 0 }] } } });
    assert.match(free, /€ 0/);
  }
});

test('new public model links receive the same price selection catalog without a separate dock model list', () => {
  const priceDevices = buildPriceDevices(devices, categories, legacy);
  const catalog = buildPageCtaCatalog({ devices, categories, priceDevices });
  for (const [path, pricePath] of [['/iphone-remonts/iphone-18-pro', '/cenas'], ['/ru/remont-iphone/iphone-18-pro', '/ru/ceny']]) {
    assert.equal(getPageCtaActions(path, new URLSearchParams(), catalog, pricePath).pricesHref, `${pricePath}?brand=iphone&model=iphone-18-pro#brand-list`);
  }
});
