import { LuCircleAlert, LuInfo, LuShieldAlert, LuTouchpadOff } from 'react-icons/lu';

import s from './IphoneScreenDamageGuide.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Meistara skaidrojums',
    titleStart: 'Ko nozīmē dažādi iPhone',
    titleAccent: 'ekrāna bojājumi?',
    intro:
      'Ne katrs saplaisājis ekrāns nozīmē vienādu bojājumu. Dažreiz bojāts ir tikai ārējais stikls, bet citreiz cieš displeja panelis, skārienjutīgais slānis vai iekšējie savienojumi. Tāpēc pirms remonta pārbaudām ne tikai plaisas, bet arī attēlu, skārienu un citus simptomus.',
    adviceLabel: 'Ieteikums',
    items: [
      {
        title: 'Melns plankums vai līnijas displejā',
        description:
          'Melns plankums, krāsainas līnijas vai mirgošana parasti norāda, ka bojāts ne tikai stikls, bet arī pats displeja panelis. Šāds bojājums var palielināties — plankums vai līnijas var izplesties, un ekrāns ar laiku var kļūt grūti lietojams vai pilnībā melns.',
        advice:
          'Ja ekrānā parādās plankumi vai līnijas, labāk neatlikt remontu un, ja iespējams, izveidot datu rezerves kopiju.',
      },
      {
        title: 'Saplaisājis stikls, bet ekrāns vēl darbojas',
        description:
          'Ja stikls ir saplaisājis, bet attēls un skāriens vēl darbojas, telefonu īslaicīgi var lietot uzmanīgi. Kā pagaidu risinājumu virs plaisām var uzlīmēt caurspīdīgu līmlenti vai aizsargplēvi, lai stikla lauskas mazāk kustētos un netraumētu pirkstus.',
        advice:
          'Tas nav remonts, bet tikai īslaicīga aizsardzība līdz servisa apmeklējumam. Plaisās var iekļūt mitrums, putekļi un netīrumi.',
      },
      {
        title: 'Izbiruši stikla gabali vai redzamas iekšējās daļas',
        description:
          'Ja no ekrāna izkrituši stikla gabali vai redzamas telefona iekšējās daļas, telefonu labāk nelietot ikdienā. Šādā stāvoklī ierīcē vieglāk iekļūst mitrums, putekļi un netīrumi, kas var radīt papildu bojājumus.',
        advice:
          'Ja bojājums ir dziļš vai redzams mitrums, nelādē telefonu un atnes ierīci uz pārbaudi pēc iespējas ātrāk.',
      },
      {
        title: 'Skāriens darbojas pats no sevis vai nereaģē',
        description:
          'Ja ekrāns pats spiež pogas, nereaģē noteiktās vietās vai pieskārieni darbojas kļūdaini, var būt bojāts skārienjutīgais slānis vai ekrāna savienojumi. Šādu problēmu nevajadzētu ignorēt, jo telefons var kļūt grūti lietojams vai sākt nejauši atvērt lietotnes.',
      },
    ],
  },
  ru: {
    eyebrow: 'Объяснение мастера',
    titleStart: 'Что означают разные',
    titleAccent: 'повреждения экрана iPhone?',
    intro:
      'Не каждый треснувший экран означает одинаковое повреждение. Иногда повреждено только наружное стекло, а в других случаях страдают дисплейная панель, сенсорный слой или внутренние соединения. Поэтому перед ремонтом мы проверяем не только трещины, но и изображение, сенсор и другие симптомы.',
    adviceLabel: 'Рекомендация',
    items: [
      {
        title: 'Чёрное пятно или линии на дисплее',
        description:
          'Чёрное пятно, цветные линии или мерцание обычно означают, что повреждено не только стекло, но и сама дисплейная панель. Повреждение может увеличиваться: пятно или линии могут расшириться, а экран со временем станет трудно использовать или он полностью погаснет.',
        advice:
          'Если на экране появились пятна или линии, лучше не откладывать ремонт и по возможности создать резервную копию данных.',
      },
      {
        title: 'Стекло треснуло, но экран ещё работает',
        description:
          'Если стекло треснуло, но изображение и сенсор ещё работают, телефоном можно недолго пользоваться с осторожностью. В качестве временного решения поверх трещин можно наклеить прозрачную ленту или защитную плёнку, чтобы осколки меньше двигались и не травмировали пальцы.',
        advice:
          'Это не ремонт, а лишь временная защита до посещения сервиса. Через трещины внутрь могут попасть влага, пыль и грязь.',
      },
      {
        title: 'Выпали кусочки стекла или видны внутренние детали',
        description:
          'Если из экрана выпали кусочки стекла или видны внутренние части телефона, устройством лучше не пользоваться каждый день. В таком состоянии внутрь легче попадают влага, пыль и грязь, способные вызвать дополнительные повреждения.',
        advice:
          'Если повреждение глубокое или заметна влага, не заряжайте телефон и как можно скорее принесите устройство на проверку.',
      },
      {
        title: 'Сенсор срабатывает сам или не реагирует',
        description:
          'Если экран сам нажимает кнопки, не реагирует в отдельных местах или касания работают неправильно, могут быть повреждены сенсорный слой или соединения экрана. Не стоит игнорировать проблему: телефоном может стать трудно пользоваться, а приложения могут открываться случайно.',
      },
    ],
  },
};

