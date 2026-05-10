'use client';

import Logo from '@ui/logo/Logo';
import { useLandingCta } from '../providers/LandingCtaProvider';

import BranchContactPill from './components/BranchContactPill';
import FormCtaButtons from './components/FormCtaButtons';

import s from './LandingTopBar.module.scss';

export default function LandingTopBar() {
  const { locations } = useLandingCta();

  return (
    <header className={s.topBar}>
      <div className={s.inner}>
        <Logo href="https://ilab.lv" />

        <div className={s.desktopContacts} aria-label="Servisa centru kontakti">
          {locations.map((location) => (
            <BranchContactPill key={location.id} location={location} />
          ))}
        </div>

        <div className={s.mobileForms} aria-label="Remonta pieteikšanas darbības">
          <FormCtaButtons />
        </div>
      </div>
    </header>
  );
}