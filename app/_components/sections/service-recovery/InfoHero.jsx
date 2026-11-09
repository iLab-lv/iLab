import Link from 'next/link';
import Image from 'next/image';
import CatalogBookingButton from '../catalog-hub/CatalogBookingButton';
import s from './RemainingPages.module.scss';
import { getSiteSettings } from '@/lib/siteSettings';
import InfoContactButton from './InfoContactButton';

export default async function InfoHero({ title, lead, crumbs = [], locale = 'lv', image, booking = true, aside, contactAside = false, secondary, note, counterAside = false, compactContact = false, contactPrompt = false, outlinedSecondary = false }) {
  const settings = contactAside ? await getSiteSettings() : null;
  const displayTitle = title === 'Lietošanas noteikumi un privātuma politika' ? <><span>Lietošanas noteikumi</span><span>un privātuma politika</span></> : title;
  return <header className={`${s.hero} ${image ? s.splitHero : ''}`}>
    {crumbs.length > 0 && <nav className={s.crumbs} aria-label="Breadcrumb"><ol>{crumbs.map((item, index) => <li key={item.href || index}>{index < crumbs.length - 1 && item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>}
    <div className={s.heroGrid}><div><h1 data-rise>{displayTitle}</h1>{lead && <p className={s.heroLead}>{lead}</p>}{note && <p className={s.heroNote}>{note}</p>}{booking && <div className={s.actions} data-stagger><CatalogBookingButton>{locale === 'ru' ? 'Записаться на ремонт' : 'Pieteikt remontu'}</CatalogBookingButton>{secondary && <Link className={outlinedSecondary ? s.outlinedSecondary : ''} href={secondary.href}>{secondary.label}</Link>}</div>}</div>
      {image && <figure className={s.heroImage} data-scan="x"><Image src={image} alt={title} width={1200} height={1600} priority sizes="(max-width: 1023px) 100vw, 42vw" /></figure>}
      {(aside || contactAside || contactPrompt) && <aside className={`${s.heroAside} ${counterAside ? s.counterAside : ''}`}>{aside}{contactPrompt && <><h2>{locale === 'ru' ? 'Не нашли ответ?' : 'Neatradi atbildi?'}</h2><InfoContactButton locale={locale} /></>}{contactAside && (compactContact ? <div className={s.contactFoot}>{settings.locations.filter(location => location.tel).slice(0, 1).map(location => <p key={location.id}><span>{location.label}</span><a href={location.telLink || `tel:${location.tel.replaceAll(' ', '')}`}>{locale === 'ru' ? 'Позвонить' : 'Zvanīt'}</a>{location.wa && <a href={location.wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>}</p>)}</div> : <ul>{settings.locations.filter(location => location.tel).map(location => <li key={location.id}><span>{location.label}</span><a href={location.telLink || `tel:${location.tel.replaceAll(' ', '')}`}>{location.tel}</a></li>)}</ul>)}</aside>}
    </div>
  </header>;
}
