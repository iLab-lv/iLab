import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Dyson and photo families use the approved editorial presentation', async () => {
  const [dyson, photo, photoStyles] = await Promise.all([
    read('app/(site)/(catalog)/dyson-remonts/DysonRepairPage.jsx'),
    read('app/_components/page-sections/photo-repair/PhotoRepairPage.jsx'),
    read('app/_components/page-sections/photo-repair/PhotoRepairSections.module.scss'),
  ]);

  assert.match(dyson, /ServiceHero/);
  assert.match(dyson, /ServiceRecovery/);
  assert.match(dyson, /page\?\.sections\?\.hasReviews/);
  assert.match(dyson, /HubLocations locale=\{locale\}/);
  assert.match(dyson, /popular-repairs\/RepairServices/);
  assert.match(dyson, /variant="informational"/);
  assert.match(dyson, /ConvertBand/);
  assert.match(photo, /ServiceHero/);
  assert.match(photo, /ServiceRecovery/);
  assert.match(photo, /reviewsSummary=\{reviewsSummary\}/);
  assert.match(photo, /LensRepairSection/);
  assert.match(photo, /CameraBrandRepairSection/);
  assert.match(photo, /FinalCta/);
  assert.doesNotMatch(photoStyles, /gradient|box-shadow|backdrop-filter/);
  assert.doesNotMatch(photoStyles, /border-radius:\s*[^0\s][^;]*/);
});

test('LV and RU route adapters retain production data, metadata, and structured data', async () => {
  const routes = [
    'app/(site)/(catalog)/dyson-remonts/page.jsx',
    'app/(site)/ru/(catalog)/remont-dyson/page.jsx',
    'app/(site)/(catalog)/fotoaparatu-remonts/page.jsx',
    'app/(site)/ru/(catalog)/remont-fotoapparatov/page.jsx',
  ];

  for (const source of await Promise.all(routes.map(read))) {
    assert.match(source, /buildSeoMetadata/);
    assert.match(source, /buildRepairPageJsonLd/);
    assert.match(source, /JsonLd/);
    assert.match(source, /localizedCategoryPath/);
  }

  const photoRoutes = await Promise.all(routes.slice(2).map(read));
  for (const source of photoRoutes) {
    assert.match(source, /getSiteSettings/);
    assert.match(source, /getReviewsSummary/);
  }
});

