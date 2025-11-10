'use client';

import { useEffect, useState, useCallback } from 'react';
import s from './LocationList.module.scss';
import LocationCard from './LocationCard';

/**
 * Location cards list/grid wrapper
 * Handles two modes: tabbed (single card) or grid (all cards)
 * 
 * @param {Array} locations - Location data from site.config
 * @param {string} selectedLocationId - Externally controlled selection
 * @param {boolean} showAllCards - true = grid mode, false = tabbed mode
 * @param {boolean} showActions - Show action buttons on cards
 * @param {Function} onLocationChange - (locationId) => void
 * @param {string} className - Additional CSS classes
 */
export default function LocationList({
  locations = [],
  selectedLocationId,
  showAllCards = false,
  showActions = true,
  onLocationChange,
  className = '',
}) {
  const ids = locations.map((l) => l.id);
  const defaultId = selectedLocationId && ids.includes(selectedLocationId) 
    ? selectedLocationId 
    : ids[0];
  
  const [activeId, setActiveId] = useState(defaultId);

  // Sync with external selection
  useEffect(() => {
    if (selectedLocationId && ids.includes(selectedLocationId)) {
      setActiveId(selectedLocationId);
    }
  }, [selectedLocationId, ids]);

  // Notify parent of changes
  useEffect(() => {
    onLocationChange?.(activeId);
  }, [activeId, onLocationChange]);

  const activeLocation = locations.find((l) => l.id === activeId) || locations[0];

  // Roving tabs keyboard navigation
  const locIndex = ids.indexOf(activeId);
  const onTabsKeyDown = useCallback(
    (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
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

  // Grid mode - all cards visible
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
          />
        ))}
      </div>
    );
  }

  // Tabbed mode - single card with tabs
  return (
    <div className={`${s.wrapper} ${className}`}>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Filiāles"
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

      {/* Single active card */}
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
        />
      </section>
    </div>
  );
}