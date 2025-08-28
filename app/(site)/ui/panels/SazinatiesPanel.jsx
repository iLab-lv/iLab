'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import FullscreenPanel from './FullscreenPanel';
import s from './SazinatiesPanel.module.scss';
import Button from '../../components/button/Button';
import { LOCATIONS } from '@/data/site.config';

/**
 * Contacts panel with tabs:
 * - Only ONE branch is visible at a time.
 * - Accepts initialLocId to preselect the tab (from locator pin click).
 * - On open (or tab change), focuses the first action button in the visible tab.
 */
export default function SazinatiesPanel({ open, onClose, initialLocId }) {
  const ids = useMemo(() => LOCATIONS.map(l => l.id), []);
  const defaultId = initialLocId && ids.includes(initialLocId) ? initialLocId : ids[0];
  const [activeId, setActiveId] = useState(defaultId);

  // Keep active tab in sync if initialLocId changes between opens
  useEffect(() => {
    if (!open) return;
    if (initialLocId && ids.includes(initialLocId)) {
      setActiveId(initialLocId);
    } else if (!activeId) {
      setActiveId(ids[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialLocId]);

  // Focus the first actionable button in the active tab when panel opens or tab changes
  const containerRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const card = containerRef.current?.querySelector(`[data-branch-card="${activeId}"]`);
      const btn = card?.querySelector('a,button');
      btn?.focus?.();
    }, 0);
    return () => clearTimeout(t);
  }, [open, activeId]);

  const activeLoc = LOCATIONS.find(l => l.id === activeId) || LOCATIONS[0];

  return (
    <FullscreenPanel open={open} onClose={onClose} title="Sazināties">
      <div className={s.wrap} ref={containerRef}>
        {/* Tabs */}
        <div role="tablist" aria-label="Filiāles" className={s.tabs}>
          {LOCATIONS.map((loc) => {
            const selected = loc.id === activeId;
            return (
              <button
                key={loc.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`tab-panel-${loc.id}`}
                id={`tab-${loc.id}`}
                className={`${s.tab} ${selected ? s.tabActive : ''}`}
                onClick={() => setActiveId(loc.id)}
              >
                {loc.label}
              </button>
            );
          })}
        </div>

        {/* Active panel only */}
        <section
          id={`tab-panel-${activeLoc.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeLoc.id}`}
          className={s.panel}
          data-branch-card={activeLoc.id}
        >
          <h3 className={s.title}>{activeLoc.label}</h3>
          {activeLoc.address && <p className={s.address}>{activeLoc.address}</p>}

          <div className={s.actions}>
            {activeLoc.tel && (
              <Button
                variant="primary"
                size="md"
                href={`tel:${activeLoc.tel.replace(/\s+/g, '')}`}
                aria-label={`Zvanīt ${activeLoc.label}`}
              >
                Zvanīt
              </Button>
            )}
            {activeLoc.wa && (
              <Button
                variant="secondary"
                size="md"
                href={activeLoc.wa}
                target="_blank"
                rel="noopener"
                aria-label={`WhatsApp ${activeLoc.label}`}
              >
                WhatsApp
              </Button>
            )}
            {activeLoc.maps && (
              <Button
                variant="secondary"
                size="md"
                href={activeLoc.maps}
                target="_blank"
                rel="noopener"
                aria-label={`Karte uz ${activeLoc.label}`}
              >
                Maps
              </Button>
            )}
          </div>
        </section>
      </div>
    </FullscreenPanel>
  );
}
