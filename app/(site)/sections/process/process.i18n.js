const PROCESS_CONTENT = {
  lv: {
    default: {
      title: 'Kā notiek remonts',
      steps: [
        {
          title: 'Atnes ierīci uz servisu',
          text: 'Atved ierīci uz iLab servisu sev ērtākajā filiālē.',
        },
        {
          title: 'Veicam diagnostiku',
          text: 'Nosakām bojājumu un piedāvājam piemērotāko risinājumu.',
        },
        {
          title: 'Saskaņojam cenu un termiņu',
          text: 'Pirms remonta sākšanas vienojamies par izmaksām un izpildes laiku.',
        },
        {
          title: 'Veicam remontu',
          text: 'Salabojam ierīci un pārbaudām tās darbību pēc remonta.',
        },
        {
          title: 'Saņem ierīci ar garantiju',
          text: 'Saņem salabotu ierīci ar garantiju un ieteikumiem turpmākai lietošanai.',
        },
      ],
    },

    computer: {
      title: 'Kā notiek datora remonts',
      steps: [
        {
          title: 'Atnes datoru uz iLab',
          text: 'Atnes savu portatīvo vai galda datoru uz iLab Domina vai Spice filiāli bez iepriekšēja pieraksta.',
        },
        {
          title: 'Diagnostika',
          text: 'Veicam sākotnējo diagnostiku un nosakām bojājumu cēloni un remonta iespējas.',
        },
        {
          title: 'Cenu un termiņa saskaņošana',
          text: 'Pirms remonta sākšanas saskaņojam cenu, detaļas un aptuveno remonta laiku.',
        },
        {
          title: 'Remonts un testēšana',
          text: 'Veicam remonta darbus, nomainām bojātās detaļas un pārbaudām datora darbību.',
        },
        {
          title: 'Saņem datoru ar garantiju',
          text: 'Saņem salabotu datoru ar garantiju, čeku un ieteikumiem turpmākai lietošanai.',
        },
      ],
    },
  },

  ru: {
    default: {
      title: 'Как проходит ремонт',
      steps: [
        {
          title: 'Принесите устройство в сервис',
          text: 'Принесите устройство в сервис iLab в удобный для вас филиал.',
        },
        {
          title: 'Проводим диагностику',
          text: 'Определяем неисправность и предлагаем подходящее решение.',
        },
        {
          title: 'Согласовываем цену и срок',
          text: 'До начала ремонта согласовываем стоимость и сроки выполнения.',
        },
        {
          title: 'Выполняем ремонт',
          text: 'Ремонтируем устройство и проверяем его работу после ремонта.',
        },
        {
          title: 'Получите устройство с гарантией',
          text: 'Вы получаете отремонтированное устройство с гарантией и рекомендациями по дальнейшему использованию.',
        },
      ],
    },

    computer: {
      title: 'Как проходит ремонт компьютера',
      steps: [
        {
          title: 'Принесите компьютер в iLab',
          text: 'Принесите ноутбук или настольный компьютер в филиал iLab Domina или Spice без предварительной записи.',
        },
        {
          title: 'Диагностика',
          text: 'Проводим первичную диагностику и определяем причину неисправности и возможности ремонта.',
        },
        {
          title: 'Согласование цены и срока',
          text: 'До начала ремонта согласовываем стоимость, детали и примерный срок выполнения.',
        },
        {
          title: 'Ремонт и тестирование',
          text: 'Выполняем ремонт, заменяем повреждённые детали и проверяем работу компьютера.',
        },
        {
          title: 'Получите компьютер с гарантией',
          text: 'Вы получаете отремонтированный компьютер с гарантией, чеком и рекомендациями по дальнейшему использованию.',
        },
      ],
    },
  },
};

export function getProcessContent(locale = 'lv', variant = 'default') {
  const localeContent = PROCESS_CONTENT[locale] || PROCESS_CONTENT.lv;
  return localeContent[variant] || localeContent.default;
}