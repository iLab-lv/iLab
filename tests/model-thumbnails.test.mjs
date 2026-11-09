import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const source = read('app/_components/sections/model-thumbnail/modelPresentation.js');
const helpers = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
const server = await import('data:text/javascript;base64,' + Buffer.from(read('app/_components/sections/model-thumbnail/modelThumbnail.server.js').replace("import { modelImageSource } from './modelPresentation';", source)).toString('base64'));
test('presentation separates identifiers/year without changing the original search record', () => {
  const device = { name: 'Galaxy S25 Edge (SM-S937B)', year: 2025, slug: 's25-edge' };
  assert.deepEqual(helpers.modelLabel(device), { name: 'Galaxy S25 Edge', detail: 'SM-S937B · 2025' });
  assert.equal(device.name, 'Galaxy S25 Edge (SM-S937B)');
  assert.deepEqual(helpers.modelLabel({ name: 'MacBook Air 2015 (A1465)', year: 2015 }), { name: 'MacBook Air', detail: 'A1465 · 2015' });
  assert.deepEqual(helpers.modelLabel({ name: 'iPad (M4, 2024)', year: 2024 }), { name: 'iPad', detail: 'M4, 2024' });
});
test('server resolves real local assets and missing Huawei safely without mutating records', () => {
  const device = { image: '/images/devices/huawei/huawei-p30-pro.webp', name: 'Huawei P30 Pro' };
  assert.equal(server.availableModelImage(device), '');
  assert.equal(server.availableModelImage({ image: '/images/../../package.json' }), '');
  const image = fs.readdirSync('public/images/devices/iphone')[0];
  assert.equal(server.availableModelImage({ image: '/images/devices/iphone/' + image }), '/images/devices/iphone/' + image);
  assert.deepEqual(server.withModelThumbnail(device), { ...device, thumbnailSrc: '' });
  assert.equal(Object.hasOwn(device, 'thumbnailSrc'), false);
  assert.equal(helpers.modelKind({ categoryKey: 'plansetdatoru-remonts' }), 'tablet');
  assert.equal(helpers.modelKind({ categoryKey: 'datoru-remonts' }), 'laptop');
});
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('next/dist/build/swc');
function component(file, mocks) {
  const { code } = transformSync(read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } }, module: { type: 'commonjs' } });
  const compiledModule = { exports: {} };
  new Function('require', 'module', 'exports', code)((name) => Object.hasOwn(mocks, name) ? mocks[name] : require(name), compiledModule, compiledModule.exports);
  return compiledModule.exports.default;
}
const css = { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
const Thumbnail = component('app/_components/sections/model-thumbnail/ModelThumbnail.jsx', {
  'next/image': ({ src, alt, loading }) => React.createElement('img', { src, alt, loading }),
  './ModelThumbnail.module.scss': css,
});
test('SSR uses the real image immediately; category fallbacks preserve stable wells', () => {
  const image = renderToStaticMarkup(React.createElement(Thumbnail, { src: '/images/device.webp' }));
  assert.match(image, /src="\/images\/device.webp"/);
  assert.match(image, /loading="lazy"/);
  assert.match(image, /alt=""/);
  for (const kind of ['phone', 'tablet', 'laptop']) {
    const markup = renderToStaticMarkup(React.createElement(Thumbnail, { kind }));
    assert.match(markup, /data-state="fallback"/);
    assert.match(markup, new RegExp('data-model-thumbnail="' + kind + '"'));
    assert.doesNotMatch(markup, /<img/);
  }
});
test('editorial teaser preserves item order and destinations; all-model link follows list in DOM; legacy remains default', () => {
  const Preview = component('app/_components/sections/catalog-hub/HubBrandPreview.jsx', {
    'next/link': ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children),
    '@/app/(site)/components/model-grid/ModelCard': ({ device }) => React.createElement('div', { 'data-legacy': device.slug }),
    '../model-thumbnail/ModelThumbnail': Thumbnail,
    '../model-thumbnail/modelThumbnail.server': server,
    '../model-thumbnail/modelPresentation': helpers,
    './HubBrandPreview.module.scss': css,
    './CatalogHubSkin.module.scss': css,
  });
  const props = { brandSlug: 'huawei', brandName: 'Huawei', total: 2, href: '/telefonu-remonts/huawei', items: [{ slug: 'first', name: 'First' }, { slug: 'second', name: 'Second' }] };
  const html = renderToStaticMarkup(React.createElement(Preview, { ...props, presentation: 'editorial', locale: 'ru' }));
  assert.ok(html.indexOf('/huawei/first') < html.indexOf('/huawei/second'));
  assert.ok(html.indexOf('</ul>') < html.indexOf('class="all"'));
  assert.match(html, /Смотреть все модели Huawei/);
  assert.equal((html.match(/data-state="fallback"/g) || []).length, 2);
  const legacy = renderToStaticMarkup(React.createElement(Preview, props));
  assert.doesNotMatch(legacy, /data-brand-preview="editorial"/);
  assert.equal(renderToStaticMarkup(React.createElement(Preview, { ...props, items: [] })), '');
});
