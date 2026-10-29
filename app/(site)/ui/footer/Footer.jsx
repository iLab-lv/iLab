import Link from 'next/link';

import { SOCIALS } from '@/data/site.config';
import styles from './Footer.module.scss';
import { getFooterContent } from './footer.i18n';

const SOCIAL_ICONS = {
  facebook: <path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.76l-.44 2.89h-2.32v6.99A10 10 0 0 0 22 12Z" />,
  instagram: <><rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.75" cy="6.4" r="1.25" fill="currentColor"/></>,
  tiktok: <path fill="currentColor" d="M16.7 2h-3.1v13.1a3.14 3.14 0 1 1-2.5-3.08V8.9a6.25 6.25 0 1 0 5.6 6.2V8.4a8.2 8.2 0 0 0 4.8 1.55V6.84A4.82 4.82 0 0 1 16.7 2Z" />,
};

export default function Footer({ locale = 'lv', siteSettings }) {
  const content = getFooterContent(locale);
  const company = siteSettings?.company || {};
  const locations = Array.isArray(siteSettings?.locations) ? siteSettings.locations : [];
  const companyName = company.name || 'iLab';

  return (
    <footer id="site-footer" className={styles.footer} aria-label={content.footerLabel}>
      <div className={styles.inner}>
        <div className={styles.masthead}>
          <Link href={locale === 'ru' ? '/ru' : '/'} aria-label={locale === 'ru' ? 'Главная iLab' : 'iLab sākumlapa'}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={company.logo || '/brand/logo.svg'} alt={companyName} className={styles.logo} loading="lazy" />
          </Link>
          <p>{content.legalLine}</p>
        </div>
        <div className={styles.grid}>
          <section className={styles.column} aria-label={content.locationsLabel}>
            <p className={styles.label}>{content.locationsLabel}</p>
            {locations.map((location) => (
              <address key={location.id || location.label}>
                <strong>{location.label}</strong><br />{location.address}<br />
                {location.tel && <a href={location.telLink || `tel:${location.tel}`}>{location.tel}</a>}
                {location.tel && location.email && ' · '}
                {location.email && <a href={`mailto:${location.email}`}>{location.email}</a>}
              </address>
            ))}
          </section>
          {[content.services, content.useful].map((group) => (
            <nav className={styles.column} aria-label={group.label} key={group.label}>
              <p className={styles.label}>{group.label}</p>
              {group.items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            </nav>
          ))}
        </div>
        <div className={styles.bottom}>
          <nav className={styles.socials} aria-label={content.socialLabel}>
            {Object.entries(SOCIALS).map(([name, href]) => (
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} key={name}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{SOCIAL_ICONS[name]}</svg>
              </a>
            ))}
          </nav>
          <span>© {new Date().getFullYear()} {companyName}. {content.copyright}</span>
          <span aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
