export function dedupeAndSort(devices, brandKey, categoryKey) {
  const seen = new Set();

  return devices
    .filter((device) => {
      if (!device?.slug) return false;
      if (brandKey && device.brandKey !== brandKey) return false;
      if (categoryKey && device.categoryKey !== categoryKey) return false;
      if (seen.has(device.slug)) return false;

      seen.add(device.slug);
      return true;
    })
    .sort((a, b) => {
      const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : 9999;
      const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : 9999;

      if (orderA !== orderB) return orderA - orderB;

      return String(a.name || '').localeCompare(String(b.name || ''), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
}

export function groupBySeries(devices, seriesMeta, fallbackSeriesTitle) {
  const map = new Map();

  for (const device of devices) {
    const seriesKey = device.seriesKey || 'other';
    const meta = seriesMeta?.[seriesKey];

    if (!map.has(seriesKey)) {
      map.set(seriesKey, {
        slug: seriesKey,
        title: meta?.title || (seriesKey !== 'other' ? seriesKey : fallbackSeriesTitle),
        order: Number.isFinite(Number(meta?.order)) ? Number(meta.order) : 9999,
        items: [],
      });
    }

    map.get(seriesKey).items.push(device);
  }

  return Array.from(map.values()).sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;

    return String(a.title || '').localeCompare(String(b.title || ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
}

