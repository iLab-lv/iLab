'use client';

import { useMemo } from 'react';
import FullscreenPanel from './FullscreenPanel';
import s from './PierakstiesPanel.module.scss';
import Button from '../../components/button/Button';
import { LOCATIONS } from '@/data/site.config';

export default function PierakstiesPanel({ open, onClose, onSubmit }) {
  // Default date = tomorrow (also enforce min=tomorrow)
  const { defaultDate, minDate } = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const iso = d.toISOString().slice(0, 10); // yyyy-mm-dd
    return { defaultDate: iso, minDate: iso };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(new FormData(e.currentTarget)); // wire later
  };

  return (
    <FullscreenPanel open={open} onClose={onClose} title="Pieraksties uz remontu">
      <form className={s.form} onSubmit={handleSubmit} noValidate>
        <div className={s.row}>
          <div className={s.field}>
            <label htmlFor="name">Vārds</label>
            <input id="name" name="name" type="text" required autoComplete="name" />
          </div>

          <div className={s.field}>
            <label htmlFor="phone">Tālrunis</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="+371 2XXXXXXX"
              required
              autoComplete="tel"
            />
          </div>
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label htmlFor="device">Ierīces tips</label>
            <input
              id="device"
              name="device"
              type="text"
              placeholder="iPhone 13, Samsung S22, u.c."
              required
            />
          </div>

          <div className={s.field}>
            <label htmlFor="date">Datums</label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={defaultDate}
              min={minDate}
              required
            />
          </div>
        </div>

        <div className={s.field}>
          <label htmlFor="fault">Problēma</label>
          <textarea
            id="fault"
            name="fault"
            rows={4}
            placeholder="Īss apraksts (piem., ekrāns saplīsis, baterija tur vāji, neuzlādējas...)"
            required
            maxLength={600}
          />
        </div>

        {/* NEW: branch selector */}
        <fieldset className={s.fieldset} aria-labelledby="locgroup">
          <legend id="locgroup">Filiāle</legend>
          <div className={s.locGrid}>
            {LOCATIONS.map((loc, i) => (
              <label key={loc.id} className={s.radio}>
                <input
                  type="radio"
                  name="location"
                  value={loc.id}
                  defaultChecked={i === 0}
                  required={i === 0}           // makes the group required
                />
                <span>
                  {loc.label}
                  {loc.address ? <small className={s.muted}> — {loc.address}</small> : null}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={s.fieldset} aria-labelledby="timegroup">
          <legend id="timegroup">Vēlamais laiks</legend>
          <div className={s.timeGrid}>
            <label className={s.radio}>
              <input type="radio" name="time" value="8:00-12:00" required />
              <span>8:00 – 12:00</span>
            </label>
            <label className={s.radio}>
              <input type="radio" name="time" value="12:00-16:00" />
              <span>12:00 – 16:00</span>
            </label>
            <label className={s.radio}>
              <input type="radio" name="time" value="16:00-21:00" />
              <span>16:00 – 21:00</span>
            </label>
          </div>
        </fieldset>

        <div className={s.actions}>
          <Button type="submit" variant="primary" size="md" aria-label="Nosūtīt pierakstu">
            Nosūtīt
          </Button>
          <Button type="button" variant="secondary" size="md" onClick={onClose} aria-label="Atcelt">
            Atcelt
          </Button>
        </div>
      </form>
    </FullscreenPanel>
  );
}
