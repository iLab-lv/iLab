const COPY = {
  lv: { titleStart: 'Citi ', titleAccent: 'modeļi', intro: 'Apskati līdzīgus modeļus no tās pašas sērijas un tuvākajiem izlaiduma gadiem.', suffix: 'remonts', prev: 'Iepriekšējie modeļi', next: 'Nākamie modeļi' },
  ru: { titleStart: 'Другие ', titleAccent: 'модели', intro: 'Посмотрите похожие модели той же серии и ближайших годов выпуска.', suffix: 'ремонт', prev: 'Предыдущие модели', next: 'Следующие модели' },
};

export function getRelatedModelsCopy(locale = 'lv') {
  return COPY[locale] || COPY.lv;
}
