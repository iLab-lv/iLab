// /data/categoryContent.js
// Dev-time content source for category pages (hubs + iPhone).
// iPhone hub keeps its long-form guide here.
// Telefonu/Planšetdatoru hubs only provide hero for the Header.

const categoryContent = {
  // ---------------- iPhone hub (keeps the full guide) ----------------
  'iphone-remonts': {
    slug: 'iphone-remonts',

    seo: {
      title: 'iPhone remonts Rīgā un visā Latvijā | iLab',
      metaDescription:
        'iPhone ekrāna un baterijas maiņa, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, garantija. Piesaki remontu iLab!',
    },

    // Header content (Header owns H1, lead, CTA)
    h1: 'iPhone remonts',
    lead:
      'iLab sertificētie meistari salabo iPhone gan ar tipiskiem, gan sarežģītiem bojājumiem — no saplaisājuša ekrāna līdz mitruma radītām problēmām. Strādājam ātri, izmantojam kvalitatīvas detaļas un sniedzam garantiju visā Latvijā.',
    scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'iphone-modeli', show: true },

    sections: {
      modelGrid: {
        heading: 'Izvēlies savu iPhone modeli',
        intro: 'Atrast modeli ir viegli — izvēlies no saraksta vai izmanto meklēšanu.',
      },

      // ---- RESTORED GUIDE (exact copy) ----
      guide: {
        heading: 'iPhone remonta ceļvedis',
        parts: [
          {
            title: 'Simptomi un iespējamie risinājumi',
            text:
              'Saplīsis vai mirgo ekrāns, nereaģē skāriens, ātri krītas baterijas līmenis, uzlāde pārtrūkst vai telefons pārkarst — tie ir biežākie signāli, ka nepieciešama diagnostika. iLab komandā pārbaudām komponentes, lai precīzi noteiktu bojājumu un piedāvātu optimālo risinājumu.',
          },
          {
            title: 'Cik tas ilgst un ko sagaidīt',
            text:
              'Standarta darbi, piemēram, ekrāna vai baterijas maiņa, bieži paveicami tajā pašā dienā. Sarežģītākiem bojājumiem vispirms veicam diagnostiku un saskaņojam termiņu. Par izmaksām vienojamies pirms darba uzsākšanas — bez slēptām pozīcijām.',
          },
          {
            title: 'Detaļas: oriģinālas vai OEM',
            text:
              'Strādājam ar oriģinālām vai augstas kvalitātes OEM detaļām atkarībā no modeļa un pieejamības. Mērķis — atjaunot sākotnējo funkcionalitāti un saglabāt uzticamību. Izvēli un garantijas nosacījumus izskaidrojam pirms remonta.',
          },
          {
            title: 'Datu drošība un sagatavošanās remontam',
            text:
              'Iesakām veikt dublējumu un deaktivizēt “Find My iPhone”, ja nepieciešams. Mēs apstrādājam datus atbildīgi; piekļuve tiek ierobežota tikai remonta vajadzībām. Ja ir paroli vai Face ID, meistars informēs, kā rīkoties.',
          },
          {
            title: 'Kur nodot iPhone remontam',
            text:
              'Mūs atradīsi T/C Domina Shopping un T/C Spice Home — ērti piebraukt un apvienot ar citām lietām. Ja neatrodi savu modeli, izmanto “Sazināties” un saņem konsultāciju no meistara.',
          },
        ],
      },
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
};

export default categoryContent;
