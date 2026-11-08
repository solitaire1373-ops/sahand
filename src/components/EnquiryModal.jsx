import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Close } from './icons';
import Button from './Button';

const MODES = {
  contact: {
    title: 'Contact our team',
    subtitle: 'Tell us how we can help and an advisor will be in touch.',
    submit: 'Send enquiry',
  },
  viewing: {
    title: 'Schedule a viewing',
    subtitle: 'Choose a preferred date and we will confirm your appointment.',
    submit: 'Request viewing',
  },
};

export default function EnquiryModal({ mode = 'contact', property, onClose }) {
  const config = MODES[mode] ?? MODES.contact;
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return createPortal(
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal__panel" ref={panelRef}>
        <div className="modal__head">
          <div>
            <h2 className="modal__title" id="enquiry-title">
              {config.title}
            </h2>
            <p className="modal__sub">
              {property ? `${property.name} · ${config.subtitle}` : config.subtitle}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <Close />
          </button>
        </div>

        {sent ? (
          <div className="form__success" role="status">
            <span className="form__success-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3>Thank you{name ? `, ${name.split(' ')[0]}` : ''}.</h3>
            <p>
              Your {mode === 'viewing' ? 'viewing request' : 'enquiry'} has been received. An advisor will
              contact you within one business day.
            </p>
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__row">
              <div className="field">
                <label className="field__label" htmlFor="enquiry-name">
                  Full name
                </label>
                <input
                  id="enquiry-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="enquiry-phone">
                  Phone
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="enquiry-email">
                Email
              </label>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            {mode === 'viewing' ? (
              <div className="field">
                <label className="field__label" htmlFor="enquiry-date">
                  Preferred date
                </label>
                <input id="enquiry-date" name="date" type="date" min={today} required />
              </div>
            ) : null}

            <div className="field">
              <label className="field__label" htmlFor="enquiry-message">
                Message {mode === 'viewing' ? '(optional)' : ''}
              </label>
              <textarea
                id="enquiry-message"
                name="message"
                placeholder={
                  mode === 'viewing'
                    ? 'Anything we should know before the viewing?'
                    : 'Tell us about the home you are looking for.'
                }
              />
            </div>

            <Button type="submit" variant="primary" block>
              {config.submit}
            </Button>
            <p className="form__note">
              We use your details only to respond to this enquiry. No marketing without your consent.
            </p>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
