export { getGuideContent } from '@/app/(site)/sections/guide/guideContent';

const PRESENTATION = {
  lv: {
    iphone: {
      eyebrow: 'Remonta ceļvedis',
      titleStart: 'iPhone remonta ',
      titleAccent: 'ceļvedis',
      intro: 'Noderīga informācija pirms iPhone remonta - par diagnostiku, detaļām, cenu, garantiju un sagatavošanos servisam.',
      cards: [
        ['Par iPhone remontu', 4],
        ['Cenas un modeļa izvēle', 1],
        ['Populārākie remonta veidi', 0],
        ['Detaļas un garantija', 2],
        ['Pirms iPhone nodošanas servisā', 3],
      ],
    },
  },
  ru: {
    iphone: {
      eyebrow: 'Гид по ремонту',
      titleStart: 'Гид по ремонту ',
      titleAccent: 'iPhone',
      intro: 'Полезная информация перед ремонтом iPhone - о диагностике, деталях, стоимости, гарантии и подготовке к сервису.',
      cards: [
        ['О ремонте iPhone', 4],
        ['Стоимость и выбор модели', 1],
        ['Популярные виды ремонта', 0],
        ['Детали и гарантия', 2],
        ['Перед сдачей iPhone в сервис', 3],
      ],
    },
  },
};

export function getGuidePresentation(locale = 'lv', variant = 'iphone', content = {}) {
  const parts = content.parts || [];
  const copy = PRESENTATION[locale]?.[variant];

  if (!copy) {
    return {
      eyebrow: locale === 'ru' ? 'Полезная информация' : 'Noderīga informācija',
      titleStart: content.title || '',
      titleAccent: '',
      intro: '',
      cards: parts.filter((part) => part?.text),
    };
  }

  const cards = copy.cards
    .map(([title, index]) => ({ title, text: parts[index]?.text }))
    .filter((card) => card.text);

  return { ...copy, cards };
}
