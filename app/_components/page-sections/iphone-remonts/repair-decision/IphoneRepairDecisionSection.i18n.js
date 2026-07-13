export function getIphoneRepairDecisionContent(locale = 'lv') {
  const content = {
    lv: { eyebrow:'Lēmums pēc pārbaudes', titleStart:'Tīrīšana, detaļas maiņa vai ', titleAccent:'diagnostika?', intro:'Ne katrs bojājums nozīmē detaļas maiņu. Pēc pārbaudes paskaidrojam, vai problēmu var atrisināt ar tīrīšanu, detaļas nomaiņu vai nepieciešama dziļāka diagnostika.', ctaTitle:'Vispirms pārbaudām, pēc tam saskaņojam', ctaText:'Vispirms pārbaudām ierīci, pēc tam saskaņojam risinājumu, cenu un izpildes termiņu.', cta:'Sazināties ar servisu', cards:[
      ['Kad pietiek ar','tīrīšanu','Tīrīšana var palīdzēt, ja problēmu rada putekļi vai netīrumi uzlādes ligzdā, skaļrunī vai mikrofona sietiņā.',['uzlāde pārtrūkst','skaņa kļuvusi klusa','kabelis neturas ligzdā']],
      ['Kad jāmaina','detaļas maiņa','Detaļas maiņa parasti nepieciešama, ja ekrāns, baterija, kamera, uzlādes ligzda vai cits komponents ir fiziski bojāts, nolietots vai nestrādā stabili.',['saplaisājis ekrāns','nolietota baterija','bojāta kamera vai ligzda']],
      ['Kad vajadzīga','diagnostika','Diagnostika nepieciešama, ja bojājuma iemesls nav skaidrs, iPhone neieslēdzas, bijis mitrumā, restartējas vai darbojas nestabili.',['iPhone neieslēdzas','bijis saskarē ar ūdeni','pārkarst vai restartējas']],
    ]},
    ru: { eyebrow:'Решение после проверки', titleStart:'Чистка, замена детали или ', titleAccent:'диагностика?', intro:'Не каждая неисправность означает замену детали. После проверки объясняем, можно ли решить проблему чисткой, заменой детали или нужна более глубокая диагностика.', ctaTitle:'Сначала проверяем, затем согласовываем', ctaText:'Сначала проверяем устройство, затем согласовываем решение, стоимость и срок выполнения.', cta:'Связаться с сервисом', cards:[
      ['Когда достаточно','чистки','Чистка может помочь, если проблему вызывают пыль или загрязнение в разъёме зарядки, динамике или сетке микрофона.',['зарядка прерывается','звук стал тихим','кабель не держится в разъёме']],
      ['Когда нужна','замена детали','Замена детали обычно требуется, если экран, батарея, камера, разъём зарядки или другой компонент физически повреждён, изношен или работает нестабильно.',['треснувший экран','изношенная батарея','повреждённая камера или разъём']],
      ['Когда нужна','диагностика','Диагностика нужна, если причина неисправности неясна, iPhone не включается, был во влаге, перезагружается или работает нестабильно.',['iPhone не включается','был контакт с водой','перегревается или перезагружается']],
    ]},
  };
  return content[locale] || content.lv;
}
