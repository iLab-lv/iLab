'use client';

import LandingButton from '../../button/LandingButton';
import { useLandingCta } from '../../providers/LandingCtaProvider';

import s from './FormCtaButtons.module.scss';

const PRICE_PAGE_URL = 'https://ilab.lv/cenas';

export default function FormCtaButtons() {
  const { openBookingForm } = useLandingCta();

  return (
    <div className={s.buttons}>
      <LandingButton
        type="button"
        variant="primary"
        tone="accent"
        size="lg"
        onClick={openBookingForm}
      >
        Pieteikt remontu
      </LandingButton>

      <LandingButton
        href={PRICE_PAGE_URL}
        target="_self"
        variant="secondary"
        tone="accent"
        size="lg"
      >
        Uzzināt cenu
      </LandingButton>
    </div>
  );
}
