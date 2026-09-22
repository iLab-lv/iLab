import s from './PriceList.module.scss';
import BookButton from './BookButton';

function getStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      service: 'Услуга',
      time: 'Срок',
      price: 'Цена',
      bookLabel: 'Записаться',
      onRequest: 'по запросу',
      sameDay: 'В тот же день',
      untilPrefix: 'до',
      notes: [
        'Бесплатная диагностика. Точную цену подтверждаем после проверки.',
        'Гарантия до 1 года на все ремонтные работы.',
        'Цены указаны с учётом стоимости детали и работы.',
        'Указанная цена действительна, если деталь есть в наличии на складе.',
      ],
      fromPrefix: 'от',
    };
  }

  return {
    service: 'Pakalpojums',
    time: 'Laiks',
    price: 'Cena',
    bookLabel: 'Pieraksties',
    onRequest: 'pēc pieprasījuma',
    sameDay: 'Tajā pašā dienā',
    untilPrefix: 'līdz',
    notes: [
      'Bezmaksas diagnostika. Precīzu cenu apstiprinām pēc pārbaudes.',
      'garantija līdz 1 gadam visiem remontdarbiem.',
      'Cenas norādītas ar detaļu un darba izmaksām.',
      'Norādītā cena ir spēkā, ja detaļa ir pieejama noliktavā.',
    ],
    fromPrefix: 'no',
  };
}

function isHiddenItem(item) {
  if (!item) return true;

  return (
    item.hidden === true ||
    item.hidden === 'true' ||
    item.isHidden === true ||
    item.isHidden === 'true' ||
    item.visible === false ||
    item.visible === 'false' ||
    item.status === 'hidden'
  );
}

function fmtTime(min, max, locale = 'lv') {
  const strings = getStrings(locale);

  if (!min && !max) return strings.sameDay;
  if (min && max) {
    if (max >= 120) return strings.sameDay;
    return `${min}–${max} min`;
  }
  if (max) return max >= 120 ? strings.sameDay : `${strings.untilPrefix} ${max} min`;
  return `${min} min`;
}

function fmtTimeText(timeText, min, max, locale = 'lv') {
  if (typeof timeText === 'string' && timeText.trim()) {
    return timeText.trim();
  }

  return fmtTime(min, max, locale);
}

function fmtPriceText(item, currency = 'EUR', locale = 'lv') {
  const strings = getStrings(locale);

  const hasNumericPrice =
    typeof item?.price === 'number' && Number.isFinite(item.price);

  if (!hasNumericPrice) {
    return strings.onRequest;
  }

  const symbol = currency === 'EUR' ? '€' : currency;
  const value = `${item.price.toFixed(0)} ${symbol}`;

  if (item?.isStartingFrom) {
    return `${strings.fromPrefix} ${value}`;
  }

  return value;
}

export default function PriceList({
  id = 'cenas',
  title = 'Cenas un remonta laiks',
  items = [],
  currency = 'EUR',
  headingLevel = 2,
  bookLabel,
  showNotes = true,
  locale = 'lv',
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const strings = getStrings(locale);
  const resolvedBookLabel = bookLabel || strings.bookLabel;

  const rows = Array.isArray(items) ? items.filter((item) => !isHiddenItem(item)) : [];

  if (rows.length === 0) return null;

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <Heading id={`${id}-title`} className={s.title}>
          {title}
        </Heading>

        <div className={s.table} role="table" aria-label={title}>
          <div className={`${s.tr} ${s.head}`} role="row">
            <div className={s.th} role="columnheader">
              {strings.service}
            </div>
            <div className={s.th} role="columnheader">
              {strings.time}
            </div>
            <div className={s.th} role="columnheader">
              {strings.price}
            </div>
            <div className={s.th} role="columnheader">
              {' '}
            </div>
          </div>

          {rows.map((it) => (
            <div key={it.id || it.title} className={s.tr} role="row">
              <div className={s.td} role="cell">
                <div className={s.serviceCell}>
                  <div className={s.serviceTitle}>{it.title}</div>
                </div>
              </div>

              <div className={s.td} role="cell">
                <span className={s.chip}>
                  {fmtTimeText(it.timeText, it.timeMin, it.timeMax, locale)}
                </span>
              </div>

              <div className={s.td} role="cell">
                <span className={s.price}>
                  {fmtPriceText(it, currency, locale)}
                </span>
              </div>

              <div className={s.td} role="cell">
                <BookButton className={s.bookBtn} label={resolvedBookLabel} />
              </div>
            </div>
          ))}
        </div>

        <div className={s.cards} aria-label={title}>
          {rows.map((it) => (
            <article key={`m-${it.id || it.title}`} className={s.card}>
              <header className={s.cardHead}>
                <div className={s.serviceTitle}>{it.title}</div>
              </header>

              <div className={s.metaRow}>
                <span className={s.chip}>
                  {fmtTimeText(it.timeText, it.timeMin, it.timeMax, locale)}
                </span>
                <span className={s.price}>
                  {fmtPriceText(it, currency, locale)}
                </span>
              </div>

              <div className={s.ctaRow}>
                <BookButton className={s.bookBtn} label={resolvedBookLabel} />
              </div>
            </article>
          ))}
        </div>

        {showNotes && (
          <ul className={s.notes} role="note">
            {strings.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
