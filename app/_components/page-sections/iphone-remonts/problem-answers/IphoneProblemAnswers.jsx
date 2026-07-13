import { LuBatteryWarning, LuCamera, LuDroplets, LuPlugZap, LuPower, LuSmartphone, LuVolume2 } from 'react-icons/lu';

import { getIphoneProblemAnswersContent } from '../iphoneRemonts.i18n';

import s from './IphoneProblemAnswers.module.scss';

const ICONS = [LuPlugZap, LuBatteryWarning, LuSmartphone, LuVolume2, LuCamera, LuDroplets, LuPower];

export default function IphoneProblemAnswers({ locale = 'lv' }) {
  const content = getIphoneProblemAnswersContent(locale);

  return <section className={s.section} aria-labelledby="iphone-problems-title"><div className={s.container}><header className={s.header}><span className={s.eyebrow}>{content.eyebrow}</span><h2 id="iphone-problems-title">{content.titleStart}<span>{content.titleAccent}</span></h2><p>{content.intro}</p></header><div className={s.grid}>{content.problems.map((problem, index) => { const Icon = ICONS[index]; return <article className={s.card} key={problem[0]}><header className={s.cardHeader}><span className={s.icon} aria-hidden="true"><Icon /></span><h3>{problem[0]}</h3></header><dl className={s.answerList}>{problem.slice(1).map((answer, answerIndex) => <div className={answerIndex === 0 ? s.shortAnswer : ''} key={content.labels[answerIndex]}><dt>{content.labels[answerIndex]}</dt><dd>{answer}</dd></div>)}</dl></article>; })}</div></div></section>;
}
