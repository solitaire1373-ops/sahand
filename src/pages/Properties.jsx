import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProperties } from '../data/properties';
import { DEFAULT_SORT, filterProperties } from '../lib/filterProperties';
import { useFavorites } from '../context/FavoritesContext';
import PageHeader from '../components/PageHeader';
import PropertyFilters from '../components/PropertyFilters';
import PropertyCard from '../components/PropertyCard';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { Heart } from '../components/icons';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedOnly, setSavedOnly] = useState(false);
  const { favorites } = useFavorites();

  useDocumentTitle('Properties — Horizon Properties');

  const filters = {
    q: searchParams.get('q') ?? '',
    location: searchParams.get('location') ?? '',
    type: searchParams.get('type') ?? '',
    price: searchParams.get('price') ?? '',
    beds: searchParams.get('beds') ?? '',
    baths: searchParams.get('baths') ?? '',
    sort: searchParams.get('sort') ?? DEFAULT_SORT,
  };

  const matches = filterProperties(getProperties(), filters);
  const visible = savedOnly ? matches.filter((property) => favorites.includes(property.id)) : matches;

  const hasActiveFilters =
    Boolean(filters.q || filters.location || filters.type || filters.price || filters.beds || filters.baths) ||
    filters.sort !== DEFAULT_SORT ||
    savedOnly;

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === DEFAULT_SORT) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
    setSavedOnly(false);
  };

  const noSavedProperties = savedOnly && favorites.length === 0;

  return (
    <>
      <PageHeader
        label="Properties"
        title="Find your next address"
        intro="A curated collection of residences, estates and penthouses — each one visited, vetted and represented by Horizon."
        image="photo-1568605114967-8130f3a36994"
      />

      <section className="properties-list" aria-label="Property results">
        <div className="container">
          <Reveal>
            <PropertyFilters
              values={filters}
              onChange={updateFilter}
              onReset={resetFilters}
              hasActiveFilters={hasActiveFilters}
              resultCount={visible.length}
            />
          </Reveal>

          <div className="results">
            <p className="results__title" role="status" aria-live="polite">
              Showing <b>{visible.length}</b> of {matches.length} properties
              {savedOnly ? ' · saved only' : ''}
            </p>
            <div className="results__tools">
              <button
                type="button"
                className={`saved-toggle${savedOnly ? ' is-active' : ''}`}
                aria-pressed={savedOnly}
                onClick={() => setSavedOnly((value) => !value)}
              >
                <Heart filled={savedOnly} />
                Saved
                <span className="saved-toggle__count">{favorites.length}</span>
              </button>
            </div>
          </div>

          {visible.length > 0 ? (
            <div className="property-grid">
              {visible.map((property, index) => (
                <Reveal key={property.id} delay={(index % 3) + 1}>
                  <PropertyCard property={property} layout="grid" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>{noSavedProperties ? 'No saved properties yet' : 'No properties match your filters'}</h2>
              <p>
                {noSavedProperties
                  ? 'Tap the heart on any property to keep it here for later.'
                  : 'Try widening the price range or clearing one of the filters to see more homes.'}
              </p>
              <Button variant="outline" onClick={resetFilters} arrow>
                {noSavedProperties ? 'Browse all properties' : 'Reset filters'}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
