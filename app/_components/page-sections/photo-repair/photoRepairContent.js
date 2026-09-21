const content = {
  lv: {
    meta: {
      title: 'Fotoaparātu remonts Rīgā | iLab',
      description: 'Fotoaparātu un objektīvu remonts Rīgā. Fototehnikas diagnostika, cena pirms darba un 90 dienu garantija iLab servisā.',
      ogDescription: 'Fotoaparātu, objektīvu un citas fototehnikas diagnostika un remonts iLab servisā Rīgā. Cena pirms darba un 90 dienu garantija.',
      imageAlt: 'Fotoaparātu remonts iLab servisā Rīgā',
    },
    home: 'Sākums',
    breadcrumb: 'Fotoaparātu remonts',
    h1: 'Fotoaparātu remonts Rīgā',
    hero: [
      'Fotoaparātu, objektīvu un citas fototehnikas diagnostika un remonts. Palīdzam, ja fotoaparāts neieslēdzas, nefokusējas, objektīvs iestrēdzis vai pēc kritiena tehnika vairs nedarbojas kā iepriekš.',
      'Vispirms nosakām bojājuma iemeslu, pēc tam saskaņojam remonta risinājumu, cenu un izpildes termiņu.',
    ],
    scroll: 'Skatīt pakalpojumus ↓',
    factsLabel: 'Fotoaparātu remonta priekšrocības',
    facts: [
      ['warranty', '90 dienu garantija', 'Darbam un uzstādītajām detaļām.'],
      ['diagnostics', 'Diagnostika pirms remonta', 'Vispirms nosakām bojājuma iemeslu.'],
      ['price', 'Cena pirms darba', 'Izmaksas saskaņojam pirms remonta sākšanas.'],
      ['locations', 'Divi servisi Rīgā', 'Izvēlies sev ērtāko iLab servisu.'],
    ],
    intro: {
      title: 'Fotoaparātu un fototehnikas remonts — ko mēs remontējam',
      intro: [
        'Veicam fotoaparātu, objektīvu un citas fototehnikas diagnostiku un remontu. Palīdzam gan mehānisku bojājumu gadījumā, gan tad, ja ierīce neieslēdzas, nedarbojas stabili, nefokusējas vai pēc kritiena un mitruma parādījušās darbības problēmas.',
        'Fotoaparātiem viens un tas pats simptoms var būt saistīts ar dažādiem mezgliem — mehāniku, elektroniku, kontaktiem, barošanu vai objektīvu. Tāpēc remontu nesākam ar minējumiem vai automātisku detaļu maiņu.',
        'Vispirms pārbaudām ierīci, nosakām iespējamo bojājuma iemeslu un tikai pēc tam saskaņojam piemērotāko remonta variantu, izmaksas un termiņu.',
      ],
    },
    services: {
      eyebrow: 'Biežākie darbi', title: 'Populārākie fotoaparātu remonti',
      intro: 'Īsi par problēmām, ar kurām fotoaparāti visbiežāk nonāk servisā. Precīzu remonta iespēju var noteikt pēc konkrētā modeļa un diagnostikas.',
      items: [
        { title: 'Fotoaparātu diagnostika un remonts', text: 'Pārbaudām fotoaparātu, ja tas neieslēdzas, darbojas nestabili, parāda kļūdu vai kāda no funkcijām pārstājusi darboties.', meta: 'Cena: pēc diagnostikas' },
        { title: 'Autofokusa un fokusēšanas problēmas', text: 'Pārbaudām kameru un objektīvu, ja autofokuss kļūdās, nefokusējas vai attēls nav ass.', meta: 'Cena: pēc diagnostikas' },
        { title: 'Pogas, vadības elementi un displejs', text: 'Diagnostika un remonts, ja nereaģē pogas, slēdži, vadības ritenīši vai displejs.', meta: 'Cena: pēc modeļa un bojājuma' },
        { title: 'Savienojumi un kontakti', text: 'Pārbaudām USB, HDMI, atmiņas kartes zonu, objektīva kontaktus un citus savienojumus.', meta: 'Cena: pēc diagnostikas' },
        { title: 'Mehāniski bojājumi pēc kritiena', text: 'Pārbaudām korpusu, objektīva stiprinājumu, vadības elementus, savienojumus un galvenās funkcijas.', meta: 'Cena: pēc diagnostikas' },
        { title: 'Mitruma bojājumu diagnostika', text: 'Pārbaudām elektroniku, kontaktus un citus komponentus pēc saskares ar mitrumu.', note: 'Ja ierīce samirkusi, to nevajadzētu atkārtoti ieslēgt vai mēģināt uzlādēt.', meta: 'Cena: pēc diagnostikas' },
      ],
    },
    lenses: {
      eyebrow: 'Objektīvu diagnostika un remonts', title: 'Objektīvu remonts Rīgā',
      intro: ['Objektīva darbības problēma ne vienmēr nozīmē, ka tas jāmaina. Atkarībā no modeļa un bojājuma iespējams remontēt mehāniku, kontaktus, elektroniku vai atsevišķus iekšējos mezglus.', 'Veicam objektīvu diagnostiku, ja nedarbojas autofokuss, iestrēgst zoom vai fokusēšanas mehānisms, kamera neatpazīst objektīvu vai pēc kritiena tā darbība kļuvusi nestabila.'],
      items: [
        { title: 'Objektīvs nefokusējas', text: 'Problēma var būt saistīta ar fokusēšanas mehānismu, motoru, kontaktiem, elektroniku vai savienojumu ar kameru.', details: [{ label: 'Ko pārbaudām', text: 'Objektīva mehāniku, elektroniku, kontaktus un darbību kopā ar fotoaparātu.' }] },
        { title: 'Iestrēdzis zoom vai fokusa mehānisms', text: 'Pēc trieciena, nolietojuma vai mehāniska bojājuma objektīva kustība var kļūt nevienmērīga vai pilnībā apstāties.', details: [{ label: 'Ko pārbaudām', text: 'Mehāniskos mezglus, kustības brīvumu un iespējamos iekšējos bojājumus.' }] },
        { title: 'Kamera neatpazīst objektīvu', text: 'Ja objektīvs netiek atpazīts vai savienojums periodiski pazūd, problēma var būt kontaktos, objektīva elektronikā vai kameras pusē.', details: [{ label: 'Ko pārbaudām', text: 'Kontaktus, komunikāciju starp kameru un objektīvu un abu ierīču darbību.' }] },
        { title: 'Objektīvs bojāts pēc kritiena', text: 'Pat ja ārējie bojājumi ir nelieli, trieciens var ietekmēt stiprinājumu, fokusēšanas sistēmu vai iekšējo mehāniku.', details: [{ label: 'Ko pārbaudām', text: 'Stiprinājumu, mehāniku, fokusu, savienojumus un galvenās funkcijas.' }] },
      ],
      footer: 'Meistara piezīme: ja problēma saistīta ar fokusēšanu vai kameras un objektīva savstarpējo darbību, diagnostikai vēlams nodot gan fotoaparātu, gan konkrēto objektīvu. Cena: pēc diagnostikas.',
    },
    brands: {
      eyebrow: 'Populāri zīmoli', title: 'Canon, Nikon un Sony fotoaparātu remonts',
      intro: 'Veicam Canon, Nikon un Sony fotoaparātu un objektīvu diagnostiku un remontu — fokusēšanas, elektronikas, barošanas, savienojumu, mehānikas un citu bojājumu gadījumā. Remonta iespējas nosakām pēc konkrētā modeļa un diagnostikas.',
      items: [
        { brand: 'Canon', logo: '/images/logos/canon-logo-standard-white.svg', title: 'Canon fotoaparātu remonts', description: 'Veicam Canon fotoaparātu diagnostiku un remontu, ja kamera neieslēdzas, nefokusējas, parāda kļūdu vai pēc kritiena nedarbojas pareizi.', families: ['EOS', 'EOS R', 'DSLR'] },
        { brand: 'Nikon', logo: '/images/logos/nikon-logo-standard-white.svg', title: 'Nikon fotoaparātu remonts', description: 'Veicam Nikon fotoaparātu un objektīvu diagnostiku un remontu dažādu elektronisku un mehānisku bojājumu gadījumā.', families: ['DSLR', 'Z Series'] },
        { brand: 'Sony', logo: '/images/logos/sony-logo-standard-white.svg', title: 'Sony kameru remonts', description: 'Veicam Sony kameru diagnostiku un remontu, ja rodas problēmas ar autofokusu, elektroniku, displeju, savienojumiem vai objektīva darbību.', families: ['Alpha', 'Mirrorless'] },
      ],
    },
    problems: {
      eyebrow: 'Problēma un nākamais solis', title: 'Kas noticis ar fotoaparātu?', cause: 'Iespējamais iemesls', action: 'Ko darām',
      items: [
        ['Fotoaparāts neieslēdzas', 'Problēma var būt saistīta ar barošanu, baterijas vai tās kontaktu zonu, savienojumiem, elektroniku vai citu iekšēju bojājumu.', 'Pārbaudām barošanu un galvenos mezglus, lai atrastu bojājuma iemeslu pirms remonta sākšanas.'],
        ['Kamera nefokusējas', 'Fokusēšanas problēmu var izraisīt objektīva mehānika, autofokusa sistēma, kontakti, elektronika vai bojājums pēc trieciena.', 'Pārbaudām fotoaparātu kopā ar objektīvu, lai noteiktu, kurā ierīces daļā radusies problēma.'],
        ['Kamera neatpazīst objektīvu', 'Problēma var būt kontaktos, objektīva elektronikā, savienojumā ar kameru vai pašā fotoaparātā.', 'Pārbaudām objektīvu, kontaktus un kameras darbību, lai nevajadzīgi nemainītu detaļas.'],
        ['Fotoaparāts nokritis', 'Pat ja korpuss ārēji izskatās vesels, trieciens var ietekmēt stiprinājumu, vadības elementus, mehāniku, savienojumus vai elektroniku.', 'Pārbaudām galvenās funkcijas un mehāniskos mezglus pirms remonta apjoma noteikšanas.'],
        ['Fotoaparāts samircis', 'Mitrums var radīt oksidāciju un bojāt kontaktus vai elektroniku arī tad, ja ierīce sākotnēji turpina darboties.', 'Veicam diagnostiku un novērtējam bojājuma apjomu pirms mēģinājuma ierīci atkārtoti lietot.'],
        ['Attēlā parādījušies plankumi vai citi defekti', 'Problēma var būt saistīta ar objektīvu, optisko sistēmu, sensora zonu vai citu kameras komponentu.', 'Nosakām, kurā sistēmas daļā rodas attēla defekts, un paskaidrojam iespējamo risinājumu.'],
      ],
    },
    why: { eyebrow: 'Servisa pieeja', title: 'Kāpēc klienti izvēlas iLab?', intro: 'Saprotama diagnostika un skaidrs remonta process — vispirms nosakām problēmu un tikai pēc tam lemjam par remontu.', items: [
      { title: 'Diagnostika pirms remonta', text: 'Vispirms pārbaudām fotoaparātu vai objektīvu un nosakām, kur atrodas problēma.' },
      { title: 'Cena un risinājums pirms darba', text: 'Pirms remonta sākšanas saskaņojam iespējamo risinājumu, cenu un paredzamo termiņu.' },
      { title: 'Godīgs remonta novērtējums', text: 'Ja remonts konkrētajā gadījumā nav tehniski vai ekonomiski pamatots, paskaidrojam to pirms darba sākšanas.' },
      { title: 'Divi servisi Rīgā', text: 'Fotoaparātu vai objektīvu vari nodot sev ērtākajā iLab servisā Rīgā.' },
    ] },
    decision: { eyebrow: 'Lēmums pēc pārbaudes', title: 'Remonts, detaļas maiņa vai dziļāka diagnostika?', intro: ['Fotoaparātam viens simptoms ne vienmēr norāda uz vienu konkrētu bojājumu. Fokusēšanas problēma var būt saistīta gan ar objektīvu, gan kameru, bet neieslēgšanās iemesls — gan ar barošanu, gan elektroniku.', 'Tāpēc vispirms pārbaudām ierīci un tikai pēc tam nosakām piemērotāko nākamo soli.'], items: [
      { title: 'Kad iespējams lokāls remonts', text: 'Ja problēma ir konkrētā mehānismā, kontaktā, savienojumā vai citā remontējamā mezglā, var nebūt nepieciešama visa komponenta nomaiņa.', examples: ['nestabils kontakts', 'mehāniska problēma', 'vadības elements nedarbojas pareizi'] },
      { title: 'Kad nepieciešama detaļas maiņa', text: 'Detaļas maiņa var būt nepieciešama, ja konkrēts komponents ir fiziski bojāts, nolietots vai to nav iespējams droši atjaunot.', examples: ['bojāts displejs', 'salauzts vadības elements', 'bojāts savienojums'] },
      { title: 'Kad vajadzīga dziļāka diagnostika', text: 'Padziļināta pārbaude nepieciešama, ja ierīce neieslēdzas, darbojas nestabili, bijusi mitrumā vai problēmas iemesls nav redzams bez izjaukšanas.', examples: ['kamera periodiski izslēdzas', 'ierīce bijusi mitrumā', 'problēma parādījusies pēc kritiena'] },
    ], footer: 'Pēc diagnostikas paskaidrojam atrasto problēmu, iespējamo remonta variantu, cenu un paredzamo termiņu.' },
    quality: { eyebrow: 'Kvalitāte un garantija', title: 'Fotoaparātu remonts ar pārbaudi pēc darba', intro: 'Pēc darba pārbaudām funkcijas, kas saistītas ar veikto remontu, un pārliecināmies, ka ierīce darbojas stabili.', items: [
      { title: 'Pārbaude pēc remonta', text: 'Atkarībā no darba pārbaudām ieslēgšanos, barošanu, vadības elementus, fokusu, displeju, savienojumus un kontaktus.' },
      { title: '90 dienu garantija', text: 'Veiktajam remontam un uzstādītajām detaļām nodrošinām 90 dienu garantiju atbilstoši remonta veidam.' },
      { title: 'Cena saskaņota pirms darba', text: 'Remontu sākam pēc tam, kad noteikts bojājums un saskaņots risinājums, izmaksas un termiņš.' },
      { title: 'Remonts pēc diagnostikas', text: 'Darba apjomu nosakām pēc ierīces pārbaudes, nevis tikai pēc aprakstītā simptoma.' },
    ] },
    reviewsTitle: 'Klientu atsauksmes par iLab',
    locations: { titleMain: 'Izvēlies darbnīcu ', titleAccent: 'Rīgā', subtitle: 'Fotoaparātu, objektīvu vai citu fototehniku vari nodot pārbaudei sev ērtākajā iLab servisā Rīgā.' },
    process: { eyebrow: 'Process servisā', title: 'Kā notiek fotoaparātu remonts', intro: 'Vienkāršs process no sākotnējās pārbaudes līdz saskaņotam remontam un ierīces pārbaudei.', items: [
      { title: 'Nodod ierīci servisā', text: 'Atnes fotoaparātu, objektīvu vai citu fototehniku uz iLab. Ja problēma saistīta ar objektīvu vai fokusēšanu, diagnostikai vēlams nodot kameru kopā ar konkrēto objektīvu.' },
      { title: 'Veicam diagnostiku', text: 'Pārbaudām bojājuma simptomus un nosakām, vai problēma ir mehānikā, elektronikā, savienojumos, objektīvā vai citā mezglā.' },
      { title: 'Saskaņojam cenu un termiņu', text: 'Pirms darba sākšanas paskaidrojam atrasto problēmu, iespējamo remonta risinājumu, cenu un paredzamo izpildes laiku.' },
      { title: 'Veicam remontu un pārbaudi', text: 'Veicam saskaņoto darbu un pēc remonta pārbaudām funkcijas, kas saistītas ar konkrēto bojājumu.' },
      { title: 'Saņem ierīci ar garantiju', text: 'Pēc remonta saņem pārbaudītu ierīci un 90 dienu garantiju veiktajam darbam un uzstādītajām detaļām.' },
    ] },
    guide: { title: 'Fotoaparātu remonta ceļvedis', intro: 'Noderīga informācija pirms fotoaparāta vai objektīva nodošanas remontā.', items: [
      { title: 'Fotoaparāts un objektīvs darbojas kā viena sistēma', text: 'Fokusa, attēla asuma un savienojuma problēma var būt objektīvā, kamerā vai savienojumā starp abām ierīcēm. Diagnostikai vēlams atnest gan fotoaparātu, gan objektīvu.' },
      { title: 'Pēc kritiena ne vienmēr redzams viss bojājums', text: 'Trieciens var ietekmēt stiprinājumu, mehāniku, kontaktus vai iekšējos komponentus arī tad, ja korpuss izskatās vesels.' },
      { title: 'Ko darīt pēc saskares ar mitrumu', text: 'Neieslēdz un neuzlādē ierīci. Ja bateriju var droši izņemt, atvieno to un pēc iespējas ātrāk nodod tehniku diagnostikai.' },
      { title: 'Kāpēc cenu ne vienmēr var pateikt tikai pēc simptoma', text: 'Vienādam simptomam var būt atšķirīgi cēloņi, tāpēc sarežģītākos gadījumos precīzu cenu nosakām pēc diagnostikas.' },
    ] },
    faqTitle: 'Biežāk uzdotie jautājumi par fotoaparātu remontu',
    faq: [
      ['Vai fotoaparātu diagnostikai jānes arī objektīvs?', 'Ja problēma saistīta ar fokusēšanu, attēla asumu, kameras un objektīva savienojumu vai kļūdas paziņojumiem, diagnostikai vēlams atnest gan fotoaparātu, gan objektīvu, ar kuru problēma novērota. Tas palīdz precīzāk noteikt, vai bojājums atrodas kamerā, objektīvā vai savienojumā starp abām ierīcēm.'],
      ['Vai objektīvu iespējams salabot, vai tas vienmēr jāmaina?', 'Objektīvs ne vienmēr jāmaina pilnībā. Atkarībā no modeļa un bojājuma iespējams remontēt mehānismu, kontaktus, elektroniku vai atsevišķus iekšējos mezglus. Precīzu remonta iespēju nosakām pēc diagnostikas.'],
      ['Vai remontējat Canon, Nikon un Sony fotoaparātus?', 'Jā, veicam Canon, Nikon un Sony fotoaparātu un objektīvu diagnostiku un remontu atkarībā no konkrētā modeļa, bojājuma veida un detaļu pieejamības. Tas ietver arī Canon EOS un EOS R, Nikon DSLR un Z sērijas, kā arī Sony Alpha kameras.'],
      ['Ko darīt, ja fotoaparāts nokritis, bet vēl darbojas?', 'Ja pēc kritiena fotoaparāts turpina darboties, tas vēl nenozīmē, ka iekšēju bojājumu nav. Trieciens var ietekmēt objektīva stiprinājumu, fokusēšanu, vadības elementus, savienojumus vai iekšējos mezglus. Ja pēc kritiena parādījušās izmaiņas darbībā, ieteicama diagnostika.'],
      ['Ko darīt, ja fotoaparāts vai objektīvs samircis?', 'Neieslēdz un neuzlādē ierīci. Ja bateriju iespējams droši izņemt, atvieno to. Fototehniku vēlams pēc iespējas ātrāk nodot diagnostikai, jo mitrums var izraisīt oksidāciju arī pēc tam, kad ierīce ārēji jau šķiet sausa.'],
      ['Kāpēc remonta cenu nevar vienmēr pateikt uzreiz?', 'Vienam un tam pašam simptomam var būt vairāki iemesli. Piemēram, fokusēšanas problēma var būt saistīta ar objektīvu, kameru, kontaktiem vai elektroniku. Tāpēc precīzu remonta risinājumu un cenu nosakām pēc diagnostikas un saskaņojam pirms darba sākšanas.'],
    ],
  },
};

