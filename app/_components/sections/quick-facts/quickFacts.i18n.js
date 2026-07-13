import {
  FaBolt,
  FaHandshake,
  FaLocationDot,
  FaMagnifyingGlass,
  FaListCheck,
  FaScrewdriverWrench,
  FaShieldHalved,
} from 'react-icons/fa6';

import { LOCATIONS } from '@/data/site.config';

const FACT_ICONS = {
  warranty: FaShieldHalved,
  diagnostics: FaMagnifyingGlass,
  price: FaHandshake,
  parts: FaScrewdriverWrench,
  locations: FaLocationDot,
  sameDay: FaBolt,
  finalCheck: FaListCheck,
};

const QUICK_FACTS = {
  lv: {
    ariaLabel: 'Svarīgākais par remontu',
    locationJoiner: ' un ',
    variants: {
      'iphone-screen': [
        {
          key: 'parts',
          title: 'Pakalpojums',
          description: 'iPhone ekrāna maiņa',
        },
        {
          key: 'price',
          title: 'Cena',
          description: 'Atkarīga no iPhone modeļa un ekrāna varianta',
        },
        {
          key: 'diagnostics',
          title: 'Pārbaude',
          description: 'Displejs, skāriens, stikls un sensori',
        },
        {
          key: 'warranty',
          title: 'Garantija',
          description: '90 dienas veiktajam remontam',
        },
        {
          key: 'locations',
          title: 'Filiāles',
          description: 'T/C Domina Shopping un T/C Spice Home',
        },
        {
          key: 'finalCheck',
          title: 'Pārbaude pēc remonta',
          description: 'Pārbaudām attēlu, skārienu un galvenās iPhone funkcijas',
        },
      ],
      'iphone-model': [
        {
          key: 'warranty',
          title: '90 dienu garantija',
          description: 'Darbam un uzstādītajām detaļām.',
        },
        {
          key: 'price',
          title: 'Cena pirms darba',
          description: 'Izmaksas saskaņojam pirms remonta sākšanas.',
        },
        {
          key: 'diagnostics',
          title: 'Diagnostika pirms remonta',
          description: 'Pārbaudām bojājumu un detaļas pieejamību.',
        },
        {
          key: 'locations',
          title: 'Domina un Spice',
          description: 'Divas iLab filiāles Rīgā.',
        },
        {
          key: 'sameDay',
          title: 'Biežākie darbi tajā pašā dienā',
          description: 'Ja detaļa ir pieejama un bojājums ir standarta.',
        },
        {
          key: 'finalCheck',
          title: 'Pārbaude pēc remonta',
          description: 'Pēc darba pārbaudām galvenās iPhone funkcijas.',
        },
      ],
      iphone: [
        ['warranty', '90 dienu garantija'],
        ['diagnostics', 'Diagnostika pirms remonta'],
        ['price', 'Cena saskaņota pirms darba'],
        ['parts', 'Oriģinālās / OEM detaļas'],
        ['locations', '{locations}'],
        ['sameDay', 'Biežākie iPhone remonti tajā pašā dienā'],
      ],
      phone: [
        ['warranty', '90 dienu garantija'],
        ['diagnostics', 'Diagnostika pirms remonta'],
        ['price', 'Cena saskaņota pirms darba'],
        ['parts', 'Kvalitatīvas detaļas'],
        ['locations', '{locations}'],
        ['sameDay', 'Biežākie telefonu remonti tajā pašā dienā'],
      ],
      tablet: [
        ['warranty', '90 dienu garantija'],
        ['diagnostics', 'Diagnostika pirms remonta'],
        ['price', 'Cena saskaņota pirms darba'],
        ['parts', 'Kvalitatīvas detaļas'],
        ['locations', '{locations}'],
        ['sameDay', 'Biežākie planšetdatoru remonti tajā pašā dienā'],
      ],
    },
  },
  ru: {
    ariaLabel: 'Главное о ремонте',
    locationJoiner: ' и ',
    variants: {
      'iphone-screen': [
        {
          key: 'parts',
          title: 'Услуга',
          description: 'Замена экрана iPhone',
        },
        {
          key: 'price',
          title: 'Цена',
          description: 'Зависит от модели iPhone и варианта экрана',
        },
        {
          key: 'diagnostics',
          title: 'Проверка',
          description: 'Дисплей, сенсор, стекло и датчики',
        },
        {
          key: 'warranty',
          title: 'Гарантия',
          description: '90 дней на выполненный ремонт',
        },
        {
          key: 'locations',
          title: 'Филиалы',
          description: 'Т/Ц Domina Shopping и Т/Ц Spice Home',
        },
        {
          key: 'finalCheck',
          title: 'Проверка после ремонта',
          description: 'Проверяем изображение, сенсор и основные функции iPhone',
        },
      ],
      'iphone-model': [
        {
          key: 'warranty',
          title: 'Гарантия 90 дней',
          description: 'На работу и установленные детали.',
        },
        {
          key: 'price',
          title: 'Цена до начала работ',
          description: 'Согласовываем стоимость до начала ремонта.',
        },
        {
          key: 'diagnostics',
          title: 'Диагностика перед ремонтом',
          description: 'Проверяем неисправность и наличие детали.',
        },
        {
          key: 'locations',
          title: 'Domina и Spice',
          description: 'Два филиала iLab в Риге.',
        },
        {
          key: 'sameDay',
          title: 'Частые ремонты в тот же день',
          description: 'Если деталь есть в наличии и неисправность стандартная.',
        },
        {
          key: 'finalCheck',
          title: 'Проверка после ремонта',
          description: 'После работы проверяем основные функции iPhone.',
        },
      ],
      iphone: [
        ['warranty', 'Гарантия 90 дней'],
        ['diagnostics', 'Диагностика до ремонта'],
        ['price', 'Цену согласуем до начала работы'],
        ['parts', 'Оригинальные / OEM детали'],
        ['locations', '{locations}'],
        ['sameDay', 'Популярный ремонт iPhone - в тот же день'],
      ],
      phone: [
        ['warranty', 'Гарантия 90 дней'],
        ['diagnostics', 'Диагностика до ремонта'],
        ['price', 'Цену согласуем до начала работы'],
        ['parts', 'Качественные детали'],
        ['locations', '{locations}'],
        ['sameDay', 'Популярный ремонт телефонов - в тот же день'],
      ],
      tablet: [
        ['warranty', 'Гарантия 90 дней'],
        ['diagnostics', 'Диагностика до ремонта'],
        ['price', 'Цену согласуем до начала работы'],
        ['parts', 'Качественные детали'],
        ['locations', '{locations}'],
        ['sameDay', 'Популярный ремонт планшетов - в тот же день'],
      ],
    },
  },
};

export function getQuickFacts(variant = 'phone', locale = 'lv') {
  const content = QUICK_FACTS[locale] || QUICK_FACTS.lv;
  const definitions = content.variants[variant] || content.variants.phone;
  const locations = LOCATIONS.map((location) => location.label).join(
    content.locationJoiner
  );

  return {
    ariaLabel: content.ariaLabel,
    facts: definitions.map((definition) => {
      if (!Array.isArray(definition)) {
        return {
          Icon: FACT_ICONS[definition.key],
          title: definition.title,
          description: definition.description,
        };
      }

      const [key, text] = definition;

      return {
        Icon: FACT_ICONS[key],
        text: text.replace('{locations}', locations),
      };
    }),
  };
}
