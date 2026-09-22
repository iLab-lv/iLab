export function createIphoneTemplate({ deviceName, htmlDeviceName }) {
  return {
    lv: {
      h1: `${deviceName} remonts`,
      metaTitle: `${deviceName} remonts Rīgā | iLab`,
      metaDescription: `Profesionāls ${deviceName} remonts Rīgā: ekrāns, baterija, uzlāde un kamera. Kvalitatīvas detaļas, bezmaksas diagnostika un garantija līdz 1 gadam.`,
      bodyHtml: `<p><strong>${htmlDeviceName}</strong> remonts Rīgā — ātra diagnostika un izmaksu saskaņošana pirms darba sākšanas. Veicam ekrāna, baterijas, kameras, uzlādes ligzdas un citu komponentu maiņu ar kvalitatīvām detaļām.</p><p>Biežākos remontdarbus veicam tajā pašā dienā. Pēc remonta sniedzam <strong>garantiju līdz 1 gadam</strong> darbam un uzstādītajām detaļām.</p>`,
    },
    ru: {
      h1: `Ремонт ${deviceName}`,
      metaTitle: `Ремонт ${deviceName} в Риге | iLab`,
      metaDescription: `Профессиональный ремонт ${deviceName} в Риге: экран, аккумулятор, зарядка и камера. Качественные детали, бесплатная диагностика и гарантия до 1 года.`,
      bodyHtml: `<p><strong>Ремонт ${htmlDeviceName}</strong> в Риге — быстрая диагностика и согласование стоимости до начала работ. Заменяем экран, аккумулятор, камеру, разъём зарядки и другие компоненты, используя качественные детали.</p><p>Наиболее распространённые ремонты выполняем в тот же день. После ремонта предоставляем <strong>гарантию до 1 года</strong> на выполненные работы и установленные детали.</p>`,
    },
  };
}
