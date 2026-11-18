'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa6';
import Button from '../(site)/components/button/Button';
import Logo from '../(site)/ui/logo/Logo';
import AdsV3LocationPanel from './AdsV3Locations';
import LandingFaq from '../ads/_components/faq/LandingFaq';
import { getSpeedContent, getServicesContent, getProcessContent, getDeliveryContent, getLocationStrings, getFinalContent, getFooterContent } from '../adsV2/sourceContent';
import { locationLinks } from '../_components/sections/full-locations/locationState';
import { SignatureAccent } from '../_components/sections/headings/SignatureText';
import { getAdsV3Content } from './adsV3.i18n';
import v2 from '../adsV2/AdsV2.module.scss';
import s from './AdsV3Sections.module.scss';

const section = `${v2.section} ${s.section}`;
const Header = ({ id, title, text }) => <header className={v2.sectionHeader}><h2 id={id}>{title}</h2><p>{text}</p></header>;

export function AdsV3Speed({ locale, action }) {
  const t = getSpeedContent(locale);
  return <section id="speed" className={`${section} ${s.speed}`} aria-labelledby="ads-v3-speed-title">
    <Header id="ads-v3-speed-title" title={t.title} text={t.subtitle} />
    <div className={v2.facts} data-v3-sequence="facts">{t.cards.map(card => <article key={card.value}><span className={s.sequenceRule} aria-hidden="true" /><h3>{card.value}</h3><p>{card.title}</p></article>)}</div>
    <div className={`${v2.bookingStrip} ${s.speedBooking}`}><div><h3>{t.bookingTitle} {t.bookingAccent}</h3><p>{t.bookingText}</p></div><Button glow onClick={action('booking', 'speed')}>{t.bookingCta}</Button></div>
  </section>;
}

export function AdsV3Trust({ locale, items }) {
  if (!items.length) return null;
  return <section id="trust" className={`${section} ${v2.trust} ${s.trustBand}`} aria-label={locale === 'ru' ? 'iLab — доверие клиентов' : 'iLab uzticības rādītāji'} data-trust-count={items.length} data-v3-sequence="trust">
    {items.map(item => {
      const number = item.value.match(/^\d+/)?.[0];
      return <article key={item.label}><strong>{number ? <><b data-count={number}>{number}</b>{item.value.slice(number.length)}</> : item.value}</strong><p>{item.label}</p>{item.text && <span>{item.text}</span>}</article>;
    })}
  </section>;
}

