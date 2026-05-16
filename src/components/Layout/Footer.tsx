import { Link } from 'react-router-dom';
import {
  navItems, BOOKING_URL,
  ADDRESS_LINES, MAPS_URL,
  PHONE_PRIMARY, PHONE_SECONDARY, EMAIL,
} from '../../data/static';
import { IconFB, IconIG } from './Icons';

export default function Footer() {
  return (
    <footer className="footer" style={{ background: 'var(--ink)', color: 'color-mix(in oklab, var(--bg) 80%, transparent)' }}>
      <div className="container-x" style={{ paddingBlock: '100px 36px' }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 48,
            marginBottom: 80,
          }}
        >
          {/* Brand */}
          <div>
            <Link to="/" className="brand" style={{ color: 'var(--bg)', marginBottom: 24 }}>
              <img src="/melva-mark-sm.png" alt="" className="brand-mark-img" aria-hidden="true" />
              <span className="brand-name">
                The Melva
                <small>Elegant Guest House</small>
              </span>
            </Link>
            <p
              className="italic-accent"
              style={{
                fontSize: 20,
                lineHeight: 1.4,
                color: 'color-mix(in oklab, var(--bg) 70%, transparent)',
                maxWidth: 360,
                marginTop: 18,
              }}
            >
              A small, considered guest house in Gaborone. Where the lights stay on for late arrivals and the kettle is always close.
            </p>
          </div>

          {/* Visit */}
          <div>
            <div className="eyebrow" style={{ color: 'var(--accent-soft)', marginBottom: 22 }}>
              <span className="accent-line" />Visit
            </div>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              {ADDRESS_LINES.map((l, i) => (
                <span key={l}>{l}{i < ADDRESS_LINES.length - 1 && <br />}</span>
              ))}
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', marginTop: 14, fontSize: 13,
                color: 'var(--accent-soft)',
                borderBottom: '1px solid currentColor', paddingBottom: 2,
                textDecoration: 'none',
              }}
            >
              View on Google Maps
            </a>
          </div>

          {/* Reach */}
          <div>
            <div className="eyebrow" style={{ color: 'var(--accent-soft)', marginBottom: 22 }}>
              <span className="accent-line" />Reach
            </div>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              <a href={`tel:${PHONE_PRIMARY.replace(/\s/g, '')}`} style={{ color: 'inherit' }}>{PHONE_PRIMARY}</a><br />
              <a href={`tel:${PHONE_SECONDARY.replace(/\s/g, '')}`} style={{ color: 'inherit' }}>{PHONE_SECONDARY}</a><br />
              <a href={`mailto:${EMAIL}`} style={{ color: 'inherit' }}>{EMAIL}</a>
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 22 }}>
              <a href="https://www.facebook.com/melvaelegant" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'inherit' }}>
                <IconFB size={20} />
              </a>
              <a href="https://www.instagram.com/themelvaelegant" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'inherit' }}>
                <IconIG size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="eyebrow" style={{ color: 'var(--accent-soft)', marginBottom: 22 }}>
              <span className="accent-line" />Explore
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>{item.label}</Link>
                </li>
              ))}
              <li>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Book on Booking.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="rule" style={{ borderColor: 'color-mix(in oklab, var(--bg) 20%, transparent)' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 28,
            fontSize: 12,
            letterSpacing: '0.1em',
            color: 'color-mix(in oklab, var(--bg) 55%, transparent)',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span>© {new Date().getFullYear()} The Melva Elegant Guest House. All rights reserved.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  );
}
