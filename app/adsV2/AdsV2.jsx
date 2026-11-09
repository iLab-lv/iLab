'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa6';
import Button from '../(site)/components/button/Button';
import FullscreenPanel from '../(site)/ui/panels/FullscreenPanel';
import { computeOpenState, getRigaNow } from '../(site)/ui/panels/branchAvailability';
import LeadForm from './LeadForm';
import { getSpeedContent, getServicesContent, getDeliveryContent, getFaqContent, getLocationStrings, getFinalContent, getFooterContent, getTrustItems } from './sourceContent';
import s from './AdsV2.module.scss';
import h from '../(site)/HomePage.module.scss';
import NavBar from '../(site)/ui/navbar/NavBar';
import Logo from '../(site)/ui/logo/Logo';
import { HomeLocations } from '../(site)/HomeInteractions';
import { HomeMotion } from '../(site)/HomeMotion';
import { startServiceMotion } from '../(site)/serviceMotionRuntime';
import motion from '../(site)/ServiceMotion.module.scss';
import dock from '../(site)/ui/bottombar/BottomBar.module.scss';
import { HomeReviews, HomeFaq, HomeRepairProcess } from '../(site)/HomeSections';
import { getProcessContent as getHomeProcess } from '../(site)/sections/process/process.i18n';

const LEAD_MODES = new Set(['price', 'booking', 'delivery']);
function normalizeLocation(location) {
  const tel = location.tel || location.phone || '';
  const label = location.label || location.name || location.title || '';
  const lat = location.lat || location.geo?.lat;
  const lng = location.lng || location.geo?.lng;
  return { ...location, label, tel,
    telLink: location.telLink || (tel ? `tel:${tel.replace(/\s/g, '')}` : ''),
    wa: location.wa || location.whatsapp || (tel ? `https://wa.me/${tel.replace(/\D/g, '')}` : ''),
    maps: location.maps || location.mapUrl || location.destination || '',
    waze: location.waze || (lat && lng ? `https://waze.com/ul?ll=${lat},${lng}&navigate=yes` : `https://waze.com/ul?q=${encodeURIComponent([label, location.address].filter(Boolean).join(', '))}&navigate=yes`),
  };
}

function Location({ location, locale, compact = false, action = 'contact' }) {
  const t = getLocationStrings(locale);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const update = () => {
      const override = location.hoursOverride?.date === getRigaNow().date ? location.hoursOverride : null;
      setStatus(computeOpenState(location.hours, override, { closed: t.closed, openUntil: (time) => t.open.replace('{time}', time), closedUntil: (time) => t.closedUntil.replace('{time}', time) }));
    };
    update(); const timer = setInterval(update, 60000); return () => clearInterval(timer);
  }, [location, t.closed, t.open, t.closedUntil]);
  return <article className={`${s.location} ${compact ? s.compactLocation : ''}`} id={compact ? undefined : location.id}>
    <div className={s.locationHeading}><h3>{location.label}</h3>{status && <span className={s.status} data-open={status.open}>{status.badgeText}</span>}</div>
    <p>{location.address}</p>{location.specialNotice && <p>{location.specialNotice}</p>}
    <p className={s.phone}>{location.tel}</p>
    <div className={s.actions}>
      {location.telLink && action !== 'whatsapp' && <Button href={location.telLink} target="_self" variant="secondary" leadingIcon={FaPhone}>{t.call}</Button>}
      {location.wa && action !== 'call' && <Button href={location.wa} variant="whatsapp" data-contact-whatsapp leadingIcon={FaWhatsapp} rel="noopener noreferrer">WhatsApp</Button>}
    </div>
    {!compact && <><div className={s.mapLinks}>{location.maps && <a href={location.maps} target="_blank" rel="noopener noreferrer">Google Maps</a>}{location.waze && <a href={location.waze} target="_blank" rel="noopener noreferrer">Waze</a>}</div>
      {!!location.hours?.length && <details className={s.hours}><summary>{t.hours}</summary><dl>{location.hours.map((hours, index) => <div key={`${hours.day}-${index}`}><dt>{locale === 'ru' ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][index] : hours.day}</dt><dd>{hours.opens} – {hours.closes}</dd></div>)}</dl></details>}
    </>}
  </article>;
}


