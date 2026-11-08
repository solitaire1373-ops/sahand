import { LOCATIONS, PROPERTY_TYPES } from '../data/properties';
import { BATH_OPTIONS, BED_OPTIONS, PRICE_RANGES, SORT_OPTIONS } from '../lib/filterProperties';
import { Search } from './icons';

export default function PropertyFilters({ values, onChange, onReset, hasActiveFilters, resultCount }) {
  return (
    <form
      className="filters"
      role="search"
      aria-label="Filter properties"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="field field--search">
        <label className="field__label" htmlFor="filter-q">
          Search
        </label>
        <div className="search-field">
          <Search />
          <input
            id="filter-q"
            type="search"
            placeholder="Search by name, city or property type"
            value={values.q}
            onChange={(event) => onChange('q', event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-location">
          Location
        </label>
        <select
          id="filter-location"
          value={values.location}
          onChange={(event) => onChange('location', event.target.value)}
        >
          <option value="">All locations</option>
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-type">
          Property type
        </label>
        <select
          id="filter-type"
          value={values.type}
          onChange={(event) => onChange('type', event.target.value)}
        >
          <option value="">All types</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-price">
          Price range
        </label>
        <select
          id="filter-price"
          value={values.price}
          onChange={(event) => onChange('price', event.target.value)}
        >
          <option value="">Any price</option>
          {PRICE_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-beds">
          Bedrooms
        </label>
        <select
          id="filter-beds"
          value={values.beds}
          onChange={(event) => onChange('beds', event.target.value)}
        >
          <option value="">Any</option>
          {BED_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-baths">
          Bathrooms
        </label>
        <select
          id="filter-baths"
          value={values.baths}
          onChange={(event) => onChange('baths', event.target.value)}
        >
          <option value="">Any</option>
          {BATH_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-sort">
          Sort by
        </label>
        <select
          id="filter-sort"
          value={values.sort}
          onChange={(event) => onChange('sort', event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__footer">
        <p className="filters__count" aria-live="polite">
          <b>{resultCount}</b> {resultCount === 1 ? 'property' : 'properties'} found
        </p>
        {hasActiveFilters ? (
          <button type="button" className="filters__reset" onClick={onReset}>
            Clear all filters
          </button>
        ) : null}
      </div>
    </form>
  );
}
