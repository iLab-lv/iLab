const SERVICES_CONTENT = {
  lv: {
    title: 'Mūsu pakalpojumi',

    apple: {
      title: 'Apple ierīču remonts',
      introHTML:
        'Apple serviss Rīgā - <a href="/iphone-remonts">iPhone remonts</a>, <a href="/plansetdatoru-remonts/ipad">iPad remonts</a> un <a href="/datoru-remonts/macbook">MacBook remonts</a>. Veicam ekrāna un baterijas maiņu, uzlādes porta remontu un diagnostiku tajā pašā dienā (atkarībā no modeļa). Izmantojam kvalitatīvas detaļas un nodrošinām <strong>90&nbsp;dienu garantiju</strong>. Populārākie pakalpojumi: ekrāna maiņa, baterijas maiņa un uzlādes porta remonts.',
      mobileLinksLabel: 'Apple mobilo ierīču saīsnes',
      computerLinksLabel: 'Apple datoru saīsnes',
      links: [
        {
          label: 'iPhone remonts',
          href: '/iphone-remonts#iphone-modeli',
          device: 'phone',
          group: 'mobile',
        },
        {
          label: 'iPad remonts',
          href: '/plansetdatoru-remonts/ipad#brand-modeli',
          device: 'tablet',
          group: 'mobile',
        },
        {
          label: 'MacBook remonts',
          href: '/datoru-remonts/macbook#brand-modeli',
          device: 'laptop',
          group: 'computer',
        },
        {
          label: 'iMac remonts',
          href: '/datoru-remonts/imac',
          device: 'imac',
          group: 'computer',
        },
        {
          label: 'Mac Pro remonts',
          href: '/datoru-remonts/mac-pro',
          device: 'station',
          group: 'computer',
        },
      ],
      imageSrc: '/images/home/apple.webp',
    },

    android: {
      title: 'Android - Telefonu un planšetdatoru remonts',
      introHTML:
        'Servisējam <strong>Samsung</strong>, <strong>Xiaomi</strong> un <strong>Huawei</strong> ierīces Rīgā. Veicam ekrāna maiņu, baterijas maiņu un uzlādes porta remontu tajā pašā dienā (atkarībā no modeļa), ar <strong>90&nbsp;dienu garantiju</strong>. Skati arī lapas <a href="/telefonu-remonts">telefonu remonts</a> un <a href="/plansetdatoru-remonts">planšetdatoru remonts</a>.',
      brandsLabel: 'Android zīmoli',
      allBrandsLabel: 'Skatīt visus zīmolus →',
      allBrandsHref: '/telefonu-remonts',
      imageSrc: '/images/home/android.webp',
      seoBlurbs: {
        samsung:
          'Servisējam Galaxy un citus Samsung - ekrāna (displeja) nomaiņa, uzlādes ligzdas remonts u. c. Ātra diagnostika un 90 dienu garantija.',
        xiaomi:
          'Xiaomi, Redmi un POCO remonts - displeja remonts, baterijas/akumulatora maiņa u. c. Darbi tajā pašā dienā (atkarībā no modeļa).',
        huawei:
          'Huawei P un Mate sērijai - ekrāna maiņa, uzlādes porta salabošana u. c. Kvalitatīvas detaļas un 90 dienu garantija.',
        default:
          'Android ierīču remonts - ekrāna/displeja un baterijas maiņa, uzlādes ligzdas remonts u. c. Ātra diagnostika un 90 dienu garantija.',
      },
      brands: [
        {
          name: 'Samsung',
          hrefTitle: '/telefonu-remonts/samsung',
          phoneHref: '/telefonu-remonts/samsung',
          phoneLabel: 'Samsung telefonu remonts',
          tabletHref: '/plansetdatoru-remonts#samsung',
          tabletLabel: 'Samsung planšetdatoru remonts',
        },
        {
          name: 'Xiaomi',
          hrefTitle: '/telefonu-remonts/xiaomi',
          phoneHref: '/telefonu-remonts/xiaomi',
          phoneLabel: 'Xiaomi telefonu remonts',
          tabletHref: '/plansetdatoru-remonts#xiaomi',
          tabletLabel: 'Xiaomi planšetdatoru remonts',
        },
        {
          name: 'Huawei',
          hrefTitle: '/telefonu-remonts/huawei',
          phoneHref: '/telefonu-remonts/huawei',
          phoneLabel: 'Huawei telefonu remonts',
          tabletHref: '/plansetdatoru-remonts#huawei',
          tabletLabel: 'Huawei planšetdatoru remonts',
        },
      ],
    },

    twoUp: [
      {
        key: 'pc',
        title: 'Datoru remonts',
        bodyHTML:
          '<a href="/datoru-remonts">Datoru remonts Rīgā</a> - portatīvie un galda datori. Veicam klaviatūras un ekrāna maiņu, baterijas nomaiņu, dzesēšanas sistēmas tīrīšanu/termopastu, SSD uzstādīšanu un OS pārinstalāciju. Apkalpojam arī <a href="/datoru-remonts/macbook">MacBook</a>, <a href="/datoru-remonts/imac">iMac</a> un <a href="/datoru-remonts/mac-pro">Mac Pro</a>. Tajā pašā dienā (atkarībā no modeļa) un ar 90&nbsp;dienu garantiju.',
        href: '/datoru-remonts',
        linkLabel: 'Apskatīt →',
        imageSrc: '/images/home/laptop.webp',
      },
      {
        key: 'dyson',
        title: 'Dyson remonts',
        bodyHTML:
          '<a href="/dyson-remonts">Dyson remonts Rīgā</a> - diagnostika, filtru un akumulatoru maiņa, motora un elektronikas remonts, uzlādes un sūkšanas defektu novēršana, pilna tīrīšana pēc garantijas beigām. Izmantojam kvalitatīvas detaļas un nodrošinām 90&nbsp;dienu garantiju.',
        href: '/dyson-remonts',
        linkLabel: 'Apskatīt →',
        imageSrc: '/images/home/dyson.webp',
      },
    ],
  },

  ru: {
    title: 'Наши услуги',

    apple: {
      title: 'Ремонт устройств Apple',
      introHTML:
        'Сервис Apple в Риге - <a href="/iphone-remonts">ремонт iPhone</a>, <a href="/plansetdatoru-remonts/ipad">ремонт iPad</a> и <a href="/datoru-remonts/macbook">ремонт MacBook</a>. Выполняем замену экрана и аккумулятора, ремонт разъёма зарядки и диагностику в тот же день (в зависимости от модели). Используем качественные детали и предоставляем <strong>гарантию 90&nbsp;дней</strong>. Самые популярные услуги: замена экрана, замена аккумулятора и ремонт разъёма зарядки.',
      mobileLinksLabel: 'Быстрые ссылки Apple мобильные устройства',
      computerLinksLabel: 'Быстрые ссылки Apple компьютеры',
      links: [
        {
          label: 'Ремонт iPhone',
          href: '/iphone-remonts#iphone-modeli',
          device: 'phone',
          group: 'mobile',
        },
        {
          label: 'Ремонт iPad',
          href: '/plansetdatoru-remonts/ipad#brand-modeli',
          device: 'tablet',
          group: 'mobile',
        },
        {
          label: 'Ремонт MacBook',
          href: '/datoru-remonts/macbook#brand-modeli',
          device: 'laptop',
          group: 'computer',
        },
        {
          label: 'Ремонт iMac',
          href: '/datoru-remonts/imac',
          device: 'imac',
          group: 'computer',
        },
        {
          label: 'Ремонт Mac Pro',
          href: '/datoru-remonts/mac-pro',
          device: 'station',
          group: 'computer',
        },
      ],
      imageSrc: '/images/home/apple.webp',
    },

    android: {
      title: 'Android - ремонт телефонов и планшетов',
      introHTML:
        'Обслуживаем устройства <strong>Samsung</strong>, <strong>Xiaomi</strong> и <strong>Huawei</strong> в Риге. Выполняем замену экрана, замену аккумулятора и ремонт разъёма зарядки в тот же день (в зависимости от модели), с <strong>гарантией 90&nbsp;дней</strong>. Также смотрите страницы <a href="/telefonu-remonts">ремонт телефонов</a> и <a href="/plansetdatoru-remonts">ремонт планшетов</a>.',
      brandsLabel: 'Бренды Android',
      allBrandsLabel: 'Смотреть все бренды →',
      allBrandsHref: '/telefonu-remonts',
      imageSrc: '/images/home/android.webp',
      seoBlurbs: {
        samsung:
          'Обслуживаем Galaxy и другие Samsung - замена экрана (дисплея), ремонт разъёма зарядки и другие работы. Быстрая диагностика и гарантия 90 дней.',
        xiaomi:
          'Ремонт Xiaomi, Redmi и POCO - ремонт дисплея, замена батареи/аккумулятора и другие работы. В тот же день, если позволяет модель.',
        huawei:
          'Для серий Huawei P и Mate - замена экрана, ремонт разъёма зарядки и другие работы. Качественные детали и гарантия 90 дней.',
        default:
          'Ремонт Android-устройств - замена экрана/дисплея и аккумулятора, ремонт разъёма зарядки и другие работы. Быстрая диагностика и гарантия 90 дней.',
      },
      brands: [
        {
          name: 'Samsung',
          hrefTitle: '/telefonu-remonts/samsung',
          phoneHref: '/telefonu-remonts/samsung',
          phoneLabel: 'Ремонт телефонов Samsung',
          tabletHref: '/plansetdatoru-remonts#samsung',
          tabletLabel: 'Ремонт планшетов Samsung',
        },
        {
          name: 'Xiaomi',
          hrefTitle: '/telefonu-remonts/xiaomi',
          phoneHref: '/telefonu-remonts/xiaomi',
          phoneLabel: 'Ремонт телефонов Xiaomi',
          tabletHref: '/plansetdatoru-remonts#xiaomi',
          tabletLabel: 'Ремонт планшетов Xiaomi',
        },
        {
          name: 'Huawei',
          hrefTitle: '/telefonu-remonts/huawei',
          phoneHref: '/telefonu-remonts/huawei',
          phoneLabel: 'Ремонт телефонов Huawei',
          tabletHref: '/plansetdatoru-remonts#huawei',
          tabletLabel: 'Ремонт планшетов Huawei',
        },
      ],
    },

    twoUp: [
      {
        key: 'pc',
        title: 'Ремонт компьютеров',
        bodyHTML:
          '<a href="/datoru-remonts">Ремонт компьютеров в Риге</a> - ноутбуки и настольные компьютеры. Выполняем замену клавиатуры и экрана, замену аккумулятора, чистку системы охлаждения/замену термопасты, установку SSD и переустановку ОС. Также обслуживаем <a href="/datoru-remonts/macbook">MacBook</a>, <a href="/datoru-remonts/imac">iMac</a> и <a href="/datoru-remonts/mac-pro">Mac Pro</a>. В тот же день (в зависимости от модели) и с гарантией 90&nbsp;дней.',
        href: '/datoru-remonts',
        linkLabel: 'Смотреть →',
        imageSrc: '/images/home/laptop.webp',
      },
      {
        key: 'dyson',
        title: 'Ремонт Dyson',
        bodyHTML:
          '<a href="/dyson-remonts">Ремонт Dyson в Риге</a> - диагностика, замена фильтров и аккумуляторов, ремонт мотора и электроники, устранение проблем с зарядкой и всасыванием, полная чистка после окончания гарантии. Используем качественные детали и предоставляем гарантию 90&nbsp;дней.',
        href: '/dyson-remonts',
        linkLabel: 'Смотреть →',
        imageSrc: '/images/home/dyson.webp',
      },
    ],
  },
};

export function getServicesContent(locale = 'lv') {
  return SERVICES_CONTENT[locale] || SERVICES_CONTENT.lv;
}