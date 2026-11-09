import { getReviewPlaces } from '../../features/reviews/reviews.helpers';

export function getServiceReviewPlaces(summary, locale = 'lv') {
  return getReviewPlaces(summary, locale).map((place) => ({
    ...place,
    label: place.label === place.key
      ? place.key === 'domina' ? 'T/C Domina Shopping' : 'T/C Spice Life'
      : place.label,
  }));
}

// Preserve the homepage's existing aggregate-count calculation.
export function getTotalReviewCount(places) {
  return places.some((place) => place.count != null)
    ? places.reduce((sum, place) => sum + (Number(place.count) || 0), 0)
    : null;
}

export function getReviewWindow(reviews, page = 0, size = 2) {
  const pageCount = Math.ceil(reviews.length / size);
  const current = Math.max(0, Math.min(page, Math.max(0, pageCount - 1)));
  const start = current * size;
  const end = Math.min(start + size, reviews.length);
  return {
    page: current, items: reviews.slice(start, end), pageCount,
    previous: current > 0, next: current + 1 < pageCount,
    feedback: reviews.length ? `${start + 1}${end > start + 1 ? `–${end}` : ''} / ${reviews.length}` : '0 / 0',
  };
}

export function getReviewsCopy(locale = 'lv') {
  return locale === 'ru' ? {
    title: 'Отзывы клиентов', subtitle: 'Реальные люди. Реальный опыт. В Риге.',
    word: 'отзывов', location: 'Сервисный центр iLab · Рига', all: 'Смотреть все отзывы',
    previous: 'Предыдущие отзывы', next: 'Следующие отзывы', position: 'Показанные отзывы',
    empty: 'Сейчас для этого филиала ещё нет избранных отзывов.',
  } : {
    title: 'Klientu atsauksmes', subtitle: 'Reāli cilvēki. Reāla pieredze. Rīgā.',
    word: 'atsauksmes', location: 'iLab servisa centrs · Rīga', all: 'Skatīt visas atsauksmes',
    previous: 'Iepriekšējās atsauksmes', next: 'Nākamās atsauksmes', position: 'Redzamās atsauksmes',
    empty: 'Šobrīd šai filiālei vēl nav izceltu atsauksmju.',
  };
}

export function getQuantityReviewTitle(total, locale = 'lv') {
  if (total == null) return locale === 'ru' ? 'Отзывы Google' : 'Google atsauksmes';
  const number = new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'lv-LV').format(total);
  const category = new Intl.PluralRules(locale).select(total);
  const label = locale === 'ru'
    ? category === 'one' ? 'отзыв Google' : category === 'few' ? 'отзыва Google' : 'отзывов Google'
    : category === 'one' ? 'Google atsauksme' : 'Google atsauksmes';
  return `${number} ${label}`;
}
