import { Fragment } from 'react';
import Link from 'next/link';

import Logo from '../logo/Logo';
import DesktopNav from './DesktopNav';
import HeaderActions from './HeaderActions';
import { buildNavigation } from './navigation.helpers';
import s from './NavBar.module.scss';

export default function NavBar({
  showNavigation = true,
  adaptiveNavigation = false,
  actions,
  // Temporarily hidden until the Shop is ready to promote from Service.
  showShopSwitch = false,
  showHeaderCtas = true,
  logoHref,
  locale = 'lv',
  pathname = '/',
}) {
  const homeHref = logoHref || (locale === 'ru' ? '/ru' : '/');
  const items = showNavigation ? buildNavigation(locale) : [];

  return (
    <Fragment>
      <header className={s.header} role="banner" data-adaptive-header={adaptiveNavigation || undefined}>
        <div className={s.container}>
          <div className={s.brand}>
            <Logo href={homeHref} />
            {showShopSwitch && <Link className={`${s.shopSwitch} ${adaptiveNavigation ? s.brandShopSwitch : s.mobileShopSwitch}`} href="/shop" aria-label={locale === 'ru' ? 'Перейти в магазин iLab' : 'Atvērt iLab veikalu'}>
              <span className={s.switchTrack} aria-hidden="true"><span /></span>
              <span className={s.switchLabel}>{locale === 'ru' ? 'Магазин' : 'Veikals'}</span>
            </Link>}
          </div>

          {showNavigation && <DesktopNav items={items} pathname={pathname} adaptive={adaptiveNavigation} />}

          {actions !== undefined ? <div className={s.focusedActions}>{actions}</div> : <HeaderActions
            showShopSwitch={!adaptiveNavigation && showShopSwitch}
            items={items}
            locale={locale}
            pathname={pathname}
            showHeaderCtas={showHeaderCtas}
            showNavigation={showNavigation}
          />}
        </div>
      </header>
    </Fragment>
  );
}
