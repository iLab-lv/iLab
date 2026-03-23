export function getDeviceSelectorStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Выберите модель устройства',
      intro:
        'Найдите нужную модель по названию или просмотрите серии и годы выпуска.',
    };
  }

  return {
    title: 'Izvēlies ierīces modeli',
    intro:
      'Atrodi vajadzīgo modeli pēc nosaukuma vai pārlūko sērijas un izlaiduma gadus.',
  };
}