'use client';

import { useState } from 'react';
import s from './Locations.module.scss';
import LocationsMap from './LocationsMap';
import LocationList from './LocationList';
import { LOCATIONS, PIN_POSITIONS } from '@/data/site.config';

/**
 * Locations section
 * Desktop: cards sit below the map with a slight overlap (Option A).
 * Mobile: normal stacked flow, no overlap.
 * Map height + card rail width mirror your older layout.
 */
export default function Locations({
  id = 'locations',
  title = 'Servisa centri Rīgā',
}) {
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const handlePinClick = (locationId) => {
    setSelectedLocationId(locationId);

    // Smooth scroll to corresponding card
    const cardEl = document.getElementById(`loc-card-${locationId}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section id={id} className={`${s.section} ${s.locations}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>{title}</h2>

        {/* Map first, in normal flow */}
        <div className={s.mapArea}>
          <LocationsMap
            imageUrl="/images/map.png"
            locations={LOCATIONS}
            pinPositions={PIN_POSITIONS}
            onPinClick={handlePinClick}
          />
        </div>

        {/* Cards rail — slightly overlaps map on desktop */}
        <div className={s.cardsArea}>
          <div className={s.cardsInner}>
            <LocationList
              locations={LOCATIONS}
              selectedLocationId={selectedLocationId}
              showAllCards={true}
              showActions={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
