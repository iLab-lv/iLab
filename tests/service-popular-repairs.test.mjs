import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import test from 'node:test';
const require = createRequire(import.meta.url);
const { transform } = require('next/dist/build/swc');
const read = file => readFile(new URL('../' + file, import.meta.url), 'utf8');
async function evaluate(file, dependencies = {}) {
  const { code } = await transform(await read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id === 'react' || id === 'react-icons/lu') return require(id);
    if (id === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
    if (id.endsWith('.scss')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
    if (id in dependencies) return dependencies[id];
    throw new Error('Unexpected dependency: ' + id);
  }, module, module.exports, React);
  return module.exports;
}
const base = 'app/_components/sections/';
const model = await evaluate(base + 'popular-repairs/popularRepairs.model.js');
const renderer = await evaluate(base + 'popular-repairs/PopularRepairs.jsx', { './popularRepairs.model': model });
const render = props => renderToStaticMarkup(React.createElement(renderer.default, { title: 'Source repairs', ...props }));
const resolver = await evaluate('lib/pricing/resolveServicePricing.js');
const association = await evaluate(base + 'popular-repairs/iphoneRepairPrices.js', { '@/lib/pricing/resolveServicePricing': resolver });
const translations = await evaluate('lib/routes/routeTranslations.js');
const routes = await evaluate('lib/routes/routeI18n.js', { './routeTranslations': translations });
const content = await evaluate(base + 'popular-services/popularServices.i18n.js', { '@/lib/routes/routeI18n': routes });
const modelServices = await evaluate(base + 'device-detail/ModelServices.jsx', {
  '../popular-services/popularServices.i18n': content, '../popular-repairs/PopularRepairs': renderer,
  '../popular-repairs/iphoneRepairPrices': association,
});
const brandServices = await evaluate(base + 'catalog-brand/BrandServices.jsx', { '../popular-repairs/PopularRepairs': renderer });
const hub = await evaluate(base + 'catalog-hub/HubPopularServices.jsx', {
  '../popular-repairs/PopularRepairs': renderer, '../popular-services/popularServices.i18n': content,
  '../popular-repairs/iphoneRepairPrices': association,
  '@/lib/pricing/getStartingServicePrices': { getStartingServicePrices: async (_category, _brand, locale) => [
    { id: 'phone-display-original', title: locale === 'ru' ? 'Оригинал' : 'Oriģināls', price: 123, isStartingFrom: true },
    { id: 'phone-display-incell', title: 'Incell', price: 77, isStartingFrom: true },
  ] },
});
const adapters = await evaluate(base + 'popular-services/PopularServices.jsx', {
  './popularServices.i18n': content, '../popular-repairs/PopularRepairs': renderer, '../catalog-hub/HubPopularServices': hub,
});

test('all presentation variants support independent price/action combinations without empty offer zones', () => {
  for (const variant of ['featured', 'compact', 'informational']) {
    for (const price of [undefined, { kind: 'amount', value: 127 }, { kind: 'amount', value: 89, isStartingFrom: true }, { kind: 'model' }, { kind: 'request' }, { kind: 'diagnostic' }]) {
      const items = [{ title: 'Repair', description: 'Source description', note: 'Technical note', price }];
      const html = render({ variant, items });
      assert.match(html, new RegExp('data-popular-repairs="' + variant + '"'));
      assert.ok(html.includes('Source description') && html.includes('Technical note'));
      assert.doesNotMatch(html, /class="offer"/);
      assert.doesNotMatch(html, /class="actions"|<a\b|↗/);
    }
  }
  assert.equal(render({ items: [] }), '');
});

