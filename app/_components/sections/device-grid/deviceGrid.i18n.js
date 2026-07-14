export function getIphoneDeviceGridStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heading: 'Проверьте цены и информацию о ремонте вашего iPhone',
      intro:
        'Выберите модель iPhone, чтобы посмотреть доступные услуги, цены и важную информацию.',
      suffix: 'ремонт и цены',
      fallbackAlt: 'Изображение устройства',
      fallbackSeriesTitle: 'Другие модели',
      showLess: 'Показать меньше',
      showMoreSeries: (count) => `Больше моделей этой серии (${count})`,
      yearFilterAria: 'Фильтр по году',
      allYears: 'Все годы',
      searchLabel: 'Поиск модели iPhone',
      searchPlaceholder: 'Найти модель iPhone',
      clearSearch: 'Очистить поиск',
      noResults: 'По вашему запросу модели iPhone не найдены.',
    };
  }

  return {
    heading: 'Pārbaudi sava iPhone remonta cenas un informāciju',
    intro:
      'Izvēlies savu iPhone modeli, lai apskatītu pieejamos remontus, cenas un svarīgāko informāciju.',
    suffix: 'remonts un cenas',
    fallbackAlt: 'Ierīces attēls',
    fallbackSeriesTitle: 'Citi modeļi',
    showLess: 'Rādīt mazāk',
    showMoreSeries: (count) => `Vairāk šīs sērijas modeļu (${count})`,
    yearFilterAria: 'Filtrs pēc gada',
    allYears: 'Visi gadi',
    searchLabel: 'Meklēt iPhone modeli',
    searchPlaceholder: 'Atrodi savu iPhone modeli',
    clearSearch: 'Notīrīt meklēšanu',
    noResults: 'Neviens iPhone modelis neatbilst meklējumam.',
  };
}
