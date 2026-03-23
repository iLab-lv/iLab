'use client';

import { byYearDescThenNameAsc } from './deviceGrid.helpers';
import ModelCard from './ModelCard';

import s from './DeviceGridSection.module.scss';

export default function DeviceGridSection({
  group,
  baseHref,
  initialLimit = 4,
  isExpanded = false,
  onToggle,
  selectedYear = null,
  onSelectYear,
  years = [],
  strings,
}) {
  const sectionId = `series-${group.slug}`;

  const itemsByYear =
    isExpanded && selectedYear !== null
      ? group.items.filter((device) => Number(device.year) === Number(selectedYear))
      : group.items;

  const itemsSorted = [...itemsByYear].sort(byYearDescThenNameAsc);
  const visible = isExpanded ? itemsSorted : itemsSorted.slice(0, initialLimit);
  const canExpand = itemsSorted.length > initialLimit;

  return (
    <section
      className={s.section}
      aria-labelledby={`${sectionId}-title`}
      id={sectionId}
    >
      <div className={s.sectionHeader}>
        <h2 id={`${sectionId}-title`} className={s.sectionTitle}>
          {group.title} <span className={s.count}>({group.items.length})</span>
        </h2>

        {canExpand ? (
          <button
            type="button"
            className={s.toggleBtn}
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={`${sectionId}-grid`}
          >
            {isExpanded
              ? strings.showLess
              : strings.showMoreSeries(group.items.length)}
          </button>
        ) : null}
      </div>

      {isExpanded && years.length > 0 ? (
        <div className={s.yearFilter} role="group" aria-label={strings.yearFilterAria}>
          <button
            type="button"
            className={`${s.yearChip} ${selectedYear === null ? s.active : ''}`}
            onClick={() => onSelectYear(null)}
            aria-pressed={selectedYear === null}
          >
            {strings.allYears}
          </button>

          {years.map((year) => (
            <button
              key={year}
              type="button"
              className={`${s.yearChip} ${
                Number(selectedYear) === year ? s.active : ''
              }`}
              onClick={() => onSelectYear(year)}
              aria-pressed={Number(selectedYear) === year}
            >
              {year}
            </button>
          ))}
        </div>
      ) : null}

      {itemsSorted.length === 0 ? (
        <p className={s.emptySection}>{strings.emptyYear}</p>
      ) : (
        <div className={s.grid} id={`${sectionId}-grid`}>
          {visible.map((device) => (
            <ModelCard
              key={`${device.brandSlug}:${device.slug}`}
              device={device}
              baseHref={baseHref}
              locale={strings.locale}
            />
          ))}
        </div>
      )}
    </section>
  );
}