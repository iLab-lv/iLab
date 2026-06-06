'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';

import Logo from '../logo/Logo';
import DesktopNav from './DesktopNav';
import HeaderActions from './HeaderActions';
import { buildNavigation, getNavLocaleFromPathname } from './navigation.helpers';
import s from './NavBar.module.scss';

export default function NavBar({
  showNavigation = true,
  showHeaderCtas = true,
  logoHref,
  locale,
  pathname,
}) {
  const currentPathname = usePathname() || '/';
  const resolvedPathname = pathname || currentPathname;
  const resolvedLocale = locale || getNavLocaleFromPathname(resolvedPathname);
  const homeHref = logoHref || (resolvedLocale === 'ru' ? '/ru' : '/');
  const items = showNavigation ? buildNavigation(resolvedLocale) : [];

  return (
    <Fragment>
      <header className={s.header} role="banner">
        <div className={s.container}>
          <div className={s.brand}>
            <Logo href={homeHref} />
          </div>

          {showNavigation && (
            <DesktopNav items={items} pathname={resolvedPathname} />
          )}

          <HeaderActions
            items={items}
            locale={resolvedLocale}
            pathname={resolvedPathname}
            showHeaderCtas={showHeaderCtas}
            showNavigation={showNavigation}
          />
        </div>
      </header>
    </Fragment>
  );
}