content.ru = {
  ...content.lv,
  meta: { title: 'Ремонт фотоаппаратов в Риге | iLab', description: 'Ремонт фотоаппаратов и объективов в Риге. Диагностика фототехники, согласование цены до ремонта и гарантия 90 дней в iLab.', ogDescription: 'Диагностика и ремонт фотоаппаратов, объективов и другой фототехники в сервисе iLab в Риге. Цена согласовывается до начала ремонта.', imageAlt: 'Ремонт фотоаппаратов в сервисе iLab в Риге' },
  home: 'Главная', breadcrumb: 'Ремонт фотоаппаратов', h1: 'Ремонт фотоаппаратов в Риге',
  hero: ['Диагностика и ремонт фотоаппаратов, объективов и другой фототехники. Помогаем, если фотоаппарат не включается, не фокусируется, заедает объектив или после падения техника работает не так, как раньше.', 'Сначала определяем причину неисправности, затем согласовываем вариант ремонта, стоимость и срок выполнения.'], scroll: 'Смотреть услуги ↓', factsLabel: 'Преимущества ремонта фотоаппаратов',
  facts: [['warranty','Гарантия 90 дней','На выполненные работы и установленные детали.'],['diagnostics','Диагностика до ремонта','Сначала определяем причину неисправности.'],['price','Цена до начала работ','Стоимость согласовываем до начала ремонта.'],['locations','Два сервиса в Риге','Выберите удобный сервис iLab.']],
  intro: { title: 'Ремонт фотоаппаратов и фототехники — что мы ремонтируем', intro: ['Выполняем диагностику и ремонт фотоаппаратов, объективов и другой фототехники. Помогаем при механических повреждениях и когда устройство не включается, работает нестабильно, не фокусируется или пострадало после падения либо контакта с влагой.', 'Один симптом может быть связан с механикой, электроникой, контактами, питанием или объективом. Поэтому мы не начинаем ремонт с предположений или автоматической замены деталей.', 'Сначала проверяем устройство, определяем причину неисправности и только после этого согласовываем вариант ремонта, стоимость и срок.'] },
  services: { eyebrow: 'Частые работы', title: 'Популярные виды ремонта фотоаппаратов', intro: 'Основные неисправности, с которыми фотоаппараты чаще всего попадают в сервис. Точную возможность ремонта определяем после проверки модели.', items: [
    {title:'Диагностика и ремонт фотоаппаратов',text:'Проверяем фотоаппарат, если он не включается, работает нестабильно, показывает ошибку или перестала работать одна из функций.',meta:'Цена: после диагностики'},
    {title:'Проблемы автофокуса и фокусировки',text:'Проверяем камеру и объектив, если автофокус ошибается, не фокусируется или изображение остаётся нерезким.',meta:'Цена: после диагностики'},
    {title:'Кнопки, органы управления и дисплей',text:'Диагностика и ремонт, если не реагируют кнопки, переключатели, колёсики управления или дисплей.',meta:'Цена: зависит от модели и неисправности'},
    {title:'Разъёмы и контакты',text:'Проверяем USB, HDMI, область карты памяти, контакты объектива и другие соединения.',meta:'Цена: после диагностики'},
    {title:'Механические повреждения после падения',text:'Проверяем корпус, крепление объектива, органы управления, соединения и основные функции устройства.',meta:'Цена: после диагностики'},
    {title:'Диагностика после попадания влаги',text:'Оцениваем состояние электроники, контактов и других компонентов после контакта с влагой.',note:'Если устройство намокло, его не следует снова включать или заряжать.',meta:'Цена: после диагностики'},
  ]},
  lenses: { eyebrow:'Диагностика и ремонт объективов',title:'Ремонт объективов в Риге',intro:['Неисправность объектива не всегда означает, что его нужно менять целиком. В зависимости от модели возможен ремонт механики, контактов, электроники или отдельных внутренних узлов.','Проводим диагностику, если не работает автофокус, заедает зум или фокусировка, камера не распознаёт объектив либо после падения его работа стала нестабильной.'],items:[
    {title:'Объектив не фокусируется',text:'Причина может быть в механизме фокусировки, моторе, контактах, электронике или соединении с камерой.',details:[{label:'Что проверяем',text:'Механику и электронику объектива, контакты и работу вместе с фотоаппаратом.'}]},
    {title:'Заедает зум или механизм фокусировки',text:'После удара, износа или механического повреждения движение может стать неравномерным или заблокироваться.',details:[{label:'Что проверяем',text:'Механические узлы, свободное движение элементов и внутренние повреждения.'}]},
    {title:'Камера не распознаёт объектив',text:'Причина может находиться в контактах, электронике объектива или на стороне камеры.',details:[{label:'Что проверяем',text:'Контакты, связь между камерой и объективом и работу обоих устройств.'}]},
    {title:'Объектив повреждён после падения',text:'Даже небольшой удар может повлиять на крепление, фокусировку или внутреннюю механику.',details:[{label:'Что проверяем',text:'Крепление, механику, фокусировку, соединения и основные функции.'}]},
  ],footer:'Примечание мастера: при проблемах с фокусировкой желательно принести фотоаппарат вместе с конкретным объективом. Цена: после диагностики.'},
  brands:{eyebrow:'Популярные бренды',title:'Ремонт фотоаппаратов Canon, Nikon и Sony',intro:'Выполняем диагностику и ремонт фотоаппаратов и объективов Canon, Nikon и Sony при проблемах с фокусировкой, электроникой, питанием, соединениями, механикой и других неисправностях. Возможность ремонта определяем по конкретной модели и результатам диагностики.',items:[
    {brand:'Canon',logo:'/images/logos/canon-logo-standard-white.svg',title:'Ремонт фотоаппаратов Canon',description:'Выполняем диагностику и ремонт фотоаппаратов Canon, если камера не включается, не фокусируется, показывает ошибку или после падения работает неправильно.',families:['EOS','EOS R','DSLR']},
    {brand:'Nikon',logo:'/images/logos/nikon-logo-standard-white.svg',title:'Ремонт фотоаппаратов Nikon',description:'Проводим диагностику и ремонт фотоаппаратов и объективов Nikon при различных электронных и механических неисправностях.',families:['DSLR','Z Series']},
    {brand:'Sony',logo:'/images/logos/sony-logo-standard-white.svg',title:'Ремонт камер Sony',description:'Выполняем диагностику и ремонт камер Sony при проблемах с автофокусом, электроникой, дисплеем, соединениями или работой объектива.',families:['Alpha','Mirrorless']},
  ]},
  problems:{eyebrow:'Проблема и следующий шаг',title:'Что случилось с фотоаппаратом?',cause:'Возможная причина',action:'Что делаем',items:[
    ['Фотоаппарат не включается','Причина может быть связана с питанием, аккумулятором, контактами, соединениями или электроникой.','Проверяем питание и основные узлы до начала ремонта.'],['Камера не фокусируется','Причина может быть в механике объектива, автофокусе, контактах, электронике или последствиях удара.','Проверяем фотоаппарат вместе с объективом.'],['Камера не распознаёт объектив','Причина может быть в контактах, электронике объектива, соединении или камере.','Проверяем объектив, контакты и работу камеры.'],['Фотоаппарат упал','Удар может повлиять на крепление, органы управления, механику, соединения или электронику.','Проверяем основные функции и механические узлы.'],['Фотоаппарат намок','Влага может вызвать окисление и повредить контакты или электронику.','Проводим диагностику до повторного использования.'],['На изображении появились пятна или другие дефекты','Причина может быть в объективе, оптике, области сенсора или другом компоненте.','Определяем источник дефекта и объясняем решение.']
  ]},
  why:{eyebrow:'Подход сервиса',title:'Почему клиенты выбирают iLab?',intro:'Понятная диагностика и прозрачный процесс — сначала определяем проблему и только затем принимаем решение о ремонте.',items:[{title:'Диагностика до ремонта',text:'Сначала проверяем фотоаппарат или объектив и определяем неисправность.'},{title:'Цена и решение до начала работ',text:'Согласовываем решение, стоимость и предполагаемый срок.'},{title:'Честная оценка ремонта',text:'Если ремонт технически или экономически нецелесообразен, сообщаем до начала работ.'},{title:'Два сервиса в Риге',text:'Технику можно передать в удобный сервис iLab в Риге.'}]},
  decision:{eyebrow:'Решение после проверки',title:'Ремонт, замена детали или углублённая диагностика?',intro:['Один симптом не всегда указывает на одну неисправность: проблема может находиться как в объективе, так и в камере, питании или электронике.','Сначала проверяем устройство и только затем определяем следующий шаг.'],items:[{title:'Когда возможен локальный ремонт',text:'Если неисправен конкретный механизм, контакт или соединение, замена всего компонента может не потребоваться.',examples:['нестабильный контакт','механическая неисправность','неисправный элемент управления']},{title:'Когда требуется замена детали',text:'Замена нужна, если компонент физически повреждён, изношен или не подлежит безопасному восстановлению.',examples:['повреждённый дисплей','сломанный элемент управления','повреждённый разъём']},{title:'Когда нужна углублённая диагностика',text:'Более глубокая проверка нужна при нестабильной работе, влаге или скрытой неисправности.',examples:['камера выключается','устройство контактировало с влагой','проблема появилась после падения']}],footer:'После диагностики объясняем неисправность, вариант ремонта, стоимость и предполагаемый срок.'},
  quality:{eyebrow:'Качество и гарантия',title:'Ремонт фотоаппаратов с проверкой после работы',intro:'После ремонта проверяем связанные функции и убеждаемся, что устройство работает стабильно.',items:[{title:'Проверка после ремонта',text:'Проверяем питание, управление, фокусировку, дисплей, соединения и контакты.'},{title:'Гарантия 90 дней',text:'Предоставляем гарантию 90 дней на выполненный ремонт и установленные детали.'},{title:'Цена согласована заранее',text:'Начинаем ремонт после согласования решения, стоимости и срока.'},{title:'Ремонт после диагностики',text:'Объём работ определяем после проверки устройства, а не только по описанному симптому.'}]},
  reviewsTitle:'Отзывы клиентов об iLab',locations:{titleMain:'Выберите сервис ',titleAccent:'в Риге',subtitle:'Фотоаппарат, объектив или другую фототехнику можно передать на проверку в удобный сервис iLab в Риге.'},
  process:{eyebrow:'Процесс в сервисе',title:'Как проходит ремонт фотоаппаратов',intro:'Понятный процесс от проверки до согласованного ремонта и тестирования.',items:[{title:'Передайте устройство в сервис',text:'Принесите фотоаппарат, объектив или другую фототехнику. При проблемах с фокусировкой желательно принести камеру вместе с объективом.'},{title:'Проводим диагностику',text:'Определяем, связана ли проблема с механикой, электроникой, соединениями, объективом или другим узлом.'},{title:'Согласовываем цену и срок',text:'Объясняем неисправность, вариант ремонта, стоимость и срок.'},{title:'Выполняем ремонт и проверку',text:'Выполняем согласованные работы и проверяем связанные функции.'},{title:'Получите устройство с гарантией',text:'Вы получаете проверенное устройство и гарантию 90 дней.'}]},
  guide:{title:'Что важно знать перед ремонтом фотоаппарата',intro:'Полезная информация перед передачей фотоаппарата или объектива в сервис.',items:[{title:'Фотоаппарат и объектив работают как единая система',text:'Причина проблем с фокусировкой и соединением может быть в объективе, камере или связи между ними.'},{title:'После падения повреждение не всегда видно снаружи',text:'Удар может повлиять на крепление, механику, контакты и внутренние компоненты.'},{title:'Что делать после контакта с влагой',text:'Не включайте и не заряжайте устройство. Безопасно извлеките аккумулятор и передайте технику на диагностику.'},{title:'Почему цену нельзя всегда назвать по симптому',text:'Одинаковый симптом может иметь разные причины, поэтому точную цену определяем после диагностики.'}]},
  faqTitle:'Частые вопросы о ремонте фотоаппаратов',faq:[
    ['Нужно ли приносить объектив вместе с фотоаппаратом на диагностику?','Если проблема связана с фокусировкой, резкостью изображения, соединением камеры и объектива или сообщениями об ошибках, желательно принести и фотоаппарат, и объектив, с которым проявляется неисправность. Это помогает точнее определить, находится ли проблема в камере, объективе или соединении между ними.'],
    ['Можно ли отремонтировать объектив или его всегда нужно менять?','Объектив не всегда нужно менять целиком. В зависимости от модели и характера неисправности возможен ремонт механизма, контактов, электроники или отдельных внутренних узлов. Точную возможность ремонта определяем после диагностики.'],
    ['Ремонтируете ли вы фотоаппараты Canon, Nikon и Sony?','Да, выполняем диагностику и ремонт фотоаппаратов и объективов Canon, Nikon и Sony в зависимости от конкретной модели, характера неисправности и доступности деталей. В том числе работаем с Canon EOS и EOS R, Nikon DSLR и серией Z, а также камерами Sony Alpha.'],
    ['Что делать, если фотоаппарат упал, но продолжает работать?','Если после падения фотоаппарат продолжает работать, это не означает, что внутренних повреждений нет. Удар может повлиять на крепление объектива, фокусировку, органы управления, соединения или внутренние узлы. Если после падения работа устройства изменилась, рекомендуется диагностика.'],
    ['Что делать, если фотоаппарат или объектив намок?','Не включайте и не заряжайте устройство. Если аккумулятор можно безопасно извлечь, отключите его. Фототехнику желательно как можно быстрее передать на диагностику, поскольку влага может вызвать окисление даже после того, как снаружи устройство уже кажется сухим.'],
    ['Почему стоимость ремонта не всегда можно назвать сразу?','Один и тот же симптом может иметь разные причины. Например, проблема с фокусировкой может быть связана с объективом, камерой, контактами или электроникой. Поэтому точный вариант ремонта и стоимость определяем после диагностики и согласовываем до начала работы.'],
  ],
};

export function getPhotoRepairContent(locale = 'lv') {
  return content[locale] || content.lv;
}
