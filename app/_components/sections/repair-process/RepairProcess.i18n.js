const CONTENT = {
  lv: {
    'iphone-battery': { eyebrow:'Baterijas maiņas process', titleStart:'Kā notiek iPhone ', titleAccent:'baterijas maiņa?', intro:'No baterijas simptomu pārbaudes līdz uzlādes un stabilas darbības testam.', steps:[
      ['Pārbaudām ierīci','Novērtējam baterijas simptomus, uzlādi, ierīces stāvokli un redzamus bojājumus.'],
      ['Nosakām precīzu iPhone modeli','Pārbaudām modeli un baterijas detaļas pieejamību.'],
      ['Saskaņojam cenu','Pirms darba sākšanas izskaidrojam cenu, remonta iespējas un garantijas nosacījumus.'],
      ['Nomainām bateriju','Veicam baterijas maiņu atbilstoši konkrētā iPhone modeļa konstrukcijai.'],
      ['Pārbaudām pēc remonta','Testējam uzlādi, ierīces ieslēgšanos, stabilitāti un pamata funkcijas.'],
    ]},
    'iphone-screen': { eyebrow:'Ekrāna maiņas process', titleStart:'Kā notiek iPhone ', titleAccent:'ekrāna maiņa?', intro:'No bojājuma pārbaudes līdz jaunā ekrāna un svarīgāko iPhone funkciju testam.', steps:[
      ['Pārbaudām ekrāna bojājumu','Novērtējam stiklu, displeju, skārienu un redzamus kritiena vai mitruma bojājumus.'],
      ['Nosakām precīzu iPhone modeli','Pārbaudām modeli un pieejamos ekrāna maiņas variantus.'],
      ['Saskaņojam cenu','Pirms darba sākšanas izskaidrojam cenu, detaļas pieejamību un garantijas nosacījumus.'],
      ['Veicam ekrāna maiņu','Nomainām bojāto ekrāna moduli atbilstoši konkrētā iPhone modeļa konstrukcijai.'],
      ['Pārbaudām ierīci pēc remonta','Testējam attēlu, skārienu, sensorus un pamata funkcijas, lai pārliecinātos, ka telefons darbojas korekti.'],
    ]},
    iphone: { eyebrow:'Process servisā', titleStart:'Kā notiek ', titleAccent:'iPhone remonts', intro:'Vienkāršs process no diagnostikas līdz pārbaudītai ierīcei ar garantiju.', steps:[
      ['Atnes ierīci vai nosūti ar kurjeru','iPhone vari nodot iLab servisā Rīgā vai nosūtīt ar kurjeru. Pievieno īsu aprakstu par problēmu, lai meistars sāk ar pareizu pārbaudi.'],
      ['Veicam diagnostiku','Pārbaudām bojājuma iemeslu un pasakām, vai pietiek ar tīrīšanu, nepieciešama detaļas maiņa vai dziļāka diagnostika.'],
      ['Saskaņojam cenu un termiņu','Pirms darba sākšanas izskaidrojam risinājumu, detaļas variantu, cenu un izpildes termiņu.'],
      ['Salabojam un pārbaudām','Veicam remontu, pārbaudām svarīgākās iPhone funkcijas un izsniedzam ierīci ar 90 dienu garantiju.'],
    ]},
  },
  ru: {
    'iphone-battery': { eyebrow:'Процесс замены батареи', titleStart:'Как проходит ', titleAccent:'замена батареи iPhone?', intro:'От проверки симптомов батареи до тестирования зарядки и стабильной работы.', steps:[
      ['Проверяем устройство','Оцениваем симптомы батареи, зарядку, состояние устройства и видимые повреждения.'],
      ['Определяем точную модель iPhone','Проверяем модель и наличие подходящей батареи.'],
      ['Согласовываем цену','До начала работы объясняем стоимость, варианты ремонта и условия гарантии.'],
      ['Меняем батарею','Выполняем замену батареи с учётом конструкции конкретной модели iPhone.'],
      ['Проверяем после ремонта','Тестируем зарядку, включение устройства, стабильность и основные функции.'],
    ]},
    'iphone-screen': { eyebrow:'Процесс замены экрана', titleStart:'Как проходит ', titleAccent:'замена экрана iPhone?', intro:'От проверки повреждения до тестирования нового экрана и важных функций iPhone.', steps:[
      ['Проверяем повреждение экрана','Оцениваем стекло, дисплей, сенсор и видимые повреждения после падения или контакта с влагой.'],
      ['Определяем точную модель iPhone','Проверяем модель и доступные варианты замены экрана.'],
      ['Согласовываем цену','До начала работы объясняем стоимость, наличие детали и условия гарантии.'],
      ['Выполняем замену экрана','Меняем повреждённый экранный модуль с учётом конструкции конкретной модели iPhone.'],
      ['Проверяем устройство после ремонта','Тестируем изображение, сенсор, датчики и основные функции, чтобы убедиться в правильной работе телефона.'],
    ]},
    iphone: { eyebrow:'Процесс в сервисе', titleStart:'Как проходит ', titleAccent:'ремонт iPhone', intro:'Простой процесс от диагностики до проверенного устройства с гарантией.', steps:[
      ['Принесите устройство или отправьте курьером','iPhone можно сдать в сервис iLab в Риге или отправить курьером. Добавьте краткое описание проблемы для правильной проверки.'],
      ['Проводим диагностику','Проверяем причину неисправности и определяем, достаточно ли чистки, нужна замена детали или более глубокая диагностика.'],
      ['Согласовываем цену и срок','До начала работы объясняем решение, вариант детали, стоимость и срок выполнения.'],
      ['Ремонтируем и проверяем','Выполняем ремонт, проверяем важные функции iPhone и выдаём устройство с гарантией 90 дней.'],
    ]},
  },
};
export function getRepairProcessContent(locale = 'lv', variant = 'iphone') { const copy=CONTENT[locale]||CONTENT.lv; return copy[variant]||copy.iphone; }
