import Link from 'next/link';
import {
  LuCircuitBoard,
  LuSearch,
  LuSparkles,
  LuWrench,
} from 'react-icons/lu';

import s from './IphoneRepairDecisionSection.module.scss';

const cards = [
  {
    icon: LuSparkles,
    titleStart: 'Kad pietiek ar',
    titleAccent: 'tīrīšanu',
    body:
      'Tīrīšana var palīdzēt, ja problēmu rada putekļi vai netīrumi uzlādes ligzdā, skaļrunī vai mikrofona sietiņā.',
    examples: [
      'uzlāde pārtrūkst',
      'skaņa kļuvusi klusa',
      'kabelis neturas ligzdā',
    ],
  },
  {
    icon: LuWrench,
    titleStart: 'Kad jāmaina',
    titleAccent: 'detaļas maiņa',
    body:
      'Detaļas maiņa parasti nepieciešama, ja ekrāns, baterija, kamera, uzlādes ligzda vai cits komponents ir fiziski bojāts, nolietots vai nestrādā stabili.',
    examples: [
      'saplaisājis ekrāns',
      'nolietota baterija',
      'bojāta kamera vai ligzda',
    ],
  },
  {
    icon: LuSearch,
    titleStart: 'Kad vajadzīga',
    titleAccent: 'diagnostika',
    body:
      'Diagnostika nepieciešama, ja bojājuma iemesls nav skaidrs, iPhone neieslēdzas, bijis mitrumā, restartējas vai darbojas nestabili.',
    examples: [
      'iPhone neieslēdzas',
      'bijis saskarē ar ūdeni',
      'pārkarst vai restartējas',
    ],
  },
];

export default function IphoneRepairDecisionSection() {
  return (
    <section
      className={s.section}
      aria-labelledby="iphone-repair-decision-title"
    >
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.eyebrow}>Lēmums pēc pārbaudes</span>

          <h2 id="iphone-repair-decision-title">
            Tīrīšana, detaļas maiņa vai <span>diagnostika?</span>
          </h2>

          <p>
            Ne katrs bojājums nozīmē detaļas maiņu. Pēc pārbaudes
            paskaidrojam, vai problēmu var atrisināt ar tīrīšanu, detaļas
            nomaiņu vai nepieciešama dziļāka diagnostika.
          </p>
        </div>

        <div className={s.grid}>
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article className={s.card} key={card.titleAccent}>
                <div className={s.iconWrap} aria-hidden="true">
                  <Icon />
                </div>

                <div className={s.copy}>
                  <h3>
                    {card.titleStart} <span>{card.titleAccent}</span>
                  </h3>

                  <p>{card.body}</p>

                  <ul>
                    {card.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className={s.cta}>
          <div className={s.ctaIcon} aria-hidden="true">
            <LuCircuitBoard />
          </div>

          <div>
            <h3>Vispirms pārbaudām, pēc tam saskaņojam</h3>
            <p>
              Vispirms pārbaudām ierīci, pēc tam saskaņojam risinājumu, cenu
              un izpildes termiņu.
            </p>
          </div>

          <Link className={s.ctaLink} href="/kontakti">
            Sazināties ar servisu
          </Link>
        </div>
      </div>
    </section>
  );
}
