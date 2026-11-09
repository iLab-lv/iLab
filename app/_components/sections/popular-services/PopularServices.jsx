import { getIphoneModelServices, getIphonePopularServices } from './popularServices.i18n';
import PopularRepairs from '../popular-repairs/PopularRepairs';
import HubPopularServices from '../catalog-hub/HubPopularServices';

export default function PopularServices({
  locale = 'lv',
  variant = 'hub',
  modelName = 'iPhone',
  priceTargetId = 'cenas',
  excludeServiceKey = 'ekrana-maina',
  content,
}) {
  const isPhoto = variant === 'photo';
  const isModelPage = variant === 'model';
  const isOtherServices = variant === 'other-services';
  const resolved = isPhoto ? content : isModelPage
    ? getIphoneModelServices(modelName, locale)
    : getIphonePopularServices(locale);
  const { copy, services } = resolved;
  const visibleServices = isOtherServices
    ? services.filter((service) => service.serviceKey !== excludeServiceKey)
    : services;
  const otherServicesIntro = excludeServiceKey === 'baterijas-maina'
    ? locale === 'ru'
      ? 'Если iPhone быстро разряжается, не заряжается или работает нестабильно, посмотрите и другие услуги — ремонт разъёма зарядки, диагностику после влаги, замену экрана и другие работы.'
      : 'Ja iPhone ātri izlādējas, nelādējas vai darbojas nestabili, apskati arī citus pakalpojumus — uzlādes ligzdas remontu, mitruma bojājumu diagnostiku, ekrāna maiņu un citus darbus.'
    : locale === 'ru'
      ? 'Если проблема связана не только с экраном, посмотрите другие услуги ремонта iPhone — от замены батареи до ремонта камеры, разъёма зарядки и материнской платы.'
      : 'Ja problēma nav saistīta tikai ar ekrānu, apskati citus iPhone remonta pakalpojumus — no baterijas maiņas līdz kameras, uzlādes ligzdas un mātesplates remontam.';

  if (!isPhoto && !isModelPage && !isOtherServices) return <HubPopularServices locale={locale} />;
  return <PopularRepairs id={isPhoto ? 'photo-services' : 'iphone-services'}
    locale={locale} variant={isPhoto ? 'informational' : 'compact'}
    title={isPhoto ? copy.titleStart + copy.titleAccent : isModelPage ? copy.title : locale === 'ru' ? 'Другие виды ремонта iPhone' : 'Citi iPhone remonta veidi'}
    intro={isOtherServices ? otherServicesIntro : copy.intro}
    items={visibleServices.map(service => ({
      ...service,
      note: isPhoto ? service.note : undefined, noteLabel: copy.noteLabel,
      price: isPhoto ? { kind: 'diagnostic', label: service.price } : undefined,
      actions: isPhoto ? [] : [{ kind: 'service', href: service.href, label: copy.serviceLink },
        ...(isModelPage ? [{ kind: 'prices', href: '#' + priceTargetId, label: copy.priceLink }] : [])],
    }))} />;
}
