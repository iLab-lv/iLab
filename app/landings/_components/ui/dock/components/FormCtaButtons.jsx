'use client';

import Button from '@components/button/Button';
import { useLandingCta } from '../../providers/LandingCtaProvider';

import s from './FormCtaButtons.module.scss';

export default function FormCtaButtons() {
  const { openPriceForm, openBookingForm } = useLandingCta();

  return (
    <div className={s.buttons}>
      <Button
        type="button"
        variant="secondary"
        onClick={openPriceForm}
      >
        Sazināt cenu
      </Button>

      <Button
        type="button"
        variant="primary"
        onClick={openBookingForm}
      >
        Pieteikt remontu
      </Button>
    </div>
  );
}