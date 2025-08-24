'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import s from './CtaDock.module.scss';
import LocationPin from './icons/LocationPin';

const LOCATIONS = [
  { id: 'domina', label: 'Domina', wa: 'https://wa.me/37123370088', maps: 'https://www.google.com/maps/place/Ieriķu+iela+3,+Rīga' },
  { id: 'spice',  label: 'Spice',  wa: 'https://wa.me/37120887787', maps: 'https://www.google.com/maps/place/Jaunmoku+iela+13,+Rīga' },
];

export default function CtaDock({ bookHref = '/pieraksties' }) {
  const [locId, setLocId] = useState(LOCATIONS[0].id);
  const [open, setOpen] = useState(false);
  const loc = useMemo(() => LOCATIONS.find(l => l.id === locId) ?? LOCATIONS[0], [locId]);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className={s.dock} aria-label="Galvenās darbības">
      {/* ===== Desktop: TOP-RIGHT cluster (Sazināties + Locator) ===== */}
      <div className={s.topRight} ref={ref}>
        <Link
          href={loc.wa}
          className={`${s.btn} ${s.primary}`}
          aria-label="Sazināties ar mums"
        >
          Sazināties
        </Link>

        <button
          type="button"
          className={`${s.btn} ${s.locator}`}
          aria-expanded={open}
          aria-controls="ctadock-loc-menu"
          onClick={() => setOpen(v => !v)}
          title="Atrast filiāli"
        >
          <LocationPin className={s.svg} aria-hidden="true" />
          {LOCATIONS.find(l => l.id === locId)?.label}
        </button>

        {/* Popover (desktop only) */}
        <div
          id="ctadock-loc-menu"
          className={`${s.menu} ${open ? s.open : ''}`}
          role="menu"
          aria-hidden={!open}
        >
          {LOCATIONS.map(l => (
            <div key={l.id} className={s.row}>
              <button
                type="button"
                className={`${s.opt} ${l.id === locId ? s.active : ''}`}
                onClick={() => { setLocId(l.id); setOpen(false); }}
                role="menuitem"
                aria-pressed={l.id === locId}
              >
                {l.label}
              </button>
              <a href={l.maps} target="_blank" rel="noopener" className={s.maps}>Maps</a>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Desktop: BOTTOM-RIGHT (Pieraksties) ===== */}
      <div className={s.bottomRight}>
        <Link
          href={bookHref}
          className={s.btn}
          aria-label="Pieraksties uz remontu"
        >
          Pieraksties
        </Link>
      </div>

      {/* ===== Mobile: Bottom bar with both CTAs (no locator) ===== */}
      <div className={s.bottomBar} role="region" aria-label="Mobilās darbības josla">
        <Link
          href={loc.wa}
          className={`${s.mBtn} ${s.mPrimary}`}
          aria-label="Sazināties ar mums"
        >
          Sazināties
        </Link>
        <Link
          href={bookHref}
          className={s.mBtn}
          aria-label="Pieraksties uz remontu"
        >
          Pieraksties
        </Link>
      </div>
    </div>
  );
}
