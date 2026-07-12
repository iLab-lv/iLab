import Link from 'next/link';

import { getIphonePopularServices } from './popularServices.i18n';

import s from './PopularServices.module.scss';

export default function PopularServices({ locale = 'lv' }) {
  const { copy, services } = getIphonePopularServices(locale);

  return (
    <section
      id="iphone-services"
      className={s.section}
      aria-labelledby="iphone-services-title"
    >
      <div className={s.container}>
        <div className={s.header}>
          <h2 id="iphone-services-title">
            {copy.titleStart}<span>{copy.titleAccent}</span>
          </h2>
          <p>{copy.intro}</p>
        </div>

        <div className={s.grid}>
          {services.map((service) => {
            const { Icon } = service;

            return (
              <article className={s.card} key={service.href}>
                <div className={s.iconWrap} aria-hidden="true">
                  <Icon />
                </div>

                <div className={s.copy}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  {service.note && (
                    <p className={s.masterNote}>
                      <span>{copy.noteLabel}</span> {service.note}
                    </p>
                  )}

                  <div className={s.priceBlock}>
                    <span className={s.priceValue}>{service.price}</span>
                    <p className={s.priceLine}>{copy.priceLine}</p>
                    <a className={s.priceLink} href="#iphone-modeli">
                      {copy.priceLink}
                    </a>
                  </div>

                  <div className={s.actions}>
                    <Link className={s.serviceLink} href={service.href}>
                      {copy.serviceLink}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
