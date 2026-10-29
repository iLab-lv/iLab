'use client';

import s from './LocatorPanel.module.scss';
import LocationsMap from '@sections/locations/LocationsMap';

/**
 * Fullscreen locator panel using the shared LocationsMap (crisp WebP variants).
 *
 * Props:
 * - onSelectLocation?: (locId: string) => void  // open your "Sazinies" pane, etc.
 */
export default function LocatorPanel({
  locale = 'lv',
  locations = [],
  pinPositions = {},
  onSelectLocation,
}) {
  const handlePinClick = (locId) => {
    onSelectLocation?.(locId);
  };

  return (
    <div className={s.wrap}>
      <LocationsMap
        className={s.mapBox}
        imageUrl="/images/map-3000.webp"
        locations={locations}
        pinPositions={pinPositions}
        onPinClick={handlePinClick}
        ariaLabel={locale === 'ru' ? 'Карта с филиалами' : 'Karte ar filiālēm'}
      />
    </div>
  );
}
