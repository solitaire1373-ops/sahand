import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT, NAV_LINKS } from '../data/site';
import Logo from './Logo';
import { Mail, Phone, Pin, SOCIAL_ICONS } from './icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo />
            <p>
              A private real estate practice representing exceptional homes and considered investments
              across the country’s most desirable addresses.
            </p>
            <div className="site-footer__socials">
              {CONTACT.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <a
                    key={social.label}
                    className="site-footer__social"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Horizon Properties on ${social.label}`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="site-footer__heading">Explore</h2>
            <ul className="site-footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link className="site-footer__link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="site-footer__heading">Contact</h2>
            <ul className="site-footer__contact">
              <li>
                <Phone />
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>
                <Mail />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <Pin />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>

          <div className="site-footer__newsletter">
            <h2 className="site-footer__heading">The Horizon Letter</h2>
            <p>Off-market opportunities and market notes, sent once a month.</p>
            <form className="newsletter" onSubmit={handleSubscribe} noValidate={false}>
              <label className="visually-hidden" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="Your email address"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit" className="btn btn--outline-light btn--sm">
                Join
              </button>
            </form>
            {subscribed ? (
              <p className="newsletter__status" role="status">
                Thank you — you’re on the list.
              </p>
            ) : null}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</p>
          <p>Licensed real estate brokerage · Austin, Texas</p>
        </div>
      </div>
    </footer>
  );
}
