const CONTENT = {
  lv: {
    title: 'Nezini, kas tieši bojāts?',
    intro:
      'Ja problēma nav acīmredzama, vari orientēties pēc pazīmēm. iLab servisā pārbaudīsim ierīci un pateiksim, vai vajadzīga tīrīšana, detaļas maiņa vai padziļināta diagnostika.',
    items: [
      ['Ekrāns ir melns, bet telefons vibrē', 'Iespējams ekrāna, savienojuma vai barošanas ķēdes bojājums. Vispirms pārbaudām, vai problēma ir tikai ekrānā.'],
      ['Ekrāns mirgo vai nereaģē uz pieskārieniem', 'Jāpārbauda ekrāna modulis, pieskārienu darbība un savienojumi pēc kritiena vai trieciena.'],
      ['iPhone nelādējas vai kabelis slikti turas', 'Var būt vajadzīga uzlādes ligzdas tīrīšana, ligzdas maiņa, baterijas pārbaude vai padziļināta diagnostika.'],
      ['Telefons ātri izlādējas vai izslēdzas', 'Pārbaudām baterijas stāvokli un to, vai strāvas patēriņu neietekmē cits bojājums.'],
      ['Kamera nefokusē vai rāda melnu attēlu', 'Jāpārbauda kamera, kameras stikliņš, savienojumi un programmatūras darbība.'],
      ['Skaņa ir klusa vai sarunās slikti dzird', 'Iespējama skaļruņa, mikrofona, putekļu vai mitruma problēma. Dažreiz pietiek ar tīrīšanu.'],
      ['Pēc mitruma telefons darbojas nestabili', 'Nepieciešama mitruma bojājumu pārbaude. Šādos gadījumos labāk ierīci nelādēt, pirms tā nav pārbaudīta servisā.'],
      ['Telefons neieslēdzas vai restartējas', 'Šādos gadījumos sākam ar padziļinātu diagnostiku, jo iemesls var būt baterijā, platē, savienojumos vai citā komponentā.'],
    ],
  },
  ru: {
    title: 'Не знаете, что именно сломалось?',
    intro:
      'Если причина проблемы неочевидна, можно ориентироваться по признакам. В сервисе iLab мы проверим устройство и скажем, нужна ли чистка, замена детали или углублённая диагностика.',
    items: [
      ['Экран чёрный, но телефон вибрирует', 'Возможна неисправность экрана, соединения или цепи питания. Сначала проверяем, связана ли проблема только с экраном.'],
      ['Экран мигает или не реагирует на касания', 'Нужно проверить модуль экрана, сенсор и соединения после падения или удара.'],
      ['iPhone не заряжается или кабель плохо держится', 'Может потребоваться чистка или замена разъёма, проверка батареи либо углублённая диагностика.'],
      ['Телефон быстро разряжается или выключается', 'Проверяем состояние батареи и не влияет ли другая неисправность на расход энергии.'],
      ['Камера не фокусируется или показывает чёрный экран', 'Нужно проверить камеру, защитное стекло, соединения и работу программного обеспечения.'],
      ['Звук тихий или собеседника плохо слышно', 'Возможна проблема с динамиком, микрофоном, пылью или влагой. Иногда достаточно чистки.'],
      ['После влаги телефон работает нестабильно', 'Необходима проверка повреждений от влаги. До осмотра в сервисе устройство лучше не заряжать.'],
      ['Телефон не включается или перезагружается', 'Начинаем с углублённой диагностики: причина может быть в батарее, плате, соединениях или другом компоненте.'],
    ],
  },
};

export function getModelSymptomGuide(modelName = 'iPhone', locale = 'lv') {
  const content = CONTENT[locale] || CONTENT.lv;

  return {
    ...content,
    items: content.items.map(([title, text]) => ({
      title: title.replace(/iPhone/g, modelName),
      text: text.replace(/iPhone/g, modelName),
    })),
  };
}
