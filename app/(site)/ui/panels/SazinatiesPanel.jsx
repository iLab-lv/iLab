'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import s from './SazinatiesPanel.module.scss';
import Button from '../../components/button/Button';
import { LOCATIONS, HOURS as DEFAULT_HOURS } from '@/data/site.config';

function parseHM(hm) {
  if (!hm) return null;
  const [h, m] = hm.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function getRigaNow() {
  const d = new Date();
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Riga',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour12: false, hour: '2-digit', minute: '2-digit',
    weekday: 'short',
  });
  const parts = fmt.formatToParts(d).reduce((acc, p) => ((acc[p.type] = p.value), acc), {});
  const date = `${parts.year}-${parts.month}-${parts.day}`;
  const weekdayMap = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return {
    date,
    minutes: parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10),
    weekday: weekdayMap[parts.weekday] ?? 0
  };
}
function computeOpenState(hoursArr, overrideForToday) {
  const { minutes: nowM, weekday } = getRigaNow();
  let today = hoursArr?.[weekday] || hoursArr?.[0];
  if (overrideForToday?.opens && overrideForToday?.closes) {
    today = { ...today, opens: overrideForToday.opens, closes: overrideForToday.closes };
  }
  const openM = parseHM(today?.opens), closeM = parseHM(today?.closes);
  if (openM == null || closeM == null) return { open: false, badgeText: 'Slēgts', today };
  if (nowM >= openM && nowM < closeM) return { open: true, badgeText: `Atvērts — līdz ${today.closes}`, today };
  return { open: false, badgeText: `Slēgts — atvērsies ${today.opens}`, today };
}

export default function SazinatiesPanel({ initialLocId }) {
  const ids = useMemo(() => LOCATIONS.map(l => l.id), []);
  const defaultId = initialLocId && ids.includes(initialLocId) ? initialLocId : ids[0];
  const [activeId, setActiveId] = useState(defaultId);

  // When initialLocId changes (e.g., via Locator handoff), select it
  useEffect(() => {
    if (initialLocId && ids.includes(initialLocId)) setActiveId(initialLocId);
  }, [initialLocId, ids]);

  // Mobile hours toggle
  const [showHoursMobile, setShowHoursMobile] = useState(false);
  useEffect(() => { setShowHoursMobile(false); }, [activeId]);

  const activeLoc = LOCATIONS.find(l => l.id === activeId) || LOCATIONS[0];
  const baseHours = Array.isArray(activeLoc?.hours) && activeLoc.hours.length ? activeLoc.hours : DEFAULT_HOURS;

  const { date: todayStr } = getRigaNow();
  const todayOverride = activeLoc?.hoursOverride?.date === todayStr ? activeLoc.hoursOverride : null;

  const state = computeOpenState(baseHours, todayOverride);

  const mapsUrl = activeLoc?.maps || '#';
  const dirUrl = activeLoc?.destination || activeLoc?.maps || '#';

  const SPECIAL_NOTICE = activeLoc?.specialNotice || null;
  const hoursListId = `hours-${activeLoc.id}`;

  /* ===== Roving tabs keyboard behavior ===== */
  const locIndex = ids.indexOf(activeId);
  const onTabsKeyDown = useCallback((e) => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    e.preventDefault();

    let nextIndex = locIndex;
    if (e.key === 'ArrowRight') nextIndex = (locIndex + 1) % ids.length;
    else if (e.key === 'ArrowLeft') nextIndex = (locIndex - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = ids.length - 1;

    const nextId = ids[nextIndex];
    setActiveId(nextId);
  }, [locIndex, ids]);

  return (
    <div className={s.wrap}>
      {/* Tabs (roving) */}
      <div role="tablist" aria-label="Filiāles" className={s.tabs} onKeyDown={onTabsKeyDown}>
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
              tabIndex={selected ? 0 : -1}
            >
              {loc.label}
            </button>
          );
        })}
      </div>

      {/* Card */}
      <section
        id={`tab-panel-${activeLoc.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeLoc.id}`}
        className={s.card}
        data-branch-card={activeLoc.id}
        data-hours-expanded={showHoursMobile ? 'true' : 'false'}
      >
        <div className={s.infoGrid}>
          {/* HOURS */}
          <div className={s.hoursBlock}>
            <div
              className={`${s.badge} ${state.open ? s.badgeOpen : s.badgeClosed}`}
              role="button"
              tabIndex={0}
              aria-controls={hoursListId}
              aria-expanded={showHoursMobile}
              onClick={() => setShowHoursMobile(v => !v)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowHoursMobile(v => !v);
                }
              }}
              title="Skatīt darba laiku"
            >
              {state.badgeText}
            </div>

            <div className={s.hoursBody}>
              <dl id={hoursListId} className={s.hoursList} aria-label="Darba laiks">
                {baseHours.map((h, i) => {
                  const isToday = state.today && h.day === state.today.day;
                  const rowOpens = (isToday && todayOverride?.opens) ? todayOverride.opens : h.opens;
                  const rowCloses = (isToday && todayOverride?.closes) ? todayOverride.closes : h.closes;
                  return (
                    <div key={i} className={s.hoursRow}>
                      <dt className={isToday ? s.hoursToday : ''}>{h.day}</dt>
                      <dd className={isToday ? s.hoursToday : ''}>{rowOpens} – {rowCloses}</dd>
                    </div>
                  );
                })}
              </dl>

              {SPECIAL_NOTICE ? <p className={s.specialNote} role="status">{SPECIAL_NOTICE}</p> : null}
            </div>
          </div>

          {/* LEFT CONTENT */}
          <div className={s.colLeft}>
            <h3 className={s.title}>{activeLoc.label}</h3>

            {activeLoc.address && (
              <>
                <p className={s.address}>{activeLoc.address}</p>
                <p className={s.addrLinks}>
                  <a className={s.linkAccent} href={mapsUrl} target="_blank" rel="noopener">Skatīt Google Maps</a>
                  <span className={s.dot} aria-hidden>•</span>
                  <a className={s.linkAccent} href={dirUrl} target="_blank" rel="noopener">Maršruti</a>
                </p>
              </>
            )}

            {activeLoc.tel && (
              <>
                <p className={s.metaLabel}>Tel:</p>
                <p className={s.phoneWrap}>
                  <span className={s.phoneText}>{activeLoc.tel}</span>
                </p>
              </>
            )}

            {activeLoc.email && (
              <>
                <p className={s.metaLabel}>email:</p>
                <p className={s.emailWrap}>
                  <a className={s.emailBig} href={`mailto:${activeLoc.email}`}>
                    {activeLoc.email}
                  </a>
                </p>
              </>
            )}
          </div>
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
  );
}
