'use client';

import { useEffect, useId, useRef, useState } from 'react';
import ContactActions, { ContactDirections } from '../contact-actions/ContactActions';
import useLocationClock from './useLocationClock';
import { getAvailability, locationLinks } from './locationState';
import { getFullLocationsContent, getLocationPhoto } from './fullLocations.content';
import s from './FullLocations.module.scss';

export default function FullLocations({
  id = 'locations', locale = 'lv', title, subtitle, headingId,
  locations = [], defaultHours = [],
}) {
  const [selectedId, setSelectedId] = useState(locations[0]?.id);
  const now = useLocationClock();
  const tabs = useRef([]);
  const uid = useId();
  useEffect(() => {
    // Keep incoming branch links in sync with this section's tabs and details.
    const onLocationLinkClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[data-location-id]');
      if (link?.getAttribute('href') !== '#' + id) return;
      const locationId = link.dataset.locationId;
      if (locations.some(location => location.id === locationId)) setSelectedId(locationId);
    };
    document.addEventListener('click', onLocationLinkClick);
    return () => document.removeEventListener('click', onLocationLinkClick);
  }, [id, locations]);
  const selected = locations.find(location => location.id === selectedId) || locations[0];
  if (!selected) return null;
  const t = getFullLocationsContent(locale);
  const photo = getLocationPhoto(selected.id, locale);
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
      <div className={s.photo} data-scan="x">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {photo && <img data-location-photo={selected.id} src={photo.src}
          srcSet={`${photo.small} 640w, ${photo.src} ${photo.width}w`}
          sizes="(min-width: 1024px) 720px, 100vw"
          width={photo.width} height={photo.height} loading="lazy" decoding="async"
          style={{ objectPosition: photo.position }} alt={photo.alt} />}
      </div>
    </div>
  </section>;
}
