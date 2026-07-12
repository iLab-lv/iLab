import { LOCATIONS } from '@/data/site.config';
import { buildInfoHref } from '@/lib/routes/routeI18n';
import { getFinalCtaContent } from './finalCta.i18n';
import FinalCtaActions from './FinalCtaActions';
import s from './FinalCta.module.scss';

export default function FinalCta({ id = 'final-cta', locale = 'lv', variant = 'iphone' }) {
  const content = getFinalCtaContent(locale, variant);
  const location = LOCATIONS.find((item) => item.id === 'domina') || LOCATIONS[0];

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <div className={s.panel}>
          <div className={s.content}>
            <p className={s.eyebrow}>{content.eyebrow}</p>
            <h2 id={`${id}-title`}>{content.titleStart}<span>{content.titleAccent}</span></h2>
            <p className={s.text}>{content.text}</p>
          </div>
          <FinalCtaActions
            priceHref={buildInfoHref(locale, 'cenas')}
            phoneHref={location?.telLink || 'tel:+37123370088'}
            whatsappHref={location?.wa || 'https://wa.me/37123370088'}
            labels={content}
          />
        </div>
      </div>
    </section>
  );
}
