'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import s from './SeriesGrid.module.scss';
import ModelCard from './ModelCard';

// ---------- Sorting helpers ----------
const YEAR_FALLBACK = -Infinity;
const normYear = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : YEAR_FALLBACK;
};

const byYearDescThenNameAsc = (a, b) => {
  const ya = normYear(a.year);
  const yb = normYear(b.year);
  if (yb !== ya) return yb - ya; // newer first
  const na = String(a.name || a.slug || '').toLowerCase();
  const nb = String(b.name || b.slug || '').toLowerCase();
  if (na < nb) return -1;
  if (na > nb) return 1;
  return 0;
};

// ---------- Data shaping ----------
function dedupeAndSort(devices, brandSlug, categorySlug) {
  // normalize category filter to array | null
  const catList = Array.isArray(categorySlug)
    ? categorySlug.filter(Boolean)
    : categorySlug
    ? [categorySlug]
    : null;

  const filtered = devices.filter((d) => {
    const brandOk = brandSlug
      ? String(d.brandSlug || '').toLowerCase() === brandSlug.toLowerCase()
      : true;
    const catOk = catList ? catList.includes(d.category) : true;
    return brandOk && catOk;
  });

  // dedupe by stable key
  const seen = new Set();
  const list = [];
  for (const d of filtered) {
    const k = `${d.category || '-'}:${d.brandSlug || '-'}:${d.slug}`;
    if (!seen.has(k)) {
      seen.add(k);
      list.push(d);
    }
  }
  // global sort (helps when we later group)
  list.sort(byYearDescThenNameAsc);
  return list;
}

function groupBySeries(list) {
  const bySeries = new Map();
  for (const d of list) {
    const slug = d.seriesSlug || 'citi';
    const title = d.series || 'Citi modeļi';
    if (!bySeries.has(slug)) bySeries.set(slug, { slug, title, items: [] });
    bySeries.get(slug).items.push(d);
  }

  // sort items inside each series now (baseline)
  const groups = Array.from(bySeries.values()).map((g) => {
    const items = [...g.items].sort(byYearDescThenNameAsc);
    return { ...g, items };
  });

  // order the series by their newest item (desc)
  groups.sort((g1, g2) => {
    const max1 = g1.items.reduce((m, x) => Math.max(m, normYear(x.year)), YEAR_FALLBACK);
    const max2 = g2.items.reduce((m, x) => Math.max(m, normYear(x.year)), YEAR_FALLBACK);
    return max2 - max1;
  });

  return groups;
}

function matchesQuery(d, q) {
  if (!q) return true;
  const t = q.toLowerCase();
  return (
    (d.name && d.name.toLowerCase().includes(t)) ||
    (d.slug && d.slug.toLowerCase().includes(t)) ||
    (d.series && d.series.toLowerCase().includes(t)) ||
    String(d.year || '').includes(t)
  );
}

