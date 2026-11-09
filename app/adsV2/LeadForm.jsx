'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '../(site)/components/button/Button';
import { getBookingFormContent } from '../(site)/components/booking/bookingForm.i18n';
import { getLandingLeadFormContent } from '../ads/_components/ui/forms/landingLeadForm.i18n';
import s from './AdsV2.module.scss';

const SERVICES = ['Omniva', 'DPD', 'SmartPosti', 'Latvijas Pasts'];

// The existing /api/booking contract is shared by all three lead types.
// Localization helpers remain the source for approved production field copy.
export default function LeadForm({ mode, locale, locations, initialValues = {} }) {
  const production = getLandingLeadFormContent('lv', mode);
  const shared = getBookingFormContent(locale);
  const ru = locale === 'ru';
  const t = ru ? { ...production, ...shared,
    title: mode === 'booking' ? 'Записаться' : mode === 'delivery' ? 'Оставить заявку с доставкой' : 'Уточнить стоимость',
    intro: mode === 'booking' ? 'Уточним наличие и предложим удобное время для диагностики или замены.' : mode === 'delivery' ? 'Опиши проблему и модель устройства. Проверим информацию и свяжемся с деталями.' : 'Уточним цену, наличие деталей и подскажем ближайший удобный филиал.',
    deliveryLocationLegend: 'Филиал, в который отправите устройство', deliveryServiceLegend: 'Служба доставки',
    returnParcelLabel: 'Пакомат / город для обратной доставки', returnParcelPlaceholder: '',
    commentLabel: 'Дополнительный комментарий', commentPlaceholder: '',
    successTitle: mode === 'booking' ? shared.successTitle : 'Спасибо, заявка получена!',
    successText: mode === 'booking' ? shared.successText : 'В ближайшее время свяжемся с вами, чтобы уточнить детали.',
  } : production;
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);
  const successRef = useRef(null);
  useEffect(() => { if (success) successRef.current?.focus(); }, [success]);
  const [minDate] = useState(() => {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Riga', year: 'numeric', month: '2-digit', day: '2-digit' }).format(tomorrow);
  });
  const prefix = `ads-v2-${mode}`;

  async function submit(event) {
    event.preventDefault();
    if (pending.current || success) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    pending.current = true; setBusy(true); setError('');
    try {
      const response = await fetch('/api/booking', { method: 'POST', body: new FormData(form) });
      if (!response.ok) throw new Error('booking');
      setSuccess(true);
    } catch {
      setError(`${t.submitError}. ${ru ? 'Попробуйте ещё раз или позвоните в филиал.' : 'Mēģiniet vēlreiz vai zvaniet filiālei.'}`);
    } finally { pending.current = false; setBusy(false); }
  }

  if (success) return <div className={s.formSuccess} role="status" tabIndex={-1} ref={successRef}><h3>{t.successTitle}</h3><p>{t.successText}</p></div>;

  const field = (name, label, options = {}) => <div className={s.field}>
    <label htmlFor={`${prefix}-${name}`}>{label}</label>
    <input id={`${prefix}-${name}`} name={name} required {...options} defaultValue={initialValues[name] || options.defaultValue || ''} />
  </div>;

  return <form className={s.form} action="/api/booking" method="post" onSubmit={submit} onInvalid={() => setError(shared.validationError)} aria-busy={busy}>
    <p>{t.intro}</p>
    <input type="hidden" name="leadType" value={mode} />
    <input className={s.honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <fieldset disabled={busy} className={s.formFields}>
      <div className={s.formRow}>
        {field('name', t.nameLabel, { autoComplete: 'name', type: 'text' })}
        {field('phone', t.phoneLabel, { autoComplete: 'tel', type: 'tel', inputMode: 'tel', placeholder: t.phonePlaceholder, pattern: '[+0-9\\(\\) .\\-]{6,25}', title: shared.phoneInvalid })}
      </div>
      {field('device', t.deviceLabel, { placeholder: t.devicePlaceholder })}
      <div className={s.field}><label htmlFor={`${prefix}-fault`}>{t.faultLabel}</label><textarea id={`${prefix}-fault`} name="fault" rows={4} maxLength={600} required placeholder={t.faultPlaceholder} defaultValue={initialValues.fault || ''} /></div>
      {mode !== 'price' && <fieldset className={s.choices}><legend>{mode === 'delivery' ? t.deliveryLocationLegend : t.locationLegend}</legend>{locations.map((location, index) => <label key={location.id}><input type="radio" name="location" value={location.id} required defaultChecked={initialValues.location ? initialValues.location === location.id : index === 0} /><span>{location.label}<small>{location.address}</small></span></label>)}</fieldset>}
      {mode === 'booking' && <>
        {field('date', t.dateLabel, { type: 'date', min: minDate, defaultValue: minDate })}
        <fieldset className={s.choices}><legend>{t.timeLegend}</legend>{['10:00-13:00', '13:00-17:00', '17:00-21:00'].map((slot, index) => <label key={slot}><input type="radio" name="time" value={slot} required defaultChecked={index === 0} /><span>{slot.replace('-', ' – ')}</span></label>)}</fieldset>
      </>}
      {mode === 'delivery' && <>
        <fieldset className={s.choices}><legend>{t.deliveryServiceLegend}</legend>{SERVICES.map((service, index) => <label key={service}><input type="radio" name="deliveryService" value={service} required defaultChecked={index === 0} /><span>{service}</span></label>)}</fieldset>
        <div className={s.field}><label htmlFor={`${prefix}-returnParcel`}>{t.returnParcelLabel}</label><input id={`${prefix}-returnParcel`} name="returnParcel" placeholder={t.returnParcelPlaceholder} /></div>
        <div className={s.field}><label htmlFor={`${prefix}-comment`}>{t.commentLabel}</label><textarea id={`${prefix}-comment`} name="comment" rows={3} maxLength={600} placeholder={t.commentPlaceholder} /></div>
      </>}
      {error && <p className={s.error} role="alert">{error}</p>}
      <Button type="submit" disabled={busy} aria-label={t.submitAriaLabel}>{busy ? t.submitting : ru ? t.title : t.submit}</Button>
    </fieldset>
  </form>;
}
