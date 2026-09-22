import {
  FaClipboardCheck,
  FaEye,
  FaMagnifyingGlass,
  FaShieldHalved,
} from 'react-icons/fa6';

import s from './LandingBenefits.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getBenefits(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return [
      { icon: <FaMagnifyingGlass />, text: 'Бесплатная диагностика' },
      { icon: <FaClipboardCheck />, text: 'Цена согласуется до ремонта' },
      { icon: <FaEye />, text: 'Без скрытых платежей' },
      { icon: <FaShieldHalved />, text: 'гарантия до 1 года' },
    ];
  }

  return [
    { icon: <FaMagnifyingGlass />, text: 'Bezmaksas diagnostika' },
    { icon: <FaClipboardCheck />, text: 'Cena tiek saskaņota pirms remonta' },
    { icon: <FaEye />, text: 'Bez slēptām izmaksām' },
    { icon: <FaShieldHalved />, text: 'garantija līdz 1 gadam' },
  ];
}

export default function LandingBenefits({
  id = 'benefits',
  locale = 'lv',
}) {
  const benefits = getBenefits(locale);

  return (
    <section id={id} className={s.section} aria-label="Repair benefits">
      <div className={s.container}>
        <div className={s.row}>
          {benefits.map((benefit) => (
            <div key={benefit.text} className={s.item}>
              <span className={s.icon} aria-hidden="true">
                {benefit.icon}
              </span>
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}