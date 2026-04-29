// app/(site)/sections/convert-band/convertBandContent.js

const CONVERT_BAND_CONTENT = {
  lv: {
    default: {
      title: 'Vajadzīga palīdzība?',
      primary: {
        label: 'Sazināties ar meistaru',
        href: '/kontakti',
        variant: 'secondary',
      },
      secondary: {
        label: 'Pieraksties uz remontu',
        href: '/pieraksties-remontam',
        variant: 'primary',
      },
    },
  },

  ru: {
  default: {
    title: 'Нужна помощь?',
    primary: {
      label: 'Связаться с мастером',
      href: '/ru/kontakty',
      variant: 'secondary',
    },
    secondary: {
      label: 'Записаться на ремонт',
      href: '/ru/zapisatsja-na-remont',
      variant: 'primary',
    },
  },
},
};

export function getConvertBandContent(locale = 'lv', variant = 'default') {
  const localeContent = CONVERT_BAND_CONTENT[locale] || CONVERT_BAND_CONTENT.lv;
  return localeContent[variant] || localeContent.default;
}