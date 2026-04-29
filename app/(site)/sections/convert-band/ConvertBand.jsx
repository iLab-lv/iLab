// app/(site)/sections/home/ConvertBand.jsx

import s from './ConvertBand.module.scss';
import Button from '@components/button/Button';
import { getConvertBandContent } from './convertBandContent';

export default function ConvertBand({
  id = 'convert',
  locale = 'lv',
  variant = 'default',
}) {
  const content = getConvertBandContent(locale, variant);

  return (
    <section id={id} className={`${s.section} ${s.convert}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.convertTitle}>{content.title}</h2>

        <div className={s.ctaRow}>
          <Button variant={content.primary.variant} size="md" href={content.primary.href}>
            {content.primary.label}
          </Button>

          <Button variant={content.secondary.variant} size="md" href={content.secondary.href}>
            {content.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}