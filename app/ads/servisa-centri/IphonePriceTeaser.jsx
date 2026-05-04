'use client';

import Link from 'next/link';

import sCatalog from '@styles/Catalog.module.scss';
import s from './IphonePriceTeaser.module.scss';

import Button from '@components/button/Button';
import devicePricing from '@/data/devicePricing';
import { useUiDialogs } from '@ui/providers/UiDialogsProvider';

// Default featured models (8 items)
// Removed: iPhone 16 Pro Max, iPhone 15
const DEFAULT_FEATURED_MODELS = [
  { slug: 'iphone-16-pro', name: 'iPhone 16 Pro', image: '/images/devices/iphone/iphone-16-pro.webp' },
  { slug: 'iphone-16-plus', name: 'iPhone 16 Plus', image: '/images/devices/iphone/iphone-16-plus.webp' },
  { slug: 'iphone-16', name: 'iPhone 16', image: '/images/devices/iphone/iphone-16.webp' },
  { slug: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', image: '/images/devices/iphone/iPhone-15-Pro-Max.webp' },
  { slug: 'iphone-15-pro', name: 'iPhone 15 Pro', image: '/images/devices/iphone/iPhone-15-Pro.webp' },
  { slug: 'iphone-14-pro', name: 'iPhone 14 Pro', image: '/images/devices/iphone/iPhone-14-Pro.webp' },
  { slug: 'iphone-13-pro', name: 'iPhone 13 Pro', image: '/images/devices/iphone/iPhone-13-Pro.webp' },
  { slug: 'iphone-11', name: 'iPhone 11', image: '/images/devices/iphone/iphone-11.webp' },
];

// Default for generic /ads/iphone-remonts: show minimum "from" price across screen options
const DEFAULT_PRICE_ITEMS = [
  {
    label: 'Ekrāna maiņa',
    ids: ['display-incell', 'display-oled', 'display-original'],
    mode: 'min',
    from: true,
  },
  {
    label: 'Baterijas maiņa',
    ids: ['battery'],
    mode: 'first',
    from: false,
  },
];


function getItemPrice(slug, id) {
  const cfg = devicePricing?.[slug];
  if (!cfg?.items) return null;
  const line = cfg.items.find((item) => item.id === id);
  return line?.price ?? null;
}

function formatPrice(value, { from = false } = {}) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return from ? `no ${value} €` : `${value} €`;
  return value; // assume already formatted string
}

function minNumber(values) {
  const nums = values.filter((v) => typeof v === 'number' && !Number.isNaN(v));
  if (!nums.length) return null;
  return Math.min(...nums);
}

/**
 * priceItems supports:
 *
 * A) Single-row item (ids):
 *    { label, ids: string[], mode?: 'min'|'first', from?: boolean }
 *
 * B) Multi-line item (lines):
 *    { label, lines: [{ id: string, label?: string, from?: boolean }, ...] }
 *
 * Output rows:
 *    { key, label, value }
 */
function buildRowsForModel(modelSlug, priceItems) {
  const rows = [];

  for (const item of priceItems || []) {
    // B) Multi-line explicit lines: show ALL available options
    if (Array.isArray(item.lines) && item.lines.length) {
      for (const line of item.lines) {
        const raw = getItemPrice(modelSlug, line.id);
        const val = formatPrice(raw, { from: !!line.from });
        if (!val) continue;

        rows.push({
          key: `${modelSlug}:${item.label}:${line.id}`,
          // Important: keep label short (no "Ekrāna maiņa: In-Cell")
          label: line.label || item.label,
          value: val,
        });
      }
      continue;
    }

    // A) Single-row from ids
    const ids = Array.isArray(item.ids) ? item.ids : [];
    if (!ids.length) continue;

    const rawValues = ids.map((id) => getItemPrice(modelSlug, id));
    let chosen = null;

    if (item.mode === 'min') {
      chosen = minNumber(rawValues);
    } else {
      // default: first non-empty
      chosen = rawValues.find((v) => v !== null && v !== undefined && v !== '');
    }

    const val = formatPrice(chosen, { from: !!item.from });
    if (!val) continue;

    rows.push({
      key: `${modelSlug}:${item.label}:${ids.join(',')}`,
      label: item.label,
      value: val,
    });
  }

  return rows;
}

export default function IphonePriceTeaser({
  // Content
  title = 'Precīzas cenas populārākajiem iPhone',
  intro = (
    <>
      Ekrāna maiņas cenas populārākajiem iPhone modeļiem. Pārējiem modeļiem - droši jautā,
      atbildēsim ar konkrētu piedāvājumu.
    </>
  ),

  // Data/config
  featuredModels = DEFAULT_FEATURED_MODELS,
  priceItems = DEFAULT_PRICE_ITEMS,

  // Footer actions
  allModelsHref = '/iphone-remonts',
  allModelsLabel = 'Skatīt visus iPhone modeļus un cenas',
  contactLabel = 'Sazināties par savu modeli',
}) {
  const { openContact } = useUiDialogs();

  const handleContactClick = (event) => {
    openContact(event?.currentTarget || null);
  };

  return (
    <section className={`${sCatalog.section} ${s.section}`} aria-labelledby="iphone-price-teaser-h2">
      <div className={sCatalog.container}>
        <header className={s.header}>
          <h2 id="iphone-price-teaser-h2" className={sCatalog.h2}>
            {title}
          </h2>
          <p className={sCatalog.intro}>{intro}</p>
        </header>

        <div className={s.grid}>
          {featuredModels.map((model) => {
            const rows = buildRowsForModel(model.slug, priceItems);

            return (
              <article key={model.slug} className={s.card}>
                <div className={s.thumbWrap}>
                  <img
                    src={model.image}
                    alt={model.name}
                    className={s.thumb}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className={s.model}>{model.name}</h3>

                <div className={s.priceTable}>
                  {rows.length > 0 ? (
                    rows.map((row) => (
                      <div key={row.key} className={s.priceRow}>
                        <span className={s.priceLabel}>{row.label}</span>
                        <span className={s.priceValue}>{row.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className={s.priceRowMuted}>Cena pēc pieprasījuma</div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className={s.actionsRow}>
          <Link href={allModelsHref} className={s.allLink}>
            {allModelsLabel}
          </Link>

          <Button variant="primary" size="md" onClick={handleContactClick}>
            {contactLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