// Use the homepage's actual text, review-word, counter, image and accordion runtime.
// Navigation transitions and the service dialog provider are intentionally separate.
function useAdsMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const logos = [...root.querySelectorAll('#reviews img, [data-logo-reveal]')];
    let logoObserver;
    const logoAnimations = new Set();
    let stop = () => {};
    const restart = () => {
      stop(); logoObserver?.disconnect();
      logoAnimations.forEach(animation => animation.cancel()); logoAnimations.clear();
      root.removeAttribute('data-motion-ready');
      if (!reduced.matches) {
        stop = startServiceMotion(root);
        root.setAttribute('data-motion-ready', '');
        logoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const animation = entry.target.animate([{ opacity: .45, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 480, easing: 'cubic-bezier(.16,1,.3,1)' });
          logoAnimations.add(animation);
          animation.finished.then(() => logoAnimations.delete(animation)).catch(() => {});
          logoObserver.unobserve(entry.target);
        }), { rootMargin: '0px 0px 8% 0px', threshold: .05 });
        logos.forEach(logo => logoObserver.observe(logo));
      }
    };
    restart(); reduced.addEventListener('change', restart);
    return () => { stop(); logoObserver?.disconnect(); logoAnimations.forEach(animation => animation.cancel()); reduced.removeEventListener('change', restart); root.removeAttribute('data-motion-ready'); };
  }, [rootRef]);
}

