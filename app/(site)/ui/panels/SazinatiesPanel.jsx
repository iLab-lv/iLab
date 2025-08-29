'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import FullscreenPanel from './FullscreenPanel';
import s from './SazinatiesPanel.module.scss';
import Button from '../../components/button/Button';
import { LOCATIONS, HOURS as DEFAULT_HOURS } from '@/data/site.config';

/**
 * Helpers
 */
function parseHM(hm) {
  // "10:00" -> minutes since midnight
  if (!hm) return null;
  const [h, m] = hm.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function getRigaNowMinutes() {
  // current time in Europe/Riga as minutes since midnight
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Riga',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
    .formatToParts(new Date())
    .reduce((acc, p) => ((acc[p.type] = p.value), acc), {});
  const h = parseInt(parts.hour, 10);
  const m = parseInt(parts.minute, 10);
  return h * 60 + m;
}

function getRigaWeekdayIndex() {
  // 0=Mon,...,6=Sun (we align to typical store-hours arrays)
  const wd = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Riga',
    weekday: 'short',
  }).format(new Date()); // e.g. "Mon"
  const map = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return map[wd] ?? 0;
}

function computeOpenState(hoursArr) {
  // Expects an array of 7 entries (Mon..Sun): { day, opens, closes }
  // Returns { open:boolean, closes:string|null, opensAt:string|null }
  if (!Array.isArray(hoursArr) || hoursArr.length === 0) {
    return { open: false, closes: null, opensAt: null };
  }
  const idx = getRigaWeekdayIndex();
  const today = hoursArr[idx] || hoursArr[0];
  const now = getRigaNowMinutes();
  const openM = parseHM(today?.opens);
  const closeM = parseHM(today?.closes);

  if (openM == null || closeM == null) {
    return { open: false, closes: null, opensAt: null };
  }
  if (now >= openM && now < closeM) {
    return { open: true, closes: today.closes, opensAt: null };
  }
  return { open: false, closes: null, opensAt: today.opens };
}

function buildDirectionsUrl(loc) {
  // Prefer lat/lng if provided (loc.geo = {lat, lng} or [lat, lng]).
  const g = loc?.geo;
  let lat = null, lng = null;
  if (Array.isArray(g) && g.length >= 2) {
    [lat, lng] = g;
  } else if (g && typeof g === 'object') {
    lat = g.lat; lng = g.lng;
  }
  if (typeof lat === 'number' && typeof lng === 'number') {
    const q = new URLSearchParams({
      api: '1',
      destination: `${lat},${lng}`,
    });
    return `https://www.google.com/maps/dir/?${q.toString()}`;
  }
  // Fallback: if we only have a 'maps' URL, use it (directions won’t be guaranteed)
  return loc?.maps || '#';
}

/**
 * Contacts panel with tabs & full-height card
 */
export default function SazinatiesPanel({ open, onClose, initialLocId }) {
  const ids = useMemo(() => LOCATIONS.map(l => l.id), []);
  const defaultId = initialLocId && ids.includes(initialLocId) ? initialLocId : ids[0];
  const [activeId, setActiveId] = useState(defaultId);

  // Sync active tab on open if coming from Locator
  useEffect(() => {
    if (!open) return;
    if (initialLocId && ids.includes(initialLocId)) setActiveId(initialLocId);
    else if (!activeId) setActiveId(ids[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialLocId]);

  // Focus the first actionable button in the visible card
  const rootRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const card = rootRef.current?.querySelector(`[data-branch-card="${activeId}"]`);
      const btn = card?.querySelector('a,button');
      btn?.focus?.();
    }, 0);
    return () => clearTimeout(t);
  }, [open, activeId]);

  const activeLoc = LOCATIONS.find(l => l.id === activeId) || LOCATIONS[0];
  const hours = Array.isArray(activeLoc?.hours) && activeLoc.hours.length ? activeLoc.hours : DEFAULT_HOURS;
  const state = computeOpenState(hours);
  const dirUrl = buildDirectionsUrl(activeLoc);
  const mapsUrl = activeLoc?.maps || dirUrl;

  return (
    <FullscreenPanel open={open} onClose={onClose} title="Sazināties" mountWhenClosed={true}>
      <div className={s.wrap} ref={rootRef}>
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

        {/* Full-height card (single visible) */}
        <section
          id={`tab-panel-${activeLoc.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeLoc.id}`}
          className={s.card}
          data-branch-card={activeLoc.id}
        >
          {/* Top info block */}
          <div className={s.info}>
            <h3 className={s.title}>{activeLoc.label}</h3>
            {activeLoc.address && <p className={s.address}>{activeLoc.address}</p>}

            {/* Hours + open now */}
            {Array.isArray(hours) && hours.length > 0 && (
              <div className={s.hoursBlock} aria-label="Darba laiks">
                <p className={`${s.badge} ${state.open ? s.badgeOpen : s.badgeClosed}`}>
                  {state.open ? `Atvērts — līdz ${state.closes}` : `Slēgts — atvērsies ${state.opensAt}`}
                </p>
                <dl className={s.hoursList}>
                  {hours.map((h, i) => (
                    <div key={i} className={s.hoursRow}>
                      <dt>{h.day}</dt>
                      <dd>{h.opens} – {h.closes}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Contacts */}
            <div className={s.contacts}>
              {activeLoc.tel && (
                <p className={s.row}>
                  <span className={s.key}>Tālrunis:</span>
                  <a className={s.val} href={`tel:${activeLoc.tel.replace(/\s+/g, '')}`}>{activeLoc.tel}</a>
                </p>
              )}
              {activeLoc.email && (
                <p className={s.row}>
                  <span className={s.key}>E-pasts:</span>
                  <a className={s.val} href={`mailto:${activeLoc.email}`}>{activeLoc.email}</a>
                </p>
              )}
              <p className={s.rowLinks}>
                <a className={s.link} href={mapsUrl} target="_blank" rel="noopener">Skatīt Google Maps</a>
                <span className={s.dot} aria-hidden>•</span>
                <a className={s.link} href={dirUrl} target="_blank" rel="noopener">Maršruti</a>
              </p>
            </div>
          </div>

          {/* Bottom actions cluster */}
          <div className={s.actions}>
            {activeLoc.tel && (
              <Button
                variant="primary"
                size="lg"
                href={`tel:${activeLoc.tel.replace(/\s+/g, '')}`}
                aria-label={`Zvanīt ${activeLoc.label}`}
                block
              >
                Zvanīt
              </Button>
            )}
            {activeLoc.wa && (
              <Button
                variant="secondary"
                size="lg"
                href={activeLoc.wa}
                target="_blank"
                rel="noopener"
                aria-label={`WhatsApp ${activeLoc.label}`}
                block
              >
                WhatsApp
              </Button>
            )}
          </div>
        </section>
      </div>
    </FullscreenPanel>
  );
}
