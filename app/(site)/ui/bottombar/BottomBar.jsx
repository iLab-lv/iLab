'use client';

import { usePathname } from 'next/navigation';

import s from './BottomBar.module.scss';
import Button from '../../components/button/Button';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import Controls from '../controls/Controls';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';
import { getCtaMainContent } from '../cta-main/ctaMainContent';

function ContactIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5h16v11H8l-4 3v-14Z"/><path d="M8 9h8M8 13h5"/></svg>;
}

function BookingIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3v3M18 3v3M4 8h16M5 5h14v15H5z"/><path d="m9 14 2 2 4-5"/></svg>;
}

export default function BottomBar({ socials = {} }) {
  const pathname = usePathname() || '/';
  const locale = getNavLocaleFromPathname(pathname);
  const cta = getCtaMainContent(locale);

  const {
    contactOpen,
    bookOpen,
    openContact,
    openBook,
    setSelectedLocId,
  } = useUiDialogs();

  return (
    <nav className={s.bottomBar} aria-label={cta.bottomBar.ariaLabel}>
      <div className={s.controlsSlot}>
        <Controls
          facebookUrl={socials.facebook}
          instagramUrl={socials.instagram}
          tiktokUrl={socials.tiktok}
        />
      </div>

      <div className={s.contactSlot}>
        <Button
          variant="secondary"
          size="lg"
          block
          leadingIcon={ContactIcon}
          className={`${s.dockAction} ${s.contactAction}`}
          aria-haspopup="dialog"
          aria-controls="sazinaties-panel"
          aria-expanded={contactOpen}
          onClick={(e) => {
            setSelectedLocId(null);
            openContact(e.currentTarget);
          }}
          aria-label={cta.contact.ariaLabel}
        >
          {cta.contact.label}
        </Button>
      </div>

      <div className={s.bookSlot}>
        <Button
          variant="primary"
          size="lg"
          block
          leadingIcon={BookingIcon}
          className={`${s.dockAction} ${s.bookingAction}`}
          aria-haspopup="dialog"
          aria-controls="pieraksties-panel"
          aria-expanded={bookOpen}
          onClick={(e) => openBook(e.currentTarget)}
          aria-label={cta.booking.ariaLabel}
        >
          {cta.booking.label}
        </Button>
      </div>

      <div className={s.pricesSlot}>
        <Button
          variant="secondary"
          size="lg"
          block
          className={`${s.dockAction} ${s.pricesAction}`}
          href={cta.prices.href}
          aria-label={cta.prices.ariaLabel}
        >
          {cta.prices.label}
        </Button>
      </div>
    </nav>
  );
}
