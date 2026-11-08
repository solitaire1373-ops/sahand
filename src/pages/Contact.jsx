import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { CONTACT } from '../data/site';
import { Mail, Phone, Pin, SOCIAL_ICONS } from '../components/icons';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function Contact() {
  useDocumentTitle('Contact — Horizon Properties');

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHeader
        label="Contact"
        title="Let’s talk about your next move"
        intro="Whether you are buying, selling or simply considering the market, a conversation is the best place to start."
        image="photo-1512917774080-9991f1c4c750"
      />

      <section className="section" aria-label="Contact Horizon Properties">
        <div className="container contact__grid">
          <div className="contact-form">
            <h2>Send us a message</h2>
            <p>We reply within one business day, and never share your details.</p>

            {sent ? (
              <div className="form__success" role="status">
                <span className="form__success-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3>Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h3>
                <p>Your message has been received. One of our advisors will be in touch shortly.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', phone: '', message: '' });
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form__row">
                  <div className="field">
                    <label className="field__label" htmlFor="contact-name">
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={update('name')}
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="contact-phone">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update('phone')}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="contact-message">
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Tell us about the property or the area you have in mind."
                    value={form.message}
                    onChange={update('message')}
                  />
                </div>

                <Button type="submit" variant="primary" arrow>
                  Send message
                </Button>
              </form>
            )}
          </div>

          <aside className="contact-card" aria-label="Office details">
            <div className="contact-card__item">
              <Phone />
              <div>
                <p className="contact-card__label">Phone</p>
                <p className="contact-card__value">
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </p>
              </div>
            </div>
            <div className="contact-card__item">
              <Mail />
              <div>
                <p className="contact-card__label">Email</p>
                <p className="contact-card__value">
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
              </div>
            </div>
            <div className="contact-card__item">
              <Pin />
              <div>
                <p className="contact-card__label">Office</p>
                <p className="contact-card__value">{CONTACT.address}</p>
              </div>
            </div>
            <div className="contact-card__item">
              <Pin />
              <div>
                <p className="contact-card__label">Hours</p>
                <p className="contact-card__value">{CONTACT.hours}</p>
              </div>
            </div>

            <div className="contact-card__socials">
              {CONTACT.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <a
                    key={social.label}
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
          </aside>
        </div>
      </section>
    </>
  );
}
