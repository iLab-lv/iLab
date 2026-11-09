'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Button from '@components/button/Button';
import s from './BookingForm.module.scss';
import { getBookingFormContent } from './bookingForm.i18n';
import { validateBooking } from './bookingValidation';

export default function BookingForm({
  locale = 'lv',
  locations = [],
  submitMode = 'fetch',
  onSuccess,
  onError,
  onHomeClick,
  initialValues = {},
  enableHoneypot = true,
  presentation = 'default',
  serviceInteractions = false,
}) {
  const t = getBookingFormContent(locale);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const submittingRef = useRef(false);
  const successRef = useRef(null);
  const formId = useId();
  const drawer = presentation === 'drawer' && serviceInteractions;
  const fieldId = (name) => drawer ? `${formId}-${name}` : name;
  const errorProps = (name) => drawer ? {
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fieldId(name)}-error` : undefined,
  } : {};
  const fieldError = (name) => drawer && errors[name]
    ? <span id={`${fieldId(name)}-error`} className={s.fieldError}>{t[errors[name]]}</span> : null;

  useEffect(() => {
    if (drawer && success) successRef.current?.focus();
  }, [drawer, success]);

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

    if (submitting || success || (drawer && submittingRef.current)) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    if (drawer) {
      const nextErrors = validateBooking(Object.fromEntries(fd), { minDate, locationIds: locations.map((location) => location.id) });
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) {
        form.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
        return;
      }
      onError?.('');
      submittingRef.current = true;
    }

    try {
      setSubmitting(true);

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
    } catch (error) {
      if (!drawer) throw error;
      onError?.(t.submitError);
    } finally {
      submittingRef.current = false;
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
      <div ref={successRef} tabIndex={drawer ? -1 : undefined} className={s.success} role="status" aria-live="polite">
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
    <form className={`${s.form} ${presentation === 'drawer' ? s.drawerForm : ''}`} {...formProps} aria-busy={drawer ? submitting : undefined}
      onInput={drawer ? (event) => {
        const name = event.target.name;
        setErrors((current) => {
          if (!current[name]) return current;
          const next = { ...current }; delete next[name]; return next;
        });
      } : undefined}>
      {drawer && Object.keys(errors).length > 0 && <p className={s.validationSummary} role="alert">{t.validationError}</p>}
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
          <label htmlFor={fieldId('name')}>{t.nameLabel}</label>
          <input
            id={fieldId('name')}
            {...errorProps('name')}
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={initialValues.name || ''}
          />
          {fieldError('name')}
        </div>

        <div className={s.field}>
          <label htmlFor={fieldId('phone')}>{t.phoneLabel}</label>
          <input
            id={fieldId('phone')}
            {...errorProps('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder={t.phonePlaceholder}
            required
            autoComplete="tel"
            defaultValue={initialValues.phone || ''}
          />
          {fieldError('phone')}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor={fieldId('device')}>{t.deviceLabel}</label>
          <input
            id={fieldId('device')}
            {...errorProps('device')}
            autoComplete={drawer ? 'off' : undefined}
            name="device"
            type="text"
            placeholder={t.devicePlaceholder}
            required
            defaultValue={initialValues.device || ''}
          />
          {fieldError('device')}
        </div>

        <div className={s.field}>
          <label htmlFor={fieldId('date')}>{t.dateLabel}</label>
          <input
            id={fieldId('date')}
            {...errorProps('date')}
            name="date"
            type="date"
            defaultValue={initialValues.date || defaultDate}
            min={minDate}
            required
          />
          {fieldError('date')}
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor={fieldId('fault')}>{t.faultLabel}</label>
        <textarea
          id={fieldId('fault')}
          {...errorProps('fault')}
          autoComplete={drawer ? 'off' : undefined}
          name="fault"
          rows={drawer ? 2 : 4}
          placeholder={t.faultPlaceholder}
          required
          maxLength={600}
          defaultValue={initialValues.fault || ''}
        />
        {fieldError('fault')}
      </div>

      <fieldset className={s.fieldset} aria-labelledby={fieldId('locgroup')} {...errorProps('location')}>
        <legend id={fieldId('locgroup')}>{t.locationLegend}</legend>

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
        {fieldError('location')}
      </fieldset>

      <fieldset className={s.fieldset} aria-labelledby={fieldId('timegroup')} {...errorProps('time')}>
        <legend id={fieldId('timegroup')}>{t.timeLegend}</legend>

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
        {fieldError('time')}
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
