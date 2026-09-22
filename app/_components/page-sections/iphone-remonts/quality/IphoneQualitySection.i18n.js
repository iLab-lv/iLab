const SCREEN_CONTENT = {
  lv: {
    eyebrow: 'Detaļas, garantija un datu drošība',
    titleStart: 'Skaidri nosacījumi pirms ',
    titleAccent: 'ekrāna maiņas',
    intro:
      'iPhone ekrāna maiņai pieejamie detaļu varianti ir atkarīgi no konkrētā modeļa un detaļu pieejamības. Pirms remonta izskaidrojam, kādi varianti ir pieejami, kāda ir cena un kādi garantijas nosacījumi attiecas uz izvēlēto remontu.',
    facts: [
      'Detaļas variants pēc modeļa',
      'garantija līdz 1 gadam',
      'Cena pirms darba',
      'Dati parasti netiek dzēsti',
    ],
    cards: [
      {
        title: 'Pieejamie ekrāna varianti',
        text: 'Ekrāna varianti un to pieejamība atšķiras atkarībā no konkrētā iPhone modeļa. Pirms remonta izskaidrojam pieejamās izvēles un to atšķirības.',
      },
      {
        title: 'garantija līdz 1 gadam',
        text: 'Veiktajam remontam tiek piemērota garantija līdz 1 gadam saskaņā ar remonta nosacījumiem.',
      },
      {
        title: 'Cena pirms darba',
        text: 'Pirms remonta sākšanas saskaņojam izmaksas un pieejamo detaļas variantu.',
      },
      {
        title: 'Datu drošība',
        text: 'Ekrāna maiņa parasti nav saistīta ar datu dzēšanu, tomēr pirms jebkura remonta iesakām izveidot rezerves kopiju, ja tas ir iespējams.',
      },
    ],
  },
  ru: {
    eyebrow: 'Детали, гарантия и безопасность данных',
    titleStart: 'Понятные условия перед ',
    titleAccent: 'заменой экрана',
    intro:
      'Доступные варианты деталей для замены экрана iPhone зависят от конкретной модели и наличия. До ремонта объясняем, какие варианты доступны, сколько они стоят и какие условия гарантии относятся к выбранному ремонту.',
    facts: [
      'Вариант детали по модели',
      'Гарантия до 1 года',
      'Цена до начала работы',
      'Данные обычно не удаляются',
    ],
    cards: [
      {
        title: 'Доступные варианты экрана',
        text: 'Варианты экрана и их наличие зависят от конкретной модели iPhone. До ремонта объясняем доступный выбор и различия между вариантами.',
      },
      {
        title: 'Гарантия до 1 года',
        text: 'На выполненный ремонт действует гарантия до 1 года в соответствии с условиями ремонта.',
      },
      {
        title: 'Цена до начала работы',
        text: 'До начала ремонта согласовываем стоимость и доступный вариант детали.',
      },
      {
        title: 'Безопасность данных',
        text: 'Замена экрана обычно не связана с удалением данных, однако перед любым ремонтом рекомендуем создать резервную копию, если это возможно.',
      },
    ],
  },
};

