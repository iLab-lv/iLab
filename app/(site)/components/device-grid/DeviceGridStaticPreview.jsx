import Link from 'next/link';

import { getDeviceGridStrings } from './deviceGrid.i18n';
import { byYearDescThenNameAsc } from './deviceGrid.helpers';
import sectionStyles from './DeviceGridSection.module.scss';
import cardStyles from './ModelCard.module.scss';

function dedupeAndSort(devices, brandKey, categoryKey) {
  const seen = new Set();

  return devices
    .filter((device) => {
      if (!device?.slug) return false;
      if (brandKey && device.brandKey !== brandKey) return false;
      if (categoryKey && device.categoryKey !== categoryKey) return false;
      if (seen.has(device.slug)) return false;

      seen.add(device.slug);
      return true;
    })
    .sort((a, b) => {
      const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : 9999;
      const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : 9999;

      if (orderA !== orderB) return orderA - orderB;

      return String(a.name || '').localeCompare(String(b.name || ''), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
}

function groupBySeries(devices, seriesMeta, fallbackSeriesTitle) {
  const map = new Map();

  for (const device of devices) {
    const seriesKey = device.seriesKey || 'other';
    const meta = seriesMeta?.[seriesKey];

    if (!map.has(seriesKey)) {
      map.set(seriesKey, {
        slug: seriesKey,
        title: meta?.title || (seriesKey !== 'other' ? seriesKey : fallbackSeriesTitle),
        order: Number.isFinite(Number(meta?.order)) ? Number(meta.order) : 9999,
        items: [],
      });
    }

    map.get(seriesKey).items.push(device);
  }

  return Array.from(map.values()).sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;

    return String(a.title || '').localeCompare(String(b.title || ''), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
}

function resolveSrc(device) {
  const direct = (device?.image && String(device.image).trim()) || '';
  if (direct) return direct;

  const pathy = (device?.imagePath && String(device.imagePath).trim()) || '';
  if (pathy) return `/images/${pathy.replace(/^\/+/, '')}`;

  return '/images/placeholders/phone.webp';
}

function getCardStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      suffix: 'ремонт и цены',
      fallbackAlt: 'Изображение устройства',
    };
  }

  return {
    suffix: 'remonts un cenas',
    fallbackAlt: 'Ierīces attēls',
  };
}

export default function DeviceGridStaticPreview({
  locale = 'lv',
  devices = [],
  baseHref,
  brandKey,
  categoryKey,
  seriesMeta = {},
  initialLimit = 4,
}) {
  const strings = getDeviceGridStrings(locale);
  const cardStrings = getCardStrings(locale);
  const list = dedupeAndSort(devices, brandKey, categoryKey);
  const groups = groupBySeries(list, seriesMeta, strings.fallbackSeriesTitle);

  if (groups.length === 0) {
    return <p className={sectionStyles.emptySection}>{strings.emptyAll}</p>;
  }

  return (
    <>
      {groups.map((group) => {
        const sectionId = `series-${group.slug}`;
        const visible = [...group.items]
          .sort(byYearDescThenNameAsc)
          .slice(0, initialLimit);

        return (
          <section
            className={sectionStyles.section}
            aria-labelledby={`${sectionId}-title`}
            id={sectionId}
            key={group.slug}
          >
            <div className={sectionStyles.sectionHeader}>
              <h2 id={`${sectionId}-title`} className={sectionStyles.sectionTitle}>
                {group.title}{' '}
                <span className={sectionStyles.count}>({group.items.length})</span>
              </h2>
            </div>

            <div className={sectionStyles.grid} id={`${sectionId}-grid`}>
              {visible.map((device) => {
                const name = device?.name || '';
                const href = `${baseHref}/${device.slug}`;
                const fullLabel = `${name} ${cardStrings.suffix}`.trim();
                const alt =
                  (name && `${name} ${cardStrings.suffix}`) ||
                  cardStrings.fallbackAlt;

                return (
                  <Link
                    key={`${device.brandKey}:${device.slug}`}
                    href={href}
                    className={cardStyles.card}
                    aria-label={fullLabel}
                  >
                    <img
                      src={resolveSrc(device)}
                      alt={alt}
                      className={cardStyles.img}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />

                    <div className={cardStyles.meta}>
                      <h3 className={cardStyles.name}>
                        <span className={cardStyles.modelLine}>
                          {name}
                          <span className={cardStyles.remontsSuffix}>
                            {' '}
                            {cardStrings.suffix}
                          </span>
                        </span>
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
