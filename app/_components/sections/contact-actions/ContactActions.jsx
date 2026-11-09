import { FaPhone, FaWhatsapp } from 'react-icons/fa6';
import { locationLinks } from '../full-locations/locationState';
import { getFullLocationsContent } from '../full-locations/fullLocations.content';
import s from './ContactActions.module.scss';

export default function ContactActions({ location, locale = 'lv' }) {
  const links = locationLinks(location);
  const t = getFullLocationsContent(locale);
  return <div className={s.actions} data-contact-actions>
    {links.tel && <a data-contact-call href={links.tel} aria-label={t.callAriaLabel(location.label)}><FaPhone aria-hidden="true" />{t.call}</a>}
    {links.wa && <a data-contact-whatsapp href={links.wa} target="_blank" rel="noopener noreferrer" aria-label={t.whatsappAriaLabel(location.label)}><FaWhatsapp aria-hidden="true" />WhatsApp</a>}
  </div>;
}
export function ContactDirections({ location, locale = 'lv' }) {
  const links = locationLinks(location);
  const t = getFullLocationsContent(locale);
  if (!links.waze && !links.maps) return null;
  return <nav className={s.directions} aria-label={t.navigation} data-contact-directions>
    <p>{t.navigation}</p>
    <div>{links.waze && <a data-contact-route href={links.waze} target="_blank" rel="noopener noreferrer">Waze <span aria-hidden="true">↗</span></a>}
      {links.maps && <a data-contact-route href={links.maps} target="_blank" rel="noopener noreferrer">Google Maps <span aria-hidden="true">↗</span></a>}</div>
  </nav>;
}
