// sections/device-selector/DeviceSelector.jsx
import { withModelThumbnail } from '@/_components/sections/model-thumbnail/modelThumbnail.server';
import DeviceGridIsland from '@components/device-grid/DeviceGridIsland';
import DeviceGridStaticPreview from '@components/device-grid/DeviceGridStaticPreview';
import { getDeviceSelectorStrings } from './deviceSelector.i18n';
import s from '@styles/Catalog.module.scss';
import HubDeviceGridClient from '@/_components/sections/device-grid/HubDeviceGridClient';
import finder from '@/_components/sections/device-grid/HubDeviceGrid.module.scss';
import { dedupeAndSort, groupBySeries } from '../../components/device-grid/deviceGrid.groups';
import { byYearDescThenNameAsc } from '../../components/device-grid/deviceGrid.helpers';
import { getDeviceGridStrings } from '../../components/device-grid/deviceGrid.i18n';

export default function DeviceSelector({
  id = 'device-selector',
  locale = 'lv',
  title,
  intro,
  note,
  devices = [],
  baseHref,
  brandKey,
  categoryKey,
  seriesMeta = {},
  initialLimit = 4,
  autoExpandOnSearch = true,
  variant,
}) {
  const strings = getDeviceSelectorStrings(locale);
  const resolvedTitle = title || strings.title;
  const resolvedIntro = intro || strings.intro;
  const headingId = `${id}-title`;

  if (variant === 'brand') {
    const copy = getDeviceGridStrings(locale);
    const series = groupBySeries(
      dedupeAndSort(devices, brandKey, categoryKey),
      seriesMeta,
      copy.fallbackSeriesTitle
    ).map((group) => ({
      key: group.slug,
      title: group.title,
      devices: [...group.items].sort(byYearDescThenNameAsc).map(withModelThumbnail),
    }));

    return (
      <section id={id} className={`${finder.section} ${finder.brand}`} aria-labelledby={headingId}>
        <header className={finder.header}>
          <h2 id={headingId}>{resolvedTitle}</h2>
          {resolvedIntro && <p>{resolvedIntro}</p>}
        </header>
        {note && <p className={finder.note}>{note}</p>}
        {series.length > 0 && <HubDeviceGridClient
          id={id}
          locale={locale}
          series={series}
          baseHref={baseHref}
          variant="brand"
          copy={{
            searchLabel: copy.searchAriaLabel,
            searchPlaceholder: copy.searchPlaceholder,
            noResults: copy.emptyAll,
            emptyYear: copy.emptyYear,
            yearFilterAria: copy.yearFilterAria,
            allYears: copy.allYears,
          }}
        />}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`${s.section} ${s.anchorTarget}`}
      aria-labelledby={headingId}
    >
      <div className={s.container}>
        {resolvedTitle ? (
          <h2 id={headingId} className={s.h2}>
            {resolvedTitle}
          </h2>
        ) : null}

        {resolvedIntro ? (
          <p className={s.intro}>{resolvedIntro}</p>
        ) : null}

        {note ? (
          <p className={s.paragraph} style={{ marginTop: 0 }}>
            {note}
          </p>
        ) : null}

        <DeviceGridIsland
          locale={locale}
          devices={devices}
          baseHref={baseHref}
          brandKey={brandKey}
          categoryKey={categoryKey}
          seriesMeta={seriesMeta}
          initialLimit={initialLimit}
          autoExpandOnSearch={autoExpandOnSearch}
        >
          <DeviceGridStaticPreview
            locale={locale}
            devices={devices}
            baseHref={baseHref}
            brandKey={brandKey}
            categoryKey={categoryKey}
            seriesMeta={seriesMeta}
            initialLimit={initialLimit}
          />
        </DeviceGridIsland>
      </div>
    </section>
  );
}
