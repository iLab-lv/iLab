'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './ServicePricelist.module.scss';

const PLACEHOLDER = '/images/placeholders/phone.webp';

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

function getStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      requestPrice: 'по запросу',
      defaultPriceLabel: 'Цена ремонта',
      emptyAll: 'Для этого бренда пока нет добавленных моделей.',
      otherModels: 'Другие модели',
      viewAll: 'Смотреть все модели',
      fromPrefix: 'от',
    };
  }

  return {
    requestPrice: 'pēc pieprasījuma',
    defaultPriceLabel: 'Remonta cena',
    emptyAll: 'Šim zīmolam pašlaik nav pievienotu modeļu.',
    otherModels: 'Citi modeļi',
    viewAll: 'Skatīt visus modeļus',
    fromPrefix: 'no',
  };
}

function pickLocalizedField(value, locale = 'lv', fallback = 'lv') {
  if (!value) return '';

  if (typeof value === 'string') return value.trim();

  if (typeof value === 'object') {
    if (typeof value[locale] === 'string' && value[locale].trim()) {
      return value[locale].trim();
    }
    if (typeof value[fallback] === 'string' && value[fallback].trim()) {
      return value[fallback].trim();
    }
  }

  return '';
}

function resolveImageSrc(d) {
  const raw = (d?.image && String(d.image).trim()) || '';
  if (!raw) return PLACEHOLDER;
  if (raw.startsWith('/')) return raw;
  if (!raw.startsWith('http')) return `/${raw.replace(/^\/+/, '')}`;
  return raw || PLACEHOLDER;
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
  variant = 'default',
  locale = 'lv',
  selectedModel = null,
}) {
  const anchorRef = useRef(null);
  const strings = getStrings(locale);

  const normalizedServiceIds = useMemo(
    () => (Array.isArray(serviceIds) ? serviceIds : []),
    [serviceIds]
  );

  const hasPriority = normalizedServiceIds.length > 0;

  function getServiceLabel(id) {
    const meta = serviceMeta?.[id];
    const localized =
      pickLocalizedField(meta?.labels, locale) ||
      pickLocalizedField(meta?.title, locale);

    if (localized) return localized;

    return String(id || '').replace(/-/g, ' ') || strings.defaultPriceLabel;
  }

  const groups = useMemo(() => {
    const filtered = devices.filter((d) => {
      const devicePickerBrand = (d.pickerBrandSlug || d.brandSlug || '').toLowerCase();
      const targetBrand = (brandSlug || '').toLowerCase();

      if (devicePickerBrand !== targetBrand) return false;

      if (!categorySlug) return true;
      return (d.category || '').toLowerCase() === String(categorySlug).toLowerCase();
    });

    filtered.sort(byYearDescThenNameAsc);

    const map = new Map();

    for (const d of filtered) {
      const label =
        (typeof seriesExtractor === 'function'
          ? seriesExtractor(d)
          : d.series || strings.otherModels) || strings.otherModels;

      if (!map.has(label)) map.set(label, []);
      map.get(label).push(d);
    }

    const groupArr = Array.from(map.entries()).map(([label, items]) => ({
      label,
      items: [...items].sort(byYearDescThenNameAsc),
    }));

    groupArr.sort((a, b) => {
      const maxA = Math.max(...a.items.map((d) => normYear(d.year)), YEAR_FALLBACK);
      const maxB = Math.max(...b.items.map((d) => normYear(d.year)), YEAR_FALLBACK);
      if (maxA !== maxB) return maxB - maxA;
      return a.label.localeCompare(b.label, locale === 'ru' ? 'ru' : 'lv');
    });

    return groupArr;
  }, [devices, brandSlug, categorySlug, seriesExtractor, strings.otherModels, locale]);

  const firstSlug = groups[0]?.items?.[0]?.slug || null;
  const initialSlug =
    selectedModel && groups.flatMap((g) => g.items).some((d) => d.slug === selectedModel)
      ? selectedModel
      : firstSlug;

  const [expandedSeries, setExpandedSeries] = useState(() => {
    if (!initialSlug) return groups[0]?.label || null;
    const group = groups.find((g) => g.items.some((d) => d.slug === initialSlug));
    return group?.label || groups[0]?.label || null;
  });

  const [activeSlug, setActiveSlug] = useState(initialSlug);

  useEffect(() => {
    const nextInitial =
      selectedModel && groups.flatMap((g) => g.items).some((d) => d.slug === selectedModel)
        ? selectedModel
        : groups[0]?.items?.[0]?.slug || null;

    const nextGroup = groups.find((g) => g.items.some((d) => d.slug === nextInitial));

    setExpandedSeries(nextGroup?.label || groups[0]?.label || null);
    setActiveSlug(nextInitial);
  }, [groups, selectedModel]);

  const activeDevice = useMemo(
    () => groups.flatMap((g) => g.items).find((d) => d.slug === activeSlug) || null,
    [groups, activeSlug]
  );

  const [imgSrc, setImgSrc] = useState(PLACEHOLDER);

  useEffect(() => {
    setImgSrc(resolveImageSrc(activeDevice));
  }, [activeDevice]);

  function hasDisplayPrice(v) {
    return typeof v === 'number' && Number.isFinite(v);
  }

  function formatPrice(line) {
    if (!line || !hasDisplayPrice(line.price)) return strings.requestPrice;

    const value = `€ ${line.price.toFixed(0)}`;
    return line.isStartingFrom ? `${strings.fromPrefix} ${value}` : value;
  }

  function pickPrimaryInfo(slug) {
    const p = pricing?.[slug];
    if (!p) return { line: null, sid: null };

    const items = Array.isArray(p.items) ? p.items : [];

    if (hasPriority) {
      for (const sid of normalizedServiceIds) {
        const found = items.find((it) => it.id === sid && hasDisplayPrice(it.price));
        if (found) return { line: found, sid };
      }
    }

    const anyPriced = items.find((it) => hasDisplayPrice(it.price)) || null;
    if (anyPriced) return { line: anyPriced, sid: anyPriced.id || null };

    const fallbackSid = normalizedServiceIds[0] || items[0]?.id || null;
    const fallbackLine =
      items.find((it) => it.id === fallbackSid) ||
      items[0] ||
      (fallbackSid ? { id: fallbackSid, price: null, isStartingFrom: false } : null);

    return { line: fallbackLine, sid: fallbackSid };
  }

  const { line: primaryLine, sid: primarySid } = useMemo(
    () => (activeDevice ? pickPrimaryInfo(activeDevice.slug) : { line: null, sid: null }),
    [activeDevice, pricing, hasPriority, normalizedServiceIds]
  );

  const variantLines = useMemo(() => {
    const p = activeDevice ? pricing?.[activeDevice.slug] : null;
    const items = Array.isArray(p?.items) ? p.items : [];

    const ordered = hasPriority
      ? normalizedServiceIds.map(
          (sid) =>
            items.find((it) => it.id === sid) || {
              id: sid,
              price: null,
              isStartingFrom: false,
            }
        )
      : items;

    return ordered.filter((it) => it?.id && it.id !== primarySid);
  }, [pricing, activeDevice, hasPriority, normalizedServiceIds, primarySid]);

  const onPick = (slug) => {
    setActiveSlug(slug);
    if (anchorRef.current) {
      const top = anchorRef.current.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (!groups.length) {
    return (
      <section
        className={`${s.section} ${variant === 'iphone-screen' ? s.iphoneScreen : ''} ${className || ''}`}
        aria-labelledby="sp-title"
      >
        <div className={s.container}>
          <header className={s.header}>
            <h2 id="sp-title" className={s.sectionTitle}>
              {title}
            </h2>
            {intro && <p className={s.intro}>{intro}</p>}
          </header>
          <p className={s.emptyAll}>{strings.emptyAll}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${s.section} ${variant === 'iphone-screen' ? s.iphoneScreen : ''} ${className || ''}`}
      aria-labelledby="sp-title"
    >
      <div className={s.container}>
        <header className={s.header}>
          <h2 id="sp-title" className={s.sectionTitle}>
            {title}
          </h2>
          {intro && <p className={s.intro}>{intro}</p>}
        </header>

        <div className={s.layout}>
          <div className={s.left} ref={anchorRef}>
            <div className={s.previewCard}>
              <div className={s.previewHeader}>
                <span className={s.modelName}>{activeDevice?.name}</span>
                {activeDevice?.year && <span className={s.modelYear}>{activeDevice.year}</span>}
                <span className={s.modelSeries}>{activeDevice?.series || strings.otherModels}</span>
              </div>

              <div className={s.imageWrap}>
                <Image
                  src={imgSrc}
                  alt={activeDevice?.name || 'Device'}
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
                    {primarySid ? getServiceLabel(primarySid) : strings.defaultPriceLabel}
                  </span>
                  <span className={s.priceValue}>{formatPrice(primaryLine)}</span>
                </div>

                {variantLines.length > 0 && (
                  <ul className={s.altList}>
                    {variantLines.map((line) => (
                      <li key={line.id} className={s.altItem}>
                        <span className={s.altLabel}>{getServiceLabel(line.id)}</span>
                        <span className={s.altPrice}>{formatPrice(line)}</span>
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
                {strings.viewAll}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
