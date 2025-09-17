// app/(site)/sections/process/Process.jsx
import s from './Process.module.scss';

/**
 * Reusable “How the repair works” section
 *
 * Props:
 * - id: string (default "process")
 * - title: string (LV) — default "Kā notiek remonts"
 * - steps: Array<{ title: string, text: string }>
 * - headingLevel: 2 | 3 (default 2)
 * - variant: 'cards' | 'timeline' (default 'cards')
 */
export default function Process({
  id = 'process',
  title = 'Kā notiek remonts',
  steps = [],
  headingLevel = 2,
  variant = 'cards',
  className,
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';

  return (
    <section id={id} className={`${s.section} ${className || ''}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.sectionTitle}>{title}</Heading>

        <div
          className={`${s.grid} ${variant === 'timeline' ? s.timeline : s.cards}`}
          role="list"
        >
          {steps.map((step, idx) => (
            <article key={idx} className={s.card} role="listitem">
              <div className={s.badge} aria-hidden="true">{idx + 1}</div>
              <h3 className={s.stepTitle}>{step.title}</h3>
              <p className={s.stepText}>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
