'use client';

import { useState } from 'react';
import s from './Locations.module.scss';
import LocationsMap from './LocationsMap';
import LocationList from './LocationList';
import { getLocationsContent } from './locations.i18n';

export default function Locations({
  id = 'locations',
  locale = 'lv',
  title,
  locations = [],
  pinPositions = {},
}) {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const t = getLocationsContent(locale);

  const sectionTitle = title || t.title;

  const handlePinClick = (locationId) => {
    setSelectedLocationId(locationId);

    const cardEl = document.getElementById(`loc-card-${locationId}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section
      id={id}
      className={`${s.section} ${s.locations}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>
          {sectionTitle}
        </h2>

        <div className={s.mapArea}>
          <LocationsMap
            imageUrl="/images/map.png"
            locations={locations}
            pinPositions={pinPositions}
            onPinClick={handlePinClick}
          />
        </div>

        <div className={s.cardsArea}>
          <div className={s.cardsInner}>
            <LocationList
              locations={locations}
              selectedLocationId={selectedLocationId}
              showAllCards={true}
              showActions={false}
              locale={locale}
              content={t}
            />
          </div>
        </div>
      </div>
    </section>
  );
}