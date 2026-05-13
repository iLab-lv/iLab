// app/data/faq.js
// Single source of truth for all FAQ items + helpers.
// Reuse questions across sections via `scopes`.
// UI uses `aHtml` (can include <Link>), JSON-LD uses `aText` (plain text).

import React from 'react';
import Link from 'next/link';

// ---- Context keys (use these in pages) ----
export const FAQ_CONTEXT = {
  HOME: 'home',
  IPHONE: 'iphone-remonts',
  PHONE: 'telefonu-remonts',
  TABLET: 'plansetdatoru-remonts',
  LAPTOP: 'datoru-remonts',
  DYSON: 'dyson-remonts',
  IPHONE_ADS: 'iphone-remonts-ads', // NEW: iPhone ads landing page
};

// ---- Master question pool ----
// `weight` controls ordering (lower first).
// Optional `variants[contextKey]` lets us override text per context (used for iPhone / iPhone Ads).
const QUESTIONS = [
  // ===== Generic, used across many contexts (with iPhone variants) =====
  {
    id: 'speed',
    q: 'Cik ātri varat salabot ierīci?',
    scopes: [
      FAQ_CONTEXT.HOME,
      FAQ_CONTEXT.IPHONE,
      FAQ_CONTEXT.PHONE,
      FAQ_CONTEXT.TABLET,
      FAQ_CONTEXT.LAPTOP,
      FAQ_CONTEXT.DYSON,
      FAQ_CONTEXT.IPHONE_ADS, // include in iPhone Ads FAQ
    ],
    aHtml: (
      <>
        Biežākos remontus paveicam tajā pašā dienā (atkarīgs no modeļa un detaļu
        pieejamības). Pārlūko kategorijas:{' '}
        <Link href="/iphone-remonts">iPhone remonts</Link>,{' '}
        <Link href="/telefonu-remonts">telefonu remonts</Link>,{' '}
        <Link href="/plansetdatoru-remonts">planšetdatoru remonts</Link>,{' '}
        <Link href="/datoru-remonts">datoru remonts</Link>,{' '}
        <Link href="/dyson-remonts">Dyson remonts</Link>.
      </>
    ),
    aText:
      'Biežākos remontus paveicam tajā pašā dienā, atkarībā no modeļa un detaļu pieejamības.',
    variants: {
      [FAQ_CONTEXT.IPHONE]: {
        aHtml: (
          <>
            Daudzas <strong>iPhone</strong> procedūras izdarām{' '}
            <strong>tajā pašā dienā</strong>, piemēram:{' '}
            <Link href="/iphone-remonts/ekrana-maina">ekrāna maiņa</Link>,{' '}
            <Link href="/iphone-remonts/baterijas-maina">baterijas maiņa</Link>,{' '}
            <Link href="/iphone-remonts/uzlades-ligzdas-maina">
              uzlādes ligzdas maiņa
            </Link>
            . Termiņš atkarīgs no modeļa un detaļām.
          </>
        ),
        aText:
          'Daudzas iPhone procedūras paveicam tajā pašā dienā (ekrāna, baterijas, uzlādes ligzdas maiņa), atkarīgs no modeļa un detaļu pieejamības.',
      },
      // Ad-optimised + policy-safe variant (no "maiņa"/parts)
      [FAQ_CONTEXT.IPHONE_ADS]: {
        aHtml: (
          <>
            Termiņš ir atkarīgs no ierīces stāvokļa un nepieciešamajiem darbiem.
            Precīzāk pateiksim pēc īsas diagnostikas uz vietas.
          </>
        ),
        aText:
          'Termiņš ir atkarīgs no ierīces stāvokļa un nepieciešamajiem darbiem; precīzi nosakām pēc diagnostikas uz vietas.',
      },
    },
    weight: 10,
  },
  {
    id: 'price',
    q: 'Kāda ir remonta cena?',
    scopes: [
      FAQ_CONTEXT.HOME,
      FAQ_CONTEXT.IPHONE,
      FAQ_CONTEXT.PHONE,
      FAQ_CONTEXT.TABLET,
      FAQ_CONTEXT.LAPTOP,
      FAQ_CONTEXT.DYSON,
      FAQ_CONTEXT.IPHONE_ADS, // include in iPhone Ads FAQ
    ],
    aHtml: (
      <>
        Cena atkarīga no modeļa un bojājuma. Skati cenas attiecīgajā kategorijā - piemēram,{' '}
        <Link href="/iphone-remonts">iPhone remonts</Link> vai{' '}
        <Link href="/telefonu-remonts">telefonu remonts</Link>. Pirms darba uzsākšanas
        vienmēr saskaņojam izmaksas un termiņu.
      </>
    ),
    aText:
      'Cena atkarīga no modeļa un bojājuma; pirms darba vienmēr saskaņojam izmaksas un termiņu.',
    variants: {
      [FAQ_CONTEXT.IPHONE]: {
        aHtml: (
          <>
            <strong>iPhone</strong> cenu sadaļas atradīsi pie konkrētā pakalpojuma:{' '}
            <Link href="/iphone-remonts/ekrana-maina">displeja maiņa</Link>,{' '}
            <Link href="/iphone-remonts/baterijas-maina">baterijas maiņa</Link>,{' '}
            <Link href="/iphone-remonts/kameras-remonts">kameras remonts</Link>,{' '}
            <Link href="/iphone-remonts/skalruni-mikrofona-remonts">
              skaļruņu/mikrofona remonts
            </Link>
            ,{' '}
            <Link href="/iphone-remonts/uzlades-ligzdas-maina">
              uzlādes ligzdas maiņa
            </Link>
            ,{' '}
            <Link href="/iphone-remonts/udens-bojajumu-remonts">
              ūdens bojājumu remonts
            </Link>
            .
          </>
        ),
        aText:
          'iPhone cenas skatāmas pie konkrētā pakalpojuma: displeja, baterijas, kameras, skaļruņu/mikrofona, uzlādes ligzdas un ūdens bojājumu remonts.',
      },
      // Ad-optimised + policy-safe variant (no "iPhone remonta cena", no links, no phone-quote)
      [FAQ_CONTEXT.IPHONE_ADS]: {
        aHtml: (
          <>
            Izmaksas ir atkarīgas no ierīces veida un tās tehniskā stāvokļa.
            Pirms darbu uzsākšanas vienmēr saskaņojam izmaksas un termiņu pēc diagnostikas uz vietas.
          </>
        ),
        aText:
          'Izmaksas ir atkarīgas no ierīces stāvokļa; pirms darbu uzsākšanas tās saskaņojam pēc diagnostikas uz vietas.',
      },
    },
    weight: 20,
  },
  {
    id: 'warranty',
    q: 'Vai ir garantija uz veiktajiem darbiem?',
    scopes: [
      FAQ_CONTEXT.HOME,
      FAQ_CONTEXT.IPHONE,
      FAQ_CONTEXT.PHONE,
      FAQ_CONTEXT.TABLET,
      FAQ_CONTEXT.LAPTOP,
      FAQ_CONTEXT.DYSON,
      FAQ_CONTEXT.IPHONE_ADS, // include in iPhone Ads FAQ
    ],
    aHtml: (
      <>
        Jā - visiem remontiem nodrošinām <strong>90 dienu garantiju</strong>. Izmantojam
        oriģinālas vai augstas kvalitātes OEM detaļas (vienojamies ar klientu pirms
        darba).
      </>
    ),
    aText:
      'Jā - visiem remontiem nodrošinām 90 dienu garantiju; izmantojam oriģinālas vai augstas kvalitātes OEM detaļas.',
    variants: {
      [FAQ_CONTEXT.IPHONE]: {
        aHtml: (
          <>
            <strong>iPhone remontiem</strong> - <strong>90 dienu garantija</strong> gan
            darbam, gan detaļām. Pēc vienošanās izmantojam oriģinālās vai augstas
            kvalitātes OEM komponentes.
          </>
        ),
        aText:
          'iPhone remontiem ir 90 dienu garantija darbam un detaļām; izmantojam oriģinālās vai augstas kvalitātes OEM komponentes.',
      },
      // Ad-optimised + policy-safe variant (no parts/OEM claims)
      [FAQ_CONTEXT.IPHONE_ADS]: {
        aHtml: (
          <>
            Jā - veiktajiem darbiem nodrošinām <strong>90 dienu garantiju</strong>.
            Garantijas nosacījumi tiek izskaidroti uz vietas.
          </>
        ),
        aText:
          'Jā - veiktajiem darbiem nodrošinām 90 dienu garantiju; nosacījumus izskaidrojam uz vietas.',
      },
    },
    weight: 30,
  },
  {
    id: 'walkin',
    q: 'Vai nepieciešams pieraksts, vai var atnest uzreiz?',
    scopes: [
      FAQ_CONTEXT.HOME,
      FAQ_CONTEXT.IPHONE,
      FAQ_CONTEXT.PHONE,
      FAQ_CONTEXT.TABLET,
      FAQ_CONTEXT.LAPTOP,
      FAQ_CONTEXT.DYSON,
      FAQ_CONTEXT.IPHONE_ADS, // include in iPhone Ads FAQ
    ],
    aHtml: (
      <>
        Vari droši atnest uz vietas - <strong>bez pieraksta</strong>. Ja vēlies, vari
        arī pieteikt laiku vai uzdot jautājumu pa tālruni: kontakti un darba laiks ir
        sadaļā <Link href="/kontakti">Kontakti</Link>.
      </>
    ),
    aText:
      'Ierīci var atnest bez pieraksta; kontaktus un darba laiku atradīsiet sadaļā Kontakti.',
    variants: {
      // Ad-optimised + policy-safe variant (no appointment CTA, no /kontakti link)
      [FAQ_CONTEXT.IPHONE_ADS]: {
        aHtml: (
          <>
            Vari droši atnest ierīci uz vietas - <strong>bez pieraksta</strong>.
            Darba laiks un atrašanās vietas ir norādītas šajā lapā zemāk.
          </>
        ),
        aText:
          'Ierīci var atnest bez pieraksta; darba laiks un atrašanās vietas ir norādītas lapā.',
      },
    },
    weight: 40,
  },
  {
    id: 'locations',
    q: 'Kur jūs atrodaties?',
    scopes: [
      FAQ_CONTEXT.HOME,
      FAQ_CONTEXT.IPHONE,
      FAQ_CONTEXT.PHONE,
      FAQ_CONTEXT.TABLET,
      FAQ_CONTEXT.LAPTOP,
      FAQ_CONTEXT.DYSON,
      FAQ_CONTEXT.IPHONE_ADS, // include in iPhone Ads FAQ
    ],
    aHtml: (
      <>
        Rīgā - <strong>T/C Domina Shopping</strong> un <strong>T/C Spice Life</strong>.
        Adreses, tālruņi un darba laiki:{' '}
        <Link href="/kontakti">Kontakti</Link>.
      </>
    ),
    aText:
      'Rīgā - T/C Domina Shopping un T/C Spice Life; adreses un darba laiki pieejami sadaļā Kontakti.',
    variants: {
      [FAQ_CONTEXT.IPHONE_ADS]: {
        aHtml: (
          <>
            Rīgā - <strong>T/C Domina Shopping</strong> un <strong>T/C Spice Life</strong>.
            Precīzas adreses un darba laiks ir norādīti šajā lapā zemāk.
          </>
        ),
        aText:
          'Rīgā - T/C Domina Shopping un T/C Spice Life; adreses un darba laiks ir norādīti lapā.',
      },
    },
    weight: 50,
  },
  {
    id: 'data-safety',
    q: 'Vai dati paliks droši apkalpošanas laikā?',
    scopes: [
      FAQ_CONTEXT.HOME,
      FAQ_CONTEXT.IPHONE,
      FAQ_CONTEXT.PHONE,
      FAQ_CONTEXT.TABLET,
      FAQ_CONTEXT.LAPTOP,
      FAQ_CONTEXT.IPHONE_ADS, // include in iPhone Ads FAQ
    ],
    aHtml: (
      <>
        Jā - strādājam uzmanīgi, bet pirms remonta iesakām izveidot{' '}
        <em>rezerves kopiju</em> (backup). Biežākajās situācijās (piem.,{' '}
        <Link href="/iphone-remonts/ekrana-maina">ekrāna maiņa</Link> vai{' '}
        <Link href="/iphone-remonts/baterijas-maina">baterijas maiņa</Link>) dati parasti
        netiek skarti.
      </>
    ),
    aText:
      'Strādājam uzmanīgi, taču pirms remonta iesakām izveidot datu rezerves kopiju.',
    variants: {
      [FAQ_CONTEXT.IPHONE]: {
        aHtml: (
          <>
            <strong>iPhone</strong> datu integritāte ir prioritāte. Tipiskos darbos -{' '}
            <Link href="/iphone-remonts/ekrana-maina">ekrāna maiņa</Link> un{' '}
            <Link href="/iphone-remonts/baterijas-maina">baterijas maiņa</Link> -
            lietotāja dati parasti netiek skarti, tomēr rekomendējam <em>backup</em>.
          </>
        ),
        aText:
          'iPhone ekrāna un baterijas maiņa parasti neietekmē datus; tomēr iesakām izveidot rezerves kopiju.',
      },
      // Ad-optimised + policy-safe variant (no links, no "maiņa", diagnostics framing)
      [FAQ_CONTEXT.IPHONE_ADS]: {
        aHtml: (
          <>
            Strādājam uzmanīgi, taču drošībai iesakām pirms vizītes izveidot <em>rezerves kopiju</em>.
            Diagnostikas laikā dati parasti netiek skarti.
          </>
        ),
        aText:
          'Iesakām pirms vizītes izveidot rezerves kopiju; diagnostikas laikā dati parasti netiek skarti.',
      },
    },
    weight: 60,
  },

  // ===== Home-specific extra (other devices) =====
  {
    id: 'other-devices',
    q: 'Vai remontējat arī citas ierīces?',
    scopes: [FAQ_CONTEXT.HOME],
    aHtml: (
      <>
        Jā - droši <Link href="/kontakti">sazinies ar mums</Link>. Papildus
        populārākajām kategorijām varam palīdzēt arī ar{' '}
        <strong>skeneriem/skaļruņiem</strong>, <strong>fotoaparātiem</strong> un citiem
        portatīvajiem gadžetiem (pēc pieprasījuma).
      </>
    ),
    aText:
      'Jā - sazinieties ar mums. Remontējam arī skaļruņus, fotoaparātus un citas portatīvās ierīces pēc pieprasījuma.',
    weight: 65,
  },

  // ===== Phone-specific (with iPhone variants) =====
  {
    id: 'phone-what-we-fix',
    q: 'Ko tieši remontējat telefonos?',
    // IMPORTANT: removed IPHONE_ADS from scopes (too trigger-heavy for safe ads landing)
    scopes: [FAQ_CONTEXT.PHONE, FAQ_CONTEXT.IPHONE],
    aHtml: (
      <>
        Displejus, baterijas, uzlādes ligzdas, kameras, skaļruņus/mikrofonus, ūdens
        bojājumus u.c. Skati{' '}
        <Link href="/telefonu-remonts">telefonu remonts</Link>.
      </>
    ),
    aText:
      'Telefonos remontējam displejus, baterijas, uzlādes ligzdas, kameras, skaļruņus/mikrofonus un ūdens bojājumus.',
    variants: {
      [FAQ_CONTEXT.IPHONE]: {
        aHtml: (
          <>
            <strong>iPhone remonts</strong>:{' '}
            <Link href="/iphone-remonts/ekrana-maina">
              displeja (ekrāna) maiņa
            </Link>
            ,{' '}
            <Link href="/iphone-remonts/baterijas-maina">baterijas maiņa</Link>,{' '}
            <Link href="/iphone-remonts/kameras-remonts">kameras remonts</Link>,{' '}
            <Link href="/iphone-remonts/skalruni-mikrofona-remonts">
              skaļruņu/mikrofona remonts
            </Link>
            ,{' '}
            <Link href="/iphone-remonts/uzlades-ligzdas-maina">
              uzlādes ligzdas maiņa
            </Link>
            ,{' '}
            <Link href="/iphone-remonts/udens-bojajumu-remonts">
              ūdens bojājumu remonts
            </Link>
            .
          </>
        ),
        aText:
          'iPhone remonts: displeja, baterijas, kameras, skaļruņu/mikrofona, uzlādes ligzdas un ūdens bojājumu remonts.',
      },
    },
    weight: 70,
  },

  // ===== iPhone-only (unchanged, just more helpful links) =====
  {
    id: 'iphone-availability',
    q: 'Vai pieejamas oriģinālās detaļas iPhone remontam?',
    scopes: [FAQ_CONTEXT.IPHONE],
    aHtml: (
      <>
        Jā - izmantojam oriģinālās vai augstas kvalitātes OEM detaļas (vienojamies pirms
        darba). Skati:{' '}
        <Link href="/iphone-remonts/ekrana-maina">displeja maiņa</Link> un{' '}
        <Link href="/iphone-remonts/baterijas-maina">baterijas maiņa</Link>.
      </>
    ),
    aText:
      'Jā, iPhone remontiem pieejamas oriģinālās vai augstas kvalitātes OEM detaļas, pēc vienošanās pirms remonta.',
    weight: 80,
  },

  // ===== Tablet / Laptop / Dyson =====
  {
    id: 'tablet-what-we-fix',
    q: 'Ko remontējat planšetdatoriem?',
    scopes: [FAQ_CONTEXT.TABLET],
    aHtml: (
      <>
        Ekrānus/stiklu, baterijas, uzlādes ligzdas, kameras, skaņu, programmatūras kļūmes
        u.c. Skati{' '}
        <Link href="/plansetdatoru-remonts">planšetdatoru remonts</Link>.
      </>
    ),
    aText:
      'Planšetdatoriem remontējam ekrānu, bateriju, uzlādes ligzdu, kameras, skaņu un programmatūras problēmas.',
    weight: 70,
  },
  {
    id: 'laptop-what-we-fix',
    q: 'Ko tieši remontējat datoros?',
    scopes: [FAQ_CONTEXT.LAPTOP],
    aHtml: (
      <>
        Ekrānus, tastatūras, baterijas, SSD/RAM, dzesēšanu, barošanas ligzdas, OS
        problēmas u.c. Skati{' '}
        <Link href="/datoru-remonts">datoru remonts</Link>.
      </>
    ),
    aText:
      'Datoros remontējam ekrānus, tastatūras, baterijas, SSD/RAM, dzesēšanu, barošanas ligzdas un programmatūras problēmas.',
    weight: 70,
  },
  {
    id: 'dyson-what-we-fix',
    q: 'Ko remontējat Dyson putekļsūcējiem?',
    scopes: [FAQ_CONTEXT.DYSON],
    aHtml: (
      <>
        Akumulatorus, lādētājus, galvas/mehāniskos mezglus, filtrus, elektrodzinējus,
        vadus/ligzdas u.c. Skati{' '}
        <Link href="/dyson-remonts">Dyson remonts</Link>.
      </>
    ),
    aText:
      'Dyson remontējam akumulatorus, lādētājus, mehāniskās galvas, filtrus, dzinējus un kontaktligzdas.',
    weight: 70,
  },
];

