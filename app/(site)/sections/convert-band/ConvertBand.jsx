// app/(site)/sections/home/ConvertBand.jsx
import s from './ConvertBand.module.scss';
import Button from '@components/button/Button';

export default function ConvertBand({
  id = 'convert',
  title = 'Vajadzīga palīdzība?',
  primary = { label: 'Sazināties ar meistaru', href: '/contact', variant: 'secondary' },
  secondary = { label: 'Pieraksties uz remontu', href: '/pieraksties', variant: 'primary' },
}) {
  return (
    <section id={id} className={`${s.section} ${s.convert}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.convertTitle}>{title}</h2>
        <div className={s.ctaRow}>
          <Button variant={primary.variant} size="md" href={primary.href}>{primary.label}</Button>
          <Button variant={secondary.variant} size="md" href={secondary.href}>{secondary.label}</Button>
        </div>
      </div>
    </section>
  );
}
