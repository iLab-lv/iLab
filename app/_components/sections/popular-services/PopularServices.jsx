import Link from 'next/link';

import {
  getIphoneModelServices,
  getIphonePopularServices,
} from './popularServices.i18n';
import {
  LuCamera,
  LuFocus,
  LuMonitor,
  LuPlug,
  LuShieldAlert,
  LuWaves,
} from 'react-icons/lu';

import s from './PopularServices.module.scss';

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

  return (
    <section
      id={isPhoto ? 'photo-services' : 'iphone-services'}
      className={s.section}
      aria-labelledby={isPhoto ? 'photo-services-title' : 'iphone-services-title'}
    >
      <div className={s.container}>
        <div className={s.header}>
          <h2 id={isPhoto ? 'photo-services-title' : 'iphone-services-title'}>
            {isPhoto ? <>{copy.titleStart}<span>{copy.titleAccent}</span></> : isModelPage ? copy.title : isOtherServices ? (
              locale === 'ru' ? <>Другие виды <span>ремонта iPhone</span></> : <>Citi iPhone <span>remonta veidi</span></>
            ) : <>{copy.titleStart}<span>{copy.titleAccent}</span></>}
          </h2>
          <p>{isOtherServices
            ? otherServicesIntro
            : copy.intro}</p>
        </div>

        <div className={s.grid}>
          {visibleServices.map((service, index) => {
            const PhotoIcon = [LuCamera, LuFocus, LuMonitor, LuPlug, LuShieldAlert, LuWaves][index];
            const Icon = service.Icon || PhotoIcon;

            return (
              <article
                className={`${s.card} ${isModelPage ? s.modelCard : ''}`}
                key={service.href || service.title}
              >
                <div className={s.iconWrap} aria-hidden="true">
                  <Icon />
                </div>

                <div className={s.copy}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  {(isPhoto || (!isModelPage && !isOtherServices)) && service.note && (
                    <p className={s.masterNote}>
                      <span>{copy.noteLabel}</span> {service.note}
                    </p>
                  )}

                  {isPhoto ? (
                    <div className={s.priceBlock}>
                      <span className={s.priceValue}>{service.price}</span>
                    </div>
                  ) : !isModelPage && !isOtherServices && (
                    <div className={s.priceBlock}>
                      <span className={s.priceValue}>{service.price}</span>
                      <p className={s.priceLine}>{copy.priceLine}</p>
                      <a className={s.priceLink} href="#iphone-modeli">
                        {copy.priceLink}
                      </a>
                    </div>
                  )}

                  {!isPhoto && <div
                    className={`${s.actions} ${isModelPage ? s.modelActions : ''}`}
                  >
                    <Link className={s.serviceLink} href={service.href}>
                      {copy.serviceLink}
                    </Link>
                    {isModelPage && (
                      <a className={s.priceAction} href={`#${priceTargetId}`}>
                        {copy.priceLink}
                      </a>
                    )}
                  </div>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
