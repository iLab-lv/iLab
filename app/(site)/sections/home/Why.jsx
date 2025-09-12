// app/(site)/sections/home/Why.jsx
import s from './Why.module.scss';

export default function Why({
  id = 'why',
  title = 'Kāpēc iLab?',
  copy = 'Uzticami remonti, caurspīdīgas cenas un ātrs apgrozījums no sertificētiem tehniķiem.',
  items = [
    '90 dienu garantija',
    'Tajā pašā dienā',
    'Sertificēti meistari',
    'Apple / Samsung / Huawei ekspertīze',
  ],
}) {
  return (
    <section id={id} className={`${s.section} ${s.why}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>{title}</h2>
        <p className={s.copy}>{copy}</p>
        <ul className={s.uspRow} role="list">
          {items.map((text, i) => (
            <li key={i} className={s.uspChip}>{text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
