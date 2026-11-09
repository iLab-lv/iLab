import { HomeProcess } from '@/app/(site)/HomeMotion';
import { getProcessContent } from '@/app/(site)/sections/process/process.i18n';
import TimelineProcess from './TimelineProcess';
import { normalizeProcessSteps } from './process.model';
import home from '@/app/(site)/HomePage.module.scss';
import s from './ServiceProcess.module.scss';

export default function ServiceProcess({
  id = 'process', locale = 'lv', variant = 'timeline', eyebrow, title, subtitle,
  steps, headingLevel = 2, className = '',
}) {
  const defaults = getProcessContent(locale);
  const items = normalizeProcessSteps(steps ?? defaults.steps);
  if (!items.length) return null;
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const header = <header className={s.header}>
    {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
    <Heading id={`${id}-title`}>{title ?? defaults.title}</Heading>
    {subtitle && <p className={s.subtitle}>{subtitle}</p>}
  </header>;
  return <section id={id} className={`${home.section} ${s.scope} ${className}`} data-service-process={variant} aria-labelledby={`${id}-title`}>
    {variant === 'sticky' ? <div className={`${home.processLayout} ${s.sticky}`}>
      {header}<div className={s.stickyBody} data-motion-skip><HomeProcess steps={items} /></div>
    </div> : <>{header}<TimelineProcess steps={items} headingLevel={headingLevel === 3 ? 4 : 3} /></>}
  </section>;
}
