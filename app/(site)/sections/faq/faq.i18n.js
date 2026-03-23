import { faqItem, makeFaq } from './faq.helpers.js';

const BASIC_FAQ = {
  lv: makeFaq('Biežāk uzdotie jautājumi', [
    faqItem(
      'Cik ātri varat salabot ierīci Rīgā?',
      'Biežākos remontus bieži paveicam tajā pašā dienā vai nākamajā dienā, ja detaļa ir pieejama. Vari apskatīt populārākās kategorijas: <a href="/iphone-remonts">iPhone remonts</a>, <a href="/telefonu-remonts">telefonu remonts</a>, <a href="/plansetdatoru-remonts">planšetdatoru remonts</a>, <a href="/datoru-remonts">datoru remonts</a> un <a href="/dyson-remonts">Dyson remonts</a>.'
    ),
    faqItem(
      'Kāda ir remonta cena?',
      'Remonta cena atkarīga no ierīces modeļa, bojājuma un nepieciešamajiem darbiem. Precīzu izmaksu piedāvājumu sagatavojam pēc diagnostikas. Cenas vari apskatīt attiecīgajā kategorijā, piemēram, <a href="/iphone-remonts">iPhone remonts</a> vai <a href="/datoru-remonts">datoru remonts</a>.'
    ),
    faqItem(
      'Vai ir garantija uz veiktajiem darbiem?',
      'Jā, nodrošinām <strong>90 dienu garantiju</strong> veiktajam darbam un izmantotajām detaļām. Garantijas nosacījumus izskaidrojam pirms remonta uzsākšanas.'
    ),
    faqItem(
      'Vai nepieciešams pieraksts, vai var atnest ierīci uzreiz?',
      'Vairumā gadījumu vari atnest ierīci <strong>bez pieraksta</strong>. iLab serviss Rīgā atrodas <strong>Domina Shopping</strong> un <strong>Spice Home</strong>. Plašāka informācija pieejama sadaļā <a href="/kontakti">Kontakti</a>.'
    ),
    faqItem(
      'Kur Rīgā atrodas jūsu serviss?',
      'Mūsu serviss atrodas Rīgā divās vietās — <strong>Domina Shopping</strong> un <strong>Spice Home</strong>. Adreses, tālruņi un darba laiki pieejami sadaļā <a href="/kontakti">Kontakti</a>.'
    ),
    faqItem(
      'Vai dati paliks droši remonta laikā?',
      'Tipiskos remontos lietotāja dati parasti netiek skarti, tomēr drošībai vienmēr iesakām pirms remonta izveidot rezerves kopiju. Tas īpaši svarīgi pirms <a href="/iphone-remonts/ekrana-maina">ekrāna maiņas</a>, <a href="/iphone-remonts/baterijas-maina">baterijas maiņas</a> vai <a href="/datoru-remonts">datora diagnostikas</a>.'
    ),
  ]),
  ru: makeFaq('Часто задаваемые вопросы', [
    faqItem(
      'Как быстро вы можете отремонтировать устройство в Риге?',
      'Популярные ремонты часто выполняем в тот же или на следующий день, если деталь есть в наличии. Вы можете посмотреть основные категории: <a href="/ru/remont-iphone">ремонт iPhone</a>, <a href="/ru/remont-telefonov">ремонт телефонов</a>, <a href="/ru/remont-planshetov">ремонт планшетов</a>, <a href="/ru/remont-kompjuterov">ремонт компьютеров</a> и <a href="/ru/remont-dyson">ремонт Dyson</a>.'
    ),
    faqItem(
      'Сколько стоит ремонт?',
      'Стоимость ремонта зависит от модели устройства, неисправности и объёма работ. Точную цену согласовываем после диагностики. Цены можно посмотреть в нужной категории, например <a href="/ru/remont-iphone">ремонт iPhone</a> или <a href="/ru/remont-kompjuterov">ремонт компьютеров</a>.'
    ),
    faqItem(
      'Есть ли гарантия на выполненные работы?',
      'Да, мы предоставляем <strong>гарантию 90 дней</strong> на выполненные работы и установленные детали. Условия гарантии объясняем до начала ремонта.'
    ),
    faqItem(
      'Нужно ли записываться заранее или можно принести устройство сразу?',
      'В большинстве случаев устройство можно принести <strong>без записи</strong>. Сервис iLab в Риге находится в <strong>Domina Shopping</strong> и <strong>Spice Home</strong>. Подробнее — в разделе <a href="/ru/kontakti">Контакты</a>.'
    ),
    faqItem(
      'Где в Риге находится ваш сервис?',
      'Наш сервис находится в Риге в двух местах — <strong>Domina Shopping</strong> и <strong>Spice Home</strong>. Адреса, телефоны и часы работы указаны в разделе <a href="/ru/kontakti">Контакты</a>.'
    ),
    faqItem(
      'Будут ли данные в безопасности во время ремонта?',
      'При типовых ремонтах пользовательские данные обычно не затрагиваются, но для безопасности мы всегда рекомендуем заранее сделать резервную копию. Это особенно важно перед <a href="/ru/remont-iphone/zamena-ekrana">заменой экрана</a>, <a href="/ru/remont-iphone/zamena-batarei">заменой батареи</a> или <a href="/ru/remont-kompjuterov">диагностикой компьютера</a>.'
    ),
  ]),
};

