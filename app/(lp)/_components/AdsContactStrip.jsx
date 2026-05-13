// app/ads/_components/AdsContactStrip.jsx

import s from './AdsContactStrip.module.scss';

// Keep defaults ABOVE the component so default params can reference them safely.
const DEFAULT_LOCATIONS = [
  {
    id: 'domina',
    label: 'Domina Shopping',
    address: 'Ieriķu iela 3, Rīga',
    hoursShort: '10:00–21:00 (katru dienu)',
    tel: '+371 23370088',
    maps: '', // optional
  },
  {
    id: 'spice',
    label: 'Spice Life',
    address: 'Jaunmoku iela 13, Rīga',
    hoursShort: '10:00–21:00 (Sv 10:00–20:00)',
    tel: '+371 20887787',
    maps: '', // optional
  },
];

/**
 * Compact NAP/contact strip for Ads landings.
 * - Intended to sit right below the hero (no map, no duplication of full Locations section).
 * - Keeps reviewer-critical identity/contact info visible without scrolling.
 */
export default function AdsContactStrip(props) {
  const {
    title = 'Divas darbnīcas Rīgā',
    locations,
    showMaps = true,
    className = '',
    containerClassName = '',
    ariaLabel = 'Servisa centru kontaktinformācija',
  } = props || {};

  const locs = Array.isArray(locations) && locations.length ? locations : DEFAULT_LOCATIONS;

  return (
    <section className={`${s.wrap} ${className}`} aria-label={ariaLabel}>
      {/* Use the same container class as other sections to align width */}
      <div className={`${s.container} ${containerClassName}`}>
        <div className={s.card}>
          {title ? <h2 className={s.title}>{title}</h2> : null}

          <ul className={s.list}>
            {locs.map((loc) => {
              const telHref = (loc.tel || '').replace(/\s+/g, '');
              const hasMap = showMaps && !!loc.maps;

              return (
                <li key={loc.id || loc.label} className={s.item}>
                  <div className={s.rowTop}>
                    <span className={s.name}>{loc.label}</span>

                    {hasMap ? (
                      <a className={s.mapLink} href={loc.maps} target="_blank" rel="noreferrer">
                        Atvērt kartē
                      </a>
                    ) : null}
                  </div>

                  <div className={s.meta}>
                    {loc.address ? <span className={s.metaItem}>{loc.address}</span> : null}

                    {loc.address && loc.hoursShort ? (
                      <span className={s.dot} aria-hidden="true">
                        •
                      </span>
                    ) : null}

                    {loc.hoursShort ? <span className={s.metaItem}>{loc.hoursShort}</span> : null}

                    {(loc.address || loc.hoursShort) && loc.tel ? (
                      <span className={s.dot} aria-hidden="true">
                        •
                      </span>
                    ) : null}

                    {loc.tel ? (
                      <a className={s.phone} href={telHref ? `tel:${telHref}` : undefined}>
                        {loc.tel}
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
