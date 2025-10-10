'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import s from './Faq.module.scss';

/**
 * Shared FAQ section
 *
 * Props:
 * - id: string (anchor + aria base)
 * - title: string (LV)
 * - items?: Array<{ q: string, a: React.ReactNode, id?: string }>
 * - groups?: Array<{ label: string, items: Array<{ q, a, id? }> }>
 * - headingLevel: 2 | 3
 * - variant: 'accordion' | 'list'
 * - defaultOpen: number | 'all'
 * - className?: string
 *
 * Notes:
 * - Accepts either `items` OR `groups` (groups have priority).
 * - JSON-LD handled at PAGE level.
 */
export default function Faq({
  id = 'faq',
  title = 'Biežāk uzdotie jautājumi',
  items = [],
  groups,
  headingLevel = 2,
  variant = 'accordion',
  defaultOpen,
  className,
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';

  const slugify = (str) =>
    (str || '')
      .toString()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();

  // Flatten all items (for deep-link support)
  const allItems = useMemo(() => {
    if (groups?.length) {
      return groups.flatMap((g) => g.items.map((it) => ({ ...it, _group: g.label })));
    }
    return items;
  }, [items, groups]);

  const enriched = useMemo(() => {
    return allItems.map((it, idx) => {
      const sid = it.id || slugify(it.q || `q-${idx}`);
      return { ...it, _slug: sid };
    });
  }, [allItems]);

  // Deep-link support
  useEffect(() => {
    if (variant !== 'accordion' || typeof window === 'undefined') return;
    const hash = (window.location.hash || '').replace(/^#/, '');
    if (!hash) return;
    if (!hash.startsWith(`${id}-`)) return;
    const el = document.getElementById(hash);
    if (el && 'open' in el && typeof el.open !== 'undefined') {
      el.open = true;
    }
  }, [id, variant]);

  // Small helper to render one list (accordion or static)
  const renderList = (list, sectionKey) => {
    if (variant === 'list') {
      return (
        <dl className={s.faqList}>
          {list.map((it) => (
            <div key={it._slug} className={s.faqItem} id={`${id}-${it._slug}`}>
              <dt className={s.q}>{it.q}</dt>
              <dd className={s.a}>{it.a}</dd>
            </div>
          ))}
        </dl>
      );
    }

    return (
      <div className={s.faqList}>
        {list.map((it, idx) => {
          const isOpen =
            defaultOpen === 'all'
              ? true
              : typeof defaultOpen === 'number'
              ? defaultOpen === idx
              : undefined;

          return (
            <details
              key={`${sectionKey}-${it._slug}`}
              className={s.faqItem}
              id={`${id}-${it._slug}`}
              {...(isOpen ? { open: true } : {})}
            >
              <summary className={s.summary}>
                <span>{it.q}</span>
                <span className={s.chev} aria-hidden="true" />
              </summary>
              <div className={s.answer}>
                <p>{it.a}</p>
              </div>
            </details>
          );
        })}
      </div>
    );
  };

  return (
    <section id={id} className={`${s.section} ${className || ''}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>
          {title}
        </Heading>

        {/* Render grouped or flat */}
        {groups?.length ? (
          groups.map((group, gi) => (
            <div key={group.label || gi} className={s.group}>
              {group.label && (
                <h3 className={s.groupTitle}>{group.label}</h3>
              )}
              {renderList(
                group.items.map((it, idx) => ({
                  ...it,
                  _slug: it.id || slugify(it.q || `q-${gi}-${idx}`),
                })),
                `g${gi}`
              )}
            </div>
          ))
        ) : (
          renderList(enriched, 'flat')
        )}
      </div>
    </section>
  );
}
