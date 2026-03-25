// sections/device-selector/DeviceSelector.jsx
import DeviceGrid from '@components/device-grid/DeviceGrid';
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

        <DeviceGrid
          locale={locale}
          devices={devices}
          baseHref={baseHref}
          brandKey={brandKey}
          categoryKey={categoryKey}
          seriesMeta={seriesMeta}
          initialLimit={initialLimit}
          autoExpandOnSearch={autoExpandOnSearch}
        />
      </div>
    </section>
  );
}