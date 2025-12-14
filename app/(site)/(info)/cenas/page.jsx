// app/cenas/page.jsx
import Script from "next/script";

import DeviceHero from "@sections/device-hero/DeviceHero";
import Process from "@sections/process/Process";
import Faq from "@sections/faq/Faq";
import Why from "@sections/why/Why";
import ConvertBand from "@sections/convert-band/ConvertBand";

import BrandPickerPricelist from "@components/service-pricelist/BrandPickerPricelist";

import categories from "@/data/categories";
import devices from "@/data/devices";
import devicePricing from "@/data/devicePricing";

import { ORIGIN, abs, buildBreadcrumbsLd } from "@/lib/seo/jsonldHelpers";

import s from "@styles/Catalog.module.scss";

const SERVICE_PATH = "/cenas";

export const metadata = {
  title: "Cenas | iLab",
  description:
    "iLab remonta cenas pēc modeļa. Izvēlies zīmolu un ierīces modeli, lai redzētu visu pakalpojumu cenas vienuviet.",
  alternates: { canonical: SERVICE_PATH },
};

// -----------------------------
// Helpers
// -----------------------------
function titleCaseSlug(slug = "") {
  const txt = String(slug || "").replace(/[-_]+/g, " ").trim();
  if (!txt) return "—";
  return txt
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function getAllBrandOptions() {
  // Build a slug -> name map from categories brands (best source for human names)
  const nameBySlug = new Map();

  if (Array.isArray(categories)) {
    for (const c of categories) {
      const list = Array.isArray(c?.brands) ? c.brands : [];
      for (const b of list) {
        const slug = String(b?.brandSlug || b?.slug || "").toLowerCase();
        const name = String(b?.name || "").trim();
        if (slug && name && !nameBySlug.has(slug)) nameBySlug.set(slug, name);
      }
    }
  }

  // Keep only brands that actually have devices
  const slugsWithDevices = new Set(
    (Array.isArray(devices) ? devices : [])
      .map((d) => String(d?.brandSlug || "").toLowerCase())
      .filter(Boolean)
  );

  const brandOptions = Array.from(slugsWithDevices)
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => ({
      slug,
      name: nameBySlug.get(slug) || titleCaseSlug(slug),
    }));

  const hasSamsung = brandOptions.some((b) => b.slug === "samsung");
  const defaultBrand = hasSamsung ? "samsung" : brandOptions[0]?.slug || "samsung";

  return { brandOptions, defaultBrand };
}

// -----------------------------
// SEO JSON-LD
// -----------------------------
const breadcrumbsLd = buildBreadcrumbsLd([
  { name: "Sākums", url: abs("/") },
  { name: "Cenas", url: abs(SERVICE_PATH) },
]);

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${ORIGIN}${SERVICE_PATH}#webpage`,
  url: abs(SERVICE_PATH),
  name: "Cenas | iLab",
  description: metadata.description,
};

const FAQ_ITEMS = [
  {
    q: "Kāpēc dažiem modeļiem cena nav redzama?",
    a: "Ne visiem modeļiem un pakalpojumiem cenas ir publicētas. Šādos gadījumos sazinieties ar mums — precizēsim cenu un termiņu pēc diagnostikas.",
  },
  {
    q: "Vai cena var atšķirties pēc diagnostikas?",
    a: "Dažreiz jā — ja papildus konstatējam citus bojājumus (piemēram, uzlādes ķēdes vai mitruma sekas), pirms remonta saskaņojam atjauninātu tāmi.",
  },
  {
    q: "Vai ir garantija?",
    a: "Jā — remontiem parasti ir garantija. Konkrētais termiņš var atšķirties atkarībā no pakalpojuma un detaļas veida.",
  },
];

// Optional FAQ schema for /cenas (utility page)
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }, index) => ({
    "@type": "Question",
    "@id": `${ORIGIN}${SERVICE_PATH}#faq-q${index + 1}`,
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// -------------------------------------------------
// PAGE (server component)
// -------------------------------------------------
export default function CenasPage({ searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;
  const { brandOptions, defaultBrand } = getAllBrandOptions();

  return (
    <>
      {/* JSON-LD */}
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="webpage-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(webPageLd)}
      </Script>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

 

      

      {/* BRAND PICKER + PRICELIST */}
      <section id="cenas" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            Izvēlies zīmolu
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricing={devicePricing}
            brandOptions={brandOptions}
            defaultBrand="apple"
            categorySlug={null}
            // IMPORTANT:
            // /cenas should show ALL services at once.
            // For that, BrandPickerPricelist must treat missing/empty serviceIds as "all services".
            // If your component currently requires serviceIds, set it up to default to "all".
            serviceIds={[]}
            title="Cenas pēc modeļa"
            // Optional: where to send users for full catalog hubs
            allModelsHref="/"
            cta={{ label: "Pieteikties remontam", href: "#pieteikties" }}
            className={s.section}
          />
        </div>
      </section>

      {/* PROCESS (generic) */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā uzzināt precīzu cenu"
            steps={[
              {
                title: "Izvēlies modeli",
                text: "Atrodi savu zīmolu un modeli cenrādī — redzēsi publicētās cenas un tipiskos pakalpojumus.",
              },
              {
                title: "Ja cena nav redzama — sazinies",
                text: "Dažiem retākiem modeļiem vai darbiem cenu nosakām pēc diagnostikas un detaļu pieejamības.",
              },
              {
                title: "Saskaņojam tāmi un termiņu",
                text: "Pirms remonta apstiprinām cenu un izpildes laiku. Nekādu pārsteigumu pēc fakta.",
              },
              {
                title: "Remonts + tests",
                text: "Veicam remontu, testējam un izsniedzam ierīci ar garantiju (atkarībā no darba/detaļas).",
              },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* WHY US */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="faq"
            title="Biežāk uzdotie jautājumi"
            groups={[{ label: "Cenas", items: FAQ_ITEMS }]}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* BOOKING / CTA */}
      <section id="pieteikties" className={s.section} aria-label="Pieteikties remontam">
        <div className={s.container}>
          <ConvertBand />
        </div>
      </section>
    </>
  );
}
