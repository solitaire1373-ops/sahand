import Reveal from './Reveal';
import Button from './Button';
import { Key } from './icons';

export default function CTASection() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta__panel">
          <span className="cta__icon" aria-hidden="true">
            <Key />
          </span>
          <div className="cta__body">
            <h2 id="cta-title">Ready to Find Your Perfect Property?</h2>
            <p>Let our experts guide you to the right home or investment.</p>
          </div>
          <Button to="/contact" variant="primary" arrow>
            Get in touch
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
