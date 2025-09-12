// app/(site)/sections/home/Services.jsx
import s from './Services.module.scss';

export default function Services({
  id = 'services',
  apple = {
    title: 'Apple ierīču remonts',
    introHTML:
      'Apple serviss Rīgā — <a href="/iphone-remonts">iPhone remonts</a>,<a href="/plansetdatoru-remonts#ipad"> iPad remonts</a> un<a href="/datoru-remonts#macbook"> MacBook remonts</a>. Veicam ekrāna un baterijas maiņu, uzlādes porta remontu un diagnostiku tajā pašā dienā (atkarībā no modeļa). Izmantojam kvalitatīvas detaļas un nodrošinām <strong>90&nbsp;dienu garantiju</strong>. Populārākie pakalpojumi: ekrāna maiņa, baterijas maiņa un uzlādes porta remonts.',
    links: [
      { label: 'iPhone remonts', href: '/iphone-remonts' },
      { label: 'iPad remonts', href: '/plansetdatoru-remonts#ipad' },
      { label: 'MacBook remonts', href: '/datoru-remonts#macbook' },
    ],
  },
  android = {
    title: 'Android — Telefonu un planšetdatoru remonts',
    introHTML:
      'Servisējam <strong>Samsung</strong>, <strong>Xiaomi</strong> un <strong>Huawei</strong> ierīces Rīgā. Veicam ekrāna maiņu, baterijas maiņu un uzlādes porta remontu tajā pašā dienā (atkarībā no modeļa), ar <strong>90&nbsp;dienu garantiju</strong>. Skati arī lapas <a href="/telefonu-remonts">telefonu remonts</a> un<a href="/plansetdatoru-remonts"> planšetdatoru remonts</a>.',
    brands: [
      {
        name: 'Samsung',
        hrefTitle: '/telefonu-remonts/samsung',
        phoneHref: '/telefonu-remonts/samsung',
        phoneLabel: 'Samsung telefonu remonts',
        tabletHref: '/plansetdatoru-remonts#samsung',
        tabletLabel: 'Samsung planšetdatoru remonts',
      },
      {
        name: 'Xiaomi',
        hrefTitle: '/telefonu-remonts/xiaomi',
        phoneHref: '/telefonu-remonts/xiaomi',
        phoneLabel: 'Xiaomi telefonu remonts',
        tabletHref: '/plansetdatoru-remonts#xiaomi',
        tabletLabel: 'Xiaomi planšetdatoru remonts',
      },
      {
        name: 'Huawei',
        hrefTitle: '/telefonu-remonts/huawei',
        phoneHref: '/telefonu-remonts/huawei',
        phoneLabel: 'Huawei telefonu remonts',
        tabletHref: '/plansetdatoru-remonts#huawei',
        tabletLabel: 'Huawei planšetdatoru remonts',
      },
    ],
    allBrandsHref: '/telefonu-remonts',
  },
  twoUp = [
    {
      key: 'pc',
      title: 'Datoru remonts',
      bodyHTML:
        '<a href="/datoru-remonts">Datoru remonts Rīgā</a> — portatīvie un galda datori. Veicam klaviatūras un ekrāna maiņu, baterijas nomaiņu, dzesēšanas sistēmas tīrīšanu/termopastu, SSD uzstādīšanu un OS pārinstalāciju. Apkalpojam arī<a href="/datoru-remonts#macbook"> MacBook</a>. Tajā pašā dienā (atkarībā no modeļa) un ar 90&nbsp;dienu garantiju.',
      href: '/datoru-remonts',
      linkLabel: 'Apskatīt →',
    },
    {
      key: 'dyson',
      title: 'Dyson remonts',
      bodyHTML:
        '<a href="/dyson-remonts">Dyson remonts Rīgā</a> — diagnostika, filtru un akumulatoru maiņa, motora un elektronikas remonts, uzlādes un sūkšanas defektu novēršana, pilna tīrīšana pēc garantijas beigām. Izmantojam kvalitatīvas detaļas un nodrošinām 90&nbsp;dienu garantiju.',
      href: '/dyson-remonts',
      linkLabel: 'Apskatīt →',
    },
  ],
}) {
  return (
    <section id={id} className={`${s.section} ${s.services}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>
          Mūsu pakalpojumi
        </h2>

        {/* APPLE */}
        <article className={s.appleBlock} aria-labelledby={`${id}-apple-title`}>
          <div className={s.appleContent}>
            <h3 id={`${id}-apple-title`} className={s.blockTitle}>
              {apple.title}
            </h3>
            <p className={s.blockIntro} dangerouslySetInnerHTML={{ __html: apple.introHTML }} />
          </div>

          <ul className={s.appleLinks} role="list" aria-label="Apple saīsnes">
            {apple.links.map((l) => (
              <li key={l.href}>
                <a className={s.appleLink} href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </article>

        {/* ANDROID */}
        <article className={s.androidBlock} aria-labelledby={`${id}-android-title`}>
          <h3 id={`${id}-android-title`} className={s.blockTitle}>
            {android.title}
          </h3>
          <p className={s.blockIntro} dangerouslySetInnerHTML={{ __html: android.introHTML }} />

          <ul className={s.brandGrid} role="list">
            {android.brands.map((b) => (
              <li key={b.name} className={s.brandTile}>
                <div className={s.brandLogo} aria-hidden="true">
                  LOGO
                </div>
                <a className={s.brandTitleLink} href={b.hrefTitle}>
                  {b.name}
                </a>
                <div className={s.brandLinks}>
                  <a href={b.phoneHref}>{b.phoneLabel}</a>
                  <span aria-hidden="true">·</span>
                  <a href={b.tabletHref}>{b.tabletLabel}</a>
                </div>
              </li>
            ))}
          </ul>

          <div className={s.androidMore}>
            <a className={s.cardLink} href={android.allBrandsHref}>
              Skatīt visus zīmolus →
            </a>
          </div>
        </article>

        {/* Two half-width blocks */}
        <div className={s.twoUp}>
          {twoUp.map((c) => (
            <article key={c.key} className={s.halfCard} aria-labelledby={`${id}-${c.key}-title`}>
              <h3 id={`${id}-${c.key}-title`} className={s.cardTitle}>
                {c.title}
              </h3>
              <p className={s.cardText} dangerouslySetInnerHTML={{ __html: c.bodyHTML }} />
              <a className={s.cardLink} href={c.href}>
                {c.linkLabel || 'Apskatīt →'}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
