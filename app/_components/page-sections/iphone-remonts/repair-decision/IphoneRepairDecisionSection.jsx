import Link from 'next/link';
import { LuCircuitBoard, LuSearch, LuSparkles, LuWrench } from 'react-icons/lu';

import { buildInfoHref } from '@/lib/routes/routeI18n';
import { getIphoneRepairDecisionContent } from './IphoneRepairDecisionSection.i18n';
import s from './IphoneRepairDecisionSection.module.scss';

const ICONS = [LuSparkles, LuWrench, LuSearch];

export default function IphoneRepairDecisionSection({ locale = 'lv' }) {
  const content = getIphoneRepairDecisionContent(locale);
  return <section className={s.section} aria-labelledby="iphone-repair-decision-title"><div className={s.container}><header className={s.header}><span>{content.eyebrow}</span><h2 id="iphone-repair-decision-title">{content.titleStart}<em>{content.titleAccent}</em></h2><p>{content.intro}</p></header><div className={s.grid}>{content.cards.map(([start,accent,body,examples],index)=>{const Icon=ICONS[index];return <article className={s.card} key={accent}><i><Icon /></i><div><h3>{start} <em>{accent}</em></h3><p>{body}</p><ul>{examples.map((example)=><li key={example}>{example}</li>)}</ul></div></article>})}</div><div className={s.cta}><i><LuCircuitBoard /></i><div><h3>{content.ctaTitle}</h3><p>{content.ctaText}</p></div><Link href={buildInfoHref(locale,'kontakti')} className={s.link}>{content.cta}</Link></div></div></section>;
}
