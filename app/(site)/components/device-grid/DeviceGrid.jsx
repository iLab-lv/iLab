'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';

import DeviceGridSection from './DeviceGridSection';
import { getDeviceGridStrings } from './deviceGrid.i18n';
import { matchesQuery } from './deviceGrid.helpers';

import s from './DeviceGrid.module.scss';

function dedupeAndSort(devices, brandKey, categoryKey) {
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

function groupBySeries(devices, seriesMeta, fallbackSeriesTitle) {
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

export default function DeviceGrid({
  locale = 'lv',
  devices = [],
  baseHref,
  brandKey,
  categoryKey,
  seriesMeta = {},
  initialLimit = 4,
  autoExpandOnSearch = true,
}) {
  const strings = useMemo(() => getDeviceGridStrings(locale), [locale]);

  const list = useMemo(
    () => dedupeAndSort(devices, brandKey, categoryKey),
    [devices, brandKey, categoryKey]
  );

  const groupsAll = useMemo(
    () => groupBySeries(list, seriesMeta, strings.fallbackSeriesTitle),
    [list, seriesMeta, strings.fallbackSeriesTitle]
  );

  const [query, setQuery] = useState('');

  const groupsSearched = useMemo(() => {
    if (!query) return groupsAll;

    return groupsAll
      .map((group) => ({
        ...group,
        items: group.items.filter((device) => matchesQuery(device, query)),
      }))
      .filter((group) => group.items.length > 0);
  }, [groupsAll, query]);

  const [expanded, setExpanded] = useState(() => new Set());

  const toggleExpand = useCallback((slug) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const [yearBySection, setYearBySection] = useState(() => new Map());

  const setSectionYear = useCallback((slug, year) => {
    setYearBySection((prev) => {
      const next = new Map(prev);
      next.set(slug, year);
      return next;
    });
  }, []);

  const yearsBySeries = useMemo(() => {
    const map = new Map();

    for (const group of groupsAll) {
      const years = new Set(
        group.items
          .map((device) =>
            Number.isFinite(Number(device.year)) ? Number(device.year) : null
          )
          .filter((year) => year !== null)
      );

      map.set(group.slug, Array.from(years).sort((a, b) => b - a));
    }

    return map;
  }, [groupsAll]);

  useEffect(() => {
    if (!autoExpandOnSearch) return;

    if (query) {
      setExpanded(new Set(groupsSearched.map((group) => group.slug)));
    }
  }, [query, groupsSearched, autoExpandOnSearch]);

  return (
    <div className={s.wrapper}>
      <div className={s.toolbar}>
        <input
          type="search"
          className={s.search}
          placeholder={strings.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={strings.searchAriaLabel}
        />
      </div>

      {groupsSearched.length === 0 ? (
        <p className={s.emptyAll}>{strings.emptyAll}</p>
      ) : (
        groupsSearched.map((group) => (
          <DeviceGridSection
            key={group.slug}
            locale={locale}
            group={group}
            baseHref={baseHref}
            initialLimit={initialLimit}
            isExpanded={expanded.has(group.slug) || (query && autoExpandOnSearch)}
            onToggle={() => toggleExpand(group.slug)}
            selectedYear={yearBySection.get(group.slug) ?? null}
            onSelectYear={(year) => setSectionYear(group.slug, year)}
            years={yearsBySeries.get(group.slug) || []}
            strings={strings}
          />
        ))
      )}
    </div>
  );
}