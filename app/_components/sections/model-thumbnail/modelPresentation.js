export function modelImageSource(device = {}) {
  return String(device.image || (device.imagePath ? `/images/${String(device.imagePath).replace(/^\/+/, '')}` : '')).trim();
}

export function modelKind(device = {}) {
  if (device.categoryKey === 'plansetdatoru-remonts') return 'tablet';
  if (device.categoryKey === 'datoru-remonts') return 'laptop';
  return 'phone';
}

// Keep the complete name in the data/search/accessibility contract; only its
// presentation separates technical identifiers from the familiar model name.
export function modelLabel(device = {}) {
  const original = String(device.name || device.slug || '');
  const details = [];
  let name = original.replace(/\(([^)]+)\)/g, (_, detail) => { details.push(detail); return ''; }).replace(/\s+/g, ' ').trim();
  const year = String(device.year || '');
  if (year && name.endsWith(` ${year}`)) name = name.slice(0, -year.length).trim();
  if (year && !details.some((detail) => detail.includes(year))) details.push(year);
  return { name: name || original, detail: details.join(' · ') };
}
