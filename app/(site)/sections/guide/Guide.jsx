'use client';

import s from './Guide.module.scss';

export default function Guide({
  id = 'guide',
  title = 'Remonta ceļvedis',
  parts = [],
  headingLevel = 2,
}) {
  if (!Array.isArray(parts) || parts.length === 0) return null;

  const H = `h${headingLevel}`;

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <H id={`${id}-title`} className={s.h2}>{title}</H>

        <div className={s.grid}>
          {parts.map((p, i) => (
            <article key={`${p?.title || 'part'}-${i}`} className={s.item}>
              {p?.title ? <h3 className={s.h3}>{p.title}</h3> : null}

              {p?.text ? (
                <div
                  className={s.text}
                  // We control this copy (from local content files), so HTML injection is safe.
                  dangerouslySetInnerHTML={{ __html: p.text }}
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
