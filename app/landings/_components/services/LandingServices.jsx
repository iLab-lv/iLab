'use client';

import { useMemo, useState } from 'react';
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
      subtitle: 'Выберите нужный ремонт и посмотрите ориентировочные цены.',
      timeLabel: 'Время ремонта',
      ctaPrice: 'Узнать цену',
      ctaBook: 'Записаться',
      services: [
        {
          id: 'screen',
          title: 'Замена экрана',
          short: 'Дисплей, стекло, тачскрин',
          time: '20–60 мин',
          visual: '/images/categories/displeja_maina.webp',
          text: 'Меняем дисплейные модули iPhone с сохранением основных функций устройства.',
          bullets: ['Face ID сохраняется', 'True Tone при возможности', 'Гарантия 90 дней'],
          prices: ['iPhone 13 — от 89€', 'iPhone 14 Pro — от 149€', 'iPhone 15 Pro — от 189€'],
        },
        {
          id: 'battery',
          title: 'Замена аккумулятора',
          short: 'Быстро садится батарея',
          time: '20–40 мин',
          visual: '/images/categories/baterijas_maina.webp',
          text: 'Заменим изношенный аккумулятор и проверим работу устройства после ремонта.',
          bullets: ['Диагностика на месте', 'Аккуратная замена', 'Гарантия 90 дней'],
          prices: ['iPhone 11 — от 39€', 'iPhone 13 — от 49€', 'iPhone 14 Pro — от 69€'],
        },
        {
          id: 'charging',
          title: 'Зарядка и разъёмы',
          short: 'Не заряжается, плохой контакт',
          time: '30–90 мин',
          visual: '/images/categories/uzlades_ligzda_remonts.webp',
          text: 'Проверим разъём, кабель, контроллер питания и устраним причину проблемы.',
          bullets: ['Чистка разъёма', 'Замена порта', 'Проверка зарядки'],
          prices: ['Чистка порта — от 15€', 'Замена разъёма — от 49€', 'Диагностика — бесплатно'],
        },
        {
          id: 'camera',
          title: 'Камера и стекло',
          short: 'Камера, линза, защитное стекло',
          time: '30–60 мин',
          visual: '/images/categories/kameras_remonts.webp',
          text: 'Меняем стекло камеры, модули камеры и проверяем качество фото после ремонта.',
          bullets: ['Замена стекла камеры', 'Проверка фокуса', 'Гарантия 90 дней'],
          prices: ['Стекло камеры — от 29€', 'Камера — от 59€', 'Диагностика — бесплатно'],
        },
        {
          id: 'water',
          title: 'Влага и сложные ремонты',
          short: 'После воды, не включается',
          time: 'после диагностики',
          visual: '/images/categories/udens_bojajumi.webp',
          text: 'Проведём диагностику после влаги и предложим решение до начала ремонта.',
          bullets: ['Диагностика платы', 'Чистка после влаги', 'Согласование цены заранее'],
          prices: ['Диагностика — бесплатно', 'Чистка после влаги — от 35€', 'Ремонт платы — после оценки'],
        },
      ],
    };
  }

  return {
    title: 'Populārākie iPhone remonti',
    subtitle: 'Izvēlies vajadzīgo remontu un apskati orientējošās cenas.',
    timeLabel: 'Remonta laiks',
    ctaPrice: 'Uzzināt cenu',
    ctaBook: 'Pieteikt remontu',
    services: [
      {
        id: 'screen',
        title: 'Ekrāna maiņa',
        short: 'Displejs, stikls, skārienjutība',
        time: '20–60 min',
        visual: '/images/categories/displeja_maina.webp',
        text: 'Mainām iPhone displeja moduļus ar rūpīgu pārbaudi pēc remonta.',
        bullets: ['Face ID saglabāšana', 'True Tone, ja iespējams', '90 dienu garantija'],
        prices: ['iPhone 13 — no 89€', 'iPhone 14 Pro — no 149€', 'iPhone 15 Pro — no 189€'],
      },
      {
        id: 'battery',
        title: 'Akumulatora maiņa',
        short: 'Ātri izlādējas vai slēdzas ārā',
        time: '20–40 min',
        visual: '/images/categories/baterijas_maina.webp',
        text: 'Nomainām nolietotu akumulatoru un pārbaudām ierīces darbību pēc remonta.',
        bullets: ['Diagnostika uz vietas', 'Akumulatora veselības pārbaude', '90 dienu garantija'],
        prices: ['iPhone 11 — no 39€', 'iPhone 13 — no 49€', 'iPhone 14 Pro — no 69€'],
      },
      {
        id: 'charging',
        title: 'Uzlāde & savienojumi',
        short: 'Neuzlādējas vai slikts kontakts',
        time: '30–90 min',
        visual: '/images/categories/uzlades_ligzda_remonts.webp',
        text: 'Pārbaudām uzlādes ligzdu, kabeli, barošanas ķēdi un novēršam problēmas cēloni.',
        bullets: ['Ligzdas tīrīšana', 'Uzlādes porta maiņa', 'Uzlādes pārbaude'],
        prices: ['Ligzdas tīrīšana — no 15€', 'Uzlādes porta maiņa — no 49€', 'Diagnostika — bez maksas'],
      },
      {
        id: 'camera',
        title: 'Kamera & stikls',
        short: 'Kamera, lēca, aizsargstikls',
        time: '30–60 min',
        visual: '/images/categories/kameras_remonts.webp',
        text: 'Mainām kameras stiklu un kameras moduļus, pēc remonta pārbaudot foto kvalitāti.',
        bullets: ['Kameras stikla maiņa', 'Fokusa pārbaude', '90 dienu garantija'],
        prices: ['Kameras stikls — no 29€', 'Kamera — no 59€', 'Diagnostika — bez maksas'],
      },
      {
        id: 'water',
        title: 'Mitruma bojājumi',
        short: 'Pēc ūdens vai neieslēdzas',
        time: 'pēc diagnostikas',
        visual: '/images/categories/udens_bojajumi.webp',
        text: 'Veicam diagnostiku pēc mitruma un pirms remonta saskaņojam iespējamos risinājumus.',
        bullets: ['Plates diagnostika', 'Tīrīšana pēc mitruma', 'Cena pirms remonta'],
        prices: ['Diagnostika — bez maksas', 'Tīrīšana pēc mitruma — no 35€', 'Plates remonts — pēc novērtējuma'],
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

  const activeService =
    content.services.find((service) => service.id === activeId) ||
    content.services[0];

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
          <ServiceSelector
            services={content.services}
            activeService={activeService}
            onSelect={setActiveId}
            className={s.selectorDesktop}
          />

          <article className={s.contentCard}>
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

              <h3>{activeService.title}</h3>
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
            onSelect={setActiveId}
            className={s.selectorMobile}
          />
        </div>
      </div>
    </section>
  );
}