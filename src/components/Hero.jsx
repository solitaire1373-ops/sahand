import { photo } from '../data/properties';

const HERO_IMAGE = 'photo-1613490493576-7fde63acd811';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <img
          src={photo(HERO_IMAGE, 1800)}
          srcSet={`${photo(HERO_IMAGE, 1200)} 1200w, ${photo(HERO_IMAGE, 1800)} 1800w, ${photo(HERO_IMAGE, 2400)} 2400w`}
          sizes="100vw"
          alt="Modern luxury villa with floor-to-ceiling glass and a lit infinity pool at dusk"
          decoding="async"
        />
      </div>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <h1 id="hero-title">
          Discover Exceptional
          <br className="hero__br" /> Homes &amp; Investments
        </h1>
        <p className="hero__text">
          Premium properties in prime locations. Find your dream home
          <br className="hero__br" /> or the perfect investment with confidence.
        </p>
      </div>
    </section>
  );
}
