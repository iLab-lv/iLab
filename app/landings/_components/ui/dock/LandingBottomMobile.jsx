'use client';

import Button from '@components/button/Button';
import { useLandingCta } from '../providers/LandingCtaProvider';

import s from './LandingBottomDock.module.scss';

export default function LandingBottomMobile() {
  const { openBranchSheet } = useLandingCta();

  return (
    <div className={s.mobileDock} aria-label="Ātrās saziņas pogas">
      <div className={s.mobileInner}>
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