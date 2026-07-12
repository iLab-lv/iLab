import { getQuickFacts } from './quickFacts.i18n';

import s from './QuickFacts.module.scss';

export default function QuickFacts({ variant = 'phone', locale = 'lv' }) {
  const { ariaLabel, facts } = getQuickFacts(variant, locale);

  return (
    <section className={s.section} aria-label={ariaLabel}>
      <div className={s.container}>
        <div className={s.band}>
          {facts.map(({ Icon, text }) => (
            <div className={s.item} key={text}>
              <span className={s.icon} aria-hidden="true">
                <Icon />
              </span>

              <span className={s.text}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