const BATTERY_CONTENT = {
  lv: {
    eyebrow: 'Baterijas kvalitāte, garantija un datu drošība',
    titleStart: 'Piemērota baterija un ', titleAccent: 'skaidri nosacījumi',
    intro: 'Baterijas maiņai izmantojam konkrētajam iPhone modelim piemērotu detaļu. Pirms remonta izskaidrojam, kāds risinājums ir pieejams, kāda ir cena un kādi garantijas nosacījumi attiecas uz izvēlēto remontu. Dažos modeļos pēc maiņas sistēmā var parādīties paziņojums par nomainītu detaļu vai servisa informāciju — ja tas attiecas uz konkrēto modeli, to izskaidrojam pirms remonta.',
    facts: ['Detaļa konkrētam modelim','Pārbaude pēc remonta','garantija līdz 1 gadam','Dati parasti netiek dzēsti'],
    cards: [
      { title:'Piemērota detaļa konkrētam modelim', text:'Baterijas un remonta iespējas atšķiras pēc iPhone modeļa, tāpēc pirms darba precizējam detaļas pieejamību.' },
      { title:'Pārbaude pēc remonta', text:'Pēc baterijas maiņas pārbaudām uzlādi, ieslēgšanos, stabilitāti un pamata funkcijas.' },
      { title:'garantija līdz 1 gadam', text:'Veiktajam remontam tiek piemērota garantija līdz 1 gadam saskaņā ar remonta nosacījumiem.' },
      { title:'Datu drošība', text:'Baterijas maiņa parasti nav saistīta ar datu dzēšanu, tomēr pirms remonta iesakām izveidot rezerves kopiju, ja tas ir iespējams.' },
    ],
  },
  ru: {
    eyebrow: 'Качество батареи, гарантия и безопасность данных',
    titleStart: 'Подходящая батарея и ', titleAccent: 'понятные условия',
    intro: 'Для замены используем батарею, подходящую конкретной модели iPhone. До ремонта объясняем доступное решение, цену и условия гарантии. На некоторых моделях после замены в системе может появиться сообщение о заменённой детали или сервисная информация — если это относится к модели, объясняем заранее.',
    facts: ['Деталь для конкретной модели','Проверка после ремонта','Гарантия до 1 года','Данные обычно не удаляются'],
    cards: [
      { title:'Подходящая деталь для модели', text:'Варианты батареи и ремонта отличаются по модели iPhone, поэтому заранее уточняем наличие детали.' },
      { title:'Проверка после ремонта', text:'После замены батареи проверяем зарядку, включение, стабильность и основные функции.' },
      { title:'Гарантия до 1 года', text:'На выполненный ремонт действует гарантия до 1 года согласно условиям ремонта.' },
      { title:'Безопасность данных', text:'Замена батареи обычно не связана с удалением данных, однако перед ремонтом рекомендуем сделать резервную копию, если это возможно.' },
    ],
  },
};

const BACK_COVER_CONTENT = {
  lv: {
    eyebrow: 'Garantija, mitruma risks un datu drošība', titleStart: 'Skaidri nosacījumi pēc ', titleAccent: 'aizmugures remonta',
    intro: 'Saplīsusi iPhone aizmugure samazina korpusa aizsardzību pret putekļiem un mitrumu. Pirms darba saskaņojam cenu, bet pēc remonta sniedzam garantiju līdz 1 gadam darbam un uzstādītajai detaļai.',
    facts: ['garantija līdz 1 gadam','Cena pirms darba','Dati parasti netiek dzēsti','Mitruma risks izskaidrots'],
    cards: [
      { title:'garantija līdz 1 gadam', text:'Veiktajam remontam un uzstādītajai detaļai tiek piemērota garantija līdz 1 gadam saskaņā ar remonta nosacījumiem.' },
      { title:'Cena pirms darba', text:'Pirms remonta sākšanas pārbaudām ierīci, precizējam detaļas pieejamību un saskaņojam izmaksas.' },
      { title:'Datu drošība', text:'Aizmugures vāciņa maiņa parasti nav saistīta ar datu dzēšanu, tomēr pirms remonta iesakām izveidot rezerves kopiju, ja tas ir iespējams.' },
      { title:'Mitruma risks', text:'Pēc remonta nesolām rūpnīcas ūdensizturības atjaunošanu. iPhone konstrukcija pēc kritiena vai atvēršanas var zaudēt sākotnējo aizsardzību pret mitrumu, tāpēc arī pēc remonta telefonu nevajadzētu apzināti pakļaut ūdenim.' },
    ],
  },
  ru: {
    eyebrow: 'Гарантия, риск влаги и безопасность данных', titleStart: 'Понятные условия после ', titleAccent: 'ремонта задней части',
    intro: 'Разбитая задняя часть iPhone снижает защиту корпуса от пыли и влаги. До начала работы согласовываем цену, а после ремонта предоставляем гарантию до 1 года на работу и установленную деталь.',
    facts: ['Гарантия до 1 года','Цена до начала работы','Данные обычно не удаляются','Риск влаги объяснён'],
    cards: [
      { title:'Гарантия до 1 года', text:'На выполненный ремонт и установленную деталь действует гарантия до 1 года согласно условиям ремонта.' },
      { title:'Цена до начала работы', text:'До ремонта проверяем устройство, уточняем наличие детали и согласовываем стоимость.' },
      { title:'Безопасность данных', text:'Замена задней крышки обычно не связана с удалением данных, но перед ремонтом рекомендуем сделать резервную копию, если это возможно.' },
      { title:'Риск влаги', text:'После ремонта мы не обещаем восстановление заводской водостойкости. После падения или вскрытия конструкция iPhone может потерять первоначальную защиту от влаги, поэтому и после ремонта телефон не следует намеренно подвергать воздействию воды.' },
    ],
  },
};

