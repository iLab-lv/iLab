import { getGuideContent, getGuidePresentation } from './guide.i18n';
import s from './Guide.module.scss';

export default function Guide({ id = 'guide', locale = 'lv', variant = 'iphone', headingLevel = 2 }) {
  const content = getGuideContent(locale, variant);
  const parts = content.parts || [];
  const presentation = getGuidePresentation(locale, variant, content);

  if (!Array.isArray(parts) || parts.length === 0) return null;

  const Heading = `h${headingLevel}`;

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.eyebrow}>{presentation.eyebrow}</span>
          <Heading id={`${id}-title`}>{presentation.titleStart}{presentation.titleAccent && <span>{presentation.titleAccent}</span>}</Heading>
          {presentation.intro && <p>{presentation.intro}</p>}
        </header>

        <div className={s.grid}>
          {presentation.cards.map((card) => (
            <article key={card.title} className={s.card}>
              <h3>{card.title}</h3>
              <div className={s.richText} dangerouslySetInnerHTML={{ __html: card.text }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
