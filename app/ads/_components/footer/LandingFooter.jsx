'use client';

import { useLandingCta } from '../ui/providers/LandingCtaProvider';

import s from './LandingFooter.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      tel: 'Тел.',
      regNo: 'Рег. №',
      copyright: 'Все права защищены.',
      disclaimer:
        'iLab — независимая ремонтная мастерская и не является авторизованным сервисным центром Apple. iPhone является товарным знаком Apple Inc.',
    };
  }

  return {
    tel: 'Tel.',
    regNo: 'Reģ. nr.',
    copyright: 'Visas tiesības aizsargātas.',
    disclaimer:
      'iLab ir neatkarīga remonta darbnīca un nav Apple autorizēts servisa centrs. iPhone ir Apple Inc. preču zīme.',
  };
}

function cleanUrl(url = '') {
  return String(url).replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function cleanTel(tel = '') {
  return String(tel).replace(/\s+/g, '');
}

function LocationBlock({ location, telLabel }) {
  if (!location) return null;

  const telHref = location.telLink || `tel:${cleanTel(location.tel)}`;

  return (
    <section className={s.location}>
      <h3>{location.label}</h3>

      {location.address && (
        <p>{location.address}</p>
      )}

      <p>
        {location.tel && (
          <>
            {telLabel}{' '}
            <a href={telHref}>
              {location.tel}
            </a>
          </>
        )}

        {location.tel && location.email && (
          <span className={s.dot}> · </span>
        )}

        {location.email && (
          <a href={`mailto:${location.email}`}>
            {location.email}
          </a>
        )}
      </p>
    </section>
  );
}

export default function LandingFooter({
  locale = 'lv',
}) {
  const { company, locations } = useLandingCta();

  const t = getContent(locale);
  const year = new Date().getFullYear();

  const companyName = company?.name || 'iLab';
  const legalName = company?.legalName || 'SIA “iLab”';
  const regNo = company?.regNo || '40203288307';
  const urlLabel = cleanUrl(company?.url || 'https://ilab.lv');

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.top}>
          <section className={s.brand} aria-label={companyName}>
            {company?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.logo}
                alt={companyName}
                className={s.logo}
                loading="lazy"
              />
            ) : (
              <div className={s.logoFallback}>
                {companyName}
              </div>
            )}

            <p>
              {legalName}
              {regNo ? ` · ${t.regNo} ${regNo}` : ''}
            </p>
          </section>

          <div className={s.locations}>
            {locations.slice(0, 2).map((location) => (
              <LocationBlock
                key={location.id || location.label}
                location={location}
                telLabel={t.tel}
              />
            ))}
          </div>
        </div>

        <div className={s.bottom}>
          <p className={s.copy}>
            © {year} {urlLabel} - {t.copyright}
          </p>

          <p className={s.disclaimer}>
            {t.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}