import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage preserves production integrations and the provider booking contract', async () => {
  const [page, interactions, provider] = await Promise.all([
    read('app/(site)/HomePage.jsx'),
    read('app/(site)/HomeInteractions.jsx'),
    read('app/(site)/ui/providers/UiDialogsProvider.jsx'),
  ]);

  assert.match(page, /siteSettings\?\.locations/);
  assert.match(page, /reviewPlaces\(reviewsSummary\)/);
  assert.match(page, /getProcessContent\(locale\)/);
  assert.match(interactions, /useUiDialogs\(\)/);
  assert.match(provider, /\bopenBook\b/);
  assert.match(interactions, /openBook\(event\.currentTarget\)/);
  assert.doesNotMatch(interactions, /\bopenBooking\b/, 'homepage must use the actual provider API');
  assert.doesNotMatch(page, /1199/, 'an unavailable live review count must not become a mock count');
  assert.match(interactions, /pinPositions\[location\.id\]/);
});

test('homepage owns the approved responsive visual assets and diagnostic treatment', async () => {
  const [page, interactions, styles, sections] = await Promise.all([
    read('app/(site)/HomePage.jsx'),
    read('app/(site)/HomeInteractions.jsx'),
    read('app/(site)/HomePage.module.scss'),
    read('app/(site)/HomeSections.jsx'),
  ]);

  for (const asset of [
    'home-hero-repair.webp',
    'apple-ecosystem-v2.png',
    'android-phone-tablet-v2.png',
    'laptop-repair-wide.png',
    'dyson-repair-wide.png',
    'camera-repair-wide.png',
    'map-riga-branches.png',
  ]) assert.match(page + interactions + styles, new RegExp(asset.replace('.', '\\.')));

  assert.match(styles, /background:\s*#e9eef1/i);
  assert.match(styles, /min-width:\s*1024px/);
  assert.match(styles, /max-width:\s*767px/);
  assert.match(page, /<ServiceReviews variant="full"/);
  assert.match(sections, /reviews\.slice\(0,4\)/);
  assert.match(page, /<ServiceFaq id="buj" limit=\{6\} items=\{faqItems\}/);
  assert.match(sections, /limit=6/);
  assert.match(sections, /faqItems\.slice\(0,limit\)/);
});
