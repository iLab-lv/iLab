import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
const { transformSync } = require('next/dist/build/swc');
const base = 'app/_components/sections/quick-facts/';
const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
function load(file) {
  const { code } = transformSync(read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const m = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id.endsWith('.scss')) return { __esModule: true, default: {} };
    if (id === './quickFacts.i18n') return load(base + 'quickFacts.i18n.js');
    if (id === '@/data/site.config') return load('app/data/site.config.js');
    return require(id);
  }, m, m.exports, React);
  return m.exports;
}
const Facts = load(base + 'QuickTrustFacts.jsx').default;
const { getQuickTrustFacts } = load(base + 'quickTrustFacts.content.js');
const { getQuickFacts } = load(base + 'quickFacts.i18n.js');
const render = props => renderToStaticMarkup(React.createElement(Facts, props));

test('facts remain readable server-rendered text with flexible counts and optional label/value', () => {
  assert.equal(render({}), '');
  assert.equal(render({ facts: ['', null, { text: ' ' }] }), '');
  for (const count of [1, 3, 4, 5, 6, 8]) {
    const html = render({ facts: Array.from({ length: count }, (_, i) => ({ text: 'Fact ' + i, ...(i === 0 ? { value: 'Value' } : {}) })), ariaLabel: 'Facts' });
    assert.equal((html.match(/role="listitem"/g) || []).length, count);
    assert.match(html, /<strong[^>]*>Value/);
    assert.doesNotMatch(html, /<svg|<button|opacity/);
  }
});

test('iPhone LV/RU facts and order match the approved reference exactly', () => {
  for (const locale of ['lv', 'ru']) {
    const current = getQuickTrustFacts('iphone', locale);
    assert.deepEqual(current.facts.map(f => f.text), getQuickFacts('iphone', locale).facts.map(f => f.text));
    assert.equal(current.facts.length, 6);
    assert.ok(render(current).includes(current.facts[5].text));
  }
});

test('category claims are localized and avoid new time, parts or experience guarantees', () => {
  for (const locale of ['lv', 'ru']) {
    for (const category of ['phone', 'tablet', 'computer', 'dyson', 'photo']) {
      const content = getQuickTrustFacts(category, locale);
      assert.ok(content.facts.length >= 4);
      const text = content.facts.map(f => f.text).join(' ');
      assert.doesNotMatch(text, /same.day|tajā pašā|тот же день|OEM|\d+\+|bezmaksas|бесплатн/i);
      assert.match(text, locale === 'ru' ? /диагностик/i : /diagnostik/i);
      if (category !== 'dyson') assert.match(text, locale === 'ru' ? /до 1 года/ : /līdz 1 gadam/);
    }
    assert.match(getQuickTrustFacts('dyson', locale).facts[0].text, /Dyson/);
    assert.match(getQuickTrustFacts('tablet', locale).facts[1].text, locale === 'ru' ? /планшетов/ : /Planšetdatoru/);
  }
});

const consumers = [
  'app/(site)/(catalog)/iphone-remonts/IphoneRepairPage.jsx',
  'app/_components/page-sections/photo-repair/PhotoRepairPage.jsx',
  ...['telefonu-remonts/PhoneRepairPage', 'plansetdatoru-remonts/TabletRepairPage', 'datoru-remonts/ComputerRepairPage', 'dyson-remonts/DysonRepairPage', 'telefonu-remonts/[brand]/PhoneBrandPage', 'plansetdatoru-remonts/[brand]/TabletBrandPage', 'datoru-remonts/[brand]/ComputerBrandPage'].map(p => 'app/(site)/(catalog)/' + p + '.jsx'),
];
test('each selected hub/brand integrates one canonical strip without the old compact grid', () => {
  for (const file of consumers) {
    const source = read(file);
    assert.equal((source.match(/<QuickTrustFacts\b/g) || []).length, 1, file);
    assert.doesNotMatch(source, /<QuickFacts\b|<Why\b/, file);
  }
  const home = read('app/(site)/HomePage.jsx');
  assert.equal((home.match(/<QuickTrustFacts\b/g) || []).length, 1);
  assert.match(home, /<QuickTrustFacts\b[^>]*id="home-trust"[^>]*getQuickTrustFacts\('home', locale\)/);
  assert.doesNotMatch(read('app/_components/sections/device-detail/DeviceDetailPage.jsx'), /QuickTrustFacts/);
  for (const file of ['MetricsWhy.jsx', 'EditorialWhy.jsx']) assert.doesNotMatch(read('app/_components/sections/why/' + file), /QuickTrustFacts/);
});

test('configured hasWhy=false still renders brand Quick Trust Facts through the actual brand/hero child slot', () => {
  function pageModule(file) {
    const { code } = transformSync(read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
    const m = { exports: {} };
    const fallback = { __esModule: true, default: () => null };
    new Function('require', 'module', 'exports', 'React', code)(id => {
      if (id.endsWith('.scss')) return { __esModule: true, default: {} };
      if (id.endsWith('/QuickTrustFacts')) return { __esModule: true, default: Facts };
      if (id.endsWith('/quickTrustFacts.content')) return { getQuickTrustFacts };
      if (id.endsWith('/deviceGrid.groups')) return { dedupeAndSort: () => [] };
      if (id.endsWith('/BrandHero')) return pageModule('app/_components/sections/catalog-brand/BrandHero.jsx');
      if (id === '../catalog-hub/CatalogHero') return pageModule('app/_components/sections/catalog-hub/CatalogHero.jsx');
      if (id === 'next/link') return { __esModule: true, default: ({ children, href }) => React.createElement('a', { href }, children) };
      if (id.startsWith('node:')) return require(id);
      return fallback;
    }, m, m.exports, React);
    return m.exports;
  }
  const Brand = pageModule('app/(site)/(catalog)/telefonu-remonts/[brand]/PhoneBrandPage.jsx').default;
  for (const locale of ['lv', 'ru']) {
    const html = renderToStaticMarkup(React.createElement(Brand, {
      locale, page: { sections: { hasWhy: false } }, brandSlug: 'samsung', strings: {},
      headerTitle: 'Samsung', headerLead: 'Phone repair',
    }));
    assert.equal((html.match(/data-quick-trust/g) || []).length, 1);
    assert.equal((html.match(/role="listitem"/g) || []).length, 4);
    assert.match(html, locale === 'ru' ? /Гарантия до 1 года/ : /Garantija līdz 1 gadam/);
  }
});
