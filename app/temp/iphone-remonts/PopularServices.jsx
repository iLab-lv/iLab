import {
  LuBatteryCharging,
  LuCamera,
  LuCircuitBoard,
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
    href: '/iphone-remonts/ekrana-maina',
    price: 'No 110 €',
    description:
      'Bojāta iPhone ekrāna maiņa ar attēla un skārienjutības pārbaudi pēc remonta.',
  },
  {
    icon: LuBatteryCharging,
    title: 'Baterijas maiņa',
    href: '/iphone-remonts/baterijas-maina',
    price: 'No 60 €',
    description:
      'Nolietotas iPhone baterijas maiņa pēc baterijas un uzlādes darbības pārbaudes.',
  },
  {
    icon: LuPlugZap,
    title: 'Uzlādes ligzdas remonts',
    href: '/iphone-remonts/uzlades-ligzdas-maina',
    price: 'No 15 €',
    description:
      'Uzlādes ligzdas pārbaude, tīrīšana vai maiņa, ja savienojums vairs nestrādā stabili.',
  },
  {
    icon: LuCamera,
    title: 'Kameras remonts',
    href: '/iphone-remonts/kameras-remonts',
    price: 'No 29 €',
    description:
      'iPhone kameras moduļa vai stikla pārbaude un remonts, ja kamera nestrādā stabili.',
  },
  {
    icon: LuVolume2,
    title: 'Skaļruņa un mikrofona remonts',
    href: '/iphone-remonts/skalruni-mikrofona-remonts',
    price: 'Pēc modeļa',
    description:
      'Skaļruņa, mikrofona un sarunas kvalitātes pārbaude ar tīrīšanu vai detaļas maiņu.',
  },
  {
    icon: LuDroplets,
    title: 'Ūdens bojājumu diagnostika',
    href: '/iphone-remonts/udens-bojajumu-remonts',
    price: 'No 35 €',
    description:
      'Diagnostika un tīrīšana pēc mitruma, lai novērtētu bojājumu un remonta iespējas.',
  },
  {
    icon: LuCircuitBoard,
    title: 'Mātesplates remonts',
    href: '/iphone-remonts/iphone-plates-remonts',
    price: 'Pēc diagnostikas',
    description:
      'iPhone plates diagnostika un mikrolodēšana, ja ierīce neieslēdzas, nelādējas vai bojājums ir plates līmenī.',
  },
  {
    icon: LuTabletSmartphone,
    title: 'Aizmugurējā stikla maiņa',
    href: '/iphone-remonts/aizmugures-vacina-maina',
    price: 'Pēc modeļa',
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

                  <div className={s.priceBlock}>
                    <span className={s.priceValue}>{service.price}</span>
                    <p className={s.priceLine}>
                      Cena ir atkarīga no iPhone modeļa un detaļas veida.
                    </p>
                    <a className={s.priceLink} href="#iphone-modeli">
                      <span>Izvēlies modeli precīzai cenai</span>
                    </a>
                  </div>

                  <div className={s.actions}>
                    <a className={s.serviceLink} href={service.href}>
                      <span>Skatīt pakalpojumu</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
