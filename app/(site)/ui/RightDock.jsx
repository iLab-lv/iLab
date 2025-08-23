'use client';

import s from './RightDock.module.scss';

/** Desktop-only, fixed on the right with two slots:
 *  - #ctadock-primary   (SaziniesCombo mounts here)
 *  - #ctadock-secondary (PierakstiesButton mounts here)
 */
export default function RightDock() {
  return (
    <div className={s.wrap} role="complementary" aria-label="Galvenās darbības">
      <div id="ctadock-primary" className={s.slot} />
      <div id="ctadock-secondary" className={s.slot} />
    </div>
  );
}
