import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconMenu, IconClose, IconArrow } from './Icons';
import { navItems, BOOKING_URL } from '../../data/static';

type Props = { heroTransparent: boolean };

export default function Header({ heroTransparent }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Once you've scrolled past the fold, the nav goes solid even on home
  // (so headlines and photos in the next section don't fight the white text).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the drawer is open so the page doesn't bleed
  // through gestures on iOS.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const solid = scrolled || !heroTransparent;

  return (
    <>
      <header className={`nav ${solid ? 'solid' : ''}`}>
        <div className="container-x nav-inner">
          <Link to="/" className="brand" aria-label="The Melva — Home">
            <img src="/melva-mark-sm.png" alt="" className="brand-mark-img" aria-hidden="true" />
            <span className="brand-name">
              The Melva
              <small>Elegant Guest House</small>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Book a Stay
            </a>
          </nav>

          <button
            className="menu-toggle"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <IconMenu size={24} />
          </button>
        </div>
      </header>

      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/melva-mark-sm.png" alt="" className="brand-mark-img" aria-hidden="true" />
            <span className="brand-name">
              The Melva<small>Elegant Guest House</small>
            </span>
          </Link>
          <button
            className="menu-toggle"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            style={{ display: 'grid', color: 'var(--ink)' }}
          >
            <IconClose size={22} />
          </button>
        </div>
        <nav className="drawer-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              end={item.path === '/'}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
            style={{ marginTop: 32, alignSelf: 'flex-start' }}
          >
            Book a Stay <IconArrow size={16} />
          </a>
        </nav>
      </aside>
    </>
  );
}
