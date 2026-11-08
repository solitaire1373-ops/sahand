import { Link } from 'react-router-dom';

export default function Logo({ dark = false, to = '/' }) {
  return (
    <Link to={to} className={`logo${dark ? ' logo--dark' : ''}`} aria-label="Horizon Properties — home">
      <svg
        className="logo__mark"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M3 22v-9M8.4 22V5.5M13.8 22v-6.5M19.2 22V9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="logo__text">
        <span className="logo__name">HORIZON</span>
        <span className="logo__sub">PROPERTIES</span>
      </span>
    </Link>
  );
}
