import BookButton from '@sections/pricing/BookButton';

import s from './ModelPriceList.module.scss';

function getStrings(locale = 'lv') {
  return locale === 'ru'
    ? {
        service: 'Услуга', time: 'Срок', price: 'Цена', bookLabel: 'Записаться',
        onRequest: 'по запросу', sameDay: 'В тот же день', untilPrefix: 'до', fromPrefix: 'от',
        notes: [
          'Бесплатная диагностика. Точную цену подтверждаем после проверки.',
          'Гарантия до 1 года на все ремонтные работы.',
          'Цены указаны с учётом стоимости детали и работы.',
          'Указанная цена действительна, если деталь есть в наличии на складе.',
        ],
      }
    : {
        service: 'Pakalpojums', time: 'Laiks', price: 'Cena', bookLabel: 'Pieraksties',
        onRequest: 'pēc pieprasījuma', sameDay: 'Tajā pašā dienā', untilPrefix: 'līdz', fromPrefix: 'no',
        notes: [
          'Bezmaksas diagnostika. Precīzu cenu apstiprinām pēc pārbaudes.',
          'garantija līdz 1 gadam visiem remontdarbiem.',
          'Cenas norādītas ar detaļu un darba izmaksām.',
          'Norādītā cena ir spēkā, ja detaļa ir pieejama noliktavā.',
        ],
      };
}

function isHiddenItem(item) {
  return !item || item.hidden === true || item.hidden === 'true' ||
    item.isHidden === true || item.isHidden === 'true' ||
    item.visible === false || item.visible === 'false' || item.status === 'hidden';
}

function formatTime(item, locale) {
  const strings = getStrings(locale);
  if (typeof item.timeText === 'string' && item.timeText.trim()) return item.timeText.trim();
  const { timeMin: min, timeMax: max } = item;
  if (!min && !max) return strings.sameDay;
  if (min && max) return max >= 120 ? strings.sameDay : `${min}–${max} min`;
  if (max) return max >= 120 ? strings.sameDay : `${strings.untilPrefix} ${max} min`;
  return `${min} min`;
}

function formatPrice(item, currency, locale) {
  const strings = getStrings(locale);
  if (typeof item.price !== 'number' || !Number.isFinite(item.price)) return strings.onRequest;
  const value = `${item.price.toFixed(0)} ${currency === 'EUR' ? '€' : currency}`;
  return item.isStartingFrom ? `${strings.fromPrefix} ${value}` : value;
}

export default function ModelPriceList({
  id = 'cenas', modelName = 'iPhone', titleAccent = 'Cenas un remonta laiks',
  items = [], currency = 'EUR', headingLevel = 2, bookLabel, showNotes = true,
  locale = 'lv',
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const strings = getStrings(locale);
  const rows = Array.isArray(items) ? items.filter((item) => !isHiddenItem(item)) : [];
  const fullTitle = `${modelName} ${titleAccent}`;
  if (!rows.length) return null;

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.title}>
          {modelName} <span>{titleAccent}</span>
        </Heading>

        <div className={s.table} role="table" aria-label={fullTitle}>
          <div className={`${s.tr} ${s.head}`} role="row">
            <div className={s.th} role="columnheader">{strings.service}</div>
            <div className={s.th} role="columnheader">{strings.time}</div>
            <div className={s.th} role="columnheader">{strings.price}</div>
            <div className={s.th} role="columnheader" />
          </div>
          {rows.map((item) => (
            <div key={item.id || item.title} className={s.tr} role="row">
              <div className={s.td} role="cell"><div className={s.serviceTitle}>{item.title}</div></div>
              <div className={s.td} role="cell"><span className={s.chip}>{formatTime(item, locale)}</span></div>
              <div className={s.td} role="cell"><span className={s.price}>{formatPrice(item, currency, locale)}</span></div>
              <div className={s.td} role="cell"><BookButton className={s.bookBtn} label={bookLabel || strings.bookLabel} /></div>
            </div>
          ))}
        </div>

        <div className={s.cards} aria-label={fullTitle}>
          {rows.map((item) => (
            <article key={`m-${item.id || item.title}`} className={s.card}>
              <header><div className={s.serviceTitle}>{item.title}</div></header>
              <div className={s.metaRow}>
                <span className={s.chip}>{formatTime(item, locale)}</span>
                <span className={s.price}>{formatPrice(item, currency, locale)}</span>
              </div>
              <div className={s.ctaRow}><BookButton className={s.bookBtn} label={bookLabel || strings.bookLabel} /></div>
            </article>
          ))}
        </div>

        {showNotes && <ul className={s.notes} role="note">{strings.notes.map((note) => <li key={note}>{note}</li>)}</ul>}
      </div>
    </section>
  );
}
