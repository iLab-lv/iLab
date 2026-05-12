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

import LandingButton from '../ui/button/LandingButton';
import { useLandingCta } from '../ui/providers/LandingCtaProvider';

import s from './LandingLocations.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getStrings(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      titleMain: 'Выберите мастерскую в',
      titleAccent: 'Риге',
      subtitle: 'Domina Shopping или Spice Home — звоните, пишите в WhatsApp или сразу открывайте маршрут.',
      open: 'Открыто до {time}',
      closed: 'Закрыто',
      closedUntil: 'Откроется в {time}',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      googleMaps: 'Google Maps',
      waze: 'Waze',
      hours: 'Время работы',
      hideHours: 'Скрыть время',
    };
  }

  return {
    titleMain: 'Izvēlies darbnīcu',
    titleAccent: 'Rīgā',
    subtitle: 'Domina Shopping vai Spice Home — zvani, raksti WhatsApp vai uzreiz atver maršrutu.',
    open: 'Atvērts līdz {time}',
    closed: 'Slēgts',
    closedUntil: 'Atvērsies {time}',
    call: 'Zvanīt',
    whatsapp: 'WhatsApp',
    googleMaps: 'Google Maps',
    waze: 'Waze',
    hours: 'Darba laiks',
    hideHours: 'Paslēpt laiku',
  };
}

function cleanTel(tel = '') {
  return String(tel).replace(/\s+/g, '');
}

function getShortLabel(label = '') {
  const normalized = String(label).toLowerCase();

  if (normalized.includes('domina')) return 'T/C Domina Shopping';
  if (normalized.includes('spice')) return 'T/C Spice Home';

  return label;
}

function getLocationId(location = {}) {
  if (location.id) return location.id;

  const label = String(location.label || '').toLowerCase().trim();

  if (label.includes('domina')) return 'domina';
  if (label.includes('spice')) return 'spice';

  return undefined;
}

function getTelHref(location = {}) {
  const tel = cleanTel(location.tel);

  return tel ? `tel:${tel}` : '#';
}

function getWhatsAppHref(location = {}) {
  if (location.wa) return location.wa;

  const tel = cleanTel(location.tel);
  if (!tel) return '#';

  return `https://wa.me/${tel.replace(/^\+/, '')}`;
}

function getWazeHref(location = {}) {
  if (location.waze) return location.waze;

  if (location.lat && location.lng) {
    return `https://waze.com/ul?ll=${location.lat},${location.lng}&navigate=yes`;
  }

  if (location.geo?.lat && location.geo?.lng) {
    return `https://waze.com/ul?ll=${location.geo.lat},${location.geo.lng}&navigate=yes`;
  }

  const query = encodeURIComponent(
    [location.label, location.address].filter(Boolean).join(', ')
  );

  return query ? `https://waze.com/ul?q=${query}&navigate=yes` : '#';
}

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

  const parts = fmt.formatToParts(d).reduce((acc, p) => {
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

function computeOpenState(location, t) {
  const { date, minutes, weekday } = getRigaNow();

  let today = location?.hours?.[weekday] || location?.hours?.[0];

  if (location?.hoursOverride?.date === date) {
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
      text: t.closed,
    };
  }

  if (minutes >= openM && minutes < closeM) {
    return {
      open: true,
      today,
      text: t.open.replace('{time}', today.closes),
    };
  }

  return {
    open: false,
    today,
    text: t.closedUntil.replace('{time}', today.opens),
  };
}

function LocationCard({ location, locale }) {
  const [hoursOpen, setHoursOpen] = useState(false);
  const t = getStrings(locale);

  const state = useMemo(() => computeOpenState(location, t), [location, t]);

  if (!location) return null;

  const locationId = getLocationId(location);
  const label = getShortLabel(location.label);
  const telHref = location.telLink || getTelHref(location);
  const waHref = getWhatsAppHref(location);
  const mapsHref = location.maps || location.destination || '#';
  const wazeHref = getWazeHref(location);

  return (
    <article id={locationId} className={s.card}>
      <div className={s.cardHeader}>
        <div className={s.titleBlock}>
          <h3 className={s.name}>{label}</h3>

          {location.address && (
            <p className={s.address}>
              <FaLocationDot aria-hidden="true" />
              <span>{location.address}</span>
            </p>
          )}
        </div>

        <div className={s.statusBlock}>
          <span
            className={`${s.badge} ${
              state.open ? s.badgeOpen : s.badgeClosed
            }`}
          >
            <span className={s.badgeDot} aria-hidden="true" />
            {state.text}
          </span>

          {location.hours?.length > 0 && (
            <button
              type="button"
              className={s.hoursToggle}
              onClick={() => setHoursOpen((v) => !v)}
              aria-expanded={hoursOpen}
            >
              <span>{hoursOpen ? t.hideHours : t.hours}</span>

              <FaChevronDown
                className={`${s.chevron} ${hoursOpen ? s.chevronOpen : ''}`}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>

      {location.hours?.length > 0 && hoursOpen && (
        <dl className={s.hoursList}>
          {location.hours.map((h, index) => {
            const isToday = state.today && h.day === state.today.day;

            return (
              <div
                key={`${h.day}-${index}`}
                className={`${s.hoursRow} ${isToday ? s.hoursToday : ''}`}
              >
                <dt>{h.day}</dt>
                <dd>
                  {h.opens} – {h.closes}
                </dd>
              </div>
            );
          })}
        </dl>
      )}

      {location.tel && <p className={s.phone}>{location.tel}</p>}

      <div className={s.actions}>
        <LandingButton
          href={telHref}
          variant="primary"
          tone="accent"
          size="lg"
          block
          leadingIcon={FaPhone}
        >
          {t.call}
        </LandingButton>

        <LandingButton
          href={waHref}
          variant="primary"
          tone="whatsapp"
          size="lg"
          block
          leadingIcon={FaWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.whatsapp}
        </LandingButton>
      </div>

      <div className={s.directions}>
        <a
          className={s.directionLink}
          href={wazeHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWaze aria-hidden="true" />
          {t.waze}
        </a>

        <span className={s.directionSeparator} aria-hidden="true" />

        <a
          className={s.directionLink}
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGooglemaps aria-hidden="true" />
          {t.googleMaps}
        </a>
      </div>
    </article>
  );
}

export default function LandingLocations({
  id = 'locations',
  locale = 'lv',
}) {
  const { locations } = useLandingCta();
  const t = getStrings(locale);

  if (!locations.length) return null;

  return (
    <section id={id} className={s.section}>
      <div className={s.container}>
        <div className={s.header}>
          <h2>
            {t.titleMain}
            <span>{t.titleAccent}</span>
          </h2>
          <p>{t.subtitle}</p>
        </div>

        <div className={s.grid}>
          {locations.map((location) => (
            <LocationCard
              key={location.id || location.label}
              location={location}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}