import test from 'node:test';
import assert from 'node:assert/strict';
import { usesServiceTypography } from '../lib/presentation/serviceTypographyRoutes.mjs';

test('local font resources belong to main LV/RU Service routes', () => {
  for (const path of ['/', '/ru', '/iphone-remonts', '/iphone-remonts/iphone-12', '/cenas/', '/ru/ceny']) {
    assert.equal(usesServiceTypography(path), true, path);
  }
});

test('protected shells and advertising rewrites retain legacy font resources', () => {
  for (const path of ['/ads', '/adsV2', '/adsV3', '/adsV3/', '/landings/example', '/shop', '/admin', '/api/reviews', '/iphone-remonts-riga', '/iphone-baterijas-maina']) {
    assert.equal(usesServiceTypography(path), false, path);
  }
  assert.equal(usesServiceTypography('/', { advertising: true }), false);
  assert.equal(usesServiceTypography('/ru', { advertising: true }), false);
});
