'use client';

import FullscreenPanel from './FullscreenPanel';
import s from './LocatorPanel.module.scss';
import Button from '../../components/button/Button';
import { LOCATIONS, HOURS } from '@/data/site.config';

export default function LocatorPanel({ open, onClose }) {
  return (
    <FullscreenPanel open={open} onClose={onClose} title="Atrast filiāli">
      <div className={s.wrap}>
        {/* Map placeholder */}
        <div className={s.map} aria-label="Karte">
          <span>MAP</span>
        </div>

        {/* Locations grid */}
        <div className={s.grid}>
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} loc={loc} />
          ))}
        </div>
      </div>
    </FullscreenPanel>
  );
}

function LocationCard({ loc }) {
  const hours = loc.hours && Array.isArray(loc.hours) ? loc.hours : HOURS;

  return (
    <section className={s.card} aria-labelledby={`loc-${loc.id}-title`}>
      <header className={s.cardHeader}>
        <h3 id={`loc-${loc.id}-title`} className={s.title}>
          {loc.label}
        </h3>
        {loc.address && <p className={s.address}>{loc.address}</p>}
      </header>

      {Array.isArray(hours) && hours.length > 0 && (
        <dl className={s.hours} aria-label="Darba laiks">
          {hours.map((h, i) => (
            <div key={i} className={s.hoursRow}>
              <dt>{h.day}</dt>
              <dd>
                {h.opens} – {h.closes}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className={s.actions}>
        {loc.tel && (
          <Button
            variant="secondary"
            size="md"
            href={`tel:${loc.tel.replace(/\s+/g, '')}`}
            aria-label={`Zvanīt ${loc.label}`}
          >
            Zvanīt
          </Button>
        )}
        {loc.wa && (
          <Button
            variant="secondary"
            size="md"
            href={loc.wa}
            aria-label={`WhatsApp ${loc.label}`}
            target="_blank"
            rel="noopener"
          >
            WhatsApp
          </Button>
        )}
        {loc.maps && (
          <Button
            variant="secondary"
            size="md"
            href={loc.maps}
            aria-label={`Maršruts uz ${loc.label}`}
            target="_blank"
            rel="noopener"
          >
            Maps
          </Button>
        )}
      </div>
    </section>
  );
}
