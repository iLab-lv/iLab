// app/(site)/layout.jsx
import Link from 'next/link';
import NavBar from './ui/NavBar';

// client components
import BottomBar from './ui/BottomBar';
import Controls from './ui/Controls';
import ResponsivePortal from './ui/ResponsivePortal';
import SaziniesButton from './ui/SaziniesButton';
import LanguageSwitcher from './ui/LanguageSwitcher';
import CornerCta from './ui/CornerCta';

export default function SiteLayout({ children }) {
    const year = new Date().getFullYear();

    // TEMP: until we wire locator state globally, point Sazināties to Domina WhatsApp.
    // Later, we’ll sync this via a small AppContext so it follows the chosen location.
    const defaultChatHref = 'https://wa.me/37123370088';

    return (
        <>
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

            <NavBar />

            {/* Language switcher: desktop -> bottom-left; mobile -> topbar utility */}
            <ResponsivePortal
                mobileTargetId="topbar-right-utility"
                desktopTargetId="bottom-left-utility"
            >
                <LanguageSwitcher initial="lv" />
            </ResponsivePortal>

            {/* Sazināties CTA: desktop -> topbar primary; mobile -> BottomBar primary */}
            <ResponsivePortal
                mobileTargetId="bottombar-primary"
                desktopTargetId="topbar-right-primary"
            >
                <SaziniesButton href={defaultChatHref} />
            </ResponsivePortal>

            {/* Fixed-frame companions */}
            <Controls
                facebookUrl="https://www.facebook.com/iLab.lv/"
                instagramUrl="https://www.instagram.com/ilab.lv_telefonu_remonts/"
                tiktokUrl="https://www.tiktok.com/@ilab.lv"
            />

            <CornerCta bookHref="/pieraksties" />

            <BottomBar bookHref="/pieraksties" />

            <main id="main">{children}</main>

            <Footer year={year} />
        </>
    );
}

function Footer({ year }) {
    return (
        <footer
            style={{
                borderTop: '1px solid #eee',
                marginTop: 40,
            }}
            aria-label="Lapas kājene"
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '24px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 8,
                    flexWrap: 'wrap',
                    color: '#666',
                }}
            >
                <p>© {year} iLab — 90 dienu garantija · Tajā pašā dienā</p>

                <p>
                    <Link href="/kontakti">Kontakti</Link> ·{' '}
                    <a
                        href="https://www.google.com/maps/place/Ieriķu+iela+3,+Rīga"
                        target="_blank"
                        rel="noopener"
                    >
                        Domina
                    </a>{' '}
                    ·{' '}
                    <a
                        href="https://www.google.com/maps/place/Jaunmoku+iela+13,+Rīga"
                        target="_blank"
                        rel="noopener"
                    >
                        Spice
                    </a>
                </p>
            </div>
        </footer>
    );
}
