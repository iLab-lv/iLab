import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import test from 'node:test';
const require = createRequire(import.meta.url);
const { transform } = require('next/dist/build/swc');
async function evaluate(file, dependencies = {}) {
  const source = await readFile(new URL('../' + file, import.meta.url), 'utf8');
  const { code } = await transform(source, { filename: file, jsc: { parser: { syntax: 'ecmascript' } }, module: { type: 'commonjs' } });
  const evaluated = { exports: {} };
  new Function('require', 'module', 'exports', code)(id => {
    if (id in dependencies) return dependencies[id];
    throw new Error('Unexpected dependency: ' + id);
  }, evaluated, evaluated.exports);
  return evaluated.exports;
}
const identity = await evaluate('lib/faq/faqIdentity.js');
const helpers = await evaluate('lib/faq/faqAdmin.js', { './faqIdentity': identity });
const fixture = (scopeType, scopeKey, locale) => ({
  scopeType, scopeKey, locale, title: 'Exact title ', isPublished: false, order: 20,
  custom: { preserve: true }, createdAt: 'original',
  items: [{ q: 'Question ', a: 'Legacy answer', order: 17, hidden: true, custom: 'keep' },
    { q: 'HTML?', aHtml: '<a href="/ru/kontakty">HTML</a>', order: 44, isPublished: false }],
});
for (const locale of ['lv', 'ru']) {
  for (const [scopeType, scopeKey] of [['basic', null], ['page', 'contacts']]) {
    test(`${scopeType} ${locale} retains exact identity and metadata through an ordinary edit`, () => {
      const stored = fixture(scopeType, scopeKey, locale);
      const id = identity.getFaqDocumentId(stored);
      assert.equal(id, scopeType === 'basic' ? `basic_${locale}` : `contact_${locale}`);
      const loaded = helpers.toFaqAdminGroup(id, stored, 'revision');
      const update = helpers.prepareFaqAdminUpdate({ ...loaded, title: 'Edited' }, stored);
      assert.deepEqual({ ...stored, ...update }, { ...stored, title: 'Edited' });
      assert.equal(Object.hasOwn(update.items[0], 'aHtml'), false);
    });
  }
  test(`malformed Contacts ${locale} cannot redirect into Basic`, () => {
    const stored = fixture('page', 'contacts', locale);
    const loaded = helpers.toFaqAdminGroup(`contact_${locale}`, stored, 'revision');
    assert.throws(() => helpers.prepareFaqAdminUpdate({ ...loaded, scopeType: 'basic', scopeKey: null }, stored));
    assert.throws(() => helpers.prepareFaqAdminUpdate({ ...loaded, id: `basic_${locale}` }, stored));
    assert.throws(() => helpers.prepareFaqAdminUpdate({ ...loaded, id: `basic_${locale}`, scopeType: 'basic', scopeKey: null }, stored));
  });
}
test('strict identities include page_cenas and reject unsupported scopes/locales/IDs', () => {
  assert.equal(identity.getFaqDocumentId({ scopeType: 'page', scopeKey: 'cenas', locale: 'ru' }), 'page_cenas_ru');
  for (const bad of [
    { scopeType: 'other', locale: 'lv' }, { scopeType: 'basic', locale: 'en' },
    { scopeType: 'service', scopeKey: '../basic', locale: 'lv' },
    { scopeType: 'page', scopeKey: ' contacts', locale: 'lv' },
    { scopeType: 'basic', scopeKey: 'contacts', locale: 'lv' },
    { id: 'page_contacts_lv', scopeType: 'page', scopeKey: 'contacts', locale: 'lv' },
  ]) assert.throws(() => identity.validateFaqIdentity(bad));
});
test('reordering preserves each original item metadata and duplicate source indices reject', () => {
  const stored = fixture('basic', null, 'lv');
  const loaded = helpers.toFaqAdminGroup('basic_lv', stored, 'revision');
  loaded.items.reverse();
  loaded.items = loaded.items.map((item, index) => ({ ...item, order: (index + 1) * 10 }));
  const update = helpers.prepareFaqAdminUpdate(loaded, stored);
  assert.deepEqual(update.items, [{ ...stored.items[1], order: 10 }, { ...stored.items[0], order: 20 }]);
  assert.throws(() => helpers.prepareFaqAdminUpdate({ ...loaded, items: [loaded.items[0], loaded.items[0]] }, stored));
});

