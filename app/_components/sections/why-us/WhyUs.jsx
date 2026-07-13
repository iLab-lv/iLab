import { LuClipboardList, LuMapPin, LuSearchCheck, LuShieldQuestion } from 'react-icons/lu';

import { getWhyUsContent } from './WhyUs.i18n';
import s from './WhyUs.module.scss';

const ICONS = [LuSearchCheck, LuClipboardList, LuMapPin, LuShieldQuestion];

export default function WhyUs({ locale = 'lv', variant = 'iphone' }) {
  const content = getWhyUsContent(locale, variant);
  return <section className={s.section} aria-labelledby="why-us-title"><div className={s.container}><div className={s.shell}><div className={s.intro}><span className={s.eyebrow}>{content.eyebrow}</span><h2 id="why-us-title">{content.titleStart}<span>{content.titleAccent}</span></h2><p>{content.intro}</p><div className={s.stat}><strong>{content.experience}</strong><span>{content.experienceTitle}</span><p>{content.experienceText}</p></div></div><div className={s.points}>{content.points.map(([title,text],index)=>{const Icon=ICONS[index];return <article className={s.point} key={title}><span className={s.icon} aria-hidden="true"><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>})}</div></div></div></section>;
}
