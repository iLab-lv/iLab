'use client';

import LandingBottomDesktop from './LandingBottomDesktop';
import LandingBottomMobile from './LandingBottomMobile';

export default function LandingBottomDock() {
  return (
    <>
      <LandingBottomMobile />
      <LandingBottomDesktop />
    </>
  );
}