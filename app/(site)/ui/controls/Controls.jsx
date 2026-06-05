'use client';

import Facebook from '../../components/icons/Facebook';
import Instagram from '../../components/icons/Instagram';
import TikTok from '../../components/icons/TikTok';
import LanguageSwitcher from './LanguageSwitcher';
import s from './Controls.module.scss';

export default function Controls({
  facebookUrl,
  instagramUrl,
  tiktokUrl,
  onLanguageChange,
  placement = 'fixed',
}) {
  const className = placement === 'inline' ? `${s.wrap} ${s.inline}` : s.wrap;

  return (
    <div className={className} role="complementary" aria-label="Sistēmas vadīklas">
      <div className={s.slot}>
        <LanguageSwitcher initial="lv" onChange={onLanguageChange} />
      </div>

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