export default function AdsV2({ locale, siteSettings, reviewsSummary = {} }) {
  const ru = locale === 'ru';
  const locations = (siteSettings.locations || []).map(normalizeLocation);
  const company = siteSettings.company || {};
  const speed = getSpeedContent(locale);
  const services = getServicesContent(locale);
  const process = getHomeProcess(locale);
  const places = ['domina','spice'].map(key => { const data=reviewsSummary[key] || {}; return {key, name:data.latest?.name || data.name || (key==='domina' ? 'T/C Domina Shopping' : 'T/C Spice Life'), rating:data.latest?.rating ?? data.rating, count:data.latest?.count ?? data.count, reviews:data.featuredReviewsByLocale || {}, placeId:data.placeId || data.latest?.placeId}; });
  const totalReviews = places.some(place => place.count != null) ? places.reduce((sum,place) => sum + (Number(place.count)||0),0) : null;
  const delivery = getDeliveryContent(locale);
  const faq = getFaqContent(locale);
  const locationText = getLocationStrings(locale);
  const final = getFinalContent(locale);
  const footer = getFooterContent(locale);
  const trust = getTrustItems(locale, reviewsSummary);
  const ui = { book: ru ? 'Записаться' : 'Pieteikt remontu', prices: ru ? 'Цены' : 'Cenas', call: ru ? 'Позвонить' : 'Zvanīt', contact: ru ? 'Свяжитесь с нами' : 'Sazinies ar mums', branches: ru ? 'Выберите мастерскую в Риге' : 'Izvēlies darbnīcu Rīgā', close: ru ? 'Закрыть' : 'Aizvērt', reviews: ru ? 'Отзывы Google' : 'Google atsauksmes' };
  const [drawer, setDrawer] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(locations[0]?.id);
  const [activeService, setActiveService] = useState('screen');
  const [priceHref, setPriceHref] = useState('https://ilab.lv/cenas');
  const [localeHref, setLocaleHref] = useState(`/adsV2?lang=${ru ? 'lv' : 'ru'}`);
  const openerRef = useRef(null);
  const backgroundRef = useRef(null);
  const serviceDetailRef = useRef(null);
  const scrollToServiceRef = useRef(false);
  useAdsMotion(backgroundRef);
  const active = services.services.find((service) => service.id === activeService) || services.services[0];
  const open = (mode, values = {}) => { openerRef.current = document.activeElement; setDrawer({ mode, values }); };
  const close = useCallback(() => setDrawer(null), []);
  const selectService = id => {
    if (id === activeService) return;
    scrollToServiceRef.current = true;
    setActiveService(id);
  };
  useEffect(() => {
    if (!scrollToServiceRef.current || !serviceDetailRef.current) return;
    scrollToServiceRef.current = false;
    serviceDetailRef.current.focus({ preventScroll: true });
    serviceDetailRef.current.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [activeService]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const form = params.get('form');
    if (LEAD_MODES.has(form)) setDrawer({ mode: form, values: {} });
    const service = params.get('service');
    if (services.services.some((item) => item.id === service)) setActiveService(service);
    const price = new URL('https://ilab.lv/cenas');
    for (const [key, value] of params) if (!['lang', 'form', 'service'].includes(key)) price.searchParams.append(key, value);
    setPriceHref(price.href);
    params.set('lang', ru ? 'lv' : 'ru');
    setLocaleHref(`${window.location.pathname}?${params.toString()}${window.location.hash}`);
  // Initial URL prefill is intentionally read once per localized page.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => { if (backgroundRef.current) backgroundRef.current.inert = Boolean(drawer); }, [drawer]);
  const isLead = drawer && LEAD_MODES.has(drawer.mode);
  const drawerTitle = !drawer ? '' : drawer.mode === 'booking' ? ui.book : drawer.mode === 'delivery' ? delivery.cta : drawer.mode === 'price' ? services.ctaPrice : drawer.mode === 'contact' ? ui.contact : `${drawer.mode === 'whatsapp' ? 'WhatsApp' : ui.call} — ${ru ? 'выберите филиал' : 'izvēlies filiāli'}`;
  const priceButton = (className = '') => <Button href={priceHref} target="_self" variant="secondary" className={className}>{ui.prices}</Button>;

  return <div lang={locale}>
    <div ref={backgroundRef} className={motion.scope}>
      <i className={motion.scan} data-page-scan aria-hidden="true" />
      <a className={s.skipLink} href="#ads-v2-main">{ru ? 'Перейти к содержимому' : 'Pāriet uz saturu'}</a>
      <NavBar locale={locale} logoHref="#ads-v2-main" showNavigation={false} showShopSwitch={false} actions={<>
        <div className={s.headerContacts}>{locations.map(location => <div className={s.branchContact} key={location.id}>
          <div><a href="#locations" onClick={() => setSelectedLocationId(location.id)}>{location.label}</a><span>{location.tel}</span></div>
          <Button href={location.telLink} target="_self" iconOnly leadingIcon={FaPhone} aria-label={ui.call+' — '+location.label} />
          <Button href={location.wa} variant="whatsapp" data-contact-whatsapp iconOnly leadingIcon={FaWhatsapp} aria-label={'WhatsApp — '+location.label} rel="noopener noreferrer" />
        </div>)}</div>
        <a className={s.headerPrices} href={priceHref}>{ui.prices}</a>
        <Button className={s.headerBook} size="sm" onClick={() => open('booking')}>{ru ? 'Записаться' : 'Pieteikt remontu'}</Button>
        <a className={s.localeLink} href={localeHref} lang={ru ? 'lv' : 'ru'} hrefLang={ru ? 'lv' : 'ru'}>{ru ? 'LV' : 'RU'}</a>
      </>} />  <main id="ads-v2-main" tabIndex={-1}><div className={h.home} data-homepage>
        <HomeMotion locale={locale} />
        <section id="home-hero" className={h.hero+' '+s.campaignHero} aria-labelledby="ads-v2-title">
          <div className={h.heroGrid+' '+s.campaignGrid}>
            <div className={h.heroCopy+' '+s.campaignCopy}>
              <p className={h.eyebrow}><span>iLab / iPhone / Rīga</span><span>01</span></p>
              <h1 id="ads-v2-title" data-rise data-rise-lines><span>{ru ? 'Ремонт iPhone' : 'Aifonu labošana'}</span><span>{ru ? 'в тот же день.' : 'tajā pašā dienā.'}</span></h1>
              <p className={h.lead}>{ru ? 'Замена экрана, аккумулятора и устранение других неисправностей в наших мастерских в Риге.' : 'Displeju, bateriju un citu bojājumu novēršana mūsu darbnīcās Rīgā.'}</p>
              <div className={h.proof}><a href="#reviews">{totalReviews != null ? totalReviews+' ' : ''}Google {ru ? 'отзывов' : 'atsauksmes'}</a><span>{ru ? 'Диагностика бесплатно' : 'Bezmaksas diagnostika'}</span><span>{ru ? 'Цена до начала работ' : 'Cena pirms darba'}</span></div>
              <div className={h.actions}><Button onClick={() => open('booking')}>{ui.book}</Button><Button variant="secondary" onClick={() => open('contact')}>{ui.contact}</Button></div>
              <a className={h.cue} href="#services"><svg viewBox="0 0 14 36" aria-hidden="true"><path d="M7 0v34M1 28l6 6 6-6" /></svg><span>{services.selectorLabel}</span></a>
            </div>
            <figure className={h.heroVisual+' '+s.campaignVisual}><div data-scan="x"><Image data-home-hero-image src="/images/ads-v2/hero-precision-v1.webp" width={1122} height={1402} priority sizes="(min-width:1024px) 50vw,100vw" alt={ru ? 'Мастер iLab ремонтирует смартфон' : 'iLab meistars remontē viedtālruni'} /></div><figcaption><span>iLab / Rīga</span><span>Domina Shopping · Spice Life</span></figcaption></figure>
          </div>
          <div className={h.heroFoot+' '+s.campaignFoot}>{locations.map(location => <a key={location.id} href="#locations" onClick={() => setSelectedLocationId(location.id)}>{location.label}<span>{location.address}</span><span aria-hidden="true">↗</span></a>)}</div>
        </section>

        <section id="services" className={s.section} aria-labelledby="ads-services-title"><div className={s.sectionHeader}><h2 id="ads-services-title">{services.eyebrow}</h2><p>{services.selectorLabel}</p></div><div className={s.serviceLayout}><article ref={serviceDetailRef} className={s.serviceDetail} id="ads-service-detail" aria-live="polite" aria-labelledby="ads-active-service-title" tabIndex={-1}><div className={s.serviceImage} key={active.id}><Image src={active.visual} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" /></div><div className={s.serviceCopy}><p className={s.tech}>{services.timeLabel}: {active.time}</p><h3 id="ads-active-service-title">{active.cardTitle}</h3><p>{active.text}</p><ul>{active.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className={s.prices}>{active.prices.map((price) => <p key={price}>{price}</p>)}</div><div className={s.actions}><Button href={priceHref} target="_self">{services.ctaPrice}</Button><Button variant="secondary" onClick={() => open('booking', { fault: active.title })}>{services.ctaBook}</Button></div></div></article><div className={s.serviceSelector} role="group" aria-label={services.selectorLabel}>{services.services.map((service) => <button key={service.id} type="button" aria-pressed={active.id === service.id} aria-controls="ads-service-detail" onClick={() => selectService(service.id)}><span>{service.title}</span><small>{service.short}</small></button>)}</div></div></section>

        <section id="brands" className={s.section+' '+s.brands} aria-labelledby="ads-brands-title">
          <header className={s.sectionHeader}><h2 id="ads-brands-title">{ru ? 'Не только iPhone.' : 'Ne tikai iPhone.'}</h2><p>{ru ? 'Ремонтируем также Samsung, Xiaomi, Huawei и телефоны других брендов.' : 'Remontējam arī Samsung, Xiaomi, Huawei un citu zīmolu telefonus.'}</p></header>
          <div className={s.brandLogos}>{[['apple','iPhone'],['samsung','Samsung'],['xiaomi','Xiaomi'],['huawei','Huawei']].map(([brand,name]) => <figure key={brand}><Image data-logo-reveal data-brand={brand} src={'/images/logos/'+brand+'-logo.svg'} alt={brand==='apple' ? 'Apple' : name} width={512} height={160} /><figcaption>{name}</figcaption></figure>)}</div>
          <div className={s.brandNote}><p>{ru ? 'Планшеты, компьютеры и другие устройства — сообщите модель и опишите проблему. Уточним, чем можем помочь.' : 'Planšetdatori, datori un citas ierīces — pasaki modeli un apraksti bojājumu. Precizēsim, kā varam palīdzēt.'}</p><Button variant="secondary" onClick={() => open('contact')}>{ru ? 'Спросить о своём устройстве' : 'Jautāt par savu ierīci'}</Button></div>
        </section>

        <HomeReviews locale={locale} places={places} totalReviews={totalReviews} reviewWord={ru ? 'отзывов' : 'atsauksmes'} t={{reviews:ru ? 'Отзывы клиентов' : 'Klientu atsauksmes', reviewsLead:ru ? 'Реальные люди. Реальный опыт. В Риге.' : 'Reāli cilvēki. Reāla pieredze. Rīgā.', viewReviews:ru ? 'Смотреть все отзывы' : 'Skatīt visas atsauksmes'}} />

        <section id="speed" className={`${s.section} ${s.speedBand}`} aria-labelledby="ads-speed-title"><div className={s.sectionHeader}><h2 id="ads-speed-title">{speed.title}</h2><p>{speed.subtitle}</p></div><div className={s.facts}>{speed.cards.map((card) => <article key={card.value}><h3>{card.value}</h3><p>{card.title}</p></article>)}</div><div className={s.bookingStrip}><div><h3>{speed.bookingTitle} {speed.bookingAccent}</h3><p>{speed.bookingText}</p></div><Button onClick={() => open('booking')}>{speed.bookingCta}</Button></div></section>

        <section id="trust" className={`${s.section} ${s.trust}`} aria-label={ru ? 'iLab — доверие клиентов' : 'iLab uzticības rādītāji'}>{trust.map((item) => <article key={item.label}><strong>{item.value}</strong><p>{item.label}</p><span>{item.text}</span></article>)}</section>

        <section id="locations" className={h.section+' '+h.locationsSection} aria-labelledby="ads-locations-title"><header className={h.sectionHead}><h2 id="ads-locations-title">{locationText.titleMain} {locationText.titleAccent}</h2><p>{locationText.subtitle}</p></header><HomeLocations locale={locale} locations={locations} pinPositions={siteSettings.pinPositions || {}} defaultHours={siteSettings.hours || []} selectedLocationId={selectedLocationId} onSelectLocation={setSelectedLocationId} /></section>

        <HomeRepairProcess process={process} lead={ru ? 'Пять шагов. Цена и срок известны до начала ремонта.' : 'Pieci soļi. Cenu un termiņu zini pirms sākam.'} />

        <section id="delivery" className={`${s.section} ${s.delivery}`} aria-labelledby="ads-delivery-title"><div className={s.deliveryCopy}><p className={s.tech}>{delivery.eyebrow}</p><h2 id="ads-delivery-title">{delivery.title}</h2><p className={s.deliveryPromise}>{delivery.accent}</p><p className={s.lead}>{delivery.subtitle}</p><p>{delivery.note}</p><Button onClick={() => open('delivery')}>{delivery.cta}</Button></div><div><div className={s.partners}>{[['Omniva','Omniva_logo.svg'],['DPD','DPD_logo.svg'],['SmartPosti','SmartPosti_logo.svg'],['Latvijas Pasts','Latvijas_Pasts.svg']].map(([name,file]) => <div key={name}><Image data-logo-reveal src={'/images/delivery/'+file} alt={name} width={140} height={40} /></div>)}</div><ol className={s.deliverySteps}>{delivery.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

        <HomeFaq faqItems={faq.items} faqTitle={faq.title} limit={faq.items.length} id="faq" />

        <section id="final-cta" className={`${s.section} ${s.final}`} aria-labelledby="ads-final-title"><p className={s.tech}>{final.note}</p><h2 id="ads-final-title">{ru ? 'Починим быстро.' : final.titleMain}</h2>{!ru && <p className={s.finalPromise}>{final.titleAccent}</p>}<p className={s.lead}>{final.text}</p><div className={s.actions}><Button href={priceHref} target="_self">{final.price}</Button><Button variant="secondary" leadingIcon={FaPhone} onClick={() => open('call')}>{final.call}</Button><Button variant="whatsapp" data-contact-whatsapp leadingIcon={FaWhatsapp} onClick={() => open('whatsapp')}>WhatsApp</Button></div></section>
      </div></main>

      <footer className={s.footer}><div className={s.footerTop}><div><Logo href="#ads-v2-main" className={s.footerLogo} /><p>{company.legalName || company.name || 'SIA “iLab”'} · {footer.regNo} {company.regNo || company.registrationNumber || '40203288307'}</p></div>{locations.map((location) => <div key={location.id}><h3>{location.label}</h3><p>{location.address}</p><p><a href={location.telLink}>{location.tel}</a></p>{location.email && <a href={`mailto:${location.email}`}>{location.email}</a>}</div>)}</div><div className={s.footerBottom}><p>© {new Date().getFullYear()} iLab. {footer.copyright}</p><p>{footer.disclaimer}</p></div></footer>

      <nav className={dock.bottomBar+' '+s.desktopActions} data-panel-open={Boolean(drawer)} aria-label={ru ? 'Запись и цены' : 'Remonta pieteikšana un cenas'}><div className={dock.bookSlot}><Button className={dock.dockAction+' '+dock.bookingAction} onClick={() => open('booking')}>{ui.book}</Button></div><div className={dock.pricesSlot}>{priceButton(dock.dockAction+' '+dock.pricesAction)}</div></nav>
      <div className={s.dock}><div className={s.mobileDock}><Button variant="whatsapp" data-contact-whatsapp leadingIcon={FaWhatsapp} onClick={() => open('whatsapp')}>WhatsApp</Button><Button variant="secondary" leadingIcon={FaPhone} onClick={() => open('call')}>{ui.call}</Button></div></div>
    </div>
    <FullscreenPanel serviceRedesign open={Boolean(drawer)} onClose={close} paneKey={drawer?.mode || 'contact'} paneTitle={drawerTitle} closeLabel={ui.close} openerRef={openerRef} renderPane={() => isLead ? <div className={s.drawerContent}><LeadForm key={drawer.mode} mode={drawer.mode} locale={locale} locations={locations} initialValues={drawer.values} /></div> : <div className={s.drawerContent}><p>{ui.branches}</p>{locations.map((location) => <Location key={location.id} compact location={location} locale={locale} action={drawer?.mode} />)}</div>} />
  </div>;
}
