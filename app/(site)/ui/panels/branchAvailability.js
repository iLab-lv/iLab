function parseHM(hm) {
  if (!hm) return null;

  const [h, m] = hm.split(':').map(Number);

  if (Number.isNaN(h) || Number.isNaN(m)) return null;

  return h * 60 + m;
}

export function getRigaNow() {
  const d = new Date();

  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Riga',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
  });

  const parts = fmt
    .formatToParts(d)
    .reduce((acc, p) => ((acc[p.type] = p.value), acc), {});

  const date = `${parts.year}-${parts.month}-${parts.day}`;

  const weekdayMap = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };

  return {
    date,
    minutes: parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10),
    weekday: weekdayMap[parts.weekday] ?? 0,
  };
}

export function computeOpenState(hoursArr, overrideForToday, t) {
  const { minutes: nowM, weekday } = getRigaNow();

  let today = hoursArr?.[weekday] || hoursArr?.[0];

  if (overrideForToday?.opens && overrideForToday?.closes) {
    today = {
      ...today,
      opens: overrideForToday.opens,
      closes: overrideForToday.closes,
    };
  }

  const openM = parseHM(today?.opens);
  const closeM = parseHM(today?.closes);

  if (openM == null || closeM == null) {
    return {
      open: false,
      badgeText: t.closed,
      today,
    };
  }

  if (nowM >= openM && nowM < closeM) {
    return {
      open: true,
      badgeText: t.openUntil(today.closes),
      today,
    };
  }

  return {
    open: false,
    badgeText: t.closedUntil(today.opens),
    today,
  };
}

