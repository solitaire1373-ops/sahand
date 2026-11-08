import { WHY_POINTS } from '../data/site';
import Reveal from './Reveal';

export default function WhySection() {
  return (
    <section className="section section--navy why" aria-labelledby="why-title">
      <div className="container why__grid">
        <Reveal className="why__copy">
          <span className="label">Why Horizon</span>
          <h2 className="section-title" id="why-title">
            Why Choose Horizon
          </h2>
          <p>
            We take on fewer properties than most agencies, and we know each of them intimately. That
            focus is why our clients return, and why our sales consistently outperform the market.
          </p>
        </Reveal>

        <div className="why__stats">
          {WHY_POINTS.map((point, index) => (
            <Reveal className="why__stat" key={point.title} delay={(index % 2) + 1}>
              <p className="why__value">
                {point.value}
                <span>{point.suffix}</span>
              </p>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
