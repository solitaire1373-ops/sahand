import { getFeaturedProperties } from '../data/properties';
import PropertyCarousel from './PropertyCarousel';
import Reveal from './Reveal';
import Button from './Button';

export default function FeaturedSection() {
  const featured = getFeaturedProperties();

  return (
    <section className="section" aria-labelledby="featured-title">
      <div className="container">
        <Reveal className="featured__head">
          <span className="label">Featured</span>
          <h2 className="section-title" id="featured-title">
            Featured Properties
          </h2>
        </Reveal>
      </div>

      <Reveal delay={1}>
        <PropertyCarousel properties={featured} />
      </Reveal>

      <div className="container featured__more">
        <Button to="/properties" variant="outline" arrow>
          View all properties
        </Button>
      </div>
    </section>
  );
}
