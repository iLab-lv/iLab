import DeviceGridClient from './DeviceGridClient';
import { getIphoneDeviceGridStrings } from './deviceGrid.i18n';

import s from './DeviceGrid.module.scss';

function sortDevices(devices = []) {
  return [...devices].sort((a, b) => {
    const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : 9999;
    const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : 9999;

    if (orderA !== orderB) return orderA - orderB;

    const yearA = Number.isFinite(Number(a.year)) ? Number(a.year) : 0;
    const yearB = Number.isFinite(Number(b.year)) ? Number(b.year) : 0;

    if (yearA !== yearB) return yearB - yearA;

    return String(a.name || '').localeCompare(String(b.name || ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
}

function buildSeries(devices, seriesMeta, fallbackSeriesTitle) {
  const seen = new Set();
  const groups = new Map();

  for (const device of devices) {
    if (!device?.slug || seen.has(device.slug)) continue;

    seen.add(device.slug);

    const key = device.seriesKey || 'other';
    const meta = seriesMeta?.[key];

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        title: meta?.title || (key === 'other' ? fallbackSeriesTitle : key),
        order: Number.isFinite(Number(meta?.order)) ? Number(meta.order) : 9999,
        devices: [],
      });
    }

    groups.get(key).devices.push(device);
  }

  return Array.from(groups.values())
    .map((group) => ({ ...group, devices: sortDevices(group.devices) }))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;

      return a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
}

export default function DeviceGrid({
  id = 'iphone-modeli',
  locale = 'lv',
  devices = [],
  baseHref,
  brandKey = 'apple',
  categoryKey = 'telefonu-remonts',
  seriesMeta = {},
  initialLimit = 4,
}) {
  const strings = getIphoneDeviceGridStrings(locale);
  const filteredDevices = devices.filter(
    (device) =>
      device?.brandKey === brandKey && device?.categoryKey === categoryKey
  );
  const series = buildSeries(
    filteredDevices,
    seriesMeta,
    strings.fallbackSeriesTitle
  );

  if (series.length === 0) return null;

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <header className={s.header}>
          <h2 id={`${id}-title`} className={s.title}>
            {strings.heading}
          </h2>
          <p className={s.intro}>{strings.intro}</p>
        </header>

        <DeviceGridClient
          id={id}
          locale={locale}
          series={series}
          baseHref={baseHref}
          initialLimit={initialLimit}
        />
      </div>
    </section>
  );
}
