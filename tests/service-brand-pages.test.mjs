import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('all production brand families use the approved shared hero', async () => {
  const files = await Promise.all([
    read('app/(site)/(catalog)/telefonu-remonts/[brand]/PhoneBrandPage.jsx'),
    read('app/(site)/(catalog)/plansetdatoru-remonts/[brand]/TabletBrandPage.jsx'),
    read('app/(site)/(catalog)/datoru-remonts/[brand]/ComputerBrandPage.jsx'),
  ]);

  for (const source of files) {
    assert.match(source, /CatalogHero/);
    assert.match(source, /targetId="brand-modeli"/);
    assert.match(source, /DeviceSelector/);
    assert.doesNotMatch(source, /DeviceHero/);
  }
});

test('model finder retains production filtering and approved list presentation', async () => {
  const [grid, section, card] = await Promise.all([
    read('app/(site)/components/device-grid/DeviceGrid.jsx'),
    read('app/(site)/components/device-grid/DeviceGridSection.jsx'),
    read('app/(site)/components/device-grid/ModelCard.jsx'),
  ]);

  assert.match(grid, /device\.brandKey !== brandKey/);
  assert.match(grid, /device\.categoryKey !== categoryKey/);
  assert.match(grid, /matchesQuery/);
  assert.match(section, /aria-expanded/);
  assert.match(section, /aria-pressed/);
  assert.match(card, /device\?\.year/);
  assert.doesNotMatch(card, /ImgWithFallback/);
});
