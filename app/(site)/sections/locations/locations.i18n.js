const LOCATIONS_CONTENT = {
  lv: {
    title: 'Servisa centri Rīgā',
    tabsAriaLabel: 'Filiāles',

    closed: 'Slēgts',
    openUntil: (time) => `Atvērts - līdz ${time}`,
    closedUntil: (time) => `Slēgts - atvērsies ${time}`,

    directions: 'Norādes',
    hoursAriaLabel: 'Darba laiks',
    viewGoogleMaps: 'Skatīt Google Maps',
    routes: 'Maršruti',

    phoneLabel: 'Tel:',
    emailLabel: 'email:',

    call: 'Zvanīt',
    whatsapp: 'WhatsApp',

    callAriaLabel: (locationLabel) => `Zvanīt ${locationLabel}`,
    whatsappAriaLabel: (locationLabel) => `WhatsApp ${locationLabel}`,
  },

  ru: {
    title: 'Сервисные центры в Риге',
    tabsAriaLabel: 'Филиалы',

    closed: 'Закрыто',
    openUntil: (time) => `Открыто - до ${time}`,
    closedUntil: (time) => `Закрыто - откроется в ${time}`,

    directions: 'Маршрут',
    hoursAriaLabel: 'Время работы',
    viewGoogleMaps: 'Открыть в Google Maps',
    routes: 'Маршруты',

    phoneLabel: 'Тел:',
    emailLabel: 'email:',

    call: 'Позвонить',
    whatsapp: 'WhatsApp',

    callAriaLabel: (locationLabel) => `Позвонить в ${locationLabel}`,
    whatsappAriaLabel: (locationLabel) => `WhatsApp ${locationLabel}`,
  },
};

export function getLocationsContent(locale = 'lv') {
  return LOCATIONS_CONTENT[locale] || LOCATIONS_CONTENT.lv;
}