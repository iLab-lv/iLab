import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
const { transform } = require('next/dist/build/swc');
const read = file => readFile(new URL('../' + file, import.meta.url), 'utf8');
async function load(file) {
  const { code } = await transform(await read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const evaluated = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id.endsWith('.scss')) return { __esModule: true, default: {} };
    throw Error('Unexpected dependency ' + id);
  }, evaluated, evaluated.exports, React);
  return evaluated.exports;
}
const base = 'app/_components/sections/why/';
const Metrics = (await load(base + 'MetricsWhy.jsx')).default;
const Editorial = (await load(base + 'EditorialWhy.jsx')).default;
const { getMetricsWhyContent } = await load(base + 'metricsWhy.content.js');
const { getEditorialWhyContent } = await load(base + 'editorialWhy.content.js');

test('home LV/RU metrics keep four consistent rows, qualified warranty and a distinct 13+ experience display', () => {
  for (const locale of ['lv', 'ru']) {
    const copy = getMetricsWhyContent(locale);
    assert.deepEqual(copy.facts.map(f => f.value), locale === 'lv' ? ['Garantija', 'Šodien', '0 €', '13+ gadi'] : ['Гарантия', 'Сегодня', '0 €', '13+ лет']);
    assert.match(copy.facts[0].description, locale === 'lv' ? /līdz 1 gadam/ : /до 1 года/);
    assert.match(copy.facts[3].description, locale === 'lv' ? /sertificēti/ : /сертифицированные/);
    assert.doesNotMatch(copy.facts[3].description, /13\+|2013/);
    const html = renderToStaticMarkup(React.createElement(Metrics, copy));
    assert.equal((html.match(/<article/g) || []).length, 4);
    assert.match(html, /id="benefits"/);
    assert.match(html, /aria-labelledby="benefits-title"/);
    assert.doesNotMatch(html, /15\+|<svg|<button/);
  }
});

test('extended LV/RU content retains all four explanations and the separate 15+ claim without heading accent', () => {
  for (const locale of ['lv', 'ru']) {
    const copy = getEditorialWhyContent(locale);
    assert.equal(copy.entries.length, 4);
    assert.equal(copy.experience.value, '15+');
    assert.ok(copy.experience.description.length > 160);
    const html = renderToStaticMarkup(React.createElement(Editorial, copy));
    assert.equal((html.match(/<li>/g) || []).length, 4);
    for (const entry of copy.entries) assert.ok(html.includes(entry.description));
    assert.match(html, /<h2[^>]*>[^<]+<\/h2>/);
    assert.doesNotMatch(html, /13\+|<svg|<article/);
  }
});

test('editorial accepts optional fields, independent anchors and five contact explanations; empty content omits sections', () => {
  const html = renderToStaticMarkup(React.createElement(Editorial, { id: 'contacts-benefits', headingId: 'contacts-benefits-h2', title: 'Why', entries: Array.from({ length: 5 }, (_, i) => ({ title: 'Benefit ' + i, description: 'Explanation ' + i })) }));
  assert.match(html, /aria-labelledby="contacts-benefits-h2"/);
  assert.equal((html.match(/<li>/g) || []).length, 5);
  assert.doesNotMatch(html, /15\+|undefined/);
  assert.equal(renderToStaticMarkup(React.createElement(Editorial)), '');
  assert.equal(renderToStaticMarkup(React.createElement(Metrics)), '');
});

test('full-section consumers use one canonical renderer each; compact brand trust blocks use the separate Quick Trust Facts renderer', async () => {
  const home = await read('app/(site)/HomePage.jsx');
  assert.equal((home.match(/<MetricsWhy\b/g) || []).length, 1);
  assert.doesNotMatch(home, /s\.benefits|t\.facts/);
  for (const file of [
    'app/(site)/(catalog)/iphone-remonts/IphoneRepairPage.jsx',
    'app/(site)/(catalog)/iphone-remonts/[device]/IphoneDevicePage.jsx',
    'app/_components/page-sections/photo-repair/PhotoRepairPage.jsx',
    'app/(site)/(info)/kontakti/ContactsPage.jsx',
  ]) {
    const source = await read(file);
    assert.equal((source.match(/<EditorialWhy\b/g) || []).length, 1, file);
    assert.doesNotMatch(source, /<WhyUs\b|function Benefits\(/);
  }
  for (const file of [
    'app/(site)/(catalog)/telefonu-remonts/[brand]/PhoneBrandPage.jsx',
    'app/(site)/(catalog)/plansetdatoru-remonts/[brand]/TabletBrandPage.jsx',
    'app/(site)/(catalog)/datoru-remonts/[brand]/ComputerBrandPage.jsx',
  ]) {
    const source = await read(file);
    assert.match(source, /<QuickTrustFacts\b/);
    assert.doesNotMatch(source, /<EditorialWhy|<MetricsWhy/);
  }
});
