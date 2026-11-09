// Production Ads copy snapshot. Sources are private factories in app/ads/_components.
// Keep these values aligned with the original landing; original files remain untouched.
function normalizeLocale(locale) { return locale === 'ru' ? 'ru' : 'lv'; }

// speed/LandingSpeed.jsx
export function getSpeedContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Без долгого ожидания',
      subtitle:
        'Популярные работы выполняем быстро, если нужная деталь есть в наличии.',

      bookingTitle: 'Подготовим деталь',
      bookingAccent: 'до вашего визита',
      bookingText:
        'Уточним наличие и предложим удобное время для диагностики или замены.',
      bookingCta: 'Забронировать время',

      cards: [
        {
          
          value: '20–40 мин',
          title: 'для самых быстрых работ без очереди',
        },
        {
          
          value: '2 филиала в Риге',
          title: 'T/C Domina Shopping и T/C Spice Life',
        },
        {
          
          value: 'Детали на месте',
          title:
            'на складе доступен широкий выбор оригинальных и аналоговых деталей',
        },
      ],
    };
  }

  return {
    title: 'Ātri, bez ilgas gaidīšanas',
    subtitle:
      'Populārāko bojājumu novēršanu veicam ātri, ja detaļa ir pieejama uz vietas.',

    bookingTitle: 'Sagatavosim detaļu',
    bookingAccent: 'pirms tava apmeklējuma',
    bookingText:
      'Precizēsim pieejamību un ieteiksim ērtāko laiku diagnostikai vai detaļas maiņai.',
    bookingCta: 'Rezervēt laiku',

    cards: [
      {
        
        value: '20–40 min',
        title: 'Ātrākajiem darbiem bez rindas',
      },
      {
        
        value: '2 filiāles Rīgā',
        title: 'T/C Domina Shopping un T/C Spice Life',
      },
      {
        
        value: 'Detaļas uz vietas',
        title:
          'Mūsu noliktavā ir pieejama plaša oriģinālo un analogo rezerves daļu izvēle.',
      },
    ],
  };
}

