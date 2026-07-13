export function getWhyUsContent(locale = 'lv', variant = 'iphone') {
  const content = {
    lv: {
      eyebrow: 'Klientu izvēle', titleStart: 'Kāpēc klienti izvēlas ', titleAccent: 'iLab?',
      intro: 'Saprotama diagnostika un skaidrs remonta process - bez liekiem solījumiem un pārsteigumiem cenā.',
      experienceTitle: 'gadu pieredze ierīču remontā',
      experienceText: 'Pieredze palīdz ātrāk saprast bojājuma iemeslu, izvēlēties piemērotāko risinājumu un izvairīties no liekiem remonta darbiem. Klientam pirms darba sākšanas paskaidrojam, kas ir bojāts un kāds risinājums konkrētajā gadījumā ir pamatots.',
      points: [
        ['Sākotnējā pārbaude pirms remonta', 'Pirms remonta pārbaudām ierīci un paskaidrojam iespējamos risinājumus.'],
        ['Cena un risinājums pirms darba', 'Pirms darba sākšanas saskaņojam risinājumu, cenu un izpildes termiņu.'],
        ['Ērti servisi Rīgā', 'Ierīci var nodot remontam iLab servisos Rīgā - izvēlies sev ērtāko vietu.'],
        ['Godīgs remonta ieteikums', 'Ja pietiek ar tīrīšanu vai remonts nav izdevīgs, paskaidrojam to pirms darba sākšanas.'],
      ],
    },
    ru: {
      eyebrow: 'Выбор клиентов', titleStart: 'Почему клиенты выбирают ', titleAccent: 'iLab?',
      intro: 'Понятная диагностика и прозрачный процесс ремонта - без лишних обещаний и сюрпризов в цене.',
      experienceTitle: 'лет опыта в ремонте устройств',
      experienceText: 'Опыт помогает быстрее определить причину неисправности, выбрать подходящее решение и избежать лишних работ. До начала ремонта объясняем, что повреждено и какое решение обосновано в конкретном случае.',
      points: [
        ['Первичная проверка до ремонта', 'До ремонта проверяем устройство и объясняем возможные варианты решения.'],
        ['Цена и решение до начала работы', 'До начала работы согласовываем решение, стоимость и срок выполнения.'],
        ['Удобные сервисы в Риге', 'Устройство можно сдать в один из сервисов iLab в Риге.'],
        ['Честная рекомендация по ремонту', 'Если достаточно чистки или ремонт невыгоден, объясняем это до начала работы.'],
      ],
    },
  };

  return { ...content[locale] || content.lv, experience: variant === 'iphone' ? '15+' : '15+' };
}
