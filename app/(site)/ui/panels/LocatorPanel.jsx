'use client';

import s from './LocatorPanel.module.scss';
import LocationsMap from '@sections/locations/LocationsMap'; // adjust path if different
import { LOCATIONS, PIN_POSITIONS } from '@/data/site.config';

/**
 * Fullscreen locator panel using the shared LocationsMap (crisp WebP variants).
 *
 * Props:
 * - onSelectLocation?: (locId: string) => void  // open your "Sazinies" pane, etc.
 */
export default function LocatorPanel({ onSelectLocation }) {
  const handlePinClick = (locId) => {
    onSelectLocation?.(locId);
  };

  return (
    <div className={s.wrap}>
      <LocationsMap
        className={s.mapBox}              // makes it fill the panel area
        images={{
          small:  '/images/map-1024.webp',
          medium: '/images/map-1600.webp',
          large:  '/images/map-3000.webp',
          alt:    'Rīga - iLab lokācijas',
        }}
        locations={LOCATIONS}
        pinPositions={PIN_POSITIONS}
        onPinClick={handlePinClick}
        ariaLabel="Karte ar filiālēm"
      />
    </div>
  );
}
