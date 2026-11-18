import test from 'node:test';
import assert from 'node:assert/strict';
import { clampMapView, focusMapBranch, getMapPins, getMapPoint } from '../app/adsV3/adsV3Locations.model.js';

const pins = getMapPins([{ id: 'domina' }, { id: 'spice' }], { domina: { xPct: 68, yPct: 40 }, spice: { xPct: 30, yPct: 60 } });
test('map pins preserve authoritative image coordinates and omit invalid/missing positions', () => {
  assert.deepEqual(pins, [{ id: 'domina', x: .68, y: .4 }, { id: 'spice', x: .3, y: .6 }]);
  assert.deepEqual(getMapPins([{ id: 'missing' }, { id: 'invalid' }], { invalid: { xPct: 'oops', yPct: 30 } }), []);
  assert.deepEqual(getMapPins([{ id: 'edge' }], { edge: { xPct: 0, yPct: 100 } }), [{ id: 'edge', x: 0, y: 1 }]);
});

test('branch focusing preserves both geographic anchors at desktop/mobile aspect ratios', () => {
  for (const width of [320, 350, 720, 960, 1248]) {
    const size = { width, height: width < 700 ? 260 : width / 2 };
    for (const id of ['domina', 'spice']) for (const zoom of [1, 1.5, 2.5]) {
      const view = focusMapBranch(pins, id, size, zoom);
      for (const pin of pins) {
        const point = getMapPoint(pin, view, size);
        assert.ok(point.x > 20 && point.x < size.width - 20, `${id}: horizontal bounds`);
        assert.ok(point.y > 20 && point.y < size.height - 20, `${id}: vertical bounds`);
      }
    }
  }
});

test('pan/zoom clamps prevent exposing blank image edges without shifting pin coordinates', () => {
  const size = { width: 1200, height: 600 };
  assert.deepEqual(clampMapView({ x: -100, y: 100, zoom: 0 }, size), { zoom: 1, x: .5, y: .75 });
  assert.deepEqual(clampMapView({ x: 100, y: -100, zoom: 10 }, size), { zoom: 2.5, x: .8, y: .1 });
  const view = { x: .5, y: .5, zoom: 1.5 };
  const first = getMapPoint(pins[0], view, size), second = getMapPoint(pins[1], view, size);
  assert.ok(Math.abs((first.x - second.x) / (pins[0].x - pins[1].x) - size.width * view.zoom) < .001);
  assert.ok(Math.abs((first.y - second.y) / (pins[0].y - pins[1].y) - size.width * view.zoom) < .001);
});
