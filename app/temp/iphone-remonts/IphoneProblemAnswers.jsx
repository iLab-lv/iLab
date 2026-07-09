import {
  LuBatteryWarning,
  LuCamera,
  LuDroplets,
  LuPlugZap,
  LuPower,
  LuSmartphone,
  LuVolume2,
} from 'react-icons/lu';

import s from './IphoneProblemAnswers.module.scss';

const problems = [
  {
    icon: LuPlugZap,
    title: 'iPhone nelādējas',
    shortAnswer:
      'Vispirms jāpārbauda uzlādes ligzda un baterija - ne vienmēr uzreiz jāmaina detaļa.',
    cause:
      'Netīra uzlādes ligzda, bojāts kabelis, nolietota baterija vai barošanas ķēdes problēma.',
    action:
      'Pārbaudām uzlādes ligzdu, bateriju un uzlādes darbību. Dažreiz pietiek ar tīrīšanu, bet bojājuma gadījumā nepieciešama detaļas maiņa vai diagnostika.',
    next: 'Izvēlies modeli zemāk vai atnes iPhone uz diagnostiku.',
  },
  {
    icon: LuBatteryWarning,
    title: 'iPhone ātri izlādējas',
    shortAnswer:
      'Visbiežāk jāpārbauda baterijas stāvoklis, bet reizēm problēmu rada uzlāde, programmatūra vai mitruma bojājums.',
    cause:
      'Nolietota baterija, programmatūras slodze, uzlādes problēma vai mitruma bojājums.',
    action:
      'Pārbaudām baterijas stāvokli un uzlādes darbību, pēc tam iesakām baterijas maiņu vai dziļāku pārbaudi.',
    next: 'Izvēlies savu iPhone modeli, lai redzētu baterijas maiņas cenu.',
  },
  {
    icon: LuSmartphone,
    title: 'Ekrāns saplīsis vai nereaģē',
    shortAnswer:
      'Ja ekrāns ir saplaisājis, rāda līnijas vai nereaģē uz pieskārieniem, parasti nepieciešama displeja pārbaude vai maiņa.',
    cause:
      'Bojāts displejs, stikls, savienojums vai bojājums pēc kritiena.',
    action:
      'Pārbaudām attēlu, skārienjutību un displeja darbību, pēc tam piedāvājam piemērotu ekrāna maiņas risinājumu.',
    next: 'Izvēlies modeli, lai redzētu ekrāna remonta variantus un cenu.',
  },
  {
    icon: LuVolume2,
    title: 'Slikti dzird sarunas laikā',
    shortAnswer:
      'Vispirms jāpārbauda skaļruņa un mikrofona tīrība, jo dažos gadījumos pietiek ar tīrīšanu.',
    cause:
      'Netīrs skaļruņa vai mikrofona sietiņš, bojāts skaļrunis, mikrofons vai savienojums.',
    action:
      'Vispirms pārbaudām, vai palīdz tīrīšana. Ja problēma saglabājas, pārbaudām detaļas un iesakām remontu.',
    next: 'Atnes iPhone pārbaudei vai izvēlies modeli cenu apskatei.',
  },
  {
    icon: LuCamera,
    title: 'Kamera nefokusējas vai neieslēdzas',
    shortAnswer:
      'Kameras problēma var būt saistīta ar moduli, stiklu vai savienojumu, tāpēc vispirms pārbaudām kameras darbību.',
    cause:
      'Bojāts kameras modulis, stikls, savienojums vai kritiena radīts bojājums.',
    action:
      'Pārbaudām kameru, stiklu un darbību pēc remonta, lai pārliecinātos, ka kamera strādā stabili.',
    next: 'Izvēlies modeli, lai redzētu kameras remonta iespējas.',
  },
  {
    icon: LuDroplets,
    title: 'iPhone bijis ūdenī',
    shortAnswer:
      'Neuzlādē iPhone pēc mitruma; drošākais solis ir ātra diagnostika un tīrīšana.',
    cause: 'Mitrums, oksidācija vai plates bojājums.',
    action:
      'Šādos gadījumos sākam ar diagnostiku un tīrīšanu. Dažreiz nepieciešams dziļāks remonts.',
    next:
      'Neuzlādē ierīci, ja tā bijusi mitrumā. Atved to uz diagnostiku pēc iespējas ātrāk.',
  },
  {
    icon: LuPower,
    title: 'iPhone neieslēdzas',
    shortAnswer:
      'Ja iPhone neieslēdzas, vispirms nepieciešama diagnostika, jo iemesls var būt baterijā, uzlādē, mitrumā vai plates bojājumā.',
    cause:
      'Baterija, uzlādes ķēde, mitrums, kritiena bojājums vai plates problēma.',
    action:
      'Veicam diagnostiku, lai noteiktu, vai problēma ir baterijā, uzlādē, detaļās vai plates līmenī.',
    next: 'Šajā gadījumā cena nosakāma pēc diagnostikas.',
  },
];

export default function IphoneProblemAnswers() {
  return (
    <section
      className={s.section}
      aria-labelledby="iphone-problem-answers-title"
    >
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.eyebrow}>Problēmas un nākamais solis</span>

          <h2 id="iphone-problem-answers-title">
            Kas noticis ar <span>iPhone?</span>
          </h2>

          <p>
            Izvēlies situāciju, kas vislabāk atbilst tavai problēmai. Dažos
            gadījumos pietiek ar tīrīšanu, citos nepieciešama detaļas maiņa vai
            dziļāka diagnostika.
          </p>
        </div>

        <div className={s.grid}>
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <article className={s.card} key={problem.title}>
                <div className={s.cardHeader}>
                  <div className={s.iconWrap} aria-hidden="true">
                    <Icon />
                  </div>
                  <h3>{problem.title}</h3>
                </div>

                <dl className={s.answerList}>
                  <div className={s.shortAnswer}>
                    <dt>Īsā atbilde</dt>
                    <dd>{problem.shortAnswer}</dd>
                  </div>

                  <div>
                    <dt>Iespējamais iemesls</dt>
                    <dd>{problem.cause}</dd>
                  </div>

                  <div>
                    <dt>Ko darām</dt>
                    <dd>{problem.action}</dd>
                  </div>

                  <div>
                    <dt>Nākamais solis</dt>
                    <dd>{problem.next}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