export function getIphoneQualityContent(locale = 'lv', variant = 'iphone') {
  if (variant === 'iphone-back-cover') {
    return BACK_COVER_CONTENT[locale] || BACK_COVER_CONTENT.lv;
  }
  if (variant === 'iphone-battery') {
    return BATTERY_CONTENT[locale] || BATTERY_CONTENT.lv;
  }
  if (variant === 'iphone-screen') {
    return SCREEN_CONTENT[locale] || SCREEN_CONTENT.lv;
  }

  const content = {
    lv: {
      eyebrow: 'Kvalitāte un garantija',
      titleStart: 'Kvalitatīvs iPhone remonts ar ',
      titleAccent: 'garantiju',
      intro:
        'iPhone remonts nav tikai detaļas nomaiņa. Pēc remonta pārbaudām svarīgākās funkcijas, izskaidrojam izmantoto detaļu variantus un sniedzam garantiju gan darbam, gan izmantotajām detaļām.',
      facts: [
        'garantija līdz 1 gadam',
        'Cena pirms remonta',
        'Detaļas pēc izvēles un pieejamības',
        'Pārbaude pēc remonta',
      ],
      cards: [
        {
          title: 'Pārbaude pēc remonta',
          text: 'Pēc remonta pārbaudām svarīgākās iPhone funkcijas - skārienjutību, attēlu, uzlādi, skaņu, mikrofonu, kameru un citas funkcijas atkarībā no veiktā remonta.',
          bullets: [
            'skārienjutība un ekrāna attēls',
            'uzlāde un baterijas darbība',
            'kamera, skaļrunis un mikrofons',
            'Face ID / Touch ID zona, ja tas ir saistīts ar remontu',
          ],
        },
        {
          title: 'Oriģinālās vai OEM detaļas',
          text: 'Atkarībā no iPhone modeļa, pieejamības un remonta veida piedāvājam oriģinālās vai kvalitatīvas OEM detaļas. Pirms remonta izskaidrojam pieejamos variantus un cenu.',
        },
        {
          title: 'garantija līdz 1 gadam',
          text: 'Pēc remonta sniedzam garantiju līdz 1 gadam darbam un izmantotajām detaļām. Garantijas nosacījumus izskaidrojam pirms remonta pabeigšanas.',
        },
        {
          title: 'Cena saskaņota pirms darba',
          text: 'Pirms remonta pārbaudām bojājuma iemeslu un saskaņojam cenu, detaļas variantu un izpildes termiņu. Remonts netiek sākts bez klientam saprotama risinājuma.',
        },
      ],
    },
    ru: {
      eyebrow: 'Качество и гарантия',
      titleStart: 'Качественный ремонт iPhone с ',
      titleAccent: 'гарантией',
      intro:
        'Ремонт iPhone - это не только замена детали. После ремонта проверяем важные функции, объясняем доступные варианты деталей и предоставляем гарантию на работу и установленные детали.',
      facts: [
        'Гарантия до 1 года',
        'Цена до ремонта',
        'Детали по выбору и наличию',
        'Проверка после ремонта',
      ],
      cards: [
        {
          title: 'Проверка после ремонта',
          text: 'После ремонта проверяем важные функции iPhone - сенсор, изображение, зарядку, звук, микрофон, камеру и другие функции в зависимости от выполненного ремонта.',
          bullets: [
            'сенсор и изображение экрана',
            'зарядка и работа батареи',
            'камера, динамик и микрофон',
            'зона Face ID / Touch ID, если это связано с ремонтом',
          ],
        },
        {
          title: 'Оригинальные или OEM детали',
          text: 'В зависимости от модели iPhone, наличия и вида ремонта предлагаем оригинальные или качественные OEM детали. До ремонта объясняем доступные варианты и стоимость.',
        },
        {
          title: 'Гарантия до 1 года',
          text: 'После ремонта предоставляем гарантию до 1 года на работу и использованные детали. Условия гарантии объясняем до завершения ремонта.',
        },
        {
          title: 'Цена согласована до начала работы',
          text: 'До ремонта проверяем причину неисправности и согласовываем цену, вариант детали и срок выполнения. Ремонт не начинается без понятного для клиента решения.',
        },
      ],
    },
  };

  return content[locale] || content.lv;
}
