import { dedupeAndSort, groupBySeries } from './deviceGrid.groups';
import Link from 'next/link';

import { getDeviceGridStrings } from './deviceGrid.i18n';
import { byYearDescThenNameAsc } from './deviceGrid.helpers';
import sectionStyles from './DeviceGridSection.module.scss';
import cardStyles from './ModelCard.module.scss';

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
                return (
                  <Link
                    key={`${device.brandKey}:${device.slug}`}
                    href={href}
                    className={cardStyles.card}
                    aria-label={fullLabel}
                  >
                    <div className={cardStyles.meta}>
                      <h3 className={cardStyles.name}>
                        <span className={cardStyles.modelLine}>
                          {name}
                          {device?.year ? (
                            <span className={cardStyles.year}> {device.year}</span>
                          ) : null}
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
