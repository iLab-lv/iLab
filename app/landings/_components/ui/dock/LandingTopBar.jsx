'use client';

import Link from 'next/link';

import Logo from '@ui/logo/Logo';
import Button from '@components/button/Button';
import { useLandingCta } from '../providers/LandingCtaProvider';

import s from './LandingTopBar.module.scss';

export default function LandingTopBar({ siteSettings }) {
  const { openPriceForm, openBookingForm } = useLandingCta();

  const logoLabel = siteSettings?.company?.name || 'iLab';

  return (
    <header className={s.topBar}>
      <div className={s.inner}>
        <Logo href="https://ilab.lv" />

        <div className={s.actions}>
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
      </div>
    </header>
  );
}
