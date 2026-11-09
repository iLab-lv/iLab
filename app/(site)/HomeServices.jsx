/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import home from './HomePage.module.scss';
import s from './HomeServices.module.scss';

function ServiceLinks({ links, title, numbered = false }) {
  return <nav className={numbered ? s.numberedLinks : s.links} aria-label={title}>
    {links.map(([label, href], index) => <Link href={href} key={href}>
      {numbered && <span className={s.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
      <span className={s.linkLabel}>{label}</span>
    </Link>)}
  </nav>;
}

// The localized page supplies content and destinations; both languages use the
// same composition, imagery, navigation and responsive rules.
export default function HomeServices({ title, lead, services }) {
  return <section className={`${home.section} ${s.section}`} id="pakalpojumi" data-home-services>
    <header className={home.sectionHead}><h2>{title}</h2><p>{lead}</p></header>
    <div className={s.services}>
      {services.map((service, index) => {
        const featured = index < 2;
        const [width, height] = index === 0 ? [1456, 1092] : index === 1 ? [1092, 1456] : [1536, 1024];
        return <article className={`${s.service} ${featured ? s.featured : ''}`} data-home-service={service.key} key={service.key}>
          <div className={s.media} data-scan="x"><img src={service.image} width={width} height={height} alt={service.title} loading="lazy" decoding="async" /></div>
          <div className={s.body}>
            <div className={s.heading}>
              {service.tech && <p className={home.tech}>{service.tech}</p>}
              <h3>{featured ? service.title : <Link href={service.href}>{service.title}</Link>}</h3>
              <p className={s.note}>{service.note}</p>
              {featured && <ServiceLinks links={service.links} title={service.title} numbered />}
            </div>
            <div className={s.copy}>
              <p>{service.body}</p>
              {!featured && <ServiceLinks links={service.links} title={service.title} />}
            </div>
          </div>
        </article>;
      })}
    </div>
  </section>;
}