// services/LandingServices.jsx
export function getServicesContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
  eyebrow: 'Частые проблемы',
  timeLabel: 'Время работы',
  ctaPrice: 'Уточнить стоимость',
  ctaBook: 'Записаться',
  selectorLabel: 'Виды проблем',
  services: [
    {
      id: 'screen',
      title: 'Замена экрана',
      cardTitle: 'Разбился экран?',
      short: 'Треснуло стекло или не работает сенсор',
      time: '20–60 мин',
      visual: '/images/categories/displeja_maina.webp',
      text:
        'Чёрный дисплей, трещины или не работает сенсор? В большинстве случаев замену экрана выполняем в тот же день.',
      bullets: [
        'Face ID сохраняется',
        'True Tone при возможности',
        'Гарантия до 1 года',
      ],
      prices: [
        '13 — от 110€',
        '14 — от 130€',
        '15 — от 140€',
      ],
    },
    {
      id: 'battery',
      title: 'Замена батареи',
      cardTitle: 'Быстро разряжается?',
      short: 'Быстро садится или выключается',
      time: '20–40 мин',
      visual: '/images/categories/baterijas_maina.webp',
      text:
        'Батарея быстро садится, устройство греется или выключается при низком проценте? Заменим аккумулятор и проверим работу устройства.',
      bullets: [
        'Проверка состояния батареи',
        'Замена за 20–40 минут',
        'Гарантия до 1 года',
      ],
      prices: [
        '11 — от 60€',
        '13 — от 70€',
        '14 Pro — от 80€',
      ],
    },
    {
      id: 'backGlass',
      title: 'Замена заднего стекла',
      cardTitle: 'Разбито заднее стекло?',
      short: 'Повреждено стекло корпуса или острые края',
      time: '1–3 ч',
      visual: '/images/categories/back-cover.webp',
      text:
        'Аккуратно заменим повреждённое стекло корпуса и вернём устройству аккуратный внешний вид без лишних работ.',
      bullets: [
        'Точное снятие стекла',
        'Восстановление внешнего вида корпуса',
        'Гарантия до 1 года',
      ],
      prices: [
        '12 — от 69€',
        '13 — от 79€',
        '14 Pro — от 109€',
      ],
    },
    {
      id: 'charging',
      title: 'Зарядка и разъёмы',
      cardTitle: 'Проблемы с зарядкой?',
      short: 'Не заряжается или плохой контакт',
      time: '30–90 мин',
      visual: '/images/categories/uzlades_ligzda_remonts.webp',
      text:
        'Заряжается только в определённом положении или не реагирует на кабель? Найдём причину и устраним её без лишних работ.',
      bullets: [
        'Чистка разъёма',
        'Замена порта зарядки',
        'Диагностика бесплатно',
      ],
      prices: [
        'Чистка порта — от 15€',
        'Замена разъёма — от 49€',
        'Диагностика — бесплатно',
      ],
    },
    {
      id: 'camera',
      title: 'Камера и стекло',
      cardTitle: 'Камера не фокусируется?',
      short: 'Мутная камера или разбита линза',
      time: '30–60 мин',
      visual: '/images/categories/kameras_remonts.webp',
      text:
        'Изображение мутное, камера дрожит или разбито стекло камеры? Проверим причину и восстановим качество фото.',
      bullets: [
        'Замена стекла камеры',
        'Проверка фокуса',
        'Гарантия до 1 года',
      ],
      prices: [
        'Стекло камеры — от 29€',
        'Камера — от 59€',
        'Диагностика — бесплатно',
      ],
    },
    {
      id: 'water',
      title: 'Влага и сложные случаи',
      cardTitle: 'Попала влага?',
      short: 'После воды или не включается',
      time: 'после диагностики',
      visual: '/images/ads-v2/water-repair-v2.webp',
      text:
        'Устройство попало в воду или больше не включается? Проведём диагностику и согласуем возможные решения и стоимость.',
      bullets: [
        'Диагностика платы',
        'Чистка после влаги',
        'Стоимость до начала работ',
      ],
      prices: [
        'Диагностика — бесплатно',
        'Чистка после влаги — от 35€',
        'Работы с платой — после оценки',
      ],
    },
  ],
};
  }

  return {
    eyebrow: 'Biežākie bojājumi',
    timeLabel: 'Izpildes laiks',
    ctaPrice: 'Precizēt cenu',
    ctaBook: 'Pieteikt remontu',
    selectorLabel: 'Remonta veidi',
    services: [
      {
        id: 'screen',
        title: 'Ekrāna maiņa',
        cardTitle: 'Saplīsis ekrāns?',
        short: 'Saplīsis stikls vai nestrādā skārienjutība',
        time: '1-3 h',
        visual: '/images/categories/displeja_maina.webp',
        text:
          'Melns displejs, plaisas vai nestrādā skārienjutība? Ekrāna maiņa tajā pašā dienā.',
        bullets: [
          'Face ID saglabāšana',
          'True Tone, ja iespējams',
          'garantija līdz 1 gadam',
        ],
        prices: [
          'iPhone 13 — no 110€',
          'iPhone 14 — no 130€',
          'iPhone 15 — no 140€',
        ],
      },
      {
        id: 'battery',
        title: 'Akumulatora maiņa',
        cardTitle: 'Akumulators ātri izlādējas?',
        short: 'Ātri izlādējas vai izslēdzas aukstumā',
        time: '20–40 min',
        visual: '/images/categories/baterijas_maina.webp',
        text:
          'Baterija ātri izlādējas, karst vai slēdzas ārā pie zemāka procenta? Nomainīsim akumulatoru un pārbaudīsim ierīces darbību.',
        bullets: [
          'Akumulatora veselības pārbaude',
          'Baterijas maiņa 20–40 minūtēs',
          'garantija līdz 1 gadam',
        ],
        prices: [
          'iPhone 11 — no 60€',
          'iPhone 13 — no 70€',
          'iPhone 14 Pro — no 80€',
        ],
      },
      {
        id: 'backGlass',
        title: 'Aizmugurējā stikla maiņa',
        cardTitle: 'Saplīsis aizmugurējais stikls?',
        short: 'Saplīsis korpusa stikls vai asas malas',
        time: '20-60 min',
        visual: '/images/categories/back-cover.webp',
        text:
          'Nomainīsim bojāto korpusa stiklu un atjaunosim ierīces izskatu bez liekiem darbiem.',
        bullets: [
          'Precīza stikla noņemšana',
          'Korpusa vizuāla atjaunošana',
          'garantija līdz 1 gadam',
        ],
        prices: [
          'iPhone 12 — no 69€',
          'iPhone 13 — no 79€',
          'iPhone 14 Pro — no 109€',
        ],
      },
      {
        id: 'charging',
        title: 'Uzlāde & savienojumi',
        cardTitle: 'Uzlādes problēmas?',
        short: 'Neuzlādējas vai slikts kontakts',
        time: '30–90 min',
        visual: '/images/categories/uzlades_ligzda_remonts.webp',
        text:
          'Lādējas tikai noteiktā pozīcijā vai nereaģē uz kabeli? Noskaidrosim problēmas cēloni un novērsīsim to bez liekiem remontiem.',
        bullets: [
          'Ligzdas tīrīšana',
          'Uzlādes porta maiņa',
          'Diagnostika bez maksas',
        ],
        prices: [
          'Ligzdas tīrīšana — no 15€',
          'Uzlādes porta maiņa — no 49€',
          'Diagnostika — bez maksas',
        ],
      },
      {
        id: 'camera',
        title: 'Kamera & stikls',
        cardTitle: 'Kamera nefokusējas?',
        short: 'Miglaina kamera vai saplīsusi lēca',
        time: '30–60 min',
        visual: '/images/categories/kameras_remonts.webp',
        text:
          'Attēls miglains, kamera trīc vai saplīsis kameras stikls? Salabosim kameru un pārbaudīsim foto kvalitāti pēc remonta.',
        bullets: [
          'Kameras stikla maiņa',
          'Fokusa pārbaude',
          'garantija līdz 1 gadam',
        ],
        prices: [
          'Kameras stikls — no 29€',
          'Kamera — no 59€',
          'Diagnostika — bez maksas',
        ],
      },
      {
        id: 'water',
        title: 'Mitruma bojājumi',
        cardTitle: 'Mitruma bojājumi?',
        short: 'Pēc ūdens vai neieslēdzas',
        time: 'pēc diagnostikas',
        visual: '/images/ads-v2/water-repair-v2.webp',
        text:
          'Ierīce nonākusi saskarē ar ūdeni vai vairs neieslēdzas? Veiksim diagnostiku un saskaņosim iespējamos risinājumus un izmaksas',
        bullets: [
          'Plates diagnostika',
          'Tīrīšana pēc mitruma',
          'Cena pirms darbu uzsākšanas',
        ],
        prices: [
          'Diagnostika — bez maksas',
          'Tīrīšana pēc mitruma — no 35€',
          'Plates remonts — pēc novērtējuma',
        ],
      },
    ],
  };
}

