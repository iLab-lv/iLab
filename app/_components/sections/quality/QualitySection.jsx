import { LuBadgeCheck, LuClipboardCheck, LuCpu, LuSearchCheck } from 'react-icons/lu';
import s from '@/_components/page-sections/iphone-remonts/quality/IphoneQualitySection.module.scss';

const ICONS = [LuClipboardCheck, LuBadgeCheck, LuSearchCheck, LuCpu];

export default function QualitySection({ id = 'quality', content }) {
  return <section className={s.section} aria-labelledby={`${id}-title`}><div className={s.container}><div className={s.panel}><div className={s.content}><span className={s.eyebrow}>{content.eyebrow}</span><h2 id={`${id}-title`}>{content.titleStart || content.title}{content.titleAccent && <span>{content.titleAccent}</span>}</h2><p>{content.intro}</p></div><div className={s.factList}>{content.facts.map((fact)=><span key={fact}>{fact}</span>)}</div></div><div className={s.grid}>{content.items.map((card,index)=>{const Icon=ICONS[index];return <article className={s.card} key={card.title}><span className={s.icon}><Icon /></span><div><h3>{card.title}</h3><p>{card.text}</p>{card.examples?.length?<ul>{card.examples.map((item)=><li key={item}>{item}</li>)}</ul>:null}</div></article>})}</div></div></section>;
}
