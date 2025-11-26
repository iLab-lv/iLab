import styles from './Footer.module.scss';
import { COMPANY, LOCATIONS } from '@/data/site.config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Lapas kājene">
      <div className={styles.container}>
        {/* TIER 1: Brand bar (logo + legal) */}
        <div className={styles.brandBar}>
          <div className={styles.brandInner}>
            {COMPANY?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={COMPANY.logo}
                alt={COMPANY?.name || 'iLab'}
                className={styles.logo}
                loading="lazy"
              />
            ) : (
              <div className={styles.logoFallback}>iLab</div>
            )}
            <div className={styles.legalLine}>SIA “iLab” · Reģ. nr. 40203288307</div>
          </div>
        </div>

        {/* TIER 2: Columns row — perfectly aligned headings */}
        <div className={styles.columns}>
          {/* Locations */}
          <section className={`${styles.col} ${styles.locCol}`} aria-label="Atrašanās vietas">
            <h3 className={styles.heading}>Atrašanās vietas</h3>
            <div className={styles.rule} aria-hidden="true" />
            <div className={styles.brandLocations}>
              {(LOCATIONS || []).map((loc, idx) => (
                <div
                  key={loc.id}
                  className={`${styles.locItem} ${idx > 0 ? styles.locItemDivided : ''}`}
                >
                  <div className={styles.locLine}>
                    <strong className={styles.locName}>{loc.label}</strong>
                  </div>
                  <div className={styles.locLine}>{loc.address}</div>
                  <div className={styles.locLine}>
                    {loc.tel && (
                      <>
                        Tel. <a href={`tel:${loc.tel}`} aria-label={`Zvanīt: ${loc.label}`}>{loc.tel}</a>
                      </>
                    )}
                    {loc.tel && loc.email && <span className={styles.dot}> · </span>}
                    {loc.email && <a href={`mailto:${loc.email}`}>{loc.email}</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <nav className={`${styles.col} ${styles.linkCol}`} aria-label="Pakalpojumi">
            <h3 className={styles.heading}>Pakalpojumi</h3>
            <div className={styles.rule} aria-hidden="true" />
            <ul className={styles.list}>
              <li><a href="/iphone-remonts">iPhone remonts</a></li>
              <li><a href="/telefonu-remonts">Telefonu remonts</a></li>
              <li><a href="/plansetdatoru-remonts">Planšetdatoru remonts</a></li>
              <li><a href="/datoru-remonts">Datoru remonts</a></li>
              <li><a href="/dyson-remonts">Dyson remonts</a></li>
            </ul>
          </nav>

          {/* Useful links */}
          <nav className={`${styles.col} ${styles.linkCol}`} aria-label="Noderīgas saites">
            <h3 className={styles.heading}>Noderīgas saites</h3>
            <div className={styles.rule} aria-hidden="true" />
            <ul className={styles.list}>
              <li><a href="/par-mums">Par mums</a></li>
              <li><a href="/kontakti">Kontakti</a></li>
              <li><a href="/buj">BUJ</a></li>
              <li><a href="/privatuma-un-sikdatnu-politika">Privātuma un sīkdatņu politika</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Copyright bar (container-scoped hairline above) */}
      <div className={styles.bottomBar} role="contentinfo">
        <div className={styles.bottomInner}>
          <div className={styles.ruleWide} aria-hidden="true" />
          <div className={styles.copy}>
            © {year} iLab.lv — Visas tiesības aizsargātas.
          </div>
        </div>
      </div>
    </footer>
  );
}
