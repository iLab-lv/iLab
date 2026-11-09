'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useUiDialogs } from './ui/providers/UiDialogsProvider';
import { getLocationsContent } from './sections/locations/locations.i18n';
import s from './HomePage.module.scss';
import Button from './components/button/Button';
export function HomeBookingButton({
  children,
  className = '',
  variant = 'primary'
}) {
  const {
    openBook
  } = useUiDialogs();
  return <Button type="button" variant={variant} className={className} onClick={event => openBook(event.currentTarget)}>
    {children}
  </Button>;
}
export function HomeStars({
  rating,
  large = false
}) {
  if (!Number.isFinite(rating)) return null;
  return <span
    className={s.stars + (large ? ' ' + s.starsLarge : '')}
    role="img"
    aria-label={rating + ' / 5'}
  >
    {Array.from({
      length: 5
    }, (_, index) => <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      key={index}
      style={{
        opacity: index < Math.round(rating) ? 1 : .25
      }}
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>)}
  </span>;
}
export function HomeReview({
  review,
  locale
}) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const text = useRef(null);
  const id = useId();
  useEffect(() => {
    const element = text.current;
    if (!element) return;
    const measure = () => {
      if (!expanded) setCanExpand(element.scrollHeight > element.clientHeight + 1);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, [expanded, review.text]);
  return <blockquote className={s.review} data-home-review>
    <p className={s.reviewText + (expanded ? ' ' + s.reviewExpanded : '')} id={id} ref={text}>
      {String(review.text || '').split(/(\s+)/).map((part, index) => /^\s+$/.test(part) ? part : <span data-review-word key={index}>{part}</span>)}
    </p>
    <footer className={s.reviewMeta}>
      <b>
        {review.author}
      </b>
      {Number.isFinite(review.rating) && <HomeStars rating={review.rating} />}
      {review.date && <span className={s.tech}>
        {review.date}
      </span>}
      {canExpand && <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded(value => !value)}
      >
        {expanded ? locale === 'ru' ? 'Свернуть' : 'Rādīt mazāk' : locale === 'ru' ? 'Читать полностью' : 'Lasīt vairāk'}
      </button>}
    </footer>
  </blockquote>;
}

