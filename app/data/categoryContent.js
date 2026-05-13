// /data/categoryContent.js
// Dev-time content source for category pages (hubs + iPhone).
// iPhone hub keeps its long-form guide here.
// Telefonu/Planšetdatoru/Datoru hubs only provide hero for the Header.

const categoryContent = {
  // ---------------- iPhone hub (keeps the full guide) ----------------
  'iphone-remonts': {
    slug: 'iphone-remonts',

    seo: {
      title: 'iPhone remonts Rīgā | iLab',
      metaDescription:
        'iPhone remonts Rīgā - displeja, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana. Ātra diagnostika, skaidras cenas un 90 dienu garantija iLab servisā Rīgā.',
    },

    // Header content (Header owns H1, lead, CTA)
    h1: 'iPhone remonts Rīgā',
    lead:
      'iLab sertificētie meistari salabo iPhone ar dažādiem bojājumiem - no saplaisājuša ekrāna līdz mitruma radītām problēmām. Strādājam ātri, izmantojam kvalitatīvas detaļas un sniedzam garantiju visiem remontiem Rīgā.',
    scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'iphone-modeli', show: true },

    sections: {
      modelGrid: {
        heading: 'Izvēlies savu iPhone modeli',
        intro: 'Atrast modeli ir viegli - izvēlies no saraksta vai izmanto meklēšanu.',
      },

      // ---- GUIDE ----
      guide: {
        heading: 'iPhone remonta ceļvedis',
        parts: [
          {
            title: 'Simptomi un iespējamie risinājumi',
            text: `
<p>Ja iPhone sāk uzvesties neparasti, problēmas cēlonis ne vienmēr ir acīmredzams. Dažādi simptomi var norādīt uz vairākiem bojājumiem, tāpēc svarīga ir precīza diagnostika. iLab meistari palīdz noteikt īsto iemeslu un piedāvā drošu risinājumu.</p>

<p><strong>Pārkaršana vai ātra izlādēšanās</strong><br>
Ja telefons strauji sakarst vai akumulators izlādējas neparasti ātri, iemesls var būt gan nolietota baterija, gan programmatūras kļūda. Pēc pārbaudes meistars var piedāvāt <a href="/iphone-remonts/baterijas-maina">baterijas nomaiņu</a> vai programmatūras atjaunošanu, lai novērstu lieku strāvas patēriņu.</p>

<p><strong>Neuzlādējas vai uzlāde pārtrūkst</strong><br>
Ja kabelis noturas vaļīgi, uzlāde pārtrūkst vai telefons uzlādējas tikai noteiktā leņķī, bieži vainīgs ir uzlādes ports vai kontakta korozija. Šādā gadījumā palīdz <a href="/iphone-remonts/uzlades-ligzda">uzlādes ligzdas remonts</a> vai tīrīšana, dažreiz arī baterijas nomaiņa.</p>

<p><strong>Ūdens vai mitruma bojājumi</strong><br>
Pēc saskares ar šķidrumu telefons var šķist sauss no ārpuses, bet iekšpusē jau sākusies oksidācija. Jo ātrāk ierīce nonāk servisā, jo lielāka iespēja to atjaunot. Veicam <a href="/iphone-remonts/udens-bojajumu-remonts">mitruma bojājumu diagnostiku un tīrīšanu</a>, aizstājot bojātās detaļas, ja nepieciešams.</p>

<p><strong>Ekrāna vai skāriena problēmas</strong><br>
Saplaisājis vai mirgojošs ekrāns, vertikālas līnijas vai skāriena nereaģēšana var norādīt uz bojātu displeju vai savienojumu. Problēmu novērš <a href="/iphone-remonts/ekrana-maina">displeja maiņa</a> ar kvalitatīvu detaļu un garantiju.</p>

<p><strong>Kameras vai skaņas kļūmes</strong><br>
Miglains attēls, fokusēšanās problēmas vai pazudusi skaņa sarunu laikā var liecināt par mitruma ietekmi, bojātu moduli vai netīrumiem. Pēc bezmaksas diagnostikas meistars piedāvās <a href="/iphone-remonts/kamera">kameras</a> vai <a href="/iphone-remonts/skalruni-mikrofons">skaļruņu un mikrofona</a> remontu.</p>

<p><strong>Ko darīt, ja neesi pārliecināts?</strong><br>
Ja neesi drošs, kas tieši noticis, iLab piedāvā bezmaksas diagnostiku Rīgā. Pārbaudīsim ierīci un sniegsim precīzu remonta piedāvājumu ar cenu un termiņu pirms darba sākšanas.</p>
      `,
          },
          {
            title: 'Cik tas ilgst un ko sagaidīt',
            text: `
<p>Vairumu iPhone remontu iespējams paveikt tajā pašā dienā - piemēram, <a href="/iphone-remonts/ekrana-maina">displeja maiņa</a> vai <a href="/iphone-remonts/baterijas-maina">baterijas nomaiņa</a> parasti aizņem 1–3 stundas. Pirms darba sākšanas meistars veic diagnostiku un informē par aptuveno izpildes laiku.</p>

<p>Ja bojājums ir sarežģītāks (piemēram, ūdens bojājums vai mātesplates defekts), serviss informē par nepieciešamo laiku un detaļu pieejamību. Cenu un termiņu vienmēr saskaņojam pirms darba uzsākšanas, tāpēc klients zina, ko sagaidīt.</p>

<p>Remonta gaitā varat sekot līdzi statusam vai saņemt paziņojumu, kad ierīce ir gatava. Mērķis - nodrošināt ātru, caurspīdīgu un drošu iPhone remontu Rīgā.</p>
      `,
          },
          {
            title: 'Detaļas: oriģinālas vai OEM',
            text: `
<p>iLab serviss piedāvā gan oriģinālās Apple detaļas, gan augstas kvalitātes OEM rezerves daļas. Izvēle tiek veikta kopā ar klientu, balstoties uz konkrētā modeļa īpatnībām, cenu un garantijas nosacījumiem.</p>

<p>Oriģinālās detaļas nodrošina maksimālu saderību, savukārt OEM alternatīvas bieži ir ekonomiski izdevīgākas, nezaudējot kvalitāti. Pēc katra remonta sniedzam 90 dienu garantiju gan detaļām, gan darbam.</p>

<p>Neatkarīgi no izvēles, katru iPhone pēc remonta testējam - pārbaudām ekrāna krāsas, skārienjutību, baterijas darbību un uzlādes ātrumu.</p>
      `,
          },
          {
            title: 'Datu drošība un sagatavošanās remontam',
            text: `
<p>Pirms ierīces nodošanas servisā iesakām izveidot datu rezerves kopiju iCloud vai iTunes vidē. iLab meistari ievēro stingrus datu drošības principus - mēs nepiekļūstam personīgajai informācijai un apstrādājam datus tikai remonta vajadzībām.</p>

<p>Ja ierīce ir aizsargāta ar paroli, Face ID vai Touch ID, meistars ieteiks, kā rīkoties, lai pārbaude būtu iespējama. iLab serviss Rīgā nodrošina, ka katrs iPhone tiek apstrādāts droši, konfidenciāli un atbildīgi.</p>
      `,
          },
          {
            title: 'Kur nodot iPhone remontam',
            text: `
<p>iLab servisa centri atrodas Rīgā - <strong>T/C Domina Shopping</strong> un <strong>T/C Spice Life</strong>. Abu salonu darbnīcas piedāvā pilnu pakalpojumu klāstu - sākot no diagnostikas līdz jebkura sarežģītības pakāpes remontam.</p>

<p>Ierīci var nodot klātienē vai nosūtīt pa pastu, ja nevari atbraukt personīgi. Visus kontaktus, darba laikus un atrašanās vietas atradīsi sadaļā <a href="/kontakti">Kontakti</a> vai <a href="/servisa-centri">Servisa centri</a>.</p>

<p>Neatkarīgi no tā, vai nepieciešama <a href="/iphone-remonts/ekrana-maina">displeja maiņa</a>, <a href="/iphone-remonts/baterijas-maina">baterijas nomaiņa</a> vai <a href="/iphone-remonts/udens-bojajumu-remonts">ūdens bojājumu diagnostika</a> - mūsu sertificētie meistari palīdzēs atjaunot Tavu iPhone tajā pašā dienā.</p>
      `,
          },
        ],
      }
    },

    show: {
      popularRepairs: true,
      guide: true,   // ← ensure the guide renders
      process: true,
      trust: true,
      faq: true,
    },
  },

  // ---------------- Telefonu remonts hub (Header hero only) ----------------
  'telefonu-remonts': {
    hero: {
      h1: 'Telefonu remonts',
      lead:
        'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas saskaņojam pirms darba; biežākos darbus paveicam tajā pašā dienā.',
      scrollCta: { label: 'Skatīt zīmolus un modeļus', targetId: 'brand-list' },
    },
  },

  // ------------- Planšetdatoru remonts hub (Header hero only) -------------
  'plansetdatoru-remonts': {
    hero: {
      h1: 'Planšetdatoru remonts',
      lead:
        'Ekrāni, baterijas, uzlādes ligzdas, kameras un citi planšetdatoru remonti. Ātra diagnostika, godīgas cenas, garantija.',
      scrollCta: { label: 'Skatīt zīmolus un modeļus', targetId: 'brand-list' },
    },
  },

  // ---------------- Datoru remonts hub (Header hero only) ------------------
  'datoru-remonts': {
    hero: {
      h1: 'Datoru remonts',
      lead:
        'Portatīvo un stacionāro datoru remonts - diagnostika, ekrāns, tastatūras, mātesplate, uzlāde, SSD/RAM uzlabošana, remonts pēc mitruma. Ātra diagnostika un 90 dienu garantija.',
      scrollCta: { label: 'Skatīt zīmolus un pakalpojumus', targetId: 'brand-list' },
    },
  },

  'dyson-remonts': {
    slug: 'dyson-remonts',

    // Header content (Header owns H1, lead; no scrollCta for this category)
    h1: 'Dyson remonts Rīgā',
    lead:
      'iLab meistari salabo Dyson bezvadu putekļsūcējus - veicam motora un baterijas maiņu, filtru un blīvējumu nomaiņu, dziļo tīrīšanu un diagnostiku. Ātra pārbaude pirms darba, skaidras izmaksas un 90 dienu garantija.',
  },
};

export default categoryContent;
