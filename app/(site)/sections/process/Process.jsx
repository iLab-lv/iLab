import s from './Process.module.scss';
import { getProcessContent } from './process.i18n';

export default function Process({
  id = 'process',
  locale = 'lv',
  variant = 'default', // content variant
  title,
  steps,
  headingLevel = 2,
  className = '',
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';

  const content = getProcessContent(locale, variant);
  const sectionTitle = title || content.title;
  const sectionSteps =
    Array.isArray(steps) && steps.length > 0 ? steps : content.steps;

  return (
    <section
      id={id}
      className={`${s.section} ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>
          {sectionTitle}
        </Heading>

        <div className={`${s.grid} ${s.cards}`} role="list">
          {sectionSteps.map((step, idx) => (
            <article key={idx} className={s.card} role="listitem">
              <div className={s.badge} aria-hidden="true">
                {idx + 1}
              </div>
              <h3 className={s.stepTitle}>{step.title}</h3>
              <p className={s.stepText}>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}