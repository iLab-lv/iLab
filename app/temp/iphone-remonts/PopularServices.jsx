import {
  LuBatteryCharging,
  LuCamera,
  LuDroplets,
  LuPlugZap,
  LuSmartphone,
  LuTabletSmartphone,
  LuVolume2,
} from 'react-icons/lu';

import s from './PopularServices.module.scss';

const services = [
  {
    icon: LuSmartphone,
    title: 'Ekrāna maiņa',
    description:
      'Bojāta iPhone ekrāna maiņa ar attēla un skārienjutības pārbaudi pēc remonta.',
  },
  {
    icon: LuBatteryCharging,
    title: 'Baterijas maiņa',
    description:
      'Nolietotas iPhone baterijas maiņa pēc baterijas un uzlādes darbības pārbaudes.',
  },
  {
    icon: LuPlugZap,
    title: 'Uzlādes ligzdas remonts',
    description:
      'Uzlādes ligzdas pārbaude, tīrīšana vai maiņa, ja savienojums vairs nestrādā stabili.',
  },
  {
    icon: LuCamera,
    title: 'Kameras remonts',
    description:
      'iPhone kameras moduļa vai stikla pārbaude un remonts, ja kamera nestrādā stabili.',
  },
  {
    icon: LuVolume2,
    title: 'Skaļruņa un mikrofona remonts',
    description:
      'Skaļruņa, mikrofona un sarunas kvalitātes pārbaude ar tīrīšanu vai detaļas maiņu.',
  },
  {
    icon: LuDroplets,
    title: 'Ūdens bojājumu diagnostika',
    description:
      'Diagnostika un tīrīšana pēc mitruma, lai novērtētu bojājumu un remonta iespējas.',
  },
  {
    icon: LuTabletSmartphone,
    title: 'Aizmugurējā stikla maiņa',
    description:
      'Saplaisājuša vai bojāta aizmugurējā stikla maiņa atbilstoši iPhone modelim.',
  },
];

export default function PopularServices() {
  return (
    <section
      id="iphone-services"
      className={s.section}
      aria-labelledby="iphone-services-title"
    >
      <div className={s.container}>
        <div className={s.header}>
          <h2 id="iphone-services-title">
            Populārākie iPhone <span>remonti</span>
          </h2>
          <p>
            Īsi par biežākajiem iPhone remonta darbiem. Precīza cena ir
            atkarīga no modeļa un detaļas veida - izvēlies savu iPhone modeli
            zemāk, lai redzētu pieejamos remonta variantus un cenas.
          </p>
        </div>

        <div className={s.grid}>
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className={s.card} key={service.title}>
                <div className={s.iconWrap} aria-hidden="true">
                  <Icon />
                </div>

                <div className={s.copy}>
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <p className={s.priceLine}>
                    Cena ir atkarīga no iPhone modeļa un detaļas veida.
                  </p>

                  <a className={s.priceLink} href="#iphone-modeli">
                    <span>Izvēlies modeli un skaties cenu</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
