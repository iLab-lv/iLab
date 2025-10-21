'use client';

import Link from 'next/link';
import s from './PriceList.module.scss';
import { useUiDialogs } from '../../ui/providers/UiDialogsProvider';

// legacy fallback (kept for safety)
function fmtTime(min, max) {
  if (!min && !max) return 'Tajā pašā dienā';
  if (min && max) {
    if (max >= 120) return 'Tajā pašā dienā';
    return `${min}–${max} min`;
  }
  if (max) return max >= 120 ? 'Tajā pašā dienā' : `līdz ${max} min`;
  return `${min} min`;
}

// NEW: prefer textual time if provided
function fmtTimeText(timeText, min, max) {
  if (typeof timeText === 'string' && timeText.trim()) {
    return timeText.trim();
  }
  return fmtTime(min, max);
}

// legacy fallback (kept for safety)
function fmtPrice(from, to, currency = 'EUR') {
  const euro = (n) => `${n.toFixed(0)} €`;
  if (from && to && to !== from) return `${euro(from)}–${euro(to)}`;
  if (from) return `no ${euro(from)}`;
  if (to) return euro(to);
  return '—';
}

// NEW: prefer plain text price if provided
function fmtPriceText(item, currency = 'EUR') {
  const t = (item.price || '').trim();
  if (t) {
    // Add € if looks numeric, a range, or "no <num>"
    const numericLike =
      /^[0-9]+([.,][0-9]+)?(\s*[–-]\s*[0-9]+([.,][0-9]+)?)?$/.test(t) ||
      /^no\s*[0-9]/i.test(t);
    return numericLike ? `${t.replace(/\s+/g, ' ')} €` : t;
  }
  // Fallback to legacy from/to
  return fmtPrice(item.priceFrom, item.priceTo, currency);
}

export default function PriceList({
  id = 'cenas',
  title = 'Cenas un remonta laiks',
  items = [],
  currency = 'EUR',
  headingLevel = 2,
  bookLabel = 'Pieraksties',
  showNotes = true,
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const { openContact } = useUiDialogs();

  if (!items || items.length === 0) return null;

  // Keep incoming order; do NOT sort by popularity anymore
  const rows = items;

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.title}>{title}</Heading>

        {/* Desktop table */}
        <div className={s.table} role="table" aria-label={title}>
          <div className={`${s.tr} ${s.head}`} role="row">
            <div className={s.th} role="columnheader">Pakalpojums</div>
            <div className={s.th} role="columnheader">Laiks</div>
            <div className={s.th} role="columnheader">Cena</div>
            <div className={s.th} role="columnheader"> </div>
          </div>

          {rows.map((it) => (
            <div key={it.id || it.title} className={s.tr} role="row">
              <div className={s.td} role="cell">
                <div className={s.serviceCell}>
                  {/* Popular badge removed */}
                  <div className={s.serviceTitle}>
                    {it.href ? <Link href={it.href}>{it.title}</Link> : it.title}
                  </div>
                </div>
              </div>
              <div className={s.td} role="cell">
                <span className={s.chip}>{fmtTimeText(it.timeText, it.timeMin, it.timeMax)}</span>
              </div>
              <div className={s.td} role="cell">
                <span className={s.price}>{fmtPriceText(it, currency)}</span>
              </div>
              <div className={s.td} role="cell">
                <button
                  type="button"
                  className={s.bookBtn}
                  onClick={(e) => openContact?.(e.currentTarget)}
                  aria-haspopup="dialog"
                  aria-controls="sazinaties-panel"
                >
                  {bookLabel}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className={s.cards} aria-label={title}>
          {rows.map((it) => (
            <article key={`m-${it.id || it.title}`} className={s.card}>
              <header className={s.cardHead}>
                <div className={s.serviceTitle}>
                  {it.href ? <Link href={it.href}>{it.title}</Link> : it.title}
                </div>
                {/* Popular badge removed */}
              </header>
              <div className={s.metaRow}>
                <span className={s.chip}>{fmtTimeText(it.timeText, it.timeMin, it.timeMax)}</span>
                <span className={s.price}>{fmtPriceText(it, currency)}</span>
              </div>
              <div className={s.ctaRow}>
                <button
                  type="button"
                  className={s.bookBtn}
                  onClick={(e) => openContact?.(e.currentTarget)}
                  aria-haspopup="dialog"
                  aria-controls="sazinaties-panel"
                >
                  {bookLabel}
                </button>
              </div>
            </article>
          ))}
        </div>

        {showNotes && (
          <ul className={s.notes} role="note">
            <li>Bezmaksas diagnostika. Precīzu cenu apstiprinām pēc pārbaudes.</li>
            <li>90 dienu garantija visiem remontdarbiem.</li>
            <li>Cenas norādītas ar detaļu un darba izmaksām.</li>
          </ul>
        )}
      </div>
    </section>
  );
}
