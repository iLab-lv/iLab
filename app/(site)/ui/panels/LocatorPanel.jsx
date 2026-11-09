'use client';

import { useUiDialogs } from '../providers/UiDialogsProvider';
import { getSazinatiesPanelContent } from './sazinatiesPanel.i18n';
import { computeOpenState, getRigaNow } from './branchAvailability';
import s from './LocatorPanel.module.scss';
import LocationsMap from '@sections/locations/LocationsMap';

/**
 * Fullscreen locator panel using the shared LocationsMap (crisp WebP variants).
 *
 * Props:
 * - onSelectLocation?: (locId: string) => void  // open your "Sazinies" pane, etc.
 */
export default function LocatorPanel({
  locale = 'lv',
  locations = [],
  pinPositions = {},
  defaultHours = [],
  onSelectLocation,
}) {
  const { serviceRedesign } = useUiDialogs();
  const t = getSazinatiesPanelContent(locale);
  const handlePinClick = (locId) => {
    onSelectLocation?.(locId);
  };

  if (serviceRedesign) return <div className={s.serviceWrap}>
    <p className={s.intro}>{locale === 'ru' ? 'Выберите филиал на карте, чтобы увидеть часы работы и контакты.' : 'Izvēlies filiāli kartē, lai redzētu darba laiku un kontaktus.'}</p>
    <div className={s.serviceMap}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/home/map-riga-branches.png" width={3000} height={3000} alt={locale === 'ru' ? 'Карта Риги с филиалами iLab' : 'Rīgas karte ar iLab filiālēm'} />
      {locations.map((location) => {
        const pin = pinPositions[location.id];
        if (!pin || !Number.isFinite(Number(pin.xPct)) || !Number.isFinite(Number(pin.yPct))) return null;
        return <button key={location.id} className={s.servicePin} type="button" style={{ '--x': `${pin.xPct}%`, '--y': `${pin.yPct}%` }} aria-label={`${locale === 'ru' ? 'Контакты' : 'Kontakti'}: ${location.label}`} onClick={() => handlePinClick(location.id)}><i aria-hidden="true" /><span>{location.label}</span></button>;
      })}
    </div>
    <div className={s.branches}>{locations.map((location) => {
      const { date } = getRigaNow();
      const hours = location.hours?.length ? location.hours : defaultHours;
      const availability = computeOpenState(hours, location.hoursOverride?.date === date ? location.hoursOverride : null, t);
      return <section key={location.id} className={s.branch}>
        <h3><button type="button" onClick={() => handlePinClick(location.id)}>{location.label}</button></h3>
        {location.address && <address>{location.address}</address>}
        <p className={s.status}><i data-open={availability.open} aria-hidden="true" />{availability.badgeText}</p>
        <div className={s.links}>
          {location.tel && <a href={location.telLink || `tel:${location.tel.replace(/\s+/g, '')}`}>{t.call}</a>}
          {location.waze && <a href={location.waze} target="_blank" rel="noopener">Waze</a>}
          {location.destination && <a href={location.destination} target="_blank" rel="noopener">{t.routes}</a>}
          {location.maps && <a href={location.maps} target="_blank" rel="noopener">Google Maps</a>}
        </div>
      </section>;
    })}</div>
  </div>;

  return (
    <div className={s.wrap}>
      <LocationsMap
        className={s.mapBox}
        imageUrl="/images/map-3000.webp"
        locations={locations}
        pinPositions={pinPositions}
        onPinClick={handlePinClick}
        ariaLabel={locale === 'ru' ? 'Карта с филиалами' : 'Karte ar filiālēm'}
      />
    </div>
  );
}
