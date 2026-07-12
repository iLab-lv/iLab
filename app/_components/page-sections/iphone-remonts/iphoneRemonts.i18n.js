export function getIphoneProblemAnswersContent(locale = 'lv') {
  const content = {
    lv: {
      eyebrow: 'Problēmas un nākamais solis',
      titleStart: 'Kas noticis ar ',
      titleAccent: 'iPhone?',
      intro:
        'Izvēlies situāciju, kas vislabāk atbilst tavai problēmai. Dažos gadījumos pietiek ar tīrīšanu, citos nepieciešama detaļas maiņa vai dziļāka diagnostika.',
      labels: ['Īsā atbilde', 'Iespējamais iemesls', 'Ko darām', 'Nākamais solis'],
      problems: [
        ['iPhone nelādējas', 'Vispirms jāpārbauda uzlādes ligzda un baterija - ne vienmēr uzreiz jāmaina detaļa.', 'Netīra uzlādes ligzda, bojāts kabelis, nolietota baterija vai barošanas ķēdes problēma.', 'Pārbaudām uzlādes ligzdu, bateriju un uzlādes darbību. Dažreiz pietiek ar tīrīšanu, bet bojājuma gadījumā nepieciešama detaļas maiņa vai diagnostika.', 'Izvēlies modeli zemāk vai atnes iPhone uz diagnostiku.'],
        ['iPhone ātri izlādējas', 'Visbiežāk jāpārbauda baterijas stāvoklis, bet reizēm problēmu rada uzlāde, programmatūra vai mitruma bojājums.', 'Nolietota baterija, programmatūras slodze, uzlādes problēma vai mitruma bojājums.', 'Pārbaudām baterijas stāvokli un uzlādes darbību, pēc tam iesakām baterijas maiņu vai dziļāku pārbaudi.', 'Izvēlies savu iPhone modeli, lai redzētu baterijas maiņas cenu.'],
        ['Ekrāns saplīsis vai nereaģē', 'Ja ekrāns ir saplaisājis, rāda līnijas vai nereaģē uz pieskārieniem, parasti nepieciešama displeja pārbaude vai maiņa.', 'Bojāts displejs, stikls, savienojums vai bojājums pēc kritiena.', 'Pārbaudām attēlu, skārienjutību un displeja darbību, pēc tam piedāvājam piemērotu ekrāna maiņas risinājumu.', 'Izvēlies modeli, lai redzētu ekrāna remonta variantus un cenu.'],
        ['Slikti dzird sarunas laikā', 'Vispirms jāpārbauda skaļruņa un mikrofona tīrība, jo dažos gadījumos pietiek ar tīrīšanu.', 'Netīrs skaļruņa vai mikrofona sietiņš, bojāts skaļrunis, mikrofons vai savienojums.', 'Vispirms pārbaudām, vai palīdz tīrīšana. Ja problēma saglabājas, pārbaudām detaļas un iesakām remontu.', 'Atnes iPhone pārbaudei vai izvēlies modeli cenu apskatei.'],
        ['Kamera nefokusējas vai neieslēdzas', 'Kameras problēma var būt saistīta ar moduli, stiklu vai savienojumu, tāpēc vispirms pārbaudām kameras darbību.', 'Bojāts kameras modulis, stikls, savienojums vai kritiena radīts bojājums.', 'Pārbaudām kameru, stiklu un darbību pēc remonta, lai pārliecinātos, ka kamera strādā stabili.', 'Izvēlies modeli, lai redzētu kameras remonta iespējas.'],
        ['iPhone bijis ūdenī', 'Nelādē iPhone pēc mitruma. Drošākais solis ir ātra diagnostika un tīrīšana.', 'Mitrums, oksidācija vai plates bojājums.', 'Šādos gadījumos sākam ar diagnostiku un tīrīšanu. Dažreiz nepieciešams dziļāks remonts.', 'Nelādē ierīci, ja tā bijusi mitrumā. Atved to uz diagnostiku pēc iespējas ātrāk.'],
        ['iPhone neieslēdzas', 'Ja iPhone neieslēdzas, vispirms nepieciešama diagnostika, jo iemesls var būt baterijā, uzlādē, mitrumā vai plates bojājumā.', 'Baterija, uzlādes ķēde, mitrums, kritiena bojājums vai plates problēma.', 'Veicam diagnostiku, lai noteiktu, vai problēma ir baterijā, uzlādē, detaļās vai plates līmenī.', 'Šajā gadījumā cena nosakāma pēc diagnostikas.'],
      ],
    },
    ru: {
      eyebrow: 'Проблема и следующий шаг',
      titleStart: 'Что случилось с ',
      titleAccent: 'iPhone?',
      intro: 'Выберите ситуацию, которая лучше всего описывает проблему. Иногда достаточно чистки, в других случаях нужна замена детали или более глубокая диагностика.',
      labels: ['Короткий ответ', 'Возможная причина', 'Что делаем', 'Следующий шаг'],
      problems: [
        ['iPhone не заряжается', 'Сначала нужно проверить разъём зарядки и батарею - деталь не всегда нужно менять сразу.', 'Загрязнённый разъём, повреждённый кабель, изношенная батарея или проблема в цепи питания.', 'Проверяем разъём, батарею и работу зарядки. Иногда достаточно чистки, в других случаях нужна замена детали или диагностика.', 'Выберите модель ниже или принесите iPhone на диагностику.'],
        ['iPhone быстро разряжается', 'Чаще всего нужно проверить состояние батареи, но причиной также могут быть зарядка, программное обеспечение или влага.', 'Изношенная батарея, нагрузка от ПО, проблема с зарядкой или повреждение влагой.', 'Проверяем батарею и зарядку, затем рекомендуем замену батареи или более глубокую проверку.', 'Выберите модель iPhone, чтобы посмотреть цену замены батареи.'],
        ['Экран разбит или не реагирует', 'Если экран треснул, показывает линии или не реагирует на касания, обычно нужна проверка или замена дисплея.', 'Повреждённый дисплей, стекло, соединение или последствия падения.', 'Проверяем изображение, сенсор и работу дисплея, затем предлагаем подходящий вариант замены экрана.', 'Выберите модель, чтобы посмотреть варианты и цену ремонта экрана.'],
        ['Плохо слышно во время разговора', 'Сначала нужно проверить чистоту динамика и микрофона - иногда достаточно чистки.', 'Загрязнённая сетка, повреждённый динамик, микрофон или соединение.', 'Сначала проверяем, помогает ли чистка. Если проблема остаётся, проверяем детали и рекомендуем ремонт.', 'Принесите iPhone на проверку или выберите модель для просмотра цен.'],
        ['Камера не фокусируется или не включается', 'Проблема камеры может быть связана с модулем, стеклом или соединением, поэтому сначала проверяем её работу.', 'Повреждённый модуль камеры, стекло, соединение или последствия падения.', 'Проверяем камеру, стекло и её работу после ремонта, чтобы убедиться в стабильной работе.', 'Выберите модель, чтобы посмотреть варианты ремонта камеры.'],
        ['iPhone был в воде', 'Не заряжайте iPhone после попадания влаги. Самый безопасный шаг - быстрая диагностика и чистка.', 'Влага, окисление или повреждение платы.', 'В таких случаях начинаем с диагностики и чистки. Иногда нужен более глубокий ремонт.', 'Не заряжайте устройство после влаги. Принесите его на диагностику как можно скорее.'],
        ['iPhone не включается', 'Если iPhone не включается, сначала нужна диагностика - причина может быть в батарее, зарядке, влаге или плате.', 'Батарея, цепь зарядки, влага, последствия падения или проблема платы.', 'Проводим диагностику, чтобы определить, где проблема - в батарее, зарядке, деталях или плате.', 'В этом случае стоимость определяется после диагностики.'],
      ],
    },
  };

  return content[locale] || content.lv;
}

