import s from './EditorialWhy.module.scss';

export default function EditorialWhy({ id = 'why-us', headingId = `${id}-title`, eyebrow, title, subtitle, experience, entries = [] }) {
  if (!entries.length) return null;
  return <section id={id} data-why="editorial" className={s.section} aria-labelledby={headingId}>
    <div className={s.layout}>
      <header className={s.intro}>
        {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
        <h2 id={headingId}>{title}</h2>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}
        {experience?.value && <div className={s.experience}>
          <p><strong>{experience.value}</strong>{experience.label && <span>{experience.label}</span>}</p>
          {experience.description && <p>{experience.description}</p>}
        </div>}
      </header>
      <ul className={s.entries} role="list">{entries.map(({ title: heading, description }) => <li key={heading}>
        <h3>{heading}</h3><p>{description}</p>
      </li>)}</ul>
    </div>
  </section>;
}