// process/LandingProcess.jsx
export function getProcessContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Как всё проходит',
      subtitle: 'Простой процесс без лишней бюрократии.',
      steps: [
        {
          title: 'Свяжитесь с нами',
          text: 'Позвоните, напишите в WhatsApp или оставьте заявку.',
        },
        {
          title: 'Уточняем стоимость',
          text: 'Подскажем ориентировочную цену и наличие деталей.',
        },
        {
          title: 'Приносите устройство',
          text: 'Выберите удобный филиал: Domina Shopping или Spice Life.',
        },
        {
          title: 'Забираете готовое',
          text: 'Популярные работы часто выполняем в тот же день.',
        },
      ],
    };
  }

  return {
    title: 'Kā tas notiek',
    subtitle: 'Vienkāršs process bez liekas sarežģīšanas.',
    steps: [
      {
        title: 'Sazinies ar mums',
        text: 'Zvani, raksti WhatsApp vai atstāj pieteikumu.',
      },
      {
        title: 'Precizējam izmaksas',
        text: 'Pateiksim aptuveno cenu un detaļu pieejamību.',
      },
      {
        title: 'Atnes ierīci',
        text: 'Izvēlies ērtāko filiāli: Domina Shopping vai Spice Life.',
      },
      {
        title: 'Saņem gatavu',
        text: 'Biežākos darbus veicam tajā pašā dienā.',
      },
    ],
  };
}

