'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import s from './SaziniesCombo.module.scss';

const LOCATIONS = [
  { id: 'domina', label: 'Domina', wa: 'https://wa.me/37123370088', maps: 'https://www.google.com/maps/place/Ieriķu+iela+3,+Rīga' },
  { id: 'spice',  label: 'Spice',  wa: 'https://wa.me/37120887787', maps: 'https://www.google.com/maps/place/Jaunmoku+iela+13,+Rīga' },
];

export default function SaziniesCombo() {
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
    <div className={s.wrap} ref={ref}>
      {/* Primary CTA */}
      <Link
        href={loc.wa}
        className={`${s.cta} ${s.primary}`}
        aria-label="Sazināties ar mums"
      >
        Sazināties
      </Link>

      {/* Inline locator trigger */}
      <button
        type="button"
        className={s.locTrigger}
        aria-expanded={open}
        aria-controls="sazinies-loc-menu"
        onClick={() => setOpen(v => !v)}
        title="Atrast filiāli"
      >
        📍 {LOCATIONS.find(l => l.id === locId)?.label}
      </button>

      {/* Popover menu */}
      <div
        id="sazinies-loc-menu"
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
  );
}
