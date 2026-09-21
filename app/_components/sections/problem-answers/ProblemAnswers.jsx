import {
  LuBatteryWarning,
  LuCamera,
  LuDroplets,
  LuFocus,
  LuImage,
  LuPlugZap,
  LuPower,
  LuScanSearch,
  LuSmartphone,
  LuVolume2,
} from 'react-icons/lu';
import s from '@/_components/page-sections/iphone-remonts/problem-answers/IphoneProblemAnswers.module.scss';

const ICONS = {
  iphone: [LuPlugZap, LuBatteryWarning, LuSmartphone, LuVolume2, LuCamera, LuDroplets, LuPower],
  photo: [LuPlugZap, LuFocus, LuScanSearch, LuCamera, LuDroplets, LuImage],
};

export default function ProblemAnswers({ id = 'problem-answers', content, variant = 'photo', highlightFirstAnswer = false }) {
  const icons = ICONS[variant] || ICONS.photo;

  return (
    <section className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.eyebrow}>{content.eyebrow}</span>
          <h2 id={`${id}-title`}>{content.titleStart}{content.titleAccent && <span>{content.titleAccent}</span>}</h2>
          {content.intro && <p>{content.intro}</p>}
        </header>
        <div className={s.grid}>
          {content.problems.map((problem, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article className={s.card} key={problem[0]}>
                <header className={s.cardHeader}><span className={s.icon} aria-hidden="true"><Icon /></span><h3>{problem[0]}</h3></header>
                <dl className={s.answerList}>{problem.slice(1).map((answer, answerIndex) => <div className={highlightFirstAnswer && answerIndex === 0 ? s.shortAnswer : ''} key={content.labels[answerIndex]}><dt>{content.labels[answerIndex]}</dt><dd>{answer}</dd></div>)}</dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
