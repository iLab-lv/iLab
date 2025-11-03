// app/(site)/components/service-pricelist/ServicePricelist.jsx
'use client';

import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './ServicePricelist.module.scss';

const PLACEHOLDER = '/images/placeholders/phone.webp';

/**
 * ServicePricelist — v2 (series chips + image fallback)
 *
 * Props:
 * - devices: Device[]                           // /data/devices
 * - pricing: Record<deviceSlug, { items: { id: string, price: number|string|null, popular?: boolean }[] }>
 * - brandSlug: string                           // e.g. 'apple'
 * - categorySlug?: string = 'telefonu-remonts'
 * - serviceIds: string[]                        // e.g. ['display-original','display-oled','display-incell']
 * - title?: string
 * - intro?: string
 * - initialLimit?: number = 8
 * - viewAllHref?: string | null                 // optional; set null to hide link
 * - cta?: { label: string, href: string }       // default: { label: 'Pieraksties', href: '#pieteikties' }
 * - seriesExtractor?: (device) => string        // default: device.series || 'Citi'
 * - className?: string
 */
export default function ServicePricelist({
  devices = [],
  pricing = {},
  brandSlug,
  categorySlug = 'telefonu-remonts',
  serviceIds = [],

  title = 'Cenas pēc modeļa',
  intro,
  initialLimit = 8,
  viewAllHref = null,
  cta = { label: 'Pieraksties', href: '#pieteikties' },
  seriesExtractor,
  className,
}) {
  const anchorRef = useRef(null);
  const [limit, setLimit] = useState(initialLimit);
  const [activeIdx, setActiveIdx] = useState(0);
  const [seriesFilter, setSeriesFilter] = useState('Visi');

  const getSeries = useCallback(
    (d) => {
      if (typeof seriesExtractor === 'function') {
        try {
          const lbl = seriesExtractor(d);
          return (lbl && String(lbl)) || 'Citi';
        } catch {
          return 'Citi';
        }
      }
      return (d?.series && String(d.series)) || 'Citi';
    },
    [seriesExtractor]
  );

  // Filter devices for this brand/category and keep only those present in pricing map
  const baseList = useMemo(() => {
    const arr = devices.filter(
      (d) =>
        (d.brandSlug || '').toLowerCase() === (brandSlug || '').toLowerCase() &&
        (!categorySlug || (d.category || '').toLowerCase() === categorySlug.toLowerCase()) &&
        pricing[d.slug]
    );

    // Sort by year desc then order asc (fallbacks)
    return arr.sort((a, b) => {
      const byYear = (b.year || 0) - (a.year || 0);
      if (byYear) return byYear;
      const ao = a.order ?? 9999;
      const bo = b.order ?? 9999;
      return ao - bo;
    });
  }, [devices, pricing, brandSlug, categorySlug]);

  // Collect series labels present
  const allSeries = useMemo(() => {
    const set = new Set();
    baseList.forEach((d) => set.add(getSeries(d)));
    return ['Visi', ...Array.from(set)];
  }, [baseList, getSeries]);

  // Apply series filter
  const filtered = useMemo(() => {
    return seriesFilter === 'Visi'
      ? baseList
      : baseList.filter((d) => getSeries(d) === seriesFilter);
  }, [baseList, seriesFilter, getSeries]);

  // Reset selection/limit when filter changes
  useEffect(() => {
    setActiveIdx(0);
    setLimit(initialLimit);
  }, [seriesFilter, initialLimit]);

  const active = filtered[activeIdx];

  // Price line selector with serviceIds priority
  const pickPrimaryLine = useCallback(
    (deviceSlug) => {
      const p = pricing[deviceSlug];
      if (!p) return null;
      const items = Array.isArray(p.items) ? p.items : [];
      for (const sid of serviceIds) {
        const found = items.find((it) => it.id === sid && it.price !== null && it.price !== undefined);
        if (found) return found;
      }
      const pop = items.find((it) => it.popular && it.price !== null && it.price !== undefined);
      if (pop) return pop;
      return items.find((it) => it.price !== null && it.price !== undefined) || null;
    },
    [pricing, serviceIds]
  );

  // ----- Image handling (normalized public path + runtime fallback) -----
  const [imgSrc, setImgSrc] = useState(PLACEHOLDER);

  useEffect(() => {
    setImgSrc(resolveImageSrc(active));
  }, [active]);

  function resolveImageSrc(device) {
    const raw = (device?.image && String(device.image).trim()) || '';
    if (!raw) return PLACEHOLDER;
    if (raw.startsWith('/')) return raw;                             // already a public path
    if (!raw.startsWith('http')) return `/${raw.replace(/^\/+/, '')}`; // relative logical -> public
    return raw || PLACEHOLDER;                                       // remote URL (handled if allowed by config)
  }

  // ----- Helpers -----
  function formatPrice(v) {
    if (v === null || v === undefined) return 'pēc pieprasījuma';
    if (typeof v === 'number') return `€ ${v}`;
    return String(v);
  }

  function onPick(i) {
    setActiveIdx(i);
    // Scroll to preview pane on mobile
    if (anchorRef.current) {
      const top = anchorRef.current.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  if (!filtered.length) return null;

  const primary = active ? pickPrimaryLine(active.slug) : null;

  return (
    <section className={`${s.section} ${className || ''}`} aria-labelledby="sp-title">
      <div className={s.container}>
        <header className={s.header}>
          <h2 id="sp-title" className={s.h2}>{title}</h2>
          {intro ? <p className={s.intro}>{intro}</p> : null}
        </header>

        {/* Series filter chips */}
        <div className={s.seriesBar} role="group" aria-label="Filtrēt pēc sērijas">
          {allSeries.map((lbl) => {
            const activeChip = lbl === seriesFilter;
            return (
              <button
                key={lbl}
                type="button"
                className={activeChip ? s.chipActive : s.chip}
                onClick={() => setSeriesFilter(lbl)}
                aria-pressed={activeChip ? 'true' : 'false'}
              >
                {lbl}
              </button>
            );
          })}
        </div>

        <div className={s.layout}>
          {/* LEFT: active device preview */}
          <div className={s.left} ref={anchorRef}>
            <div className={s.previewCard} role="group" aria-label="Atlasītais modelis">
              <div className={s.imageWrap}>
                <Image
                  src={imgSrc}
                  alt={active?.name || 'Tālrunis'}
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className={s.image}
                  onError={() => setImgSrc(PLACEHOLDER)}
                  // While wiring assets, skip optimizer to avoid 400s from wrong paths.
                  // Remove `unoptimized` once all images live in /public or remotePatterns are configured.
                  unoptimized
                />
              </div>

              <div className={s.previewBody}>
                <div className={s.modelTitle}>
                  <span className={s.modelName}>{active?.name}</span>
                  {active?.year ? <span className={s.modelYear}>{active.year}</span> : null}
                  <span className={s.modelSeries}>{getSeries(active)}</span>
                </div>

                <div className={s.priceRow}>
                  <span className={s.priceLabel}>{labelForService(serviceIds)}</span>
                  <span className={s.priceValue}>{formatPrice(primary?.price)}</span>
                </div>

                {/* Alternative options (if present in serviceIds) */}
                {serviceIds.length > 1 && (
                  <ul className={s.altList}>
                    {serviceIds.map((sid) => {
                      const line = pricing[active.slug]?.items?.find((i) => i.id === sid && i.price !== null);
                      if (!line) return null;
                      const isPrimary = line === primary;
                      return (
                        <li key={sid} className={isPrimary ? s.altItemActive : s.altItem}>
                          <span className={s.altLabel}>{prettyServiceId(sid)}</span>
                          <span className={s.altPrice}>{formatPrice(line.price)}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {cta?.href ? (
                  <Link href={cta.href} className={s.ctaBtn}>
                    {cta.label || 'Pieraksties'}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          {/* RIGHT: models list */}
          <div className={s.right}>
            <ol className={s.modelList}>
              {filtered.slice(0, limit).map((d, i) => {
                const line = pickPrimaryLine(d.slug);
                const isActive = i === activeIdx;
                return (
                  <li key={d.slug}>
                    <button
                      type="button"
                      className={isActive ? s.modelBtnActive : s.modelBtn}
                      onClick={() => onPick(i)}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className={s.modelBtnName}>{d.name}</span>
                      {line ? <span className={s.modelBtnPrice}>{formatPrice(line.price)}</span> : null}
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Show more for long series */}
            {limit < filtered.length ? (
              <button className={s.moreBtn} type="button" onClick={() => setLimit((l) => l + initialLimit)}>
                Rādīt vēl modeļus
              </button>
            ) : null}

            {/* Optional navigation link — leave null to hide */}
            {viewAllHref ? (
              <Link href={viewAllHref} className={s.allLink}>
                Skatīt visus modeļus
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------- helpers ------------- */

function labelForService(serviceIds) {
  if (!serviceIds?.length) return 'Remonta cena';
  return prettyServiceId(serviceIds[0]);
}

function prettyServiceId(id) {
  switch (id) {
    case 'display-original': return 'Displeja maiņa (oriģināls)';
    case 'display-oled':     return 'Displeja maiņa (OLED)';
    case 'display-incell':   return 'Displeja maiņa (InCell)';
    case 'battery':          return 'Akumulatora maiņa';
    case 'charge-port':      return 'Uzlādes ligzda';
    default: return id.replace(/-/g, ' ');
  }
}
