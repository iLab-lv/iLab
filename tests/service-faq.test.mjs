import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import test from 'node:test';
import { planFaqMigration, applyFaqMigration } from '../lib/faq/faqMigration.mjs';

const require = createRequire(import.meta.url);
const { transform } = require('next/dist/build/swc');
const read = file => readFile(new URL('../' + file, import.meta.url), 'utf8');
const pure = async file => import('data:text/javascript;base64,' + Buffer.from(await read(file)).toString('base64'));
const model = await pure('lib/faq/faqModel.js');
const identity = await pure('lib/faq/faqIdentity.js');
const policy = await pure('lib/faq/faqPolicy.js');
const manifest = JSON.parse(await read('lib/faq/faqMigration.manifest.json'));
async function evaluate(file, dependencies = {}) {
  const { code } = await transform(await read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const evaluated = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id === 'react') return React;
    if (id.endsWith('.scss')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
    if (id in dependencies) return dependencies[id];
    throw new Error('Unexpected dependency: ' + id);
  }, evaluated, evaluated.exports, React);
  return evaluated.exports;
}
const ServiceFaq = (await evaluate('app/_components/sections/faq/ServiceFaq.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/lib/faq/faqModel': model,
})).default;
const fallback = locale => ({ title: locale, items: [{ q: locale + ' fallback', a: '<strong>Answer</strong>' }] });
async function reader(records = new Map(), fail = false) {
  return evaluate('lib/faq/getFaqGroups.js', {
    'next/cache': { unstable_cache: fn => fn },
    '@/lib/firebaseAdmin': { db: { collection: () => ({ doc: id => ({ async get() { if (fail) throw new Error('offline'); return { exists: records.has(id), data: () => records.get(id) }; } }) }) } },
    './faqIdentity': identity, './faqModel': model, './faqPolicy': policy,
    './faqMigration.manifest.json': { __esModule: true, default: manifest },
    '@sections/faq/faq.i18n': { getBasicFaq: fallback, getCategoryFaq: (_, locale) => fallback(locale), getServiceFaq: (_, locale) => fallback(locale) },
    '@sections/faq/faq.helpers': { getDefaultFaqTitle: locale => locale },
  });
}

