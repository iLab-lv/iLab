import { getRepairProcessContent } from './RepairProcess.i18n';
import s from './RepairProcess.module.scss';

export default function RepairProcess({ id='repair-process', locale='lv', variant='iphone', backgroundImage }) {
  const content=getRepairProcessContent(locale,variant);
  const style=backgroundImage ? { '--process-background': `url("${backgroundImage}")` } : undefined;
  const gridClassName = content.steps.length === 5 ? `${s.grid} ${s.fiveSteps}` : s.grid;
  return <section id={id} className={s.section} style={style} aria-labelledby={`${id}-title`}><div className={s.container}><header className={s.header}><span>{content.eyebrow}</span><h2 id={`${id}-title`}>{content.titleStart}<em>{content.titleAccent}</em></h2><p>{content.intro}</p></header><div className={gridClassName} role="list">{content.steps.map(([title,text],index)=><article className={s.card} key={title} role="listitem"><b>{String(index+1).padStart(2,'0')}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>;
}
