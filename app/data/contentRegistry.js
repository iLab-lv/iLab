// /data/contentRegistry.js
// Single source of truth for header/lead/SEO/sections used by hubs and service pages.
// Structure:
//   - categories: hub-level + long-form content (e.g., 'iphone-remonts')
//   - services:   service pages without brand (e.g., 'iphone-remonts/displeja-maina')
// Later (when needed) you can add:
//   - brands:         brand hub defaults (e.g., 'telefonu-remonts/samsung')
//   - brandServices:  brand + service (e.g., 'telefonu-remonts/samsung/displeja-maina')

const contentRegistry = {
  // =====================================================================
  // HUBS / CATEGORIES
  // =====================================================================
  categories: {
    // ---------------- iPhone hub (keeps the full guide) ----------------
    'iphone-remonts': {
      slug: 'iphone-remonts',
      seo: {
        title: 'iPhone remonts Rīgā | iLab',
        metaDescription:
          'iPhone remonts Rīgā — displeja, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana. Ātra diagnostika, skaidras cenas un 90 dienu garantija iLab servisā Rīgā.',
      },
      // Header (hub) content
      h1: 'iPhone remonts Rīgā',
      lead:
        'iLab sertificētie meistari salabo iPhone ar dažādiem bojājumiem — no saplaisājuša ekrāna līdz mitruma radītām problēmām. Strādājam ātri, izmantojam kvalitatīvas detaļas un sniedzam garantiju visiem remontiem Rīgā.',
      scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'iphone-modeli', show: true },

      // Hub sections (model grid + full guide)
      sections: {
        modelGrid: {
          heading: 'Izvēlies savu iPhone modeli',
          intro: 'Atrast modeli ir viegli — izvēlies no saraksta vai izmanto meklēšanu.',
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
Ja kabelis noturas vaļīgi, uzlāde pārtrūkst vai telefons uzlādējas tikai noteiktā leņķī, bieži vainīgs ir uzlādes ports vai kontakta korozija. Šādā gadījumā palīdz <a href="/iphone-remonts/uzlades-ligzdas-maina">uzlādes ligzdas maiņa</a> vai tīrīšana, dažreiz arī baterijas nomaiņa.</p>

<p><strong>Ūdens vai mitruma bojājumi</strong><br>
Pēc saskares ar šķidrumu telefons var šķist sauss no ārpuses, bet iekšpusē jau sākusies oksidācija. Jo ātrāk ierīce nonāk servisā, jo lielāka iespēja to atjaunot. Veicam <a href="/iphone-remonts/udens-bojajumu-remonts">ūdens bojājumu diagnostiku un remontu</a>, aizstājot bojātās detaļas, ja nepieciešams.</p>

<p><strong>Ekrāna vai skāriena problēmas</strong><br>
Saplaisājis vai mirgojošs ekrāns, vertikālas līnijas vai skāriena nereaģēšana var norādīt uz bojātu displeju vai savienojumu. Problēmu novērš <a href="/iphone-remonts/ekrana-maina">displeja maiņa</a> ar kvalitatīvu detaļu un garantiju.</p>

<p><strong>Kameras vai skaņas kļūmes</strong><br>
Miglains attēls, fokusēšanās problēmas vai pazudusi skaņa sarunu laikā var liecināt par mitruma ietekmi, bojātu moduli vai netīrumiem. Pēc bezmaksas diagnostikas meistars piedāvās <a href="/iphone-remonts/kameras-remonts">kameras remontu</a> vai <a href="/iphone-remonts/skalruni-mikrofona-remonts">skaļruņu un mikrofona remontu</a>.</p>

<p><strong>Ko darīt, ja neesi pārliecināts?</strong><br>
Ja neesi drošs, kas tieši noticis, iLab piedāvā bezmaksas diagnostiku Rīgā. Pārbaudīsim ierīci un sniegsim precīzu remonta piedāvājumu ar cenu un termiņu pirms darba sākšanas.</p>
      `,
            },
            {
              title: 'Cik tas ilgst un ko sagaidīt',
              text: `
<p>Vairumu iPhone remontu iespējams paveikt tajā pašā dienā — piemēram, <a href="/iphone-remonts/ekrana-maina">displeja maiņa</a> vai <a href="/iphone-remonts/baterijas-maina">baterijas nomaiņa</a> parasti aizņem 1–3 stundas. Pirms darba sākšanas meistars veic diagnostiku un informē par aptuveno izpildes laiku.</p>

<p>Ja bojājums ir sarežģītāks (piemēram, ūdens bojājums vai mātesplates defekts), serviss informē par nepieciešamo laiku un detaļu pieejamību. Cenu un termiņu vienmēr saskaņojam pirms darba uzsākšanas, tāpēc klients zina, ko sagaidīt.</p>

<p>Remonta gaitā varat sekot līdzi statusam vai saņemt paziņojumu, kad ierīce ir gatava. Mērķis — nodrošināt ātru, caurspīdīgu un drošu iPhone remontu Rīgā.</p>
      `,
            },
            {
              title: 'Detaļas: oriģinālas vai OEM',
              text: `
<p>iLab serviss piedāvā gan oriģinālās Apple detaļas, gan augstas kvalitātes OEM rezerves daļas. Izvēle tiek veikta kopā ar klientu, balstoties uz konkrētā modeļa īpatnībām, cenu un garantijas nosacījumiem.</p>

<p>Oriģinālās detaļas nodrošina maksimālu saderību, savukārt OEM alternatīvas bieži ir ekonomiski izdevīgākas, nezaudējot kvalitāti. Pēc katra remonta sniedzam 90 dienu garantiju gan detaļām, gan darbam.</p>

<p>Neatkarīgi no izvēles, katru iPhone pēc remonta testējam — pārbaudām ekrāna krāsas, skārienjutību, baterijas darbību un uzlādes ātrumu.</p>
      `,
            },
            {
              title: 'Datu drošība un sagatavošanās remontam',
              text: `
<p>Pirms ierīces nodošanas servisā iesakām izveidot datu rezerves kopiju iCloud vai iTunes vidē. iLab meistari ievēro stingrus datu drošības principus — mēs nepiekļūstam personīgajai informācijai un apstrādājam datus tikai remonta vajadzībām.</p>

<p>Ja ierīce ir aizsargāta ar paroli, Face ID vai Touch ID, meistars ieteiks, kā rīkoties, lai pārbaude būtu iespējama. iLab serviss Rīgā nodrošina, ka katrs iPhone tiek apstrādāts droši, konfidenciāli un atbildīgi.</p>
      `,
            },
            {
              title: 'Kur nodot iPhone remontam',
              text: `
<p>iLab servisa centri atrodas Rīgā — <strong>T/C Domina Shopping</strong> un <strong>T/C Spice Home</strong>. Abu salonu darbnīcas piedāvā pilnu pakalpojumu klāstu — sākot no diagnostikas līdz jebkura sarežģītības pakāpes remontam.</p>

<p>Ierīci var nodot klātienē vai nosūtīt pa pastu, ja nevari atbraukt personīgi. Visus kontaktus, darba laikus un atrašanās vietas atradīsi sadaļā <a href="/kontakti">Kontakti</a>.</p>

<p>Neatkarīgi no tā, vai nepieciešama <a href="/iphone-remonts/ekrana-maina">displeja maiņa</a>, <a href="/iphone-remonts/baterijas-maina">baterijas nomaiņa</a> vai <a href="/iphone-remonts/udens-bojajumu-remonts">ūdens bojājumu remonts</a> — mūsu sertificētie meistari palīdzēs atjaunot Tavu iPhone tajā pašā dienā.</p>
      `,
            },
          ],
        },
      },

      show: {
        popularRepairs: true,
        guide: true,
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
    // ------------- Planšetdatoru remonts hub (Header hero only) -------------
    'plansetdatoru-remonts': {
      hero: {
        h1: 'Planšetdatoru remonts',
        lead:
          'Ekrāni, baterijas, uzlādes ligzdas, kameras un citi planšetdatoru remonti. Ātra diagnostika, godīgas cenas, garantija.',
        bodyHtml:
          '<p><strong>Planšetdatoru remonts Rīgā</strong> — ekrāna, baterijas un uzlādes ligzdas maiņa, kameras remonts un citi darbi. Ātra diagnostika, skaidras cenas un <strong>90 dienu garantija</strong>.</p>',
        scrollCta: { label: 'Skatīt zīmolus un modeļus', targetId: 'brand-list' },
      },
    },


    // ---------------- Datoru remonts hub (Header hero only) ------------------
    'datoru-remonts': {
      hero: {
        h1: 'Datoru remonts',
        lead:
          'Portatīvo un stacionāro datoru remonts — diagnostika, ekrāns, tastatūras, mātesplate, uzlāde, SSD/RAM uzlabošana, remonts pēc mitruma. Ātra diagnostika un 90 dienu garantija.',
        scrollCta: { label: 'Skatīt zīmolus un pakalpojumus', targetId: 'brand-list' },
      },
    },

    // ---------------- Dyson remonts hub (no scroll CTA) ---------------------
    'dyson-remonts': {
      slug: 'dyson-remonts',
      h1: 'Dyson remonts Rīgā',
      lead:
        'iLab meistari salabo Dyson bezvadu putekļsūcējus — veicam motora un baterijas maiņu, filtru un blīvējumu nomaiņu, dziļo tīrīšanu un diagnostiku. Ātra pārbaude pirms darba, skaidras izmaksas un 90 dienu garantija.',
    },
  },

  // =====================================================================
  // SERVICE PAGES
  // =====================================================================
  services: {
    // ---- iPhone (existing, unchanged) ----
    'iphone-remonts/ekrana-maina': {
      seo: {
        title: 'iPhone ekrāna maiņa Rīgā | iLab',
        metaDescription:
          'iPhone ekrāna un stikla maiņa tajā pašā dienā. Ātra diagnostika, kvalitatīvas detaļas, 90 dienu garantija.',
      },
      h1: 'iPhone ekrāna maiņa',
      lead:
        'Nomainīsim saplaisājušu vai nereaģējošu ekrānu (displeju) tajā pašā dienā, izmantojot kvalitatīvas detaļas un sniedzot 90 dienu garantiju.',
      scrollCta: { label: 'Skatīt ekrāna maiņas cenas', targetId: 'cenas', show: true },
    },


    'iphone-remonts/baterijas-maina': {
      seo: {
        title: 'iPhone baterijas maiņa | iLab',
        metaDescription:
          'Ātra iPhone baterijas maiņa ar garantiju. Diagnoze, cenas saskaņošana un nomaiņa tajā pašā dienā, ja detaļas ir uz vietas.',
      },
      h1: 'iPhone baterijas maiņa',
      lead:
        'Ja iPhone ātri izlādējas vai izslēdzas pie 10–20%, baterijas nomaiņa palīdz atjaunot darba laiku un stabilitāti.',
    },

    'iphone-remonts/uzlades-ligzdas-maina': {
      seo: {
        title: 'iPhone uzlādes ligzdas maiņa Rīgā | iLab',
        metaDescription:
          'Ātra un profesionāla iPhone uzlādes ligzdas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija. Bieži tajā pašā dienā.',
      },
      h1: 'iPhone uzlādes ligzdas maiņa',
      lead:
        'Nelādējas, jākustina vads vai ports vaļīgs? Veicam tīrīšanu, oksidācijas novēršanu un uzlādes ligzdas nomaiņu ar garantiju.',
    },

    // Camera (canonical)
    'iphone-remonts/kameras-remonts': {
      seo: {
        title: 'iPhone kameras remonts Rīgā | iLab',
        metaDescription:
          'Miglainas bildes vai fokusēšanās problēmas? iPhone kameras remonts/maiņa ar pārbaudi un 90 dienu garantiju.',
      },
      h1: 'iPhone kameras remonts un maiņa',
      lead:
        'Miglainas fotogrāfijas, fokusēšanās problēmas vai netīrumi modulī — diagnosticēsim un salabosim kameru ar garantiju.',
    },
    // Alias (older slug)
    'iphone-remonts/kameras-maina': {
      seo: {
        title: 'iPhone kameras maiņa Rīgā | iLab',
        metaDescription:
          'Miglainas bildes vai fokusēšanās problēmas? Nomainīsim iPhone kameru ar pārbaudi un 90 dienu garantiju.',
      },
      h1: 'iPhone kameras maiņa',
      lead:
        'Miglainas fotogrāfijas, fokusēšanās problēmas vai netīrumi modulī — nomainīsim kameru un pārbaudīsim attēla kvalitāti.',
    },

    // Speakers/Mic (canonical)
    'iphone-remonts/skalruni-mikrofona-remonts': {
      seo: {
        title: 'iPhone skaļruņu un mikrofona remonts Rīgā | iLab',
        metaDescription:
          'Klusa skaņa, krakšķi vai sarunās nedzird? iPhone skaļruņu un mikrofona remonts/tīrīšana ar garantiju.',
      },
      h1: 'iPhone skaļruņu un mikrofona remonts',
      lead:
        'Klusa skaņa, krakšķi vai sarunās nedzird? Veicam tīrīšanu vai moduļu nomaiņu un pilnu skaņas testu ar garantiju.',
    },
    // Alias (older slug)
    'iphone-remonts/skalruni-mikrofons': {
      seo: {
        title: 'iPhone skaļruņu un mikrofona remonts Rīgā | iLab',
        metaDescription:
          'Klusa skaņa, krakšķi vai sarunu laikā nedzird? Risinām skaļruņu un mikrofona problēmas ar diagnostiku un garantiju.',
      },
      h1: 'iPhone skaļruņu un mikrofona remonts',
      lead:
        'Klusa skaņa, krakšķi vai sarunās nedzird? Tīrām vai mainām skaļruņus/mikrofonu, atjaunojot skaņas kvalitāti.',
    },

    // Water damage (canonical)
    // Water damage (canonical)
    'iphone-remonts/udens-bojajumu-remonts': {
      seo: {
        title: 'iPhone ūdens bojājumi — diagnostika un remonts Rīgā | iLab',
        metaDescription:
          'iPhone iekrita ūdenī? Veicam ūdens bojājumu diagnostiku, tīrīšanu un oksidācijas novēršanu, bojāto detaļu nomaiņu un testus. Jo ātrāk atnesīsi, jo lielākas izredzes.',
      },
      h1: 'iPhone ūdens bojājumi',
      lead:
        'iPhone iekrita ūdenī vai pēc mitruma vairs neieslēdzas? Veicam diagnostiku, tīrīšanu, oksidācijas novēršanu un bojāto detaļu maiņu ar 90 dienu garantiju.',
    },


    // ---- Telefonu remonts (NEW) ----
    'telefonu-remonts/ekrana-maina': {
      seo: {
        title: 'Telefonu ekrāna (displeja) maiņa Rīgā | iLab',
        metaDescription:
          'Ātra un kvalitatīva telefonu ekrāna (displeja) maiņa Rīgā. Bezmaksas diagnostika, oriģinālas vai OEM detaļas, 90 dienu garantija. Bieži tajā pašā dienā.',
      },
      h1: 'Telefonu ekrāna (displeja) maiņa',
      lead:
        'Novēršam plaisas, tumšus plankumus un skāriena problēmas. Strādājam ātri un droši, izmantojot kvalitatīvas detaļas un sniedzot 90 dienu garantiju.',
    },

    'telefonu-remonts/baterijas-maina': {
      seo: {
        title: 'Telefonu akumulatora maiņa Rīgā | iLab',
        metaDescription:
          'Tālrunis ātri izlādējas vai izslēdzas pie 10–20%? Telefonu akumulatora maiņa ar bezmaksas diagnostiku un 90 dienu garantiju.',
      },
      h1: 'Telefonu akumulatora maiņa',
      lead:
        'Atjaunojam darba laiku un stabilitāti ar kvalitatīvu akumulatoru nomaiņu. Pirms darba veicam bezmaksas diagnostiku un saskaņojam izmaksas.',
    },

    'telefonu-remonts/uzlades-ligzdas-maina': {
      seo: {
        title: 'Telefonu uzlādes ligzdas remonts/maina | iLab',
        metaDescription:
          'Nenoturas kabelis, lēna vai nestabila uzlāde? Veicam uzlādes porta tīrīšanu, remontu vai nomaiņu ar 90 dienu garantiju.',
      },
      h1: 'Telefonu uzlādes ligzdas remonts un maiņa',
      lead:
        'Sakārtojam uzlādi: tīrīšana, oksidācijas novēršana vai ligzdas nomaiņa. Darbu pabeidzam ātri, ar testiem un garantiju.',
    },

    'telefonu-remonts/kameras-remonts': {
      seo: {
        title: 'Telefonu kameras remonts Rīgā | iLab',
        metaDescription:
          'Miglaini attēli vai fokusēšanās problēmas? Telefonu kameras diagnostika un remonts/nomaiņa ar 90 dienu garantiju.',
      },
      h1: 'Telefonu kameras remonts un maiņa',
      lead:
        'Atjaunojam foto un video kvalitāti — sakārtojam fokusēšanos, aizvietojam bojātus moduļus, notīrām netīrumus un veicam pilnu pārbaudi.',
    },

    'telefonu-remonts/skalruni-mikrofona-remonts': {
      seo: {
        title: 'Telefonu skaļruņu un mikrofona remonts | iLab',
        metaDescription:
          'Klusa skaņa, krakšķi vai sarunās nedzird? Telefonu skaļruņu un mikrofona remonts/tīrīšana ar 90 dienu garantiju.',
      },
      h1: 'Telefonu skaļruņu un mikrofona remonts',
      lead:
        'Salabojam skaņu: tīrīšana vai moduļu nomaiņa, lai sarunas un multimediji atkal skanētu skaidri.',
    },

    'telefonu-remonts/udens-bojajumu-remonts': {
      seo: {
        title: 'Telefonu ūdens bojājumi — diagnostika un remonts | iLab',
        metaDescription:
          'Pēc saskares ar šķidrumu veicam diagnostiku, tīrīšanu un oksidācijas novēršanu. Bojāto detaļu nomaiņa ar garantiju — jo ātrāk atnesīsi, jo lielākas izredzes.',
      },
      h1: 'Telefonu ūdens bojājumu diagnostika un remonts',
      lead:
        'Steidzama palīdzība pēc mitruma: tīrīšana, oksidācijas novēršana un bojāto detaļu nomaiņa. Jo ātrāk ierīce servisā, jo labākas izredzes.',
    },
  },

  // (Optional placeholders for future expansion)
  brands: {
    // e.g., 'telefonu-remonts/samsung': { h1, lead, seo, hero }
  },
  brandServices: {
    // e.g., 'telefonu-remonts/samsung/displeja-maina': { h1, lead, seo }
  },

  // =====================================================================
  // INFO PAGES
  // =====================================================================
  info: {
    buj: {
      h1: 'Biežāk uzdotie jautājumi',
      lead: 'Atbildes par iLab pakalpojumiem un biežāk sastopamajiem remonta jautājumiem.',
      // scrollCta: { label: 'Atrast atbildi', targetId: 'duk-faq' }, // optional
    },
    kontakti: {
      h1: 'Kontakti',
      lead:
        'Atradīsiet mūs T/C Domina Shopping un T/C Spice Home. Zvaniet vai rakstiet — atbildēsim ātri.',
    },
    'privatuma-un-sikdatnu-politika': {
      h1: 'Lietošanas noteikumi un privātuma politika',
      lead:
        'Noteikumi par iLab pakalpojumu izmantošanu, garantiju, klientu datu apstrādi un sīkdatņu (cookies) politiku.',
    },
    'par-ilab': {
      h1: 'Par iLab',
      lead:
        'Mūsdienīgs remonta serviss Rīgā — tālruņi, planšetdatori, portatīvie datori un Dyson. Sertificēti meistari, ātra diagnostika un 90 dienu garantija.',
    },

    pieraksties: {
      seo: {
        title: 'Pieraksties remontam | iLab',
        metaDescription:
          'Aizpildi pieteikumu telefonam, planšetdatoram, datoram vai Dyson. Sazināsimies, saskaņosim izmaksas un laiku. Ātra diagnostika un 90 dienu garantija.',
      },
      h1: 'Pieraksties remontam',
      lead:
        'Aizpildi formu ar savu ierīci un problēmu — mūsu meistars sazināsies, saskaņos izmaksas un remonta laiku.',
    },

    cenas: {
      h1: 'Pakalpojumu cenas',

    },
    // ...add more info pages as needed
  },
};

export default contentRegistry;
