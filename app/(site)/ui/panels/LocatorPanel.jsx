'use client';

import { useMemo } from 'react';
import FullscreenPanel from './FullscreenPanel';
import s from './LocatorPanel.module.scss';
import { LOCATIONS } from '@/data/site.config';

export default function LocatorPanel({ open, onClose, onSelectLocation }) {
  // Percent positions for the placeholder (adjust later if you add an image)
  const pinLayout = useMemo(
    () => ({
      domina: { top: '38%', left: '58%' },
      spice:  { top: '70%', left: '72%' },
    }),
    []
  );

  const handlePinClick = (locId) => {
    // Notify parent; parent will close this panel and open Contacts with tab selected
    onSelectLocation?.(locId);
  };

  return (
    <FullscreenPanel open={open} onClose={onClose} title="Atrast filiāli">
      <div className={s.wrap}>
        <div className={s.map} aria-label="Karte (vietturis)">
          <span className={s.mapLabel}>MAP</span>

          {LOCATIONS.map((loc) => {
            const pos = pinLayout[loc.id] || { top: '50%', left: '50%' };
            return (
              <button
                key={loc.id}
                type="button"
                className={s.pin}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => handlePinClick(loc.id)}
                aria-label={`Atvērt kontaktus: ${loc.label}`}
              >
                <span className={s.pinDot} aria-hidden="true" />
                <span className={s.pinHalo} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </FullscreenPanel>
  );
}
