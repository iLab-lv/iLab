'use client';

import LandingTopBar from './LandingTopBar';
import LandingBottomDock from './LandingBottomDock';
import LandingBranchSheet from './LandingBranchSheet';
import LandingLeadSheet from '../forms/LandingLeadSheet';

export default function LandingCtaDock({ siteSettings }) {
  return (
    <>
      <LandingTopBar siteSettings={siteSettings} />
      <LandingBottomDock />
      <LandingBranchSheet />
      <LandingLeadSheet />
    </>
  );
}