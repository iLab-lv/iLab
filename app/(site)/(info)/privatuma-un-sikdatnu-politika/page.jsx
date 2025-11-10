import React from 'react';
import Script from 'next/script';
import ConvertBand from '@sections/convert-band/ConvertBand';
import s from '@styles/Catalog.module.scss';

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'Lietošanas noteikumi un privātuma politika | iLab',
  description:
    'iLab lietošanas noteikumi, garantija, datu aizsardzība un sīkdatņu politika. Uzzini, kā tiek apstrādāti klientu dati un sniegti pakalpojumi.',
  alternates: { canonical: '/noteikumi' },
};

export default function TermsPage() {
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Lietošanas noteikumi un privātuma politika', item: `${ORIGIN}/noteikumi/` },
    ],
  };

  const tosLd = {
    '@context': 'https://schema.org',
    '@type': 'TermsOfService',
    name: 'iLab — Lietošanas noteikumi un privātuma politika',
    url: `${ORIGIN}/noteikumi/`,
    provider: { '@id': `${ORIGIN}#organization` },
    inLanguage: 'lv',
  };

  return (
    <>
      {/* JSON-LD */}
      <Script id="terms-breadcrumbs" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="terms-tos" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(tosLd)}
      </Script>

      {/* One large multi-paragraph content section (header & lead come from layout) */}
      <section className={s.section} aria-labelledby="terms-h2">
        <div className={s.container}>

          <p className={s.paragraph}>
            <strong>Pēdējo reizi atjaunināts:</strong> 2025-11-05<br />
            <strong>Pakalpojuma sniedzējs:</strong> SIA “iLab” · Reģ. nr. 40203288307<br />
            <strong>Adrese:</strong> Ieriķu iela 3 (Domina Shopping), Rīga<br />
            <strong>Papildu filiāle:</strong> Spice Home — Jaunmoku iela 13, Rīga<br />
            <strong>E-pasts:</strong> info@ilab.lv | <strong>Tālrunis:</strong> 23370088
          </p>

          <h3 className={s.h3}>1. Vispārīgā informācija</h3>
          <p className={s.paragraph}>
            Šie noteikumi regulē vietnes <strong>www.ilab.lv</strong> (“Vietne”) lietošanu un pakalpojumus,
            ko sniedz SIA “iLab” servisa centros Rīgā. Apmeklējot vai izmantojot Vietni, lietotājs piekrīt
            šiem noteikumiem, kā arī sīkdatņu un privātuma politikai.
          </p>

          <h3 className={s.h3}>2. Pakalpojuma raksturojums</h3>
          <p className={s.paragraph}>
            iLab nodrošina mobilo tālruņu, planšetdatoru, portatīvo datoru un Dyson ierīču diagnostiku
            un remontu. Visi darbi tiek veikti uz vietas mūsu servisa centros, izmantojot kvalitatīvas
            rezerves daļas un pārbaudītas metodes. Vietne kalpo informatīviem nolūkiem — tajā netiek
            veikti tiešsaistes pirkumi vai maksājumi.
          </p>

          <h3 className={s.h3}>3. Cenas un diagnostika</h3>
          <p className={s.paragraph}>
            Cenas, kas norādītas Vietnē, ir informatīvas un var atšķirties atkarībā no ierīces modeļa
            un bojājuma rakstura. Precīzas izmaksas un remonta ilgums tiek apstiprināts pēc diagnostikas.
            Diagnostika parasti ir bez maksas, ja klients izvēlas turpināt remontu.
          </p>

          <h3 className={s.h3}>4. Garantijas noteikumi</h3>
          <p className={s.paragraph}>
            Standarta garantija: <strong>90 dienas</strong> attiecībā uz nomainītajām detaļām un veiktajiem
            remontdarbiem, ja kvītī nav norādīts citādi. Garantija attiecas tikai uz defektiem,
            kas radušies detaļas vai darba kvalitātes dēļ. Garantija neattiecas uz bojājumiem, ko
            izraisījis mitrums, trieciens, mehānisks vai lietotāja radīts bojājums, vai ja ierīce tikusi
            atvērta citā servisā. Garantijas remontam nepieciešams uzrādīt iLab remonta kvīti.
          </p>
          <p className={s.paragraph}>
            Pirms remonta ieteicams izveidot datu rezerves kopiju; iLab neatbild par datu zudumu remonta laikā.
          </p>

          <h3 className={s.h3}>5. Klientu datu apstrāde un konfidencialitāte</h3>
          <p className={s.paragraph}>
            Klienta sniegtie dati (vārds, telefons, e-pasts, ierīces informācija) tiek izmantoti tikai
            saziņai un remonta organizēšanai. Dati netiek nodoti trešajām personām, izņemot gadījumus,
            kad to pieprasa likums. Sīkāka informācija atrodama sadaļā “Privātuma politika”.
          </p>

          <h3 className={s.h3}>6. Sīkdatņu un analītikas politika</h3>
          <p className={s.paragraph}>
            Vietnē tiek izmantotas nepieciešamās sīkdatnes, kas nodrošina lapas pamatfunkcionalitāti
            (valodas izvēli, sesijas stabilitāti), kā arī analītiskās sīkdatnes, kas palīdz uzlabot
            lietošanas pieredzi. Analītika tiek veikta, izmantojot Google Analytics 4, un dati tiek
            apstrādāti anonīmi. Lietotājs jebkurā brīdī var dzēst vai bloķēt sīkdatnes pārlūkprogrammā.
            Turpinot izmantot Vietni, lietotājs piekrīt sīkdatņu izmantošanai atbilstoši šiem noteikumiem.
          </p>

          <h3 className={s.h3}>7. Intelektuālais īpašums</h3>
          <p className={s.paragraph}>
            Visi teksti, attēli, logotipi un dizaina elementi Vietnē ir SIA “iLab” īpašums un aizsargāti
            ar autortiesībām. Tos nedrīkst kopēt, reproducēt vai izplatīt bez rakstiskas atļaujas.
          </p>

          <h3 className={s.h3}>8. Atbildības ierobežojums</h3>
          <p className={s.paragraph}>
            Lai gan iLab cenšas nodrošināt aktuālu un precīzu informāciju, uzņēmums negarantē, ka visa
            Vietnē esošā informācija vienmēr ir pilnīga vai aktuāla. iLab neuzņemas atbildību par tiešiem
            vai netiešiem zaudējumiem, kas radušies Vietnes izmantošanas vai tehnisku traucējumu dēļ.
          </p>

          <h3 className={s.h3}>9. Noteikumu grozījumi</h3>
          <p className={s.paragraph}>
            iLab patur tiesības jebkurā laikā mainīt šos noteikumus bez iepriekšēja brīdinājuma.
            Aktuālā versija vienmēr pieejama šajā lapā, un tās spēkā stāšanās datums ir norādīts augšpusē.
          </p>

          <h3 className={s.h3}>10. Kontakti</h3>
          <p className={s.paragraph}>
            SIA “iLab” · Reģ. nr. 40203288307<br />
            E-pasts: info@ilab.lv | Tālrunis: 23370088<br />
            Adrese: Ieriķu iela 3 (Domina Shopping), Rīga<br />
            Darba laiks: P.–Sv. 10:00–21:00<br />
            Papildu filiāle: Spice Home — Jaunmoku iela 13, Rīga
          </p>
        </div>
      </section>

      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
