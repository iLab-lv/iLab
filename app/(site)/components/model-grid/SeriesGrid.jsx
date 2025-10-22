'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import s from './SeriesGrid.module.scss';
import ModelCard from './ModelCard';

// Helpers
function dedupeAndSort(devices, brandSlug, categorySlug) {
  // Normalize category filter to array | null
  const catList = Array.isArray(categorySlug)
    ? categorySlug.filter(Boolean)
    : categorySlug
    ? [categorySlug]
    : null;

  const filtered = devices.filter((d) => {
    const brandOk = brandSlug
      ? (d.brandSlug || '').toLowerCase() === brandSlug.toLowerCase()
      : true;

    const catOk = catList
      ? catList.includes(d.category)
      : true;

    return brandOk && catOk;
  });

  const seen = new Set();
  const list = [];
  for (const d of filtered) {
    const k = `${d.category || '-'}:${d.brandSlug || '-'}:${d.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    list.push(d);
  }
  // order: lower number = newer (your scheme)
  list.sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : 99999;
    const bo = typeof b.order === 'number' ? b.order : 99999;
    return ao - bo;
  });
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
  // sort sections by newest item inside (min order)
  const groups = Array.from(bySeries.values()).sort((g1, g2) => {
    const o1 = Math.min(...g1.items.map((x) => (typeof x.order === 'number' ? x.order : 99999)));
    const o2 = Math.min(...g2.items.map((x) => (typeof x.order === 'number' ? x.order : 99999)));
    return o1 - o2;
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
    (String(d.year || '').includes(t))
  );
}

export default function SeriesGrid({
  devices = [],
  baseHref,
  brandSlug = 'apple',              // reuse for 'samsung' later
  categorySlug = 'telefonu-remonts',// NEW: filter by category (string or string[])
  initialLimit = 4,
  autoExpandOnSearch = true,
}) {
  const list = useMemo(
    () => dedupeAndSort(devices, brandSlug, categorySlug),
    [devices, brandSlug, categorySlug]
  );
  const groupsAll = useMemo(() => groupBySeries(list), [list]);

  // Global search
  const [query, setQuery] = useState('');

  // Per-section expansion
  const [expanded, setExpanded] = useState(() => new Set());
  const toggleExpand = useCallback((slug) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  // Per-section year filter: Map(seriesSlug -> year|null)
  const [yearBySection, setYearBySection] = useState(() => new Map());
  const setSectionYear = useCallback((slug, y) => {
    setYearBySection((prev) => {
      const next = new Map(prev);
      next.set(slug, y);
      return next;
    });
  }, []);

  // Filter groups by query
  const groups = useMemo(() => {
    if (!query) return groupsAll;
    return groupsAll
      .map((g) => ({
        ...g,
        items: g.items.filter((d) => matchesQuery(d, query)),
      }))
      .filter((g) => g.items.length > 0);
  }, [groupsAll, query]);

  // Auto-expand series when searching (so matches are visible)
  useEffect(() => {
    if (!autoExpandOnSearch) return;
    if (query) {
      setExpanded(new Set(groups.map((g) => g.slug)));
    } else {
      // preserve user state when query clears
    }
  }, [query, groups, autoExpandOnSearch]);

  // Years present per section (computed from the currently visible group's full items set)
  const yearsByGroup = useMemo(() => {
    const map = new Map();
    for (const g of groups) {
      const ys = new Set(g.items.map((d) => d.year).filter(Boolean));
      map.set(g.slug, Array.from(ys).sort((a, b) => b - a));
    }
    return map;
  }, [groups]);

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

      {/* Sections */}
      {groups.length === 0 ? (
        <p className={s.emptyAll}>Nekas netika atrasts.</p>
      ) : (
        groups.map((g) => {
          const sectionId = `series-${g.slug}`;
          const isExpanded = expanded.has(g.slug) || (query && autoExpandOnSearch);
          const selectedYear = yearBySection.get(g.slug) ?? null;

          // Filter items by per-section year (only if expanded and a year is chosen)
          const itemsFiltered = isExpanded && selectedYear
            ? g.items.filter((d) => d.year === selectedYear)
            : g.items;

          const visible = isExpanded ? itemsFiltered : itemsFiltered.slice(0, initialLimit);
          const canExpand = itemsFiltered.length > initialLimit;
          const years = yearsByGroup.get(g.slug) || [];

          return (
            <section key={g.slug} className={s.section} aria-labelledby={`${sectionId}-title`} id={sectionId}>
              <div className={s.sectionHeader}>
                <h2 id={`${sectionId}-title`} className={s.sectionTitle}>
                  {g.title} <span className={s.count}>({g.items.length})</span>
                </h2>

                {/* Expand/Collapse */}
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

              {/* Per-section year filter appears only when expanded */}
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
                      className={`${s.yearChip} ${selectedYear === y ? s.active : ''}`}
                      onClick={() => setSectionYear(g.slug, y)}
                      aria-pressed={selectedYear === y}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}

              {/* Grid */}
              {itemsFiltered.length === 0 ? (
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
