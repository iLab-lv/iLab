'use client';

import { FaPhone, FaWhatsapp } from 'react-icons/fa6';

import { LOCATIONS } from '@/data/site.config';
import LandingButton from '@/app/landings/_components/ui/button/LandingButton';

import s from '@/app/landings/_components/final-cta/LandingFinalCta.module.scss';

const PRICE_PAGE_URL = '/cenas';

function getPrimaryLocation() {
  return LOCATIONS.find((location) => location.id === 'domina') || LOCATIONS[0];
}

export default function IphoneLandingFinalCta({ id = 'final-cta' }) {
  const location = getPrimaryLocation();

  return (
    <section
      id={id}
      className={s.section}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <div className={s.panel}>
          <div className={s.content}>
            <p className={s.eyebrow}>Domina Shopping vai Spice Life</p>

            <h2 id={`${id}-title`}>
              Radusies problēma?
              <span>Salabosim ātri.</span>
            </h2>

            <p className={s.text}>
              Precizēsim cenu, detaļu pieejamību un ieteiksim ērtāko filiāli.
            </p>
          </div>

          <div className={s.actions}>
            <LandingButton
              href={PRICE_PAGE_URL}
              target="_self"
              variant="primary"
              tone="accent"
              size="lg"
            >
              Uzzināt cenu
            </LandingButton>

            <LandingButton
              href={location?.telLink || 'tel:+37123370088'}
              target="_self"
              variant="primary"
              tone="accent"
              size="lg"
              leadingIcon={FaPhone}
            >
              Zvanīt
            </LandingButton>

            <LandingButton
              href={location?.wa || 'https://wa.me/37123370088'}
              variant="secondary"
              tone="whatsapp"
              size="lg"
              leadingIcon={FaWhatsapp}
            >
              WhatsApp
            </LandingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
