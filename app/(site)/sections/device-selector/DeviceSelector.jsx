// sections/device-selector/DeviceSelector.jsx
import DeviceGridIsland from '@components/device-grid/DeviceGridIsland';
import DeviceGridStaticPreview from '@components/device-grid/DeviceGridStaticPreview';
import { getDeviceSelectorStrings } from './deviceSelector.i18n';
import s from '@styles/Catalog.module.scss';

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
}) {
  const strings = getDeviceSelectorStrings(locale);
  const resolvedTitle = title || strings.title;
  const resolvedIntro = intro || strings.intro;
  const headingId = `${id}-title`;

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