test('action priority, meaningful labels and deduplication depend only on supplied capabilities', () => {
  const actions = [
    { kind: 'contact', href: '/kontakti' }, { kind: 'service', href: '/iphone-remonts/ekrana-maina' },
    { kind: 'model', href: '#models' }, { kind: 'service', href: '#models' },
    { kind: 'contact', href: 'javascript:alert(1)' }, { kind: 'model', href: '#' },
  ];
  for (const locale of ['lv', 'ru']) {
    assert.deepEqual(model.resolveRepairActions(actions, locale).map(x => x.kind), ['model', 'service']);
    const html = render({ locale, items: [{ title: 'Display', actions }] });
    assert.equal((html.match(/<a\b/g) || []).length, 2);
    assert.ok(html.includes(model.repairLabels(locale).models));
    assert.ok(html.includes(model.repairLabels(locale).service));
    assert.doesNotMatch(html, /javascript:|href="#"/);
    const contact = model.resolveRepairActions([{ kind: 'contact', href: '/kontakti' }], locale);
    assert.equal(contact[0].label, model.repairLabels(locale).contact);
  }
  assert.equal(actions.length, 6, 'input not mutated');
});

test('Popular Repairs shows one lowest amount while resolved variant data stays intact', () => {
  const services = [
    { id: 'phone-display-original', labels: { lv: 'Original', ru: 'Оригинал' }, order: 1 },
    { id: 'phone-display-oled', labels: { lv: 'OLED', ru: 'OLED' }, order: 2 },
    { id: 'phone-display-incell', labels: { lv: 'Incell', ru: 'Incell' }, order: 3 },
    { id: 'phone-battery', labels: { lv: 'Battery', ru: 'Батарея' }, order: 4 },
  ];
  const rows = [{ serviceId: services[0].id, price: 199 }, { serviceId: services[1].id, price: 140, isStartingFrom: true }, { serviceId: services[3].id, price: 0 }];
  for (const locale of ['lv', 'ru']) {
    const resolved = resolver.resolveServicePriceItems(services, rows, { locale });
    const screen = association.selectIphoneRepairPrices('ekrana-maina', resolved);
    assert.deepEqual(screen.map(x => x.id), services.slice(0, 3).map(x => x.id));
    const before = structuredClone(screen);
    const lines = model.getRepairPriceLines({ kind: 'options', items: screen }, locale);
    assert.equal(lines.length, 1);
    assert.equal(lines[0].numeric, true);
    assert.match(lines[0].value, /140/);
    assert.ok(lines[0].value.startsWith(model.repairLabels(locale).from));
    assert.equal(lines[0].label, undefined);
    assert.match(model.getRepairPriceLines({ kind: 'amount', value: 0 }, locale)[0].value, /0/);
    assert.deepEqual(screen, before);
    const html = renderToStaticMarkup(React.createElement(modelServices.default, { iphone: true, modelName: 'iPhone fixture', locale, priceItems: resolved }));
    assert.doesNotMatch(html, /Original|Оригинал|OLED|Incell/);
    assert.ok(html.includes(model.formatRepairAmount(140, { locale, isStartingFrom: true })));
    assert.ok(html.includes('href="#cenas"'));
  }
  assert.equal(model.formatRepairAmount(null), model.repairLabels().request);
});

test('hub renders one lowest authoritative starting amount per service with supporting actions', async () => {
  for (const locale of ['lv', 'ru']) {
    const html = renderToStaticMarkup(await hub.default({ locale }));
    assert.equal((html.match(/<li\b/g) || []).length, 8);
    assert.equal((html.match(/href="#iphone-modeli"/g) || []).length, 8);
    assert.ok(!html.includes(model.formatRepairAmount(123, { locale, isStartingFrom: true })));
    assert.ok(html.includes(model.formatRepairAmount(77, { locale, isStartingFrom: true })));
    assert.doesNotMatch(html, /Oriģināls|Оригинал|Incell/);
    assert.match(html, /class="supporting"/);
    assert.doesNotMatch(html, /No 15|От 29/);
    for (const item of content.getIphonePopularServices(locale).services) {
      assert.ok(html.includes('href="' + item.href + '"'));
      assert.ok(item.href.startsWith(locale === 'ru' ? '/ru/remont-iphone/' : '/iphone-remonts/'));
    }
  }
});

