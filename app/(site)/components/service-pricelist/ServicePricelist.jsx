// app/(site)/components/service-pricelist/ServicePricelist.jsx
'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './ServicePricelist.module.scss';

// 🔸 adjust this path if needed
import repairServices from '@/data/repairServices';
import { pickPrimaryPriceItem, resolveSelectorServiceIds, pickLocalizedField } from '@/lib/pricing/resolveServicePricing';

const PLACEHOLDER = '/images/placeholders/phone.webp';

// ----- Sorting helpers (same as SeriesGrid) -----
const YEAR_FALLBACK = -Infinity;
const normYear = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : YEAR_FALLBACK;
};
const byYearDescThenNameAsc = (a, b) => {
  const ya = normYear(a.year);
  const yb = normYear(b.year);
  if (yb !== ya) return yb - ya;
  const na = String(a.name || a.slug || '').toLowerCase();
  const nb = String(b.name || b.slug || '').toLowerCase();
  if (na < nb) return -1;
  if (na > nb) return 1;
  return 0;
};

// ----- repairServices lookup -----
const serviceMap = Object.fromEntries((repairServices || []).map((svc) => [svc.id, svc]));

function getServiceLabel(id) {
  const meta = serviceMap[id] || serviceMap[String(id || '').replace(/^phone-/, '')];
  if (meta?.title) return meta.title;
  // Fallback: humanize the id
  return String(id || '').replace(/-/g, ' ') || 'Remonta cena';
}

