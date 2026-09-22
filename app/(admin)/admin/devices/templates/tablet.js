export function createTabletTemplate({ deviceName, htmlDeviceName, seoDeviceName }) {
  return {
    lv: {
      h1: `${deviceName} remonts`,
      metaTitle: `${seoDeviceName} remonts Rīgā | iLab`,
      metaDescription: `${seoDeviceName} remonts Rīgā: ekrāns, baterija un uzlāde. Precīza diagnostika, kvalitatīvs remonts un garantija līdz 1 gadam.`,
      bodyHtml: `<p><strong>${htmlDeviceName}</strong> remonts Rīgā — ekrāna, displeja stikla, baterijas, uzlādes porta un citu komponentu maiņa. Pirms darba veicam diagnostiku, precizējam detaļu pieejamību un saskaņojam izmaksas.</p><p>Pēc remonta pārbaudām planšetdatoru un sniedzam <strong>garantiju līdz 1 gadam</strong> darbam un uzstādītajām detaļām.</p>`,
    },
    ru: {
      h1: `Ремонт ${deviceName}`,
      metaTitle: `Ремонт ${seoDeviceName} в Риге | iLab`,
      metaDescription: `Ремонт ${seoDeviceName} в Риге: экран, аккумулятор и зарядка. Точная диагностика, качественный ремонт и гарантия до 1 года.`,
      bodyHtml: `<p><strong>Ремонт ${htmlDeviceName}</strong> в Риге — замена экрана, стекла дисплея, аккумулятора, разъёма зарядки и других компонентов. Перед началом работ проводим диагностику, уточняем наличие деталей и согласовываем стоимость.</p><p>После ремонта проверяем планшет и предоставляем <strong>гарантию до 1 года</strong> на выполненные работы и установленные детали.</p>`,
    },
  };
}
