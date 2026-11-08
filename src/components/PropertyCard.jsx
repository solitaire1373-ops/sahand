import { Link } from 'react-router-dom';
import { formatLocation, formatPrice, photoSet } from '../data/properties';
import FavoriteButton from './FavoriteButton';

export default function PropertyCard({ property, layout = 'carousel' }) {
  const image = photoSet(property.cover);
  const sizes =
    layout === 'grid'
      ? '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw'
      : '(max-width: 560px) 82vw, 42vw';
  const price = formatPrice(property.price);
  const location = formatLocation(property);

  return (
    <article className={`property-card${layout === 'grid' ? ' property-card--grid' : ''}`}>
      <Link
        to={`/properties/${property.id}`}
        className="property-card__link"
        aria-label={`${property.name}, ${location}, ${price}`}
      >
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={property.alt}
          loading="lazy"
          decoding="async"
        />
        <span className="property-card__scrim" aria-hidden="true" />
        <span className="property-card__body">
          <span className="property-card__type">{property.type}</span>
          <span className="property-card__name">{property.name}</span>
          <span className="property-card__meta">{location}</span>
          <span className="property-card__price">{price}</span>
        </span>
      </Link>
      <FavoriteButton propertyId={property.id} propertyName={property.name} />
    </article>
  );
}