// delivery/LandingDelivery.jsx
export function getDeliveryContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      eyebrow: 'Помощь с доставкой',

      title: 'Отправь устройство через пакомат',
      accent: 'получи обратно бесплатно',

      note:
        'Популярные работы часто выполняем в тот же день после получения устройства.',

      subtitle:
        'Можно отправить устройство через Omniva, DPD, SmartPosti или Latvijas Pasts. Проверим проблему, согласуем решение и отправим обратно в удобный пакомат без дополнительной платы.',

      cta: 'Оставить заявку с доставкой',

      steps: [
        {
          
          title: 'Оставляешь заявку',
          text:
            'Опиши проблему и модель устройства. Проверим информацию и свяжемся с деталями.',
        },
        {
          
          title: 'Отправляешь устройство',
          text:
            'После подтверждения отправь устройство удобным пакоматом или почтовой доставкой.',
        },
        {
          
          title: 'Получаешь обратно',
          text:
            'После завершения работ отправим устройство обратно на адрес или в пакомат без дополнительной платы.',
        },
      ],
    };
  }

  return {
    eyebrow: 'Ar piegādi',

    title: 'Nosūti ierīci ar pakomātu',
    accent: 'saņem atpakaļ bez papildu maksas',

    note:
      'Populārākos darbus bieži veicam tajā pašā dienā pēc ierīces saņemšanas.',

    subtitle:
      'Vari nosūtīt ierīci ar Omniva, DPD, SmartPosti vai Latvijas Pastu. Pārbaudīsim problēmu, saskaņosim risinājumu un nosūtīsim atpakaļ uz tev ērtāko pakomātu.',

    cta: 'Pieteikt ar piegādi',

    steps: [
      {
        
        title: 'Aizpildi pieteikumu',
        text:
          'Apraksti problēmu un ierīces modeli. Izvērtēsim situāciju un sazināsimies ar precīzāku informāciju.',
      },
      {
        
        title: 'Nosūti ierīci',
        text:
          'Pēc apstiprinājuma nosūti ierīci ar sev ērtāko pakomātu vai pasta piegādi.',
      },
      {
        
        title: 'Saņem atpakaļ',
        text:
          'Pēc darbu pabeigšanas nosūtām ierīci atpakaļ uz adresi vai pakomātu bez papildu maksas.',
      },
    ],
  };
}

