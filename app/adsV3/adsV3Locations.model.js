const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

// All coordinates are fractions of the existing square map image, never of its
// cropped viewport. The image and its markers must share this one transform.
export function getMapPins(locations, positions) {
  return locations.flatMap(location => {
    const position = positions[location.id];
    if (!position || position.xPct == null || position.yPct == null) return [];
    const x = Number(position.xPct) / 100, y = Number(position.yPct) / 100;
    return Number.isFinite(x) && Number.isFinite(y) && x >= 0 && x <= 1 && y >= 0 && y <= 1
      ? [{ ...location, x, y }] : [];
  });
}

export function clampMapView(view, size) {
  const zoom = clamp(view.zoom, 1, 2.5);
  const halfX = .5 / zoom;
  const halfY = Math.min(.5, (size.height || size.width || 1) / (2 * (size.width || 1) * zoom));
  return { zoom, x: clamp(view.x, halfX, 1 - halfX), y: clamp(view.y, halfY, 1 - halfY) };
}

export function focusMapBranch(pins, selectedId, size, zoom = 1) {
  const selected = pins.find(pin => pin.id === selectedId);
  if (!selected || !size.width) return { zoom: 1, x: .5, y: .5 };
  const xs = pins.map(pin => pin.x), ys = pins.map(pin => pin.y);
  const maxFitZoom = Math.max(1, Math.min(2.5,
    1 / (Math.max(...xs) - Math.min(...xs) + .24),
    size.height / size.width / (Math.max(...ys) - Math.min(...ys) + .2)));
  const fittedZoom = Math.min(zoom, maxFitZoom);
  // A small focus shift, constrained so every configured branch remains visible.
  const halfX = .5 / fittedZoom, halfY = size.height / (2 * size.width * fittedZoom);
  const x = clamp(.5 + (selected.x - .5) * .25, Math.max(...xs) - halfX + .06, Math.min(...xs) + halfX - .06);
  const y = clamp(.5 + (selected.y - .5) * .25, Math.max(...ys) - halfY + .05, Math.min(...ys) + halfY - .05);
  return clampMapView({ x, y, zoom: fittedZoom }, size);
}

export function getMapPoint(pin, view, size) {
  return { x: size.width / 2 + (pin.x - view.x) * size.width * view.zoom,
    y: size.height / 2 + (pin.y - view.y) * size.width * view.zoom };
}
