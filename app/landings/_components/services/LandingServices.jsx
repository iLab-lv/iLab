'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { FaBolt, FaCircleCheck } from 'react-icons/fa6';

import s from './LandingServices.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getServices(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Популярные ремонты iPhone',
      subtitle:
        'Большинство частых ремонтов iPhone выполняем в тот же день. Выберите проблему и посмотрите ориентировочные цены.',
      timeLabel: 'Время ремонта',
      ctaPrice: 'Узнать цену',
      ctaBook: 'Записаться',
      services: [
        {
          id: 'screen',
          title: 'Замена экрана',
          cardTitle: 'Разбился экран iPhone?',
          short: 'Разбито стекло или не работает тачскрин',
          time: '20–60 мин',
          visual: '/images/categories/displeja_maina.webp',
          text:
            'Чёрный дисплей, трещины или не работает сенсор? Большинство замен экрана iPhone выполняем в тот же день.',
          bullets: [
            'Face ID сохраняется',
            'True Tone при возможности',
            'Гарантия 90 дней',
          ],
          prices: [
            'iPhone 13 — от 89€',
            'iPhone 14 Pro — от 149€',
            'iPhone 15 Pro — от 189€',
          ],
        },
        {
          id: 'battery',
          title: 'Замена аккумулятора',
          cardTitle: 'Батарея быстро садится?',
          short: 'Быстро садится или выключается',
          time: '20–40 мин',
          visual: '/images/categories/baterijas_maina.webp',
          text:
            'iPhone быстро разряжается, греется или выключается при низком проценте? Заменим аккумулятор и проверим работу устройства после ремонта.',
          bullets: [
            'Проверка состояния батареи',
            'Ремонт за 20–40 минут',
            'Гарантия 90 дней',
          ],
          prices: [
            'iPhone 11 — от 39€',
            'iPhone 13 — от 49€',
            'iPhone 14 Pro — от 69€',
          ],
        },
        {
          id: 'backGlass',
          title: 'Замена заднего стекла',
          cardTitle: 'Разбито заднее стекло?',
          short: 'Разбито стекло корпуса или острые края',
          time: '1–3 ч',
          visual: '/images/categories/displeja_maina.webp',
          text:
            'Аккуратно заменим стекло корпуса и вернём iPhone опрятный внешний вид без лишней замены деталей.',
          bullets: [
            'Точное снятие стекла',
            'Восстановление внешнего вида корпуса',
            'Гарантия 90 дней',
          ],
          prices: [
            'iPhone 12 — от 69€',
            'iPhone 13 — от 79€',
            'iPhone 14 Pro — от 109€',
          ],
        },
        {
          id: 'charging',
          title: 'Зарядка и разъёмы',
          cardTitle: 'iPhone не заряжается?',
          short: 'Не заряжается или плохой контакт',
          time: '30–90 мин',
          visual: '/images/categories/uzlades_ligzda_remonts.webp',
          text:
            'Заряжается только в определённом положении или не реагирует на кабель? Найдём причину и устраним её без лишнего ремонта.',
          bullets: [
            'Чистка разъёма',
            'Замена порта зарядки',
            'Диагностика бесплатно',
          ],
          prices: [
            'Чистка порта — от 15€',
            'Замена разъёма — от 49€',
            'Диагностика — бесплатно',
          ],
        },
        {
          id: 'camera',
          title: 'Камера и стекло',
          cardTitle: 'Камера не фокусируется?',
          short: 'Мутная камера или разбита линза',
          time: '30–60 мин',
          visual: '/images/categories/kameras_remonts.webp',
          text:
            'Изображение мутное, камера дрожит или разбито стекло камеры? Отремонтируем и проверим качество фото после ремонта.',
          bullets: [
            'Замена стекла камеры',
            'Проверка фокуса',
            'Гарантия 90 дней',
          ],
          prices: [
            'Стекло камеры — от 29€',
            'Камера — от 59€',
            'Диагностика — бесплатно',
          ],
        },
        {
          id: 'water',
          title: 'Влага и сложные ремонты',
          cardTitle: 'iPhone после воды?',
          short: 'После воды или не включается',
          time: 'после диагностики',
          visual: '/images/categories/udens_bojajumi.webp',
          text:
            'iPhone попал в воду или больше не включается? Проведём диагностику и до ремонта согласуем возможные решения и стоимость.',
          bullets: [
            'Диагностика платы',
            'Чистка после влаги',
            'Цена до ремонта',
          ],
          prices: [
            'Диагностика — бесплатно',
            'Чистка после влаги — от 35€',
            'Ремонт платы — после оценки',
          ],
        },
      ],
    };
  }

  return {
    title: 'Populārākie iPhone remonti',
    subtitle:
      'Biežākos iPhone remontus veicam tajā pašā dienā. Izvēlies problēmu un apskati orientējošās cenas.',
    timeLabel: 'Remonta laiks',
    ctaPrice: 'Uzzināt cenu',
    ctaBook: 'Pieteikt remontu',
    services: [
      {
        id: 'screen',
        title: 'Ekrāna maiņa',
        cardTitle: 'Saplīsis iPhone ekrāns?',
        short: 'Saplīsis stikls vai nestrādā skārienjutība',
        time: '20–60 min',
        visual: '/images/categories/displeja_maina.webp',
        text:
          'Melns displejs, plaisas vai nestrādā skārienjutība? Vairumu iPhone ekrāna remontu veicam tajā pašā dienā.',
        bullets: [
          'Face ID saglabāšana',
          'True Tone, ja iespējams',
          '90 dienu garantija',
        ],
        prices: [
          'iPhone 13 — no 89€',
          'iPhone 14 Pro — no 149€',
          'iPhone 15 Pro — no 189€',
        ],
      },
      {
        id: 'battery',
        title: 'Akumulatora maiņa',
        cardTitle: 'Akumulators ātri izlādējas?',
        short: 'Ātri izlādējas vai izslēdzas aukstumā',
        time: '20–40 min',
        visual: '/images/categories/baterijas_maina.webp',
        text:
          'iPhone ātri izlādējas, karst vai slēdzas ārā pie zemāka procenta? Nomainīsim akumulatoru un pārbaudīsim ierīces darbību pēc remonta.',
        bullets: [
          'Akumulatora veselības pārbaude',
          'Remonts 20–40 minūtēs',
          '90 dienu garantija',
        ],
        prices: [
          'iPhone 11 — no 39€',
          'iPhone 13 — no 49€',
          'iPhone 14 Pro — no 69€',
        ],
      },
      {
        id: 'backGlass',
        title: 'Aizmugurējā stikla maiņa',
        cardTitle: 'Saplīsis aizmugurējais stikls?',
        short: 'Saplīsis korpusa stikls vai asas malas',
        time: '1–3 h',
        visual: '/images/categories/displeja_maina.webp',
        text:
          'Nomainīsim bojāto korpusa stiklu un atjaunosim iPhone izskatu bez liekām detaļu maiņām.',
        bullets: [
          'Precīza stikla noņemšana',
          'Korpusa vizuāla atjaunošana',
          '90 dienu garantija',
        ],
        prices: [
          'iPhone 12 — no 69€',
          'iPhone 13 — no 79€',
          'iPhone 14 Pro — no 109€',
        ],
      },
      {
        id: 'charging',
        title: 'Uzlāde & savienojumi',
        cardTitle: 'iPhone neuzlādējas?',
        short: 'Neuzlādējas vai slikts kontakts',
        time: '30–90 min',
        visual: '/images/categories/uzlades_ligzda_remonts.webp',
        text:
          'Lādējas tikai noteiktā pozīcijā vai nereaģē uz kabeli? Noskaidrosim problēmas cēloni un novērsīsim to bez liekiem remontiem.',
        bullets: [
          'Ligzdas tīrīšana',
          'Uzlādes porta maiņa',
          'Diagnostika bez maksas',
        ],
        prices: [
          'Ligzdas tīrīšana — no 15€',
          'Uzlādes porta maiņa — no 49€',
          'Diagnostika — bez maksas',
        ],
      },
      {
        id: 'camera',
        title: 'Kamera & stikls',
        cardTitle: 'Kamera nefokusējas?',
        short: 'Miglaina kamera vai saplīsusi lēca',
        time: '30–60 min',
        visual: '/images/categories/kameras_remonts.webp',
        text:
          'Attēls miglains, kamera trīc vai saplīsis kameras stikls? Salabosim kameru un pārbaudīsim foto kvalitāti pēc remonta.',
        bullets: [
          'Kameras stikla maiņa',
          'Fokusa pārbaude',
          '90 dienu garantija',
        ],
        prices: [
          'Kameras stikls — no 29€',
          'Kamera — no 59€',
          'Diagnostika — bez maksas',
        ],
      },
      {
        id: 'water',
        title: 'Mitruma bojājumi',
        cardTitle: 'iPhone pēc ūdens?',
        short: 'Pēc ūdens vai neieslēdzas',
        time: 'pēc diagnostikas',
        visual: '/images/categories/udens_bojajumi.webp',
        text:
          'iPhone nonācis saskarē ar ūdeni vai vairs neieslēdzas? Veiksim diagnostiku un pirms remonta saskaņosim iespējamos risinājumus un izmaksas.',
        bullets: [
          'Plates diagnostika',
          'Tīrīšana pēc mitruma',
          'Cena pirms remonta',
        ],
        prices: [
          'Diagnostika — bez maksas',
          'Tīrīšana pēc mitruma — no 35€',
          'Plates remonts — pēc novērtējuma',
        ],
      },
    ],
  };
}

