import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../lib/presentation/signatureHeadings.js', import.meta.url), 'utf8');
const { getKnownHeroHeading, getIdentityHeading, getWhyHeading, headingText } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const selected = parts => parts?.filter(part => typeof part !== 'string').map(part => part.accent);

test('approved localized repair phrases preserve the complete source title', () => {
  const examples = [
    ['iPhone remonts Rīgā', 'lv', 'iPhone'], ['Ремонт iPhone в Риге', 'ru', 'iPhone'],
    ['Telefonu remonts Rīgā', 'lv', 'Telefonu remonts'], ['Ремонт планшетов в Риге', 'ru', 'Ремонт планшетов'],
    ['iPhone ekrāna maiņa Rīgā', 'lv', 'ekrāna maiņa'], ['Замена батареи iPhone в Риге', 'ru', 'Замена батареи'],
    ['Telefonu skaļruņu un mikrofona remonts Rīgā', 'lv', 'skaļruņu un mikrofona remonts'],
    ['Диагностика iPhone после воды в Риге', 'ru', 'Диагностика'],
    ['Telefonu ūdens bojājumu remonts Rīgā', 'lv', 'ūdens bojājumu remonts'],
    ['Ремонт телефона после попадания влаги в Риге', 'ru', 'Ремонт телефона после попадания влаги'],
    ['Mikrolodēšana un iPhone plates remonts Rīgā', 'lv', 'Mikrolodēšana'],
  ];
  for (const [title, locale, phrase] of examples) {
    const parts = getKnownHeroHeading(title, locale);
    assert.equal(headingText(parts), title);
    assert.deepEqual(selected(parts), [phrase]);
  }
});

test('identities come from structured data and work without a model or brand registry', () => {
  for (const identity of ['iPhone 15 Pro', 'Future Model 42', 'Galaxy S25 Ultra', 'MacBook']) {
    for (const [locale, title] of [['lv', `${identity} remonts`], ['ru', `Ремонт ${identity} в Риге`]]) {
      const parts = getIdentityHeading(title, identity, locale);
      assert.equal(headingText(parts), title);
      assert.deepEqual(selected(parts), [identity]);
    }
  }
  assert.deepEqual(selected(getIdentityHeading('Ремонт телефонов Samsung в Риге', 'Samsung', 'ru', 'brand')), ['Samsung']);
  for (const [locale, title] of [['lv', 'iPad remonts Rīgā'], ['ru', 'Ремонт iPad в Риге']]) {
    const parts = getIdentityHeading(title, 'ipad', locale, 'brand');
    assert.equal(headingText(parts), title);
    assert.deepEqual(selected(parts), ['iPad']);
  }
});

test('custom, repeated and informational headings fail closed instead of replacing substrings', () => {
  for (const title of ['Kontakti', 'Remonta cenas', 'О iLab', 'Vajadzīga palīdzība?', 'Special iPhone remonts Rīgā', 'iPhone remonts Rīgā — īpašs piedāvājums']) {
    assert.equal(getKnownHeroHeading(title), null);
  }
  assert.equal(getIdentityHeading('iPhone 13 Pro remonts', 'iPhone 13'), null);
  assert.equal(getIdentityHeading('iPhone 13 iPhone 13 remonts', 'iPhone 13'), null);
  assert.equal(getIdentityHeading('Custom repair for iPhone 13', 'iPhone 13'), null);
  assert.equal(getIdentityHeading('remonts', ''), null);
  assert.equal(getWhyHeading('Kāpēc izvēlēties citu servisu?'), null);
  assert.deepEqual(selected(getWhyHeading('Почему клиенты выбирают iLab?')), ['iLab?']);
});
