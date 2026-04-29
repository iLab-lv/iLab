export const CTA_MAIN_CONTENT = {
  lv: {
    contact: {
      label: 'Sazināties',
      ariaLabel: 'Sazināties ar iLab servisu',
    },
    booking: {
      label: 'Pieteikt remontu',
      href: '/pieraksties-remontam',
      ariaLabel: 'Pierakstīties uz remontu',
    },
    prices: {
      label: 'Cenas',
      href: '/cenas',
      ariaLabel: 'Apskatīt remonta cenas',
    },
    locator: {
      label: 'Servisa centri',
      ariaLabel: 'Servisa centri',
    },
    bottomBar: {
      ariaLabel: 'Galvenās darbības',
    },
  },

  ru: {
    contact: {
      label: 'Связаться',
      ariaLabel: 'Связаться с сервисом iLab',
    },
    booking: {
      label: 'Заявка на ремонт',
      href: '/ru/zapisatsja-na-remont',
      ariaLabel: 'Записаться на ремонт',
    },
    prices: {
      label: 'Цены',
      href: '/ru/ceny',
      ariaLabel: 'Посмотреть цены на ремонт',
    },
    locator: {
      label: 'Сервисные центры',
      ariaLabel: 'Сервисные центры',
    },
    bottomBar: {
      ariaLabel: 'Основные действия',
    },
  },
};

export function getCtaMainContent(locale = 'lv') {
  return CTA_MAIN_CONTENT[locale] || CTA_MAIN_CONTENT.lv;
}