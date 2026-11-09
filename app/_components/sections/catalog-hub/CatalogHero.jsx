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
  imageWidth,
  imageHeight,
  imageRatio,
  targetId = 'brand-list',
  targetLabel,
  bodyHtml,
  placeholderLabel,
  variant,
  bookingValues,
  bodyAfterActions = false,
  secondaryAction,
  children,
}) {
  const copy = COPY[locale] || COPY.lv;
  const isHub = variant === 'hub';
  const isBrand = variant === 'brand';
  const isModel = variant === 'model';
  const isService = variant === 'service';

  return (
    <div style={isService && imageRatio ? { '--service-repair-image-ratio': imageRatio } : undefined} className={`${s.shell} ${isHub ? s.hub : ''} ${isBrand ? s.brand : ''} ${isModel ? s.model : ''} ${isService ? s.service : ''}`}>
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
          <h1 data-rise>{title}</h1>
          {lead && <p className={s.lead}>{lead}</p>}
          {(isModel || isService) && !bodyAfterActions && bodyHtml && <div className={s.body} dangerouslySetInnerHTML={{ __html: bodyHtml }} />}
          <p className={s.actions} data-stagger>
            <CatalogBookingButton hub={isHub} brand={isBrand} model={isModel} initialValues={bookingValues}>{copy.book}</CatalogBookingButton>
            <a className={secondaryAction ? s.link : isModel || isService ? s.modelSecondary : s.link} href={secondaryAction?.href || `#${targetId}`}>
              {secondaryAction?.label || targetLabel || copy.explore}
            </a>
          </p>
          {isService && bodyAfterActions && bodyHtml && <div className={s.body} dangerouslySetInnerHTML={{ __html: bodyHtml }} />}
          {isService && secondaryAction && <a className={s.link} href={`#${targetId}`}>{targetLabel || copy.explore}</a>}
          {bodyHtml && !isHub && !isModel && !isService && (
            <div
              className={s.body}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          )}
        </div>
        <figure data-scan="x" className={`${s.visual} ${!image ? s.placeholder : ''}`}>
          {image
            ? <img src={image} alt={imageAlt} fetchPriority="high" width={isHub || isBrand || isModel || isService ? imageWidth : undefined} height={isHub || isBrand || isModel || isService ? imageHeight : undefined} />
            : <span>{placeholderLabel || imageAlt}</span>}
        </figure>
        {(isHub || isBrand || isModel || isService) && children && <div className={s.facts}>{children}</div>}
        {isHub && bodyHtml && <div className={`${s.body} ${s.hubBody}`} dangerouslySetInnerHTML={{ __html: bodyHtml }} />}
      </section>
    </div>
  );
}
