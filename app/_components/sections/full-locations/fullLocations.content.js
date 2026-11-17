import { getLocationsContent } from '@/app/(site)/sections/locations/locations.i18n';

const locationPhotos = {
  domina: {
    name: 'ilab-domina-shopping-remonta-serviss-riga', width: 1280, height: 960, position: '35% 50%',
    lv: 'iLab telefonu un datoru remonta servisa pieņemšanas lete t/c Domina Shopping, Rīgā',
    ru: 'Стойка приёма сервиса по ремонту телефонов и компьютеров iLab в Domina Shopping, Рига',
  },
  spice: {
    name: 'ilab-spice-home-remonta-serviss-riga', width: 1159, height: 1358, position: '50% 5%',
    lv: 'iLab remonta servisa pieņemšanas zona t/c Spice Home, Rīgā',
    ru: 'Зона приёма ремонтного сервиса iLab в Spice Home, Рига',
  },
};

export function getLocationPhoto(id, locale = 'lv') {
  const photo = locationPhotos[id];
  if (!photo) return null;
  return {
    src: `/images/locations/${photo.name}.webp`,
    small: `/images/locations/${photo.name}-640.webp`,
    width: photo.width, height: photo.height, position: photo.position,
    alt: photo[locale] || photo.lv,
  };
}

export function getFullLocationsContent(locale = 'lv') {
  return {
    ...getLocationsContent(locale),
    ...(locale === 'ru' ? {
      select: 'Выбрать сервисный центр',
      navigation: 'Как добраться',
      parking: 'Бесплатная парковка · Удобный доступ в торговом центре',
      mapAlt: 'Карта Риги с филиалами iLab',
    } : {
      select: 'Izvēlēties servisa centru',
      navigation: 'Maršruts uz servisu',
      parking: 'Bezmaksas stāvvieta · Ērta piekļuve tirdzniecības centrā',
      mapAlt: 'Rīgas karte ar iLab filiālēm',
    }),
  };
}