export default function SeriesGrid({
  devices = [],
  baseHref,
  brandSlug = 'apple',
  categorySlug = 'telefonu-remonts',
  initialLimit = 4,
  autoExpandOnSearch = true,
}) {
  // 1) base list + grouping (sorted)
  const list = useMemo(
    () => dedupeAndSort(devices, brandSlug, categorySlug),
    [devices, brandSlug, categorySlug]
  );
  const groupsAll = useMemo(() => groupBySeries(list), [list]);

  // 2) search
  const [query, setQuery] = useState('');
  const groupsSearched = useMemo(() => {
    if (!query) return groupsAll;
    return groupsAll
      .map((g) => ({ ...g, items: g.items.filter((d) => matchesQuery(d, query)) }))
      .filter((g) => g.items.length > 0);
  }, [groupsAll, query]);

  // 3) expansion state
  const [expanded, setExpanded] = useState(() => new Set());
  const toggleExpand = useCallback((slug) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  // 4) per-series year filter
  const [yearBySection, setYearBySection] = useState(() => new Map());
  const setSectionYear = useCallback((slug, y) => {
    setYearBySection((prev) => {
      const next = new Map(prev);
      next.set(slug, y);
      return next;
    });
  }, []);

  // IMPORTANT: compute available years from the FULL series (stable UI),
  // not from the search-filtered copy.
  const yearsBySeries = useMemo(() => {
    const map = new Map();
    for (const g of groupsAll) {
      const ys = new Set(
        g.items
          .map((d) => (Number.isFinite(Number(d.year)) ? Number(d.year) : null))
          .filter((y) => y !== null)
      );
      map.set(g.slug, Array.from(ys).sort((a, b) => b - a)); // newest first
    }
    return map;
  }, [groupsAll]);

  // auto-expand all sections when searching
  useEffect(() => {
    if (!autoExpandOnSearch) return;
    if (query) {
      setExpanded(new Set(groupsSearched.map((g) => g.slug)));
    }
  }, [query, groupsSearched, autoExpandOnSearch]);

  // 5) final groups to render
  const groups = groupsSearched;

  return (
    <div className={s.wrapper}>
      {/* Global search */}
      <div className={s.toolbar}>
        <input
          type="search"
          className={s.search}
          placeholder="Meklēt modeli…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Meklēt modeli"
        />
      </div>

      {groups.length === 0 ? (
        <p className={s.emptyAll}>Nekas netika atrasts.</p>
      ) : (
        groups.map((g) => {
          const sectionId = `series-${g.slug}`;
          const isExpanded = expanded.has(g.slug) || (query && autoExpandOnSearch);
          const selectedYear = yearBySection.get(g.slug) ?? null;

          // filter by chosen year for this section (if any)
          const itemsByYear =
            isExpanded && selectedYear ? g.items.filter((d) => Number(d.year) === Number(selectedYear)) : g.items;

          // sort again right before render (defensive; ensures correct order after any filter)
          const itemsSorted = [...itemsByYear].sort(byYearDescThenNameAsc);

          const visible = isExpanded ? itemsSorted : itemsSorted.slice(0, initialLimit);
          const canExpand = itemsSorted.length > initialLimit;

          const years = yearsBySeries.get(g.slug) || [];

          return (
            <section key={g.slug} className={s.section} aria-labelledby={`${sectionId}-title`} id={sectionId}>
              <div className={s.sectionHeader}>
                <h2 id={`${sectionId}-title`} className={s.sectionTitle}>
                  {g.title} <span className={s.count}>({g.items.length})</span>
                </h2>

                {canExpand && (
                  <button
                    type="button"
                    className={s.toggleBtn}
                    onClick={() => toggleExpand(g.slug)}
                    aria-expanded={isExpanded}
                    aria-controls={`${sectionId}-grid`}
                  >
                    {isExpanded ? 'Rādīt mazāk' : `Vairāk šīs sērijas modeļu (${g.items.length})`}
                  </button>
                )}
              </div>

              {isExpanded && years.length > 0 && (
                <div className={s.yearFilter} role="group" aria-label="Filtrs pēc gada">
                  <button
                    type="button"
                    className={`${s.yearChip} ${selectedYear === null ? s.active : ''}`}
                    onClick={() => setSectionYear(g.slug, null)}
                    aria-pressed={selectedYear === null}
                  >
                    Visi gadi
                  </button>
                  {years.map((y) => (
                    <button
                      key={y}
                      type="button"
                      className={`${s.yearChip} ${Number(selectedYear) === y ? s.active : ''}`}
                      onClick={() => setSectionYear(g.slug, y)}
                      aria-pressed={Number(selectedYear) === y}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}

              {itemsSorted.length === 0 ? (
                <p className={s.emptySection}>Nav modeļu šim gadam.</p>
              ) : (
                <div className={s.grid} id={`${sectionId}-grid`}>
                  {visible.map((d) => (
                    <ModelCard key={`${d.brandSlug}:${d.slug}`} device={d} baseHref={baseHref} />
                  ))}
                </div>
              )}
            </section>
          );
        })
      )}
    </div>
  );
}
