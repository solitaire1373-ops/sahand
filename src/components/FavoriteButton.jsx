import { useFavorites } from '../context/FavoritesContext';
import { Heart } from './icons';

export default function FavoriteButton({ propertyId, propertyName, plain = false, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);

  const classes = [
    'favorite-btn',
    plain ? 'favorite-btn--plain' : '',
    active ? 'is-active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={active}
      aria-label={
        active ? `Remove ${propertyName} from saved properties` : `Save ${propertyName} to your list`
      }
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(propertyId);
      }}
    >
      <Heart filled={active} />
    </button>
  );
}
