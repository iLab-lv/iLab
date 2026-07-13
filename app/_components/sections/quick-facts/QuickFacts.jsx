import { getQuickFacts } from './quickFacts.i18n';

import s from './QuickFacts.module.scss';

export default function QuickFacts({ variant = 'phone', locale = 'lv' }) {
  const { ariaLabel, facts } = getQuickFacts(variant, locale);
  const hasDescriptions = facts.some((fact) => fact.description);

  return (
    <section className={s.section} aria-label={ariaLabel}>
      <div className={s.container}>
        <div className={`${s.band} ${hasDescriptions ? s.richBand : ''}`}>
          {facts.map(({ Icon, text, title, description }) => (
            <div className={`${s.item} ${description ? s.richItem : ''}`} key={title || text}>
              <span className={s.icon} aria-hidden="true">
                <Icon />
              </span>

              {description ? (
                <span className={s.copy}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </span>
              ) : (
                <span className={s.text}>{text}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
