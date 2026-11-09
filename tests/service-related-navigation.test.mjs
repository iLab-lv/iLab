import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
const { transformSync } = require('next/dist/build/swc');
const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
function load(file) {
  const { code } = transformSync(read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const m = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
    if (id.endsWith('/DeviceButton')) return { __esModule: true, default: ({ href, label }) => React.createElement('a', { href }, label) };
    if (id.endsWith('.scss')) return { __esModule: true, default: {} };
    if (id === './relatedModels.i18n') return load('app/_components/sections/related-models/relatedModels.i18n.js');
    return require(id);
  }, m, m.exports, React);
  return m.exports;
}
const BrandList = load('app/(site)/sections/brand-list/BrandList.jsx').default;
const RelatedModels = load('app/_components/sections/related-models/RelatedModels.jsx').default;

test('computer brand links retain destinations and expose localized list and logo names', () => {
  for (const locale of ['lv', 'ru']) {
    const basePath = locale === 'ru' ? '/ru/remont-noutbukov' : '/datoru-remonts';
    const html = renderToStaticMarkup(React.createElement(BrandList, { locale, basePath, brands: [{ key: 'macbook', name: 'MacBook' }, { key: 'lenovo', name: 'Lenovo', logo: '/lenovo.svg' }] }));
    assert.ok(html.includes('href="' + basePath + '/macbook"'));
    assert.ok(html.includes('href="' + basePath + '/lenovo"'));
    assert.ok(html.includes(locale === 'ru' ? 'aria-label="Компьютеры Apple"' : 'aria-label="Apple datoru zīmoli"'));
    assert.ok(html.includes(locale === 'ru' ? 'aria-label="Другие бренды компьютеров"' : 'aria-label="Citu datoru zīmolu saraksts"'));
    assert.ok(html.includes(locale === 'ru' ? 'alt="Lenovo ремонт компьютеров"' : 'alt="Lenovo datoru remonts"'));
    if (locale === 'ru') assert.doesNotMatch(html, /datoru|zīmoli/);
  }
});

test('related models exclude self and incompatible devices and keep localized parent paths', () => {
  const current = { slug: 'current', year: 2025, categoryKey: 'telefonu-remonts', brandKey: 'samsung', seriesKey: 's' };
  const devices = [
    current,
    { ...current, slug: 'neighbor', year: 2024, name: { lv: 'Kaimiņš', ru: 'Соседняя модель' } },
    { ...current, slug: 'old', year: 2022 },
    { ...current, slug: 'other-brand', brandKey: 'xiaomi' },
    { ...current, slug: 'other-category', categoryKey: 'plansetdatoru-remonts' },
    { ...current, slug: 'other-series', seriesKey: 'a' },
  ];
  for (const locale of ['lv', 'ru']) {
    const baseHref = locale === 'ru' ? '/ru/remont-telefonov/samsung' : '/telefonu-remonts/samsung';
    const html = renderToStaticMarkup(React.createElement(RelatedModels, { currentDevice: current, devices, baseHref, locale }));
    assert.equal((html.match(/<a /g) || []).length, 1);
    assert.ok(html.includes('href="' + baseHref + '/neighbor"'));
    assert.ok(html.includes(locale === 'ru' ? 'Соседняя модель' : 'Kaimiņš'));
  }
});
test('related models omit the entire section when no compatible neighbor exists', () => {
  assert.equal(renderToStaticMarkup(React.createElement(RelatedModels, { currentDevice: { slug: 'self' }, devices: [{ slug: 'self' }], baseHref: '/iphone-remonts' })), '');
});
