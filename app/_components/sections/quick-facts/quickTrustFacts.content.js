import { getQuickFacts } from './quickFacts.i18n';

// Existing iPhone/photo claims remain in their localized source. Other hub sets
// summarize the category templates' diagnostic and agreed-cost explanations.
const COPY = {
  lv: {
    home: ['Bezmaksas diagnostika', 'Cena pirms darba', 'Garantija līdz 1 gadam', '13+ gadu pieredze'],
    phone: ['Garantija līdz 1 gadam', 'Telefonu diagnostika pirms remonta', 'Cena saskaņota pirms darba', 'Divas iLab filiāles Rīgā'],
    tablet: ['Garantija līdz 1 gadam', 'Planšetdatoru diagnostika pirms remonta', 'Cena saskaņota pirms darba', 'Divas iLab filiāles Rīgā'],
    computer: ['Garantija līdz 1 gadam', 'Datoru diagnostika pirms remonta', 'Izmaksas un termiņš pēc diagnostikas', 'Divas iLab filiāles Rīgā'],
    dyson: ['Dyson diagnostika pirms remonta', 'Bojājuma un remonta iespēju novērtēšana', 'Cena saskaņota pirms darba', 'Divas iLab filiāles Rīgā'],
  },
  ru: {
    home: ['Бесплатная диагностика', 'Цена до начала ремонта', 'Гарантия до 1 года', '13+ лет опыта'],
    phone: ['Гарантия до 1 года', 'Диагностика телефонов перед ремонтом', 'Стоимость согласуем до начала работ', 'Два филиала iLab в Риге'],
    tablet: ['Гарантия до 1 года', 'Диагностика планшетов перед ремонтом', 'Стоимость согласуем до начала работ', 'Два филиала iLab в Риге'],
    computer: ['Гарантия до 1 года', 'Диагностика компьютеров перед ремонтом', 'Стоимость и сроки после диагностики', 'Два филиала iLab в Риге'],
    dyson: ['Диагностика Dyson перед ремонтом', 'Оценка неисправности и возможности ремонта', 'Стоимость согласуем до начала работ', 'Два филиала iLab в Риге'],
  },
};
export function getQuickTrustFacts(category, locale = 'lv') {
  const language = locale === 'ru' ? 'ru' : 'lv';
  if (category === 'iphone' || category === 'photo') {
    const content = getQuickFacts(category, language);
    return { ariaLabel: content.ariaLabel, facts: content.facts.map(({ text }) => ({ text })) };
  }
  return {
    ariaLabel: language === 'ru' ? 'Главное о ремонте' : 'Svarīgākais par remontu',
    facts: (COPY[language][category] || []).map(text => ({ text })),
  };
}
