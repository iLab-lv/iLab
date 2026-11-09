import { serviceSans, serviceMono } from '../(site)/serviceFonts';
import foundation from '../(site)/serviceFoundation.module.scss';
import s from './AdsV2.module.scss';

export const metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdsV2Layout({ children }) {
  return <div className={`${serviceSans.variable} ${serviceMono.variable} ${foundation.scope} ${s.root}`} data-service-redesign data-ads-v2>{children}</div>;
}
