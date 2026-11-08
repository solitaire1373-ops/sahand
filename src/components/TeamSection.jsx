import { Link } from 'react-router-dom';
import { TEAM } from '../data/site';
import { photo } from '../data/properties';
import Reveal from './Reveal';
import { Mail, Linkedin } from './icons';

export default function TeamSection({ showHeading = true }) {
  return (
    <section className={`section${showHeading ? '' : ' section--tight'}`} aria-labelledby="team-title">
      <div className="container">
        {showHeading ? (
          <Reveal className="team__head">
            <div className="section-head">
              <span className="label">Team</span>
              <h2 className="section-title" id="team-title">
                The people behind Horizon
              </h2>
            </div>
            <Link className="text-link" to="/team">
              Meet the full team
            </Link>
          </Reveal>
        ) : (
          <h2 className="visually-hidden" id="team-title">
            Our team
          </h2>
        )}

        <div className="team__grid">
          {TEAM.map((member, index) => (
            <Reveal as="article" className="team-card" key={member.id} delay={(index % 4) + 1}>
              <figure className="team-card__media">
                <img
                  src={photo(member.photo, 700)}
                  alt={`Portrait of ${member.name}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="team-card__links">
                  <a
                    className="team-card__link"
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail />
                  </a>
                  <a
                    className="team-card__link"
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin />
                  </a>
                </div>
              </figure>
              <h3 className="team-card__name">{member.name}</h3>
              <p className="team-card__role">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
