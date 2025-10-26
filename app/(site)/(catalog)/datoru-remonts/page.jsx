// app/(site)/(catalog)/datoru-remonts/page.jsx

import Link from 'next/link';

import servicesContent from '@/data/servicesContent';
import categoryContent from '@/data/categoryContent';
import Services from '@sections/services/Services';

import {
  LuBug,
  LuKeyboard,
  LuMonitor,
  LuCpu,
  LuPlugZap,
  LuHardDrive,
  LuDroplets,
} from 'react-icons/lu';

import s from './DatoruCategory.module.scss';

const BRANDS = [
  { label: 'MacBook', slug: 'macbook' },
  { label: 'iMac', slug: 'imac' },
  { label: 'Mac Pro', slug: 'mac-pro' },
  { label: 'Lenovo', slug: 'lenovo' },
  { label: 'HP', slug: 'hp' },
  { label: 'MSI', slug: 'msi' },
  { label: 'Dell', slug: 'dell' },
  { label: 'Asus', slug: 'asus' },
  { label: 'Acer', slug: 'acer' },
];

const ICONS = {
  LuBug,
  LuKeyboard,
  LuMonitor,
  LuCpu,
  LuPlugZap,
  LuHardDrive,
  LuDroplets,
};

export default function DatoruRemontsPage() {
  // Header hero is handled by your layout via categoryContent['datoru-remonts']
  const svc = servicesContent['datoru-remonts']?.services || [];
  const services = svc.map((it) => ({
    ...it,
    icon: ICONS[it.icon] || LuBug,
  }));

  return (
    <main className={s.main}>
      {/* Brand Grid (scrollCta points to this id) */}
      <section id="brand-list" className={s.section}>
        <div className={s.container}>
          <h2 className={s.h2}>Zīmoli, ko remontējam</h2>
          <p className={s.leadText}>
            Izvēlies zīmolu, lai apskatītu pakalpojumus un cenas (ja pieejamas).
          </p>

          <ul className={s.brandGrid} aria-label="Datoru zīmolu saraksts">
            {BRANDS.map((b) => (
              <li key={b.slug} className={s.brandItem}>
                <Link href={`/datoru-remonts/${b.slug}`} className={s.brandLink}>
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Shared category services */}
      <section id="datoru-pakalpojumi" className={s.section}>
        <div className={s.container}>
          <Services id="services" title="Datoru remonta pakalpojumi" items={services} />
        </div>
      </section>
    </main>
  );
}
