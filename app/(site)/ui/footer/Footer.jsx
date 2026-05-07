import styles from './Footer.module.scss';
import { getFooterContent } from './footer.i18n';

export default function Footer({
  variant = 'default',
  locale = 'lv',
  siteSettings,
}) {
  const year = new Date().getFullYear();
  const content = getFooterContent(locale);

  const company = siteSettings?.company || {};
  const locations = Array.isArray(siteSettings?.locations)
    ? siteSettings.locations
    : [];

  const loc1 = locations?.[0];
  const loc2 = locations?.[1];

  const companyName = company?.name || 'iLab';
  const companyUrlLabel =
    company?.url?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'iLab.lv';

  const renderLogo = () =>
    company?.logo ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={company.logo}
        alt={companyName}
        className={styles.logo}
        loading="lazy"
      />
    ) : (
      <div className={styles.logoFallback}>{companyName}</div>
    );

  const renderLocation = (loc) => {
    if (!loc) return null;

    return (
      <div className={styles.locItem}>
        <div className={styles.locLine}>
          <strong className={styles.locName}>{loc.label}</strong>
        </div>

        <div className={styles.locLine}>{loc.address}</div>

        <div className={styles.locLine}>
          {loc.tel && (
            <>
              {content.telLabel}{' '}
              <a
                href={loc.telLink || `tel:${loc.tel}`}
                aria-label={`${content.callLabel}: ${loc.label}`}
              >
                {loc.tel}
              </a>
            </>
          )}

          {loc.tel && loc.email && <span className={styles.dot}> · </span>}

          {loc.email && <a href={`mailto:${loc.email}`}>{loc.email}</a>}
        </div>
      </div>
    );
  };

  return (
    <footer className={styles.footer} aria-label={content.footerLabel}>
      <div className={styles.container}>
        {variant === 'default' ? (
          <>
            <div className={styles.brandBar}>
              <div className={styles.brandInner}>
                {renderLogo()}
                <div className={styles.legalLine}>{content.legalLine}</div>
              </div>
            </div>

            <div className={styles.columns}>
              <section
                className={`${styles.col} ${styles.locCol}`}
                aria-label={content.locationsLabel}
              >
                <h3 className={styles.heading}>{content.locationsLabel}</h3>
                <div className={styles.rule} aria-hidden="true" />

                <div className={styles.brandLocations}>
                  {locations.map((loc, idx) => (
                    <div
                      key={loc.id || loc.label}
                      className={`${styles.locItem} ${
                        idx > 0 ? styles.locItemDivided : ''
                      }`}
                    >
                      <div className={styles.locLine}>
                        <strong className={styles.locName}>{loc.label}</strong>
                      </div>

                      <div className={styles.locLine}>{loc.address}</div>

                      <div className={styles.locLine}>
                        {loc.tel && (
                          <>
                            {content.telLabel}{' '}
                            <a
                              href={loc.telLink || `tel:${loc.tel}`}
                              aria-label={`${content.callLabel}: ${loc.label}`}
                            >
                              {loc.tel}
                            </a>
                          </>
                        )}

                        {loc.tel && loc.email && (
                          <span className={styles.dot}> · </span>
                        )}

                        {loc.email && (
                          <a href={`mailto:${loc.email}`}>{loc.email}</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <nav
                className={`${styles.col} ${styles.linkCol}`}
                aria-label={content.services.label}
              >
                <h3 className={styles.heading}>{content.services.label}</h3>
                <div className={styles.rule} aria-hidden="true" />

                <ul className={styles.list}>
                  {content.services.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav
                className={`${styles.col} ${styles.linkCol}`}
                aria-label={content.useful.label}
              >
                <h3 className={styles.heading}>{content.useful.label}</h3>
                <div className={styles.rule} aria-hidden="true" />

                <ul className={styles.list}>
                  {content.useful.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        ) : (
          <div className={styles.columnsAds}>
            <section
              className={`${styles.col} ${styles.brandCol}`}
              aria-label={companyName}
            >
              <div className={styles.brandInner}>
                {renderLogo()}
                <div className={styles.legalLine}>{content.legalLine}</div>
              </div>
            </section>

            {loc1 && (
              <section
                className={styles.col}
                aria-label={`${content.locationPrefix}: ${loc1.label}`}
              >
                {renderLocation(loc1)}
              </section>
            )}

            {loc2 && (
              <section
                className={styles.col}
                aria-label={`${content.locationPrefix}: ${loc2.label}`}
              >
                {renderLocation(loc2)}
              </section>
            )}
          </div>
        )}
      </div>

      <div className={styles.bottomBar} role="contentinfo">
        <div className={styles.bottomInner}>
          <div className={styles.ruleWide} aria-hidden="true" />
          <div className={styles.copy}>
            © {year} {companyUrlLabel} - {content.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}