import { getLocationsContent } from '@/app/(site)/sections/locations/locations.i18n';

function minutes(value) {
  if (!value) return null;
  const [hour, minute] = String(value).split(':').map(Number);
  return Number.isFinite(hour) && Number.isFinite(minute) ? hour * 60 + minute : null;
}
export function getAvailability(location, fallbackHours, now, locale) {
  const t = getLocationsContent(locale);
  const hours = location.hours?.length ? location.hours : fallbackHours;
  if (!now) return {
    open: false,
    text: t.hours,
    hours,
    today: -1
  };
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Riga',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short'
  }).formatToParts(now).reduce((result, part) => ({
    ...result,
    [part.type]: part.value
  }), {});
  const weekday = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6
  }[parts.weekday] ?? 0;
  const date = parts.year + '-' + parts.month + '-' + parts.day;
  const override = location.hoursOverride?.date === date ? location.hoursOverride : null;
  const today = {
    ...hours?.[weekday],
    ...(override || {})
  };
  const open = minutes(today.opens),
    close = minutes(today.closes);
  const current = Number(parts.hour) * 60 + Number(parts.minute);
  if (today.closed !== true && open != null && close != null && current >= open && current < close) return {
    open: true,
    text: t.openUntil(today.closes),
    hours,
    today: weekday,
    override
  };
  if (today.closed !== true && open != null && current < open) return {
    open: false,
    text: t.closedUntil(today.opens),
    hours,
    today: weekday,
    override
  };
  for (let offset = 1; offset <= 7; offset++) {
    const next = hours?.[(weekday + offset) % 7];
    if (next?.closed !== true && minutes(next?.opens) != null) {
      const nextDay = offset === 1 ? locale === 'ru' ? 'завтра' : 'rīt' : new Intl.DateTimeFormat(locale === 'ru' ? 'ru-LV' : 'lv-LV', {
        weekday: 'long',
        timeZone: 'Europe/Riga'
      }).format(new Date(now.getTime() + offset * 86400000));
      return {
        open: false,
        text: locale === 'ru' ? 'Закрыто · откроемся ' + nextDay + ' ' + next.opens : 'Slēgts · atveram ' + nextDay + ' ' + next.opens,
        hours,
        today: weekday,
        override
      };
    }
  }
  return {
    open: false,
    text: t.closed,
    hours,
    today: weekday,
    override
  };
}

export function locationLinks(location) {
  const tel = location.telLink || (location.tel ? 'tel:' + location.tel.replace(/\s+/g, '') : null);
  const wa = location.wa || (location.tel ? 'https://wa.me/' + location.tel.replace(/\D/g, '') : null);
  const lat = location.geo?.lat ?? location.lat,
    lng = location.geo?.lng ?? location.lng;
  const query = encodeURIComponent([location.label, location.address].filter(Boolean).join(', '));
  const waze = location.waze || (typeof lat === 'number' && typeof lng === 'number' ? 'https://waze.com/ul?ll=' + lat + ',' + lng + '&navigate=yes' : query ? 'https://waze.com/ul?q=' + query + '&navigate=yes' : null);
  return {
    tel,
    wa,
    waze,
    maps: location.maps || location.mapUrl
  };
}