// ---- Utilities ----

function withVariant(q, contextKey) {
  const v = q.variants?.[contextKey];
  return {
    ...q,
    aHtml: v?.aHtml ?? q.aHtml,
    aText: v?.aText ?? q.aText,
  };
}

// Select questions by single context key (exact match in `scopes`)
function selectByScope(contextKey) {
  return QUESTIONS.filter((q) => q.scopes?.includes(contextKey)).map((q) =>
    withVariant(q, contextKey),
  );
}

// Combine multiple context keys while keeping order by `weight` and uniqueness by `id`
export function getFaqItemsMulti(contextKeys = []) {
  const seen = new Set();
  const list = [];
  for (const key of contextKeys) {
    for (const q of selectByScope(key)) {
      if (seen.has(q.id)) continue;
      seen.add(q.id);
      list.push(q);
    }
  }
  return list
    .sort((a, b) => (a.weight ?? 999) - (b.weight ?? 999))
    .map(({ q, aHtml }) => ({ q, a: aHtml }));
}

// Get items for a single context (UI render-ready: { q, a: ReactNode })
export function getFaqItems(contextKey) {
  return {
    items: selectByScope(contextKey)
      .sort((a, b) => (a.weight ?? 999) - (b.weight ?? 999))
      .map(({ q, aHtml }) => ({ q, a: aHtml })),
  };
}

// Build FAQPage JSON-LD for a single context (plain text only)
export function getFaqLd(contextKey) {
  const mainEntity = selectByScope(contextKey)
    .sort((a, b) => (a.weight ?? 999) - (b.weight ?? 999))
    .map(({ q, aText }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: aText },
    }));
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
}

// Convenience: build JSON-LD from explicit ids (if you ever need a custom subset)
export function makeFaqLdFromIds(ids = []) {
  const byId = new Map(QUESTIONS.map((q) => [q.id, q]));
  const mainEntity = ids
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          q.variants?.[FAQ_CONTEXT.IPHONE]?.aText ??
          q.aText,
      },
    }));
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
}