const CATEGORY_FAQ = {
  'iphone-remonts': {
    lv: makeFaq('Biežāk uzdotie jautājumi par iPhone remontu', [
      faqItem(
        'Cik ātri varat salabot iPhone Rīgā?',
        'Daudzus iPhone remontus, piemēram, <a href="/iphone-remonts/ekrana-maina">ekrāna maiņu</a> vai <a href="/iphone-remonts/baterijas-maina">baterijas maiņu</a>, bieži iespējams veikt tajā pašā dienā. Precīzs termiņš atkarīgs no modeļa un detaļu pieejamības.'
      ),
      faqItem(
        'Kur Rīgā atrodas jūsu iPhone remonta serviss?',
        'iLab iPhone remonta serviss atrodas Rīgā divās vietās — <strong>Domina Shopping</strong> un <strong>Spice Home</strong>. Vari izvēlēties sev ērtāko filiāli un atnest iPhone bez iepriekšēja pieraksta.'
      ),
      faqItem(
        'Vai iPhone ekrāna maiņa tiek veikta uz vietas?',
        'Populārākajiem iPhone modeļiem <a href="/iphone-remonts/ekrana-maina">ekrāna maiņa</a> bieži tiek veikta uz vietas vai tajā pašā dienā. Sarežģītākiem bojājumiem vai retākiem modeļiem termiņš var būt garāks.'
      ),
      faqItem(
        'Vai pēc iPhone remonta mani dati paliks drošībā?',
        'Jā, tipiskos iPhone remontos, piemēram, <a href="/iphone-remonts/ekrana-maina">ekrāna maiņā</a> vai <a href="/iphone-remonts/baterijas-maina">baterijas maiņā</a>, dati parasti netiek skarti. Tomēr drošībai vienmēr iesakām iepriekš izveidot rezerves kopiju.'
      ),
      faqItem(
        'Ko darīt, ja iPhone nelādējas?',
        'Ja iPhone nelādējas, problēma var būt <a href="/iphone-remonts/uzlades-ligzdas-maina">uzlādes ligzdā</a>, <a href="/iphone-remonts/baterijas-maina">akumulatorā</a>, kabelī vai barošanas ķēdē. Servisā veicam diagnostiku un precīzi nosakām bojājuma iemeslu.'
      ),
      faqItem(
        'Ko darīt, ja iPhone ir bijis saskarē ar ūdeni?',
        'Pēc iespējas ātrāk izslēdz iPhone un neliec to lādēties. Jo ātrāk ierīce nonāk servisā uz <a href="/iphone-remonts/udens-bojajumu-remonts">šķidruma bojājumu diagnostiku</a>, jo lielāka iespēja mazināt bojājumu apmēru.'
      ),
      faqItem(
        'Vai iPhone remontam ir garantija?',
        'Jā, nodrošinām <strong>90 dienu garantiju</strong> iPhone remontam, ieskaitot darbu un izmantotās detaļas. Nosacījumus paskaidrojam pirms remonta uzsākšanas.'
      ),
      faqItem(
        'Vai ir vērts remontēt iPhone vai labāk pirkt jaunu?',
        'Daudzos gadījumos iPhone remonts ir izdevīgāks nekā jaunas ierīces iegāde. Piemēram, <a href="/iphone-remonts/ekrana-maina">ekrāna maiņa</a> vai <a href="/iphone-remonts/baterijas-maina">baterijas maiņa</a> parasti izmaksā ievērojami mazāk nekā jauns telefons.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о ремонте iPhone', [
      faqItem(
        'Как быстро можно отремонтировать iPhone в Риге?',
        'Многие ремонты iPhone, например <a href="/ru/remont-iphone/zamena-ekrana">замена экрана</a> или <a href="/ru/remont-iphone/zamena-batarei">замена батареи</a>, часто можно выполнить в тот же день. Точный срок зависит от модели и наличия деталей.'
      ),
      faqItem(
        'Где в Риге находится ваш сервис по ремонту iPhone?',
        'Сервис iLab по ремонту iPhone находится в Риге в двух местах — <strong>Domina Shopping</strong> и <strong>Spice Home</strong>. Вы можете выбрать удобный филиал и принести iPhone без предварительной записи.'
      ),
      faqItem(
        'Делаете ли вы замену экрана iPhone на месте?',
        'Для популярных моделей iPhone <a href="/ru/remont-iphone/zamena-ekrana">замена экрана</a> часто выполняется на месте или в тот же день. Для редких моделей и сложных повреждений срок может быть больше.'
      ),
      faqItem(
        'Будут ли мои данные в безопасности после ремонта iPhone?',
        'Да, при типовых ремонтах iPhone, например <a href="/ru/remont-iphone/zamena-ekrana">замене экрана</a> или <a href="/ru/remont-iphone/zamena-batarei">замене батареи</a>, данные обычно не затрагиваются. Но для безопасности мы рекомендуем заранее сделать резервную копию.'
      ),
      faqItem(
        'Что делать, если iPhone не заряжается?',
        'Если iPhone не заряжается, проблема может быть в <a href="/ru/remont-iphone/zamena-razjoma-zarjadki">разъёме зарядки</a>, <a href="/ru/remont-iphone/zamena-batarei">батарее</a>, кабеле или цепи питания. В сервисе мы проводим диагностику и точно определяем причину.'
      ),
      faqItem(
        'Что делать, если iPhone попал в воду?',
        'Как можно быстрее выключите iPhone и не ставьте его на зарядку. Чем быстрее устройство попадёт в сервис на <a href="/ru/remont-iphone/remont-posle-popadanija-zhidkosti">диагностику после попадания жидкости</a>, тем выше шанс уменьшить последствия повреждения.'
      ),
      faqItem(
        'Есть ли гарантия на ремонт iPhone?',
        'Да, мы предоставляем <strong>гарантию 90 дней</strong> на ремонт iPhone, включая работу и установленные детали. Условия объясняем до начала ремонта.'
      ),
      faqItem(
        'Стоит ли ремонтировать iPhone или лучше купить новый?',
        'Во многих случаях ремонт iPhone выгоднее покупки нового устройства. Например, <a href="/ru/remont-iphone/zamena-ekrana">замена экрана</a> или <a href="/ru/remont-iphone/zamena-batarei">замена батареи</a> обычно стоят значительно меньше, чем новый телефон.'
      ),
    ]),
  },

  'telefonu-remonts': {
    lv: makeFaq('Biežāk uzdotie jautājumi par telefonu remontu', [
      faqItem(
        'Kādus telefonus jūs remontējat Rīgā?',
        'Remontējam iPhone, Samsung, Xiaomi, Huawei, OnePlus, Google Pixel un citus populārus telefonus. Precīzas iespējas atkarīgas no modeļa un detaļu pieejamības. Plašāk skati <a href="/telefonu-remonts">telefonu remonta lapā</a>.'
      ),
      faqItem(
        'Cik ātri notiek telefonu remonts?',
        'Biežākos telefonu remontus bieži iespējams paveikt tajā pašā vai nākamajā dienā. Sarežģītākiem bojājumiem termiņu nosakām pēc diagnostikas un detaļu pieejamības.'
      ),
      faqItem(
        'Ko darīt, ja telefons neieslēdzas?',
        'Ja telefons neieslēdzas, bojājums var būt saistīts ar akumulatoru, uzlādes ķēdi, displeju vai mātesplati. Servisā veicam diagnostiku un nosakām precīzu bojājuma iemeslu.'
      ),
      faqItem(
        'Vai remontējat telefonus pēc ūdens bojājumiem?',
        'Jā, veicam telefonu diagnostiku un <a href="/telefonu-remonts/udens-bojajumu-remonts">remontu pēc ūdens bojājumiem</a>. Svarīgi pēc iespējas ātrāk izslēgt ierīci un neatlikt vēršanos servisā.'
      ),
      faqItem(
        'Vai telefonu remontam nepieciešams pieraksts?',
        'Nē, vairumā gadījumu telefonu vari atnest bez pieraksta. Ja vēlies precizēt detaļu pieejamību vai termiņu, vari sazināties ar mums pirms vizītes sadaļā <a href="/kontakti">Kontakti</a>.'
      ),
      faqItem(
        'Kur Rīgā atrodas jūsu telefonu remonta serviss?',
        'iLab telefonu remonta serviss Rīgā atrodas <strong>Domina Shopping</strong> un <strong>Spice Home</strong>. Vari izvēlēties sev tuvāko vai ērtāko filiāli.'
      ),
      faqItem(
        'Vai pēc telefona remonta būs garantija?',
        'Jā, nodrošinām <strong>90 dienu garantiju</strong> veiktajam remontam un izmantotajām detaļām.'
      ),
      faqItem(
        'Vai ir vērts remontēt telefonu ar saplaisājušu ekrānu?',
        'Daudzos gadījumos <a href="/telefonu-remonts/ekrana-maina">ekrāna maiņa</a> ir izdevīgāka nekā jauna telefona iegāde. Pēc pārbaudes varam pateikt, vai remonts konkrētajai ierīcei ir ekonomiski pamatots.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о ремонте телефонов', [
      faqItem(
        'Какие телефоны вы ремонтируете в Риге?',
        'Мы ремонтируем iPhone, Samsung, Xiaomi, Huawei, OnePlus, Google Pixel и другие популярные телефоны. Точные возможности зависят от модели и наличия деталей. Подробнее смотрите на странице <a href="/ru/remont-telefonov">ремонта телефонов</a>.'
      ),
      faqItem(
        'Сколько обычно занимает ремонт телефона?',
        'Популярные ремонты телефонов часто выполняются в тот же или на следующий день. Для более сложных случаев срок определяется после диагностики и проверки наличия деталей.'
      ),
      faqItem(
        'Что делать, если телефон не включается?',
        'Если телефон не включается, причина может быть связана с батареей, цепью питания, экраном или платой. В сервисе мы проводим диагностику и точно определяем неисправность.'
      ),
      faqItem(
        'Ремонтируете ли вы телефоны после попадания воды?',
        'Да, мы выполняем диагностику и <a href="/ru/remont-telefonov/remont-posle-popadanija-zhidkosti">ремонт после попадания жидкости</a>. Важно как можно быстрее выключить устройство и не откладывать визит в сервис.'
      ),
      faqItem(
        'Нужно ли записываться заранее на ремонт телефона?',
        'Нет, в большинстве случаев телефон можно принести без предварительной записи. Если хотите уточнить наличие деталей или срок, можно связаться с нами заранее в разделе <a href="/ru/kontakti">Контакты</a>.'
      ),
      faqItem(
        'Где в Риге находится ваш сервис по ремонту телефонов?',
        'Сервис iLab по ремонту телефонов в Риге находится в <strong>Domina Shopping</strong> и <strong>Spice Home</strong>. Вы можете выбрать более удобный филиал.'
      ),
      faqItem(
        'Есть ли гарантия на ремонт телефона?',
        'Да, мы предоставляем <strong>гарантию 90 дней</strong> на выполненный ремонт и установленные детали.'
      ),
      faqItem(
        'Стоит ли ремонтировать телефон с разбитым экраном?',
        'Во многих случаях <a href="/ru/remont-telefonov/zamena-ekrana">замена экрана</a> выгоднее покупки нового телефона. После проверки мы скажем, насколько ремонт оправдан для вашего устройства.'
      ),
    ]),
  },

  'plansetdatoru-remonts': {
    lv: makeFaq('Biežāk uzdotie jautājumi par planšetdatoru remontu', [
      faqItem(
        'Vai remontējat iPad un Android planšetdatorus Rīgā?',
        'Jā, remontējam gan iPad, gan dažādu zīmolu Android planšetdatorus. Remonta iespējas atkarīgas no modeļa un detaļu pieejamības. Plašāk skati <a href="/plansetdatoru-remonts">planšetdatoru remontā</a>.'
      ),
      faqItem(
        'Ko darīt, ja planšetei saplīsis stikls vai ekrāns?',
        'Ja planšetei ir saplaisājis stikls vai bojāts ekrāns, nepieciešama diagnostika un atbilstoša nomaiņa. Dažiem modeļiem iespējama tikai stikla maiņa, citiem jāmaina viss displeja modulis.'
      ),
      faqItem(
        'Cik ilgi ilgst planšetdatora remonts?',
        'Vienkāršāki planšetdatoru remonti dažkārt tiek veikti tajā pašā vai nākamajā dienā. Sarežģītākiem darbiem termiņš atkarīgs no modeļa un detaļām.'
      ),
      faqItem(
        'Ko darīt, ja planšete nelādējas?',
        'Ja planšete nelādējas, problēma var būt <a href="/plansetdatoru-remonts/uzlades-ligzdas-maina">uzlādes ligzdā</a>, akumulatorā vai barošanas ķēdēs. Pēc diagnostikas varam pateikt precīzu bojājuma iemeslu.'
      ),
      faqItem(
        'Vai planšetdatora remontam ir garantija?',
        'Jā, planšetdatoru remontam nodrošinām <strong>90 dienu garantiju</strong> veiktajam darbam un izmantotajām detaļām.'
      ),
      faqItem(
        'Kur Rīgā atrodas jūsu planšetdatoru remonta serviss?',
        'iLab planšetdatoru remonta serviss atrodas <strong>Domina Shopping</strong> un <strong>Spice Home</strong> Rīgā.'
      ),
      faqItem(
        'Vai planšetdatorā būs droši dati remonta laikā?',
        'Daudzos gadījumos planšetdatora remonts neietekmē lietotāja datus, taču drošībai vienmēr iesakām pirms remonta izveidot rezerves kopiju.'
      ),
      faqItem(
        'Vai ir vērts remontēt planšeti vai labāk pirkt jaunu?',
        'Tas atkarīgs no modeļa, ekrāna bojājuma un ierīces kopējā stāvokļa. Pēc diagnostikas varam palīdzēt izvērtēt, vai planšetes remonts ir ekonomiski pamatots.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о ремонте планшетов', [
      faqItem(
        'Ремонтируете ли вы iPad и Android-планшеты в Риге?',
        'Да, мы ремонтируем как iPad, так и Android-планшеты разных брендов. Возможность ремонта зависит от модели и наличия деталей. Подробнее смотрите на странице <a href="/ru/remont-planshetov">ремонта планшетов</a>.'
      ),
      faqItem(
        'Что делать, если у планшета разбилось стекло или экран?',
        'Если у планшета разбито стекло или повреждён экран, требуется диагностика и подходящая замена. Для одних моделей возможна замена только стекла, для других — всего дисплейного модуля.'
      ),
      faqItem(
        'Сколько обычно занимает ремонт планшета?',
        'Простые ремонты планшетов иногда выполняются в тот же или на следующий день. Для более сложных работ срок зависит от модели и наличия деталей.'
      ),
      faqItem(
        'Что делать, если планшет не заряжается?',
        'Если планшет не заряжается, проблема может быть в <a href="/ru/remont-planshetov/zamena-razjoma-zarjadki">разъёме зарядки</a>, батарее или цепях питания. После диагностики мы точно определим причину.'
      ),
      faqItem(
        'Есть ли гарантия на ремонт планшета?',
        'Да, на ремонт планшетов мы предоставляем <strong>гарантию 90 дней</strong> на выполненные работы и установленные детали.'
      ),
      faqItem(
        'Где в Риге находится ваш сервис по ремонту планшетов?',
        'Сервис iLab по ремонту планшетов находится в Риге в <strong>Domina Shopping</strong> и <strong>Spice Home</strong>.'
      ),
      faqItem(
        'Будут ли данные на планшете в безопасности во время ремонта?',
        'Во многих случаях ремонт планшета не затрагивает пользовательские данные, но для безопасности мы рекомендуем заранее сделать резервную копию.'
      ),
      faqItem(
        'Стоит ли ремонтировать планшет или лучше купить новый?',
        'Это зависит от модели, характера повреждения экрана и общего состояния устройства. После диагностики мы поможем оценить, оправдан ли ремонт.'
      ),
    ]),
  },

  'datoru-remonts': {
    lv: makeFaq('Biežāk uzdotie jautājumi par datoru remontu', [
      faqItem(
        'Kādus datorus jūs remontējat Rīgā?',
        'Remontējam portatīvos un galda datorus, tostarp MacBook, iMac, Lenovo, HP, Dell, Asus, Acer, MSI un citus populārus modeļus. Plašāk skati <a href="/datoru-remonts">datoru remonta lapā</a>.'
      ),
      faqItem(
        'Ko darīt, ja dators pārkarst vai ir ļoti skaļš?',
        'Visbiežāk nepieciešama dzesēšanas sistēmas tīrīšana, ventilatoru apkope un termopastas maiņa. Jo ilgāk dators pārkarst, jo lielāks risks papildu bojājumiem.'
      ),
      faqItem(
        'Kāpēc dators strādā lēni?',
        'Lēna darbība bieži saistīta ar nolietotu disku, nepietiekamu RAM, pārkarsušu sistēmu vai programmatūras problēmām. Pēc diagnostikas varam ieteikt optimālo risinājumu.'
      ),
      faqItem(
        'Vai remontējat datorus, kas neieslēdzas?',
        'Jā, veicam diagnostiku datoriem, kas neieslēdzas vai izslēdzas darba laikā. Bojājums var būt saistīts ar barošanu, mātesplati, SSD vai citiem komponentiem.'
      ),
      faqItem(
        'Vai iespējams saglabāt datus datora remonta laikā?',
        'Daudzos gadījumos jā — īpaši, ja problēma nav tieši saistīta ar pašu datu nesēju. Tomēr pirms remonta iesakām izveidot rezerves kopiju, ja tas ir iespējams.'
      ),
      faqItem(
        'Cik ilgi ilgst datora remonts?',
        'Vienkāršāki darbi bieži ir gatavi tajā pašā vai nākamajā dienā. Sarežģītākiem remontiem termiņu nosakām pēc diagnostikas un detaļu pieejamības.'
      ),
      faqItem(
        'Kur Rīgā atrodas jūsu datoru remonta serviss?',
        'iLab datoru remonta serviss atrodas Rīgā — <strong>Domina Shopping</strong> un <strong>Spice Home</strong>.'
      ),
      faqItem(
        'Vai datoru remontam ir garantija?',
        'Jā, nodrošinām <strong>90 dienu garantiju</strong> darbam un izmantotajām detaļām.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о ремонте компьютеров', [
      faqItem(
        'Какие компьютеры вы ремонтируете в Риге?',
        'Мы ремонтируем ноутбуки и настольные компьютеры, включая MacBook, iMac, Lenovo, HP, Dell, Asus, Acer, MSI и другие популярные модели. Подробнее смотрите на странице <a href="/ru/remont-kompjuterov">ремонта компьютеров</a>.'
      ),
      faqItem(
        'Что делать, если компьютер перегревается или сильно шумит?',
        'Чаще всего требуется чистка системы охлаждения, обслуживание вентиляторов и замена термопасты. Чем дольше компьютер перегревается, тем выше риск дополнительных повреждений.'
      ),
      faqItem(
        'Почему компьютер работает медленно?',
        'Медленная работа часто связана с изношенным диском, недостатком RAM, перегревом или программными проблемами. После диагностики мы предложим оптимальное решение.'
      ),
      faqItem(
        'Ремонтируете ли вы компьютеры, которые не включаются?',
        'Да, мы выполняем диагностику компьютеров, которые не включаются или выключаются во время работы. Причина может быть связана с питанием, платой, SSD или другими компонентами.'
      ),
      faqItem(
        'Можно ли сохранить данные во время ремонта компьютера?',
        'Во многих случаях да — особенно если проблема не связана напрямую с носителем данных. Но перед ремонтом мы рекомендуем сделать резервную копию, если это возможно.'
      ),
      faqItem(
        'Сколько обычно занимает ремонт компьютера?',
        'Простые работы часто готовы в тот же или на следующий день. Для более сложных ремонтов срок определяется после диагностики и проверки наличия деталей.'
      ),
      faqItem(
        'Где в Риге находится ваш сервис по ремонту компьютеров?',
        'Сервис iLab по ремонту компьютеров находится в Риге — <strong>Domina Shopping</strong> и <strong>Spice Home</strong>.'
      ),
      faqItem(
        'Есть ли гарантия на ремонт компьютера?',
        'Да, мы предоставляем <strong>гарантию 90 дней</strong> на выполненные работы и установленные детали.'
      ),
    ]),
  },

  'dyson-remonts': {
    lv: makeFaq('Biežāk uzdotie jautājumi par Dyson remontu', [
      faqItem(
        'Kādus Dyson modeļus jūs remontējat?',
        'Remontējam dažādus Dyson putekļsūcēju modeļus, tostarp populārās V sērijas ierīces. Precīzas iespējas atkarīgas no modeļa un detaļu pieejamības. Plašāk skati <a href="/dyson-remonts">Dyson remonta lapā</a>.'
      ),
      faqItem(
        'Ko darīt, ja Dyson putekļsūcējs neieslēdzas?',
        'Ja Dyson neieslēdzas, problēma var būt akumulatorā, barošanas mezglā, motorā vai elektronikā. Servisā veicam diagnostiku un precīzi nosakām bojājuma cēloni.'
      ),
      faqItem(
        'Vai Dyson akumulatora maiņa palīdz, ja putekļsūcējs ātri izlādējas?',
        'Jā, daudzos gadījumos ātra izlādēšanās liecina par nolietotu akumulatoru. Pēc pārbaudes varam pateikt, vai nepieciešama akumulatora nomaiņa vai cita remonta darbība.'
      ),
      faqItem(
        'Vai Dyson tīrīšana var uzlabot sūkšanas jaudu?',
        'Jā, aizsērējumi, netīri filtri un putekļu uzkrāšanās bieži samazina sūkšanas jaudu. Tīrīšana un apkope daudzos gadījumos palīdz atjaunot normālu darbību.'
      ),
      faqItem(
        'Cik ilgi ilgst Dyson diagnostika un remonts?',
        'Termiņš atkarīgs no bojājuma, modeļa un detaļu pieejamības. Vienkāršākos gadījumos diagnostiku un remontu iespējams paveikt salīdzinoši ātri.'
      ),
      faqItem(
        'Vai Dyson remontam ir garantija?',
        'Jā, Dyson remontam nodrošinām <strong>90 dienu garantiju</strong> veiktajam darbam un izmantotajām detaļām.'
      ),
      faqItem(
        'Kur Rīgā atrodas jūsu Dyson remonta serviss?',
        'iLab Dyson remonta serviss atrodas Rīgā — <strong>Domina Shopping</strong> un <strong>Spice Home</strong>.'
      ),
      faqItem(
        'Vai ir vērts remontēt Dyson vai labāk pirkt jaunu?',
        'Daudzos gadījumos Dyson remonts ir izdevīgāks nekā jaunas ierīces iegāde, īpaši, ja bojājums saistīts ar akumulatoru, filtriem, kontaktiem vai mehāniskiem mezgliem.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о ремонте Dyson', [
      faqItem(
        'Какие модели Dyson вы ремонтируете?',
        'Мы ремонтируем разные модели пылесосов Dyson, включая популярные устройства серии V. Точные возможности зависят от модели и наличия деталей. Подробнее смотрите на странице <a href="/ru/remont-dyson">ремонта Dyson</a>.'
      ),
      faqItem(
        'Что делать, если пылесос Dyson не включается?',
        'Если Dyson не включается, проблема может быть в батарее, узле питания, моторе или электронике. В сервисе мы проводим диагностику и точно определяем причину неисправности.'
      ),
      faqItem(
        'Поможет ли замена аккумулятора Dyson, если пылесос быстро разряжается?',
        'Да, во многих случаях быстрая разрядка указывает на изношенный аккумулятор. После проверки мы скажем, нужна ли замена батареи или другая ремонтная работа.'
      ),
      faqItem(
        'Помогает ли чистка Dyson улучшить мощность всасывания?',
        'Да, засоры, грязные фильтры и накопившаяся пыль часто снижают мощность всасывания. Чистка и обслуживание во многих случаях помогают восстановить нормальную работу.'
      ),
      faqItem(
        'Сколько занимает диагностика и ремонт Dyson?',
        'Срок зависит от неисправности, модели и наличия деталей. В простых случаях диагностику и ремонт можно выполнить сравнительно быстро.'
      ),
      faqItem(
        'Есть ли гарантия на ремонт Dyson?',
        'Да, на ремонт Dyson мы предоставляем <strong>гарантию 90 дней</strong> на выполненные работы и установленные детали.'
      ),
      faqItem(
        'Где в Риге находится ваш сервис по ремонту Dyson?',
        'Сервис iLab по ремонту Dyson находится в Риге — <strong>Domina Shopping</strong> и <strong>Spice Home</strong>.'
      ),
      faqItem(
        'Стоит ли ремонтировать Dyson или лучше купить новый?',
        'Во многих случаях ремонт Dyson выгоднее покупки нового устройства, особенно если проблема связана с батареей, фильтрами, контактами или механическими узлами.'
      ),
    ]),
  },
};

const SERVICE_FAQ = {
  'ekrana-maina': {
    lv: makeFaq('Biežāk uzdotie jautājumi par ekrāna maiņu', [
      faqItem(
        'Vai iespējams nomainīt tikai stiklu?',
        'Tas atkarīgs no ierīces modeļa un bojājuma. Dažkārt iespējama tikai stikla maiņa, bet citos gadījumos jāmaina viss displeja modulis.'
      ),
      faqItem(
        'Cik ilgi ilgst ekrāna maiņa?',
        'Biežākajiem modeļiem <a href="/iphone-remonts/ekrana-maina">ekrāna maiņa</a> nereti tiek veikta tajā pašā dienā, ja detaļa ir pieejama.'
      ),
      faqItem(
        'Vai jaunais ekrāns būs kvalitatīvs?',
        'Pirms remonta paskaidrojam pieejamos detaļu variantus un atšķirības, lai vari izvēlēties piemērotāko risinājumu.'
      ),
      faqItem(
        'Vai pēc ekrāna maiņas dati saglabāsies?',
        'Tipiskos gadījumos ekrāna maiņa lietotāja datus neietekmē, tomēr drošībai vienmēr iesakām iepriekš izveidot rezerves kopiju.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о замене экрана', [
      faqItem(
        'Можно ли заменить только стекло?',
        'Это зависит от модели устройства и характера повреждения. Иногда возможна замена только стекла, а в других случаях требуется замена всего дисплейного модуля.'
      ),
      faqItem(
        'Сколько занимает замена экрана?',
        'Для популярных моделей <a href="/ru/remont-iphone/zamena-ekrana">замена экрана</a> часто выполняется в тот же день, если деталь есть в наличии.'
      ),
      faqItem(
        'Будет ли новый экран качественным?',
        'Перед ремонтом мы объясняем доступные варианты деталей и различия между ними, чтобы вы могли выбрать подходящее решение.'
      ),
      faqItem(
        'Сохранятся ли данные после замены экрана?',
        'В типовых случаях замена экрана не влияет на пользовательские данные, но для безопасности мы рекомендуем заранее сделать резервную копию.'
      ),
    ]),
  },

  'baterijas-maina': {
    lv: makeFaq('Biežāk uzdotie jautājumi par akumulatora maiņu', [
      faqItem(
        'Kā saprast, ka jāmaina akumulators?',
        'Parasti ierīce ātri izlādējas, izslēdzas pie atlikušās uzlādes, pārkarst vai darbojas tikai pie lādētāja. Šādos gadījumos bieži nepieciešama <a href="/iphone-remonts/baterijas-maina">akumulatora maiņa</a>.'
      ),
      faqItem(
        'Vai pēc akumulatora maiņas uzlabosies darbības laiks?',
        'Ja problēma tiešām ir nolietotā akumulatorā, pēc nomaiņas ierīces darbības laiks parasti ievērojami uzlabojas.'
      ),
      faqItem(
        'Cik ilgi ilgst akumulatora maiņa?',
        'Daudziem modeļiem akumulatora maiņu iespējams veikt tajā pašā dienā, ja detaļa ir pieejama.'
      ),
      faqItem(
        'Vai akumulatora maiņa ietekmē datus?',
        'Tipiskos gadījumos akumulatora maiņa datus neietekmē, taču drošībai vienmēr iesakām pirms remonta izveidot rezerves kopiju.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о замене батареи', [
      faqItem(
        'Как понять, что батарею нужно менять?',
        'Обычно устройство быстро разряжается, выключается при оставшемся заряде, перегревается или работает только от зарядки. В таких случаях часто нужна <a href="/ru/remont-iphone/zamena-batarei">замена батареи</a>.'
      ),
      faqItem(
        'Улучшится ли время работы после замены батареи?',
        'Если проблема действительно связана с изношенной батареей, после замены время работы устройства обычно заметно улучшается.'
      ),
      faqItem(
        'Сколько занимает замена батареи?',
        'Для многих моделей замену батареи можно выполнить в тот же день, если деталь есть в наличии.'
      ),
      faqItem(
        'Влияет ли замена батареи на данные?',
        'В типовых случаях замена батареи не затрагивает данные, но для безопасности мы рекомендуем заранее сделать резервную копию.'
      ),
    ]),
  },

  'uzlades-ligzdas-maina': {
    lv: makeFaq('Biežāk uzdotie jautājumi par uzlādes ligzdas maiņu', [
      faqItem(
        'Kā saprast, ka bojāta uzlādes ligzda?',
        'Ierīce lādējas tikai noteiktā pozīcijā, kabelis kustas vaļīgi vai uzlāde vispār nesākas. Šādos gadījumos bieži nepieciešama uzlādes ligzdas diagnostika vai maiņa.'
      ),
      faqItem(
        'Vai problēma vienmēr ir ligzdā?',
        'Nē, dažkārt problēma ir kabelī, adapterī, akumulatorā vai barošanas kontrolierī. Tāpēc sākumā vienmēr veicam diagnostiku.'
      ),
      faqItem(
        'Vai uzlādes ligzdas maiņa ir ātrs remonts?',
        'Daudzos gadījumos tas ir salīdzinoši ātrs remonts, taču termiņš atkarīgs no ierīces konstrukcijas un detaļu pieejamības.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о замене разъёма зарядки', [
      faqItem(
        'Как понять, что повреждён разъём зарядки?',
        'Устройство заряжается только в определённом положении, кабель сидит слишком свободно или зарядка вообще не начинается. В таких случаях часто нужна диагностика или замена разъёма.'
      ),
      faqItem(
        'Проблема всегда именно в разъёме?',
        'Нет, иногда причина в кабеле, адаптере, батарее или контроллере питания. Поэтому сначала мы проводим диагностику.'
      ),
      faqItem(
        'Замена разъёма зарядки — это быстрый ремонт?',
        'Во многих случаях это сравнительно быстрый ремонт, но срок зависит от конструкции устройства и доступности деталей.'
      ),
    ]),
  },

  'kameras-remonts': {
    lv: makeFaq('Biežāk uzdotie jautājumi par kameras remontu', [
      faqItem(
        'Kāpēc kamera nefokusē vai rāda melnu attēlu?',
        'To var izraisīt kameras moduļa bojājums, kritiens, šķidruma ietekme vai savienojuma problēmas iekšpusē.'
      ),
      faqItem(
        'Vai iespējams salabot priekšējo un aizmugurējo kameru?',
        'Jā, atkarībā no ierīces un bojājuma iespējams remontēt vai nomainīt gan priekšējo, gan aizmugurējo kameru.'
      ),
      faqItem(
        'Vai kameras problēmu vienmēr izraisa pati kamera?',
        'Ne vienmēr. Dažkārt iemesls var būt programmatūrā vai mātesplates bojājumā, tāpēc diagnostika ir svarīga.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о ремонте камеры', [
      faqItem(
        'Почему камера не фокусируется или показывает чёрное изображение?',
        'Причиной может быть повреждение модуля камеры, падение, попадание жидкости или проблемы с внутренними соединениями.'
      ),
      faqItem(
        'Можно ли отремонтировать фронтальную и основную камеру?',
        'Да, в зависимости от устройства и неисправности можно отремонтировать или заменить как фронтальную, так и основную камеру.'
      ),
      faqItem(
        'Всегда ли проблема именно в самой камере?',
        'Не всегда. Иногда причина связана с программным обеспечением или повреждением платы, поэтому диагностика очень важна.'
      ),
    ]),
  },

  'skalruni-mikrofona-remonts': {
    lv: makeFaq('Biežāk uzdotie jautājumi par skaļruņa un mikrofona remontu', [
      faqItem(
        'Kāpēc mani slikti dzird sarunas laikā?',
        'Iemesls var būt bojāts mikrofons, netīrumi, šķidruma bojājums vai citi iekšēji defekti.'
      ),
      faqItem(
        'Kāpēc skaņa ir klusa vai kropļota?',
        'To bieži izraisa skaļruņa bojājums, putekļi, mitrums vai savienojuma problēmas.'
      ),
      faqItem(
        'Vai šādu problēmu var novērst bez detaļas maiņas?',
        'Dažkārt pietiek ar tīrīšanu vai savienojumu atjaunošanu, bet citos gadījumos nepieciešama detaļas nomaiņa.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о ремонте динамика и микрофона', [
      faqItem(
        'Почему меня плохо слышно во время разговора?',
        'Причиной может быть неисправный микрофон, загрязнение, повреждение жидкостью или другие внутренние дефекты.'
      ),
      faqItem(
        'Почему звук тихий или искажённый?',
        'Часто это связано с повреждением динамика, пылью, влагой или проблемами с соединениями.'
      ),
      faqItem(
        'Можно ли решить такую проблему без замены детали?',
        'Иногда достаточно чистки или восстановления контактов, но в других случаях требуется замена детали.'
      ),
    ]),
  },

  'udens-bojajumu-remonts': {
    lv: makeFaq('Biežāk uzdotie jautājumi par šķidruma bojājumiem', [
      faqItem(
        'Ko darīt uzreiz pēc šķidruma iekļūšanas ierīcē?',
        'Nekavējoties izslēdz ierīci, neatstāj to lādēties un pēc iespējas ātrāk nogādā servisā diagnostikai.'
      ),
      faqItem(
        'Vai pēc ūdens bojājuma ierīci vienmēr var salabot?',
        'Ne vienmēr, bet jo ātrāk ierīce nonāk servisā, jo lielākas ir atjaunošanas iespējas.'
      ),
      faqItem(
        'Kāpēc nevajag mēģināt ierīci lādēt pēc šķidruma bojājuma?',
        'Tas var radīt papildu īssavienojumus un palielināt bojājumu apmēru.'
      ),
      faqItem(
        'Vai rīsi palīdz pēc ūdens bojājuma?',
        'Nē, rīsi nevar aizvietot profesionālu diagnostiku un tīrīšanu. Svarīgāk ir ierīci izslēgt un pēc iespējas ātrāk nogādāt servisā.'
      ),
    ]),
    ru: makeFaq('Часто задаваемые вопросы о повреждении жидкостью', [
      faqItem(
        'Что делать сразу после попадания жидкости в устройство?',
        'Немедленно выключите устройство, не ставьте его на зарядку и как можно скорее принесите в сервис на диагностику.'
      ),
      faqItem(
        'Всегда ли можно восстановить устройство после попадания воды?',
        'Не всегда, но чем быстрее устройство попадёт в сервис, тем выше шанс успешного восстановления.'
      ),
      faqItem(
        'Почему нельзя ставить устройство на зарядку после попадания жидкости?',
        'Это может вызвать дополнительные короткие замыкания и увеличить объём повреждений.'
      ),
      faqItem(
        'Помогает ли рис после попадания воды?',
        'Нет, рис не заменяет профессиональную диагностику и чистку. Главное — выключить устройство и как можно быстрее принести его в сервис.'
      ),
    ]),
  },
};

export function getBasicFaq(locale = 'lv') {
  return BASIC_FAQ[locale] || BASIC_FAQ.lv;
}

export function getCategoryFaq(categoryKey, locale = 'lv') {
  const group = CATEGORY_FAQ[categoryKey];
  if (!group) return getBasicFaq(locale);

  return group[locale] || group.lv;
}

export function getServiceFaq(serviceKey, locale = 'lv') {
  const group = SERVICE_FAQ[serviceKey];
  if (!group) return getBasicFaq(locale);

  return group[locale] || group.lv;
}