import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');
const importSource = async (file) => import(`data:text/javascript;base64,${Buffer.from(await read(file)).toString('base64')}`);
const groups = await importSource('app/(site)/components/device-grid/deviceGrid.groups.js');
const helpers = await importSource('app/(site)/components/device-grid/deviceGrid.helpers.js');

const devices = [
  { slug: 'latest', name: 'Model 2', brandKey: 'test-brand', categoryKey: 'phone', seriesKey: 'main', order: 2, year: 2026 },
  { slug: 'older', name: 'Model 10', brandKey: 'test-brand', categoryKey: 'phone', seriesKey: 'main', order: 1, year: 2024 },
  { slug: 'latest', name: 'Duplicate', brandKey: 'test-brand', categoryKey: 'phone', seriesKey: 'main', order: 0 },
  { slug: 'tablet', name: 'Tablet', brandKey: 'test-brand', categoryKey: 'tablet' },
  { slug: 'other-brand', name: 'Other', brandKey: 'other-brand', categoryKey: 'phone' },
  { name: 'Missing slug', brandKey: 'test-brand', categoryKey: 'phone' },
  { slug: 'unassigned', name: 'Unassigned', brandKey: 'test-brand', categoryKey: 'phone' },
];

test('brand selector preserves category/brand filtering, first-slug deduplication and numeric order', () => {
  const list = groups.dedupeAndSort(devices, 'test-brand', 'phone');
  assert.deepEqual(list.map(({ slug }) => slug), ['older', 'latest', 'unassigned']);
  assert.equal(list.find(({ slug }) => slug === 'latest').name, 'Model 2');
  assert.equal(devices.length, 7);
});

test('brand selector keeps series metadata order and automatically includes new model records', () => {
  const added = [...devices, { slug: 'future', name: 'Future', brandKey: 'test-brand', categoryKey: 'phone', seriesKey: 'new-series', year: 2027 }];
  const list = groups.dedupeAndSort(added, 'test-brand', 'phone');
  const series = groups.groupBySeries(list, { main: { title: 'Main models', order: 2 }, 'new-series': { title: 'New models', order: 1 } }, 'Other models');
  assert.deepEqual(series.map(({ slug }) => slug), ['new-series', 'main', 'other']);
  assert.equal(series[0].items[0].slug, 'future');
  assert.equal(series.at(-1).title, 'Other models');
  assert.deepEqual([...series[1].items].sort(helpers.byYearDescThenNameAsc).map(({ slug }) => slug), ['latest', 'older']);
});

test('brand search retains name, slug, legacy series and year matching', () => {
  const device = { name: 'Galaxy S24 Ultra SM-S928B', slug: 'galaxy-s24-ultra', series: 'Galaxy S', year: 2024 };
  for (const query of ['ULTRA', 'sm-s928b', 'galaxy-s24', 'Galaxy S', '2024', '']) assert.equal(helpers.matchesQuery(device, query), true);
  assert.equal(helpers.matchesQuery(device, 'not-a-device'), false);
});

test('three brand families retain the shared selector, supported gates and trust facts', async () => {
  for (const [family, name] of [['telefonu-remonts', 'Phone'], ['plansetdatoru-remonts', 'Tablet'], ['datoru-remonts', 'Computer']]) {
    const page = await read(`app/(site)/(catalog)/${family}/[brand]/${name}BrandPage.jsx`);
    assert.match(page, /data-catalog-brand/);
    assert.match(page, /<BrandHero/);
    assert.match(page, /<DeviceSelector\s+variant="brand"/);
    assert.equal((page.match(/<BrandServices/g) || []).length, 1);
    assert.equal((page.match(/<QuickTrustFacts\b/g) || []).length, 1);
    assert.match(page, /<QuickTrustFacts id="why"/);
    for (const gate of ['hasProcess', 'hasConvertBand', 'hasVisibleFaq']) assert.ok(page.includes(gate));
    assert.doesNotMatch(page, /import c from|<Services|Catalog\.module\.scss/);
  }
  const selector = await read('app/(site)/sections/device-selector/DeviceSelector.jsx');
  assert.match(selector, /variant === 'brand'/);
  assert.match(selector, /<HubDeviceGridClient/);
  assert.match(selector, /<DeviceGridIsland/);
  const locale = await read('app/(site)/ui/controls/LanguageSwitcher.jsx');
  assert.match(locale, /document\.querySelector\('\[data-catalog-brand\]'\)/);
  assert.doesNotMatch(locale, /BRAND_CATEGORY_PATHS|isCatalogBrandPath/);
});
