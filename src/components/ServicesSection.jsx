import { SERVICES } from '../data/site';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import Button from './Button';

export default function ServicesSection() {
  return (
    <section className="section section--ivory" aria-labelledby="services-title">
      <div className="container services__grid">
        <Reveal className="services__intro">
          <SectionHeading
            label="Services"
            title="A complete real estate practice"
            intro="From the first valuation to the final set of keys, every stage is handled by one senior advisor who knows the property and the market."
            id="services-title"
          />
          <Button to="/services" variant="outline" arrow>
            Explore services
          </Button>
        </Reveal>

        <div className="services__list">
          {SERVICES.map((service, index) => (
            <Reveal className="service" key={service.id} delay={(index % 2) + 1}>
              <span className="service__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
