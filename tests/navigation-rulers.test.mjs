import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { transform } = require('next/dist/build/swc');
const read = file => readFile(new URL('../' + file, import.meta.url), 'utf8');
let pathname = '/';
const { code } = await transform(await read('app/(site)/ui/navigation-rulers/NavigationRulers.jsx'), {
  filename: 'NavigationRulers.jsx',
  jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } },
  module: { type: 'commonjs' },
});
const compiledModule = { exports: {} };
new Function('require', 'module', 'exports', 'React', code)(id => {
  if (id === 'react') return React;
  if (id === 'next/navigation') return { usePathname: () => pathname };
  if (id.endsWith('UiDialogsProvider')) return { useUiDialogs: () => ({}) };
  if (id.endsWith('.scss')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
  throw new Error('Unexpected dependency: ' + id);
}, compiledModule, compiledModule.exports, React);

test('ruler SSR is deterministic and browser-independent, with localized controls hidden until targets resolve', () => {
  for (const route of ['/', '/ru/remont-iphone/iphone-13']) {
    pathname = route;
    const first = renderToStaticMarkup(React.createElement(compiledModule.exports.default));
    assert.equal(first, renderToStaticMarkup(React.createElement(compiledModule.exports.default)));
    assert.match(first, /data-service-rulers="true" hidden=""/);
    assert.match(first, /type="range"/);
    assert.match(first, /aria-orientation="vertical"/);
    assert.match(first, new RegExp(route.startsWith('/ru') ? 'Разделы страницы' : 'Lapas sadaļas'));
    assert.doesNotMatch(first, /<button|aria-current/, 'no stale or unavailable page target is server-rendered');
  }
});

test('Service owns the default rulers; V3 explicitly reuses the controller with its own main and drawer state', async () => {
  const [layout, home, motion, ads, adsV2, lp, root] = await Promise.all([
    read('app/(site)/layout.jsx'), read('app/(site)/HomePage.jsx'), read('app/(site)/HomeMotion.jsx'),
    read('app/ads/layout.jsx'), read('app/adsV2/layout.jsx'), read('app/(lp)/layout.jsx'), read('app/layout.jsx'),
  ]);
  assert.equal((layout.match(/<NavigationRulers\s*\/>/g) || []).length, 1);
  for (const source of [home, motion, ads, adsV2, lp, root]) assert.doesNotMatch(source, /<NavigationRulers|<HomeMotion/);
  assert.match(motion, /export function HomeProcess/);
  const v3 = await read('app/adsV3/AdsV3.jsx');
  assert.match(v3, /<PageNavigationRulers mainId="ads-v3-main" locale=\{locale\} blocked=\{Boolean\(drawer\)\}/);
});

test('isolated ruler controller renders without the main-site dialog provider and respects drawer blocking', () => {
  const html = renderToStaticMarkup(React.createElement(compiledModule.exports.PageNavigationRulers, {
    mainId: 'ads-v3-main', locale: 'ru', blocked: true,
  }));
  assert.match(html, /data-service-rulers="true" hidden="" inert=""/);
  assert.match(html, /aria-orientation="vertical"/);
  assert.doesNotMatch(html, /<button|aria-current/);
});

test('section-free error and utility content gains no targets; protected legacy controls remain standalone', () => {
  assert.deepEqual(compiledModule.exports.getRulerSections({ querySelector: () => null, querySelectorAll: () => [] }), []);
  const html = renderToStaticMarkup(React.createElement(compiledModule.exports.RulerControls, {
    locale: 'lv', sections: [], active: 0, progress: 0, navLabel: 'Sākumlapas sadaļas',
  }));
  assert.match(html, /Sākumlapas sadaļas/);
  assert.match(html, /value="0"/);
  assert.doesNotMatch(html, /data-service-rulers|hidden=""/);
});
