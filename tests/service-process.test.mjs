import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import test from 'node:test';
const require = createRequire(import.meta.url);
const { transform } = require('next/dist/build/swc');
const read = file => readFile(new URL('../' + file, import.meta.url), 'utf8');
const dataModule = async file => import('data:text/javascript;base64,' + Buffer.from(await read(file)).toString('base64'));
const model = await dataModule('app/_components/sections/process/process.model.js');
const defaults = await dataModule('app/(site)/sections/process/process.i18n.js');
async function evaluate(file, dependencies = {}) {
  const { code } = await transform(await read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const compiledModule = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id === 'react') return React;
    if (id.endsWith('.scss')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
    if (id in dependencies) return dependencies[id];
    throw new Error('Unexpected dependency: ' + id);
  }, compiledModule, compiledModule.exports, React);
  return compiledModule.exports;
}
const motion = await evaluate('app/(site)/HomeMotion.jsx', {
  './ui/navigation-rulers/NavigationRulers': { RulerControls: () => null },
});
const timeline = await evaluate('app/_components/sections/process/TimelineProcess.jsx');
const ServiceProcess = (await evaluate('app/_components/sections/process/ServiceProcess.jsx', {
  '@/app/(site)/HomeMotion': motion,
  '@/app/(site)/sections/process/process.i18n': defaults,
  './TimelineProcess': timeline,
  './process.model': model,
})).default;

test('both real layouts preserve arbitrary step counts, order, numbering and optional descriptions', () => {
  for (const variant of ['sticky', 'timeline']) for (const count of [1, 4, 5, 6, 9]) {
    const steps = Array.from({ length: count }, (_, i) => ({ title: 'Step ' + (i + 1), description: i % 2 ? undefined : 'Source description ' + i }));
    const before = structuredClone(steps);
    const html = renderToStaticMarkup(React.createElement(ServiceProcess, { variant, steps, title: 'Source title', subtitle: 'Source subtitle', eyebrow: 'Source eyebrow' }));
    assert.match(html, new RegExp('data-service-process="' + variant + '"'));
    assert.equal((html.match(/<li\b/g) || []).length, count);
    for (let i = 1; i <= count; i++) assert.ok(html.includes('>' + i + '</span>'));
    assert.ok(html.indexOf('Step 1') <= html.indexOf('Step ' + count));
    for (const text of ['Source title', 'Source subtitle', 'Source eyebrow', 'Source description 0']) assert.ok(html.includes(text));
    assert.doesNotMatch(html, /undefined|null/);
    assert.deepEqual(steps, before);
  }
});

test('localized defaults and tuple/category content survive the common interface', async () => {
  const content = await dataModule('app/_components/sections/repair-process/RepairProcess.i18n.js');
  for (const locale of ['lv', 'ru']) {
    for (const [key, count] of [['iphone', 4], ['iphone-screen', 5], ['iphone-water-damage', 6]]) {
      const source = content.getRepairProcessContent(locale, key);
      const html = renderToStaticMarkup(React.createElement(ServiceProcess, { locale, steps: source.steps, title: source.titleStart + source.titleAccent }));
      assert.equal((html.match(/<li\b/g) || []).length, count);
      assert.ok(html.includes(source.steps[0][0]));
    }
    const html = renderToStaticMarkup(React.createElement(ServiceProcess, { locale }));
    assert.ok(html.includes(defaults.getProcessContent(locale).title));
  }
  assert.equal(renderToStaticMarkup(React.createElement(ServiceProcess, { steps: [] })), '');
});

test('timeline keeps a semantic ordered list and explicit scroll-reveal opt-in', () => {
  const html = renderToStaticMarkup(React.createElement(ServiceProcess, { steps: [['First', 'Long source'], ['Second', 'Other source']], headingLevel: 3 }));
  assert.match(html, /<ol[^>]*data-process-timeline/);
  assert.equal((html.match(/data-process-marker/g) || []).length, 2);
  assert.equal((html.match(/data-rise="process"/g) || []).length, 2);
  assert.match(html, /<h4>First/);
  assert.doesNotMatch(html, /style="[^"]*(?:opacity:0|display:none)/);
});