// faq/LandingFaq.jsx
export function getFaqContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Частые вопросы',
      subtitle:
        'Коротко о сроках, гарантии, деталях и том, что важно знать перед обращением.',
      items: [
        {
          q: 'Сколько это занимает?',
          a: 'Популярные работы с дисплеем, аккумулятором, разъёмом зарядки или камерой часто выполняем в тот же день. Во многих случаях это занимает примерно 20–60 минут, если нужная деталь есть в наличии.',
        },
        {
          q: 'Можно ли приехать без записи?',
          a: 'Да, можно приехать без предварительной записи в T/C Domina Shopping или T/C Spice Life. Но если хотите не ждать и сразу понять ориентировочную стоимость, лучше заранее написать или позвонить — мы проверим наличие детали под вашу модель.',
        },
        {
          q: 'Сохраняются ли Face ID и True Tone?',
          a: 'При аккуратной работе с дисплеем мы стараемся сохранить Face ID и True Tone, если эти функции работали до повреждения и проблема не затронула связанные модули. Перед началом работ специалист проверит устройство и объяснит, что можно сохранить в вашем конкретном случае.',
        },
        {
          q: 'Какая гарантия на выполненные работы?',
          a: 'На выполненные работы и установленные детали предоставляется гарантия. Срок зависит от вида работ и выбранной детали, но для популярных работ обычно действует гарантия до 1 года.',
        },
        {
          q: 'Какие детали вы используете?',
          a: 'Предлагаем несколько вариантов деталей: оригинальные, восстановленные оригинальные или качественные совместимые аналоги — в зависимости от модели, наличия и бюджета. Перед началом работ объясним разницу по цене, качеству изображения, чувствительности сенсора и сроку службы.',
        },
        {
          q: 'Удалятся ли данные с устройства?',
          a: 'Обычно при работах с экраном, аккумулятором, камерой или разъёмом зарядки данные не удаляются. Мы не сбрасываем устройство без необходимости. Если устройство сильно повреждено или было залито жидкостью, по возможности рекомендуем заранее сделать резервную копию.',
        },
      ],
    };
  }

  return {
    title: 'Biežāk uzdotie jautājumi',
    subtitle:
      'Svarīgākais par izpildes laiku, garantiju, detaļām un to, kas jāzina pirms pieteikuma.',
    items: [
      {
        q: 'Cik ilgi tas aizņem?',
        a: 'Populārākos darbus ar displeju, bateriju, uzlādes ligzdu vai kameru bieži paveicam tajā pašā dienā. Daudzos gadījumos tas aizņem aptuveni 20–60 minūtes, ja nepieciešamā detaļa ir pieejama uz vietas.',
      },
      {
        q: 'Vai var ierasties bez pieraksta?',
        a: 'Jā, vari ierasties bez iepriekšēja pieraksta T/C Domina Shopping vai T/C Spice Life. Tomēr, ja vēlies izvairīties no gaidīšanas un uzreiz uzzināt orientējošu cenu, iesakām pirms braukšanas uzrakstīt vai piezvanīt — pārbaudīsim detaļas pieejamību tavam modelim.',
      },
      {
        q: 'Vai saglabājas Face ID un True Tone?',
        a: 'Strādājot ar displeju, cenšamies saglabāt gan Face ID, gan True Tone funkcionalitāti, ja šīs funkcijas darbojās pirms bojājuma un problēma nav skārusi saistītos moduļus. Pirms darbu sākšanas speciālists pārbaudīs ierīci un paskaidros, ko iespējams saglabāt konkrētajā gadījumā.',
      },
      {
        q: 'Kāda garantija ir veiktajiem darbiem?',
        a: 'Veiktajiem darbiem un uzstādītajām detaļām nodrošinām garantiju. Garantijas termiņš ir atkarīgs no darbu veida un izvēlētās detaļas, bet populārākajiem darbiem parasti nodrošinām garantiju līdz 1 gadam.',
      },
      {
        q: 'Kādas detaļas izmantojat?',
        a: 'Piedāvājam vairākus detaļu variantus — oriģinālas, atjaunotas oriģinālās vai kvalitatīvas alternatīvās detaļas atkarībā no modeļa, pieejamības un budžeta. Pirms darbu sākšanas paskaidrosim atšķirības cenā, attēla kvalitātē, skārienjutībā un kalpošanas ilgumā.',
      },
      {
        q: 'Vai dati pazudīs?',
        a: 'Parasti darbu laikā ar displeju, bateriju, kameru vai uzlādes ligzdu dati netiek dzēsti. Ierīci bez vajadzības nepārinstalējam un neatiestatām. Ja ierīce ir stipri bojāta vai bijusi mitrumā, pēc iespējas iesakām iepriekš izveidot rezerves kopiju.',
      },
    ],
  };
}

