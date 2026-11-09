import { LOCATIONS } from '@/data/site.config';
import { buildInfoHref } from '@/lib/routes/routeI18n';
import { getFinalCtaContent } from '../final-cta/finalCta.i18n';
import s from './CatalogHubSkin.module.scss';

export default function HubFinalCta({ locale = 'lv' }) {
  const content = getFinalCtaContent(locale, 'iphone');
  const location = LOCATIONS.find((item) => item.id === 'domina') || LOCATIONS[0];
  return (
    <section id="final-cta" className={s.finalCta} aria-labelledby="final-cta-title">
      <div>
        <div>
          <p className={s.processEyebrow}>{content.eyebrow}</p>
          <h2 id="final-cta-title">{content.titleStart} {content.titleAccent}</h2>
          <p className={s.finalText}>{content.text}</p>
        </div>
        <div className={s.finalActions}>
          <a className={s.finalPrimary} href={location?.telLink || 'tel:+37123370088'}>{content.call}</a>
          <a href={buildInfoHref(locale, 'cenas')}>{content.price}</a>
          <a href={location?.wa || 'https://wa.me/37123370088'} target="_blank" rel="noopener noreferrer">{content.whatsapp}</a>
        </div>
      </div>
    </section>
  );
}
