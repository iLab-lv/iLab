import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const hubPages = [
  'app/(site)/(catalog)/iphone-remonts/IphoneRepairPage.jsx',
  'app/(site)/(catalog)/telefonu-remonts/PhoneRepairPage.jsx',
  'app/(site)/(catalog)/plansetdatoru-remonts/TabletRepairPage.jsx',
  'app/(site)/(catalog)/datoru-remonts/ComputerRepairPage.jsx',
];

test('service catalog hubs share the approved isolated hero', async () => {
  const pages = await Promise.all(hubPages.map(read));
  for (const page of pages) {
    assert.match(page, /catalog-hub\/CatalogHero/);
    assert.match(page, /<CatalogHero/);
    assert.match(page, /headerTitle/);
    assert.match(page, /breadcrumbs/);
    assert.match(page, /targetId=/);
  }

  const [hero, booking, styles] = await Promise.all([
    read('app/_components/sections/catalog-hub/CatalogHero.jsx'),
    read('app/_components/sections/catalog-hub/CatalogBookingButton.jsx'),
    read('app/_components/sections/catalog-hub/CatalogHero.module.scss'),
  ]);
  assert.match(hero, /fetchPriority="high"/);
  assert.match(booking, /useUiDialogs\(\)/);
  assert.match(booking, /openBooking\(event\.currentTarget\)/);
  assert.match(styles, /min-width:\s*1024px/);
  assert.match(styles, /max-width:\s*767px/);
});

test('protected advertising landing remains isolated from catalog hub code', async () => {
  const [middleware, adsPage, adsLayout] = await Promise.all([
    read('middleware.js'),
    read('app/ads/page.jsx'),
    read('app/ads/layout.jsx'),
  ]);

  assert.match(middleware, /host === 'riga\.ilab\.lv'/);
  assert.match(middleware, /url\.pathname = '\/ads'/);
  assert.doesNotMatch(adsPage + adsLayout, /catalog-hub|CatalogHero|CatalogHub/);
});
