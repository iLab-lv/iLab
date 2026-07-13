import { LuCheck } from 'react-icons/lu';
import { getBeforeVisiting } from './beforeVisiting.i18n';
import s from './BeforeVisiting.module.scss';

export default function BeforeVisiting({ id='before-visiting', modelName='iPhone', locale='lv' }) {
  const content=getBeforeVisiting(modelName,locale);
  return <section id={id} className={s.section} aria-labelledby={`${id}-title`}><div className={s.container}><header className={s.header}><h2 id={`${id}-title`}>{content.title}</h2><p>{content.intro}</p></header><div className={s.panel} role="list">{content.items.map(([title,text])=><article className={s.item} key={title} role="listitem"><span aria-hidden="true"><LuCheck /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>;
}
