import Link from 'next/link';

import { hasChildren, isNavItemActive } from './navigation.helpers';
import s from './NavBar.module.scss';

export default function DesktopNav({ items, pathname }) {
  return (
    <nav className={s.nav} aria-label="Galvenā navigācija">
      {items.map((item) => {
        const slug = item.key;
        const topActive = isNavItemActive(pathname, item.href);

        if (!hasChildren(item)) {
          return (
            <Link
              key={slug}
              href={item.href}
              className={`${s.navItem} ${topActive ? s.active : ''}`}
              aria-current={topActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        }

        const panelId = `nav-dd-${slug}`;

        return (
          <div key={slug} className={s.ddWrap}>
            <Link
              href={item.href}
              className={`${s.navItem} ${s.navParent} ${topActive ? s.active : ''}`}
              aria-haspopup="true"
              aria-controls={panelId}
              aria-current={topActive ? 'page' : undefined}
            >
              {item.label}
              <span className={s.chev} aria-hidden>
                ›
              </span>
            </Link>

            <div id={panelId} className={s.dropdown}>
              <ul className={s.menuCol}>
                {item.children.map((child) => {
                  const subActive = isNavItemActive(pathname, child.href);

                  return (
                    <li key={`${slug}__${child.key}`}>
                      <Link
                        href={child.href}
                        className={`${s.menuLink} ${subActive ? s.active : ''}`}
                        aria-current={subActive ? 'page' : undefined}
                      >
                        {child.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
