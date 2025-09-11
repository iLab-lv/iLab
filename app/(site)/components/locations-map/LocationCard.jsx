'use client';

import { useMemo, useState } from 'react';
import s from './LocationCard.module.scss';

/**
 * LocationCard (Variant A, controlled "Darba laiks" without today's hours)
 * - Header: Title (left) + "Norādes →" (right)
 * - Address link (opens directions)
 * - Actions: Zvanīt + WhatsApp
 * - Darba laiks: controlled disclosure with chevron (no "Šodien ..." text)
 */
export default function LocationCard({
  id,
  title,
  address,
  tel,             // e.g., 'tel:23370088'
  whatsapp,        // e.g., '37123370088' (intl digits preferred)
  gmaps,           // fallback directions when no lat/lng
  lat,
  lng,
  directionsUrl,   // optional explicit URL
  hours            // array|string|object
}) {
  // --- URL helpers ---
  const digitsOnly = (s = '') => (s.match(/\d+/g) || []).join('');

  const waUrl = useMemo(() => {
    if (whatsapp) return `https://wa.me/${digitsOnly(whatsapp)}`;
    if (!tel) return null;
    const telRaw = (tel || '').replace(/^tel:/, '');
    const num = digitsOnly(telRaw);
    return num ? `https://wa.me/${num}` : null;
  }, [whatsapp, tel]);

  const dirUrl = useMemo(() => {
    if (directionsUrl) return directionsUrl;
    const label = encodeURIComponent(title || '');
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_name=${label}`;
    }
    return gmaps || null;
  }, [directionsUrl, title, lat, lng, gmaps]);

  // --- Hours list rendering ---
  const hoursList = useMemo(() => {
    if (!hours) return null;
    if (Array.isArray(hours)) return hours.map((line, i) => <li key={i}>{line}</li>);
    if (typeof hours === 'object') {
      return Object.entries(hours).map(([k, v]) => (
        <li key={k}><strong>{k}:</strong> {v}</li>
      ));
    }
    return <li>{String(hours)}</li>;
  }, [hours]);

  // Controlled disclosure state
  const [open, setOpen] = useState(false);

  return (
    <article className={s.card} role="listitem" aria-labelledby={`${id}-title`}>
      <header className={s.header}>
        <h3 id={`${id}-title`} className={s.title}>{title}</h3>
        {dirUrl && (
          <a className={s.directions} href={dirUrl} target="_blank" rel="noopener noreferrer">
            Norādes →
          </a>
        )}
      </header>

      {dirUrl ? (
        <a className={s.address} href={dirUrl} target="_blank" rel="noopener noreferrer">
          {address}
        </a>
      ) : (
        <p className={s.addressText}>{address}</p>
      )}

      <div className={s.actions}>
        {tel && (
          <a className={`${s.btn} ${s.primary}`} href={tel} aria-label={`Zvanīt – ${title}`}>
            Zvanīt
          </a>
        )}
        {waUrl && (
          <a className={s.btn} href={waUrl} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp – ${title}`}>
            WhatsApp
          </a>
        )}
      </div>

      {hours && (
        <div className={s.hours}>
          <button
            type="button"
            className={s.hoursSummary}
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen(v => !v)}
          >
            <span>Darba laiks</span>
            <span className={s.chev} aria-hidden="true">▾</span>
          </button>

          {open && (
            <ul className={s.hoursList}>
              {hoursList}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
