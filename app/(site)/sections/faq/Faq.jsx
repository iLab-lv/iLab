'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import s from './Faq.module.scss';

/**
 * Shared FAQ section
 *
 * Props:
 * - id: string (anchor + aria base). e.g., "faq" or "iphone-faq"
 * - title: string (LV) — default "Biežāk uzdotie jautājumi"
 * - items: Array<{ q: string, a: React.ReactNode, id?: string, ldAnswerText?: string }>
 * - headingLevel: 2 | 3 (keeps proper heading hierarchy per page). default 2
 * - variant: 'accordion' | 'list' — default 'accordion' (<details>/<summary>)
 * - defaultOpen: number | 'all' — which item(s) open by default (accordion variant)
 * - className?: string
 *
 * Notes:
 * - JSON-LD is handled at the PAGE level (recommended) using the same items array.
 * - Each item gets a stable anchor: #${id}-${slug}
 */
export default function Faq({
  id = 'faq',
  title = 'Biežāk uzdotie jautājumi',
  items = [],
  headingLevel = 2,
  variant = 'accordion',
  defaultOpen,
  className,
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';

  const enriched = useMemo(() => {
    const slugify = (str) =>
      (str || '')
        .toString()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();

    return items.map((it, idx) => {
      const sid = it.id || slugify(it.q || `q-${idx}`);
      return { ...it, _slug: sid };
    });
  }, [items]);

  // Deep-link support: open a specific question if URL hash matches
  useEffect(() => {
    if (variant !== 'accordion' || typeof window === 'undefined') return;
    const hash = (window.location.hash || '').replace(/^#/, '');
    if (!hash) return;
    // Only open if this section's id matches the prefix
    if (!hash.startsWith(`${id}-`)) return;
    const el = document.getElementById(hash);
    if (el && 'open' in el && typeof el.open !== 'undefined') {
      el.open = true;
      // Optional: bring it into view without jumping too hard
      // el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [id, variant]);

  return (
    <section id={id} className={`${s.section} ${className || ''}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>{title}</Heading>

        {variant === 'list' ? (
          <dl className={s.faqList}>
            {enriched.map((it) => (
              <div key={it._slug} className={s.faqItem} id={`${id}-${it._slug}`}>
                <dt className={s.q}>{it.q}</dt>
                <dd className={s.a}>{it.a}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className={s.faqList}>
            {enriched.map((it, idx) => {
              const isOpen =
                defaultOpen === 'all' ? true :
                typeof defaultOpen === 'number' ? defaultOpen === idx : undefined;

              return (
                <details
                  key={it._slug}
                  className={s.faqItem}
                  id={`${id}-${it._slug}`}
                  {...(isOpen ? { open: true } : {})}
                >
                  <summary className={s.summary}>
                    <span>{it.q}</span>
                    <span className={s.chev} aria-hidden="true" />
                  </summary>
                  <div className={s.answer}>
                    {/* allow rich markup (links, bold, etc.) */}
                    <p>{it.a}</p>
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
