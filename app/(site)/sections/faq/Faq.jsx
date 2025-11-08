'use client';

import s from './Faq.module.scss';

/**
 * Minimal FAQ (accordion-only)
 *
 * Props:
 * - id?: string
 * - title?: string
 * - items: Array<{ q: string, a: React.ReactNode }>
 * - openAll?: boolean
 * - className?: string
 *
 * Notes:
 * - No groups, no deep links, no heading level, no variants.
 * - Answers can be strings or React nodes (e.g., fragments with <Link>).
 */
export default function Faq({
  id = 'faq',
  title = 'Biežāk uzdotie jautājumi',
  items = [],
  openAll = false,
  className = '',
}) {
  return (
    <section id={id} className={`${s.section} ${className}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        {title ? (
          <h2 id={`${id}-title`} className={s.sectionTitle}>
            {title}
          </h2>
        ) : null}

        <div className={s.faqList} role="list">
          {items.map(({ q, a }, i) => (
            <details key={i} className={s.faqItem} {...(openAll ? { open: true } : {})}>
              <summary className={s.summary}>
                <span>{q}</span>
                <span className={s.chev} aria-hidden="true" />
              </summary>
              <div className={s.answer}>
                {typeof a === 'string' ? <p>{a}</p> : a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
