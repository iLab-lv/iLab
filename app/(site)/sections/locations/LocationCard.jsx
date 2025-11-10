'use client';

import { useMemo } from 'react';
import s from './LocationCard.module.scss';
import Button from '@components/button/Button';

/**
 * Compute open/closed state from hours array
 */
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
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
  });
  const parts = fmt.formatToParts(d).reduce((acc, p) => ((acc[p.type] = p.value), acc), {});
  const date = `${parts.year}-${parts.month}-${parts.day}`;
  const weekdayMap = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return {
    date,
    minutes: parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10),
    weekday: weekdayMap[parts.weekday] ?? 0,
  };
}

function computeOpenState(hoursArr, overrideForToday) {
  const { minutes: nowM, weekday } = getRigaNow();
  let today = hoursArr?.[weekday] || hoursArr?.[0];
  
  if (overrideForToday?.opens && overrideForToday?.closes) {
    today = { ...today, opens: overrideForToday.opens, closes: overrideForToday.closes };
  }
  
  const openM = parseHM(today?.opens);
  const closeM = parseHM(today?.closes);
  
  if (openM == null || closeM == null) {
    return { open: false, badgeText: 'Slēgts', today };
  }
  
  if (nowM >= openM && nowM < closeM) {
    return { open: true, badgeText: `Atvērts — līdz ${today.closes}`, today };
  }
  
  return { open: false, badgeText: `Slēgts — atvērsies ${today.opens}`, today };
}

/**
 * Single location card - can render in 'simplified' or 'full' variant
 * 
 * @param {Object} location - Location data from site.config
 * @param {string} variant - 'simplified' | 'full'
 * @param {boolean} highlighted - External highlight state
 * @param {boolean} showActions - Show Zvanīt/WhatsApp buttons
 * @param {string} className - Additional CSS classes
 */
export default function LocationCard({
  location,
  variant = 'simplified',
  highlighted = false,
  showActions = false,
  className = '',
}) {
  const { date: todayStr } = getRigaNow();
  const todayOverride =
    location?.hoursOverride?.date === todayStr ? location.hoursOverride : null;

  const state = useMemo(
    () => computeOpenState(location.hours, todayOverride),
    [location.hours, todayOverride]
  );

  if (variant === 'simplified') {
    return (
      <div
        id={`loc-card-${location.id}`}
        className={`${s.card} ${s.simplified} ${highlighted ? s.highlighted : ''} ${className}`}
      >
        <h3 className={s.title}>{location.label}</h3>
        <p className={s.address}>{location.address}</p>

        <div className={`${s.badge} ${state.open ? s.badgeOpen : s.badgeClosed}`}>
          {state.badgeText}
        </div>

        <p className={s.phone}>{location.tel}</p>

        <a
          href={location.maps}
          target="_blank"
          rel="noopener noreferrer"
          className={s.linkAccent}
        >
          Norādes →
        </a>
      </div>
    );
  }

  // Full variant (for panels)
  return (
    <div className={`${s.card} ${s.full} ${className}`}>
      <div className={s.infoGrid}>
        {/* Hours block */}
        <div className={s.hoursBlock}>
          <div className={`${s.badge} ${state.open ? s.badgeOpen : s.badgeClosed}`}>
            {state.badgeText}
          </div>

          <dl className={s.hoursList} aria-label="Darba laiks">
            {location.hours.map((h, i) => {
              const isToday = state.today && h.day === state.today.day;
              const rowOpens =
                isToday && todayOverride?.opens ? todayOverride.opens : h.opens;
              const rowCloses =
                isToday && todayOverride?.closes ? todayOverride.closes : h.closes;
              return (
                <div key={i} className={s.hoursRow}>
                  <dt className={isToday ? s.hoursToday : ''}>{h.day}</dt>
                  <dd className={isToday ? s.hoursToday : ''}>
                    {rowOpens} – {rowCloses}
                  </dd>
                </div>
              );
            })}
          </dl>

          {location.specialNotice && (
            <p className={s.specialNote} role="status">
              {location.specialNotice}
            </p>
          )}
        </div>

        {/* Contact info */}
        <div className={s.colLeft}>
          <h3 className={s.title}>{location.label}</h3>
          <p className={s.address}>{location.address}</p>
          
          <p className={s.addrLinks}>
            <a
              className={s.linkAccent}
              href={location.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Skatīt Google Maps
            </a>
            <span className={s.dot} aria-hidden="true">
              •
            </span>
            <a
              className={s.linkAccent}
              href={location.destination}
              target="_blank"
              rel="noopener noreferrer"
            >
              Maršruti
            </a>
          </p>

          {location.tel && (
            <>
              <p className={s.metaLabel}>Tel:</p>
              <p className={s.phoneWrap}>
                <span className={s.phoneText}>{location.tel}</span>
              </p>
            </>
          )}

          {location.email && (
            <>
              <p className={s.metaLabel}>email:</p>
              <p className={s.emailWrap}>
                <a className={s.emailBig} href={`mailto:${location.email}`}>
                  {location.email}
                </a>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Sticky action buttons */}
      {showActions && (
        <div className={s.actions}>
          {location.tel && (
            <Button
              variant="primary"
              size="lg"
              href={location.telLink}
              aria-label={`Zvanīt ${location.label}`}
              block
            >
              Zvanīt
            </Button>
          )}
          {location.wa && (
            <Button
              variant="secondary"
              size="lg"
              href={location.wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${location.label}`}
              block
            >
              WhatsApp
            </Button>
          )}
        </div>
      )}
    </div>
  );
}