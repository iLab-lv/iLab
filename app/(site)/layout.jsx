// app/(site)/layout.jsx
import NavBar from './ui/navbar/NavBar';
import Controls from './ui/controls/Controls';
import BottomBar from './ui/bottombar/BottomBar';
import { SOCIALS } from '@/data/site.config';
import { UiDialogsProvider } from './ui/providers/UiDialogsProvider';
import Footer from './ui/footer/Footer';
import l from './Layout.module.scss';

export default function SiteLayout({ children }) {
  return (
    <div className={l.siteRoot}>
      <UiDialogsProvider>
        {/* a11y: skip link */}
        <a
          href="#main"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 'auto',
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          Skip to content
        </a>

        {/* Sticky, semi-transparent topbar */}
        <NavBar />

        {/* Desktop-only overlay Controls */}
        <div className={l.controlsDesktopOnly}>
          <Controls
            facebookUrl={SOCIALS.facebook}
            instagramUrl={SOCIALS.instagram}
            tiktokUrl={SOCIALS.tiktok}
          />
        </div>

        {/* Mobile/Tablet bottom actions */}
        <BottomBar />

        {/* Main content */}
        <main id="main">{children}</main>

        {/* Footer (fixed/reveal as implemented in your Footer component) */}
        <Footer />
      </UiDialogsProvider>
    </div>
  );
}
