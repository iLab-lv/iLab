'use client';

import s from './BottomBar.module.scss';

/** Mobile-only fixed bottom bar with two slots:
 *  - #bottombar-primary   (SaziniesCombo)
 *  - #bottombar-secondary (PierakstiesButton)
 */
export default function BottomBar() {
  return (
    <div className={s.bar} role="region" aria-label="Mobilās darbības josla">
      <div className={s.inner}>
        <div id="bottombar-primary" className={s.slot} />
        <div id="bottombar-secondary" className={s.slot} />
      </div>
    </div>
  );
}
