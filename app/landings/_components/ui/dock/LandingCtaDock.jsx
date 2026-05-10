'use client';

import LandingTopBar from './LandingTopBar';
import LandingBottomBar from './LandingBottomBar';
import LandingBranchSheet from './LandingBranchSheet';
import LandingLeadSheet from '../forms/LandingLeadSheet';

export default function LandingCtaDock({ siteSettings }) {
  return (
    <>
      <LandingTopBar siteSettings={siteSettings} />
      <LandingBottomBar />
      <LandingBranchSheet />
      <LandingLeadSheet />
    </>
  );
}