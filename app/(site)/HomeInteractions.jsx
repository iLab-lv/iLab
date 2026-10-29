'use client';

import { useState } from 'react';
import { useUiDialogs } from './ui/providers/UiDialogsProvider';
import s from './HomePage.module.scss';

export function HomeBookingButton({ children, className = '' }) {
  const { openBooking } = useUiDialogs();
  return <button type="button" className={className} onClick={(event) => openBooking(event.currentTarget)}>{children}</button>;
}

export function HomeLocations({ locale, locations = [], pinPositions = {} }) {
  const [selectedId, setSelectedId] = useState(locations[0]?.id || 'domina');
  const selected = locations.find((location) => location.id === selectedId) || locations[0];
  const labels = locale === 'ru'
    ? { select: 'Выбрать', centre: 'Сервисный центр iLab', call: 'Позвонить', hours: 'Время работы', parking: 'Бесплатная парковка · Удобный доступ в торговом центре' }
    : { select: 'Izvēlēties', centre: 'iLab servisa centrs', call: 'Zvanīt', hours: 'Darba laiks', parking: 'Bezmaksas stāvvieta · Ērta piekļuve tirdzniecības centrā' };

  if (!selected) return null;

  return (
    <div className={s.locationsGrid}>
      <div className={s.map}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/map-riga-branches.png" alt={locale === 'ru' ? 'Карта Риги с филиалами iLab' : 'Rīgas karte ar iLab filiālēm'} />
        {locations.map((location) => {
          const pin = pinPositions[location.id] || {};
          return (
            <button key={location.id} type="button" className={`${s.mapPin} ${location.id === selectedId ? s.selected : ''}`} style={{ '--x': `${pin.xPct ?? 50}%`, '--y': `${pin.yPct ?? 50}%` }} aria-pressed={location.id === selectedId} onClick={() => setSelectedId(location.id)}>
              <i /><span>{location.label}</span>
            </button>
          );
        })}
      </div>
      <div className={s.locationDetail}>
        <div className={s.locationTabs} role="group" aria-label={labels.select}>
          {locations.map((location) => <button key={location.id} type="button" className={location.id === selectedId ? s.selected : ''} aria-pressed={location.id === selectedId} onClick={() => setSelectedId(location.id)}>{location.label}</button>)}
        </div>
        <p className={s.branchHead}><span>0{Math.max(1, locations.indexOf(selected) + 1)}</span><strong>{selected.label}</strong><small>{labels.centre}</small></p>
        <address>{selected.address}</address>
        <p className={s.status}><i />{selected.hours?.[0] ? `${selected.hours[0].opens}–${selected.hours[0].closes}` : labels.hours}</p>
        {selected.tel && <a className={s.phone} href={selected.telLink || `tel:${selected.tel}`}>{selected.tel}</a>}
        <p className={s.branchLinks}>
          {selected.tel && <a href={selected.telLink || `tel:${selected.tel}`}>{labels.call}</a>}
          {selected.wa && <a href={selected.wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
          {selected.maps && <a href={selected.maps} target="_blank" rel="noopener noreferrer">Google Maps</a>}
          {selected.email && <a href={`mailto:${selected.email}`}>{selected.email}</a>}
        </p>
        <p className={s.convenience}>{labels.parking}</p>
      </div>
    </div>
  );
}
