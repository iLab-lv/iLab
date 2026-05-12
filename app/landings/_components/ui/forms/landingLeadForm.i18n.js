const LANDING_LEAD_FORM_CONTENT = {
  lv: {
    common: {
      submitError: 'Neizdevās nosūtīt',
      nameLabel: 'Vārds',
      phoneLabel: 'Tālrunis',
      phonePlaceholder: '+371 2XXXXXXX',
      deviceLabel: 'Ierīce',
      devicePlaceholder: 'iPhone 13, iPhone 14 Pro...',
      faultLabel: 'Problēma',
      faultPlaceholder:
        'Īsi aprakstiet problēmu, piemēram: saplīsis ekrāns, baterija ātri izlādējas, neuzlādējas...',
      locationLegend: 'Filiāle',
      dateLabel: 'Datums',
      timeLegend: 'Vēlamais laiks',
      submitting: 'Sūtām…',
    },

    sheet: {
      price: {
        title: 'Uzzini cenu jau',
        titleAccent: 'dažu minūšu laikā',
      },

      booking: {
        title: 'Rezervē remontu iepriekš',
        titleAccent: 'bez liekas gaidīšanas',
      },
    },

    price: {
      title: 'Precizēt cenu',
      intro:
        'Atstājiet ierīces modeli un problēmu - precizēsim cenu, detaļu pieejamību un aptuveno remonta laiku.',
      submit: 'Precizēt cenu',
      submitAriaLabel: 'Nosūtīt cenas pieprasījumu',
      successTitle: 'Paldies, pieprasījums saņemts!',
      successText:
        'Tuvākajā laikā sazināsimies ar jums, lai precizētu cenu un remonta termiņu.',
    },

    booking: {
      title: 'Pieteikt remontu',
      intro:
        'Atstājiet informāciju par ierīci un vēlamo laiku - pārbaudīsim detaļu pieejamību un apstiprināsim pierakstu.',
      submit: 'Pieteikt remontu',
      submitAriaLabel: 'Nosūtīt remonta pieteikumu',
      successTitle: 'Paldies, pieraksts saņemts!',
      successText:
        'Pārbaudīsim detaļu pieejamību un tuvākajā laikā sazināsimies, lai apstiprinātu pierakstu.',
    },
  },
};

function getSafeContent(locale = 'lv') {
  const safeLocale = LANDING_LEAD_FORM_CONTENT[locale] ? locale : 'lv';
  return LANDING_LEAD_FORM_CONTENT[safeLocale];
}

export function getLandingLeadFormContent(locale = 'lv', mode = 'price') {
  const content = getSafeContent(locale);

  return {
    ...content.common,
    ...content[mode],
  };
}

export function getLandingLeadSheetContent(locale = 'lv', mode = 'price') {
  const content = getSafeContent(locale);

  return content.sheet[mode] || content.sheet.price;
}