// app/(site)/ui/page-header/PageHeader.jsx

import Link from 'next/link';

import ScrollCta from '@components/button/ScrollCta';
import s from './PageHeader.module.scss';

export default function PageHeader({
  title,
  lead,
  scrollCta,
  crumbs = [],
  showBreadcrumbs = true,
}) {
  const displayCrumbs =
    crumbs && crumbs.length > 1 ? crumbs.slice(0, -1) : crumbs || [];

  return (
    <header className={s.header} role="region" aria-label="Lapas virsraksts">
      <div className={s.container}>
        {showBreadcrumbs && displayCrumbs.length > 0 && (
          <nav className={s.breadcrumbs} aria-label="Breadcrumb">
            <ol>
              {displayCrumbs.map((item, i) => (
                <li key={item.href || i} className={s.crumb}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={s.headerRow}>
          <div className={s.textCol}>
            <h1 className={s.title}>{title}</h1>
            {lead ? <p className={s.lead}>{lead}</p> : null}

            {scrollCta?.targetId && scrollCta?.label ? (
              <ScrollCta
                label={scrollCta.label}
                targetId={scrollCta.targetId}
                className={s.cta}
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}