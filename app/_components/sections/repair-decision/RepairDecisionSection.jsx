import { LuSearch, LuSparkles, LuWrench } from 'react-icons/lu';
import s from '@/_components/page-sections/iphone-remonts/repair-decision/IphoneRepairDecisionSection.module.scss';

const ICONS = [LuSparkles, LuWrench, LuSearch];

export default function RepairDecisionSection({ id = 'repair-decision', content }) {
  const intro = Array.isArray(content.intro) ? content.intro.join(' ') : content.intro;
  return <section className={s.section} aria-labelledby={`${id}-title`}><div className={s.container}><header className={s.header}><span>{content.eyebrow}</span><h2 id={`${id}-title`}>{content.titleStart || content.title}{content.titleAccent && <em>{content.titleAccent}</em>}</h2><p>{intro}</p></header><div className={s.grid}>{content.items.map((item,index)=>{const Icon=ICONS[index];return <article className={s.card} key={item.title}><i><Icon /></i><div><h3>{item.title}</h3><p>{item.text}</p><ul>{item.examples.map((example)=><li key={example}>{example}</li>)}</ul></div></article>})}</div></div></section>;
}
