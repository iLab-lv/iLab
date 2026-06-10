export function createNotebookTemplate({ deviceName, htmlDeviceName, seoDeviceName }) {
  return {
    lv: {
      h1: `${deviceName} remonts`,
      metaTitle: `${seoDeviceName} remonts Rīgā | iLab`,
      metaDescription: `${seoDeviceName} remonts Rīgā: baterija, ekrāns, uzlāde un sistēma. Profesionāla diagnostika, skaidra cena un 90 dienu garantija.`,
      bodyHtml: `<p><strong>${htmlDeviceName}</strong> remonts Rīgā — diagnostika, baterijas, ekrāna, uzlādes, tastatūras un sistēmas problēmu novēršana. Pirms darba saskaņojam izmaksas un piemērotāko remonta risinājumu.</p><p>Pēc remonta pārbaudām datoru un sniedzam <strong>90 dienu garantiju</strong> darbam un uzstādītajām detaļām.</p>`,
    },
    ru: {
      h1: `Ремонт ${deviceName}`,
      metaTitle: `Ремонт ${seoDeviceName} в Риге | iLab`,
      metaDescription: `Ремонт ${seoDeviceName} в Риге: аккумулятор, экран, зарядка и система. Профессиональная диагностика, понятная цена и гарантия 90 дней.`,
      bodyHtml: `<p><strong>Ремонт ${htmlDeviceName}</strong> в Риге — диагностика и устранение проблем с аккумулятором, экраном, зарядкой, клавиатурой и системой. До начала работ согласовываем стоимость и наиболее подходящий вариант ремонта.</p><p>После ремонта проверяем компьютер и предоставляем <strong>гарантию 90 дней</strong> на выполненные работы и установленные детали.</p>`,
    },
  };
}
