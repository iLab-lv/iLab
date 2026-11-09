import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { transform } = require('next/dist/build/swc');
const read = file => readFile(new URL('../' + file, import.meta.url), 'utf8');
const pure = async file => import('data:text/javascript;base64,' + Buffer.from(await read(file)).toString('base64'));
async function evaluate(file, dependencies) {
  const { code } = await transform(await read(file), { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } } }, module: { type: 'commonjs' } });
  const evaluated = { exports: {} };
  new Function('require', 'module', 'exports', 'React', code)(id => {
    if (id.endsWith('.scss')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
    if (id in dependencies) return dependencies[id];
    throw new Error('Unexpected dependency: ' + id);
  }, evaluated, evaluated.exports, React);
  return evaluated.exports;
}
const patches = JSON.parse(await read('docs/release-r7/FAQ_CONTENT_CORRECTIONS.firestore.json')).patches;
const obsolete = /spice[\s_-]*home|(?:9|90)[ -]*(?:mēne\w*|меся\w*|months?|dien\w*|дней)|nine.month|девят.{0,10}меся|deviņ.{0,10}mēne/iu;

test('active source fallbacks, shared copy and reusable import/export content contain no obsolete claims', async () => {
  for (const file of [
    'app/(site)/sections/faq/faq.i18n.js', 'lib/faq/faqMigration.manifest.json',
    'app/_components/sections/quick-facts/quickFacts.i18n.js',
    'app/_components/sections/before-visiting/beforeVisiting.i18n.js',
    'app/_components/sections/quick-contacts/QuickContacts.jsx',
    'scripts/importContactFaqToFirestore.cjs', 'scripts/importCategoriesToFirestore.cjs',
    'scripts/categories.export.meta-final-reviewed-v8.json', 'scripts/devices.export.meta-final-reviewed-v10.json',
  ]) assert.doesNotMatch(await read(file), obsolete, file);
  const faq = await evaluate('app/(site)/sections/faq/faq.i18n.js', {
    './faq.helpers.js': { faqItem: (q, a) => ({ q, a }), makeFaq: (title, items) => ({ title, items }) },
  });
  for (const locale of ['lv', 'ru']) {
    const groups = [faq.getBasicFaq(locale), ...['iphone-remonts', 'telefonu-remonts', 'plansetdatoru-remonts', 'datoru-remonts', 'dyson-remonts'].map(key => faq.getCategoryFaq(key, locale))];
    for (const group of groups) {
      const warranty = group.items.find(item => /garantij|гаранти/i.test(item.q));
      assert.match(warranty.a, locale === 'lv' ? /garantiju līdz 1 gadam/ : /гарантию до 1 года/);
    }
  }
});

test('proposed patches preserve markup, links and text outside the reviewed warranty/name phrases', () => {
  const replacements = [
    ['90 dienu garantiju', 'garantiju līdz 1 gadam'], ['90 dienu garantija', 'garantija līdz 1 gadam'],
    ['гарантию 90 дней', 'гарантию до 1 года'], ['гарантия 90 дней', 'гарантия до 1 года'],
    ['Гарантия iLab 90 дней', 'Гарантия iLab до 1 года'], ['Гарантия 90 дней', 'Гарантия до 1 года'],
    ['iLab garantija 90 dienas', 'iLab garantija līdz 1 gadam'], ['Spice Home', 'Spice Life'],
  ];
  for (const patch of patches) {
    let expected = patch.before;
    for (const [before, after] of replacements) expected = expected.split(before).join(after);
    assert.equal(patch.after, expected, patch.documentId + ':' + patch.path.join('/'));
    assert.notEqual(patch.after, patch.before);
    assert.deepEqual(patch.after.match(/<[^>]*>/g), patch.before.match(/<[^>]*>/g));
    assert.doesNotMatch(patch.after, obsolete);
    assert.ok(!patch.path.some(p => ['id', 'scopeKey', 'locale', 'order', 'isHidden', 'isPublished', 'createdAt'].includes(p)));
    if (patch.collection === 'faqGroups') {
      assert.deepEqual(patch.path, ['items', patch.questionIndex, patch.path[2]]);
      assert.ok(['q', 'aHtml', 'a', 'answerHtml', 'answer'].includes(patch.path[2]));
      assert.equal(patch.expectedIdentity.locale, patch.locale);
      assert.ok(Number.isFinite(patch.questionOrder));
    }
  }
});

test('corrected LV/RU FAQ fixtures render the same answers used by FAQPage without changing identity or sibling metadata', async () => {
  const model = await pure('lib/faq/faqModel.js');
  const Faq = (await evaluate('app/_components/sections/faq/ServiceFaq.jsx', {
    '@/lib/faq/faqModel': model,
    'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  })).default;
  const jsonld = await evaluate('lib/seo/jsonld.js', { '../../app/data/site.config.js': { SITE_URL: 'https://ilab.lv' } });
  for (const id of new Set(patches.filter(p => p.collection === 'faqGroups').map(p => p.documentId))) {
    const edits = patches.filter(p => p.collection === 'faqGroups' && p.documentId === id);
    const records = new Map();
    for (const edit of edits) {
      if (!records.has(edit.questionIndex)) records.set(edit.questionIndex, { q: edit.question, order: edit.questionOrder, aHtml: 'Unchanged answer', customMetadata: 'preserved' });
      records.get(edit.questionIndex)[edit.path[2]] = edit.before;
    }
    for (const edit of edits) {
      const item = records.get(edit.questionIndex);
      assert.equal(item[edit.path[2]], edit.before);
      item[edit.path[2]] = edit.after;
    }
    const items = model.normalizeFaqItems([...records.values()]);
    const html = renderToStaticMarkup(React.createElement(Faq, { id, title: 'FAQ', items }));
    const schema = jsonld.buildFaqLd(items);
    assert.equal(schema.mainEntity.length, items.length);
    assert.doesNotMatch(html, obsolete);
    for (const [index, item] of items.entries()) {
      assert.equal(item.customMetadata, 'preserved');
      assert.equal(schema.mainEntity[index].acceptedAnswer.text, jsonld.cleanSchemaText(item.aHtml));
      for (const href of [...item.aHtml.matchAll(/href="([^"]+)"/g)].map(m => m[1])) assert.ok(html.includes('href="' + href + '"'));
    }
  }
});

test('six pending FAQ creation documents retain their identities, shape and source parity contract', async () => {
  const manifest = JSON.parse(await read('lib/faq/faqMigration.manifest.json'));
  assert.equal(manifest.documents.length, 6);
  for (const doc of manifest.documents) {
    assert.equal(doc.id.endsWith('_' + doc.data.locale), true);
    assert.equal(doc.data.items.length, doc.data.scopeType === 'category' ? 6 : doc.data.scopeType === 'service' ? 4 : 3);
    assert.deepEqual(doc.data.items.map(i => i.order), doc.data.items.map((_, index) => (index + 1) * 10));
    assert.doesNotMatch(JSON.stringify(doc.data), obsolete);
  }
});
