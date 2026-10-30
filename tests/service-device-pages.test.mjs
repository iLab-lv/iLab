import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('phone, tablet, and computer model pages share one redesigned presentation', async () => {
  const wrappers = await Promise.all([
    read('app/(site)/(catalog)/telefonu-remonts/[brand]/[device]/PhoneDevicePage.jsx'),
    read('app/(site)/(catalog)/plansetdatoru-remonts/[brand]/[device]/TabletDevicePage.jsx'),
    read('app/(site)/(catalog)/datoru-remonts/[brand]/[device]/ComputerDevicePage.jsx'),
  ]);
  const shared = await read('app/_components/sections/device-detail/DeviceDetailPage.jsx');

  for (const source of wrappers) assert.match(source, /DeviceDetailPage/);
  assert.match(shared, /CatalogHero/);
  assert.match(shared, /ModelPriceList/);
  assert.match(shared, /RelatedModels/);
  assert.match(shared, /placeholderLabel/);
});

test('all six locale route adapters retain dynamic data and add related models', async () => {
  const routes = [
    'app/(site)/(catalog)/telefonu-remonts/[brand]/[device]/page.jsx',
    'app/(site)/(catalog)/plansetdatoru-remonts/[brand]/[device]/page.jsx',
    'app/(site)/(catalog)/datoru-remonts/[brand]/[device]/page.jsx',
    'app/(site)/ru/(catalog)/remont-telefonov/[brand]/[device]/page.jsx',
    'app/(site)/ru/(catalog)/remont-planshetov/[brand]/[device]/page.jsx',
    'app/(site)/ru/(catalog)/remont-noutbukov/[brand]/[device]/page.jsx',
  ];

  for (const source of await Promise.all(routes.map(read))) {
    assert.match(source, /getDeviceBySlug/);
    assert.match(source, /buildPriceListItems/);
    assert.match(source, /buildRepairPageJsonLd/);
    assert.match(source, /getDevicesByCategoryAndBrand/);
    assert.match(source, /relatedBaseHref: brandPath/);
  }
});
