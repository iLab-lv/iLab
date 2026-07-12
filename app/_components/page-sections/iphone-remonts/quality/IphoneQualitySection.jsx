import {
  LuBadgeCheck,
  LuClipboardCheck,
  LuCpu,
  LuSearchCheck,
} from 'react-icons/lu';

import { getIphoneQualityContent } from './IphoneQualitySection.i18n';

import s from './IphoneQualitySection.module.scss';

const ICONS = [LuClipboardCheck, LuCpu, LuBadgeCheck, LuSearchCheck];

export default function IphoneQualitySection({ locale = 'lv' }) {
  const content = getIphoneQualityContent(locale);

  return (
    <section className={s.section} aria-labelledby="iphone-quality-title">
      <div className={s.container}>
        <div className={s.panel}>
          <div className={s.content}>
            <span className={s.eyebrow}>{content.eyebrow}</span>
            <h2 id="iphone-quality-title">
              {content.titleStart}<span>{content.titleAccent}</span>
            </h2>
            <p>{content.intro}</p>
          </div>

          <div className={s.factList}>
            {content.facts.map((fact) => <span key={fact}>{fact}</span>)}
          </div>
        </div>

        <div className={s.grid}>
          {content.cards.map((card, index) => {
            const Icon = ICONS[index];

            return (
              <article className={s.card} key={card.title}>
                <span className={s.icon} aria-hidden="true"><Icon /></span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  {card.bullets && <ul>{card.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
