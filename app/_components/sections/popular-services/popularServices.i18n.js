import {
  LuBatteryCharging,
  LuCamera,
  LuCircuitBoard,
  LuDroplets,
  LuPlugZap,
  LuSmartphone,
  LuTabletSmartphone,
  LuVolume2,
} from 'react-icons/lu';

import { buildServiceHref } from '@/lib/routes/routeI18n';

const IPHONE_SERVICE_DEFINITIONS = [
  {
    serviceKey: 'ekrana-maina',
    Icon: LuSmartphone,
    copy: {
      lv: {
        title: 'Ekrāna maiņa',
        price: 'No 110 €',
        description:
          'Bojāta iPhone ekrāna maiņa ar attēla un skārienjutības pārbaudi pēc remonta.',
        note:
          'Dažiem modeļiem pēc displeja maiņas var parādīties Apple detaļas paziņojums - pirms remonta paskaidrojam, ko tas nozīmē.',
      },
      ru: {
        title: 'Замена экрана',
        price: 'От 110 €',
        description:
          'Замена повреждённого экрана iPhone с проверкой изображения и сенсора после ремонта.',
        note:
          'На некоторых моделях после замены дисплея может появиться уведомление Apple о детали - до ремонта объясним, что это означает.',
      },
    },
  },
  {
    serviceKey: 'baterijas-maina',
    Icon: LuBatteryCharging,
    copy: {
      lv: {
        title: 'Baterijas maiņa',
        price: 'No 60 €',
        description:
          'Nolietotas iPhone baterijas maiņa pēc baterijas un uzlādes darbības pārbaudes.',
      },
      ru: {
        title: 'Замена батареи',
        price: 'От 60 €',
        description:
          'Замена изношенной батареи iPhone после проверки работы аккумулятора и зарядки.',
      },
    },
  },
  {
    serviceKey: 'uzlades-ligzdas-maina',
    Icon: LuPlugZap,
    copy: {
      lv: {
        title: 'Uzlādes ligzdas remonts',
        price: 'No 15 €',
        description:
          'Uzlādes ligzdas pārbaude, tīrīšana vai maiņa, ja savienojums vairs nestrādā stabili.',
        note: 'Bieži vispirms pārbaudām, vai pietiek ar ligzdas tīrīšanu.',
      },
      ru: {
        title: 'Ремонт разъёма зарядки',
        price: 'От 15 €',
        description:
          'Проверка, чистка или замена разъёма зарядки, если соединение работает нестабильно.',
        note: 'Сначала часто проверяем, достаточно ли чистки разъёма.',
      },
    },
  },
  {
    serviceKey: 'kameras-remonts',
    Icon: LuCamera,
    copy: {
      lv: {
        title: 'Kameras remonts',
        price: 'No 29 €',
        description:
          'iPhone kameras moduļa vai stikla pārbaude un remonts, ja kamera nestrādā stabili.',
      },
      ru: {
        title: 'Ремонт камеры',
        price: 'От 29 €',
        description:
          'Проверка и ремонт модуля или стекла камеры iPhone, если камера работает нестабильно.',
      },
    },
  },
  {
    serviceKey: 'skalruni-mikrofona-remonts',
    Icon: LuVolume2,
    copy: {
      lv: {
        title: 'Skaļruņa un mikrofona remonts',
        price: 'Pēc modeļa',
        description:
          'Skaļruņa, mikrofona un sarunas kvalitātes pārbaude ar tīrīšanu vai detaļas maiņu.',
        note:
          'Klusa skaņa bieži sākas ar aizsērējušu sietiņu, tāpēc pirms detaļas maiņas pārbaudām tīrīšanas iespēju.',
      },
      ru: {
        title: 'Ремонт динамика и микрофона',
        price: 'По модели',
        description:
          'Проверка динамика, микрофона и качества разговора с чисткой или заменой детали.',
        note:
          'Тихий звук часто связан с загрязнённой сеткой, поэтому до замены детали проверяем возможность чистки.',
      },
    },
  },
  {
    serviceKey: 'udens-bojajumu-remonts',
    Icon: LuDroplets,
    copy: {
      lv: {
        title: 'Ūdens bojājumu diagnostika',
        price: 'No 35 €',
        description:
          'Diagnostika un tīrīšana pēc mitruma, lai novērtētu bojājumu un remonta iespējas.',
        note:
          'Pēc šķidruma bojājumiem precīzu termiņu var noteikt tikai pēc diagnostikas.',
      },
      ru: {
        title: 'Диагностика после попадания влаги',
        price: 'От 35 €',
        description:
          'Диагностика и чистка после попадания влаги, чтобы оценить повреждение и возможность ремонта.',
        note:
          'Точный срок после попадания жидкости можно определить только после диагностики.',
      },
    },
  },
  {
    serviceKey: 'iphone-plates-remonts',
    Icon: LuCircuitBoard,
    copy: {
      lv: {
        title: 'Mātesplates remonts',
        price: 'Pēc diagnostikas',
        description:
          'iPhone plates diagnostika un mikrolodēšana, ja ierīce neieslēdzas, nelādējas vai bojājums ir plates līmenī.',
      },
      ru: {
        title: 'Ремонт платы',
        price: 'После диагностики',
        description:
          'Диагностика и микропайка платы iPhone, если устройство не включается, не заряжается или неисправность на уровне платы.',
      },
    },
  },
  {
    serviceKey: 'aizmugures-vacina-maina',
    Icon: LuTabletSmartphone,
    copy: {
      lv: {
        title: 'Aizmugurējā stikla maiņa',
        price: 'Pēc modeļa',
        description:
          'Saplaisājuša vai bojāta aizmugurējā stikla maiņa atbilstoši iPhone modelim.',
      },
      ru: {
        title: 'Замена заднего стекла',
        price: 'По модели',
        description:
          'Замена треснувшего или повреждённого заднего стекла с учётом модели iPhone.',
      },
    },
  },
];

