import s from './Services.module.scss';
import IphoneRemonts from './IphoneRemonts';
import AndroidRemonts from './AndroidRemonts';
import DysonRemonts from './DysonRemonts';
import LaptopRemonts from './LaptopRemonts';

export default function Services({
  id = 'services',
  apple = {
    title: 'Apple ierīču remonts',
    introHTML:
      'Apple serviss Rīgā — <a href="/iphone-remonts">iPhone remonts</a>, <a href="/plansetdatoru-remonts/ipad">iPad remonts</a> un <a href="/datoru-remonts/macbook">MacBook remonts</a>. Veicam ekrāna un baterijas maiņu, uzlādes porta remontu un diagnostiku tajā pašā dienā (atkarībā no modeļa). Izmantojam kvalitatīvas detaļas un nodrošinām <strong>90&nbsp;dienu garantiju</strong>. Populārākie pakalpojumi: ekrāna maiņa, baterijas maiņa un uzlādes porta remonts.',
    links: [
      {
        label: 'iPhone remonts',
        href: '/iphone-remonts#iphone-modeli',
        device: 'phone',
        group: 'mobile',
      },
      {
        label: 'iPad remonts',
        href: '/plansetdatoru-remonts/ipad#brand-modeli',
        device: 'tablet',
        group: 'mobile',
      },
      {
        label: 'MacBook remonts',
        href: '/datoru-remonts/macbook#brand-modeli',
        device: 'laptop',
        group: 'computer',
      },
      {
        label: 'iMac remonts',
        href: '/datoru-remonts/imac',
        device: 'imac',
        group: 'computer',
      },
      {
        label: 'Mac Pro remonts',
        href: '/datoru-remonts/mac-pro',
        device: 'station',
        group: 'computer',
      },
    ],
    imageSrc: '/images/home/apple.webp',
  },
  android = {
    title: 'Android — Telefonu un planšetdatoru remonts',
    introHTML:
      'Servisējam <strong>Samsung</strong>, <strong>Xiaomi</strong> un <strong>Huawei</strong> ierīces Rīgā. Veicam ekrāna maiņu, baterijas maiņu un uzlādes porta remontu tajā pašā dienā (atkarībā no modeļa), ar <strong>90&nbsp;dienu garantiju</strong>. Skati arī lapas <a href="/telefonu-remonts">telefonu remonts</a> un <a href="/plansetdatoru-remonts">planšetdatoru remonts</a>.',
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
    imageSrc: '/images/home/android.webp',
  },
  twoUp = [
    {
      key: 'pc',
      title: 'Datoru remonts',
      bodyHTML:
        '<a href="/datoru-remonts">Datoru remonts Rīgā</a> — portatīvie un galda datori. Veicam klaviatūras un ekrāna maiņu, baterijas nomaiņu, dzesēšanas sistēmas tīrīšanu/termopastu, SSD uzstādīšanu un OS pārinstalāciju. Apkalpojam arī <a href="/datoru-remonts/macbook">MacBook</a>, <a href="/datoru-remonts/imac">iMac</a> un <a href="/datoru-remonts/mac-pro">Mac Pro</a>. Tajā pašā dienā (atkarībā no modeļa) un ar 90&nbsp;dienu garantiju.',
      href: '/datoru-remonts',
      linkLabel: 'Apskatīt →',
      imageSrc: '/images/home/laptop.webp',
    },
    {
      key: 'dyson',
      title: 'Dyson remonts',
      bodyHTML:
        '<a href="/dyson-remonts">Dyson remonts Rīgā</a> — diagnostika, filtru un akumulatoru maiņa, motora un elektronikas remonts, uzlādes un sūkšanas defektu novēršana, pilna tīrīšana pēc garantijas beigām. Izmantojam kvalitatīvas detaļas un nodrošinām 90&nbsp;dienu garantiju.',
      href: '/dyson-remonts',
      linkLabel: 'Apskatīt →',
      imageSrc: '/images/home/dyson.webp',
    },
  ],
}) {
  const pcItem = twoUp.find((x) => x.key === 'pc') || {};
  const { key: _pcKey, ...pcProps } = pcItem;

  const dysonItem = twoUp.find((x) => x.key === 'dyson') || {};
  const { key: _dysonKey, ...dysonProps } = dysonItem;

  return (
    <section
      id={id}
      className={`${s.section} ${s.services}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>
          Mūsu pakalpojumi
        </h2>

        <IphoneRemonts idBase={id} {...apple} />
        <AndroidRemonts idBase={id} {...android} />

        <div className={s.twoUp}>
          <LaptopRemonts idBase={id} {...pcProps} />
          <DysonRemonts idBase={id} {...dysonProps} />
        </div>
      </div>
    </section>
  );
}