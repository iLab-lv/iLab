// app/(site)/iphone-remonts/page.jsx
import PageHeader from '@ui/page-header/PageHeader';
import ModelGrid from '@components/model-grid/ModelGrid';
import s from './IphoneRemonts.module.scss';

// Basic SEO (can be extended later with JSON-LD)
export const metadata = {
  title: 'iPhone remonts Rīgā un visā Latvijā | iLab',
  description:
    'iPhone ekrāna un baterijas maiņa, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, garantija. Piesaki remontu iLab!',
};

const LEAD =
  'iLab sertificētie meistari salabo iPhone gan ar tipiskiem, gan sarežģītiem bojājumiem — no saplaisājuša ekrāna līdz mitruma radītām problēmām. Strādājam ātri, izmantojam kvalitatīvas detaļas un sniedzam garantiju visā Latvijā.';

// TODO: replace with your real devices dataset import/filter for iPhone models
const devices = [];
const baseHref = '/iphone-remonts'; // easy to switch later if you decide on another URL scheme

export default function IphoneRemontsPage() {
  return (
    <>
      <PageHeader
        title="iPhone remonts"
        lead={LEAD}
        scrollCta={{ label: 'Izvēlies modeli', targetId: 'iphone-modeli' }}
      />

      {/* MODEL GRID */}
      <section id="iphone-modeli" className={s.anchorTarget} aria-labelledby="iphone-modeli-h2">
        <div className={s.container}>
          <h2 id="iphone-modeli-h2" className={s.h2}>
            Izvēlies savu iPhone modeli
          </h2>
          <p className={s.intro}>
            Atrast modeli ir viegli — izvēlies no saraksta vai izmanto meklēšanu.
          </p>

          <ModelGrid devices={devices} baseHref={baseHref} />
        </div>
      </section>

      {/* POPULAR REPAIRS */}
      <section className={s.section} aria-labelledby="popular-repairs-h2">
        <div className={s.container}>
          <h2 id="popular-repairs-h2" className={s.h2}>
            Populārākie iPhone remonti
          </h2>
          <ul className={s.list}>
            <li>
              <strong>Ekrāna un stikla maiņa</strong> — plaisas, tumši plankumi, nereaģē skāriens.
            </li>
            <li>
              <strong>Akumulatora maiņa</strong> — strauji krīt uzlāde, izslēdzas pie 10–20%.
            </li>
            <li>
              <strong>Uzlādes ligzdas remonts</strong> — nenoturas kabelis, lēna uzlāde, ātrā uzlāde nestrādā.
            </li>
            <li>
              <strong>Kameras remonts</strong> — miglaini attēli, fokusēšanās problēmas.
            </li>
            <li>
              <strong>Skaļruņi un mikrofons</strong> — klusa skaņa, krakšķi, sarunas laikā nedzird.
            </li>
            <li>
              <strong>Ūdens bojājumi</strong> — diagnostika un atjaunošana, ja tas iespējams.
            </li>
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <h2 id="process-h2" className={s.h2}>Kā notiek remonts</h2>
          <p className={s.paragraph}>
            Diagnostika → Cena un termiņš → Remonts → Garantija. Saskaņojam izmaksas pirms darba uzsākšanas,
            datus apstrādājam droši, pēc remonta saņem garantiju.
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section className={s.section} aria-labelledby="trust-h2">
        <div className={s.container}>
          <h2 id="trust-h2" className={s.h2}>Kāpēc iLab</h2>
          <p className={s.paragraph}>
            Sertificēti meistari · Kvalitatīvas detaļas · Ātri termiņi · Garantija · Caurspīdīga saziņa
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <h2 id="faq-h2" className={s.h2}>Biežāk uzdotie jautājumi</h2>
          <dl className={s.faq}>
            <div>
              <dt>Cik ilgi ilgst iPhone ekrāna maiņa?</dt>
              <dd>Bieži 1–3 stundas atkarībā no modeļa un noslodzes.</dd>
            </div>
            <div>
              <dt>Vai mani dati saglabāsies?</dt>
              <dd>Darām visu iespējamo; pirms remonta iesakām dublējumu.</dd>
            </div>
            <div>
              <dt>Vai detaļām ir garantija?</dt>
              <dd>Jā, gan detaļām, gan darbam.</dd>
            </div>
            <div>
              <dt>Vai pieejamas oriģinālas detaļas?</dt>
              <dd>Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.</dd>
            </div>
            <div>
              <dt>Vai varu saņemt aptuveno cenu pirms remonta?</dt>
              <dd>Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.</dd>
            </div>
            <div>
              <dt>Vai strādājat visā Latvijā?</dt>
              <dd>Jā; tuvāko servisu atradīsi sadaļā “Servisa centri”.</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
