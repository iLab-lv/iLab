'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaCheck, FaLocationDot, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import Logo from '../(site)/ui/logo/Logo';
import Button from '../(site)/components/button/Button';
import FullscreenPanel from '../(site)/ui/panels/FullscreenPanel';
import { PageNavigationRulers } from '../(site)/ui/navigation-rulers/NavigationRulers';
import LeadForm from '../adsV2/LeadForm';
import { SignatureAccent } from '../_components/sections/headings/SignatureText';
import ContactActions, { ContactDirections } from '../_components/sections/contact-actions/ContactActions';
import useLocationClock from '../_components/sections/full-locations/useLocationClock';
import { getAvailability, locationLinks } from '../_components/sections/full-locations/locationState';
import { getAdsV3Content } from './adsV3.i18n';
import { getAdsV3LocaleHref, getAdsV3PricesHref, trackAdsV3Cta } from './adsV3.model';
import s from './AdsV3.module.scss';
import v2 from '../adsV2/AdsV2.module.scss';
import h from '../(site)/HomePage.module.scss';
import { startServiceMotion } from '../(site)/serviceMotionRuntime';
import { AdsV3Speed, AdsV3Trust, AdsV3Services, AdsV3Brands, AdsV3Locations, AdsV3Process, AdsV3Delivery, AdsV3Faq, AdsV3Final, AdsV3Footer } from './AdsV3Sections';

