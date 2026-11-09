'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

import s from './SazinatiesPanel.module.scss';
import Button from '../../components/button/Button';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';
import { getSazinatiesPanelContent } from './sazinatiesPanel.i18n';

import { computeOpenState, getRigaNow } from './branchAvailability';

export default function SazinatiesPanel({
  initialLocId,
  locale = 'lv',
  locations = [],
  defaultHours = [],
}) {
  const { serviceRedesign, openBook } = useUiDialogs();
  const tabsRef = useRef(null);
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
      if (serviceRedesign) tabsRef.current?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
    },
    [locIndex, ids, serviceRedesign]
  );

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

  if (serviceRedesign) {
    return <div className={s.serviceWrap}>
      <div ref={tabsRef} role="tablist" aria-label={t.tabsAriaLabel} className={s.serviceTabs} onKeyDown={onTabsKeyDown}>
        {locations.map((loc) => <button key={loc.id} type="button" role="tab" id={`tab-${loc.id}`} aria-selected={loc.id === activeId} aria-controls={`tab-panel-${loc.id}`} tabIndex={loc.id === activeId ? 0 : -1} onClick={() => setActiveId(loc.id)}>{loc.label}</button>)}
      </div>
      <section id={`tab-panel-${activeLoc.id}`} role="tabpanel" aria-labelledby={`tab-${activeLoc.id}`} className={s.serviceBranch} data-branch-card={activeLoc.id}>
        <header className={s.serviceBranchHead}>
          <h3>{activeLoc.label}</h3>
          <span>{resolvedLocale === 'ru' ? 'Сервисный центр iLab' : 'iLab servisa centrs'}</span>
        </header>
        {activeLoc.address && <address>{activeLoc.address}</address>}
        <div className={s.availability}>
          <p className={s.serviceStatus}><i data-open={state.open} aria-hidden="true" />{state.badgeText}</p>
          <div className={s.serviceHours}>
            <button type="button" aria-controls={hoursListId} aria-expanded={showHoursMobile} onClick={() => setShowHoursMobile((value) => !value)}>{t.hoursAriaLabel}</button>
            <dl id={hoursListId} hidden={!showHoursMobile}>{baseHours.map((hour, index) => {
              const today = state.today && hour.day === state.today.day;
              return <div key={index}><dt>{baseHours.length === 7 ? t.days[index] : hour.day}</dt><dd>{today && todayOverride?.opens || hour.opens} – {today && todayOverride?.closes || hour.closes}</dd></div>;
            })}</dl>
          </div>
        </div>
        {specialNotice && <p className={s.specialNote} role="status">{specialNotice}</p>}
        {activeLoc.tel && <a className={s.servicePhone} href={activeLoc.telLink || `tel:${activeLoc.tel.replace(/\s+/g, '')}`}>{activeLoc.tel}</a>}
        <div className={s.serviceLinks}>
          {activeLoc.tel && <a href={activeLoc.telLink || `tel:${activeLoc.tel.replace(/\s+/g, '')}`}>{t.call}</a>}
          {activeLoc.wa && <a href={activeLoc.wa} target="_blank" rel="noopener">{t.whatsapp}</a>}
          {activeLoc.waze && <a href={activeLoc.waze} target="_blank" rel="noopener">Waze</a>}
          {activeLoc.destination && <a href={dirUrl} target="_blank" rel="noopener">{t.routes}</a>}
          {activeLoc.maps && <a href={mapsUrl} target="_blank" rel="noopener">Google Maps</a>}
          {activeLoc.email && <a href={`mailto:${activeLoc.email}`}>{activeLoc.email}</a>}
        </div>
      </section>
      <Button variant="primary" size="lg" onClick={(event) => openBook(event.currentTarget, { location: activeLoc.id })} aria-haspopup="dialog">{resolvedLocale === 'ru' ? 'Записаться на ремонт' : 'Pieteikt remontu'}</Button>
    </div>;
  }

  return (
    <div className={s.wrap}>
      <div
        ref={tabsRef}
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