export default function ServicePricelist({
  devices = [],
  pricing = {},
  serviceMeta = {},
  brandSlug,
  categorySlug = 'telefonu-remonts',
  serviceIds = [],
  title = 'Cenas pēc modeļa',
  intro,
  viewAllHref = null,
  cta = { label: 'Pieteikties', href: '#pieteikties' },
  seriesExtractor,
  className,
  locale = 'lv',
}) {
  const anchorRef = useRef(null);
  const strings = locale === 'ru'
    ? { request: 'по запросу', price: 'Цена ремонта', other: 'Другие модели', empty: 'Для этого бренда пока нет добавленных моделей.', all: 'Смотреть все модели', from: 'от' }
    : { request: 'pēc pieprasījuma', price: 'Remonta cena', other: 'Citi modeļi', empty: 'Šim zīmolam pašlaik nav pievienotu modeļu.', all: 'Skatīt visus modeļus', from: 'no' };

  // Normalize serviceIds so it never crashes if null/undefined is passed
  const normalizedServiceIds = useMemo(
    () => (Array.isArray(serviceIds) ? serviceIds : []),
    [serviceIds]
  );
  const hasPriority = normalizedServiceIds.length > 0;
  const getLineLabel = (line) => line?.title || pickLocalizedField(serviceMeta?.[line?.id]?.labels, locale) || getServiceLabel(line?.id);

  // Group devices by series, using proper sorting
  const groups = useMemo(() => {
    // 1) filter (❗️DO NOT require pricing here)
    const filtered = devices.filter(
      (d) =>
        (d.brandSlug || '').toLowerCase() === (brandSlug || '').toLowerCase() &&
        (!categorySlug ||
          (d.category || '').toLowerCase() === String(categorySlug).toLowerCase())
    );

    // 2) sort devices globally
    filtered.sort(byYearDescThenNameAsc);

    // 3) group by series label
    const map = new Map();
    for (const d of filtered) {
      const label =
        (typeof seriesExtractor === 'function' ? seriesExtractor(d) : d.series || strings.other) ||
        strings.other;
      if (!map.has(label)) map.set(label, []);
      map.get(label).push(d);
    }

    // 4) sort devices inside each group
    const groupArr = Array.from(map.entries()).map(([label, items]) => ({
      label,
      items: [...items].sort(byYearDescThenNameAsc),
    }));

    // 5) sort groups by newest model year, then label
    groupArr.sort((a, b) => {
      const maxA = Math.max(...a.items.map((d) => normYear(d.year)), YEAR_FALLBACK);
      const maxB = Math.max(...b.items.map((d) => normYear(d.year)), YEAR_FALLBACK);
      if (maxA !== maxB) return maxB - maxA;
      return a.label.localeCompare(b.label, 'lv');
    });

    return groupArr;
  }, [devices, brandSlug, categorySlug, seriesExtractor, strings.other]);

  // ----- state -----
  const [expandedSeries, setExpandedSeries] = useState(() => groups[0]?.label || null);
  const [activeSlug, setActiveSlug] = useState(() => groups[0]?.items?.[0]?.slug || null);

  useEffect(() => {
    setExpandedSeries(groups[0]?.label || null);
    setActiveSlug(groups[0]?.items?.[0]?.slug || null);
  }, [groups]);

  // Find active device
  const activeDevice = useMemo(
    () => groups.flatMap((g) => g.items).find((d) => d.slug === activeSlug) || null,
    [groups, activeSlug]
  );

  // ----- pricing helpers -----
  function isRequestPrice(v) {
    // Treat empty string as "pēc pieprasījuma"
    return typeof v !== 'number' || !Number.isFinite(v);
  }

  const formatPrice = (v) => {
    if (isRequestPrice(v)) return strings.request;
    if (typeof v === 'number') return `€ ${v}`;
    return String(v);
  };

  function pickPrimaryInfo(slug) {
    const p = pricing?.[slug];
    if (!p) return { line: null, sid: null };
    const items = Array.isArray(p.items) ? p.items : [];

    const line = pickPrimaryPriceItem(items, normalizedServiceIds);
    return { line, sid: line?.id || null };
  }

  const { line: primaryLine, sid: primarySid } = useMemo(
    () => (activeDevice ? pickPrimaryInfo(activeDevice.slug) : { line: null, sid: null }),
    // include normalizedServiceIds to react to changes safely
    [activeDevice, pricing, hasPriority, normalizedServiceIds]
  );

  // image fallback
  const [imgSrc, setImgSrc] = useState(PLACEHOLDER);
  useEffect(() => {
    setImgSrc(resolveImageSrc(activeDevice));
  }, [activeDevice]);

  function resolveImageSrc(d) {
    const raw = (d?.image && String(d.image).trim()) || '';
    if (!raw) return PLACEHOLDER;
    if (raw.startsWith('/')) return raw;
    if (!raw.startsWith('http')) return `/${raw.replace(/^\/+/, '')}`;
    return raw || PLACEHOLDER;
  }

  const onPick = (slug) => {
    setActiveSlug(slug);
    if (anchorRef.current) {
      const top = anchorRef.current.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // compute variant list EXCLUDING primary
  // - if serviceIds provided => preserve order, include only those
  // - else => show all items (including "pēc pieprasījuma") so /cenas can display everything
  const variantLines = useMemo(() => {
    const p = activeDevice ? pricing?.[activeDevice.slug] : null;
    if (!p) return [];
    const items = Array.isArray(p.items) ? p.items : [];

    const ordered = hasPriority
      ? resolveSelectorServiceIds(normalizedServiceIds, items)
          .map((sid) => items.find((it) => it.id === sid))
          .filter(Boolean)
      : items;

    return ordered.filter((it) => it?.id && it.id !== primarySid);
  }, [pricing, activeDevice, hasPriority, normalizedServiceIds, primarySid]);

  // ----- render -----
  if (!groups.length) {
    return (
      <section className={`${s.section} ${className || ''}`} aria-labelledby="sp-title">
        <div className={s.container}>
          <header className={s.header}>
            <h2 id="sp-title" className={s.sectionTitle}>
              {title}
            </h2>
            {intro && <p className={s.intro}>{intro}</p>}
          </header>
          <p className={s.emptyAll}>{strings.empty}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${s.section} ${className || ''}`} aria-labelledby="sp-title">
      <div className={s.container}>
        <header className={s.header}>
          <h2 id="sp-title" className={s.sectionTitle}>
            {title}
          </h2>
          {intro && <p className={s.intro}>{intro}</p>}
        </header>

        <div className={s.layout}>
          {/* LEFT: preview */}
          <div className={s.left} ref={anchorRef}>
            <div className={s.previewCard}>
              <div className={s.previewHeader}>
                <span className={s.modelName}>{activeDevice?.name}</span>
                {activeDevice?.year && <span className={s.modelYear}>{activeDevice.year}</span>}
                <span className={s.modelSeries}>{activeDevice?.series || strings.other}</span>
              </div>

              <div className={s.imageWrap}>
                <Image
                  src={imgSrc}
                  alt={activeDevice?.name || 'Tālrunis'}
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className={s.image}
                  onError={() => setImgSrc(PLACEHOLDER)}
                  unoptimized
                />
              </div>

              <div className={s.previewBody}>
                <div className={s.priceRow}>
                  <span className={s.priceLabel}>
                    {primaryLine ? getLineLabel(primaryLine) : strings.price}
                  </span>
                  <span className={s.priceValue}>{primaryLine?.isStartingFrom && !isRequestPrice(primaryLine.price) ? strings.from + ' ' : ''}{formatPrice(primaryLine?.price)}</span>
                </div>

                {variantLines.length > 0 && (
                  <ul className={s.altList}>
                    {variantLines.map((line) => (
                      <li key={line.id} className={s.altItem}>
                        <span className={s.altLabel}>{getLineLabel(line)}</span>
                        <span className={s.altPrice}>{line.isStartingFrom && !isRequestPrice(line.price) ? strings.from + ' ' : ''}{formatPrice(line.price)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {cta?.href && (
                  <Link href={cta.href} className={s.ctaBtn}>
                    {cta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: controlled accordion */}
          <div className={s.right}>
            <ul className={s.accordionList}>
              {groups.map(({ label, items }) => {
                const open = expandedSeries === label;
                return (
                  <li key={label}>
                    <details className={s.accItem} open={open}>
                      <summary
                        className={s.summary}
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedSeries((prev) => {
                            const opening = prev !== label;
                            if (opening) {
                              const first = items?.[0];
                              if (first?.slug) setActiveSlug(first.slug);
                              return label;
                            }
                            return null;
                          });
                        }}
                      >
                        <span className={s.accTitle}>{label}</span>
                        <span className={s.chev} aria-hidden="true" />
                      </summary>

                      <div className={s.panel}>
                        <ol className={s.modelList}>
                          {items.map((d) => {
                            const isActive = d.slug === activeSlug;
                            return (
                              <li key={d.slug} className={s.modelItem}>
                                <span
                                  role="button"
                                  tabIndex={0}
                                  className={isActive ? s.modelLinkActive : s.modelLink}
                                  onClick={() => onPick(d.slug)}
                                  onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && onPick(d.slug)
                                  }
                                  aria-current={isActive ? 'true' : undefined}
                                >
                                  {d.name}
                                </span>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </details>
                  </li>
                );
              })}
            </ul>

            {viewAllHref && (
              <Link href={viewAllHref} className={s.allLink}>
                {strings.all}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
