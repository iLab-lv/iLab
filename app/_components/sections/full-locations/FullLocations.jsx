'use client';

import { useId, useRef, useState } from 'react';
import ContactActions, { ContactDirections } from '../contact-actions/ContactActions';
import useLocationClock from './useLocationClock';
import { getAvailability, locationLinks } from './locationState';
import { getFullLocationsContent } from './fullLocations.content';
import s from './FullLocations.module.scss';

export default function FullLocations({
  id = 'locations', locale = 'lv', title, subtitle, headingId,
  locations = [], pinPositions = {}, defaultHours = [],
}) {
  const [selectedId, setSelectedId] = useState(locations[0]?.id);
  const now = useLocationClock();
  const tabs = useRef([]);
  const uid = useId();
  const selected = locations.find(location => location.id === selectedId) || locations[0];
  if (!selected) return null;
  const t = getFullLocationsContent(locale);
  const state = getAvailability(selected, defaultHours, now, locale);
  const links = locationLinks(selected);
  const weekdays = locale === 'ru'
    ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    : ['Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena', 'Svētdiena'];
  const selectedIndex = locations.indexOf(selected);
  const panelId = uid + '-panel';
  const tabId = index => uid + '-tab-' + index;
  const onTabKeyDown = event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? locations.length - 1
      : (selectedIndex + (event.key === 'ArrowRight' ? 1 : -1) + locations.length) % locations.length;
    setSelectedId(locations[next].id);
    tabs.current[next]?.focus();
  };

  return <section id={id} data-full-locations className={s.section} aria-labelledby={headingId || id + '-title'}>
    <header className={s.heading}>
      <h2 id={headingId || id + '-title'}>{title || t.title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
    <div className={s.grid}>
      <div className={s.panel}>
        <div className={s.tabs} role="tablist" aria-label={t.select} onKeyDown={onTabKeyDown}>
          {locations.map((location, index) => <button key={location.id} type="button"
            ref={element => { tabs.current[index] = element; }}
            id={tabId(index)} role="tab" aria-selected={location.id === selected.id}
            aria-controls={panelId} tabIndex={location.id === selected.id ? 0 : -1}
            className={location.id === selected.id ? s.selected : ''}
            onClick={() => setSelectedId(location.id)}>{location.label}</button>)}
        </div>
        <div id={panelId} role="tabpanel" aria-labelledby={tabId(selectedIndex)} className={s.details}>
          <div className={s.address}>
            <address>{selected.address}</address>
            {selected.email && <a className={s.email} href={'mailto:' + selected.email}>{selected.email}</a>}
          </div>
          <details className={s.hours}>
            <summary>
              <span className={s.status}><i className={state.open ? s.isOpen : ''} aria-hidden="true" /><span>{state.text}</span></span>
              <span className={s.hoursLabel}>{t.hours}<span aria-hidden="true"> +</span></span>
            </summary>
            <table aria-label={t.hoursAriaLabel}><tbody>
              {state.hours?.map((row, index) => {
                const value = index === state.today ? { ...row, ...(state.override || {}) } : row;
                return <tr key={index}><th scope="row">{weekdays[index] || row.day}</th>
                  <td>{value.closed ? t.closed : [value.opens, value.closes].filter(Boolean).join('–')}</td></tr>;
              })}
            </tbody></table>
          </details>
          <div className={s.contact}>
            {selected.tel && links.tel && <a className={s.phone} href={links.tel}>{selected.tel}</a>}
            <ContactActions location={selected} locale={locale} />
          </div>
          <ContactDirections location={selected} locale={locale} />
          <div className={s.support}>
            {selected.specialNotice && <p>{selected.specialNotice}</p>}
            <p>{t.parking}</p>
          </div>
        </div>
      </div>
      <div className={s.map} data-scan="x">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/map-riga-branches.png" width="3000" height="3000" loading="lazy" decoding="async" alt={t.mapAlt} />
        {locations.map(location => {
          const pin = pinPositions[location.id] || {};
          return <button key={location.id} type="button" data-location-pin={location.id}
            className={s.pin + (location.id === selected.id ? ' ' + s.selected : '')}
            style={{ '--x': (pin.xPct ?? 50) + '%', '--y': (pin.yPct ?? 50) + '%' }}
            aria-label={t.select + ': ' + location.label} aria-pressed={location.id === selected.id}
            onClick={() => setSelectedId(location.id)}><i aria-hidden="true" /><span>{location.label}</span></button>;
        })}
      </div>
    </div>
  </section>;
}
