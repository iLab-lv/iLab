import s from './MetricsWhy.module.scss';
import SignatureText from '../headings/SignatureText';
import { getWhyHeading } from '@/lib/presentation/signatureHeadings';

export default function MetricsWhy({ id = 'benefits', title, subtitle, facts = [] }) {
  if (!facts.length) return null;
  return <section id={id} data-why="metrics" className={s.section} aria-labelledby={`${id}-title`}>
    <header><h2 id={`${id}-title`}><SignatureText text={title} parts={getWhyHeading(title)} level="section" /></h2>{subtitle && <p>{subtitle}</p>}</header>
    <div>{facts.map(({ value, description }) => <article key={value}>
      <strong>{value}</strong><span>{description}</span>
    </article>)}</div>
  </section>;
}
