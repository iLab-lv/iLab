'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';

import DeviceGridSection from './DeviceGridSection';
import { getDeviceGridStrings } from './deviceGrid.i18n';
import {
  dedupeAndSort,
  groupBySeries,
  matchesQuery,
} from './deviceGrid.helpers';

import s from './DeviceGrid.module.scss';

export default function DeviceGrid({
  locale = 'lv',
  devices = [],
  baseHref,
  brandSlug = 'apple',
  categorySlug = 'telefonu-remonts',
  initialLimit = 4,
  autoExpandOnSearch = true,
}) {
  const strings = useMemo(() => getDeviceGridStrings(locale), [locale]);

  const list = useMemo(
    () => dedupeAndSort(devices, brandSlug, categorySlug),
    [devices, brandSlug, categorySlug]
  );

  const groupsAll = useMemo(
    () => groupBySeries(list, strings.fallbackSeriesTitle),
    [list, strings.fallbackSeriesTitle]
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

      map.set(
        group.slug,
        Array.from(years).sort((a, b) => b - a)
      );
    }

    return map;
  }, [groupsAll]);

  useEffect(() => {
    if (!autoExpandOnSearch) return;

    if (query) {
      setExpanded(new Set(groupsSearched.map((group) => group.slug)));
    }
  }, [query, groupsSearched, autoExpandOnSearch]);

  const groups = groupsSearched;

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

      {groups.length === 0 ? (
        <p className={s.emptyAll}>{strings.emptyAll}</p>
      ) : (
        groups.map((group) => (
          <DeviceGridSection
            key={group.slug}
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