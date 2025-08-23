// app/(site)/layout.jsx
import Link from 'next/link';
import NavBar from './ui/NavBar';
import Controls from './ui/Controls';
import CtaDock from './ui/CtaDock';
import { SOCIALS } from '@/data/site.config';

export default function SiteLayout({ children }) {
    const year = new Date().getFullYear();

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
            <Controls
                facebookUrl={SOCIALS.facebook}
                instagramUrl={SOCIALS.instagram}
                tiktokUrl={SOCIALS.tiktok}
            />
            <CtaDock bookHref="/pieraksties" />

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
