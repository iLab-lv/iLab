// app/(site)/sections/services/Services.jsx
import Link from 'next/link';
import s from './Services.module.scss';

/**
 * Reusable “Services” section for popular repairs.
 *
 * Props:
 * - id: 'services' | string            (defaults to "services")
 * - title: string                      (LV; required for a11y/SEO)
 * - items: Array<{ title, text?, href? }>
 * - headingLevel: 2 | 3                (default 2)
 * - variant: 'list' | 'cards'          (default 'list')
 */
export default function Services({
  id = 'services',
  title = 'Populārākie remonti',
  items = [],
  headingLevel = 2,
  variant = 'list',
  className,
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';

  if (!items || items.length === 0) return null;

  return (
    <section id={id} className={`${s.section} ${className || ''}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>{title}</Heading>

        {variant === 'cards' ? (
          <div className={s.cards} role="list">
            {items.map((it) => (
              <article key={it.title} className={s.card} role="listitem">
                <h3 className={s.itemTitle}>
                  {it.href ? <Link href={it.href}>{it.title}</Link> : it.title}
                </h3>
                {it.text && <p className={s.itemText}>{it.text}</p>}
              </article>
            ))}
          </div>
        ) : (
          <ul className={s.list}>
            {items.map((it) => (
              <li key={it.title}>
                {it.href ? (
                  <>
                    <strong><Link href={it.href}>{it.title}</Link></strong>
                    {it.text ? <> — {it.text}</> : null}
                  </>
                ) : (
                  <>
                    <strong>{it.title}</strong>
                    {it.text ? <> — {it.text}</> : null}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
