'use client';

import { useState, useMemo } from 'react';
import FullscreenPanel from './FullscreenPanel';
import s from './BranchPanel.module.scss';
import Button from '../../components/button/Button';
import { LOCATIONS } from '@/data/site.config';

/**
 * Unified Branch Panel
 * - Replaces separate Locator + Sazināties panels
 * - Two entry modes:
 *    - mode="contact" (default): list-first, "show map" toggle available
 *    - mode="locator": map shown by default (placeholder for now)
 * - Map area is a placeholder with two interactive pin buttons
 */
export default function BranchPanel({
  open,
  onClose,
  mode = 'contact', // 'contact' | 'locator'
}) {
  const [mapOpen, setMapOpen] = useState(mode === 'locator');
  const title = mapOpen ? 'Atrast filiāli' : 'Sazināties';

  // Simple mapping for placeholder pin positions (percentages)
  // Adjust these once you have a real image/map
  const pinLayout = useMemo(
    () => ({
      // Map keys to LOCATIONS by id for clarity
      // Example assumes two ids 'domina' and 'spice'
      domina: { top: '38%', left: '58%' },
      spice: { top: '70%', left: '72%' },
    }),
    []
  );

  const handlePinClick = (locId) => {
    // For now: just scroll/highlight the matching card
    const el = document.getElementById(`branch-card-${locId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add(s.cardPulse);
      setTimeout(() => el.classList.remove(s.cardPulse), 800);
    }
  };

  return (
    <FullscreenPanel
      open={open}
      onClose={onClose}
      title={title}
      labelledById="branch-panel-title"
      mountWhenClosed={false}
    >
      <div className={s.wrap}>
        {/* Top bar toggle (pin icon) */}
        <div className={s.toolbar}>
          <button
            type="button"
            className={s.toggle}
            aria-pressed={mapOpen}
            aria-label={mapOpen ? 'Slēpt karti' : 'Rādīt karti'}
            onClick={() => setMapOpen((v) => !v)}
          >
            <span aria-hidden="true">📍</span>{' '}
            {mapOpen ? 'Slēpt karti' : 'Rādīt karti'}
          </button>
        </div>

        <div className={s.layout} data-mapopen={mapOpen ? '1' : '0'}>
          {/* List column */}
          <div className={s.listCol}>
            <p className={s.lead}>
              Izvēlies filiāli, lai zvanītu vai rakstītu WhatsApp.
            </p>

            <div className={s.grid}>
              {LOCATIONS.map((loc) => (
                <section
                  key={loc.id}
                  id={`branch-card-${loc.id}`}
                  className={s.card}
                  aria-labelledby={`branch-${loc.id}-title`}
                >
                  <h3 id={`branch-${loc.id}-title`} className={s.title}>
                    {loc.label}
                  </h3>
                  {loc.address && (
                    <p className={s.address}>{loc.address}</p>
                  )}

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
                        aria-label={`Maršruts uz ${loc.label}`}
                      >
                        Maps
                      </Button>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Map column / placeholder */}
          {mapOpen && (
            <div className={s.mapCol} aria-label="Karte (vietturis)">
              <div className={s.mapBox}>
                <span className={s.mapLabel}>MAP</span>

                {/* Two interactive pins aligned by percentage positions */}
                {LOCATIONS.map((loc) => {
                  const pos =
                    pinLayout[loc.id] ||
                    { top: '50%', left: '50%' }; // fallback center
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      className={s.pin}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => handlePinClick(loc.id)}
                      aria-label={`Rādīt ${loc.label} karti un kontaktus`}
                    >
                      <span className={s.pinDot} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </FullscreenPanel>
  );
}
