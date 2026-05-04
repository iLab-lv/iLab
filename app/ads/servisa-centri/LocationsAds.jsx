// app/ads/iphone-remonts/LocationsAds.jsx
'use client';

import LocationsMap from '@sections/locations/LocationsMap';
import { LOCATIONS, PIN_POSITIONS } from '@/data/site.config';
import { useUiDialogs } from '@ui/providers/UiDialogsProvider';

import sCatalog from '@styles/Catalog.module.scss';
import s from './LocationsAds.module.scss';

export default function LocationsAds({
  id = 'locations',
  titleId = 'locations-title',
  title = 'Servisa centri Rīgā',
}) {
  const { openLocator } = useUiDialogs();

  const handlePinClick = () => {
    // On landing: open full-screen locator panel, no card scroll.
    if (openLocator) {
      openLocator(null);
    }
  };

  return (
    <div id={id} className={s.root} aria-labelledby={titleId}>
      <div className={s.header}>
        <h2 id={titleId} className={sCatalog.h2}>
          {title}
        </h2>
        <p className={sCatalog.paragraph}>
          Divi iLab servisa centri Rīgā - Domina Shopping un Spice Home. Atved iPhone uz
          bezmaksas diagnostiku tajā pašā dienā.
        </p>
        <p className={s.helper}>
          Klikšķini uz punkta kartē - atvērsies pilns kontaktu panelis ar darba laiku un
          norādēm, kā mūs atrast.
        </p>
      </div>

      <div className={s.mapShell}>
        <div className={s.mapWrapper}>
          <LocationsMap
            className={s.mapInner}
            imageUrl="/images/map.png"
            locations={LOCATIONS}
            pinPositions={PIN_POSITIONS}
            onPinClick={handlePinClick}
            ariaLabel="iLab servisa centri Rīgā"
          />
        </div>
      </div>
    </div>
  );
}
