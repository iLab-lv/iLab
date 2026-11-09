import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = (file) => readFile(new URL('../' + file, import.meta.url), 'utf8');
const load = async (file) => import('data:text/javascript;base64,' + Buffer.from(await read(file)).toString('base64'));
const { resolveServicePriceItems, pickPrimaryPriceItem } = await load('lib/pricing/resolveServicePricing.js');
const { getPriorityCount, moveItemsToMore } = await load('app/(site)/ui/navbar/priorityNavigation.js');

const services = [
  { id: 'phone-display-original', labels: { lv: 'Oriģināls', ru: 'Оригинал' }, family: 'Ekrāns', order: 10 },
  { id: 'phone-display-oled', labels: { lv: 'OLED', ru: 'OLED' }, family: 'Ekrāns', order: 20, iphoneOnly: true },
  { id: 'phone-display-incell', labels: { lv: 'Incell', ru: 'Incell' }, family: 'Ekrāns', order: 30, iphoneOnly: true },
  { id: 'phone-battery', labels: { lv: 'Baterija', ru: 'Батарея' }, family: 'Barošana', order: 40 },
  { id: 'phone-water-damage-clean', labels: { lv: 'Diagnostika', ru: 'Диагностика' }, family: 'Diagnostika', order: 50 },
];
const rows = [
  { serviceId: 'phone-display-original', price: 190 },
  { serviceId: 'phone-display-oled', price: 140 },
  { serviceId: 'phone-display-incell', price: 100 },
  { serviceId: 'phone-battery', price: 70, isStartingFrom: true },
];

test('shared pricing resolver keeps exact screen variants, family, order and LV/RU numeric values', () => {
  for (const locale of ['lv', 'ru']) {
    const result = resolveServicePriceItems(services, rows, { model: { brandKey: 'apple' }, locale });
    assert.deepEqual(result.slice(0, 3).map(({ id, price, family }) => [id, price, family]), [
      ['phone-display-original', 190, 'Ekrāns'], ['phone-display-oled', 140, 'Ekrāns'], ['phone-display-incell', 100, 'Ekrāns'],
    ]);
    assert.equal(result[3].price, 70);
    assert.equal(result[3].isStartingFrom, true);
    assert.equal(result[4].price, null);
    assert.equal(result[0].title, locale === 'ru' ? 'Оригинал' : 'Oriģināls');
  }
});

test('Samsung and another brand use authoritative exact service prices, with genuine missing prices retained', () => {
  for (const brandKey of ['samsung', 'xiaomi']) {
    const price = brandKey === 'samsung' ? 320 : 85;
    const result = resolveServicePriceItems(services, [{ serviceId: 'phone-display-original', price }], { model: { brandKey } });
    assert.equal(result[0].price, price);
    assert.ok(!result.some((item) => /oled|incell/.test(item.id)));
    assert.equal(result.find((item) => item.id === 'phone-battery').price, null);
  }
  assert.ok(resolveServicePriceItems(services, [], { model: { brandKey: 'samsung' } }).every((item) => item.price === null));
});

test('inactive, hidden and invalid prices cannot leak; absent original never borrows cheaper variant', () => {
  const result = resolveServicePriceItems(services, [
    { serviceId: 'phone-display-original', price: 190, isActive: false },
    { serviceId: 'phone-display-oled', price: 140 },
    { serviceId: 'phone-display-incell', price: 100, isHidden: true },
    { serviceId: 'phone-battery', price: '70' },
  ], { model: { brandKey: 'apple' } });
  assert.equal(pickPrimaryPriceItem(result, ['phone-display-original', 'phone-display-oled']).price, null);
  assert.ok(!result.some((item) => item.id === 'phone-display-incell'));
  assert.equal(result.find((item) => item.id === 'phone-battery').price, null);
});

test('priority navigation yields links progressively and restores them when wider', () => {
  const widths = [110, 160, 170, 180, 120];
  assert.deepEqual([300, 500, 800, 500, 300].map((width) => getPriorityCount(widths, 70, width)), [1, 2, 4, 2, 1]);
  const moved = moveItemsToMore([{ key: 'phone', href: '/phones', children: [{ key: 'samsung', href: '/phones/samsung' }] }], [{ key: 'contacts', href: '/contacts' }]);
  assert.deepEqual(moved.map((item) => item.href), ['/phones', '/phones/samsung', '/contacts']);
});

test('Service alone opts into a single labeled switcher before its adaptive navigation', async () => {
  const header = await read('app/(site)/ui/navbar/NavBar.jsx');
  assert.ok(header.indexOf('s.switchLabel') < header.indexOf('<DesktopNav'));
  assert.match(header, /showShopSwitch=\{!adaptiveNavigation && showShopSwitch\}/);
  assert.match(header, /Магазин.*Veikals/);
  assert.match(await read('app/(site)/layout.jsx'), /<NavBar[^>]+adaptiveNavigation/);
  const reader = await read('lib/pricing/getServiceSelectorPricing.client.js');
  assert.match(reader, /collection\(db, 'servicePricing'\)/);
  assert.match(reader, /resolveServicePriceItems/);
  assert.doesNotMatch(reader, /modelServices|320|galaxy-s26/);
});

test('legacy selector IDs map only to exact catalog variants and respect explicit priority', async () => {
  const { resolveSelectorServiceIds } = await load('lib/pricing/resolveServicePricing.js');
  assert.deepEqual(resolveSelectorServiceIds(['display-original', 'display-oled', 'charging-ic'], services),
    ['phone-display-original', 'phone-display-oled', 'charging-ic']);
  assert.deepEqual(resolveSelectorServiceIds(['tablet-display', 'display'], [{ id: 'tablet-display' }]), ['tablet-display', 'display']);
  const items = [{ id: 'oled', price: 140 }, { id: 'original', price: null }];
  assert.equal(pickPrimaryPriceItem(items, ['original', 'oled']).id, 'original');
});

test('direct iPhone camera consumer keeps canonical configured price behind legacy presentation IDs', async () => {
  const { resolveSelectorServiceIds } = await load('lib/pricing/resolveServicePricing.js');
  const items = [{ id: 'phone-camera', price: 80 }];
  assert.deepEqual(resolveSelectorServiceIds(['camera-glass', 'camera'], items), ['camera-glass', 'phone-camera']);
  assert.equal(pickPrimaryPriceItem(items, ['camera-glass', 'camera']).price, 80);
  const variants = [{ id: 'phone-camera', price: null }, { id: 'phone-camera-glass', price: 40 }];
  assert.equal(pickPrimaryPriceItem(variants, ['camera', 'camera-glass']).price, null);
});
