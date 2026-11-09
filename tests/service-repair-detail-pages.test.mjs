import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const presentations = [
  ['iphone-remonts', 'ekrana-maina', 'IphoneScreenServicePage.jsx'],
  ['iphone-remonts', 'baterijas-maina', 'IphoneBatteryServicePage.jsx'],
  ['iphone-remonts', 'uzlades-ligzdas-maina', 'IphoneChargePortServicePage.jsx'],
  ['iphone-remonts', 'kameras-remonts', 'IphoneCameraServicePage.jsx'],
  ['iphone-remonts', 'skalruni-mikrofona-remonts', 'IphoneAudioServicePage.jsx'],
  ['iphone-remonts', 'udens-bojajumu-remonts', 'IphoneWaterDamageServicePage.jsx'],
  ['iphone-remonts', 'aizmugures-vacina-maina', 'IphoneBackCoverServicePage.jsx'],
  ['iphone-remonts', 'iphone-plates-remonts', 'IphoneBoardRepairServicePage.jsx'],
  ['telefonu-remonts', 'ekrana-maina', 'PhoneScreenServicePage.jsx'],
  ['telefonu-remonts', 'baterijas-maina', 'PhoneBatteryServicePage.jsx'],
  ['telefonu-remonts', 'uzlades-ligzdas-maina', 'PhoneChargePortServicePage.jsx'],
  ['telefonu-remonts', 'kameras-remonts', 'PhoneCameraServicePage.jsx'],
  ['telefonu-remonts', 'skalruni-mikrofona-remonts', 'PhoneAudioServicePage.jsx'],
  ['telefonu-remonts', 'udens-bojajumu-remonts', 'PhoneWaterDamageServicePage.jsx'],
];

test('all repair-detail presentations share the approved editorial hero', async () => {
  for (const [family, service, component] of presentations) {
    const source = await read(`app/(site)/(catalog)/${family}/(services)/${service}/${component}`);
    assert.match(source, /<ServiceRecovery>/);
    assert.match(source, /<ServiceHero/);
    assert.doesNotMatch(source, /PageHeader|DeviceHero/);
    assert.match(source, /bodyHtml=\{strings\.heroBodyHtml\}/);
  }
  const hero = await read('app/_components/sections/service-recovery/ServiceHero.jsx');
  assert.match(hero, /variant="service"/);
  assert.match(hero, /sharp\(file\)\.metadata\(\)/);
  assert.match(hero, /file\.startsWith/);
  const serviceHero = await read('app/_components/sections/catalog-hub/CatalogHero.jsx');
  assert.match(serviceHero, /const isService = variant === 'service'/);
});

test('shared price browsers use square hairline presentation without mock data', async () => {
  const styles = await Promise.all([
    read('app/(site)/components/service-pricelist/ServicePricelist.module.scss'),
    read('app/(site)/sections/service-pricelist/ServicePricelist.module.scss'),
  ]);

  for (const source of styles) {
    assert.match(source, /:global\(\[data-service-recovery\]\) \.layout/);
    assert.match(source, /grid-template-columns: minmax\(0, 5fr\) minmax\(0, 7fr\)/);
    assert.doesNotMatch(source, /gradient|box-shadow|backdrop-filter|radius-pill/);
  }

  const clientPricing = await read('app/(site)/components/service-pricelist/BrandPickerPricelist.jsx');
  const serverPricing = await read('app/(site)/sections/service-pricelist/BrandPickerPricelist.jsx');
  assert.match(clientPricing, /getServiceSelectorPricing/);
  assert.match(serverPricing, /pricing=\{filteredPricing\}/);
});

test('repair-detail SEO paths match their public ASCII routes', async () => {
  const seo = await read('lib/seo/staticPageSeo.js');
  assert.match(seo, /ru: '\/ru\/remont-iphone\/zamena-ekrana'/);
  assert.doesNotMatch(seo, /zamena-ekрана/);
});

