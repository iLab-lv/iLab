// app/(site)/sections/common-issues/CommonIssues.jsx
'use client';

import Link from 'next/link';
import s from './CommonIssues.module.scss';

// React Icons are mapped CLIENT-SIDE from string keys
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { TbBatteryCharging } from 'react-icons/tb';
import { HiOutlineCamera } from 'react-icons/hi2';
import { LuDroplet } from 'react-icons/lu';

const ICONS = {
  screen: MdOutlinePhoneIphone,
  battery: TbBatteryCharging,
  camera: HiOutlineCamera,
  water: LuDroplet,
};

/**
 * CommonIssues — FAQ Preview (mini cards grid)
 * Icons resolved on the client from string keys (no server → client function passing).
 *
 * Props:
 * - id = 'issues-preview'
 * - title = 'Biežāk sastopamās problēmas'
 * - items: Array<{
 *     q: string,       // card title (also FAQ question text)
 *     text?: string,   // short supporting line (optional)
 *     id?: string,     // stable slug (used for FAQ anchor)
 *     icon?: string,   // 'screen' | 'battery' | 'camera' | 'water'
 *     serviceHref?: string,
 *   }>
 * - faqId = 'iphone-faq'
 * - maxItems = 4
 * - headingLevel: 2 | 3 = 2
 */
export default function CommonIssues({
  id = 'issues-preview',
  title = 'Biežāk sastopamās problēmas',
  items = [],
  faqId = 'iphone-faq',
  maxItems = 4,
  headingLevel = 2,
}) {
  if (!items?.length) return null;

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

  const trimmed = items.slice(0, Math.max(1, maxItems)).map((it, idx) => {
    const slug = it.id || slugify(it.q || `q-${idx}`);
    return { ...it, _slug: slug };
  });

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>
          {title}
        </Heading>

        <div className={s.grid}>
          {trimmed.map((it) => {
            const Icon = it.icon ? ICONS[it.icon] : undefined;

            return (
              <article key={it._slug} className={s.card}>
                <Link
                  href={`#${faqId}-${it._slug}`}
                  className={s.cardLink}
                  aria-label={`${it.q} — lasīt atbildi`}
                >
                  <div className={s.head}>
                    {Icon ? <Icon className={s.icon} aria-hidden="true" /> : null}
                    <h3 className={s.title}>{it.q}</h3>
                  </div>

                  {it.text ? <p className={s.text}>{it.text}</p> : null}

                  <span className={s.primaryCta}>Lasīt atbildi</span>
                </Link>

                {it.serviceHref ? (
                  <div className={s.serviceRow}>
                    <Link
                      href={it.serviceHref}
                      className={s.serviceLink}
                      aria-label="Saistītais pakalpojums"
                    >
                      Saistītais pakalpojums →
                    </Link>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className={s.viewAll}>
          <Link href={`#${faqId}`} className={s.viewAllLink}>
            Skatīt visus jautājumus
          </Link>
        </div>
      </div>
    </section>
  );
}
