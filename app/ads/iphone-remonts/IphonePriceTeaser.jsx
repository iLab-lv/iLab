'use client';

import Link from 'next/link';

import sCatalog from '@styles/Catalog.module.scss';
import s from './IphonePriceTeaser.module.scss';

import Button from '@components/button/Button';
import devicePricing from '@/data/devicePricing';
import { useUiDialogs } from '@ui/providers/UiDialogsProvider'; // adjust path if needed

// Models shown in the teaser
const FEATURED_MODELS = [
  {
    slug: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    image: '/images/devices/iphone/iphone-16-Pro-Max.webp',
  },
  {
    slug: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    image: '/images/devices/iphone/iphone-16-Pro.webp',
  },
  {
    slug: 'iphone-16-plus',
    name: 'iPhone 16 Plus',
    image: '/images/devices/iphone/iphone-16-Plus.webp',
  },
  {
    slug: 'iphone-16',
    name: 'iPhone 16',
    image: '/images/devices/iphone/iphone-16.webp',
  },
  {
    slug: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    image: '/images/devices/iphone/iPhone-15-Pro-Max.webp',
  },
  {
    slug: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    image: '/images/devices/iphone/iPhone-15-Pro.webp',
  },
  {
    slug: 'iphone-15',
    name: 'iPhone 15',
    image: '/images/devices/iphone/iPhone-15.webp',
  },
  {
    slug: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    image: '/images/devices/iphone/iPhone-14-Pro.webp',
  },
  {
    slug: 'iphone-13-pro',
    name: 'iPhone 13 Pro',
    image: '/images/devices/iphone/iPhone-13-Pro.webp',
  },
  {
    slug: 'iphone-11',
    name: 'iPhone 11',
    image: '/images/devices/iphone/iphone-11.webp',
  },
];

function getItemPrice(slug, id) {
  const cfg = devicePricing?.[slug];
  if (!cfg?.items) return null;
  const line = cfg.items.find((item) => item.id === id);
  return line?.price ?? null;
}

function formatPrice(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return `${value} €`;
  return value; // strings like "no 60", "pēc pieprasījuma"
}

export default function IphonePriceTeaser() {
  const { openContact } = useUiDialogs();

  const handleContactClick = (event) => {
    // open full-screen "Sazināties" panel
    openContact(event?.currentTarget || null);
  };

  return (
    <section
      className={`${sCatalog.section} ${s.section}`}
      aria-labelledby="iphone-price-teaser-h2"
    >
      <div className={sCatalog.container}>
        <header className={s.header}>
          <h2 id="iphone-price-teaser-h2" className={sCatalog.h2}>
            Precīzas cenas populārākajiem iPhone
          </h2>
          <p className={sCatalog.intro}>
            Ekrāna un baterijas maiņas cenas jaunākajiem iPhone modeļiem. Pārējiem
            modeļiem — droši jautā, atbildēsim ar konkrētu piedāvājumu.
          </p>
        </header>

        <div className={s.grid}>
          {FEATURED_MODELS.map((model) => {
            const displayPrice = formatPrice(
              getItemPrice(model.slug, 'display-original'),
            );
            const batteryPrice = formatPrice(
              getItemPrice(model.slug, 'battery'),
            );

            const hasDisplay = !!displayPrice;
            const hasBattery = !!batteryPrice;

            return (
              <article key={model.slug} className={s.card}>
                <div className={s.thumbWrap}>
                  <img
                    src={model.image}
                    alt={model.name}
                    className={s.thumb}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className={s.model}>{model.name}</h3>

                <div className={s.priceTable}>
                  {hasDisplay && (
                    <div className={s.priceRow}>
                      <span className={s.priceLabel}>Ekrāna maiņa</span>
                      <span className={s.priceValue}>{displayPrice}</span>
                    </div>
                  )}

                  {hasBattery && (
                    <div className={s.priceRow}>
                      <span className={s.priceLabel}>Baterijas maiņa</span>
                      <span className={s.priceValue}>{batteryPrice}</span>
                    </div>
                  )}

                  {!hasDisplay && !hasBattery && (
                    <div className={s.priceRowMuted}>
                      Cena pēc pieprasījuma
                    </div>
                  )}
                </div>

                <p className={s.note}>
                  Cenā iekļauta detaļa un darbs. Precīzu apstiprinām pirms remonta.
                </p>
              </article>
            );
          })}
        </div>

        <div className={s.actionsRow}>
          {/* Link on the left, button on the right, both aligned as a group to the right */}
          <Link href="/iphone-remonts" className={s.allLink}>
            Skatīt visus iPhone modeļus un cenas
          </Link>

          <Button
            variant="primary"
            size="md"
            onClick={handleContactClick}
          >
            Sazināties par savu modeli
          </Button>
        </div>
      </div>
    </section>
  );
}
