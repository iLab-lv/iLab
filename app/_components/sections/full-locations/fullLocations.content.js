import { getLocationsContent } from '@/app/(site)/sections/locations/locations.i18n';
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
