'use client';

import s from './HomePage.module.scss';
import Button from '../components/button/Button';

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.container}>
          <h1 className={s.heading}>Ātrs mobilo ierīču servisa centrs</h1>
          <p className={s.sub}>
            Remonts tajā pašā dienā. 90&nbsp;dienu garantija. Divas filiāles&nbsp;Rīgā: Domina un Spice Home.
          </p>
          <div className={s.cta}>
            <Button variant="primary" size="md" href="/pieraksties" aria-label="Pieteikt remontu">
              Pieteikt remontu
            </Button>
          </div>
        </div>
      </section>

      {/* Section: Services */}
      <section className={`${s.section} ${s.services}`}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Mūsu pakalpojumi</h2>
          <ul className={s.list}>
            <li>Ekrāna maiņa</li>
            <li>Baterijas maiņa</li>
            <li>Uzlādes porta remonts</li>
          </ul>
        </div>
      </section>

      {/* Section: Why */}
      <section className={`${s.section} ${s.why}`}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Kāpēc iLab?</h2>
          <p className={s.copy}>
            Uzticami remonti, caurspīdīgas cenas un ātrs apgrozījums no sertificētiem tehniķiem. Atved — salabosim.
          </p>
        </div>
      </section>
    </main>
  );
}
