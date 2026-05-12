'use client';

import { FaPhone, FaWhatsapp } from 'react-icons/fa6';

import LandingButton from '../../button/LandingButton';
import { useLandingCta } from '../../providers/LandingCtaProvider';

import s from './MobileContactButtons.module.scss';

export default function MobileContactButtons() {
  const { openBranchSheet } = useLandingCta();

  return (
    <div className={s.buttons}>
      <LandingButton
        type="button"
        variant="secondary"
        tone="whatsapp"
        size="lg"
        leadingIcon={FaWhatsapp}
        onClick={() => openBranchSheet('whatsapp')}
      >
        WhatsApp
      </LandingButton>

      <LandingButton
        type="button"
        variant="primary"
        tone="accent"
        size="lg"
        leadingIcon={FaPhone}
        onClick={() => openBranchSheet('call')}
      >
        Zvanīt
      </LandingButton>
    </div>
  );
}