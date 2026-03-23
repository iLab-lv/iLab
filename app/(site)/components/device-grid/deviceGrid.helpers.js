const YEAR_FALLBACK = -Infinity;

export function normYear(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : YEAR_FALLBACK;
}

export function byYearDescThenNameAsc(a, b) {
  const ya = normYear(a.year);
  const yb = normYear(b.year);

  if (yb !== ya) return yb - ya;

  const na = String(a.name || a.slug || '').toLowerCase();
  const nb = String(b.name || b.slug || '').toLowerCase();

  if (na < nb) return -1;
  if (na > nb) return 1;
  return 0;
}

export function dedupeAndSort(devices, brandSlug, categorySlug) {
  const catList = Array.isArray(categorySlug)
    ? categorySlug.filter(Boolean)
    : categorySlug
      ? [categorySlug]
      : null;

  const filtered = devices.filter((device) => {
    const brandOk = brandSlug
      ? String(device.brandSlug || '').toLowerCase() === brandSlug.toLowerCase()
      : true;

    const catOk = catList ? catList.includes(device.category) : true;

    return brandOk && catOk;
  });

  const seen = new Set();
  const list = [];

  for (const device of filtered) {
    const key = `${device.category || '-'}:${device.brandSlug || '-'}:${device.slug}`;
    if (!seen.has(key)) {
      seen.add(key);
      list.push(device);
    }
  }

  list.sort(byYearDescThenNameAsc);
  return list;
}

export function groupBySeries(list, fallbackSeriesTitle = 'Citi modeļi') {
  const bySeries = new Map();

  for (const device of list) {
    const slug = device.seriesSlug || 'citi';
    const title = device.series || fallbackSeriesTitle;

    if (!bySeries.has(slug)) {
      bySeries.set(slug, { slug, title, items: [] });
    }

    bySeries.get(slug).items.push(device);
  }

  const groups = Array.from(bySeries.values()).map((group) => {
    const items = [...group.items].sort(byYearDescThenNameAsc);
    return { ...group, items };
  });

  groups.sort((a, b) => {
    const maxA = a.items.reduce(
      (max, item) => Math.max(max, normYear(item.year)),
      YEAR_FALLBACK
    );
    const maxB = b.items.reduce(
      (max, item) => Math.max(max, normYear(item.year)),
      YEAR_FALLBACK
    );

    return maxB - maxA;
  });

  return groups;
}

export function matchesQuery(device, query) {
  if (!query) return true;

  const q = query.toLowerCase();

  return (
    (device.name && device.name.toLowerCase().includes(q)) ||
    (device.slug && device.slug.toLowerCase().includes(q)) ||
    (device.series && device.series.toLowerCase().includes(q)) ||
    String(device.year || '').includes(q)
  );
}