export function AdsV3Services({ locale, action, pricesHref, initialFault, onPrice }) {
  const t = getServicesContent(locale);
  const [activeId, setActiveId] = useState(() => t.services.find(item => item.title === initialFault)?.id || t.services[0].id);
  const detail = useRef(null);
  const active = t.services.find(item => item.id === activeId) || t.services[0];
  function select(id) {
    setActiveId(id);
    requestAnimationFrame(() => {
      detail.current?.focus({ preventScroll: true });
      detail.current?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }
  return <section id="services" className={`${section} ${s.repairs}`} aria-labelledby="ads-v3-services-title">
    <Header id="ads-v3-services-title" title={t.eyebrow} text={t.selectorLabel} />
    <div className={v2.serviceLayout}>
      <article ref={detail} className={`${v2.serviceDetail} ${s.serviceDetail}`} id="ads-v3-service-detail" aria-live="polite" aria-labelledby="ads-v3-active-service-title" tabIndex={-1} data-service-id={active.id}>
        <div className={v2.serviceImage} key={active.id}><Image src={active.visual} alt="" fill sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw" /></div>
        <div className={v2.serviceCopy}><p className={s.meta}>{t.timeLabel}: {active.time}</p><h3 id="ads-v3-active-service-title">{active.cardTitle}</h3><p>{active.text}</p><ul>{active.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className={v2.prices}>{active.prices.map(price => <p key={price}>{price}</p>)}</div><div className={v2.actions}><Button glow href={pricesHref} target="_self" onClick={onPrice}>{t.ctaPrice}</Button><Button variant="secondary" onClick={action('booking', 'services', { fault: active.title })}>{t.ctaBook}</Button></div></div>
      </article>
      <div className={v2.serviceSelector} role="group" aria-label={t.selectorLabel}>{t.services.map(item => <button type="button" key={item.id} aria-pressed={active.id === item.id} aria-controls="ads-v3-service-detail" onClick={() => select(item.id)} data-service-choice={item.id}><span>{item.title}</span><small>{item.short}</small></button>)}</div>
    </div>
  </section>;
}

export function AdsV3Brands({ locale, action }) {
  const t = getAdsV3Content(locale).brands;
  return <section id="brands" className={`${section} ${s.brands}`} aria-labelledby="ads-v3-brands-title">
    <Header id="ads-v3-brands-title" title={t.title} text={t.text} />
    <div className={v2.brandLogos}>{[['apple', 'iPhone'], ['samsung', 'Samsung'], ['xiaomi', 'Xiaomi'], ['huawei', 'Huawei']].map(([brand, name]) => <figure key={brand}><Image data-brand={brand} src={`/images/logos/${brand}-logo.svg`} alt={brand === 'apple' ? 'Apple' : name} width={512} height={160} /><figcaption>{name}</figcaption></figure>)}</div>
    <div className={v2.brandNote}><p>{t.note}</p><Button variant="secondary" onClick={action('contact', 'brands')}>{t.cta}</Button></div>
  </section>;
}

export function AdsV3Locations({ locale, locations, defaultHours, pinPositions, selectedLocationId, onSelectLocation }) {
  const t = getLocationStrings(locale);
  const selected = locations.find(item => item.id === selectedLocationId) || locations[0];
  if (!selected) return null;
  return <section id="locations" className={`${section} ${s.locations}`} tabIndex={-1} aria-labelledby="ads-v3-locations-title" data-selected-branch={selected.id}>
    <Header id="ads-v3-locations-title" title={`${t.titleMain} ${t.titleAccent}`} text={t.subtitle} />
    <AdsV3LocationPanel locale={locale} locations={locations} defaultHours={defaultHours} pinPositions={pinPositions} selectedLocationId={selected.id} onSelectLocation={onSelectLocation} />
  </section>;
}

export function AdsV3Process({ locale }) {
  const t = getProcessContent(locale);
  return <section id="process" className={`${section} ${s.process}`} aria-labelledby="ads-v3-process-title"><Header id="ads-v3-process-title" title={t.title} text={t.subtitle} /><ol className={v2.steps} data-v3-sequence="steps">{t.steps.map(step => <li key={step.title}><span className={s.sequenceRule} aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></section>;
}

export function AdsV3Delivery({ locale, action }) {
  const t = getDeliveryContent(locale);
  return <section id="delivery" className={`${section} ${v2.delivery} ${s.delivery}`} aria-labelledby="ads-v3-delivery-title">
    <div className={v2.deliveryCopy}><p className={s.meta}>{t.eyebrow}</p><h2 id="ads-v3-delivery-title">{t.title}</h2><p className={v2.deliveryPromise}>{t.accent}</p><p>{t.subtitle}</p><p>{t.note}</p><Button glow onClick={action('delivery', 'delivery')}>{t.cta}</Button></div>
    <div><div className={`${v2.partners} ${s.partners}`}>{[['Omniva', 'Omniva_logo.svg'], ['DPD', 'DPD_logo.svg'], ['SmartPosti', 'SmartPosti_logo.svg'], ['Latvijas Pasts', 'Latvijas_Pasts.svg']].map(([name, file]) => <div key={name}><Image src={`/images/delivery/${file}`} alt={name} width={140} height={40} /></div>)}</div><ol className={v2.deliverySteps} data-v3-sequence="delivery">{t.steps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div>
  </section>;
}

export function AdsV3Faq({ locale }) {
  return <div className={s.faq}><LandingFaq id="faq" locale={locale} /></div>;
}

export function AdsV3Final({ locale, action, pricesHref, onPrice }) {
  const t = getFinalContent(locale);
  return <section id="final-cta" className={`${section} ${v2.final} ${s.final}`} aria-labelledby="ads-v3-final-title"><p className={s.meta}>{t.note}</p><h2 id="ads-v3-final-title">{t.titleMain}<br /><SignatureAccent>{t.titleAccent}</SignatureAccent></h2><p className={s.finalLead}>{t.text}</p><div className={v2.actions}><Button glow href={pricesHref} target="_self" onClick={onPrice}>{t.price}</Button><Button variant="secondary" leadingIcon={FaPhone} onClick={action('call', 'final')}>{t.call}</Button><Button variant="whatsapp" leadingIcon={FaWhatsapp} onClick={action('whatsapp', 'final')}>{t.whatsapp}</Button></div></section>;
}

export function AdsV3Footer({ locale, locations, company }) {
  const t = getFooterContent(locale);
  return <footer className={`${v2.footer} ${s.footer}`}><div className={v2.footerTop}><div><Logo href="#ads-v3-main" className={v2.footerLogo} />{(company.regNo || company.registrationNumber) && <p>{t.regNo} {company.regNo || company.registrationNumber}</p>}</div>{locations.map(location => <div key={location.id}><h3>{location.label}</h3><p>{location.address}</p><p><a href={locationLinks(location).tel}>{location.tel}</a></p>{location.email && <a href={`mailto:${location.email}`}>{location.email}</a>}</div>)}</div><div className={v2.footerBottom}><p>© {new Date().getFullYear()} iLab. {t.copyright}</p><p>{t.disclaimer}</p></div></footer>;
}
