import { ROUTE_TRANSLATIONS } from '@/lib/routes/routeTranslations';

function localizedHref(group, key, locale = 'lv') {
  const slug =
    ROUTE_TRANSLATIONS[group]?.[key]?.[locale] ||
    ROUTE_TRANSLATIONS[group]?.[key]?.lv ||
    key;

  return locale === 'ru' ? `/ru/${slug}` : `/${slug}`;
}

export function getFooterContent(locale = 'lv') {
  const isRu = locale === 'ru';

  return {
    footerLabel: isRu ? 'Подвал сайта' : 'Lapas kājene',
    locationsLabel: isRu ? 'Сервисные центры' : 'Atrašanās vietas',
    locationPrefix: isRu ? 'Сервисный центр' : 'Atrašanās vieta',
    callLabel: isRu ? 'Позвонить' : 'Zvanīt',
    telLabel: isRu ? 'Тел.' : 'Tel.',
    legalLine: 'SIA “iLab” · Reģ. nr. 40203288307',
    copyright: isRu
      ? 'Все права защищены.'
      : 'Visas tiesības aizsargātas.',

    services: {
      label: isRu ? 'Услуги' : 'Pakalpojumi',
      items: [
        {
          label: isRu ? 'Ремонт iPhone' : 'iPhone remonts',
          href: localizedHref('categories', 'iphone-remonts', locale),
        },
        {
          label: isRu ? 'Ремонт телефонов' : 'Telefonu remonts',
          href: localizedHref('categories', 'telefonu-remonts', locale),
        },
        {
          label: isRu ? 'Ремонт планшетов' : 'Planšetdatoru remonts',
          href: localizedHref('categories', 'plansetdatoru-remonts', locale),
        },
        {
          label: isRu ? 'Ремонт ноутбуков' : 'Datoru remonts',
          href: localizedHref('categories', 'datoru-remonts', locale),
        },
        {
          label: isRu ? 'Ремонт Dyson' : 'Dyson remonts',
          href: localizedHref('categories', 'dyson-remonts', locale),
        },
      ],
    },

    useful: {
      label: isRu ? 'Полезные ссылки' : 'Noderīgas saites',
      items: [
        {
          label: isRu ? 'О нас' : 'Par mums',
          href: localizedHref('info', 'par-mums', locale),
        },
        {
          label: isRu ? 'Контакты' : 'Kontakti',
          href: localizedHref('info', 'kontakti', locale),
        },
        {
          label: isRu ? 'FAQ' : 'BUJ',
          href: localizedHref('info', 'buj', locale),
        },
        {
          label: isRu
            ? 'Политика конфиденциальности и cookies'
            : 'Privātuma un sīkdatņu politika',
          href: localizedHref('info', 'noteikumi', locale),
        },
      ],
    },
  };
}