const BATTERY_CONTENT = {
  lv: {
    eyebrow: 'Meistara skaidrojums',
    titleStart: 'Ko nozīmē dažādi iPhone',
    titleAccent: 'baterijas simptomi?',
    intro: 'Ne katra uzlādes problēma nozīmē, ka uzreiz jāmaina baterija. Simptomi palīdz saprast, vai problēma vairāk izskatās pēc nolietotas baterijas, uzlādes ligzdas bojājuma vai citas ierīces kļūmes.',
    adviceLabel: 'Ieteikums',
    items: [
      { title: 'Telefons ātri izlādējas', description: 'Ja iPhone ātri izlādējas arī pēc pilnas uzlādes, bieži iemesls ir baterijas nolietojums. Īpaši tas redzams vecākiem modeļiem vai telefonos, kas ikdienā tiek intensīvi lietoti navigācijai, video, spēlēm vai darbam ar internetu.', advice: 'Ja baterijas darbības laiks pēkšņi būtiski samazinās, ir vērts pārbaudīt gan bateriju, gan programmatūras fonā strādājošos procesus.' },
      { title: 'iPhone izslēdzas, lai gan vēl ir procenti', description: 'Ja telefons izslēdzas pie atlikušiem procentiem vai restartējas slodzes laikā, baterija var vairs nespēt stabili nodrošināt vajadzīgo jaudu. Šādos gadījumos baterijas maiņa bieži palīdz atjaunot stabilāku darbību.' },
      { title: 'Baterija ir uzpūtusies', description: 'Ja ekrāns vai korpuss sāk celties, starp detaļām parādās sprauga vai telefons izskatās deformēts, iespējams, baterija ir uzpūtusies. Šādā gadījumā telefonu nevajadzētu spiest ciet, sildīt, caurdurt vai turpināt intensīvi lietot.', advice: 'Ja baterija ir uzpūtusies, labāk pārtraukt lietošanu un pēc iespējas ātrāk atnest ierīci uz servisu. Uzpūtusies baterija var bojāt ekrānu, korpusu vai citas iekšējās detaļas.' },
      { title: 'Telefons karst un ātri izlādējas', description: 'Uzkaršana kopā ar ātru izlādi var būt saistīta ar bateriju, bet dažreiz iemesls ir programmatūra, uzlādes problēma vai mitruma bojājums. Tāpēc pirms remonta ir svarīgi pārbaudīt ierīci, nevis automātiski mainīt bateriju.' },
    ],
  },
  ru: {
    eyebrow: 'Объяснение мастера',
    titleStart: 'Что означают разные',
    titleAccent: 'симптомы батареи iPhone?',
    intro: 'Не каждая проблема с зарядкой означает, что батарею нужно сразу менять. Симптомы помогают понять, больше ли неисправность похожа на износ батареи, повреждение разъёма зарядки или другую ошибку устройства.',
    adviceLabel: 'Рекомендация',
    items: [
      { title: 'Телефон быстро разряжается', description: 'Если iPhone быстро разряжается даже после полной зарядки, причиной часто бывает износ батареи. Особенно это заметно на старых моделях и телефонах, которые интенсивно используют для навигации, видео, игр или интернета.', advice: 'Если время работы батареи внезапно заметно сократилось, стоит проверить и батарею, и фоновые программные процессы.' },
      { title: 'iPhone выключается, хотя заряд ещё есть', description: 'Если телефон выключается при оставшихся процентах или перезагружается под нагрузкой, батарея может больше не обеспечивать необходимую мощность стабильно. В таких случаях замена батареи часто помогает восстановить стабильную работу.' },
      { title: 'Батарея вздулась', description: 'Если экран или корпус начинает приподниматься, между деталями появляется щель или телефон деформирован, батарея могла вздуться. Телефон нельзя сдавливать, нагревать, прокалывать или продолжать интенсивно использовать.', advice: 'При вздутии батареи лучше прекратить использование и как можно скорее принести устройство в сервис. Вздутая батарея может повредить экран, корпус и другие внутренние детали.' },
      { title: 'Телефон нагревается и быстро разряжается', description: 'Нагрев вместе с быстрым разрядом может быть связан с батареей, но причиной также бывает программное обеспечение, проблема зарядки или повреждение влагой. Поэтому перед ремонтом важно проверить устройство, а не менять батарею автоматически.' },
    ],
  },
};

const ICONS = [LuCircleAlert, LuInfo, LuShieldAlert, LuTouchpadOff];

export default function IphoneScreenDamageGuide({ locale = 'lv', variant = 'iphone-screen' }) {
  const source = variant === 'iphone-battery' ? BATTERY_CONTENT : CONTENT;
  const content = source[locale] || source.lv;

  return (
    <section className={s.section} aria-labelledby="iphone-screen-damage-title">
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.eyebrow}>{content.eyebrow}</span>
          <h2 id="iphone-screen-damage-title">
            {content.titleStart} <em>{content.titleAccent}</em>
          </h2>
          <p>{content.intro}</p>
        </header>

        <div className={s.list}>
          {content.items.map((item, index) => {
            const Icon = ICONS[index];

            return (
              <article className={s.item} key={item.title}>
                <span className={s.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={s.icon} aria-hidden="true">
                  <Icon />
                </span>
                <div className={s.copy}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.advice && (
                    <p className={s.advice}>
                      <strong>{content.adviceLabel}:</strong> {item.advice}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
