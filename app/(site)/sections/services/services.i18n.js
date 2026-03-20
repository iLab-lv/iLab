import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
  LuBug,
  LuKeyboard,
  LuMonitor,
  LuCpu,
  LuHardDrive,
} from 'react-icons/lu';

import { buildServiceHref } from '@/lib/routes/routeI18n';

const IPHONE_POPULAR_SERVICES = [
  {
    serviceKey: 'ekrana-maina',
    icon: LuSmartphone,
    title: {
      lv: 'Ekrāna maiņa',
      ru: 'Замена экрана',
    },
    text: {
      lv: 'plaisas, līnijas, tumši plankumi, nereaģē skārienjūtīgais ekrāns.',
      ru: 'трещины, полосы, тёмные пятна, экран не реагирует на касание.',
    },
  },
  {
    serviceKey: 'baterijas-maina',
    icon: LuBatteryCharging,
    title: {
      lv: 'Baterijas maiņa',
      ru: 'Замена батареи',
    },
    text: {
      lv: 'strauji krīt uzlādes līmenis, telefons izslēdzas pie 10–20%.',
      ru: 'заряд быстро падает, телефон выключается при 10–20%.',
    },
  },
  {
    serviceKey: 'uzlades-ligzdas-maina',
    icon: LuPlugZap,
    title: {
      lv: 'Uzlādes ligzdas maiņa',
      ru: 'Замена разъёма зарядки',
    },
    text: {
      lv: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
      ru: 'кабель держится плохо, зарядка медленная или нестабильная.',
    },
  },
  {
    serviceKey: 'kameras-remonts',
    icon: LuCamera,
    title: {
      lv: 'Kameras remonts',
      ru: 'Ремонт камеры',
    },
    text: {
      lv: 'miglaini attēli, melni plankumi, fokusēšanās problēmas.',
      ru: 'мутные фото, чёрные пятна, проблемы с фокусировкой.',
    },
  },
  {
    serviceKey: 'skalruni-mikrofona-remonts',
    icon: LuVolume2,
    title: {
      lv: 'Skaļruņu un mikrofona remonts',
      ru: 'Ремонт динамика и микрофона',
    },
    text: {
      lv: 'klusa skaņa, krakšķi, sarunas laikā nedzird vai neviens nedzird jūs.',
      ru: 'тихий звук, хрипы, во время разговора вас не слышно или вы не слышите собеседника.',
    },
  },
  {
    serviceKey: 'udens-bojajumu-remonts',
    icon: LuDroplets,
    title: {
      lv: 'Ūdens bojājumu remonts',
      ru: 'Ремонт после попадания влаги',
    },
    text: {
      lv: 'diagnostika un atjaunošana pēc šķidruma iekļūšanas, ja tas iespējams.',
      ru: 'диагностика и восстановление после попадания жидкости, если это возможно.',
    },
  },
];

const COMPUTER_POPULAR_SERVICES = [
  {
    icon: LuMonitor,
    title: {
      lv: 'Ekrāna maiņa',
      ru: 'Замена экрана',
    },
    text: {
      lv: 'plaisas, mirušās zonas, tumši plankumi.',
      ru: 'трещины, битые зоны, тёмные пятна.',
    },
  },
  {
    icon: LuKeyboard,
    title: {
      lv: 'Tastatūras maiņa',
      ru: 'Замена клавиатуры',
    },
    text: {
      lv: 'nereaģē taustiņi, izlijis šķidrums, ielipuši taustiņi.',
      ru: 'клавиши не реагируют, была залита жидкость, кнопки залипают.',
    },
  },
  {
    icon: LuCpu,
    title: {
      lv: 'Dzesēšanas sistēma',
      ru: 'Система охлаждения',
    },
    text: {
      lv: 'troksnis, pārkaršana, termopastas maiņa, putekļu tīrīšana.',
      ru: 'шум, перегрев, замена термопасты, чистка от пыли.',
    },
  },
  {
    icon: LuHardDrive,
    title: {
      lv: 'Cietais disks / SSD',
      ru: 'Жёсткий диск / SSD',
    },
    text: {
      lv: 'lēns darbs, neielādējas sistēma, datu pārvietošana.',
      ru: 'медленная работа, система не загружается, перенос данных.',
    },
  },
  {
    icon: LuBug,
    title: {
      lv: 'Programmatūra un vīrusi',
      ru: 'Программное обеспечение и вирусы',
    },
    text: {
      lv: 'OS pārinstalēšana, vīrusu tīrīšana, draiveru problēmas.',
      ru: 'переустановка ОС, удаление вирусов, проблемы с драйверами.',
    },
  },
  {
    icon: LuPlugZap,
    title: {
      lv: 'Uzlāde un strāvas pieslēgums',
      ru: 'Зарядка и питание',
    },
    text: {
      lv: 'lādētāja pieslēgums, barošanas ligzda, strāvas problēmas.',
      ru: 'разъём питания, гнездо зарядки, проблемы с подачей питания.',
    },
  },
];

function pickLocalized(field, locale = 'lv') {
  if (!field) return '';
  return field[locale] || field.lv || '';
}

export function getIphonePopularServicesTitle(deviceName, locale = 'lv') {
  if (locale === 'ru') {
    return `Популярный ремонт ${deviceName}`;
  }

  return `Populārākie ${deviceName} remonti`;
}

export function buildIphonePopularServices(locale = 'lv') {
  return IPHONE_POPULAR_SERVICES.map((item) => ({
    title: pickLocalized(item.title, locale),
    text: pickLocalized(item.text, locale),
    href: buildServiceHref(locale, 'iphone-remonts', item.serviceKey),
    icon: item.icon,
  }));
}

export function getComputerPopularServicesTitle(locale = 'lv') {
  if (locale === 'ru') {
    return 'Популярный ремонт компьютеров';
  }

  return 'Populārākie datoru remonti';
}

export function buildComputerPopularServices(locale = 'lv') {
  return COMPUTER_POPULAR_SERVICES.map((item) => ({
    title: pickLocalized(item.title, locale),
    text: pickLocalized(item.text, locale),
    icon: item.icon,
  }));
}