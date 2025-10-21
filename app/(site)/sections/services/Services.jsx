// app/(site)/sections/services/Services.jsx
import Link from 'next/link';
import s from './Services.module.scss';

/**
 * Cards-only Services section (presentational).
 *
 * Props:
 * - id?: string
 * - title: string
 * - items: Array<{
 *     title: string,
 *     text?: string,
 *     href?: string,                   // full URL; provide it from the page
 *     icon?: React.ElementType | JSX.Element  // e.g., LuBatteryCharging OR <LuBatteryCharging />
 *   }>
 * - headingLevel?: 2 | 3 (default 2)
 * - className?: string
 *
 * Notes:
 * - This component is display-only; pages supply content & icons.
 * - Icons must be passed as components/elements (no string keys).
 * - If `href` is missing, we render a non-clickable card.
 */
export default function Services({
  id = 'services',
  title = 'Populārākie remonti',
  items = [],
  headingLevel = 2,
  className,
}) {
  if (!items || items.length === 0) return null;

  const Heading = headingLevel === 3 ? 'h3' : 'h2';

  function renderIcon(iconProp) {
    if (!iconProp) return null;
    // If a component type is provided (function), render it with a standard size.
    if (typeof iconProp === 'function') {
      const Icon = iconProp;
      return <Icon size={28} aria-hidden="true" />;
    }
    // Otherwise assume a ready-made React element (<Icon />) was passed.
    return iconProp;
  }

  return (
    <section id={id} className={`${s.section} ${className || ''}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>{title}</Heading>

        <div className={s.cards} role="list">
          {items.map((it) => {
            const IconEl = renderIcon(it.icon);
            const CardInner = (
              <>
                {IconEl ? <span className={s.cardIcon}>{IconEl}</span> : null}

                <span className={s.cardContent}>
                  <span className={s.itemTitle}>{it.title}</span>
                  {it.text ? <span className={s.itemText}>{it.text}</span> : null}
                </span>
              </>
            );

            return (
              <article key={it.title} className={s.card} role="listitem">
                {it.href ? (
                  <Link href={it.href} className={s.cardLink}>
                    {CardInner}
                  </Link>
                ) : (
                  <div className={s.cardLink} role="group" aria-label={it.title}>
                    {CardInner}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
