'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Button from '@components/button/Button';
import { LOCATIONS } from '@/data/site.config';
import s from './BookingForm.module.scss';

/**
 * BookingForm — shared form for panel + page (identical UI).
 *
 * Props:
 * - submitMode: 'fetch' | 'native'  (default 'fetch')
 * - onSuccess: () => void          (optional, called after successful submit)
 * - onError: (msg: string) => void (optional)
 * - onHomeClick: () => void        (optional, called when "Uz sākumlapu" is clicked in success state)
 * - initialValues: { name, phone, device, date, fault, location, time }
 * - enableHoneypot: boolean (default true)
 *
 * Behaviour:
 * - In fetch mode, on successful submit, the form is replaced
 *   with an inline success message. No redirects here.
 */
export default function BookingForm({
  submitMode = 'fetch',
  onSuccess,
  onError,
  onHomeClick,
  initialValues = {},
  enableHoneypot = true,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Default date = tomorrow (also enforce min=tomorrow)
  const { defaultDate, minDate } = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const iso = d.toISOString().slice(0, 10);
    return { defaultDate: iso, minDate: iso };
  }, []);

  async function handleSubmit(e) {
    if (submitMode !== 'fetch') return;
    e.preventDefault();
    if (submitting || success) return;

    try {
      setSubmitting(true);
      const fd = new FormData(e.currentTarget);
      const res = await fetch('/api/booking', { method: 'POST', body: fd });

      if (res.ok) {
        setSuccess(true);
        onSuccess?.();
      } else {
        const data = await res.json().catch(() => null);
        onError?.(data?.error || 'Neizdevās nosūtīt');
      }
    } finally {
      setSubmitting(false);
    }
  }

  const formProps =
    submitMode === 'native'
      ? { action: '/api/booking', method: 'post', noValidate: true }
      : { noValidate: true, onSubmit: handleSubmit };

  // ✅ Success state: replace form with confirmation block
  if (success) {
    const handleHomeClick = (e) => {
      if (onHomeClick) {
        // Panel case: parent handles navigation + closing
        e.preventDefault();
        onHomeClick();
      }
      // Page case: no onHomeClick → normal Next.js Link navigation to "/"
    };

    return (
      <div className={s.success} role="status" aria-live="polite">
        <h2 className={s.successTitle}>Paldies, pieraksts saņemts!</h2>
        <p className={s.successText}>
          Paldies, ka pieteicāt vizīti! Mūsu tehniķi pārbaudīs detaļu pieejamību
          un darba grafiku un tuvākajā laikā sazināsies ar jums, lai apstiprinātu
          pierakstu un precizētu detaļas.
        </p>

        <div className={s.successActions}>
          <Link href="/" className={s.homeLink} onClick={handleHomeClick}>
            Uz sākumlapu
          </Link>
        </div>
      </div>
    );
  }

  // Default: show form
  return (
    <form className={s.form} {...formProps}>
      {/* Honeypot (spam trap) */}
      {enableHoneypot ? (
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px' }}
        />
      ) : null}

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="name">Vārds</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={initialValues.name || ''}
          />
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
            defaultValue={initialValues.phone || ''}
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
            defaultValue={initialValues.device || ''}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="date">Datums</label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initialValues.date || defaultDate}
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
          defaultValue={initialValues.fault || ''}
        />
      </div>

      <fieldset className={s.fieldset} aria-labelledby="locgroup">
        <legend id="locgroup">Filiāle</legend>
        <div className={s.locGrid}>
          {LOCATIONS.map((loc, i) => (
            <label key={loc.id} className={s.radio}>
              <input
                type="radio"
                name="location"
                value={loc.id}
                defaultChecked={
                  initialValues.location
                    ? initialValues.location === loc.id
                    : i === 0
                }
                required={i === 0}
              />
              <span>
                {loc.label}
                {loc.address ? (
                  <small className={s.muted}> — {loc.address}</small>
                ) : null}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={s.fieldset} aria-labelledby="timegroup">
        <legend id="timegroup">Vēlamais laiks</legend>
        <div className={s.timeGrid}>
          {['8:00-12:00', '12:00-16:00', '16:00-21:00'].map((slot) => (
            <label key={slot} className={s.radio}>
              <input
                type="radio"
                name="time"
                value={slot}
                required={slot === '8:00-12:00'}
                defaultChecked={
                  initialValues.time
                    ? initialValues.time === slot
                    : slot === '8:00-12:00'
                }
              />
              <span>{slot.replace('-', ' – ')}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={s.actions}>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={submitting}
          aria-label="Nosūtīt pierakstu"
        >
          {submitting ? 'Sūtām…' : 'Nosūtīt'}
        </Button>
      </div>
    </form>
  );
}
