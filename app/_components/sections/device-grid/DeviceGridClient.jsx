'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { getIphoneDeviceGridStrings } from './deviceGrid.i18n';

import s from './DeviceGrid.module.scss';

function getImageSrc(device) {
  if (device?.image && String(device.image).trim()) return device.image;

  if (device?.imagePath && String(device.imagePath).trim()) {
    return `/images/${device.imagePath.replace(/^\/+/, '')}`;
  }

  return '/images/placeholders/phone.webp';
}

function normalizeSearchValue(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
}

export default function DeviceGridClient({
  id,
  locale = 'lv',
  series = [],
  baseHref,
  initialLimit = 4,
}) {
  const strings = getIphoneDeviceGridStrings(locale);
  const [expanded, setExpanded] = useState(() => new Set());
  const [yearBySeries, setYearBySeries] = useState(() => new Map());
  const [query, setQuery] = useState('');
  const normalizedQuery = normalizeSearchValue(query);
  const filteredSeries = useMemo(() => {
    if (!normalizedQuery) return series;

    return series
      .map((group) => ({
        ...group,
        devices: group.devices.filter((device) =>
          normalizeSearchValue(
            `${device.name || ''} ${device.slug || ''} ${device.year || ''} ${group.title}`
          ).includes(normalizedQuery)
        ),
      }))
      .filter((group) => group.devices.length > 0);
  }, [normalizedQuery, series]);

  return (
    <>
      <div className={s.searchWrap}>
        <label className={s.searchLabel} htmlFor={`${id}-search`}>
          {strings.searchLabel}
        </label>
        <div className={s.searchField}>
          <input
            id={`${id}-search`}
            className={s.searchInput}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={strings.searchPlaceholder}
            autoComplete="off"
          />
          {query ? (
            <button
              className={s.clearSearch}
              type="button"
              onClick={() => setQuery('')}
              aria-label={strings.clearSearch}
            >
              <span aria-hidden="true">×</span>
            </button>
          ) : null}
        </div>
      </div>

      {filteredSeries.length === 0 ? (
        <p className={s.noResults} role="status">
          {strings.noResults}
        </p>
      ) : null}

      {filteredSeries.map((group) => {
    const isExpanded = expanded.has(group.key);
    const selectedYear = yearBySeries.get(group.key) ?? null;
    const years = Array.from(
      new Set(
        group.devices
          .map((device) => Number(device.year))
          .filter(Number.isFinite)
      )
    ).sort((a, b) => b - a);
    const matchingDevices = group.devices.filter(
      (device) =>
        normalizedQuery ||
        selectedYear === null ||
        Number(device.year) === selectedYear
    );
    const visibleSlugs = new Set(
      (normalizedQuery || isExpanded
        ? matchingDevices
        : matchingDevices.slice(0, initialLimit)).map(
        (device) => device.slug
      )
    );
    const canExpand = !normalizedQuery && group.devices.length > initialLimit;
    const sectionId = `${id}-${group.key}`;

        return (
      <section
        className={s.series}
        id={sectionId}
        aria-labelledby={`${sectionId}-title`}
        key={group.key}
      >
        <header className={s.seriesHeader}>
          <h3 id={`${sectionId}-title`} className={s.seriesTitle}>
            {group.title}
          </h3>
          {canExpand ? (
            <button
              className={s.toggleButton}
              type="button"
              onClick={() => {
                setExpanded((current) => {
                  const next = new Set(current);

                  if (next.has(group.key)) next.delete(group.key);
                  else next.add(group.key);

                  return next;
                });
              }}
              aria-expanded={isExpanded}
              aria-controls={`${sectionId}-grid`}
            >
              {isExpanded
                ? strings.showLess
                : strings.showMoreSeries(group.devices.length)}
            </button>
          ) : null}
        </header>

        {isExpanded && years.length > 1 ? (
          <div className={s.yearFilter} role="group" aria-label={strings.yearFilterAria}>
            <button
              className={`${s.yearButton} ${selectedYear === null ? s.activeYear : ''}`}
              type="button"
              onClick={() => {
                setYearBySeries((current) => {
                  const next = new Map(current);
                  next.set(group.key, null);
                  return next;
                });
              }}
              aria-pressed={selectedYear === null}
            >
              {strings.allYears}
            </button>

            {years.map((year) => (
              <button
                className={`${s.yearButton} ${selectedYear === year ? s.activeYear : ''}`}
                type="button"
                key={year}
                onClick={() => {
                  setYearBySeries((current) => {
                    const next = new Map(current);
                    next.set(group.key, year);
                    return next;
                  });
                }}
                aria-pressed={selectedYear === year}
              >
                {year}
              </button>
            ))}
          </div>
        ) : null}

        <div className={s.grid} id={`${sectionId}-grid`}>
          {group.devices.map((device) => {
            const name = device.name || device.slug;
            const label = `${name} ${strings.suffix}`;
            const isVisible = visibleSlugs.has(device.slug);

            return (
              <Link
                className={s.card}
                href={`${baseHref}/${device.slug}`}
                key={device.slug}
                aria-label={label}
                hidden={!isVisible}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={s.image}
                  src={getImageSrc(device)}
                  alt={label || strings.fallbackAlt}
                  loading="lazy"
                  decoding="async"
                />
                <span className={s.cardCopy}>
                  <span className={s.modelName}>{name}</span>
                  <span className={s.suffix}>{strings.suffix}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
        );
      })}
    </>
  );
}
