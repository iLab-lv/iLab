'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import FullscreenPanel from './FullscreenPanel';
import s from './SazinatiesPanel.module.scss';
import Button from '../../components/button/Button';
import { LOCATIONS, HOURS as DEFAULT_HOURS } from '@/data/site.config';

/* ===== Helpers ===== */
function parseHM(hm) {
  if (!hm) return null;
  const [h, m] = hm.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function getRigaNow() {
  // Current date/time parts in Europe/Riga
  const d = new Date();
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Riga',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
  });
  const parts = fmt.formatToParts(d).reduce((acc, p) => ((acc[p.type] = p.value), acc), {});
  const date = `${parts.year}-${parts.month}-${parts.day}`; // YYYY-MM-DD
  const hour = parseInt(parts.hour, 10);
  const minute = parseInt(parts.minute, 10);
  const weekdayMap = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  const weekday = weekdayMap[parts.weekday] ?? 0;
  return { date, minutes: hour * 60 + minute, weekday };
}

function computeOpenState(hoursArr, overrideForToday) {
  // hoursArr: [{day, opens, closes} * 7]
  // overrideForToday: { opens, closes } or null
  const { minutes: nowM, weekday } = getRigaNow();

  // Today’s slot
  let today = hoursArr?.[weekday];
  if (!today && hoursArr && hoursArr.length > 0) today = hoursArr[0];

  // Apply override if present
  if (overrideForToday?.opens && overrideForToday?.closes) {
    today = { ...today, opens: overrideForToday.opens, closes: overrideForToday.closes };
  }

  const openM = parseHM(today?.opens);
  const closeM = parseHM(today?.closes);
  if (openM == null || closeM == null) return { open: false, badgeText: 'Slēgts', today };

  if (nowM >= openM && nowM < closeM) {
    return { open: true, badgeText: `Atvērts — līdz ${today.closes}`, today };
  }
  return { open: false, badgeText: `Slēgts — atvērsies ${today?.opens ?? ''}`, today };
}

function formatSpecialNote(ovr) {
  if (!ovr?.date || !ovr?.opens || !ovr?.closes) return null;
  // Example copy: "10.09.25 strādājam 11:00–18:00"
  const [y, m, d] = ovr.date.split('-');
  const ddmmyy = `${d}.${m}.${String(y).slice(2)}`;
  return `${ddmmyy} ${ovr.note ?? `strādājam ${ovr.opens}–${ovr.closes}`}`;
}

export default function SazinatiesPanel({ open, onClose, initialLocId }) {
  const ids = useMemo(() => LOCATIONS.map(l => l.id), []);
  const defaultId = initialLocId && ids.includes(initialLocId) ? initialLocId : ids[0];
  const [activeId, setActiveId] = useState(defaultId);

  // Sync tab on open
  useEffect(() => {
    if (!open) return;
    if (initialLocId && ids.includes(initialLocId)) setActiveId(initialLocId);
    else if (!activeId) setActiveId(ids[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialLocId]);

  // Focus first action in active card
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

  // Hours data: can be per-location or global default
  const baseHours = Array.isArray(activeLoc?.hours) && activeLoc.hours.length ? activeLoc.hours : DEFAULT_HOURS;

  // Admin override for a specific date (optional)
  // Expected shape in site.config LOCATIONS[]:
  // hoursOverride: { date: 'YYYY-MM-DD', opens: '11:00', closes: '18:00', note?: '...' }
  const { date } = getRigaNow();
  const todayOverride = activeLoc?.hoursOverride?.date === date ? activeLoc.hoursOverride : null;

  const state = computeOpenState(baseHours, todayOverride);
  const specialNote = formatSpecialNote(activeLoc?.hoursOverride);

  // Map links from config (use destination when present)
  const mapsUrl = activeLoc?.maps || '#';
  const dirUrl = activeLoc?.destination || activeLoc?.maps || '#';

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

        {/* Full-height card */}
        <section
          id={`tab-panel-${activeLoc.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeLoc.id}`}
          className={s.card}
          data-branch-card={activeLoc.id}
        >
          {/* Info area */}
          <div className={s.info}>
            {/* Big open/closed badge at top-left */}
            <div className={`${s.badge} ${state.open ? s.badgeOpen : s.badgeClosed}`}>
              {state.badgeText}
            </div>

            {/* Title & address */}
            <h3 className={s.title}>{activeLoc.label}</h3>
            {activeLoc.address && (
              <>
                <p className={s.address}>{activeLoc.address}</p>
                <p className={s.addrLinks}>
                  <a className={s.link} href={mapsUrl} target="_blank" rel="noopener">Skatīt Google Maps</a>
                  <span className={s.dot} aria-hidden>•</span>
                  <a className={s.link} href={dirUrl} target="_blank" rel="noopener">Maršruti</a>
                </p>
              </>
            )}

            {/* Special notice from admin (holiday hours) */}
            {specialNote && (
              <p className={s.specialNote} role="status">{specialNote}</p>
            )}

            {/* Hours list just under badge */}
            {Array.isArray(baseHours) && baseHours.length > 0 && (
              <dl className={s.hoursList} aria-label="Darba laiks">
                {baseHours.map((h, i) => {
                  // If today and override active, reflect override in today's row
                  const isToday = state.today && h.day === state.today.day;
                  const rowOpens  = (isToday && todayOverride?.opens)  ? todayOverride.opens  : h.opens;
                  const rowCloses = (isToday && todayOverride?.closes) ? todayOverride.closes : h.closes;
                return (
                  <div key={i} className={s.hoursRow}>
                    <dt className={isToday ? s.hoursToday : ''}>{h.day}</dt>
                    <dd className={isToday ? s.hoursToday : ''}>{rowOpens} – {rowCloses}</dd>
                  </div>
                );})}
              </dl>
            )}

            {/* Phone (very large, with subtle negative spacing) */}
            {activeLoc.tel && (
              <p className={s.phoneWrap}>
                <a className={s.phone} href={`tel:${activeLoc.tel.replace(/\s+/g, '')}`}>
                  {activeLoc.tel}
                </a>
              </p>
            )}

            {/* Email (if provided) */}
            {activeLoc.email && (
              <p className={s.row}>
                <span className={s.key}>E-pasts:</span>
                <a className={s.val} href={`mailto:${activeLoc.email}`}>{activeLoc.email}</a>
              </p>
            )}
          </div>

          {/* Bottom actions */}
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
