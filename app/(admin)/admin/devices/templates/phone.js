export function createPhoneTemplate({ deviceName, htmlDeviceName, seoDeviceName }) {
  return {
    lv: {
      h1: `${deviceName} remonts`,
      metaTitle: `${seoDeviceName} remonts Rīgā | iLab`,
      metaDescription: `${seoDeviceName} remonts Rīgā: ekrāns, baterija, uzlāde un kamera. Ātra diagnostika, skaidra cena un 90 dienu garantija.`,
      bodyHtml: `<p><strong>${htmlDeviceName}</strong> remonts Rīgā — ātra diagnostika un izmaksu saskaņošana pirms darba sākšanas. Veicam ekrāna, baterijas, kameras, uzlādes ligzdas un citu komponentu maiņu ar kvalitatīvām detaļām.</p><p>Biežākos remontdarbus veicam tajā pašā dienā. Pēc remonta sniedzam <strong>90 dienu garantiju</strong> darbam un uzstādītajām detaļām.</p>`,
    },
    ru: {
      h1: `Ремонт ${deviceName}`,
      metaTitle: `Ремонт ${seoDeviceName} в Риге | iLab`,
      metaDescription: `Ремонт ${seoDeviceName} в Риге: экран, аккумулятор, зарядка и камера. Быстрая диагностика, понятная цена и гарантия 90 дней.`,
      bodyHtml: `<p><strong>Ремонт ${htmlDeviceName}</strong> в Риге — быстрая диагностика и согласование стоимости до начала работ. Заменяем экран, аккумулятор, камеру, разъём зарядки и другие компоненты, используя качественные детали.</p><p>Наиболее распространённые ремонты выполняем в тот же день. После ремонта предоставляем <strong>гарантию 90 дней</strong> на выполненные работы и установленные детали.</p>`,
    },
  };
}
