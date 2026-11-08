import { photo } from '../data/properties';

export default function PageHeader({ label, title, intro, image }) {
  return (
    <header className="page-header">
      {image ? (
        <div className="page-header__media" aria-hidden="true">
          <img src={photo(image, 1800)} alt="" loading="lazy" decoding="async" />
        </div>
      ) : null}
      <div className="container page-header__content">
        {label ? <span className="label">{label}</span> : null}
        <h1>{title}</h1>
        {intro ? <p>{intro}</p> : null}
      </div>
    </header>
  );
}
