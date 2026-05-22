'use client';

import { useMemo, useState } from 'react';
import {
  FaChevronDown,
  FaLocationDot,
  FaPhone,
  FaWhatsapp,
  FaWaze,
} from 'react-icons/fa6';
import { SiGooglemaps } from 'react-icons/si';

import { getLocationsContent } from './locations.i18n';
import s from './LocationCard.module.scss';

function cleanTel(tel = '') {
  return String(tel).replace(/\s+/g, '');
}

function getLocationId(location = {}) {
  return location.id ? `loc-card-${location.id}` : undefined;
}

function getTelHref(location = {}) {
  if (location.telLink) return location.telLink;

  const tel = cleanTel(location.tel);
  return tel ? `tel:${tel}` : undefined;
}

function getWhatsAppHref(location = {}) {
  if (location.wa) return location.wa;

  const tel = cleanTel(location.tel);
  if (!tel) return undefined;

  return `https://wa.me/${tel.replace(/^\+/, '')}`;
}

function getMapsHref(location = {}) {
  return location.maps || location.mapUrl || undefined;
}

function getRouteHref(location = {}) {
  return location.destination || location.routeUrl || location.maps || undefined;
}

function getWazeHref(location = {}) {
  if (location.waze) return location.waze;

  const lat = location.geo?.lat ?? location.lat;
  const lng = location.geo?.lng ?? location.lng;

  if (typeof lat === 'number' && typeof lng === 'number') {
    return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  }

  const query = encodeURIComponent(
    [location.label, location.address].filter(Boolean).join(', ')
  );

  return query ? `https://waze.com/ul?q=${query}&navigate=yes` : undefined;
}

function parseHM(hm) {
  if (!hm) return null;

  const [h, m] = String(hm).split(':').map(Number);

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
    .reduce((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});

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
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10),
    weekday: weekdayMap[parts.weekday] ?? 0,
  };
}

function computeOpenState(location = {}, t) {
  const { date, minutes, weekday } = getRigaNow();
  const hoursArr = Array.isArray(location.hours) ? location.hours : [];

  let today = hoursArr[weekday] || hoursArr[0];

  if (location.hoursOverride?.date === date) {
    today = {
      ...today,
      opens: location.hoursOverride.opens || today?.opens,
      closes: location.hoursOverride.closes || today?.closes,
    };
  }

  const openM = parseHM(today?.opens);
  const closeM = parseHM(today?.closes);

  if (openM == null || closeM == null) {
    return {
      open: false,
      today,
      badgeText: t.closed,
    };
  }

  if (minutes >= openM && minutes < closeM) {
    return {
      open: true,
      today,
      badgeText:
        typeof t.openUntil === 'function'
          ? t.openUntil(today.closes)
          : t.open?.replace?.('{time}', today.closes) || today.closes,
    };
  }

  return {
    open: false,
    today,
    badgeText:
      typeof t.closedUntil === 'function'
        ? t.closedUntil(today.opens)
        : t.closedUntil?.replace?.('{time}', today.opens) || t.closed,
  };
}

function getHoursRowValues(row, isToday, location) {
  if (!isToday || !location.hoursOverride) {
    return {
      opens: row.opens,
      closes: row.closes,
    };
  }

  return {
    opens: location.hoursOverride.opens || row.opens,
    closes: location.hoursOverride.closes || row.closes,
  };
}

