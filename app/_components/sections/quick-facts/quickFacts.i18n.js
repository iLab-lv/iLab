import {
  FaBolt,
  FaHandshake,
  FaLocationDot,
  FaMagnifyingGlass,
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
};

const QUICK_FACTS = {
  lv: {
    ariaLabel: 'Svarīgākais par remontu',
    locationJoiner: ' un ',
    variants: {
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
    facts: definitions.map(([key, text]) => ({
      Icon: FACT_ICONS[key],
      text: text.replace('{locations}', locations),
    })),
  };
}
