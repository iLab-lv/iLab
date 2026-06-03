'use client';

import s from './Controls.module.scss';
import LanguageSwitcher from './LanguageSwitcher';

// NEW: import icons
import Facebook from '../../components/icons/Facebook';
import Instagram from '../../components/icons/Instagram';
import TikTok from '../../components/icons/TikTok';

export default function Controls({ facebookUrl, instagramUrl, tiktokUrl, onLanguageChange }) {
  return (
    <div className={s.wrap} role="complementary" aria-label="Sistēmas vadīklas">
      {/* Language (desktop) */}
      <div className={s.slot}>
        <LanguageSwitcher initial="lv" onChange={onLanguageChange} />
      </div>

      {/* Socials */}
      <div className={s.socials} aria-label="Sociālie tīkli">
        <a href={facebookUrl} target="_blank" rel="noopener" aria-label="Facebook" className={s.ico}>
          <Facebook className={s.svg} aria-hidden="true" />
        </a>
        <a href={instagramUrl} target="_blank" rel="noopener" aria-label="Instagram" className={s.ico}>
          <Instagram className={s.svg} aria-hidden="true" />
        </a>
        <a href={tiktokUrl} target="_blank" rel="noopener" aria-label="TikTok" className={s.ico}>
          <TikTok className={s.svg} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
