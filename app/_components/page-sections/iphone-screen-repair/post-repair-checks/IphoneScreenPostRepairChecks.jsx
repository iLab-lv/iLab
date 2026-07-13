import { LuBadgeCheck, LuCheck } from 'react-icons/lu';

import s from './IphoneScreenPostRepairChecks.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Kvalitātes kontrole',
    titleStart: 'Ko pārbaudām pēc',
    titleAccent: 'ekrāna maiņas?',
    intro:
      'Pēc ekrāna maiņas nepietiek tikai pārliecināties, ka jaunais ekrāns ieslēdzas. iLab pārbauda arī ikdienā svarīgas funkcijas, kas var būt saistītas ar ekrāna nomaiņu vai kritiena bojājumiem.',
    checks: [
      'Attēla kvalitāti un spilgtumu',
      'Skāriena darbību visā ekrānā',
      'Tuvuma sensoru zvanu laikā',
      'Priekšējo kameru un augšējo skaļruni',
      'Face ID darbību, ja tā nav saistīta ar citu bojājumu',
      'Uzlādi un pamata funkcijas',
      'Vai korpuss pēc remonta ir korekti salikts',
    ],
    closing: 'Ierīci izsniedzam tikai pēc galveno funkciju pārbaudes.',
  },
  ru: {
    eyebrow: 'Контроль качества',
    titleStart: 'Что проверяем после',
    titleAccent: 'замены экрана?',
    intro:
      'После замены экрана недостаточно убедиться только в том, что новый экран включается. iLab также проверяет важные повседневные функции, которые могут быть связаны с заменой экрана или повреждениями после падения.',
    checks: [
      'Качество изображения и яркость',
      'Работу сенсора по всей площади экрана',
      'Датчик приближения во время звонка',
      'Фронтальную камеру и верхний динамик',
      'Работу Face ID, если она не связана с другим повреждением',
      'Зарядку и основные функции',
      'Правильность сборки корпуса после ремонта',
    ],
    closing: 'Выдаём устройство только после проверки основных функций.',
  },
};

export default function IphoneScreenPostRepairChecks({ locale = 'lv' }) {
  const content = CONTENT[locale] || CONTENT.lv;

  return (
    <section className={s.section} aria-labelledby="iphone-screen-post-repair-title">
      <div className={s.container}>
        <div className={s.layout}>
          <header className={s.header}>
            <span className={s.badge} aria-hidden="true">
              <LuBadgeCheck />
            </span>
            <span className={s.eyebrow}>{content.eyebrow}</span>
            <h2 id="iphone-screen-post-repair-title">
              {content.titleStart} <em>{content.titleAccent}</em>
            </h2>
            <p>{content.intro}</p>
          </header>

          <div className={s.checkPanel}>
            <ul>
              {content.checks.map((check) => (
                <li key={check}>
                  <span aria-hidden="true">
                    <LuCheck />
                  </span>
                  {check}
                </li>
              ))}
            </ul>
            <p className={s.closing}>{content.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