test('brand finder unavailable means no fabricated anchor; informational rows retain distinct diagnostic labels', () => {
  for (const locale of ['lv', 'ru']) {
    const props = { title: 'Repairs', locale, items: [{ title: 'Repair', text: 'Source text' }] };
    const none = renderToStaticMarkup(React.createElement(brandServices.default, props));
    assert.doesNotMatch(none, /<a\b|class="offer"/);
    const present = renderToStaticMarkup(React.createElement(brandServices.default, { ...props, modelAction: { href: '#brand-modeli' } }));
    assert.match(present, /href="#brand-modeli"/);
    const diagnostic = locale === 'ru' ? 'Цена: после диагностики' : 'Cena: pēc diagnostikas';
    const specific = locale === 'ru' ? 'Цена: зависит от модели и неисправности' : 'Cena: pēc modeļa un bojājuma';
    const html = renderToStaticMarkup(React.createElement(adapters.default, { locale, variant: 'photo', content: {
      copy: { titleStart: 'Camera', titleAccent: ' repairs', intro: 'Source introduction' },
      services: [{ title: 'General', description: 'Source', price: diagnostic }, { title: 'Controls', description: 'More source', price: specific }],
    } }));
    assert.ok(html.includes(diagnostic) && html.includes(specific));
    assert.doesNotMatch(html, /<a\b|class="offer"|↗/);
  }
});

