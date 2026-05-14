'use client';

import LandingButton from '../../button/LandingButton';
import { useLandingCta } from '../../providers/LandingCtaProvider';

import s from './FormCtaButtons.module.scss';

export default function FormCtaButtons() {
  const { openPriceForm, openBookingForm } = useLandingCta();

  return (
    <div className={s.buttons}>

        <LandingButton
        type="button"
        variant="primary"
        tone="accent"
        size="lg"
        onClick={openBookingForm}
      >
        Pieteikt vizīti
      </LandingButton>
      
      <LandingButton
        type="button"
        variant="secondary"
        tone="accent"
        size="lg"
        onClick={openPriceForm}
      >
        Uzzināt cenu
      </LandingButton>

      
    </div>
  );
}