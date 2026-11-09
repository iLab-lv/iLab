import Link from 'next/link';
import s from './ModelCard.module.scss';

function getCardStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      suffix: 'ремонт и цены',
      fallbackAlt: 'Изображение устройства',
    };
  }

  return {
    suffix: 'remonts un cenas',
    fallbackAlt: 'Ierīces attēls',
  };
}

export default function ModelCard({
  device,
  baseHref,
  locale = 'lv',
  className = '',
  ...linkProps
}) {
  const strings = getCardStrings(locale);
  const name = device?.name || '';
  const href = `${baseHref}/${device.slug}`;
  const fullLabel = `${name} ${strings.suffix}`.trim();

  return (
    <Link
      href={href}
      className={`${s.card} ${className || ''}`}
      aria-label={fullLabel}
      {...linkProps}
    >
      <div className={s.meta}>
        <h3 className={s.name}>
          <span className={s.modelLine}>
            {name}
            {device?.year ? <span className={s.year}> {device.year}</span> : null}
          </span>
        </h3>
      </div>
    </Link>
  );
}
