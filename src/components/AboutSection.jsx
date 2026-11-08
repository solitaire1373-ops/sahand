import { Link } from 'react-router-dom';
import { photo } from '../data/properties';
import Reveal from './Reveal';
import Button from './Button';
import { ArrowRight } from './icons';

const MAIN_IMAGE = 'photo-1600585154340-be6161a56a0c';
const SIDE_IMAGE = 'photo-1600596542815-ffad4c1539a9';

export default function AboutSection() {
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__copy">
          <span className="label">About us</span>
          <h2 id="about-title">Who We Are</h2>
          <p>
            At Horizon Properties, we connect people with extraordinary homes and smart investments.
            Integrity, transparency, and client satisfaction are at the heart of everything we do.
          </p>
          <Button to="/about" variant="primary" arrow>
            Learn more
          </Button>
        </Reveal>

        <Reveal className="about__media" delay={1}>
          <figure className="about__figure about__figure--main">
            <img
              src={photo(MAIN_IMAGE, 1200)}
              alt="Modern two-storey home with a swimming pool and landscaped garden"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="about__figure about__figure--side">
            <img
              src={photo(SIDE_IMAGE, 700)}
              alt="Detail of a contemporary glass and stone residence"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <Link className="about__arrow" to="/properties" aria-label="Browse our properties">
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
