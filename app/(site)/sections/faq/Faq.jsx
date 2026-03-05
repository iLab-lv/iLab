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
 */
export default function Faq({
  id = 'faq',
  title = 'Biežāk uzdotie jautājumi',
  items = [],
  openAll = false,
  className = '',
}) {
  return (
    <section
      id={id}
      className={`${s.section} ${className}`}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div className={s.container}>
        {title ? (
          <h2 id={`${id}-title`} className={s.sectionTitle}>
            {title}
          </h2>
        ) : null}

        {/* ✅ No role="list" here — <details> accordion is already accessible */}
        <div className={s.faqList}>
          {items.map(({ q, a }, i) => (
            <details
              key={`${id}-item-${i}-${String(q)}`}
              className={s.faqItem}
              {...(openAll ? { open: true } : {})}
            >
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