const SECTION_COPY = {
  lv: {
    titleStart: 'Populārākie iPhone ',
    titleAccent: 'remonti',
    intro:
      'Īsi par biežākajiem iPhone remonta darbiem. Precīzu cenu un pieejamos remonta variantus vari apskatīt, izvēloties savu iPhone modeli zemāk.',
    noteLabel: 'Meistara piezīme:',
    priceLine: 'Cena ir atkarīga no iPhone modeļa un detaļas veida.',
    priceLink: 'Izvēlies modeli precīzai cenai',
    serviceLink: 'Skatīt pakalpojumu',
  },
  ru: {
    titleStart: 'Популярный ремонт ',
    titleAccent: 'iPhone',
    intro:
      'Кратко о самых частых ремонтах iPhone. Точную стоимость и доступные варианты ремонта можно посмотреть, выбрав модель iPhone ниже.',
    noteLabel: 'Заметка мастера:',
    priceLine: 'Стоимость зависит от модели iPhone и типа детали.',
    priceLink: 'Выбрать модель и узнать цену',
    serviceLink: 'Подробнее',
  },
};

const MODEL_SECTION_COPY = {
  lv: {
    titleSuffix: 'remonta pakalpojumi',
    intro:
      'Izvēlies remonta veidu, lai uzzinātu vairāk par pakalpojumu, vai apskati cenu šim iPhone modelim zemāk esošajā cenrādī. Ja bojājums nav skaidrs, vispirms veicam diagnostiku.',
    serviceLink: 'Uzzināt par pakalpojumu',
    priceLink: 'Skatīt cenu',
    titles: [
      'Ekrāna maiņa',
      'Baterijas maiņa',
      'Uzlādes ligzdas remonts',
      'Kameras remonts',
      'Skaļruņa un mikrofona remonts',
      'Mitruma bojājumu diagnostika',
      'Aizmugures vāciņa maiņa',
      'Mātesplates remonts',
    ],
  },
  ru: {
    titleSuffix: '— услуги по ремонту',
    intro:
      'Выберите вид ремонта, чтобы узнать больше об услуге, или посмотрите цену для этой модели iPhone в прайс-листе ниже. Если причина неисправности неясна, сначала проводим диагностику.',
    serviceLink: 'Узнать об услуге',
    priceLink: 'Посмотреть цену',
    titles: [
      'Замена экрана',
      'Замена батареи',
      'Ремонт разъёма зарядки',
      'Ремонт камеры',
      'Ремонт динамика и микрофона',
      'Диагностика после попадания влаги',
      'Замена задней крышки',
      'Ремонт материнской платы',
    ],
  },
};

const MODEL_SERVICE_ORDER = [0, 1, 2, 3, 4, 5, 7, 6];

export function getIphonePopularServices(locale = 'lv') {
  const resolvedLocale = SECTION_COPY[locale] ? locale : 'lv';

  return {
    copy: SECTION_COPY[resolvedLocale],
    services: IPHONE_SERVICE_DEFINITIONS.map(({ serviceKey, Icon, copy }) => ({
      ...copy[resolvedLocale],
      serviceKey,
      Icon,
      href: buildServiceHref(resolvedLocale, 'iphone-remonts', serviceKey),
    })),
  };
}

export function getIphoneModelServices(modelName, locale = 'lv') {
  const resolvedLocale = MODEL_SECTION_COPY[locale] ? locale : 'lv';
  const copy = MODEL_SECTION_COPY[resolvedLocale];

  return {
    copy: {
      title: `${modelName} ${copy.titleSuffix}`,
      intro: copy.intro,
      serviceLink: copy.serviceLink,
      priceLink: copy.priceLink,
    },
    services: MODEL_SERVICE_ORDER.map((definitionIndex, index) => {
      const { serviceKey, Icon, copy: serviceCopy } =
        IPHONE_SERVICE_DEFINITIONS[definitionIndex];

      return {
        title: copy.titles[index],
        description: serviceCopy[resolvedLocale].description.replace(
          /iPhone/g,
          modelName
        ),
        Icon,
        href: buildServiceHref(resolvedLocale, 'iphone-remonts', serviceKey),
      };
    }),
  };
}
