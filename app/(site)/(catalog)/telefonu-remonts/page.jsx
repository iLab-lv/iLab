// app/(site)/(catalog)/telefonu-remonts/page.jsx
import Script from 'next/script';
import Link from 'next/link';

import devicesAll from '@/data/devices';
import BrandPreview from '@components/model-grid/BrandPreview';

import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';

import s from '@styles/Catalog.module.scss';
import { listBrandsForCategory, BRAND_CATEGORY } from '@/data/brandContent';

// Icon components (no strings)
import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

const ORIGIN = 'https://www.ilab.lv';

export const metadata = {
  title: 'Telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
  description:
    'Telefonu remonts visiem zīmoliem: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
  alternates: { canonical: '/telefonu-remonts' },
};

// Top 4 models per brand
function topModelsForBrand(list, brandSlug) {
  const filtered = list.filter(
    (d) => d.category === 'telefonu-remonts' && (d.brandSlug || '').toLowerCase() === brandSlug
  );
  const seen = new Set();
  const uniq = [];
  for (const d of filtered) {
    const k = `${d.category}:${d.brandSlug}:${d.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(d);
  }
  uniq.sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : 99999;
    const bo = typeof b.order === 'number' ? b.order : 99999;
    if (ao !== bo) return ao - bo;
    if (a.year && b.year && a.year !== b.year) return b.year - a.year;
    return (a.name || '').localeCompare(b.name || '', 'lv');
  });
  return { items: uniq.slice(0, 4), total: uniq.length };
}

export default function TelefonuRemontsPage() {
  const brands = listBrandsForCategory(BRAND_CATEGORY.PHONES);
  const brandBlocks = brands
    .map(({ slug, name, href }) => {
      const { items, total } = topModelsForBrand(devicesAll, slug);
      return { slug, name, href, items, total };
    })
    .filter((b) => b.total > 0);

  // JSON-LD
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sākums', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Telefonu remonts', item: `${ORIGIN}/telefonu-remonts/` },
    ],
  };
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGIN}/telefonu-remonts#service`,
    serviceType: 'Telefonu remonts',
    areaServed: { '@type': 'Country', name: 'Latvia' },
    provider: { '@id': `${ORIGIN}#organization` },
    url: `${ORIGIN}/telefonu-remonts/`,
    name: 'Telefonu remonts',
    description:
      'Telefonu remonts — displeji, baterijas, uzlādes ligzdas, kameras un citi darbi. Ātra diagnostika, godīgas cenas, garantija.',
  };
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: brandBlocks.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${ORIGIN}${b.href}/`,
      name: `${b.name} telefonu remonts`,
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="itemlist-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>

      {/* HERO */}
      <DeviceHero
        image="/images/categories/iphone_remonts.png"
        alt="iPhone remonts Rīgā"
        focal="right"
        className="category"
        bodyHtml={`<p><strong>Ātrs un drošs iPhone remonts Rīgā</strong> — displeja, baterijas un kameras maiņa tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam.</p>`}
      />

      {/* INTRO (SEO copy under H2; Header owns the H1/lead/CTA) */}
      <section className={s.section} aria-labelledby="phones-intro-h2">
        <div className={s.container}>
          <h2 id="phones-intro-h2" className={s.h2}>Telefonu remonts — ko mēs darām</h2>

          <p className={s.intro}>
            Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas saskaņojam pirms darba uzsākšanas,
            biežākos darbus paveicam tajā pašā dienā. Izvēlies savu zīmolu un atver konkrēta modeļa lapu.
          </p>

          <p className={s.paragraph}>
            Ikdienā veicam <strong>telefonu remontu</strong> — sākot ar <strong>ekrāna maiņu</strong> un{' '}
            <strong>baterijas nomaiņu</strong>, līdz <strong>uzlādes ligzdas remontam</strong>,{' '}
            <strong>kameras problēmām</strong> un <strong>ūdens bojājumu</strong> novēršanai. Pirms darba saskaņojam{' '}
            <strong>cenu un termiņu</strong>, biežākos darbus paveicam tajā pašā dienā. Uzzini, kā notiek remonts sadaļā{' '}
            <Link href="#process-h2">“Kā notiek remonts”</Link>.
          </p>

          <p className={s.paragraph}>
            Strādājam ar <strong>visiem populārajiem zīmoliem</strong>:{' '}
            <Link href="/iphone-remonts">iPhone remonts</Link>,{' '}
            <Link href="/telefonu-remonts/samsung">Samsung telefonu remonts</Link>,{' '}
            <Link href="/telefonu-remonts/huawei">Huawei remonts</Link>,{' '}
            <Link href="/telefonu-remonts/oneplus">OnePlus remonts</Link> u.c. Katram zīmolam ir pieejamas atsevišķas{' '}
            <strong>modeļu lapas</strong> ar biežākajiem bojājumiem un risinājumiem.
          </p>

          <p className={s.paragraph}>
            Biežākie darbi: <strong>displeja remonts</strong> (plaisas, tumši plankumi, nereaģē skāriens),{' '}
            <strong>baterijas maiņa</strong> (strauji krīt uzlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzda</strong>{' '}
            (nenoturas kabelis, lēna/nekonsekventa uzlāde), <strong>kamera</strong> (miglaini attēli, fokusēšanās
            kļūdas), <strong>skaļruņi/mikrofons</strong> (klusa skaņa, krakšķi, sarunās nedzird), kā arī{' '}
            <strong>mitruma bojājumi</strong>. Ja neesi pārliecināts par modeļa nosaukumu, izvēlies zīmolu zemāk un
            atrod modeli sarakstā.
          </p>
        </div>
      </section>

      {/* ===== ANCHOR for Header CTA (must be above the brand previews) ===== */}
      <div id="brand-list" className={s.anchorTarget} />

      {/* Brand previews */}
      {brandBlocks.map((b) => (
        <BrandPreview
          key={b.slug}
          brandSlug={b.slug}
          brandName={b.name}
          items={b.items}
          total={b.total}
          href={b.href}
        />
      ))}

      {/* Popular services — updated to icon cards with explicit hrefs */}
      <section className={s.section} aria-labelledby="popular-services-h2">
        <div className={s.container}>
          <Services
            id="brand-services"
            title="Populārākie remonti"
            items={[
              {
                title: 'Displeja (ekrāna) maiņa',
                text: 'plaisas, tumši plankumi, nereaģē skāriens.',
                icon: LuSmartphone,
                href: '/telefonu-remonts/ekrana-mainja',
              },
              {
                title: 'Akumulatora maiņa',
                text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
                icon: LuBatteryCharging,
                href: '/telefonu-remonts/akumulatora-mainja',
              },
              {
                title: 'Uzlādes ligzda',
                text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
                icon: LuPlugZap,
                href: '/telefonu-remonts/uzlades-ligzda',
              },
              {
                title: 'Kamera',
                text: 'miglaini attēli, fokusēšanās problēmas.',
                icon: LuCamera,
                href: '/telefonu-remonts/kamera-remonts',
              },
              {
                title: 'Skaļruņi/mikrofons',
                text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
                icon: LuVolume2,
                href: '/telefonu-remonts/skalruni-mikrofons',
              },
              {
                title: 'Ūdens bojājumi',
                text: 'diagnostika un atjaunošana, ja tas iespējams.',
                icon: LuDroplets,
                href: '/telefonu-remonts/udens-bojajumi',
              },
            ]}
          />
        </div>
      </section>

      {/* Process */}
      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title="Kā notiek remonts"
            steps={[
              { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
              { title: 'Cena un termiņš', text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.' },
              { title: 'Remonts', text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.' },
              { title: 'Pārbaude', text: 'Pēc remonta testējam visu funkcionalitāti un drošību.' },
              { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
            ]}
            headingLevel={2}
            variant="cards"
          />
        </div>
      </section>

      {/* Why — full width */}
      <section className={s.section}>
        <Why />
      </section>

      {/* FAQ */}
      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="phones-faq"
            title="Biežāk uzdotie jautājumi"
            items={[
              { q: 'Cik ilgi ilgst telefona displeja maiņa?', a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.' },
              { q: 'Vai mani dati saglabāsies?', a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.' },
              { q: 'Vai detaļām ir garantija?', a: 'Jā, gan detaļām, gan darbam.' },
              { q: 'Vai pieejamas oriģinālas detaļas?', a: 'Izmantojam oriģinālas vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.' },
              { q: 'Vai varu saņemt aptuveno cenu pirms remonta?', a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.' },
            ]}
            headingLevel={2}
            variant="accordion"
          />
        </div>
      </section>

      {/* Convert band — full width */}
      <section className={s.section}>
        <ConvertBand />
      </section>
    </>
  );
}
