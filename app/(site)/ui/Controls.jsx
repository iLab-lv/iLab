'use client';

import s from './Controls.module.scss';

export default function Controls({ facebookUrl, instagramUrl, tiktokUrl }) {
  return (
    <div className={s.wrap} role="complementary" aria-label="Sistēmas vadīklas">
      {/* Slot for Language switcher on desktop */}
      <div id="bottom-left-utility" className={s.slot} />

      {/* Social icons */}
      <div className={s.socials} aria-label="Sociālie tīkli">
        <a href={facebookUrl} target="_blank" rel="noopener" aria-label="Facebook" className={s.ico}>f</a>
        <a href={instagramUrl} target="_blank" rel="noopener" aria-label="Instagram" className={s.ico}>◎</a>
        <a href={tiktokUrl} target="_blank" rel="noopener" aria-label="TikTok" className={s.ico}>♬</a>
      </div>
    </div>
  );
}
