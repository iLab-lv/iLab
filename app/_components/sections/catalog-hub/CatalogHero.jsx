/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import CatalogBookingButton from './CatalogBookingButton';
import s from './CatalogHero.module.scss';

const COPY = {
  lv: { book: 'Pieteikt remontu', explore: 'Skatīt modeļus' },
  ru: { book: 'Записаться на ремонт', explore: 'Смотреть модели' },
};

export default function CatalogHero({
  locale = 'lv',
  title,
  lead,
  crumbs = [],
  image,
  imageAlt = '',
  targetId = 'brand-list',
  targetLabel,
  bodyHtml,
}) {
  const copy = COPY[locale] || COPY.lv;

  return (
    <div className={s.shell}>
      <nav className={s.crumbs} aria-label="Breadcrumb">
        <ol>
          {crumbs.map((crumb, index) => (
            <li key={`${crumb.href}-${crumb.label}`}>
              {index < crumbs.length - 1 && crumb.href
                ? <Link href={crumb.href}>{crumb.label}</Link>
                : <span aria-current="page">{crumb.label}</span>}
            </li>
          ))}
        </ol>
      </nav>

      <section className={s.hero}>
        <div className={s.copy}>
          <p className={s.eyebrow}>iLab / {locale === 'ru' ? 'Рига' : 'Rīga'}</p>
          <h1>{title}</h1>
          {lead && <p className={s.lead}>{lead}</p>}
          {bodyHtml && (
            <div
              className={s.body}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          )}
          <p className={s.actions}>
            <CatalogBookingButton className={s.primary}>{copy.book}</CatalogBookingButton>
            <a className={s.link} href={`#${targetId}`}>
              {targetLabel || copy.explore}
            </a>
          </p>
        </div>
        <figure className={s.visual}>
          <img src={image} alt={imageAlt} fetchPriority="high" />
        </figure>
      </section>
    </div>
  );
}
