'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Button from '@components/button/Button';
import s from './BookingForm.module.scss';
import { getBookingFormContent } from './bookingForm.i18n';

export default function BookingForm({
  locale = 'lv',
  locations = [],
  submitMode = 'fetch',
  onSuccess,
  onError,
  onHomeClick,
  initialValues = {},
  enableHoneypot = true,
}) {
  const t = getBookingFormContent(locale);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { defaultDate, minDate } = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const iso = d.toISOString().slice(0, 10);

    return {
      defaultDate: iso,
      minDate: iso,
    };
  }, []);

  async function handleSubmit(e) {
    if (submitMode !== 'fetch') return;

    e.preventDefault();

    if (submitting || success) return;

    try {
      setSubmitting(true);

      const fd = new FormData(e.currentTarget);
      const res = await fetch('/api/booking', {
        method: 'POST',
        body: fd,
      });

      if (res.ok) {
        setSuccess(true);
        onSuccess?.();
      } else {
        const data = await res.json().catch(() => null);
        onError?.(data?.error || t.submitError);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const formProps =
    submitMode === 'native'
      ? {
          action: '/api/booking',
          method: 'post',
          noValidate: true,
        }
      : {
          noValidate: true,
          onSubmit: handleSubmit,
        };

  if (success) {
    const handleHomeClick = (e) => {
      if (onHomeClick) {
        e.preventDefault();
        onHomeClick();
      }
    };

    return (
      <div className={s.success} role="status" aria-live="polite">
        <h2 className={s.successTitle}>{t.successTitle}</h2>

        <p className={s.successText}>{t.successText}</p>

        <div className={s.successActions}>
          <Link
            href={locale === 'ru' ? '/ru' : '/'}
            className={s.homeLink}
            onClick={handleHomeClick}
          >
            {t.homeLink}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} {...formProps}>
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
          <label htmlFor="name">{t.nameLabel}</label>
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
          <label htmlFor="phone">{t.phoneLabel}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder={t.phonePlaceholder}
            required
            autoComplete="tel"
            defaultValue={initialValues.phone || ''}
          />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="device">{t.deviceLabel}</label>
          <input
            id="device"
            name="device"
            type="text"
            placeholder={t.devicePlaceholder}
            required
            defaultValue={initialValues.device || ''}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="date">{t.dateLabel}</label>
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
        <label htmlFor="fault">{t.faultLabel}</label>
        <textarea
          id="fault"
          name="fault"
          rows={4}
          placeholder={t.faultPlaceholder}
          required
          maxLength={600}
          defaultValue={initialValues.fault || ''}
        />
      </div>

      <fieldset className={s.fieldset} aria-labelledby="locgroup">
        <legend id="locgroup">{t.locationLegend}</legend>

        <div className={s.locGrid}>
          {locations.map((loc, i) => (
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
                  <small className={s.muted}> - {loc.address}</small>
                ) : null}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={s.fieldset} aria-labelledby="timegroup">
        <legend id="timegroup">{t.timeLegend}</legend>

        <div className={s.timeGrid}>
          {['10:00-13:00', '13:00-17:00', '17:00-21:00'].map((slot, index) => (
            <label key={slot} className={s.radio}>
              <input
                type="radio"
                name="time"
                value={slot}
                required={index === 0}
                defaultChecked={
                  initialValues.time
                    ? initialValues.time === slot
                    : index === 0
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
          aria-label={t.submitAriaLabel}
        >
          {submitting ? t.submitting : t.submit}
        </Button>
      </div>
    </form>
  );
}