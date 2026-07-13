import { LuBoxes, LuLayers3, LuScanSearch, LuSmartphone } from 'react-icons/lu';

import s from './IphoneScreenPriceFactors.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Cenas skaidrojums',
    titleStart: 'No kā atkarīga iPhone',
    titleAccent: 'ekrāna maiņas cena?',
    intro:
      'Cena var atšķirties tāpēc, ka iPhone modeļiem ir dažādi ekrāna tipi, konstrukcija un detaļu pieejamība. Ja pēc kritiena bojāts ne tikai ekrāns, bet arī korpuss, kamera, sensori vai savienojumi, pirms remonta var būt nepieciešama papildu pārbaude.',
    factors: [
      {
        title: 'iPhone modelis',
        description:
          'Jaunākiem un Pro modeļiem detaļas parasti ir dārgākas sarežģītākas konstrukcijas un ekrāna tehnoloģijas dēļ.',
      },
      {
        title: 'Ekrāna variants',
        description:
          'Dažiem modeļiem var būt pieejami vairāki ekrāna varianti. Pirms remonta izskaidrojam atšķirības, cenu un garantijas nosacījumus.',
      },
      {
        title: 'Detaļas pieejamība',
        description:
          'Ja detaļa nav uz vietas, cenu un piegādes iespēju precizējam pirms remonta.',
      },
      {
        title: 'Bojājuma apjoms',
        description:
          'Pēc spēcīga kritiena var būt bojātas arī citas daļas, piemēram, korpuss, kamera, sensori vai savienojumi.',
      },
    ],
  },
  ru: {
    eyebrow: 'Как формируется цена',
    titleStart: 'От чего зависит цена',
    titleAccent: 'замены экрана iPhone?',
    intro:
      'Цена может отличаться, поскольку модели iPhone имеют разные типы экранов, конструкцию и доступность деталей. Если после падения повреждён не только экран, но и корпус, камера, датчики или соединения, перед ремонтом может потребоваться дополнительная проверка.',
    factors: [
      {
        title: 'Модель iPhone',
        description:
          'Для новых моделей и версий Pro детали обычно стоят дороже из-за более сложной конструкции и технологии экрана.',
      },
      {
        title: 'Вариант экрана',
        description:
          'Для некоторых моделей доступны разные варианты экрана. Перед ремонтом объясняем различия, цену и условия гарантии.',
      },
      {
        title: 'Наличие детали',
        description:
          'Если детали нет на месте, цену и возможность поставки уточняем до начала ремонта.',
      },
      {
        title: 'Степень повреждения',
        description:
          'После сильного падения могут быть повреждены и другие части, например корпус, камера, датчики или соединения.',
      },
    ],
  },
};

const BATTERY_CONTENT = {
  lv: {
    eyebrow: 'Cenas skaidrojums',
    titleStart: 'No kā atkarīga iPhone',
    titleAccent: 'baterijas maiņas cena?',
    intro: 'Cena var atšķirties atkarībā no iPhone modeļa, baterijas detaļas pieejamības un konkrētās ierīces stāvokļa. Ja baterija ir uzpūtusies, ierīce ir kritusi vai bijis mitruma bojājums, pirms baterijas maiņas var būt nepieciešama papildu pārbaude.',
    factors: [
      { title: 'iPhone modelis', description: 'Dažādiem iPhone modeļiem ir atšķirīgas baterijas, konstrukcija un izjaukšanas sarežģītība.' },
      { title: 'Detaļas pieejamība', description: 'Ja baterija nav uz vietas, cenu un piegādes iespēju precizējam pirms remonta.' },
      { title: 'Ierīces stāvoklis', description: 'Uzpūtusies baterija, bojāts korpuss, mitrums vai uzlādes problēmas var ietekmēt remonta gaitu.' },
      { title: 'Papildu bojājumi', description: 'Ja telefons nelādējas vai karst, problēma var nebūt tikai baterijā.' },
    ],
  },
  ru: {
    eyebrow: 'Как формируется цена',
    titleStart: 'От чего зависит цена',
    titleAccent: 'замены батареи iPhone?',
    intro: 'Цена может отличаться в зависимости от модели iPhone, наличия батареи и состояния конкретного устройства. Если батарея вздулась, телефон падал или контактировал с влагой, перед заменой может потребоваться дополнительная проверка.',
    factors: [
      { title: 'Модель iPhone', description: 'У разных моделей iPhone отличаются батареи, конструкция и сложность разборки.' },
      { title: 'Наличие детали', description: 'Если батареи нет на месте, цену и возможность поставки уточняем до ремонта.' },
      { title: 'Состояние устройства', description: 'Вздутая батарея, повреждённый корпус, влага или проблемы зарядки могут повлиять на ремонт.' },
      { title: 'Дополнительные повреждения', description: 'Если телефон не заряжается или нагревается, проблема может быть не только в батарее.' },
    ],
  },
};

const ICONS = [LuSmartphone, LuLayers3, LuBoxes, LuScanSearch];

export default function IphoneScreenPriceFactors({ locale = 'lv', variant = 'iphone-screen' }) {
  const source = variant === 'iphone-battery' ? BATTERY_CONTENT : CONTENT;
  const content = source[locale] || source.lv;

  return (
    <section className={s.section} aria-labelledby="iphone-screen-price-factors-title">
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.eyebrow}>{content.eyebrow}</span>
          <h2 id="iphone-screen-price-factors-title">
            {content.titleStart} <em>{content.titleAccent}</em>
          </h2>
          <p>{content.intro}</p>
        </header>

        <ol className={s.factors}>
          {content.factors.map((factor, index) => {
            const Icon = ICONS[index];

            return (
              <li className={s.factor} key={factor.title}>
                <span className={s.icon} aria-hidden="true">
                  <Icon />
                </span>
                <span className={s.index} aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{factor.title}</h3>
                <p>{factor.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
