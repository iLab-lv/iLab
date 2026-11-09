const content = {
  lv: {
    title: 'Kāpēc iLab?',
    subtitle: 'Uzticami remonti, caurspīdīgas cenas un ātrs apgrozījums no sertificētiem tehniķiem.',
    facts: [
      { value: 'Garantija', description: 'Garantija līdz 1 gadam darbam un detaļām' },
      { value: 'Šodien', description: 'Biežākos darbus paveicam tajā pašā dienā' },
      { value: '0 €', description: 'Bezmaksas diagnostika pirms jebkura darba' },
      { value: '13+ gadi', description: 'Pieredzējuši, sertificēti remonta meistari' },
    ],
  },
  ru: {
    title: 'Почему iLab?',
    subtitle: 'Надёжный ремонт, прозрачные цены и быстрые сроки от сертифицированных специалистов.',
    facts: [
      { value: 'Гарантия', description: 'Гарантия до 1 года на работу и детали' },
      { value: 'Сегодня', description: 'Частые ремонты выполняем в тот же день' },
      { value: '0 €', description: 'Бесплатная диагностика перед работой' },
      { value: '13+ лет', description: 'Опытные сертифицированные специалисты по ремонту устройств' },
    ],
  },
};

export function getMetricsWhyContent(locale = 'lv') { return content[locale] || content.lv; }
