import { Fragment } from 'react';

import Logo from '../logo/Logo';
import DesktopNav from './DesktopNav';
import HeaderActions from './HeaderActions';
import { buildNavigation } from './navigation.helpers';
import s from './NavBar.module.scss';

export default function NavBar({
  showNavigation = true,
  showHeaderCtas = true,
  logoHref,
  locale = 'lv',
  pathname = '/',
}) {
  const homeHref = logoHref || (locale === 'ru' ? '/ru' : '/');
  const items = showNavigation ? buildNavigation(locale) : [];

  return (
    <Fragment>
      <header className={s.header} role="banner">
        <div className={s.container}>
          <div className={s.brand}>
            <Logo href={homeHref} />
          </div>

          {showNavigation && <DesktopNav items={items} pathname={pathname} />}

          <HeaderActions
            items={items}
            locale={locale}
            pathname={pathname}
            showHeaderCtas={showHeaderCtas}
            showNavigation={showNavigation}
          />
        </div>
      </header>
    </Fragment>
  );
}
