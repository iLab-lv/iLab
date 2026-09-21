import { LuAperture, LuFocus, LuLink, LuZoomIn } from 'react-icons/lu';
import s from './PhotoRepairSections.module.scss';

const ICONS = [LuFocus, LuZoomIn, LuLink, LuAperture];

export default function LensRepairSection({ content, image }) {
  return <section id="photo-lenses" className={s.lensSection} aria-labelledby="photo-lenses-title"><div className={s.container}><div className={s.lensLead}><div><span className={s.eyebrow}>{content.eyebrow}</span><h2 id="photo-lenses-title">{content.titleStart}<span>{content.titleAccent}</span></h2>{content.intro.map((text)=><p key={text}>{text}</p>)}</div>{image?<div className={s.lensImage} style={{backgroundImage:`url("${image}")`}} role="img" aria-label={content.title}/>:<div className={s.lensVisual} aria-hidden="true"><LuAperture /></div>}</div><div className={s.lensGrid}>{content.items.map((item,index)=>{const Icon=ICONS[index];return <article key={item.title}><i><Icon /></i><h3>{item.title}</h3><p>{item.text}</p>{item.details.map((detail)=><div key={detail.label}><strong>{detail.label}</strong><p>{detail.text}</p></div>)}</article>})}</div><p className={s.expertNote}>{content.footer}</p></div></section>;
}
