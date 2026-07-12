const CONTENT = {
  lv: {
    iphone: { eyebrow:'Process servisā', titleStart:'Kā notiek ', titleAccent:'iPhone remonts', intro:'Vienkāršs process no diagnostikas līdz pārbaudītai ierīcei ar garantiju.', steps:[
      ['Atnes ierīci vai nosūti ar kurjeru','iPhone vari nodot iLab servisā Rīgā vai nosūtīt ar kurjeru. Pievieno īsu aprakstu par problēmu, lai meistars sāk ar pareizu pārbaudi.'],
      ['Veicam diagnostiku','Pārbaudām bojājuma iemeslu un pasakām, vai pietiek ar tīrīšanu, nepieciešama detaļas maiņa vai dziļāka diagnostika.'],
      ['Saskaņojam cenu un termiņu','Pirms darba sākšanas izskaidrojam risinājumu, detaļas variantu, cenu un izpildes termiņu.'],
      ['Salabojam un pārbaudām','Veicam remontu, pārbaudām svarīgākās iPhone funkcijas un izsniedzam ierīci ar 90 dienu garantiju.'],
    ]},
  },
  ru: {
    iphone: { eyebrow:'Процесс в сервисе', titleStart:'Как проходит ', titleAccent:'ремонт iPhone', intro:'Простой процесс от диагностики до проверенного устройства с гарантией.', steps:[
      ['Принесите устройство или отправьте курьером','iPhone можно сдать в сервис iLab в Риге или отправить курьером. Добавьте краткое описание проблемы для правильной проверки.'],
      ['Проводим диагностику','Проверяем причину неисправности и определяем, достаточно ли чистки, нужна замена детали или более глубокая диагностика.'],
      ['Согласовываем цену и срок','До начала работы объясняем решение, вариант детали, стоимость и срок выполнения.'],
      ['Ремонтируем и проверяем','Выполняем ремонт, проверяем важные функции iPhone и выдаём устройство с гарантией 90 дней.'],
    ]},
  },
};
export function getRepairProcessContent(locale = 'lv', variant = 'iphone') { const copy=CONTENT[locale]||CONTENT.lv; return copy[variant]||copy.iphone; }
