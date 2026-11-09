'use client';
import { useUiDialogs } from '@/app/(site)/ui/providers/UiDialogsProvider';
import ContactActions, { ContactDirections } from '../contact-actions/ContactActions';
import { getAvailability, locationLinks } from '../full-locations/locationState';
import useLocationClock from '../full-locations/useLocationClock';
import { getFullLocationsContent } from '../full-locations/fullLocations.content';
import s from './QuickContacts.module.scss';

export default function QuickContacts({ id = 'quick-contacts', locale = 'lv', locations = [], defaultHours = [] }) {
  const now = useLocationClock();
  const { openContact } = useUiDialogs();
  const t = getFullLocationsContent(locale);
  if (!locations.length) return null;
  return <section id={id} data-quick-contacts className={s.section} aria-label={t.title}>
    <div className={s.strip}>{locations.map((location, index) => {
      const state = getAvailability(location, defaultHours, now, locale);
      const links = locationLinks(location);
      const lat = location.geo?.lat ?? location.lat, lng = location.geo?.lng ?? location.lng;
      return <article key={location.id} data-contact-location={location.id}>
        <p className={s.branchHead}><span>{String(index + 1).padStart(2,'0')}</span><strong>{location.label}</strong>
          <small>{locale === 'ru' ? 'Сервисный центр iLab' : 'iLab servisa centrs'}</small>
          {typeof lat === 'number' && typeof lng === 'number' && <small>{Math.abs(lat).toFixed(4)}° {lat >= 0 ? 'N' : 'S'} · {Math.abs(lng).toFixed(4)}° {lng >= 0 ? 'E' : 'W'}</small>}
        </p>
        <div className={s.availability}><p className={s.status}><i className={state.open ? s.isOpen : ''} aria-hidden="true" /><span>{state.text}</span></p><button className={s.hours} type="button" onClick={event => openContact(event.currentTarget, location.id)}>{t.hours}</button></div>
        <p className={s.row}>{location.tel && links.tel && <a className={s.phone} href={links.tel}>{location.tel}</a>}<span>{location.address}</span></p>
        {location.email && <a className={s.email} href={'mailto:' + location.email}>{location.email}</a>}
        <ContactActions location={location} locale={locale} />
        <ContactDirections location={location} locale={locale} />
      </article>;
    })}</div>
  </section>;
}