test('specialist related repairs exclude the current service and preserve destinations', () => {
  for (const locale of ['lv', 'ru']) for (const excludeServiceKey of ['ekrana-maina', 'baterijas-maina', 'aizmugures-vacina-maina', 'udens-bojajumu-remonts']) {
    const html = renderToStaticMarkup(React.createElement(adapters.default, { locale, variant: 'other-services', excludeServiceKey }));
    const items = content.getIphonePopularServices(locale).services;
    assert.equal((html.match(/<li\b/g) || []).length, 7);
    assert.ok(!html.includes('href="' + items.find(x => x.serviceKey === excludeServiceKey).href + '"'));
    assert.doesNotMatch(html, /#iphone-modeli|class="prices"/);
  }
});

test('brand action availability uses the same brand/category filtering as the real finder', async () => {
  const groups = await evaluate('app/(site)/components/device-grid/deviceGrid.groups.js');
  const categoryDevices = [{ slug: 'macbook-fixture', brandKey: 'macbook', categoryKey: 'datoru-remonts' }];
  assert.equal(groups.dedupeAndSort(categoryDevices, 'asus', 'datoru-remonts').length, 0);
  assert.equal(groups.dedupeAndSort(categoryDevices, 'macbook', 'datoru-remonts').length, 1);
  for (const [category, name] of [['telefonu-remonts', 'Phone'], ['plansetdatoru-remonts', 'Tablet'], ['datoru-remonts', 'Computer']]) {
    const source = await read(`app/(site)/(catalog)/${category}/[brand]/${name}BrandPage.jsx`);
    assert.match(source, /modelAction=\{(?:cfg\.hasModels && )?dedupeAndSort\(devicesAll, brandSlug, CATEGORY_KEY\)\.length > 0/);
    assert.doesNotMatch(source, /modelAction=\{[^\n]*devicesAll\.length/);
  }
});

test('starting bounds use only configured exact variants and listed models after authoritative visibility/applicability filtering', () => {
  const services = [
    { id: 'phone-display-original', labels: { lv: 'Original' }, order: 1 },
    { id: 'phone-display-oled', labels: { lv: 'OLED' }, order: 2, iphoneOnly: true },
    { id: 'inactive', isActive: false, labels: { lv: 'Inactive' } },
    { id: 'missing', labels: { lv: 'Missing' } },
  ];
  const models = [{ slug: 'iphone-a', brandKey: 'apple' }, { slug: 'iphone-b', brandKey: 'apple' }];
  const rows = [
    { modelId: 'iphone-a', serviceId: 'phone-display-original', price: 190 },
    { modelId: 'iphone-b', serviceId: 'phone-display-original', price: 160 },
    { modelId: 'iphone-a', serviceId: 'phone-display-oled', price: 100 },
    { modelId: 'iphone-b', serviceId: 'phone-display-oled', price: 50, isHidden: true },
    { modelId: 'unlisted', serviceId: 'phone-display-original', price: 1 },
    { modelId: 'iphone-a', serviceId: 'inactive', price: 1 },
    { modelId: 'iphone-a', serviceId: 'missing', price: 0, isActive: false },
  ];
  const before = structuredClone(rows);
  const prices = resolver.resolveStartingServicePriceItems(services, rows, models);
  assert.deepEqual(prices.map(p => [p.id, p.price, p.isStartingFrom]), [
    ['phone-display-original', 160, true], ['phone-display-oled', 100, true],
  ]);
  assert.deepEqual(rows, before);
  const zero = resolver.resolveStartingServicePriceItems(services, [{ modelId: 'iphone-a', serviceId: 'missing', price: 0 }], models);
  assert.equal(zero[0].price, 0, 'configured zero remains valid; missing data never creates zero');
});

test('numeric price precedes description and supporting action in every variant; section opts out of scroll fading', () => {
  for (const variant of ['featured', 'compact', 'informational']) {
    const html = render({ variant, items: [{
      title: 'Repair', description: 'Description after amount', price: { kind: 'amount', value: 137, isStartingFrom: true },
      actions: [{ kind: 'model', href: '#models' }, { kind: 'service', href: '/service' }],
    }] });
    assert.ok(html.indexOf('137') < html.indexOf('Description after amount'));
    assert.ok(html.indexOf('Description after amount') < html.indexOf('href="#models"'));
    assert.match(html, /data-motion-skip/);
    assert.match(html, /class="supporting"/);
    assert.doesNotMatch(html, /class="primary"|opacity:|data-rise|data-rows|data-stagger/);
  }
  const statuses = ['model', 'request', 'diagnostic', 'unconfigured'].map(kind => model.getRepairPriceLines({ kind })[0].value);
  assert.equal(new Set(statuses).size, 4);
  assert.deepEqual(model.getRepairPriceLines(undefined), []);
});

test('Galaxy S26 Ultra keeps published 320/90 prices and missing camera price beside separate 60 glass variant in LV/RU', () => {
  const definitions = [
    { id: 'phone-display-original', labels: { lv: 'Ekrāns', ru: 'Экран' }, order: 1 },
    { id: 'phone-battery', labels: { lv: 'Baterija', ru: 'Батарея' }, order: 2 },
    { id: 'phone-camera', labels: { lv: 'Kamera', ru: 'Камера' }, order: 3 },
    { id: 'phone-camera-glass', labels: { lv: 'Stikls', ru: 'Стекло' }, order: 4 },
  ];
  const device = { slug: 'galaxy-s26-ultra', brandKey: 'samsung' };
  const published = [
    { modelId: device.slug, serviceId: definitions[0].id, price: 320 },
    { modelId: device.slug, serviceId: definitions[1].id, price: 90 },
    { modelId: device.slug, serviceId: definitions[3].id, price: 60 },
  ];
  for (const locale of ['lv', 'ru']) {
    const exact = resolver.resolveServicePriceItems(definitions, published, { model: device, locale });
    assert.deepEqual(exact.map(x => x.price), [320, 90, null, 60]);
    const bounds = resolver.resolveStartingServicePriceItems(definitions, published, [device], { locale });
    assert.deepEqual(bounds.map(x => x.price), [320, 90, 60]);
    assert.equal(resolver.pickPrimaryPriceItem(exact, ['phone-camera', 'phone-camera-glass']).price, null);
    const html = render({ locale, items: exact.map(item => ({ title: item.title, price: { kind: 'amount', value: item.price } })) });
    for (const value of [320, 90, 60]) assert.ok(html.includes(model.formatRepairAmount(value, { locale })));
    assert.ok(html.includes(model.repairLabels(locale).request));
  }
});

test('one summary amount ignores hidden/inactive/invalid values and preserves request and genuine zero states', () => {
  const items = [
    { price: 1, isHidden: true }, { price: 2, isActive: false }, { price: -5 },
    { price: '3' }, { price: null }, { price: 190 }, { price: 100 },
  ];
  assert.equal(model.getRepairPriceLines({ kind: 'options', items })[0].value, model.formatRepairAmount(100, { isStartingFrom: true }));
  assert.equal(model.getRepairPriceLines({ kind: 'options', items: [{ price: null }] })[0].value, model.repairLabels().request);
  assert.equal(model.getRepairPriceLines({ kind: 'options', items: [{ price: 0 }] })[0].value, model.formatRepairAmount(0));
});