export default function AdsV3({ locale, locations, defaultHours, pinPositions, company, reviewBadge, reviewsSection, initialInquiry, trustItems = [] }) {
  const t = getAdsV3Content(locale);
  const pricesHref = getAdsV3PricesHref(locale);
  const [drawer, setDrawer] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(locations[0]?.id);
  const [localeHref, setLocaleHref] = useState(`/adsV3?lang=${locale === 'ru' ? 'lv' : 'ru'}`);
  const openerRef = useRef(null);
  const motionRoot = useRef(null);
  const now = useLocationClock();
  const close = useCallback(() => setDrawer(null), []);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let stop = () => {};
    const restart = () => {
      stop();
      if (!media.matches) stop = startServiceMotion(motionRoot.current, { profile: 'ads-v3' });
    };
    restart(); media.addEventListener('change', restart);
    return () => { stop(); media.removeEventListener('change', restart); };
  }, []);

  useEffect(() => {
    const syncLocaleHref = () => setLocaleHref(getAdsV3LocaleHref(window.location.href, locale));
    syncLocaleHref();
    window.addEventListener('hashchange', syncLocaleHref);
    // The root layout resolves language from the pathname; this isolated preview
    // uses a query locale. Restore the document language when leaving the route.
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => { document.documentElement.lang = previous; window.removeEventListener('hashchange', syncLocaleHref); };
  }, [locale]);

  useEffect(() => {
    if (initialInquiry.mode) setDrawer({ mode: initialInquiry.mode, values: initialInquiry.values });
  }, [initialInquiry]);

  function open(mode, placement, opener, values = {}) {
    openerRef.current = opener;
    const contactAction = ['call', 'whatsapp'].includes(mode);
    trackAdsV3Cta(contactAction ? mode : mode === 'contact' ? 'contact' : mode === 'delivery' ? 'delivery' : 'booking', placement, locale);
    // Contact CTAs always offer both branches; inquiry prefills never choose one.
    setDrawer({ mode, values: contactAction ? {} : { ...initialInquiry.values, ...values } });
  }

  const action = (mode, placement, values) => event => open(mode, placement, event.currentTarget, values);
  const selectedBranches = drawer?.values.location
    ? locations.filter(location => location.id === drawer.values.location) : locations;
  const isContact = ['contact', 'call', 'whatsapp'].includes(drawer?.mode);
  const drawerTitle = drawer?.mode === 'call' ? t.callTitle : drawer?.mode === 'whatsapp' ? t.whatsappTitle
    : drawer?.mode === 'contact' ? t.contactTitle : drawer?.mode === 'price' ? t.priceTitle
    : drawer?.mode === 'delivery' ? t.deliveryTitle : t.book;

  return <div ref={motionRoot} className={`${v2.root} ${s.page}`} lang={locale} data-drawer-open={Boolean(drawer)}>
    <div inert={Boolean(drawer)}>
      <PageNavigationRulers mainId="ads-v3-main" locale={locale} blocked={Boolean(drawer)} className={s.rulers} />
      <a className={s.skipLink} href="#ads-v3-main">{t.skip}</a>
      <header className={s.header}>
        <div className={s.headerInner}>
          <Logo href={locale === 'ru' ? '/ru' : '/'} className={s.logo} />
          <div className={`${v2.headerContacts} ${s.headerContacts}`} aria-label={t.branches}>
            {locations.map(location => <div className={`${v2.branchContact} ${s.branchContact}`} key={location.id}>
              <div><a href="#locations" onClick={() => setSelectedLocationId(location.id)} data-ads-v3-branch={location.id}>{location.label}</a><span>{location.tel}</span></div>
              {locationLinks(location).tel && <Button glow href={locationLinks(location).tel} target="_self" variant="secondary" iconOnly leadingIcon={FaPhone} aria-label={`${t.call} — ${location.label}`} />}
              {locationLinks(location).wa && <Button href={locationLinks(location).wa} variant="whatsapp" data-contact-whatsapp iconOnly leadingIcon={FaWhatsapp} aria-label={`WhatsApp — ${location.label}`} rel="noopener noreferrer" />}
            </div>)}
          </div>
          <div className={s.headerActions}>
            <button className={s.headerContact} type="button" onClick={action('contact', 'header')}>{t.contact}</button>
            <a className={s.locale} href={localeHref} hrefLang={locale === 'ru' ? 'lv' : 'ru'} lang={locale === 'ru' ? 'lv' : 'ru'} aria-label={t.switchLanguage}>{locale === 'ru' ? 'LV' : 'RU'}</a>
          </div>
        </div>
      </header>
      <main className={h.home} id="ads-v3-main" tabIndex={-1}>
        <section className={`${h.hero} ${v2.campaignHero} ${s.hero}`} aria-labelledby="ads-v3-title">
          <div className={`${h.heroGrid} ${v2.campaignGrid} ${s.heroGrid}`}>
          <div className={`${h.heroCopy} ${v2.campaignCopy} ${s.copy}`}>
            <div className={s.proof} data-ads-v3-proof>{reviewBadge}</div>
            <h1 className={s.title} id="ads-v3-title"><span>{t.title}</span>{' '}<span><SignatureAccent level="hero">{t.accent}</SignatureAccent></span>{t.titleEnd && <>{' '}<span>{t.titleEnd}</span></>}</h1>
            <p className={s.lead}>{t.lead}</p>
            <div className={s.actions}>
              <Button glow className={s.primary} trailingIcon={FaArrowRight} onClick={action('booking', 'hero')} data-ads-v3-action="hero-booking">{t.book}</Button>
              <Button glow variant="secondary" onClick={action('contact', 'hero')} data-ads-v3-action="hero-contact">{t.contact}</Button>
            </div>
            <p className={s.speed}>{t.speed}</p>
            <ul className={s.trust} aria-label={t.trustLabel}>{t.trust.map(item => <li key={item.title}><FaCheck aria-hidden="true" /><span><strong>{item.title}</strong><span>{item.text}</span></span></li>)}</ul>
          </div>
          {!!locations.length && <nav className={s.branches} aria-label={t.branches}>{locations.map(location => <a href="#locations" key={location.id} onClick={() => setSelectedLocationId(location.id)} data-ads-v3-branch={location.id}>
            <FaLocationDot aria-hidden="true" /><span><strong>{location.label}</strong><span>{location.address}</span></span><FaArrowRight aria-hidden="true" />
          </a>)}</nav>}
          <figure className={`${h.heroVisual} ${v2.campaignVisual} ${s.visual}`}>
            <div><Image data-ads-v3-art src="/images/categories/landing_hero.webp" alt={t.imageAlt} width={1800} height={2000} priority sizes="(min-width: 1440px) 620px, (min-width: 1024px) 48vw, (min-width: 769px) 640px, (min-width: 493px) 650px, 132vw" /></div>
          </figure>
          </div>
        </section>
        <div className={s.reviews}>{reviewsSection}</div>
        <AdsV3Speed locale={locale} action={action} />
        <AdsV3Trust locale={locale} items={trustItems} />
        <AdsV3Services locale={locale} action={action} pricesHref={pricesHref} initialFault={initialInquiry.values.fault} onPrice={() => trackAdsV3Cta('prices', 'services', locale)} />
        <AdsV3Brands locale={locale} action={action} />
        <AdsV3Locations locale={locale} locations={locations} defaultHours={defaultHours} pinPositions={pinPositions} selectedLocationId={selectedLocationId} onSelectLocation={setSelectedLocationId} />
        <AdsV3Process locale={locale} />
        <AdsV3Delivery locale={locale} action={action} />
        <AdsV3Faq locale={locale} />
        <AdsV3Final locale={locale} action={action} pricesHref={pricesHref} onPrice={() => trackAdsV3Cta('prices', 'final', locale)} />
      </main>
      <AdsV3Footer locale={locale} locations={locations} company={company} />
      <nav className={`${s.dock} ${s.mobileDock}`} aria-label={t.actions} data-ads-v3-dock="mobile">
        <Button variant="whatsapp" leadingIcon={FaWhatsapp} onClick={action('whatsapp', 'mobile_dock')} data-ads-v3-action="dock-whatsapp">WhatsApp</Button>
        <Button glow leadingIcon={FaPhone} onClick={action('call', 'mobile_dock')} data-ads-v3-action="dock-call">{t.call}</Button>
      </nav>
      <nav className={`${s.dock} ${s.desktopDock}`} aria-label={t.desktopActions} data-ads-v3-dock="desktop">
        <Button glow onClick={action('booking', 'desktop_dock')} data-ads-v3-action="dock-booking">{t.book}</Button>
        <Button glow variant="secondary" href={pricesHref} target="_self" onClick={() => trackAdsV3Cta('prices', 'desktop_dock', locale)} data-ads-v3-action="dock-prices">{t.priceCta}</Button>
      </nav>
    </div>
    <FullscreenPanel serviceRedesign open={Boolean(drawer)} onClose={close} paneKey={drawer?.mode || 'booking'} paneTitle={drawerTitle} closeLabel={t.close} openerRef={openerRef} renderPane={() => <div className={s.drawerContent}>
      {isContact ? <>
        <p className={s.contactLead}>{drawer.mode === 'contact' ? t.contactLead : t.selectBranch}</p>
        {selectedBranches.map(location => {
          const state = getAvailability(location, defaultHours, now, locale);
          return <article className={s.branch} key={location.id}>
            <h3>{location.label}</h3><address>{location.address}</address>
            <p className={s.status}><i data-open={state.open} aria-hidden="true" />{state.text}</p>
            {location.specialNotice && <p>{location.specialNotice}</p>}
            {drawer.mode === 'contact' ? <><ContactActions location={location} locale={locale} /><ContactDirections location={location} locale={locale} /></>
              : <Button className={s.branchAction} variant={drawer.mode === 'whatsapp' ? 'whatsapp' : 'primary'} leadingIcon={drawer.mode === 'whatsapp' ? FaWhatsapp : FaPhone}
                href={drawer.mode === 'whatsapp' ? locationLinks(location).wa : locationLinks(location).tel}
                target="_blank" rel="noopener noreferrer"
                onClick={close}
                data-contact-call={drawer.mode === 'call' || undefined} data-contact-whatsapp={drawer.mode === 'whatsapp' || undefined}
                aria-label={`${drawer.mode === 'whatsapp' ? 'WhatsApp' : t.call} — ${location.label}`}>{drawer.mode === 'whatsapp' ? 'WhatsApp' : t.call} — {location.label}</Button>}
          </article>;
        })}
        {drawer.values.location && <button type="button" className={s.otherBranch} onClick={() => setDrawer({ mode: 'contact', values: {} })}>{t.otherBranch}</button>}
      </> : drawer && <LeadForm key={drawer.mode} mode={drawer.mode} locale={locale} locations={locations} initialValues={drawer.values} />}
    </div>} />
  </div>;
}
