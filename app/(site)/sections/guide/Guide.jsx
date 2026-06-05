import s from './Guide.module.scss';
import { getGuideContent } from './guideContent';

export default function Guide({
  id = 'guide',
  locale = 'lv',
  variant = 'iphone',
  headingLevel = 2,
}) {
  const content = getGuideContent(locale, variant);
  const parts = content.parts || [];

  if (!Array.isArray(parts) || parts.length === 0) return null;

  const H = `h${headingLevel}`;

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <H id={`${id}-title`} className={s.h2}>{content.title}</H>

        <div className={s.grid}>
          {parts.map((p, i) => (
            <article key={`${p?.title || 'part'}-${i}`} className={s.item}>
              {p?.title ? <h3 className={s.h3}>{p.title}</h3> : null}

              {p?.text ? (
                <div
                  className={s.text}
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
