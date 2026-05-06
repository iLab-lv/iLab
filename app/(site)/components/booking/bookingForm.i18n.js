const BOOKING_FORM_CONTENT = {
  lv: {
    submitError: 'Neizdevās nosūtīt',

    successTitle: 'Paldies, pieraksts saņemts!',
    successText:
      'Paldies, ka pieteicāt vizīti! Mūsu tehniķi pārbaudīs detaļu pieejamību un darba grafiku un tuvākajā laikā sazināsies ar jums, lai apstiprinātu pierakstu un precizētu detaļas.',
    homeLink: 'Uz sākumlapu',

    nameLabel: 'Vārds',
    phoneLabel: 'Tālrunis',
    phonePlaceholder: '+371 2XXXXXXX',

    deviceLabel: 'Ierīces tips',
    devicePlaceholder: 'iPhone 13, Samsung S22, u.c.',

    dateLabel: 'Datums',

    faultLabel: 'Problēma',
    faultPlaceholder:
      'Īss apraksts (piem., ekrāns saplīsis, baterija tur vāji, neuzlādējas...)',

    locationLegend: 'Filiāle',
    timeLegend: 'Vēlamais laiks',

    submitAriaLabel: 'Nosūtīt pierakstu',
    submit: 'Nosūtīt',
    submitting: 'Sūtām…',
  },

  ru: {
    submitError: 'Не удалось отправить',

    successTitle: 'Спасибо, запись получена!',
    successText:
      'Спасибо, что записались на визит! Наши техники проверят наличие деталей и рабочий график и в ближайшее время свяжутся с вами, чтобы подтвердить запись и уточнить детали.',
    homeLink: 'На главную',

    nameLabel: 'Имя',
    phoneLabel: 'Телефон',
    phonePlaceholder: '+371 2XXXXXXX',

    deviceLabel: 'Тип устройства',
    devicePlaceholder: 'iPhone 13, Samsung S22 и т.д.',

    dateLabel: 'Дата',

    faultLabel: 'Проблема',
    faultPlaceholder:
      'Краткое описание (например, разбит экран, батарея быстро разряжается, не заряжается...)',

    locationLegend: 'Филиал',
    timeLegend: 'Желаемое время',

    submitAriaLabel: 'Отправить запись',
    submit: 'Отправить',
    submitting: 'Отправляем…',
  },
};

export function getBookingFormContent(locale = 'lv') {
  return BOOKING_FORM_CONTENT[locale] || BOOKING_FORM_CONTENT.lv;
}