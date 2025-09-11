'use client';

import s from './HomePage.module.scss';
import Button from '../components/button/Button';
import LocationsMap from '../components/locations-map/LocationsMap';

export default function HomePage() {
  const onHeroScrollClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('services');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className={s.page}>
      {/* HERO */}
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={s.container}>
          <h1 id="hero-title" className={s.heading}>
            Ātrs mobilo ierīču servisa centrs
          </h1>

          <p className={s.sub}>
            Remonts tajā pašā dienā. 90&nbsp;dienu garantija. Divas filiāles&nbsp;Rīgā: Domina un Spice Home.
          </p>

          {/* Google rating micro-badge → scroll to reviews */}
          <div className={s.rating}>
            <a href="#reviews" className={s.ratingBadge} aria-label="Google vērtējums 4.9 no 5, 230 atsauksmes">
              <span className={s.star} aria-hidden="true">★</span>
              <span className={s.ratingText}>4.9/5 · 230 atsauksmes · Google</span>
            </a>
          </div>

          {/* Content CTA (anchor → smooth scroll) */}
          <div className={s.ctaRow}>
            <a
              href="#services"
              onClick={onHeroScrollClick}
              className={s.linkButton}
              aria-label="Izvēlies ierīci"
            >
              Izvēlies ierīci
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES — full block */}
      <section id="services" className={`${s.section} ${s.services}`} aria-labelledby="services-title">
        <div className={s.container}>
          <h2 id="services-title" className={s.sectionTitle}>Mūsu pakalpojumi</h2>

          {/* APPLE — full width with SEO intro + clean right-aligned links */}
          <article className={s.appleBlock} aria-labelledby="apple-title">
            <div className={s.appleContent}>
              <h3 id="apple-title" className={s.blockTitle}>Apple ierīču remonts</h3>
              <p className={s.blockIntro}>
                Apple serviss Rīgā — <a href="/iphone-remonts">iPhone remonts</a>,
                <a href="/plansetdatoru-remonts#ipad"> iPad remonts</a> un
                <a href="/datoru-remonts#macbook"> MacBook remonts</a>. Veicam ekrāna un baterijas maiņu,
                uzlādes porta remontu un diagnostiku tajā pašā dienā (atkarībā no modeļa).
                Izmantojam kvalitatīvas detaļas un nodrošinām <strong>90&nbsp;dienu garantiju</strong>.
                Populārākie pakalpojumi: ekrāna maiņa, baterijas maiņa un uzlādes porta remonts.
              </p>
            </div>

            <ul className={s.appleLinks} role="list" aria-label="Apple saīsnes">
              <li>
                <a className={s.appleLink} href="/iphone-remonts">iPhone remonts</a>
              </li>
              <li>
                <a className={s.appleLink} href="/plansetdatoru-remonts#ipad">iPad remonts</a>
              </li>
              <li>
                <a className={s.appleLink} href="/datoru-remonts#macbook">MacBook remonts</a>
              </li>
            </ul>
          </article>

          {/* ANDROID — full width with intro + 3 brand tiles (logo placeholder + 2 links) */}
          <article className={s.androidBlock} aria-labelledby="android-title">
            <h3 id="android-title" className={s.blockTitle}>Android — Telefonu un planšetdatoru remonts</h3>
            <p className={s.blockIntro}>
              Servisējam <strong>Samsung</strong>, <strong>Xiaomi</strong> un <strong>Huawei</strong> ierīces Rīgā.
              Veicam ekrāna maiņu, baterijas maiņu un uzlādes porta remontu tajā pašā dienā (atkarībā no modeļa),
              ar <strong>90&nbsp;dienu garantiju</strong>. Skati arī lapas <a href="/telefonu-remonts">telefonu remonts</a> un
              <a href="/plansetdatoru-remonts"> planšetdatoru remonts</a>.
            </p>

            <ul className={s.brandGrid} role="list">
              {/* Samsung */}
              <li className={s.brandTile}>
                <div className={s.brandLogo} aria-hidden="true">LOGO</div>
                <a className={s.brandTitleLink} href="/telefonu-remonts/samsung">Samsung</a>
                <div className={s.brandLinks}>
                  <a href="/telefonu-remonts/samsung">Samsung telefonu remonts</a>
                  <span aria-hidden="true">·</span>
                  <a href="/plansetdatoru-remonts#samsung">Samsung planšetdatoru remonts</a>
                </div>
              </li>

              {/* Xiaomi */}
              <li className={s.brandTile}>
                <div className={s.brandLogo} aria-hidden="true">LOGO</div>
                <a className={s.brandTitleLink} href="/telefonu-remonts/xiaomi">Xiaomi</a>
                <div className={s.brandLinks}>
                  <a href="/telefonu-remonts/xiaomi">Xiaomi telefonu remonts</a>
                  <span aria-hidden="true">·</span>
                  <a href="/plansetdatoru-remonts#xiaomi">Xiaomi planšetdatoru remonts</a>
                </div>
              </li>

              {/* Huawei */}
              <li className={s.brandTile}>
                <div className={s.brandLogo} aria-hidden="true">LOGO</div>
                <a className={s.brandTitleLink} href="/telefonu-remonts/huawei">Huawei</a>
                <div className={s.brandLinks}>
                  <a href="/telefonu-remonts/huawei">Huawei telefonu remonts</a>
                  <span aria-hidden="true">·</span>
                  <a href="/plansetdatoru-remonts#huawei">Huawei planšetdatoru remonts</a>
                </div>
              </li>
            </ul>

            <div className={s.androidMore}>
              <a className={s.cardLink} href="/telefonu-remonts">Skatīt visus zīmolus →</a>
            </div>
          </article>

          {/* Two half-width blocks */}
          <div className={s.twoUp}>
            <article className={s.halfCard} aria-labelledby="pc-title">
              <h3 id="pc-title" className={s.cardTitle}>Datoru remonts</h3>
              <p className={s.cardText}>
                <a href="/datoru-remonts">Datoru remonts Rīgā</a> — portatīvie un galda datori.
                Veicam klaviatūras un ekrāna maiņu, baterijas nomaiņu, dzesēšanas sistēmas tīrīšanu/termopastu,
                SSD uzstādīšanu un OS pārinstalāciju. Apkalpojam arī
                <a href="/datoru-remonts#macbook"> MacBook</a>. Tajā pašā dienā (atkarībā no modeļa) un ar
                90&nbsp;dienu garantiju.
              </p>
              <a className={s.cardLink} href="/datoru-remonts">Apskatīt →</a>
            </article>

            <article className={s.halfCard} aria-labelledby="dyson-title">
              <h3 id="dyson-title" className={s.cardTitle}>Dyson remonts</h3>
              <p className={s.cardText}>
                <a href="/dyson-remonts">Dyson remonts Rīgā</a> — diagnostika, filtru un akumulatoru maiņa,
                motora un elektronikas remonts, uzlādes un sūkšanas defektu novēršana, pilna tīrīšana pēc
                garantijas beigām. Izmantojam kvalitatīvas detaļas un nodrošinām 90&nbsp;dienu garantiju.
              </p>
              <a className={s.cardLink} href="/dyson-remonts">Apskatīt →</a>
            </article>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className={`${s.section} ${s.why}`} aria-labelledby="why-title">
        <div className={s.container}>
          <h2 id="why-title" className={s.sectionTitle}>Kāpēc iLab?</h2>
          <p className={s.copy}>
            Uzticami remonti, caurspīdīgas cenas un ātrs apgrozījums no sertificētiem tehniķiem.
          </p>
          <ul className={s.uspRow} role="list">
            <li className={s.uspChip}>90 dienu garantija</li>
            <li className={s.uspChip}>Tajā pašā dienā</li>
            <li className={s.uspChip}>Sertificēti meistari</li>
            <li className={s.uspChip}>Apple / Samsung / Huawei ekspertīze</li>
          </ul>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className={`${s.section} ${s.locations}`} aria-labelledby="locations-title">
        <div className={s.container}>
          <h2 id="locations-title" className={s.sectionTitle}>Servisa centri Rīgā</h2>

          <LocationsMap
            images={{
              alt: 'Rīga — iLab lokācijas',
              small: '/images/map-1024.webp',
              medium: '/images/map-1600.webp',
              large: '/images/map-3000.webp',
            }}
            pins={[
              { id: 'domina', label: 'Domina Shopping', xPct: 68, yPct: 40, gmaps: 'https://maps.google.com/?q=Ieriķu iela 3 Rīga', tel: 'tel:23370088' },
              { id: 'spice', label: 'Spice Home', xPct: 30, yPct: 60, gmaps: 'https://maps.google.com/?q=Jaunmoku iela 13 Rīga', tel: 'tel:20887787' },
            ]}
            locations={[
              {
                id: 'domina',
                title: 'Domina Shopping',
                address: 'Ieriķu iela 3, Rīga',
                hours: 'Mon–Sun 10:00–21:00',
                tel: 'tel:23370088',
                gmaps: 'https://maps.google.com/?q=Ieriķu iela 3 Rīga',
              },
              {
                id: 'spice',
                title: 'Spice Home',
                address: 'Jaunmoku iela 13, Rīga',
                hours: 'Mon–Sat 10:00–21:00, Sun 10:00–20:00',
                tel: 'tel:20887787',
                gmaps: 'https://maps.google.com/?q=Jaunmoku iela 13 Rīga',
              },
            ]}
          />

        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className={`${s.section} ${s.reviews}`} aria-labelledby="reviews-title">
        <div className={s.container}>
          <h2 id="reviews-title" className={s.sectionTitle}>Klientu atsauksmes</h2>

          <ul className={s.reviewGrid} role="list">
            <li className={s.reviewCard}>
              <div className={s.reviewStars} aria-hidden="true">★★★★★</div>
              <p className={s.reviewText}>“Ļoti ātra un profesionāla apkalpošana. Ekrāns nomainīts 40 minūtēs.”</p>
              <div className={s.reviewMeta}>— Līga K., iPhone 13</div>
            </li>
            <li className={s.reviewCard}>
              <div className={s.reviewStars} aria-hidden="true">★★★★★</div>
              <p className={s.reviewText}>“Nomainīja bateriju tajā pašā dienā. Cena tāda, kā solīja.”</p>
              <div className={s.reviewMeta}>— Mārtiņš P., Samsung</div>
            </li>
            <li className={s.reviewCard}>
              <div className={s.reviewStars} aria-hidden="true">★★★★★</div>
              <p className={s.reviewText}>“Forša attieksme un 90 dienu garantija iedod mieru. Iesaku!”</p>
              <div className={s.reviewMeta}>— Kristīne S., iPad</div>
            </li>
          </ul>

          <div className={s.reviewsCta}>
            <a
              className={s.reviewsLink}
              href="https://www.google.com/search?q=iLab+R%C4%ABga+atsauksmes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Skatīt Google atsauksmes →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${s.section} ${s.faq}`} aria-labelledby="faq-title">
        <div className={s.container}>
          <h2 id="faq-title" className={s.sectionTitle}>Biežāk uzdotie jautājumi</h2>
          <div className={s.faqList}>
            <details className={s.faqItem}>
              <summary>Cik maksā iPhone ekrāna maiņa?</summary>
              <p>Cena atkarīga no modeļa. Skati <a href="/iphone-remonts">iPhone remonts</a> sadaļu.</p>
            </details>
            <details className={s.faqItem}>
              <summary>Cik ilgi aizņem baterijas maiņa?</summary>
              <p>Parasti 30–120 min tajā pašā dienā, atkarībā no modeļa un detaļu pieejamības.</p>
            </details>
            <details className={s.faqItem}>
              <summary>Vai dodiet garantiju uz remontu?</summary>
              <p>Jā, 90 dienu garantija visiem remontdarbiem (izņemot ūdens bojājumu diagnostiku).</p>
            </details>
          </div>
        </div>
      </section>

      {/* CONVERT */}
      <section className={`${s.section} ${s.convert}`} aria-labelledby="convert-title">
        <div className={s.container}>
          <h2 id="convert-title" className={s.convertTitle}>Vajadzīga palīdzība?</h2>
          <div className={s.ctaRow}>
            <Button variant="secondary" size="md" href="/contact">Sazināties ar meistaru</Button>
            <Button variant="primary" size="md" href="/pieraksties">Pieraksties uz remontu</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
