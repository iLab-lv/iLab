const SAZINATIES_PANEL_CONTENT = {
  lv: {
    tabsAriaLabel: 'Filiāles',

    closed: 'Slēgts',
    openUntil: (time) => `Atvērts - līdz ${time}`,
    closedUntil: (time) => `Slēgts - atvērsies ${time}`,

    showHoursTitle: 'Skatīt darba laiku',
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
    tabsAriaLabel: 'Филиалы',

    closed: 'Закрыто',
    openUntil: (time) => `Открыто - до ${time}`,
    closedUntil: (time) => `Закрыто - откроется в ${time}`,

    showHoursTitle: 'Посмотреть время работы',
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

export function getSazinatiesPanelContent(locale = 'lv') {
  return SAZINATIES_PANEL_CONTENT[locale] || SAZINATIES_PANEL_CONTENT.lv;
}