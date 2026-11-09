import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = file => readFile(new URL('../' + file, import.meta.url), 'utf8');
const asModule = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const helper = asModule(await read('app/_components/features/reviews/reviews.helpers.js'));
const model = await import(asModule((await read('app/_components/sections/reviews/serviceReviews.model.js')).replace("'../../features/reviews/reviews.helpers'", JSON.stringify(helper))));
const { getServiceReviewPlaces, getTotalReviewCount, getReviewWindow, getQuantityReviewTitle, getReviewsCopy } = model;

test('location normalization preserves source content, stats, locale fallback and real Google destinations', () => {
  const lv = [{ author: 'Source author', text: 'Source text', date: '2026-01-02', rating: 4 }];
  const ru = [{ author: 'Автор', text: 'Текст' }];
  const summary = { domina: { placeId: 'real/place', name: 'Domina Shopping', rating: 4.8, count: 120, featuredReviewsByLocale: { lv, ru } }, spice: { latest: { rating: 4.9, count: 80 }, featuredReviewsByLocale: { lv } } };
  const places = getServiceReviewPlaces(summary, 'ru');
  assert.equal(places[0].reviews, ru);
  assert.equal(places[1].reviews, lv);
  assert.equal(places[0].rating, 4.8);
  assert.equal(places[1].rating, 4.9);
  assert.equal(places[0].href, 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=real%2Fplace');
  assert.equal(getTotalReviewCount(places), 200);
  assert.equal(getTotalReviewCount([{ count: null }, {}]), null);
  assert.equal(getTotalReviewCount([{ count: 0 }, {}]), 0);
  assert.equal(summary.domina.featuredReviewsByLocale.lv, lv);
});

test('pagination preserves location order, handles an odd last pair and clamps both boundaries', () => {
  const domina = ['D1', 'D2', 'D3', 'D4', 'D5'], spice = ['S1', 'S2', 'S3'];
  assert.deepEqual(getReviewWindow(domina).items, ['D1', 'D2']);
  assert.deepEqual(getReviewWindow(domina, 1).items, ['D3', 'D4']);
  assert.deepEqual(getReviewWindow(spice).items, ['S1', 'S2']);
  const last = getReviewWindow(domina, 2);
  assert.deepEqual(last.items, ['D5']);
  assert.equal(last.feedback, '5 / 5');
  assert.equal(last.next, false);
  assert.equal(last.previous, true);
  assert.deepEqual(getReviewWindow(domina, 1).items, ['D3', 'D4']);
  assert.equal(getReviewWindow(domina, 99).page, 2);
  assert.equal(getReviewWindow(domina, -1).previous, false);
});

test('empty and short sets never request additional pages', () => {
  for (const reviews of [[], ['one'], ['one', 'two']]) {
    assert.equal(getReviewWindow(reviews).next, false);
    assert.equal(getReviewWindow(reviews).previous, false);
    assert.deepEqual(getReviewWindow(reviews).items, reviews);
  }
});

test('quantity headings use authoritative counts with LV/RU formatting and plurals', () => {
  assert.equal(getQuantityReviewTitle(1, 'lv'), '1 Google atsauksme');
  assert.equal(getQuantityReviewTitle(21, 'ru'), '21 отзыв Google');
  assert.equal(getQuantityReviewTitle(22, 'ru'), '22 отзыва Google');
  assert.equal(getQuantityReviewTitle(25, 'ru'), '25 отзывов Google');
  assert.equal(getQuantityReviewTitle(null, 'lv'), 'Google atsauksmes');
  assert.ok(getQuantityReviewTitle(1245, 'ru').startsWith(new Intl.NumberFormat('ru-RU').format(1245)));
  assert.equal(getReviewsCopy('lv').title, 'Klientu atsauksmes');
  assert.equal(getReviewsCopy('ru').title, 'Отзывы клиентов');
});

test('actual shared location renders four full cards or two compact cards and accessible controls', async () => {
  const React = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  const { transform } = require('next/dist/build/swc');
  const file = 'app/_components/sections/reviews/ReviewLocation.jsx';
  const { code } = await transform(await read(file), {
    filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' },
  });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id === 'react') return React;
    if (id.endsWith('.scss')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
    if (id === './serviceReviews.model') return model;
    if (id.endsWith('/HomeInteractions')) return {
      HomeReview: ({ review }) => React.createElement('blockquote', { 'data-card': true }, review.text),
      HomeStars: ({ rating }) => React.createElement('span', { 'data-real-rating': rating }),
    };
    throw new Error('Unexpected dependency: ' + id);
  }, module, module.exports, React);
  const Location = module.exports.default;
  const place = { key: 'domina', label: 'Domina Shopping', count: 120, rating: 4.1, href: 'https://maps.google.com/real', reviews: Array.from({ length: 5 }, (_, i) => ({ id: String(i), text: 'Real source ' + i })) };
  const render = (variant, source = place) => renderToStaticMarkup(React.createElement(Location, { place: source, index: 0, variant, locale: 'lv', copy: getReviewsCopy('lv') }));
  const full = render('full');
  assert.equal((full.match(/data-card/g) || []).length, 4);
  assert.doesNotMatch(full, /<nav/);
  const compact = render('compact');
  assert.equal((compact.match(/data-card/g) || []).length, 2);
  assert.doesNotMatch(compact, /inert/);
  assert.match(compact, /aria-disabled="true"/);
  assert.match(compact, /aria-disabled="false"/);
  assert.match(compact, /1–2 \/ 5/);
  assert.match(compact, /aria-label="Nākamās atsauksmes: Domina Shopping"/);
  assert.match(compact, /data-real-rating="4.1"/);
  assert.match(compact, /href="https:\/\/maps.google.com\/real"/);
  const unknown = render('compact', { ...place, rating: null, count: null, reviews: [] });
  assert.doesNotMatch(unknown, /data-real-rating|<nav|120 atsauksmes|NaN/);
});
