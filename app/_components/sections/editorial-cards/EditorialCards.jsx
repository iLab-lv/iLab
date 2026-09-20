import s from './EditorialCards.module.scss';

export default function EditorialCards({
  id,
  eyebrow,
  title,
  intro = [],
  items = [],
  footer,
  columns = 2,
  tone = 'default',
}) {
  const paragraphs = Array.isArray(intro) ? intro : [intro];

  return (
    <section
      id={id}
      className={`${s.section} ${tone === 'accent' ? s.accent : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <header className={s.header}>
          {eyebrow ? <span className={s.eyebrow}>{eyebrow}</span> : null}
          <h2 id={`${id}-title`}>{title}</h2>
          {paragraphs.filter(Boolean).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </header>

        {items.length > 0 ? (
          <div className={s.grid} style={{ '--editorial-columns': columns }}>
            {items.map((item) => (
              <article className={s.card} key={item.title}>
                {item.number ? <span className={s.number}>{item.number}</span> : null}
                <h3>{item.title}</h3>
                {(item.paragraphs || (item.text ? [item.text] : [])).map((text) => (
                  <p key={text}>{text}</p>
                ))}
                {item.details?.map((detail) => (
                  <div className={s.detail} key={`${item.title}-${detail.label}`}>
                    <strong>{detail.label}</strong>
                    <p>{detail.text}</p>
                  </div>
                ))}
                {item.examples?.length ? (
                  <ul>{item.examples.map((example) => <li key={example}>{example}</li>)}</ul>
                ) : null}
                {item.note ? <p className={s.note}>{item.note}</p> : null}
                {item.meta ? <p className={s.meta}>{item.meta}</p> : null}
              </article>
            ))}
          </div>
        ) : null}

        {footer ? <div className={s.footer}>{footer}</div> : null}
      </div>
    </section>
  );
}
