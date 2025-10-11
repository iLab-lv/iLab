// app/(site)/sections/services/Services.jsx
import Link from 'next/link';
import s from './Services.module.scss';

// Import only the icons we actually use (tree-shakes react-icons/lu)
import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuMic2,
  LuDroplets,
} from 'react-icons/lu';

/**
 * Cards-only Services section (presentational).
 *
 * Props:
 * - id?: string
 * - title: string
 * - items: Array<{
 *     title: string,
 *     text?: string,
 *     href?: string,           // full URL; provide it from the page
 *     icon?: React.ComponentType | string  // e.g., 'LuSmartphone' or LuSmartphone
 *   }>
 * - headingLevel?: 2 | 3 (default 2)
 * - className?: string
 *
 * Notes:
 * - If `href` is missing, we render a non-clickable card.
 * - `icon` can be a component OR one of the string keys in ICON_MAP.
 * - `variant` is ignored (kept only for back-compat).
 */
const ICON_MAP = {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuMic2,
  LuDroplets,
};

export default function Services({
  id = 'services',
  title = 'Populārākie remonti',
  items = [],
  headingLevel = 2,
  className,
  // legacy prop kept for back-compat but ignored (always cards)
  variant,
}) {
  if (!items || items.length === 0) return null;

  const Heading = headingLevel === 3 ? 'h3' : 'h2';

  function getIconComponent(iconProp) {
    if (!iconProp) return null;
    if (typeof iconProp === 'string' && ICON_MAP[iconProp]) return ICON_MAP[iconProp];
    if (typeof iconProp === 'function') return iconProp;
    return null;
  }

  return (
    <section id={id} className={`${s.section} ${className || ''}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>{title}</Heading>

        <div className={s.cards} role="list">
          {items.map((it) => {
            const Icon = getIconComponent(it.icon);

            const CardInner = (
              <>
                {Icon ? (
                  <span className={s.cardIcon} aria-hidden="true">
                    <Icon size={28} />
                  </span>
                ) : null}

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
