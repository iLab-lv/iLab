// app/(site)/sections/home/Why.jsx
'use client';

import s from './Why.module.scss';

// Use a consistent icon set (Tabler) to avoid mixed stroke weights
import { TbShieldCheck, TbBolt, TbCertificate, TbSearch } from 'react-icons/tb';

export default function Why({
  id = 'why',
  title = 'Kāpēc iLab?',
  copy = 'Uzticami remonti, caurspīdīgas cenas un ātrs apgrozījums no sertificētiem tehniķiem.',
  items = [
    { text: '90 dienu garantija', Icon: TbShieldCheck },
    { text: 'Ātrs remonts', Icon: TbBolt }, // rephrased
    { text: 'Sertificēti meistari', Icon: TbCertificate },
    { text: 'Bezmaksas diagnostika', Icon: TbSearch },
  ],
}) {
  // Normalize simple strings if ever passed
  const list = items.map((it) => (typeof it === 'string' ? { text: it, Icon: TbCertificate } : it));

  return (
    <section id={id} className={`${s.section} ${s.why}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <header className={s.header}>
          <h2 id={`${id}-title`} className={s.sectionTitle}>{title}</h2>
          <p className={s.copy}>{copy}</p>
        </header>

        <ul className={s.uspGrid} role="list">
          {list.map(({ text, Icon }, i) => (
            <li key={i} className={s.card}>
              <span className={s.iconWrap} aria-hidden="true">
                <Icon className={s.icon} />
              </span>
              <span className={s.cardText}>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
