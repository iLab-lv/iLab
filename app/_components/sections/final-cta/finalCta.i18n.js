const CONTENT = {
  lv: {
    iphone: {
      eyebrow: 'Domina Shopping vai Spice Life',
      titleStart: 'Radusies problēma?',
      titleAccent: 'Salabosim ātri.',
      text: 'Precizēsim cenu, detaļu pieejamību un ieteiksim ērtāko filiāli.',
      price: 'Uzzināt cenu',
      call: 'Zvanīt',
      whatsapp: 'WhatsApp',
    },
  },
  ru: {
    iphone: {
      eyebrow: 'Domina Shopping или Spice Life',
      titleStart: 'Возникла проблема?',
      titleAccent: 'Быстро исправим.',
      text: 'Уточним стоимость, наличие деталей и подскажем удобный филиал.',
      price: 'Узнать цену',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
    },
  },
};

export function getFinalCtaContent(locale = 'lv', variant = 'iphone') {
  const copy = CONTENT[locale] || CONTENT.lv;
  return copy[variant] || copy.iphone;
}
