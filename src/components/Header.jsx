import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CONTACT, NAV_LINKS } from '../data/site';
import Logo from './Logo';
import Button from './Button';
import { ArrowRight, Close, Menu, Phone } from './icons';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const transparent = location.pathname === '/' && !scrolled && !menuOpen;

  return (
    <>
      <header className={`site-header ${transparent ? 'site-header--transparent' : 'site-header--solid'}`}>
        <div className="container site-header__inner">
          <Logo />

          <nav className="site-nav" aria-label="Primary">
            <ul className="site-nav__list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Button
              href={CONTACT.phoneHref}
              variant="outline-light"
              size="sm"
              className="header-phone"
              aria-label={`Call Horizon Properties on ${CONTACT.phone}`}
            >
              <Phone />
              {CONTACT.phone}
            </Button>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
        <nav aria-label="Mobile">
          <ul className="mobile-menu__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `mobile-menu__link${isActive ? ' is-active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  <ArrowRight />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__footer">
          <Button href={CONTACT.phoneHref} variant="outline-light" arrow>
            Call {CONTACT.phone}
          </Button>
          <p className="mobile-menu__meta">{CONTACT.email}</p>
          <p className="mobile-menu__meta">{CONTACT.address}</p>
        </div>
      </div>
    </>
  );
}
