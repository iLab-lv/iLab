import { getModelSymptomGuide } from './modelSymptomGuide.i18n';
import s from './ModelSymptomGuide.module.scss';

export default function ModelSymptomGuide({
  id = 'symptom-guide',
  modelName = 'iPhone',
  locale = 'lv',
}) {
  const content = getModelSymptomGuide(modelName, locale);

  return (
    <section className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <header className={s.header}>
          <h2 id={`${id}-title`}>{content.title}</h2>
          <p>{content.intro}</p>
        </header>

        <div className={s.list} role="list">
          {content.items.map((item) => (
            <article className={s.item} key={item.title} role="listitem">
              <span className={s.dot} aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