function LocationAction({
  href,
  children,
  icon: Icon,
  variant = 'primary',
  external = false,
  ariaLabel,
}) {
  if (!href) return null;

  return (
    <a
      className={`${s.actionButton} ${
        variant === 'secondary' ? s.actionSecondary : s.actionPrimary
      }`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
    >
      {Icon ? <Icon aria-hidden="true" /> : null}
      <span>{children}</span>
    </a>
  );
}

export default function LocationCard({
  location,
  variant = 'simplified',
  highlighted = false,
  showActions = false,
  className = '',
  locale = 'lv',
  content,
}) {
  const [hoursOpen, setHoursOpen] = useState(variant === 'full');
  const t = content || getLocationsContent(locale);

  const state = useMemo(
    () => computeOpenState(location, t),
    [location, t]
  );

  if (!location) return null;

  const cardId = getLocationId(location);
  const label = location.shortLabel || location.label;
  const hasHours = Array.isArray(location.hours) && location.hours.length > 0;

  const telHref = getTelHref(location);
  const whatsappHref = getWhatsAppHref(location);
  const mapsHref = getMapsHref(location);
  const routeHref = getRouteHref(location);
  const wazeHref = getWazeHref(location);

  const isFull = variant === 'full';
  const shouldShowActions = showActions || isFull;

  return (
    <article
      id={cardId}
      className={`${s.card} ${isFull ? s.full : s.simplified} ${
        highlighted ? s.highlighted : ''
      } ${className}`}
    >
      <div className={s.cardHeader}>
        <div className={s.titleBlock}>
          {label ? <h3 className={s.name}>{label}</h3> : null}

          {location.address ? (
            <p className={s.address}>
              <FaLocationDot aria-hidden="true" />
              <span>{location.address}</span>
            </p>
          ) : null}
        </div>

        <div className={s.statusBlock}>
          <span
            className={`${s.badge} ${
              state.open ? s.badgeOpen : s.badgeClosed
            }`}
          >
            <span className={s.badgeDot} aria-hidden="true" />
            {state.badgeText}
          </span>

          {hasHours ? (
            <button
              type="button"
              className={s.hoursToggle}
              onClick={() => setHoursOpen((v) => !v)}
              aria-expanded={hoursOpen}
            >
              <span>{hoursOpen ? t.hideHours || t.hideHoursLabel || t.hours : t.hours}</span>

              <FaChevronDown
                className={`${s.chevron} ${hoursOpen ? s.chevronOpen : ''}`}
                aria-hidden="true"
              />
            </button>
          ) : null}
        </div>
      </div>

      {hasHours && hoursOpen ? (
        <dl className={s.hoursList} aria-label={t.hoursAriaLabel || t.hours}>
          {location.hours.map((row, index) => {
            const isToday = state.today && row.day === state.today.day;
            const { opens, closes } = getHoursRowValues(row, isToday, location);

            return (
              <div
                key={`${row.day || index}-${index}`}
                className={`${s.hoursRow} ${isToday ? s.hoursToday : ''}`}
              >
                <dt>{row.day}</dt>
                <dd>
                  {opens} – {closes}
                </dd>
              </div>
            );
          })}
        </dl>
      ) : null}

      {location.specialNotice ? (
        <p className={s.specialNote} role="status">
          {location.specialNotice}
        </p>
      ) : null}

      {location.tel ? (
        <p className={s.phone}>{location.tel}</p>
      ) : null}

      {location.email && isFull ? (
        <p className={s.email}>
          <a href={`mailto:${location.email}`}>
            {location.email}
          </a>
        </p>
      ) : null}

      {shouldShowActions ? (
        <div className={s.actions}>
          <LocationAction
            href={telHref}
            icon={FaPhone}
            variant="primary"
            ariaLabel={
              typeof t.callAriaLabel === 'function'
                ? t.callAriaLabel(label)
                : t.call
            }
          >
            {t.call}
          </LocationAction>

          <LocationAction
            href={whatsappHref}
            icon={FaWhatsapp}
            variant="secondary"
            external
            ariaLabel={
              typeof t.whatsappAriaLabel === 'function'
                ? t.whatsappAriaLabel(label)
                : t.whatsapp
            }
          >
            {t.whatsapp}
          </LocationAction>
        </div>
      ) : null}

      <div className={s.directions}>
        {wazeHref ? (
          <a
            className={s.directionLink}
            href={wazeHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWaze aria-hidden="true" />
            <span>{t.waze || 'Waze'}</span>
          </a>
        ) : null}

        {wazeHref && mapsHref ? (
          <span className={s.directionSeparator} aria-hidden="true" />
        ) : null}

        {mapsHref ? (
          <a
            className={s.directionLink}
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGooglemaps aria-hidden="true" />
            <span>{t.viewGoogleMaps || t.googleMaps || t.directions}</span>
          </a>
        ) : null}

        {!mapsHref && routeHref ? (
          <a
            className={s.directionLink}
            href={routeHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGooglemaps aria-hidden="true" />
            <span>{t.routes || t.directions}</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}