import { CONTACT, getAgent } from '../data/site';
import { photo } from '../data/properties';
import Button from './Button';
import { Calendar, Mail, Phone } from './icons';

export default function AgentCard({ property, onContact, onSchedule }) {
  const agent = getAgent(property.agentId);

  return (
    <div className="agent-card">
      <span className="agent-card__eyebrow">Your advisor</span>
      <div className="agent-card__head">
        <img
          className="agent-card__photo"
          src={photo(agent.photo, 200)}
          alt={`Portrait of ${agent.name}`}
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="agent-card__name">{agent.name}</p>
          <p className="agent-card__role">{agent.role}</p>
        </div>
      </div>

      <div className="agent-card__contact">
        <a href={CONTACT.phoneHref}>
          <Phone />
          {CONTACT.phone}
        </a>
        <a href={`mailto:${agent.email}`}>
          <Mail />
          {agent.email}
        </a>
      </div>

      <div className="agent-card__actions">
        <Button variant="primary" onClick={onContact} arrow>
          Contact agent
        </Button>
        <Button variant="outline" onClick={onSchedule}>
          <Calendar />
          Schedule a viewing
        </Button>
      </div>

      <p className="agent-card__note">
        Private viewings are arranged seven days a week. {agent.bio}
      </p>
    </div>
  );
}