function ServiceSelector({
  services,
  activeService,
  onSelect,
  className = '',
}) {
  return (
    <div className={`${s.selector} ${className}`} aria-label="Remonta veidi">
      {services.map((service) => {
        const isActive = service.id === activeService.id;

        return (
          <button
            key={service.id}
            type="button"
            className={`${s.selectorButton} ${
              isActive ? s.selectorButtonActive : ''
            }`}
            onClick={() => onSelect(service.id)}
            aria-pressed={isActive}
          >
            <span>{service.title}</span>
            <small>{service.short}</small>
          </button>
        );
      })}
    </div>
  );
}

export default function LandingServices({
  id = 'services',
  locale = 'lv',
}) {
  const content = useMemo(() => getServices(locale), [locale]);
  const [activeId, setActiveId] = useState(content.services[0].id);
  const serviceCardRef = useRef(null);

  const activeService =
    content.services.find((service) => service.id === activeId) ||
    content.services[0];

  function handleSelect(serviceId) {
    setActiveId(serviceId);

    window.requestAnimationFrame(() => {
      serviceCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  return (
    <section
      id={id}
      className={s.section}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <div className={s.header}>
          <h2 id={`${id}-title`}>{content.title}</h2>
          <p>{content.subtitle}</p>
        </div>

        <div className={s.panel}>
          <article ref={serviceCardRef} className={s.contentCard}>
            {activeService.visual && (
              <div className={s.visual} aria-hidden="true">
                <Image
                  key={activeService.id}
                  src={activeService.visual}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className={s.visualImage}
                />
                <div className={s.visualFade} />
              </div>
            )}

            <div className={s.content}>
              <div className={s.serviceMeta}>
                <span>
                  <FaBolt aria-hidden="true" />
                  {content.timeLabel}: {activeService.time}
                </span>
              </div>

              <h3>{activeService.cardTitle || activeService.title}</h3>
              <p>{activeService.text}</p>

              <ul className={s.bullets}>
                {activeService.bullets.map((bullet) => (
                  <li key={bullet}>
                    <FaCircleCheck aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className={s.priceBox}>
                {activeService.prices.map((price) => (
                  <div key={price}>{price}</div>
                ))}
              </div>

              <div className={s.actions}>
                <a href="#locations" className={s.primaryCta}>
                  {content.ctaPrice}
                </a>
                <a href="#locations" className={s.secondaryCta}>
                  {content.ctaBook}
                </a>
              </div>
            </div>
          </article>

          <ServiceSelector
            services={content.services}
            activeService={activeService}
            onSelect={handleSelect}
            className={s.selectorDesktop}
          />

          <ServiceSelector
            services={content.services}
            activeService={activeService}
            onSelect={handleSelect}
            className={s.selectorMobile}
          />
        </div>
      </div>
    </section>
  );
}