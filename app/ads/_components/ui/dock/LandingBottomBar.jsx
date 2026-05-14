'use client';

import FormCtaButtons from './components/FormCtaButtons';
import MobileContactButtons from './components/MobileContactButtons';

import s from './LandingBottomBar.module.scss';

export default function LandingBottomBar() {
  return (
    <>
      <aside className={s.desktopBar} aria-label="Remonta pieteikšanas darbības">
        <FormCtaButtons />
      </aside>

      <nav className={s.mobileBar} aria-label="Ātrās saziņas pogas">
        <MobileContactButtons />
      </nav>
    </>
  );
}