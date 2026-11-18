'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ContactActions, { ContactDirections } from '../_components/sections/contact-actions/ContactActions';
import { getFullLocationsContent, getLocationPhoto } from '../_components/sections/full-locations/fullLocations.content';
import { getAvailability, locationLinks } from '../_components/sections/full-locations/locationState';
import useLocationClock from '../_components/sections/full-locations/useLocationClock';
import { clampMapView, focusMapBranch, getMapPins } from './adsV3Locations.model';
import h from '../(site)/HomePage.module.scss';
import s from './AdsV3Locations.module.scss';

const mapUi = {
  lv: { help: 'Velc, lai pārvietotu karti. Ar tastatūru: bulttaustiņi, +, − un Home.' },
  ru: { help: 'Перетаскивайте карту. На клавиатуре: стрелки, +, − и Home.' },
};

function BranchMap({ locale, locations, pinPositions, selectedId, onSelect }) {
  const t = getFullLocationsContent(locale), ui = mapUi[locale];
  const pins = useMemo(() => getMapPins(locations, pinPositions), [locations, pinPositions]);
  const viewport = useRef(null), drag = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [view, setView] = useState({ x: .5, y: .5, zoom: 1 });
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);
  const focus = useCallback(id => setView(previous => focusMapBranch(pins, id, size, previous.zoom)), [pins, size]);
  useEffect(() => { focus(selectedId); }, [selectedId, focus]);
  useEffect(() => {
    const map = viewport.current;
    const wheel = event => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      setView(previous => clampMapView({ ...previous, zoom: previous.zoom + (event.deltaY < 0 ? .1 : -.1) }, size));
    };
    map.addEventListener('wheel', wheel, { passive: false });
    return () => map.removeEventListener('wheel', wheel);
  }, [size]);
  useEffect(() => {
    const incoming = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[data-ads-v3-branch][href="#locations"]');
      if (link && pins.some(pin => pin.id === link.dataset.adsV3Branch)) focus(link.dataset.adsV3Branch);
    };
    document.addEventListener('click', incoming);
    return () => document.removeEventListener('click', incoming);
  }, [focus, pins]);
  function zoomBy(amount) { setView(previous => clampMapView({ ...previous, zoom: previous.zoom + amount }, size)); }
  function pan(dx, dy) { setView(previous => clampMapView({ ...previous, x: previous.x - dx / (size.width * previous.zoom), y: previous.y - dy / (size.width * previous.zoom) }, size)); }
  function onKeyDown(event) {
    if (event.target !== event.currentTarget) return;
    if (['+', '=', '-', 'Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault();
    if (event.key === '+' || event.key === '=') zoomBy(.25);
    if (event.key === '-') zoomBy(-.25);
    if (event.key === 'Home') setView(focusMapBranch(pins, selectedId, size));
    if (event.key === 'ArrowLeft') pan(50, 0);
    if (event.key === 'ArrowRight') pan(-50, 0);
    if (event.key === 'ArrowUp') pan(0, 50);
    if (event.key === 'ArrowDown') pan(0, -50);
  }
  function pointerDown(event) {
    if (event.button !== 0 || event.target.closest('button')) return;
    drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, view };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }
  function pointerMove(event) {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    const start = drag.current;
    setView(clampMapView({ ...start.view, x: start.view.x - (event.clientX - start.x) / (size.width * start.view.zoom), y: start.view.y - (event.clientY - start.y) / (size.width * start.view.zoom) }, size));
  }
  const stopDrag = () => { drag.current = null; setDragging(false); };
  return <div className={s.mapWrap}>
    <div ref={viewport} className={s.map} role="region" aria-label={t.mapAlt} aria-describedby="ads-v3-map-help" tabIndex={0}
      data-location-map data-zoom={view.zoom} data-center-x={view.x} data-center-y={view.y} data-dragging={dragging}
      style={{ touchAction: view.zoom > 1 ? 'none' : 'pan-y' }}
      onKeyDown={onKeyDown} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag}
      onDoubleClick={event => { if (!event.target.closest('button')) zoomBy(.25); }}>
      <div className={s.mapPlane} data-map-plane style={{ left: `calc(50% + ${(.5 - view.x) * size.width * view.zoom}px)`, top: `calc(50% + ${(.5 - view.y) * size.width * view.zoom}px)`, transform: `translate(-50%, -50%) scale(${view.zoom})`, '--pin-inverse-zoom': 1 / view.zoom }}>
        {/* Image-space percentages, following the existing locator's square stage. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-map-image src="/images/home/map-riga-branches.png" width={3000} height={3000} loading="lazy" decoding="async" alt={t.mapAlt} draggable={false} />
        {pins.map(pin => <button type="button" key={pin.id} className={`${h.mapPin} ${s.marker}${selectedId === pin.id ? ` ${h.selected}` : ''}`} data-location-pin={pin.id} data-label-side={pin.x > .5 ? 'left' : 'right'}
          style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }} aria-label={`${t.select}: ${pin.label}`} aria-pressed={selectedId === pin.id} aria-controls="ads-v3-location-panel"
          onClick={() => {
            onSelect(pin.id); focus(pin.id);
            requestAnimationFrame(() => {
              const details = document.getElementById('ads-v3-branch-name');
              details?.focus({ preventScroll: true });
              details?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
            });
          }}><i aria-hidden="true" /><span>{pin.label}</span></button>)}
      </div>
    </div>
    <p className={s.srOnly} id="ads-v3-map-help">{ui.help}</p>
  </div>;
}

export default function AdsV3LocationPanel({ locale, locations, defaultHours, pinPositions, selectedLocationId, onSelectLocation }) {
  const t = getFullLocationsContent(locale), now = useLocationClock();
  const selected = locations.find(location => location.id === selectedLocationId) || locations[0];
  if (!selected) return null;
  const state = getAvailability(selected, defaultHours, now, locale), links = locationLinks(selected);
  const weekdays = locale === 'ru' ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] : ['P', 'O', 'T', 'C', 'Pk', 'S', 'Sv'];
  return <div className={s.locations}>
    <BranchMap locale={locale} locations={locations} pinPositions={pinPositions} selectedId={selected.id} onSelect={onSelectLocation} />
    <div className={s.surface}>
      <div className={s.selector} role="group" aria-label={t.select}>{locations.map(location => <button type="button" key={location.id} aria-pressed={location.id === selected.id} aria-controls="ads-v3-location-panel" onClick={() => onSelectLocation(location.id)}><i aria-hidden="true" />{location.label}</button>)}</div>
      <div className={s.panel} id="ads-v3-location-panel">
        <figure className={s.photo} aria-label={selected.label}>
          {locations.map(location => {
            const photo = getLocationPhoto(location.id, locale), active = location.id === selected.id;
            if (!photo) return null;
            return <div key={location.id} className={s.photoLayer} data-active={active} aria-hidden={!active}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-location-photo={active ? location.id : undefined} src={photo.src} srcSet={`${photo.small} 640w, ${photo.src} ${photo.width}w`} sizes="(min-width: 1024px) 600px, 100vw" width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={active ? photo.alt : ''} style={{ objectPosition: photo.position, objectFit: location.id === 'spice' ? 'contain' : 'cover' }} />
            </div>;
          })}
          <figcaption className={s.srOnly}>{selected.label}</figcaption>
        </figure>
        <article className={s.details} aria-labelledby="ads-v3-branch-name" data-location-id={selected.id}>
          <h3 id="ads-v3-branch-name" tabIndex={-1}>{selected.label}</h3>
          <address>{selected.address}</address>
          <details className={s.hours} key={selected.id}><summary><span className={s.status}><i data-open={state.open} aria-hidden="true" />{state.text}</span><span>{t.hours} <span aria-hidden="true">+</span></span></summary><table aria-label={t.hoursAriaLabel}><tbody>{state.hours?.map((row, index) => {
            const hours = index === state.today ? { ...row, ...(state.override || {}) } : row;
            return <tr key={index}><th scope="row">{weekdays[index] || row.day}</th><td>{hours.closed ? t.closed : [hours.opens, hours.closes].filter(Boolean).join('–')}</td></tr>;
          })}</tbody></table></details>
          {links.tel && <a className={s.phone} href={links.tel}>{selected.tel}</a>}
          <ContactActions location={selected} locale={locale} />
          <ContactDirections location={selected} locale={locale} />
          {selected.specialNotice && <p className={s.notice}>{selected.specialNotice}</p>}
        </article>
      </div>
    </div>
  </div>;
}
