import { FaCircleCheck } from 'react-icons/fa6';

import s from './QuickAnswer.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Īsā atbilde',
    title: 'iPhone ekrāna maiņa',
    accent: 'īsumā',
    copy: 'iPhone ekrāna maiņa parasti ir nepieciešama, ja stikls ir saplaisājis, displejā redzamas līnijas vai plankumi, ekrāns mirgo, skāriens nereaģē vai pēc kritiena ekrāns palicis melns. iLab pārbauda bojājumu, precizē iPhone modeli, izskaidro pieejamos ekrāna variantus un saskaņo cenu pirms darba sākšanas.',
  },
  ru: {
    eyebrow: 'Короткий ответ',
    title: 'Замена экрана iPhone',
    accent: 'вкратце',
    copy: 'Замена экрана iPhone обычно необходима, если стекло треснуло, на дисплее появились линии или пятна, экран мерцает, сенсор не реагирует либо после падения экран остался чёрным. В iLab проверяют повреждение, уточняют модель iPhone, объясняют доступные варианты экрана и согласовывают цену до начала работы.',
  },
};

const BATTERY_CONTENT = {
  lv: {
    eyebrow: 'Īsā atbilde',
    title: 'iPhone baterijas maiņa',
    accent: 'īsumā',
    copy: 'iPhone baterijas maiņa parasti ir nepieciešama, ja telefons ātri izlādējas, izslēdzas pie atlikušiem procentiem, strauji zaudē uzlādi, uzkarst ikdienas lietošanā vai baterijas veselība ir būtiski samazinājusies. iLab pārbauda ierīci, precizē iPhone modeli, izskaidro remonta iespējas un saskaņo cenu pirms darba sākšanas.',
  },
  ru: {
    eyebrow: 'Короткий ответ',
    title: 'Замена батареи iPhone',
    accent: 'вкратце',
    copy: 'Замена батареи iPhone обычно необходима, если телефон быстро разряжается, выключается при оставшихся процентах, резко теряет заряд, нагревается при обычном использовании или состояние аккумулятора заметно ухудшилось. iLab проверяет устройство, уточняет модель iPhone, объясняет варианты ремонта и согласовывает цену до начала работы.',
  },
};

export default function QuickAnswer({ locale = 'lv', variant = 'iphone-screen' }) {
  const source = variant === 'iphone-battery' ? BATTERY_CONTENT : CONTENT;
  const content = source[locale] || source.lv;

  return (
    <section className={s.section} aria-labelledby="screen-quick-answer-title">
      <div className={s.container}>
        <div className={s.answer}>
          <span className={s.icon} aria-hidden="true">
            <FaCircleCheck />
          </span>
          <div className={s.copy}>
            <span className={s.eyebrow}>{content.eyebrow}</span>
            <h2 id="screen-quick-answer-title">
              {content.title} — <em>{content.accent}</em>
            </h2>
            <p>{content.copy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