export function getIphoneExpertNotesContent(locale = 'lv') {
  const content = {
    lv: {
      eyebrow: 'Meistaru pieredze',
      titleStart: 'Svarīgas iPhone remonta ',
      titleAccent: 'nianses',
      intro: 'Dažiem iPhone remontiem svarīga ir ne tikai detaļas maiņa, bet arī tas, kā konkrētais modelis reaģē pēc remonta. Pirms darba paskaidrojam iespējamās nianses, detaļu variantus un ko pārbaudām pēc remonta.',
      notes: [
        ['Displeja paziņojums pēc maiņas', 'Dažiem iPhone modeļiem pēc displeja maiņas iestatījumos var parādīties “Important Display Message”, “Unknown Part” vai līdzīgs detaļas paziņojums. Pats paziņojums parasti netraucē lietot iPhone, bet norāda, ka detaļa nav verificēta Apple sistēmā.'],
        ['Šķidruma bojājumu termiņš nav prognozējams uzreiz', 'Pēc šķidruma vai mitruma bojājumiem remonta ilgumu un cenu nevar precīzi noteikt tikai pēc ārējām pazīmēm. Bojājuma apmērs kļūst redzams diagnostikas laikā. Līdz pārbaudei iPhone labāk nelādēt.'],
        ['Uzlādes ligzda ne vienmēr jāmaina', 'Ja kabelis slikti turas, uzlāde pazūd vai iPhone lādējas tikai noteiktā leņķī, iemesls bieži ir netīrumi ligzdā. Vispirms pārbaudām un tīrām ligzdu, bet detaļu mainām tikai tad, ja tā ir fiziski bojāta vai problēma paliek pēc tīrīšanas.'],
        ['Ne katra kļūda nozīmē vienas detaļas maiņu', 'Face ID, kameras, skaņas vai uzlādes problēmas pēc kritiena ne vienmēr nozīmē tikai konkrētās detaļas bojājumu. Problēma var būt savienojumos, mitruma sekās vai plates līmenī, tāpēc sarežģītākos gadījumos sākam ar diagnostiku.'],
      ],
    },
    ru: {
      eyebrow: 'Опыт мастеров',
      titleStart: 'Важные нюансы ремонта ',
      titleAccent: 'iPhone',
      intro: 'Для некоторых ремонтов iPhone важна не только замена детали, но и реакция конкретной модели после ремонта. До начала работы объясняем возможные нюансы, варианты деталей и проверки после ремонта.',
      notes: [
        ['Уведомление о дисплее после замены', 'На некоторых моделях iPhone после замены дисплея в настройках может появиться “Important Display Message”, “Unknown Part” или похожее уведомление. Обычно оно не мешает пользоваться iPhone, но означает, что деталь не подтверждена системой Apple.'],
        ['Срок ремонта после влаги нельзя определить сразу', 'После попадания жидкости или влаги срок и стоимость нельзя точно определить только по внешним признакам. Масштаб повреждения становится понятен во время диагностики. До проверки iPhone лучше не заряжать.'],
        ['Разъём зарядки не всегда нужно менять', 'Если кабель плохо держится, зарядка пропадает или iPhone заряжается только под определённым углом, причиной часто бывает загрязнение разъёма. Сначала проверяем и чистим разъём, а деталь меняем только при физическом повреждении или если проблема остаётся после чистки.'],
        ['Не каждая неисправность означает замену одной детали', 'Проблемы Face ID, камеры, звука или зарядки после падения не всегда означают неисправность только одной детали. Причина может быть в соединениях, последствиях влаги или на уровне платы, поэтому в сложных случаях начинаем с диагностики.'],
      ],
    },
  };

  return content[locale] || content.lv;
}
