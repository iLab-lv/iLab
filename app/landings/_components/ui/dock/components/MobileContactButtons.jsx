'use client';

import Button from '@components/button/Button';
import { useLandingCta } from '../../providers/LandingCtaProvider';

import s from './FormCtaButtons.module.scss';

export default function MobileContactButtons() {
  const { openBranchSheet } = useLandingCta();

  return (
    <div className={s.buttons}>
      <Button
        type="button"
        variant="secondary"
        onClick={() => openBranchSheet('whatsapp')}
      >
        WhatsApp
      </Button>

      <Button
        type="button"
        variant="primary"
        onClick={() => openBranchSheet('call')}
      >
        Zvanīt
      </Button>
    </div>
  );
}