// The existing LocationCard/SazinatiesPanel Riga-time algorithm, scoped to the homepage.
function useRigaClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
function minutes(value) {
  if (!value) return null;
  const [hour, minute] = String(value).split(':').map(Number);
  return Number.isFinite(hour) && Number.isFinite(minute) ? hour * 60 + minute : null;
}
function getAvailability(location, fallbackHours, now, locale) {
  const t = getLocationsContent(locale);
  const hours = location.hours?.length ? location.hours : fallbackHours;
  if (!now) return {
    open: false,
    text: t.hours,
    hours,
    today: -1
  };
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Riga',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short'
  }).formatToParts(now).reduce((result, part) => ({
    ...result,
    [part.type]: part.value
  }), {});
  const weekday = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6
  }[parts.weekday] ?? 0;
  const date = parts.year + '-' + parts.month + '-' + parts.day;
  const override = location.hoursOverride?.date === date ? location.hoursOverride : null;
  const today = {
    ...hours?.[weekday],
    ...(override || {})
  };
  const open = minutes(today.opens),
    close = minutes(today.closes);
  const current = Number(parts.hour) * 60 + Number(parts.minute);
  if (today.closed !== true && open != null && close != null && current >= open && current < close) return {
    open: true,
    text: t.openUntil(today.closes),
    hours,
    today: weekday,
    override
  };
  if (today.closed !== true && open != null && current < open) return {
    open: false,
    text: t.closedUntil(today.opens),
    hours,
    today: weekday,
    override
  };
  for (let offset = 1; offset <= 7; offset++) {
    const next = hours?.[(weekday + offset) % 7];
    if (next?.closed !== true && minutes(next?.opens) != null) {
      const nextDay = offset === 1 ? locale === 'ru' ? 'завтра' : 'rīt' : new Intl.DateTimeFormat(locale === 'ru' ? 'ru-LV' : 'lv-LV', {
        weekday: 'long',
        timeZone: 'Europe/Riga'
      }).format(new Date(now.getTime() + offset * 86400000));
      return {
        open: false,
        text: locale === 'ru' ? 'Закрыто · откроемся ' + nextDay + ' ' + next.opens : 'Slēgts · atveram ' + nextDay + ' ' + next.opens,
        hours,
        today: weekday,
        override
      };
    }
  }
  return {
    open: false,
    text: t.closed,
    hours,
    today: weekday,
    override
  };
}
function Status({
  state
}) {
  return <p className={s.status}>
    <i className={state.open ? s.isOpen : ''} aria-hidden="true" />
    <span>
      {state.text}
    </span>
  </p>;
}
function locationLinks(location) {
  const tel = location.telLink || (location.tel ? 'tel:' + location.tel.replace(/\s+/g, '') : null);
  const wa = location.wa || (location.tel ? 'https://wa.me/' + location.tel.replace(/\D/g, '') : null);
  const lat = location.geo?.lat ?? location.lat,
    lng = location.geo?.lng ?? location.lng;
  const query = encodeURIComponent([location.label, location.address].filter(Boolean).join(', '));
  const waze = location.waze || (typeof lat === 'number' && typeof lng === 'number' ? 'https://waze.com/ul?ll=' + lat + ',' + lng + '&navigate=yes' : query ? 'https://waze.com/ul?q=' + query + '&navigate=yes' : null);
  return {
    tel,
    wa,
    waze,
    maps: location.maps || location.mapUrl
  };
}
function BranchHead({
  location,
  index,
  locale
}) {
  const lat = location.geo?.lat ?? location.lat,
    lng = location.geo?.lng ?? location.lng;
  return <p className={s.branchHead}>
    <span>
      {String(index + 1).padStart(2, '0')}
    </span>
    <strong>
      {location.label}
    </strong>
    <small>
      {locale === 'ru' ? 'Сервисный центр iLab' : 'iLab servisa centrs'}
    </small>
    {typeof lat === 'number' && typeof lng === 'number' && <small>{Math.abs(lat).toFixed(4)}° {lat >= 0 ? 'N' : 'S'} · {Math.abs(lng).toFixed(4)}° {lng >= 0 ? 'E' : 'W'}</small>}
  </p>;
}
function BranchLinks({
  location,
  locale,
  includeEmail = false
}) {
  const links = locationLinks(location),
    t = getLocationsContent(locale);
  return <p className={s.branchLinks}>
    {links.tel && <a href={links.tel}>
      {t.call}
    </a>}
    {links.wa && <a href={links.wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
    {links.waze && <a href={links.waze} target="_blank" rel="noopener noreferrer">Waze</a>}
    {links.maps && <a href={links.maps} target="_blank" rel="noopener noreferrer">Google Maps</a>}
    {includeEmail && location.email && <a href={'mailto:' + location.email}>
      {location.email}
    </a>}
  </p>;
}
function Hours({
  state,
  locale
}) {
  const t = getLocationsContent(locale);
  const weekdays = locale === 'ru' ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'] : ['Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena', 'Svētdiena'];
  return <details className={s.hours}>
    <summary>
      {t.hours}
    </summary>
    <table aria-label={t.hoursAriaLabel}>
      <tbody>
        {state.hours?.map((row, index) => {
          const value = index === state.today ? {
            ...row,
            ...(state.override || {})
          } : row;
          return <tr key={row.day || index}>
            <th scope="row">
              {weekdays[index] || row.day}
            </th>
            <td>
              {value.closed ? t.closed : [value.opens, value.closes].filter(Boolean).join('–')}
            </td>
          </tr>;
        })}
      </tbody>
    </table>
  </details>;
}
export function HomeBranchStrip({
  locale,
  locations = [],
  defaultHours = []
}) {
  const now = useRigaClock();
  const {
    openContact
  } = useUiDialogs();
  const t = getLocationsContent(locale);
  return <div className={s.strip}>
    {locations.map((location, index) => {
      const state = getAvailability(location, defaultHours, now, locale);
      return <article key={location.id}>
        <BranchHead location={location} index={index} locale={locale} />
        <Status state={state} />
        <p className={s.stripRow}>
          {location.tel && <a className={s.phone} href={locationLinks(location).tel}>
            {location.tel}
          </a>}
          <span>
            {location.address}
          </span>
        </p>
        <div className={s.branchQuick}>
          <BranchLinks location={location} locale={locale} />
          <button
            className={s.branchHours}
            type="button"
            onClick={event => openContact(event.currentTarget, location.id)}
          >
            {t.hours}
          </button>
        </div>
      </article>;
    })}
  </div>;
}
export function HomeLocations({
  locale,
  locations = [],
  pinPositions = {},
  defaultHours = [],
  selectedLocationId,
  onSelectLocation
}) {
  const [localSelectedId, setLocalSelectedId] = useState(locations[0]?.id || 'domina');
  const selectedId = selectedLocationId || localSelectedId;
  const selectLocation = id => { setLocalSelectedId(id); onSelectLocation?.(id); };
  const selected = locations.find(location => location.id === selectedId) || locations[0];
  const now = useRigaClock();
  const labels = locale === 'ru' ? {
    select: 'Выбрать сервисный центр',
    parking: 'Бесплатная парковка · Удобный доступ в торговом центре'
  } : {
    select: 'Izvēlēties servisa centru',
    parking: 'Bezmaksas stāvvieta · Ērta piekļuve tirdzniecības centrā'
  };
  if (!selected) return null;
  const state = getAvailability(selected, defaultHours, now, locale);
  return <div className={s.locationsGrid}>
    <div className={s.map} data-scan="x">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/map-riga-branches.png"
        width="3000"
        height="3000"
        loading="lazy"
        decoding="async"
        alt={locale === 'ru' ? 'Карта Риги с филиалами iLab' : 'Rīgas karte ar iLab filiālēm'}
      />
      {locations.map(location => {
        const pin = pinPositions[location.id] || {};
        return <button
          key={location.id}
          type="button"
          className={s.mapPin + (location.id === selected.id ? ' ' + s.selected : '')}
          style={{
            '--x': (pin.xPct ?? 50) + '%',
            '--y': (pin.yPct ?? 50) + '%'
          }}
          aria-label={labels.select + ': ' + location.label}
          aria-pressed={location.id === selected.id}
          onClick={() => selectLocation(location.id)}
        >
          <i />
          <span>
            {location.label}
          </span>
        </button>;
      })}
    </div>
    <div className={s.locationDetail}>
      <div className={s.locationTabs} role="group" aria-label={labels.select}>
        {locations.map(location => <button
          key={location.id}
          type="button"
          className={location.id === selected.id ? s.selected : ''}
          aria-pressed={location.id === selected.id}
          onClick={() => selectLocation(location.id)}
        >
          {location.label}
        </button>)}
      </div>
      <article className={s.locationBranch}>
        <BranchHead location={selected} index={locations.indexOf(selected)} locale={locale} />
        <address>
          {selected.address}
        </address>
        <div className={s.availability}>
          <Status state={state} />
          <Hours state={state} locale={locale} />
        </div>
        {selected.tel && <a className={s.phone} href={locationLinks(selected).tel}>
          {selected.tel}
        </a>}
        <BranchLinks location={selected} locale={locale} includeEmail />
      </article>
      <p className={s.convenience}>
        {labels.parking}
      </p>
    </div>
  </div>;
}
