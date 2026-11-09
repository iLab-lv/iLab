import Link from 'next/link';
import { normalizeFaqItems } from '@/lib/faq/faqModel';
import s from './ServiceFaq.module.scss';

// One Service presentation. Protected landing renderers remain separate compatibility exports.
export default function ServiceFaq({ id = 'faq', title, subtitle, items = [], href, linkLabel,
  limit = Infinity, openFirst = true, openAll = false, headingLevel = 2, className = '' }) {
  const visible = normalizeFaqItems(items, { limit });
  if (!visible.length) return null;
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  return <section id={id} data-service-faq className={`${s.section} ${className}`} aria-labelledby={title ? `${id}-title` : undefined}>
    {(title || subtitle || href) && <header className={s.header}>
      {title && <Heading id={`${id}-title`} className={s.title}>{title}</Heading>}
      {subtitle && <p className={s.subtitle}>{subtitle}</p>}
      {href && <Link className={s.link} href={href}>{linkLabel}</Link>}
    </header>}
    <div className={s.list}>{visible.map(({ q, a }, index) => <details key={q} open={openAll || (openFirst && index === 0)}>
      <summary>{q}<i aria-hidden="true" /></summary>
      <div>{typeof a === 'string' ? <p dangerouslySetInnerHTML={{ __html: a }} /> : a}</div>
    </details>)}</div>
  </section>;
}
