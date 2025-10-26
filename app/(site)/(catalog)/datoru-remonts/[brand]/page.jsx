// app/(site)/(catalog)/datoru-remonts/[brand]/page.jsx

import Link from 'next/link';
import { notFound } from 'next/navigation';

import servicesContent from '@/data/servicesContent';
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

import s from '../DatoruCategory.module.scss';

export const revalidate = 0; // valid on server components only

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

export default function DatoruBrandPage({ params }) {
  const brandSlug = String(params?.brand || '').toLowerCase();
  const brand = BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) return notFound();

  const svc = servicesContent['datoru-remonts']?.services || [];
  const services = svc.map((it) => ({
    ...it,
    icon: ICONS[it.icon] || LuBug,
  }));

  return (
    <main className={s.main}>
      <nav className={s.breadcrumbs} aria-label="Drupačas">
        <ol>
          <li><Link href="/datoru-remonts">Datoru remonts</Link></li>
          <li aria-current="page">{brand.label}</li>
        </ol>
      </nav>

      <section className={s.section}>
        <div className={s.container}>
          <h1 className={s.h1}>{brand.label} datoru remonts</h1>
          <p className={s.leadText}>
            Veicam {brand.label} diagnostiku, ekrāna un tastatūras maiņu, mātesplates un uzlādes ligzdas remontu,
            kā arī SSD/RAM uzlabojumus un remontu pēc mitruma.
          </p>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.container}>
          <Services id="services" title={`${brand.label} pakalpojumi`} items={services} />
        </div>
      </section>

      <section className={s.section}>
        <div className={s.container}>
          <p className={s.note}>
            Neredzi savu modeli vai specifisku pakalpojumu? <Link href="/kontakti">Sazinies ar mums</Link> —
            ieteiksim risinājumu un sagatavosim piedāvājumu.
          </p>
        </div>
      </section>
    </main>
  );
}
