export function getDeviceGridStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      locale: 'ru',
      searchPlaceholder: 'Найти модель…',
      searchAriaLabel: 'Найти модель',
      emptyAll: 'Ничего не найдено.',
      showLess: 'Показать меньше',
      showMoreSeries: (count) => `Больше моделей этой серии (${count})`,
      yearFilterAria: 'Фильтр по году',
      allYears: 'Все годы',
      emptyYear: 'Нет моделей за этот год.',
      fallbackSeriesTitle: 'Другие модели',
    };
  }

  return {
    locale: 'lv',
    searchPlaceholder: 'Meklēt modeli…',
    searchAriaLabel: 'Meklēt modeli',
    emptyAll: 'Nekas netika atrasts.',
    showLess: 'Rādīt mazāk',
    showMoreSeries: (count) => `Vairāk šīs sērijas modeļu (${count})`,
    yearFilterAria: 'Filtrs pēc gada',
    allYears: 'Visi gadi',
    emptyYear: 'Nav modeļu šim gadam.',
    fallbackSeriesTitle: 'Citi modeļi',
  };
}