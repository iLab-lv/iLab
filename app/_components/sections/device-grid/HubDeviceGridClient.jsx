'use client';

import ModelThumbnail from '../model-thumbnail/ModelThumbnail';
import { modelKind, modelLabel } from '../model-thumbnail/modelPresentation';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getIphoneDeviceGridStrings } from './deviceGrid.i18n';
import s from './HubDeviceGrid.module.scss';
import { matchesQuery } from '../../../(site)/components/device-grid/deviceGrid.helpers';

function normalize(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
}

export default function HubDeviceGridClient({ id, locale = 'lv', series = [], baseHref, variant, copy: suppliedCopy = {} }) {
  const copy = { ...getIphoneDeviceGridStrings(locale), ...suppliedCopy };
  const isBrand = variant === 'brand';
  const [query, setQuery] = useState('');
  const [yearBySeries, setYearBySeries] = useState({});
  const search = isBrand ? query : normalize(query);
  const hasQuery = isBrand ? Boolean(query) : Boolean(search);
  const matches = useMemo(() => series.map((group) => ({
    ...group,
    devices: hasQuery ? group.devices.filter((device) => isBrand
      ? matchesQuery(device, query)
      : normalize(`${device.name || ''} ${device.slug || ''} ${device.year || ''} ${group.title}`).includes(search)) : group.devices,
  })).filter((group) => group.devices.length), [hasQuery, search, series, isBrand, query]);

  return (
    <>
      <div className={s.finder}>
        <label htmlFor={`${id}-search`}>{copy.searchLabel}</label>
        <div>
          <input id={`${id}-search`} name={`${id}-search`} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} autoComplete="off" spellCheck={false} />
          {query && <button type="button" onClick={() => setQuery('')} aria-label={copy.clearSearch}>×</button>}
        </div>
      </div>
      {matches.length === 0 && <p className={s.empty} role="status">{copy.noResults}</p>}
      <div className={s.seriesList}>
        {matches.map((group, index) => {
          const sectionId = `${id}-${group.key}`;
          const yearDevices = isBrand ? series.find((item) => item.key === group.key).devices : group.devices;
          const years = [...new Set(yearDevices.map((device) => Number(device.year)).filter((year) => Number.isFinite(year) && (isBrand || year > 0)))].sort((a, b) => b - a);
          const selectedYear = yearBySeries[group.key] ?? null;
          const filterYear = selectedYear !== null && (isBrand || !search);
          const hasVisibleModels = !filterYear || group.devices.some((device) => Number(device.year) === selectedYear);
          return (
            <details className={s.series} key={`${hasQuery ? 'search' : 'all'}-${group.key}`} open={hasQuery || index === 0}>
              <summary id={`${sectionId}-title`}><span>{group.title}</span><span className={s.count}>{group.devices.length}</span><i aria-hidden="true" /></summary>
              {years.length > (isBrand ? 0 : 1) && <div className={s.yearFilter} role="group" aria-label={copy.yearFilterAria}>
                <button type="button" aria-pressed={selectedYear === null} onClick={() => setYearBySeries((current) => ({ ...current, [group.key]: null }))}>{copy.allYears}</button>
                {years.map((year) => <button key={year} type="button" aria-pressed={selectedYear === year} onClick={() => setYearBySeries((current) => ({ ...current, [group.key]: year }))}>{year}</button>)}
              </div>}
              {isBrand && !hasVisibleModels && <p className={s.empty} role="status">{copy.emptyYear}</p>}
              <ul className={s.models} id={`${sectionId}-grid`} aria-labelledby={`${sectionId}-title`}>
                {group.devices.map((device) => <li key={device.slug} hidden={filterYear && Number(device.year) !== selectedYear}>
                  <Link href={`${baseHref}/${device.slug}`} aria-label={`${device.name || device.slug} ${copy.suffix}`} data-model-tile={device.slug}>
                    <ModelThumbnail src={device.thumbnailSrc} kind={modelKind(device)} />
                    <span className={s.modelLabel}><span>{modelLabel(device).name}<span className={s.arrow} aria-hidden="true">↗</span></span>{modelLabel(device).detail && <small>{modelLabel(device).detail}</small>}</span>
                  </Link>
                </li>)}
              </ul>
            </details>
          );
        })}
      </div>
    </>
  );
}
