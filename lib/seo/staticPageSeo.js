// lib/seo/staticPageSeo.js

export const staticPageSeo = {
  home: {
    type: 'website',

    route: {
      lv: '/',
      ru: '/ru',
    },

    title: {
      lv: 'iPhone, Samsung, datoru un Dyson serviss Rīgā | iLab',
      ru: 'Сервис iPhone, Samsung, компьютеров и Dyson в Риге | iLab',
    },

    description: {
      lv: 'Kvalitatīvs ierīču remonts Rīgā: iPhone, Samsung, planšetdatori, datori un Dyson. Bezmaksas diagnostika, ātrs serviss, garantija, kopš 2013.',
      ru: 'Качественный ремонт техники в Риге: iPhone, Samsung, планшеты, компьютеры и Dyson. Бесплатная диагностика, быстрый сервис, гарантия, с 2013.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iLab iPhone, Samsung, datoru un Dyson serviss Rīgā',
      ru: 'Сервис iLab для iPhone, Samsung, компьютеров и Dyson в Риге',
    },

    noIndex: false,
  },

  iphoneScreenReplacement: {
    type: 'website',

    route: {
      lv: '/iphone-remonts/ekrana-maina',
      ru: '/ru/remont-iphone/zamena-ekрана',
    },

    title: {
      lv: 'iPhone ekrāna maiņa Rīgā | Displeja remonts | iLab',
      ru: 'Замена экрана iPhone в Риге | Ремонт дисплея | iLab',
    },

    description: {
      lv: 'iPhone ekrāna un stikliņa maiņa Rīgā. Kvalitatīvi displeji, bezmaksas diagnostika, skaidra cena, garantija, kopš 2013.',
      ru: 'Замена экрана и стекла iPhone в Риге. Качественные дисплеи, бесплатная диагностика, понятная цена, гарантия, с 2013.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iPhone ekrāna maiņa iLab servisā Rīgā',
      ru: 'Замена экрана iPhone в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  iphoneBatteryReplacement: {
    type: 'website',

    route: {
      lv: '/iphone-remonts/baterijas-maina',
      ru: '/ru/remont-iphone/zamena-batarei',
    },

    title: {
      lv: 'iPhone baterijas maiņa Rīgā | Bieži 30 minūtēs | iLab',
      ru: 'Замена батареи iPhone в Риге | Часто за 30 минут | iLab',
    },

    description: {
      lv: 'iPhone baterijas maiņa Rīgā. Ātra diagnostika, skaidra cena, kvalitatīvas detaļas, garantija, kopš 2013. Bieži 30 minūtēs.',
      ru: 'Замена батареи iPhone в Риге. Быстрая диагностика, понятная цена, качественные детали, гарантия, с 2013. Часто за 30 минут.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iPhone baterijas maiņa iLab servisā Rīgā',
      ru: 'Замена батареи iPhone в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  iphoneChargePortReplacement: {
    type: 'website',

    route: {
      lv: '/iphone-remonts/uzlades-ligzdas-maina',
      ru: '/ru/remont-iphone/zamena-razema-zaryadki',
    },

    title: {
      lv: 'iPhone uzlādes ligzdas maiņa Rīgā | Porta tīrīšana | iLab',
      ru: 'Замена разъёма зарядки iPhone в Риге | Чистка порта | iLab',
    },

    description: {
      lv: 'iPhone nelādējas? Veicam uzlādes ligzdas tīrīšanu vai porta maiņu Rīgā. Bezmaksas diagnostika, skaidra cena, garantija, kopš 2013.',
      ru: 'iPhone не заряжается? Выполняем чистку разъёма или замену порта в Риге. Бесплатная диагностика, понятная цена, гарантия, с 2013.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iPhone uzlādes ligzdas maiņa iLab servisā Rīgā',
      ru: 'Замена разъёма зарядки iPhone в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  iphoneCameraRepair: {
    type: 'website',

    route: {
      lv: '/iphone-remonts/kameras-remonts',
      ru: '/ru/remont-iphone/remont-kamery',
    },

    title: {
      lv: 'iPhone kameras remonts Rīgā | Stikliņš un modulis | iLab',
      ru: 'Ремонт камеры iPhone в Риге | Стекло и модуль | iLab',
    },

    description: {
      lv: 'iPhone kameras remonts Rīgā. Kameras stikliņa vai moduļa maiņa, precīza diagnostika, skaidra cena, garantija, kopš 2013.',
      ru: 'Ремонт камеры iPhone в Риге. Замена стекла камеры или модуля, точная диагностика, понятная цена, гарантия, с 2013.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iPhone kameras remonts iLab servisā Rīgā',
      ru: 'Ремонт камеры iPhone в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  iphoneAudioRepair: {
    type: 'website',

    route: {
      lv: '/iphone-remonts/skalruni-mikrofona-remonts',
      ru: '/ru/remont-iphone/remont-dinamika-mikrofona',
    },

    title: {
      lv: 'iPhone skaļruņa un mikrofona remonts Rīgā | iLab',
      ru: 'Ремонт динамика и микрофона iPhone в Риге | iLab',
    },

    description: {
      lv: 'iPhone skaļruņa un mikrofona remonts Rīgā. Tīrīšana vai moduļa maiņa, precīza diagnostika, skaidra cena, garantija, kopš 2013.',
      ru: 'Ремонт динамика и микрофона iPhone в Риге. Чистка или замена модуля, точная диагностика, понятная цена, гарантия, с 2013.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iPhone skaļruņa un mikrofona remonts iLab servisā Rīgā',
      ru: 'Ремонт динамика и микрофона iPhone в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  iphoneWaterDamageRepair: {
    type: 'website',

    route: {
      lv: '/iphone-remonts/udens-bojajumu-remonts',
      ru: '/ru/remont-iphone/remont-posle-popadaniya-vlagi',
    },

    title: {
      lv: 'iPhone pēc ūdens Rīgā | Datu saglabāšana | iLab',
      ru: 'Ремонт iPhone после влаги | Сохранение данных | iLab',
    },

    description: {
      lv: 'iPhone ūdens bojājumu diagnostika Rīgā. Operatīva glābšana, tīrīšana, korozijas novēršana un datu saglabāšanas iespējas.',
      ru: 'Диагностика iPhone после влаги в Риге. Срочное восстановление, чистка, устранение коррозии и возможность сохранить данные.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iPhone ūdens bojājumu remonts iLab servisā Rīgā',
      ru: 'Ремонт iPhone после влаги в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  iphoneBackCoverReplacement: {
    type: 'website',

    route: {
      lv: '/iphone-remonts/aizmugures-vacina-maina',
      ru: '/ru/remont-iphone/zamena-zadnej-kryshki',
    },

    title: {
      lv: 'iPhone aizmugures vāciņa maiņa Rīgā | iLab',
      ru: 'Замена задней крышки iPhone в Риге | iLab',
    },

    description: {
      lv: 'iPhone aizmugures vāciņa un stikla maiņa Rīgā. Bezmaksas diagnostika, skaidra cena, kvalitatīvas detaļas un 90 dienu garantija.',
      ru: 'Замена задней крышки и стекла iPhone в Риге. Бесплатная диагностика, понятная цена, качественные детали и гарантия 90 дней.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iPhone aizmugures vāciņa maiņa iLab servisā Rīgā',
      ru: 'Замена задней крышки iPhone в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  phoneScreenReplacement: {
    type: 'website',

    route: {
      lv: '/telefonu-remonts/ekrana-maina',
      ru: '/ru/remont-telefonov/zamena-ekrana',
    },

    title: {
      lv: 'Telefona ekrāna maiņa Rīgā | Displeja remonts | iLab',
      ru: 'Замена экрана телефона в Риге | Ремонт дисплея | iLab',
    },

    description: {
      lv: 'Telefona ekrāna un stikliņa maiņa Rīgā iPhone, Samsung, Huawei, Xiaomi un citiem modeļiem. Diagnostika, skaidra cena, garantija.',
      ru: 'Замена экрана и стекла телефона в Риге для iPhone, Samsung, Huawei, Xiaomi и других моделей. Диагностика, понятная цена, гарантия.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'Telefona ekrāna maiņa iLab servisā Rīgā',
      ru: 'Замена экрана телефона в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  phoneBatteryReplacement: {
    type: 'website',

    route: {
      lv: '/telefonu-remonts/baterijas-maina',
      ru: '/ru/remont-telefonov/zamena-batarei',
    },

    title: {
      lv: 'Telefona baterijas maiņa Rīgā | Bieži 30 minūtēs | iLab',
      ru: 'Замена батареи телефона в Риге | Часто за 30 минут | iLab',
    },

    description: {
      lv: 'Telefona baterijas maiņa Rīgā iPhone, Samsung, Huawei, Xiaomi un citiem modeļiem. Ātra diagnostika, skaidra cena, garantija.',
      ru: 'Замена батареи телефона в Риге для iPhone, Samsung, Huawei, Xiaomi и других моделей. Быстрая диагностика, понятная цена, гарантия.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'Telefona baterijas maiņa iLab servisā Rīgā',
      ru: 'Замена батареи телефона в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  phoneChargePortReplacement: {
    type: 'website',

    route: {
      lv: '/telefonu-remonts/uzlades-ligzdas-maina',
      ru: '/ru/remont-telefonov/zamena-razema-zaryadki',
    },

    title: {
      lv: 'Telefona uzlādes ligzdas maiņa Rīgā | Porta tīrīšana | iLab',
      ru: 'Замена разъёма зарядки телефона в Риге | Чистка порта | iLab',
    },

    description: {
      lv: 'Telefons nelādējas? Veicam uzlādes ligzdas tīrīšanu vai porta maiņu Rīgā. Diagnostika, skaidra cena un garantija.',
      ru: 'Телефон не заряжается? Выполняем чистку разъёма или замену порта в Риге. Диагностика, понятная цена и гарантия.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'Telefona uzlādes ligzdas maiņa iLab servisā Rīgā',
      ru: 'Замена разъёма зарядки телефона в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  phoneCameraRepair: {
    type: 'website',

    route: {
      lv: '/telefonu-remonts/kameras-remonts',
      ru: '/ru/remont-telefonov/remont-kamery',
    },

    title: {
      lv: 'Telefona kameras remonts Rīgā | Stikliņš un modulis | iLab',
      ru: 'Ремонт камеры телефона в Риге | Стекло и модуль | iLab',
    },

    description: {
      lv: 'Telefona kameras remonts Rīgā. Kameras stikliņa vai moduļa maiņa, precīza diagnostika, skaidra cena un garantija.',
      ru: 'Ремонт камеры телефона в Риге. Замена стекла камеры или модуля, точная диагностика, понятная цена и гарантия.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'Telefona kameras remonts iLab servisā Rīgā',
      ru: 'Ремонт камеры телефона в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  phoneAudioRepair: {
    type: 'website',

    route: {
      lv: '/telefonu-remonts/skalruni-mikrofona-remonts',
      ru: '/ru/remont-telefonov/remont-dinamika-mikrofona',
    },

    title: {
      lv: 'Telefona skaļruņa un mikrofona remonts Rīgā | iLab',
      ru: 'Ремонт динамика и микрофона телефона в Риге | iLab',
    },

    description: {
      lv: 'Telefona skaļruņa un mikrofona remonts Rīgā. Tīrīšana vai detaļas maiņa, precīza diagnostika, skaidra cena un garantija.',
      ru: 'Ремонт динамика и микрофона телефона в Риге. Чистка или замена детали, точная диагностика, понятная цена и гарантия.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'Telefona skaļruņa un mikrofona remonts iLab servisā Rīgā',
      ru: 'Ремонт динамика и микрофона телефона в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  phoneWaterDamageRepair: {
    type: 'website',

    route: {
      lv: '/telefonu-remonts/udens-bojajumu-remonts',
      ru: '/ru/remont-telefonov/remont-posle-popadaniya-vlagi',
    },

    title: {
      lv: 'Telefons pēc ūdens Rīgā | Datu saglabāšana | iLab',
      ru: 'Ремонт телефона после влаги | Сохранение данных | iLab',
    },

    description: {
      lv: 'Telefona ūdens bojājumu diagnostika Rīgā. Operatīva glābšana, tīrīšana, korozijas novēršana un datu saglabāšanas iespējas.',
      ru: 'Диагностика телефона после влаги в Риге. Срочное восстановление, чистка, устранение коррозии и возможность сохранить данные.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'Telefona ūdens bojājumu remonts iLab servisā Rīgā',
      ru: 'Ремонт телефона после влаги в сервисе iLab в Риге',
    },

    noIndex: false,
  },

  faq: {
    type: 'website',

    route: {
      lv: '/buj',
      ru: '/ru/faq',
    },

    title: {
      lv: 'Biežāk uzdotie jautājumi | iLab',
      ru: 'Часто задаваемые вопросы | iLab',
    },

    description: {
      lv: 'Atbildes par iLab remontu, diagnostiku, cenām, garantiju, pieteikšanos un ierīču nodošanu servisā Rīgā.',
      ru: 'Ответы о ремонте в iLab, диагностике, ценах, гарантии, записи и передаче устройства в сервис в Риге.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iLab biežāk uzdotie jautājumi',
      ru: 'Часто задаваемые вопросы iLab',
    },

    noIndex: false,
  },

  prices: {
    type: 'website',

    route: {
      lv: '/cenas',
      ru: '/ru/ceny',
    },

    title: {
      lv: 'Remonta cenas Rīgā | iLab',
      ru: 'Цены на ремонт в Риге | iLab',
    },

    description: {
      lv: 'iPhone, Samsung, datoru, planšetdatoru un Dyson remonta cenas Rīgā. Diagnostika, skaidra cena pirms darba un garantija.',
      ru: 'Цены на ремонт iPhone, Samsung, компьютеров, планшетов и Dyson в Риге. Диагностика, понятная цена до начала работ и гарантия.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iLab remonta cenas Rīgā',
      ru: 'Цены на ремонт в iLab в Риге',
    },

    noIndex: false,
  },

  contacts: {
    type: 'website',

    route: {
      lv: '/kontakti',
      ru: '/ru/kontakty',
    },

    title: {
      lv: 'Kontakti un iLab filiāles Rīgā | iLab',
      ru: 'Контакты и сервисы iLab в Риге | iLab',
    },

    description: {
      lv: 'iLab kontakti un filiāles Rīgā. Piesaki remontu, sazinies ar servisu un izvēlies ērtāko iLab atrašanās vietu.',
      ru: 'Контакты и сервисы iLab в Риге. Запишитесь на ремонт, свяжитесь с сервисом и выберите удобную локацию iLab.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iLab kontakti un filiāles Rīgā',
      ru: 'Контакты и сервисы iLab в Риге',
    },

    noIndex: false,
  },

  about: {
    type: 'website',

    route: {
      lv: '/par-mums',
      ru: '/ru/o-nas',
    },

    title: {
      lv: 'Par iLab servisu Rīgā | iLab',
      ru: 'О сервисе iLab в Риге | iLab',
    },

    description: {
      lv: 'iLab ir ierīču serviss Rīgā kopš 2013. Remontējam iPhone, Samsung, datorus, planšetdatorus un Dyson ar garantiju.',
      ru: 'iLab — сервис техники в Риге с 2013 года. Ремонтируем iPhone, Samsung, компьютеры, планшеты и Dyson с гарантией.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iLab serviss Rīgā',
      ru: 'Сервис iLab в Риге',
    },

    noIndex: false,
  },

  terms: {
    type: 'website',

    route: {
      lv: '/noteikumi',
      ru: '/ru/pravila',
    },

    title: {
      lv: 'Servisa noteikumi | iLab',
      ru: 'Правила сервиса | iLab',
    },

    description: {
      lv: 'iLab servisa noteikumi par diagnostiku, remontu, garantiju, ierīces nodošanu un saņemšanu servisā Rīgā.',
      ru: 'Правила сервиса iLab: диагностика, ремонт, гарантия, передача и получение устройства в сервисе в Риге.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'iLab servisa noteikumi',
      ru: 'Правила сервиса iLab',
    },

    noIndex: false,
  },

  booking: {
    type: 'website',

    route: {
      lv: '/pieraksties-remontam',
      ru: '/ru/zapisatsja-na-remont',
    },

    title: {
      lv: 'Pieteikt remontu Rīgā | iLab',
      ru: 'Записаться на ремонт в Риге | iLab',
    },

    description: {
      lv: 'Piesaki iPhone, Samsung, datora, planšetdatora vai Dyson remontu iLab servisā Rīgā. Precizēsim cenu, detaļas un ērtāko filiāli.',
      ru: 'Запишитесь на ремонт iPhone, Samsung, компьютера, планшета или Dyson в iLab в Риге. Уточним цену, детали и удобный сервис.',
    },

    image: '/images/og/home.jpg',

    imageAlt: {
      lv: 'Pieteikt remontu iLab servisā Rīgā',
      ru: 'Записаться на ремонт в сервис iLab в Риге',
    },

    noIndex: false,
  },
};

export function getStaticPageSeoConfig(pageKey) {
  const page = staticPageSeo[pageKey];

  if (!page) {
    throw new Error(`[staticPageSeo] Unknown page key: ${pageKey}`);
  }

  return page;
}