test('native canonical markup keeps first-open, independent details, home six-item limit and empty omission', () => {
  const items = Array.from({ length: 8 }, (_, i) => ({ q: 'Question ' + i, a: '<strong>Answer ' + i + '</strong>' }));
  const html = renderToStaticMarkup(React.createElement(ServiceFaq, { id: 'buj', title: 'Title', items, limit: 6, href: '/buj', linkLabel: 'All' }));
  assert.equal((html.match(/<details/g) || []).length, 6);
  assert.equal((html.match(/open=""/g) || []).length, 1);
  assert.doesNotMatch(html, /name="|aria-expanded|Question 6|subtitle/);
  assert.match(html, /<summary>Question 0<i aria-hidden="true"/);
  assert.equal(renderToStaticMarkup(React.createElement(ServiceFaq, { items: [] })), '');
});

test('HTML preserves approved formatting/links and removes event attributes, unsafe schemes and active elements', () => {
  const safe = '<strong>Text</strong> <a href="/ru/kontakty#locations">Link</a>';
  assert.equal(model.sanitizeFaqHtml(safe), safe);
  for (const href of ['javascript:alert(1)', 'jav&#97;script:alert(1)', '//evil.test', 'data:text/html,x', '\\evil.test']) {
    assert.doesNotMatch(model.sanitizeFaqHtml(`<a href="${href}" onclick="bad()">Link</a>`), /href=|onclick/);
  }
  assert.doesNotMatch(model.sanitizeFaqHtml('<script>alert(1)</script><svg onload="bad()"></svg><img src=x onerror=bad()><strong onmouseover=bad()>OK</strong>'), /script|svg|img|onmouseover|alert/);
});

test('reader supports page identity, legacy answers, sorting, states, safe read errors and explicit back-cover fallback', async () => {
  for (const locale of ['lv', 'ru']) {
    const id = 'contact_' + locale;
    const data = { scopeType: 'page', scopeKey: 'contacts', locale, items: [{ q: 'Second', a: 'Legacy', order: 20 }, { q: 'First', aHtml: '<b>HTML</b>', order: 10 }, { q: 'Hidden', aHtml: 'No', isHidden: true }] };
    const api = await reader(new Map([[id, data]]));
    const faq = await api.getFaqGroups([{ scopeType: 'page', scopeKey: 'contacts' }], locale);
    assert.deepEqual(faq.items.map(i => i.q), ['First', 'Second']);
    assert.equal(faq.groups[0].docId, id);
    assert.equal(faq.items[1].aHtml, 'Legacy');
    for (const [stored, state] of [[null, 'missing'], [{ ...data, isPublished: false }, 'unpublished'], [{ ...data, items: [] }, 'empty']]) {
      const api = await reader(stored ? new Map([[id, stored]]) : new Map());
      const result = await api.getFaqGroups([{ scopeType: 'page', scopeKey: 'contacts' }], locale);
      assert.equal(result.groups[0].state, state);
      assert.equal(result.items.length, 0);
    }
    const offline = await reader(new Map(), true);
    const result = await offline.getFaqGroups([{ scopeType: 'category', scopeKey: 'fotoaparatu-remonts' }], locale);
    assert.equal(result.groups[0].state, 'error');
    assert.equal(result.items.length, 6);
    const empty = await reader();
    assert.equal((await empty.getFaqGroups([{ scopeType: 'service', scopeKey: 'aizmugures-vacina-maina', fallback: 'basic' }], locale)).items[0].q, locale + ' fallback');
    assert.equal((await empty.getFaqGroups([{ scopeType: 'category', scopeKey: 'unknown' }], locale)).items.length, 0);
    const wrongLocale = await reader(new Map([[id, { ...data, locale: locale === 'lv' ? 'ru' : 'lv' }]]));
    assert.equal((await wrongLocale.getFaqGroups([{ scopeType: 'page', scopeKey: 'contacts' }], locale)).items.length, 0);
  }
});

test('directory includes explicit published groups only, never transitional fallback or unknown documents', async () => {
  for (const locale of ['lv', 'ru']) {
    const camera = manifest.documents.find(d => d.id === 'category_fotoaparatu-remonts_' + locale);
    const prices = manifest.documents.find(d => d.id === 'page_cenas_' + locale);
    const api = await reader(new Map([[camera.id, camera.data], [prices.id, { ...prices.data, isPublished: false }], ['other_' + locale, camera.data]]));
    assert.deepEqual((await api.getFaqDirectory(locale)).map(g => g.docId), [camera.id]);
    assert.equal((await (await reader()).getFaqDirectory(locale)).length, 0);
  }
});

test('groups deduplicate before visible/schema use and prefer the same HTML answer', async () => {
  const groups = model.dedupeFaqGroups([{ items: [{ q: 'Same', a: 'Old', aHtml: '<b>Current</b>' }] }, { items: [{ q: 'same', a: 'duplicate' }, { q: 'Other', a: 'Answer' }] }]);
  assert.deepEqual(groups.map(g => g.items.length), [1, 1]);
  const jsonld = await evaluate('lib/seo/jsonld.js', { '../../app/data/site.config.js': { SITE_URL: 'https://example.test' } });
  const items = groups.flatMap(g => g.items);
  const schema = jsonld.buildFaqLd(items);
  assert.equal(schema.mainEntity.length, 2);
  assert.equal(schema.mainEntity[0].acceptedAnswer.text, 'Current');
});

test('manifest preserves the exact original LV/RU questions, answers and order', async () => {
  const photo = await pure('app/_components/page-sections/photo-repair/photoRepairContent.js');
  const priceSource = await read('app/(site)/(info)/cenas/CenasPage.jsx');
  const getPrices = new Function(priceSource.slice(priceSource.indexOf('export function getCenasPageStrings'), priceSource.indexOf('export default')).replace('export ', '') + ';return getCenasPageStrings;')();
  for (const doc of manifest.documents) {
    let original;
    if (doc.data.scopeType === 'category') original = photo.getPhotoRepairContent(doc.data.locale).faq.map(([q, a]) => ({ q, a }));
    else if (doc.data.scopeType === 'page') original = getPrices(doc.data.locale).faqItems;
    else {
      const source = await read(doc.source);
      original = new Function('return ' + source.match(/const legacyFaqItems = (\[[\s\S]*?\n\]);/)[1])();
    }
    assert.deepEqual(doc.data.items, original.map((i, n) => ({ q: i.q, aHtml: i.a, order: (n + 1) * 10 })));
  }
});

test('migration is atomic, create-only, idempotent and aborts conflicts before any write', async () => {
  const stored = new Map();
  let writes = 0;
  const db = { collection: () => ({ doc: id => ({ id }) }), async runTransaction(fn) {
    const pending = [];
    const result = await fn({ get: async ref => ({ id: ref.id, exists: stored.has(ref.id), data: () => stored.get(ref.id) }), create: (ref, data) => pending.push([ref.id, data]) });
    for (const [id, data] of pending) { assert.ok(!stored.has(id)); stored.set(id, data); writes++; }
    return result;
  } };
  assert.equal(planFaqMigration(manifest).filter(e => e.action === 'create').length, 6);
  await applyFaqMigration(db, manifest, 'fixture timestamp');
  await applyFaqMigration(db, manifest, 'new timestamp');
  assert.equal(writes, 6);
  assert.equal(stored.values().next().value.createdAt, 'fixture timestamp');
  stored.delete(manifest.documents[0].id);
  stored.get(manifest.documents[1].id).title = 'Conflicting edit';
  await assert.rejects(applyFaqMigration(db, manifest, 'x'), /Conflicting/);
  assert.equal(writes, 6);
  assert.equal(stored.has(manifest.documents[0].id), false);
});

test('protected imports and visibility policies remain distinct from Service consolidation', async () => {
  assert.match(await read('app/adsV2/AdsV2.jsx'), /import \{ HomeReviews, HomeFaq, HomeRepairProcess \} from/);
  for (const name of ['iphone-remonts-riga', 'iphone-ekrana-maina', 'iphone-baterijas-maina']) assert.match(await read(`app/(lp)/${name}/page.jsx`), /import Faq from '@sections\/faq\/Faq'/);
  for (const file of ['app/(site)/(catalog)/telefonu-remonts/[brand]/page.jsx', 'app/(site)/(catalog)/datoru-remonts/[brand]/page.jsx']) assert.match(await read(file), /page.sections\?\.hasFaq/);
  assert.match(await read('app/(site)/(catalog)/iphone-remonts/(services)/skalruni-mikrofona-remonts/page.jsx'), /includeFaq: false/);
});
