// app/(site)/sections/home/Faq.jsx
import s from './Faq.module.scss';

export default function Faq({
  id = 'faq',
  title = 'Biežāk uzdotie jautājumi',
  items = [
    {
      q: 'Cik maksā iPhone ekrāna maiņa?',
      a: <>Cena atkarīga no modeļa. Skati <a href="/iphone-remonts">iPhone remonts</a> sadaļu.</>,
    },
    {
      q: 'Cik ilgi aizņem baterijas maiņa?',
      a: 'Parasti 30–120 min tajā pašā dienā, atkarībā no modeļa un detaļu pieejamības.',
    },
    {
      q: 'Vai dodiet garantiju uz remontu?',
      a: 'Jā, 90 dienu garantija visiem remontdarbiem (izņemot ūdens bojājumu diagnostiku).',
    },
  ],
}) {
  return (
    <section id={id} className={`${s.section} ${s.faq}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>{title}</h2>

        <div className={s.faqList}>
          {items.map((it, i) => (
            <details key={i} className={s.faqItem}>
              <summary>{it.q}</summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
