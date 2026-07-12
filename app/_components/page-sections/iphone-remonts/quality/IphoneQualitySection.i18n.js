export function getIphoneQualityContent(locale = 'lv') {
  const content = {
    lv: {
      eyebrow: 'Kvalitāte un garantija',
      titleStart: 'Kvalitatīvs iPhone remonts ar ',
      titleAccent: 'garantiju',
      intro:
        'iPhone remonts nav tikai detaļas nomaiņa. Pēc remonta pārbaudām svarīgākās funkcijas, izskaidrojam izmantoto detaļu variantus un sniedzam garantiju gan darbam, gan izmantotajām detaļām.',
      facts: [
        '90 dienu garantija',
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
          title: '90 dienu garantija',
          text: 'Pēc remonta sniedzam 90 dienu garantiju darbam un izmantotajām detaļām. Garantijas nosacījumus izskaidrojam pirms remonta pabeigšanas.',
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
        'Гарантия 90 дней',
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
          title: 'Гарантия 90 дней',
          text: 'После ремонта предоставляем гарантию 90 дней на работу и использованные детали. Условия гарантии объясняем до завершения ремонта.',
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
