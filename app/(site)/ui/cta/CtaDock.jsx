'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import s from './CtaDock.module.scss';
import Button from '../../components/button/Button';
import LocationPin from '../../components/icons/LocationPin';

const LOCATIONS = [
  { id: 'domina', label: 'Domina', wa: 'https://wa.me/37123370088', maps: 'https://www.google.com/maps/place/Ieriķu+iela+3,+Rīga' },
  { id: 'spice',  label: 'Spice',  wa: 'https://wa.me/37120887787', maps: 'https://www.google.com/maps/place/Jaunmoku+iela+13,+Rīga' },
];

export default function CtaDock({ bookHref = '/pieraksties' }) {
  const [locId, setLocId] = useState(LOCATIONS[0].id);
  const [open, setOpen] = useState(false);
  const loc = useMemo(() => LOCATIONS.find(l => l.id === locId) ?? LOCATIONS[0], [locId]);
  const ref = useRef(null);

  // close locator popover on outside click
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
        

        <Button
          variant="ghost"
          size="md"
          leadingIcon={LocationPin}
          aria-expanded={open}
          aria-controls="ctadock-loc-menu"
          onClick={() => setOpen(v => !v)}
          title="Atrast filiāli"
        >
          {loc.label}
        </Button>

        <Button
          variant="primary"
          size="md"
          href={loc.wa}
          aria-label="Sazināties ar mums"
        >
          Sazināties
        </Button>

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
        <Button
          variant="secondary"
          size="md"
          href={bookHref}
          aria-label="Pieraksties uz remontu"
        >
          Pieraksties
        </Button>
      </div>

      {/* ===== Mobile: Bottom bar with both CTAs (no locator) ===== */}
      <div className={s.bottomBar} role="region" aria-label="Mobilās darbības josla">
        <Button
          variant="primary"
          size="lg"
          block
          href={loc.wa}
          aria-label="Sazināties ar mums"
        >
          Sazināties
        </Button>

        <Button
          variant="secondary"
          size="lg"
          block
          href={bookHref}
          aria-label="Pieraksties uz remontu"
        >
          Pieraksties
        </Button>
      </div>
    </div>
  );
}
