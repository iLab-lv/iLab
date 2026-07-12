import { getIphoneExpertNotesContent } from '../iphoneRemonts.i18n';

import s from './IphoneExpertNotes.module.scss';

export default function IphoneExpertNotes({ locale = 'lv' }) {
  const content = getIphoneExpertNotesContent(locale);

  return <section className={s.section} aria-labelledby="iphone-expert-notes-title"><div className={s.container}><header className={s.header}><span className={s.eyebrow}>{content.eyebrow}</span><h2 id="iphone-expert-notes-title">{content.titleStart}<span>{content.titleAccent}</span></h2><p>{content.intro}</p></header><div className={s.grid}>{content.notes.map(([title, text]) => <article className={s.card} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
