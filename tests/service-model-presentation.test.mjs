import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const { transform } = require('next/dist/build/swc');
const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');
const styles = { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };

test('model reviews forward the authoritative summary into the shared compact section', async () => {
  const Shared = () => null;
  const Reviews = await component('app/_components/sections/reviews/ReviewsCompact.jsx', { './ServiceReviews': Shared });
  const summary = { domina: { rating: 4.1, count: 40 }, spice: { rating: null, count: null } };
  const element = Reviews({ variant: 'model', locale: 'ru', reviewsSummary: summary });
  assert.equal(element.type, Shared);
  assert.equal(element.props.variant, 'compact');
  assert.equal(element.props.locale, 'ru');
  assert.equal(element.props.reviewsSummary, summary);
});

test('shared locations adapter preserves its anchor, locale and authoritative branch settings', async () => {
  const leaf = (props) => React.createElement('section', { id: props.id });
  const settings = {
    locations: [{ id: 'domina' }, { id: 'spice' }],
    pinPositions: { spice: { xPct: 60, yPct: 40 } },
    hours: [{ opens: '10:00', closes: '21:00' }],
  };
  const Locations = await component('app/_components/sections/catalog-hub/HubLocations.jsx', {
    '../full-locations/FullLocations': leaf,
    '@/lib/siteSettings': { getSiteSettings: async () => settings },
  });
  for (const props of [{ locale: 'lv' }, { locale: 'ru', id: 'computer-locations' }]) {
    const element = await Locations(props);
    assert.equal(element.type, leaf);
    assert.equal(element.props.id, props.id || 'iphone-locations');
    assert.equal(element.props.locale, props.locale);
    assert.equal(element.props.locations, settings.locations);
    assert.equal(element.props.pinPositions, settings.pinPositions);
    assert.equal(element.props.defaultHours, settings.hours);
    const html = renderToStaticMarkup(element);
    assert.equal((html.match(/id="/g) || []).length, 1);
    assert.ok(html.includes(`id="${props.id || 'iphone-locations'}"`));
  }
});

test('model price CTA stays localized and is absent when there are no visible prices', async () => {
  const { getModelPriceCta } = await import('../app/_components/sections/device-detail/modelPageHeader.js');
  assert.deepEqual(getModelPriceCta('lv', true), { label: 'Skatīt cenas', targetId: 'cenas' });
  assert.deepEqual(getModelPriceCta('ru', true), { label: 'Смотреть цены', targetId: 'cenas' });
  assert.equal(getModelPriceCta('lv', false), null);
  assert.equal(getModelPriceCta('ru', false), null);
});

// Evaluate the actual presentation with only its environment boundaries mocked.
// No application Firebase module is imported and no external request is made.
async function component(file, dependencies = {}) {
  const { code } = await transform(await read(file), {
    filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' },
  });
  const evaluated = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)((id) => {
    if (id.endsWith('.scss')) return styles;
    if (id in dependencies) return dependencies[id];
    if (id === 'react' || id.startsWith('node:') || id === 'sharp') return require(id);
    throw new Error(`Unexpected dependency: ${id}`);
  }, evaluated, evaluated.exports, React);
  return evaluated.exports.default;
}

function findAll(element, type, found = []) {
  if (!React.isValidElement(element)) return found;
  if (element.type === type) found.push(element);
  React.Children.forEach(element.props.children, (child) => findAll(child, type, found));
  return found;
}

test('a newly added model keeps configured row order, variants, free/conditional prices and every booking context', async () => {
  const opened = [];
  const BookButton = await component('app/(site)/sections/pricing/BookButton.jsx', {
    '../../ui/providers/UiDialogsProvider': { useUiDialogs: () => ({ openBook: (...args) => opened.push(args) }) },
  });
  const Prices = await component('app/_components/sections/model-price-list/ModelPriceList.jsx', { '@sections/pricing/BookButton': BookButton });
  const model = 'Future Device Ultra Pro Max 2030';
  const items = [
    { id: 'free', title: 'Diagnostics', price: 0, timeText: 'By agreement' },
    { id: 'screen-oem', title: 'Screen — OEM', price: 199, isStartingFrom: true, timeMin: 30, timeMax: 90 },
    { id: 'screen-original', title: 'Screen — original', price: 299, timeMax: 180 },
    { id: 'conditional', title: 'Board repair', price: null, timeMax: 45 },
    { id: 'hidden', title: 'Hidden repair', price: 1, isHidden: true },
    { id: 'disabled', title: 'Invisible repair', price: 2, visible: 'false' },
  ];
  const before = structuredClone(items);
  const element = Prices({ modelName: model, items, variant: 'model', locale: 'lv' });
  const html = renderToStaticMarkup(element);
  for (const value of ['0 €', 'no 199 €', '299 €', 'pēc pieprasījuma', 'By agreement', '30–90 min', 'Tajā pašā dienā', 'līdz 45 min']) assert.ok(html.includes(value), value);
  assert.doesNotMatch(html, /Hidden repair|Invisible repair/);
  assert.ok(html.indexOf('Diagnostics') < html.indexOf('Screen — OEM'));
  assert.ok(html.indexOf('Screen — OEM') < html.indexOf('Screen — original'));
  const buttons = findAll(element, BookButton);
  assert.equal(buttons.length, 8, 'desktop and mobile expose the same four real services');
  for (const [index, button] of buttons.entries()) {
    const opener = { id: index };
    BookButton(button.props).props.onClick({ currentTarget: opener });
    assert.deepEqual(opened.at(-1), [opener, { device: model, fault: items[index % 4].title }]);
  }
  assert.deepEqual(items, before, 'presentation never mutates pricing data');
  assert.equal(Prices({ items: [{ title: 'Hidden', hidden: true }] }), null);
});

test('default pricing consumers remain unprefilled and retain localized notes/header gates', async () => {
  const Book = () => React.createElement('button');
  const Prices = await component('app/_components/sections/model-price-list/ModelPriceList.jsx', { '@sections/pricing/BookButton': Book });
  const element = Prices({ modelName: 'Test', locale: 'ru', items: [{ title: 'Ремонт', price: null }], showNotes: false });
  const html = renderToStaticMarkup(element);
  assert.ok(html.includes('Услуга') && html.includes('по запросу'));
  assert.doesNotMatch(html, /role="note"/);
  for (const button of findAll(element, Book)) assert.equal(button.props.initialValues, undefined);
});

test('model hero uses real local image dimensions and a neutral state for missing assets', async () => {
  const Hero = () => null;
  const ModelHero = await component('app/_components/sections/device-detail/ModelHero.jsx', { '../catalog-hub/CatalogHero': Hero });
  const image = '/images/categories/telefonu_remonts.webp';
  const rendered = await ModelHero({ image, modelName: 'New model' });
  assert.equal(rendered.type, Hero);
  assert.equal(rendered.props.image, image);
  assert.equal(rendered.props.imageWidth, 1800);
  assert.equal(rendered.props.imageHeight, 2000);
  assert.deepEqual(rendered.props.bookingValues, { device: 'New model' });
  for (const source of ['/does-not-exist.webp', '/images/placeholders/phone.webp', '/../package.json']) {
    const missing = await ModelHero({ image: source, locale: 'ru' });
    assert.equal(missing.props.image, undefined);
    assert.equal(missing.props.placeholderLabel, 'Изображение недоступно');
  }
});
