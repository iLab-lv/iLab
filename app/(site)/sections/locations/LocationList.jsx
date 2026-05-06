'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import s from './LocationList.module.scss';
import LocationCard from './LocationCard';
import { getLocationsContent } from './locations.i18n';

export default function LocationList({
  locations = [],
  selectedLocationId,
  showAllCards = false,
  showActions = true,
  onLocationChange,
  className = '',
  locale = 'lv',
  content,
}) {
  const t = content || getLocationsContent(locale);

  const ids = useMemo(() => locations.map((l) => l.id), [locations]);

  const defaultId =
    selectedLocationId && ids.includes(selectedLocationId)
      ? selectedLocationId
      : ids[0];

  const [activeId, setActiveId] = useState(defaultId);

  useEffect(() => {
    if (selectedLocationId && ids.includes(selectedLocationId)) {
      setActiveId(selectedLocationId);
    }
  }, [selectedLocationId, ids]);

  useEffect(() => {
    if (activeId) {
      onLocationChange?.(activeId);
    }
  }, [activeId, onLocationChange]);

  const activeLocation =
    locations.find((l) => l.id === activeId) || locations[0];

  const locIndex = ids.indexOf(activeId);

  const onTabsKeyDown = useCallback(
    (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      if (!ids.length) return;

      e.preventDefault();

      let nextIndex = locIndex;

      if (e.key === 'ArrowRight') {
        nextIndex = (locIndex + 1) % ids.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (locIndex - 1 + ids.length) % ids.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = ids.length - 1;
      }

      setActiveId(ids[nextIndex]);
    },
    [locIndex, ids]
  );

  if (!locations.length) {
    return null;
  }

  if (showAllCards) {
    return (
      <div className={`${s.grid} ${className}`}>
        {locations.map((loc) => (
          <LocationCard
            key={loc.id}
            location={loc}
            variant="simplified"
            highlighted={selectedLocationId === loc.id}
            showActions={false}
            locale={locale}
            content={t}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${s.wrapper} ${className}`}>
      <div
        role="tablist"
        aria-label={t.tabsAriaLabel}
        className={s.tabs}
        onKeyDown={onTabsKeyDown}
      >
        {locations.map((loc) => {
          const selected = loc.id === activeId;

          return (
            <button
              key={loc.id}
              role="tab"
              aria-selected={selected}
              aria-controls={`tab-panel-${loc.id}`}
              id={`tab-${loc.id}`}
              className={`${s.tab} ${selected ? s.tabActive : ''}`}
              onClick={() => setActiveId(loc.id)}
              tabIndex={selected ? 0 : -1}
            >
              {loc.label}
            </button>
          );
        })}
      </div>

      <section
        id={`tab-panel-${activeLocation.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeLocation.id}`}
        className={s.cardContainer}
      >
        <LocationCard
          location={activeLocation}
          variant="full"
          showActions={showActions}
          locale={locale}
          content={t}
        />
      </section>
    </div>
  );
}