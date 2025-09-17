'use client';

import Link from 'next/link';
import Script from 'next/script';
import s from './CommonIssues.module.scss';

function fmtTime(min, max) {
  if (!min && !max) return 'Tajā pašā dienā';
  if (min && max) return max >= 120 ? 'Tajā pašā dienā' : `${min}–${max} min`;
  if (max) return max >= 120 ? 'Tajā pašā dienā' : `līdz ${max} min`;
  return `${min} min`;
}

/**
 * CommonIssues – “Problēmas un risinājumi”
 * Props:
 *  - id: string (default "problems")
 *  - title: string (LV)
 *  - items: [{ id, title, causes[], actions[], timeMin?, timeMax?, href? }]
 *  - headingLevel: 2|3 (default 2)
 */
export default function CommonIssues({
  id = 'problems',
  title = 'Ar kādiem jautājumiem visbiežāk pie mums vēršas',
  items = [],
  headingLevel = 2,
  showJsonLd = true,
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  if (!items?.length) return null;

  // Build FAQPage JSON-LD from items (Q/A style)
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          [
            it.causes?.length ? `Iespējamie cēloņi: ${it.causes.join(', ')}.` : null,
            it.actions?.length ? `Ko darām iLab: ${it.actions.join(', ')}.` : null,
            (it.timeMin || it.timeMax) ? `Aptuvenais remonta laiks: ${fmtTime(it.timeMin, it.timeMax)}.` : null,
            `Bezmaksas diagnostika.`,
          ].filter(Boolean).join(' '),
      },
    })),
  };

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      {showJsonLd && (
        <Script id={`${id}-faq-jsonld`} type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqLd)}
        </Script>
      )}

      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>{title}</Heading>

        <div className={s.grid}>
          {items.map((it) => (
            <article key={it.id || it.title} className={s.card}>
              {/* optional icon placeholder spot */}
              <div className={s.cardHead}>
                <h3 className={s.cardTitle}>{it.title}</h3>
                <span className={s.chipTime}>{fmtTime(it.timeMin, it.timeMax)}</span>
                <span className={s.chipFree}>Bezmaksas diagnostika</span>
              </div>

              {it.causes?.length ? (
                <div className={s.block}>
                  <div className={s.blockLabel}>Iespējamie cēloņi</div>
                  <ul className={s.ul}>
                    {it.causes.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              ) : null}

              {it.actions?.length ? (
                <div className={s.block}>
                  <div className={s.blockLabel}>Ko darām iLab</div>
                  <ul className={s.ul}>
                    {it.actions.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              ) : null}

              <div className={s.ctaRow}>
                {it.href ? (
                  <Link href={it.href} className={s.linkMore} aria-label={`${it.title} — uzzināt vairāk`}>
                    Uzzināt vairāk
                  </Link>
                ) : (
                  <span className={s.linkMuted}>Sazinies ar meistaru</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