// locations/LandingLocations.jsx
export function getLocationStrings(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      titleMain: 'Выберите мастерскую в',
      titleAccent: 'Риге',
      subtitle: 'Domina Shopping или Spice Life — звоните, пишите в WhatsApp или сразу открывайте маршрут.',
      open: 'Открыто до {time}',
      closed: 'Закрыто',
      closedUntil: 'Откроется в {time}',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      googleMaps: 'Google Maps',
      waze: 'Waze',
      hours: 'Время работы',
      hideHours: 'Скрыть время',
    };
  }

  return {
    titleMain: 'Izvēlies darbnīcu',
    titleAccent: 'Rīgā',
    subtitle: 'Domina Shopping vai Spice Life — zvani, raksti WhatsApp vai uzreiz atver maršrutu.',
    open: 'Atvērts līdz {time}',
    closed: 'Slēgts',
    closedUntil: 'Atvērsies {time}',
    call: 'Zvanīt',
    whatsapp: 'WhatsApp',
    googleMaps: 'Google Maps',
    waze: 'Waze',
    hours: 'Darba laiks',
    hideHours: 'Paslēpt laiku',
  };
}

// final-cta/LandingFinalCta.jsx
export function getFinalContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      titleMain: 'Radusies problēma?',
      titleAccent: 'Починим быстро.',
      text: 'Уточним цену, наличие деталей и подскажем ближайший удобный филиал.',
      price: 'Узнать цену',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      note: 'Domina Shopping или Spice Life',
    };
  }

  return {
    titleMain: 'Radusies problēma?',
    titleAccent: 'Salabosim ātri.',
    text: 'Precizēsim cenu, detaļu pieejamību un ieteiksim ērtāko filiāli.',
    price: 'Uzzināt cenu',
    call: 'Zvanīt',
    whatsapp: 'WhatsApp',
    note: 'Domina Shopping vai Spice Life',
  };
}

// footer/LandingFooter.jsx
export function getFooterContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      tel: 'Тел.',
      regNo: 'Рег. №',
      copyright: 'Все права защищены.',
      disclaimer:
        'iLab — независимая ремонтная мастерская и не является авторизованным сервисным центром Apple. iPhone является товарным знаком Apple Inc.',
    };
  }

  return {
    tel: 'Tel.',
    regNo: 'Reģ. nr.',
    copyright: 'Visas tiesības aizsargātas.',
    disclaimer:
      'iLab ir neatkarīga remonta darbnīca un nav Apple autorizēts servisa centrs. iPhone ir Apple Inc. preču zīme.',
  };
}

function getTotalReviews(reviewsSummary = {}) {
  return (
    Number(reviewsSummary?.domina?.count || 0) +
    Number(reviewsSummary?.spice?.count || 0)
  );
}

function getAverageRating(reviewsSummary = {}) {
  const ratings = [
    Number(reviewsSummary?.domina?.rating || 0),
    Number(reviewsSummary?.spice?.rating || 0),
  ].filter(Boolean);

  if (!ratings.length) return '4.9';

  const avg =
    ratings.reduce((sum, value) => sum + value, 0) /
    ratings.length;

  return avg.toFixed(1);
}

function roundReviews(value) {
  if (!value) return 0;

  return Math.floor(value / 10) * 10;
}

export function getTrustItems(locale, reviewsSummary) {
  const totalReviews = roundReviews(
    getTotalReviews(reviewsSummary)
  );

  const avgRating = getAverageRating(reviewsSummary);

  if (normalizeLocale(locale) === 'ru') {
    return [
      {
        
        value: '10+',
        label: 'лет помогаем с устройствами',
        text: 'в Риге',
      },
      {
        
        value: '20K+',
        label: 'устройств снова в работе',
        text: 'телефоны и другая техника',
      },
      {
        
        value: `${totalReviews}+`,
        label: 'отзывов клиентов',
        text: `${avgRating}★ рейтинг Google`,
      },
    ];
  }

  return [
    {
      
      value: '10+',
      label: 'gadi palīdzam ar ierīcēm',
      text: 'Rīgā',
    },
    {
      
      value: '20K+',
      label: 'ierīču atkal darbojas',
      text: 'telefoni un cita tehnika',
    },
    {
      
      value: `${totalReviews}+`,
      label: 'klientu atsauksmes',
      text: `${avgRating}★ Google vērtējums`,
    },
  ];
}

