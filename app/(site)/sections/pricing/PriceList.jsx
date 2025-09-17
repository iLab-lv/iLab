'use client';

import Link from 'next/link';
import s from './PriceList.module.scss';
import { useUiDialogs } from '../../ui/providers/UiDialogsProvider';

function fmtTime(min, max) {
  if (!min && !max) return 'Tajā pašā dienā';
  if (min && max) {
    if (max >= 120) return 'Tajā pašā dienā';
    return `${min}–${max} min`;
  }
  if (max) return max >= 120 ? 'Tajā pašā dienā' : `līdz ${max} min`;
  return `${min} min`;
}

function fmtPrice(from, to, currency = 'EUR') {
  const euro = (n) => `${n.toFixed(0)} €`;
  if (from && to && to !== from) return `${euro(from)}–${euro(to)}`;
  if (from) return `no ${euro(from)}`;
  if (to) return euro(to);
  return '—';
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

  const sorted = [...items].sort((a, b) => Number(b.popular) - Number(a.popular));

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

          {sorted.map((it) => (
            <div key={it.id || it.title} className={s.tr} role="row">
              <div className={s.td} role="cell">
                <div className={s.serviceCell}>
                  {it.popular && <span className={s.badge}>Populārs</span>}
                  <div className={s.serviceTitle}>
                    {it.href ? <Link href={it.href}>{it.title}</Link> : it.title}
                  </div>
                </div>
              </div>
              <div className={s.td} role="cell">
                <span className={s.chip}>{fmtTime(it.timeMin, it.timeMax)}</span>
              </div>
              <div className={s.td} role="cell">
                <span className={s.price}>{fmtPrice(it.priceFrom, it.priceTo, currency)}</span>
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
          {sorted.map((it) => (
            <article key={`m-${it.id || it.title}`} className={s.card}>
              <header className={s.cardHead}>
                <div className={s.serviceTitle}>
                  {it.href ? <Link href={it.href}>{it.title}</Link> : it.title}
                </div>
                {it.popular && <span className={s.badge}>Populārs</span>}
              </header>
              <div className={s.metaRow}>
                <span className={s.chip}>{fmtTime(it.timeMin, it.timeMax)}</span>
                <span className={s.price}>{fmtPrice(it.priceFrom, it.priceTo, currency)}</span>
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
