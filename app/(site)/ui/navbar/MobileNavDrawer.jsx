'use client';

import Link from 'next/link';
import Controls from '../controls/Controls';
import { SOCIALS } from '@/data/site.config';
import { hasChildren, isNavItemActive } from './navigation.helpers';
import s from './NavBar.module.scss';

export default function MobileNavDrawer({
  items,
  locale,
  pathname,
  mobileOpen,
  mobileExpandedSlug,
  setMobileExpandedSlug,
  setMobileOpen,
}) {
  const contactsHref = locale === 'ru' ? '/ru/kontakty' : '/kontakti';
  const contactsLabel = locale === 'ru' ? 'Контакты' : 'Kontakti';
  const contactsActive = isNavItemActive(pathname, contactsHref);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpandedSlug(null);
  };

  return (
    <div
      id="mobile-drawer"
      className={`${s.mobileMenu} ${mobileOpen ? s.open : ''}`}
      aria-hidden={!mobileOpen}
      inert={!mobileOpen}
    >
      <nav className={s.mobileInner} aria-label="Mobilā navigācija">
        <div className={s.mobileMenuList}>
          {items.map((item) => {
            const slug = item.key;
            const expanded = mobileExpandedSlug === slug;
            const topActive = isNavItemActive(pathname, item.href);

            if (!hasChildren(item)) {
              return (
                <Link
                  key={slug}
                  href={item.href}
                  className={`${s.drawerItem} ${topActive ? s.active : ''}`}
                  aria-current={topActive ? 'page' : undefined}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            }

            const submenuId = `drawer-sub-${slug}`;

            return (
              <div key={slug} className={s.drawerGroup}>
                <div
                  className={`${s.drawerItem} ${s.drawerParent} ${topActive ? s.active : ''}`}
                >
                  <Link
                    href={item.href}
                    className={s.drawerParentLabel}
                    aria-current={topActive ? 'page' : undefined}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>

                  <button
                    type="button"
                    className={s.drawerToggle}
                    aria-label={expanded ? 'Sakļaut sadaļu' : 'Izvērst sadaļu'}
                    aria-expanded={expanded}
                    aria-controls={submenuId}
                    onClick={() => setMobileExpandedSlug(expanded ? null : slug)}
                  >
                    <span aria-hidden>{expanded ? '−' : '+'}</span>
                  </button>
                </div>

                <div id={submenuId} className={s.drawerSubmenu} hidden={!expanded}>
                  {item.children.map((child) => {
                    const subActive = isNavItemActive(pathname, child.href);

                    return (
                      <Link
                        key={`${slug}__${child.key}`}
                        href={child.href}
                        className={`${s.drawerItem} ${subActive ? s.active : ''}`}
                        aria-current={subActive ? 'page' : undefined}
                        onClick={closeMobileMenu}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}


          <div className={s.mobileMenuSecondary}>
            <Link
              href={contactsHref}
              className={`${s.drawerItem} ${s.drawerContactItem} ${contactsActive ? s.active : ''}`}
              aria-current={contactsActive ? 'page' : undefined}
              onClick={closeMobileMenu}
            >
              {contactsLabel}
            </Link>
          </div>
        </div>

        <div className={s.mobileDrawerControls}>
          <Controls
            facebookUrl={SOCIALS.facebook}
            instagramUrl={SOCIALS.instagram}
            tiktokUrl={SOCIALS.tiktok}
            onLanguageChange={closeMobileMenu}
          />
        </div>
      </nav>
    </div>
  );
}