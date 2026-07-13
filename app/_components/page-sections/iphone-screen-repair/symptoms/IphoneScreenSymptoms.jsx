import {
  LuScanLine,
  LuSmartphone,
  LuMonitorOff,
  LuTouchpadOff,
} from 'react-icons/lu';

import s from './IphoneScreenSymptoms.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Bojājuma pazīmes',
    titleStart: 'Kad vajadzīga iPhone',
    titleAccent: 'ekrāna maiņa?',
    intro:
      'Ekrāna maiņa ir vajadzīga ne tikai tad, ja stikls ir pilnībā sasists. Pēc kritiena var būt bojāts arī displeja panelis, skārienjutīgais slānis vai savienojumi, tāpēc problēma var parādīties kā attēla traucējumi, mirgošana, melns ekrāns vai kļūdaina skāriena darbība.',
    symptoms: [
      {
        title: 'Saplaisājis stikls',
        description:
          'Ekrāns ir sasists, plaisas traucē lietošanu vai stikla malas kļuvušas asas.',
      },
      {
        title: 'Līnijas vai plankumi displejā',
        description:
          'Attēlā redzamas krāsainas līnijas, melni laukumi, mirgošana vai attēla deformācija.',
      },
      {
        title: 'Nereaģē skāriens',
        description:
          'Ekrāns rāda attēlu, bet pieskārieni darbojas tikai daļā ekrāna, kavējas vai nedarbojas vispār.',
      },
      {
        title: 'Melns ekrāns pēc kritiena',
        description:
          'Telefons ieslēdzas, vibrē vai skan, bet ekrānā nav attēla.',
      },
    ],
  },
  ru: {
    eyebrow: 'Признаки повреждения',
    titleStart: 'Когда нужна',
    titleAccent: 'замена экрана iPhone?',
    intro:
      'Замена экрана нужна не только тогда, когда стекло полностью разбито. После падения также могут быть повреждены дисплейная панель, сенсорный слой или соединения, поэтому неисправность может проявляться искажением изображения, мерцанием, чёрным экраном или неправильной работой сенсора.',
    symptoms: [
      {
        title: 'Треснувшее стекло',
        description:
          'Экран разбит, трещины мешают использованию или края стекла стали острыми.',
      },
      {
        title: 'Линии или пятна на дисплее',
        description:
          'На изображении видны цветные линии, чёрные области, мерцание или деформация изображения.',
      },
      {
        title: 'Сенсор не реагирует',
        description:
          'Экран показывает изображение, но касания работают только в части экрана, реагируют с задержкой или не работают совсем.',
      },
      {
        title: 'Чёрный экран после падения',
        description:
          'Телефон включается, вибрирует или издаёт звуки, но изображения на экране нет.',
      },
    ],
  },
};

const BATTERY_CONTENT = {
  lv: {
    eyebrow: 'Baterijas nolietojuma pazīmes',
    titleStart: 'Kad vajadzīga iPhone',
    titleAccent: 'baterijas maiņa?',
    intro: 'Baterijas nolietojums ne vienmēr nozīmē tikai īsāku darbības laiku. Nolietota baterija var izraisīt arī pēkšņu izslēgšanos, lēnāku darbību, pārkaršanu vai situāciju, kad telefons strādā tikai pie lādētāja.',
    symptoms: [
      { title: 'iPhone ātri izlādējas', description: 'Telefons zaudē uzlādi daudz ātrāk nekā iepriekš, pat ja lietošanas paradumi nav mainījušies.' },
      { title: 'Izslēdzas pie atlikušiem procentiem', description: 'iPhone var izslēgties pie 10–30% vai restartēties slodzes laikā.' },
      { title: 'Zema baterijas veselība', description: 'Iestatījumos redzama zema maksimālā kapacitāte vai brīdinājums par baterijas servisu.' },
      { title: 'Telefons karst vai darbojas nestabili', description: 'Baterijas nolietojums var izpausties kā uzkaršana, lēnāka darbība vai negaidīta izslēgšanās.' },
    ],
  },
  ru: {
    eyebrow: 'Признаки износа батареи',
    titleStart: 'Когда нужна',
    titleAccent: 'замена батареи iPhone?',
    intro: 'Износ батареи означает не только меньшее время работы. Он также может вызывать внезапные выключения, замедление, перегрев или ситуацию, когда телефон работает только при подключённой зарядке.',
    symptoms: [
      { title: 'iPhone быстро разряжается', description: 'Телефон теряет заряд намного быстрее, чем раньше, хотя привычки использования не изменились.' },
      { title: 'Выключается при оставшихся процентах', description: 'iPhone может выключаться при 10–30% заряда или перезагружаться под нагрузкой.' },
      { title: 'Низкое состояние батареи', description: 'В настройках показана низкая максимальная ёмкость или предупреждение о сервисе батареи.' },
      { title: 'Телефон нагревается или работает нестабильно', description: 'Износ батареи может проявляться нагревом, замедлением или неожиданными выключениями.' },
    ],
  },
};

const ICONS = [LuSmartphone, LuScanLine, LuTouchpadOff, LuMonitorOff];

export default function IphoneScreenSymptoms({ locale = 'lv', variant = 'iphone-screen' }) {
  const source = variant === 'iphone-battery' ? BATTERY_CONTENT : CONTENT;
  const content = source[locale] || source.lv;

  return (
    <section className={s.section} aria-labelledby="iphone-screen-symptoms-title">
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.eyebrow}>{content.eyebrow}</span>
          <h2 id="iphone-screen-symptoms-title">
            {content.titleStart} <em>{content.titleAccent}</em>
          </h2>
          <p>{content.intro}</p>
        </header>

        <div className={s.grid}>
          {content.symptoms.map((symptom, index) => {
            const Icon = ICONS[index];

            return (
              <article className={s.card} key={symptom.title}>
                <span className={s.icon} aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{symptom.title}</h3>
                  <p>{symptom.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
