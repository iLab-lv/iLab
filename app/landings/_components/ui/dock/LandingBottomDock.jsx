'use client';

import Button from '@components/button/Button';
import { useLandingCta } from '../providers/LandingCtaProvider';

import s from './LandingBottomDock.module.scss';

export default function LandingBottomDock() {
  const { openBranchSheet } = useLandingCta();

  return (
    <div className={s.bottomDock} aria-label="Ātrās saziņas pogas">
      <div className={s.inner}>
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
    </div>
  );
}