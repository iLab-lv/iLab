// app/(site)/sections/home/Reviews.jsx
import s from './Reviews.module.scss';

export default function Reviews({
  id = 'reviews',
  title = 'Klientu atsauksmes',
  items = [
    {
      starsText: '★★★★★',
      text: '“Ļoti ātra un profesionāla apkalpošana. Ekrāns nomainīts 40 minūtēs.”',
      meta: '— Līga K.',
    },
    {
      starsText: '★★★★★',
      text: '“Nomainīja bateriju tajā pašā dienā. Cena tāda, kā solīja.”',
      meta: '— Mārtiņš P.',
    },
    {
      starsText: '★★★★★',
      text: '“Forša attieksme un 90 dienu garantija iedod mieru. Iesaku!”',
      meta: '— Kristīne S.',
    },
  ],
  ctaHref = 'https://www.google.com/search?q=iLab+R%C4%ABga+atsauksmes',
  ctaLabel = 'Skatīt Google atsauksmes →',
}) {
  return (
    <section id={id} className={`${s.section} ${s.reviews}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>{title}</h2>

        <ul className={s.reviewGrid} role="list">
          {items.map((r, idx) => (
            <li key={idx} className={s.reviewCard}>
              <div className={s.reviewStars} aria-hidden="true">{r.starsText}</div>
              <p className={s.reviewText}>{r.text}</p>
              <div className={s.reviewMeta}>{r.meta}</div>
            </li>
          ))}
        </ul>

        <div className={s.reviewsCta}>
          <a className={s.reviewsLink} href={ctaHref} target="_blank" rel="noopener noreferrer">
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
