import { LuBadgeEuro, LuScissors, LuShieldCheck, LuSparkles } from 'react-icons/lu';

import s from './IphoneHydrogelSection.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Ekrāna aizsardzība',
    titleStart: 'Hidrogēla plēve',
    titleAccent: 'jebkuram telefona modelim',
    intro:
      'Pēc ekrāna maiņas iesakām uzreiz uzklāt hidrogēla aizsargplēvi. iLab to izgriež uz vietas precīzi konkrētajam telefona modelim — arī modeļiem, kuriem gatavs aizsargstikls nav pieejams.',
    benefits: [
      {
        title: 'Precīzi izgriezta uz vietas',
        description:
          'Plēvi pielāgojam konkrētā telefona ekrāna formai, sensoriem un izgriezumiem.',
      },
      {
        title: 'Visiem telefonu modeļiem',
        description:
          'Varam izgriezt plēvi gan iPhone, gan Android telefoniem, tostarp retākiem modeļiem.',
      },
      {
        title: 'Ikdienas virsmas aizsardzībai',
        description:
          'Plēve palīdz samazināt skrāpējumu, nelielu triecienu un ekrāna virsmas bojājumu risku.',
      },
    ],
    priceTitle: 'Hidrogēla plēves uzklāšana',
    repairPrice: '15 €',
    repairLabel: 'kopā ar remontu',
    separatePrice: '20 €',
    separateLabel: 'atsevišķi',
    glassTitle: 'Aizsargstikls arī ir pieejams',
    glassCopy:
      'Ja dod priekšroku aizsargstiklam, tas ir pieejams iPhone modeļiem un daļai populārāko telefonu. Pieejamību precizē servisā.',
    note:
      'Hidrogēla plēve vai aizsargstikls nepadara telefonu nesalaužamu, taču palīdz pasargāt ekrāna virsmu ikdienā.',
  },
  ru: {
    eyebrow: 'Защита экрана',
    titleStart: 'Гидрогелевая плёнка',
    titleAccent: 'для любой модели телефона',
    intro:
      'После замены экрана рекомендуем сразу нанести гидрогелевую защитную плёнку. В iLab её вырезают на месте точно под конкретную модель телефона — в том числе когда готового защитного стекла для модели нет.',
    benefits: [
      {
        title: 'Точная резка на месте',
        description:
          'Плёнку адаптируем под форму экрана, датчики и вырезы конкретного телефона.',
      },
      {
        title: 'Для всех моделей телефонов',
        description:
          'Можем вырезать плёнку для iPhone и Android, включая редкие модели.',
      },
      {
        title: 'Для повседневной защиты поверхности',
        description:
          'Плёнка помогает снизить риск царапин, небольших ударов и повреждений поверхности экрана.',
      },
    ],
    priceTitle: 'Нанесение гидрогелевой плёнки',
    repairPrice: '15 €',
    repairLabel: 'вместе с ремонтом',
    separatePrice: '20 €',
    separateLabel: 'отдельно',
    glassTitle: 'Защитное стекло тоже доступно',
    glassCopy:
      'Если вы предпочитаете защитное стекло, оно доступно для моделей iPhone и некоторых популярных телефонов. Наличие уточняйте в сервисе.',
    note:
      'Гидрогелевая плёнка или защитное стекло не делают телефон неуязвимым, но помогают защитить поверхность экрана в повседневном использовании.',
  },
};

const ICONS = [LuScissors, LuSparkles, LuShieldCheck];

export default function IphoneHydrogelSection({ locale = 'lv' }) {
  const content = CONTENT[locale] || CONTENT.lv;

  return (
    <section className={s.section} aria-labelledby="iphone-hydrogel-title">
      <div className={s.container}>
        <div className={s.layout}>
          <div className={s.main}>
            <header className={s.header}>
              <span className={s.eyebrow}>{content.eyebrow}</span>
              <h2 id="iphone-hydrogel-title">
                {content.titleStart} — <em>{content.titleAccent}</em>
              </h2>
              <p>{content.intro}</p>
            </header>

            <div className={s.benefits}>
              {content.benefits.map((benefit, index) => {
                const Icon = ICONS[index];

                return (
                  <article className={s.benefit} key={benefit.title}>
                    <span aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className={s.offer} aria-label={content.priceTitle}>
            <span className={s.offerIcon} aria-hidden="true">
              <LuBadgeEuro />
            </span>
            <h3>{content.priceTitle}</h3>
            <dl className={s.prices}>
              <div>
                <dt>{content.repairLabel}</dt>
                <dd>{content.repairPrice}</dd>
              </div>
              <div>
                <dt>{content.separateLabel}</dt>
                <dd>{content.separatePrice}</dd>
              </div>
            </dl>
            <div className={s.glassNote}>
              <strong>{content.glassTitle}</strong>
              <p>{content.glassCopy}</p>
            </div>
          </aside>
        </div>

        <p className={s.note}>{content.note}</p>
      </div>
    </section>
  );
}
