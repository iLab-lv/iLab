import Link from 'next/link';
import { getRepairPriceLines, resolveRepairActions } from './popularRepairs.model';
import s from './PopularRepairs.module.scss';

function RepairPrice({ lines, locale }) {
  if (!lines.length) return null;
  return <dl className={s.prices}>{lines.map((line, index) => <div key={index}>
    <dt className={line.label ? undefined : s.actionContext}>{line.label || (locale === 'ru' ? 'Цена' : 'Cena')}</dt>
    <dd data-numeric={line.numeric}>{line.value}</dd>
  </div>)}</dl>;
}

function RepairRow({ item, locale, currency, Heading, informational }) {
  const actions = resolveRepairActions(item.actions, locale);
  const lines = getRepairPriceLines(item.price, locale, currency);
  const numeric = lines.some(line => line.numeric);
  const hasOffer = actions.length > 0 || (!informational && (lines.length > 0 || Boolean(item.priceContext)));
  return <li className={s.row} data-has-offer={hasOffer}>
    <Heading className={s.repairTitle}>{item.title}</Heading>
    <div className={s.body}>
    {(!informational || numeric) && <RepairPrice lines={lines} locale={locale} />}
    <div className={s.explanation}>
      {item.description && <p>{item.description}</p>}
      {item.note && <p className={s.note}>{item.noteLabel && <span>{item.noteLabel} </span>}{item.note}</p>}
      {informational && !numeric && <RepairPrice lines={lines} locale={locale} />}
      {informational && item.priceContext && <p className={s.context}>{item.priceContext}</p>}
    </div>
    {(actions.length > 0 || (!informational && item.priceContext)) && <div className={s.offer}>
      {!informational && item.priceContext && <p className={s.context}>{item.priceContext}</p>}
      {actions.length > 0 && <div className={s.actions}>{actions.map((action, index) =>
        <Link key={action.href} className={index === 0 ? (numeric ? s.supporting : s.primary) : s.secondary} href={action.href}>
          {action.label}<span className={s.actionContext}> — {item.title}</span>
          {index === 0 && <span aria-hidden="true">↗</span>}
        </Link>
      )}</div>}
    </div>}
    </div>
  </li>;
}

export default function PopularRepairs({
  id = 'popular-repairs', title, intro, items = [], locale = 'lv', currency = 'EUR',
  variant = 'featured', headingLevel = 2, className = '',
}) {
  const repairs = items.filter(item => item?.title);
  if (!repairs.length) return null;
  const presentation = ['featured', 'compact', 'informational'].includes(variant) ? variant : 'featured';
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const RowHeading = headingLevel === 3 ? 'h4' : 'h3';
  return <section id={id} className={`${s.scope} ${className}`} data-popular-repairs={presentation} data-motion-skip aria-labelledby={`${id}-title`}>
    <div className={s.inner}>
      <header className={s.header}>
        <Heading id={`${id}-title`}>{title}</Heading>
        {intro && <p>{intro}</p>}
      </header>
      <ul className={s.list}>{repairs.map((item, index) => <RepairRow key={item.id || index} item={item} locale={locale} currency={currency} Heading={RowHeading} informational={presentation === 'informational'} />)}</ul>
    </div>
  </section>;
}
