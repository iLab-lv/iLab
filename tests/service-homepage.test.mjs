import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage follows the approved section sequence and production integrations', async () => {
  const [page, interactions] = await Promise.all([
    read('app/(site)/HomePage.jsx'),
    read('app/(site)/HomeInteractions.jsx'),
  ]);

  const markers = [
    'className={s.hero}',
    'className={`${s.section} ${s.branchStrip}`}',
    'id="pakalpojumi"',
    'className={s.precision}',
    'id="process"',
    'id="reviews"',
    'className={`${s.section} ${s.benefits}`}',
    'id="locations"',
    'id="buj"',
    'className={s.finalCta}',
  ];
  let cursor = -1;
  for (const marker of markers) {
    const next = page.indexOf(marker);
    assert.ok(next > cursor, `${marker} must follow the previous approved section`);
    cursor = next;
  }

  assert.match(page, /siteSettings\?\.locations/);
  assert.match(page, /reviewPlaces\(reviewsSummary\)/);
  assert.match(page, /getProcessContent\(locale\)/);
  assert.match(interactions, /useUiDialogs\(\)/);
  assert.match(interactions, /openBooking\(event\.currentTarget\)/);
  assert.match(interactions, /pinPositions\[location\.id\]/);
});

test('homepage owns the approved responsive visual assets and diagnostic treatment', async () => {
  const [page, interactions, styles] = await Promise.all([
    read('app/(site)/HomePage.jsx'),
    read('app/(site)/HomeInteractions.jsx'),
    read('app/(site)/HomePage.module.scss'),
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

  assert.match(styles, /background:\s*#e9eef1/);
  assert.match(styles, /min-width:\s*1024px/);
  assert.match(styles, /max-width:\s*767px/);
  assert.match(page, /reviews\.slice\(0,4\)/);
  assert.match(page, /faqItems\.slice\(0,6\)/);
});
