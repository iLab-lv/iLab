'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

import s from './SazinatiesPanel.module.scss';
import Button from '../../components/button/Button';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';
import { getSazinatiesPanelContent } from './sazinatiesPanel.i18n';

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

  const parts = fmt
    .formatToParts(d)
    .reduce((acc, p) => ((acc[p.type] = p.value), acc), {});

  const date = `${parts.year}-${parts.month}-${parts.day}`;

  const weekdayMap = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };

  return {
    date,
    minutes: parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10),
    weekday: weekdayMap[parts.weekday] ?? 0,
  };
}

function computeOpenState(hoursArr, overrideForToday, t) {
  const { minutes: nowM, weekday } = getRigaNow();

  let today = hoursArr?.[weekday] || hoursArr?.[0];

  if (overrideForToday?.opens && overrideForToday?.closes) {
    today = {
      ...today,
      opens: overrideForToday.opens,
      closes: overrideForToday.closes,
    };
  }

  const openM = parseHM(today?.opens);
  const closeM = parseHM(today?.closes);

  if (openM == null || closeM == null) {
    return {
      open: false,
      badgeText: t.closed,
      today,
    };
  }

  if (nowM >= openM && nowM < closeM) {
    return {
      open: true,
      badgeText: t.openUntil(today.closes),
      today,
    };
  }

  return {
    open: false,
    badgeText: t.closedUntil(today.opens),
    today,
  };
}

export default function SazinatiesPanel({
  initialLocId,
  locale = 'lv',
  locations = [],
  defaultHours = [],
}) {
  const pathname = usePathname() || '/';
  const resolvedLocale = getNavLocaleFromPathname(pathname) || locale || 'lv';
  const t = getSazinatiesPanelContent(resolvedLocale);

  const ids = useMemo(() => locations.map((l) => l.id), [locations]);

  const defaultId =
    initialLocId && ids.includes(initialLocId) ? initialLocId : ids[0];

  const [activeId, setActiveId] = useState(defaultId);

  useEffect(() => {
    if (initialLocId && ids.includes(initialLocId)) {
      setActiveId(initialLocId);
    }
  }, [initialLocId, ids]);

  useEffect(() => {
    if (!activeId && ids[0]) {
      setActiveId(ids[0]);
    }
  }, [activeId, ids]);

  const [showHoursMobile, setShowHoursMobile] = useState(false);

  useEffect(() => {
    setShowHoursMobile(false);
  }, [activeId]);

  const activeLoc =
    locations.find((l) => l.id === activeId) || locations[0];

  if (!activeLoc) {
    return null;
  }

  const baseHours =
    Array.isArray(activeLoc?.hours) && activeLoc.hours.length
      ? activeLoc.hours
      : defaultHours;

  const { date: todayStr } = getRigaNow();

  const todayOverride =
    activeLoc?.hoursOverride?.date === todayStr
      ? activeLoc.hoursOverride
      : null;

  const state = computeOpenState(baseHours, todayOverride, t);

  const mapsUrl = activeLoc?.maps || '#';
  const dirUrl = activeLoc?.destination || activeLoc?.maps || '#';

  const specialNotice = activeLoc?.specialNotice || null;
  const hoursListId = `hours-${activeLoc.id}`;

  const locIndex = ids.indexOf(activeId);

  const onTabsKeyDown = useCallback(
    (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      if (!ids.length) return;

      e.preventDefault();

      let nextIndex = locIndex;

      if (e.key === 'ArrowRight') {
        nextIndex = (locIndex + 1) % ids.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (locIndex - 1 + ids.length) % ids.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = ids.length - 1;
      }

      setActiveId(ids[nextIndex]);
    },
    [locIndex, ids]
  );

  return (
    <div className={s.wrap}>
      <div
        role="tablist"
        aria-label={t.tabsAriaLabel}
        className={s.tabs}
        onKeyDown={onTabsKeyDown}
      >
        {locations.map((loc) => {
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

      <section
        id={`tab-panel-${activeLoc.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeLoc.id}`}
        className={s.card}
        data-branch-card={activeLoc.id}
        data-hours-expanded={showHoursMobile ? 'true' : 'false'}
      >
        <div className={s.cardInner}>
          <div className={s.infoGrid}>
            <div className={s.hoursBlock}>
              <div
                className={`${s.badge} ${
                  state.open ? s.badgeOpen : s.badgeClosed
                }`}
                role="button"
                tabIndex={0}
                aria-controls={hoursListId}
                aria-expanded={showHoursMobile}
                onClick={() => setShowHoursMobile((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowHoursMobile((v) => !v);
                  }
                }}
                title={t.showHoursTitle}
              >
                {state.badgeText}
              </div>

              <div className={s.hoursBody}>
                <dl
                  id={hoursListId}
                  className={s.hoursList}
                  aria-label={t.hoursAriaLabel}
                >
                  {baseHours.map((h, i) => {
                    const isToday = state.today && h.day === state.today.day;

                    const rowOpens =
                      isToday && todayOverride?.opens
                        ? todayOverride.opens
                        : h.opens;

                    const rowCloses =
                      isToday && todayOverride?.closes
                        ? todayOverride.closes
                        : h.closes;

                    return (
                      <div key={i} className={s.hoursRow}>
                        <dt className={isToday ? s.hoursToday : ''}>
                          {h.day}
                        </dt>
                        <dd className={isToday ? s.hoursToday : ''}>
                          {rowOpens} – {rowCloses}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                {specialNotice ? (
                  <p className={s.specialNote} role="status">
                    {specialNotice}
                  </p>
                ) : null}
              </div>
            </div>

            <div className={s.colLeft}>
              <h3 className={s.title}>{activeLoc.label}</h3>

              {activeLoc.address && (
                <>
                  <p className={s.address}>{activeLoc.address}</p>

                  <p className={s.addrLinks}>
                    <a
                      className={s.linkAccent}
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      {t.viewGoogleMaps}
                    </a>

                    <span className={s.dot} aria-hidden>
                      •
                    </span>

                    <a
                      className={s.linkAccent}
                      href={dirUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      {t.routes}
                    </a>
                  </p>
                </>
              )}

              {activeLoc.tel && (
                <>
                  <p className={s.metaLabel}>{t.phoneLabel}</p>

                  <p className={s.phoneWrap}>
                    <span className={s.phoneText}>{activeLoc.tel}</span>
                  </p>
                </>
              )}

              {activeLoc.email && (
                <>
                  <p className={s.metaLabel}>{t.emailLabel}</p>

                  <p className={s.emailWrap}>
                    <a className={s.emailBig} href={`mailto:${activeLoc.email}`}>
                      {activeLoc.email}
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={s.actions}>
          {activeLoc.tel && (
            <Button
              variant="primary"
              size="lg"
              href={
                activeLoc.telLink ||
                `tel:${activeLoc.tel.replace(/\s+/g, '')}`
              }
              aria-label={t.callAriaLabel(activeLoc.label)}
              block
            >
              {t.call}
            </Button>
          )}

          {activeLoc.wa && (
            <Button
              variant="secondary"
              size="lg"
              href={activeLoc.wa}
              target="_blank"
              rel="noopener"
              aria-label={t.whatsappAriaLabel(activeLoc.label)}
              block
            >
              {t.whatsapp}
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}