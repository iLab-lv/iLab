'use client';

import FullscreenPanel from './FullscreenPanel';
import s from './SazinatiesPanel.module.scss';
import Button from '../../components/button/Button';
import { LOCATIONS } from '../../../data/site.config';

export default function SazinatiesPanel({ open, onClose }) {
  return (
    <FullscreenPanel open={open} onClose={onClose} title="Sazināties">
      <div className={s.wrap}>
        <p className={s.lead}>
          Izvēlies filiāli un sazinies ar mums pa tālruni vai WhatsApp.
        </p>

        <div className={s.grid}>
          {LOCATIONS.map((loc) => (
            <section key={loc.id} className={s.card} aria-labelledby={`contact-${loc.id}-title`}>
              <h3 id={`contact-${loc.id}-title`} className={s.title}>{loc.label}</h3>
              {loc.address && <p className={s.address}>{loc.address}</p>}

              <div className={s.actions}>
                {loc.tel && (
                  <Button
                    variant="primary"
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
                    target="_blank"
                    rel="noopener"
                    aria-label={`WhatsApp ${loc.label}`}
                  >
                    WhatsApp
                  </Button>
                )}
                {loc.maps && (
                  <Button
                    variant="secondary"
                    size="md"
                    href={loc.maps}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Karte uz ${loc.label}`}
                  >
                    Karte
                  </Button>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </FullscreenPanel>
  );
}