test('API transaction targets only validated original ID; stale/malformed requests and auth are safe', async () => {
  let data = fixture('page', 'contacts', 'lv'), writes = [], reads = [], authorized = true;
  const revision = '123:456';
  const db = {
    collection: name => { assert.equal(name, 'faqGroups'); return { doc: id => ({ id }) }; },
    runTransaction: async run => run({
      get: async ref => { reads.push(ref.id); return { exists: true, data: () => data, updateTime: { seconds: 123, nanoseconds: 456 } }; },
      update: (ref, update) => writes.push({ id: ref.id, update }),
    }),
  };
  const route = await evaluate('app/api/faq/route.js', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    'firebase-admin': { __esModule: true, default: { firestore: { FieldValue: { serverTimestamp: () => 'new' } } } },
    '@/lib/firebaseAdmin': { db },
    '@/lib/auth/serviceAdminSession': { requireServiceAdminRequest: async () => authorized ? null : { status: 403 } },
    '@/lib/faq/faqIdentity': identity, '@/lib/faq/faqAdmin': helpers,
  });
  const post = body => route.POST({ json: async () => body });
  for (const locale of ['lv', 'ru']) {
    for (const [scopeType, scopeKey] of [['basic', null], ['page', 'contacts']]) {
      data = fixture(scopeType, scopeKey, locale);
      const id = identity.getFaqDocumentId(data);
      const loaded = helpers.toFaqAdminGroup(id, data, revision);
      assert.equal((await post(loaded)).status, 200);
      assert.deepEqual(reads, [id]); assert.deepEqual(writes.map(x => x.id), [id]);
      assert.deepEqual(writes[0].update.items, data.items);
      writes = []; reads = [];
    }
  }
  data = fixture('page', 'contacts', 'lv');
  const loaded = helpers.toFaqAdminGroup('contact_lv', data, revision);
  assert.equal((await post({ ...loaded, scopeType: 'basic', scopeKey: null })).status, 400);
  assert.deepEqual(reads, []);
  assert.equal((await post({ ...loaded, revision: 'stale' })).status, 409);
  assert.deepEqual(writes, []);
  authorized = false;
  assert.equal((await post(loaded)).status, 403);
  assert.deepEqual(writes, []);
});

for (const alias of ['aHtml', 'answerHtml', 'a', 'answer']) {
  test(`legacy ${alias} displays and survives title-only save without rewriting aliases`, () => {
    const stored = fixture('basic', null, 'lv');
    stored.items = [{ q: 'Legacy?', [alias]: '  <a href="/kontakti">Exact legacy answer</a>  ', order: 37, hidden: true, custom: { keep: true } }];
    const loaded = helpers.toFaqAdminGroup('basic_lv', stored, 'revision');
    assert.equal(helpers.getFaqAdminAnswer(loaded.items[0]), stored.items[0][alias]);
    const ordinary = helpers.prepareFaqAdminUpdate({ ...loaded, title: 'Title only' }, stored);
    assert.deepEqual(ordinary.items, stored.items);
    loaded.items[0].aHtml = '<p>Edited answer</p>';
    const edited = helpers.prepareFaqAdminUpdate(loaded, stored);
    assert.equal(edited.items[0].aHtml, '<p>Edited answer</p>');
    if (alias !== 'aHtml') assert.equal(edited.items[0][alias], stored.items[0][alias]);
    assert.deepEqual(edited.items[0].custom, stored.items[0].custom);
  });
}
test('Admin answer preview follows public HTML-before-plain alias precedence without changing whitespace', () => {
  assert.equal(helpers.getFaqAdminAnswer({ answerHtml: ' <p>HTML</p> ', a: 'Plain' }), ' <p>HTML</p> ');
  assert.equal(helpers.getFaqAdminAnswer({ aHtml: '', answerHtml: '<p>shadowed</p>', answer: 'Legacy plain' }), 'Legacy plain');
});
