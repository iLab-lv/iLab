import s from './page.module.scss';

export const metadata = {
  title: 'iPhone remonts Rīgā',
};

const repairs = [
  'Ekrāna maiņa',
  'Akumulatora maiņa',
  'Uzlāde & savienojumi',
  'Kamera & stikls',
  'Mitruma bojājumi',
];

export default function IphoneRemontsLandingPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.heroContent}>
            <div className={s.trust}>
              ★★★★★ 4.9 Google · 800+ atsauksmes
            </div>

            <h1>iPhone remonts Rīgā</h1>

            <p className={s.subtitle}>
              Ekrāna, baterijas un citu iPhone bojājumu remonts
              iLab servisa centros.
            </p>

            <div className={s.heroButtons}>
              <button>Sazināt cenu</button>
              <button>Pieteikt remontu</button>
            </div>
          </div>
        </div>
      </section>

      <section className={s.repairsNav}>
        <div className={s.container}>
          <div className={s.cards}>
            {repairs.map((repair) => (
              <a
                key={repair}
                href={`#${repair}`}
                className={s.card}
              >
                <span>{repair}</span>
                <small>no 79€</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      {repairs.map((repair, index) => (
        <section
          key={repair}
          id={repair}
          className={s.repairSection}
        >
          <div className={s.container}>
            <div className={s.repairGrid}>
              <div className={s.repairContent}>
                <h2>{repair}</h2>

                <p>
                  Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Remonts iespējams tajā pašā dienā.
                </p>

                <ul>
                  <li>Face ID saglabāšana</li>
                  <li>90 dienu garantija</li>
                  <li>20–40 min remonts</li>
                </ul>

                <div className={s.priceBox}>
                  <div>iPhone 13 — no 89€</div>
                  <div>iPhone 14 Pro — no 149€</div>
                  <div>iPhone 15 Pro — no 189€</div>
                </div>
              </div>

              <div className={s.visual}>
                <div className={s.placeholder}>
                  VISUAL {index + 1}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}