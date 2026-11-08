/**
 * Property discovery logic, kept out of the view so it can be reused and
 * unit-tested independently of the UI.
 */

export const PRICE_RANGES = [
  { value: 'under-2', label: 'Under $2M', min: 0, max: 2000000 },
  { value: '2-4', label: '$2M – $4M', min: 2000000, max: 4000000 },
  { value: '4-6', label: '$4M – $6M', min: 4000000, max: 6000000 },
  { value: 'over-6', label: '$6M and above', min: 6000000, max: Number.POSITIVE_INFINITY },
];

export const BED_OPTIONS = [
  { value: '3', label: '3+ bedrooms' },
  { value: '4', label: '4+ bedrooms' },
  { value: '5', label: '5+ bedrooms' },
];

export const BATH_OPTIONS = [
  { value: '3', label: '3+ bathrooms' },
  { value: '4', label: '4+ bathrooms' },
  { value: '5', label: '5+ bathrooms' },
];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'newest', label: 'Recently listed' },
];

export const DEFAULT_SORT = 'featured';

export function filterProperties(properties, filters = {}) {
  const query = (filters.q ?? '').trim().toLowerCase();
  const range = PRICE_RANGES.find((option) => option.value === filters.price);
  const minBeds = Number(filters.beds) || 0;
  const minBaths = Number(filters.baths) || 0;

  const matches = properties.filter((property) => {
    if (query) {
      const haystack = `${property.name} ${property.city} ${property.state} ${property.country} ${property.type}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.location && `${property.city}, ${property.state}` !== filters.location) return false;
    if (filters.type && property.type !== filters.type) return false;
    if (range && (property.price < range.min || property.price >= range.max)) return false;
    if (minBeds && property.beds < minBeds) return false;
    if (minBaths && property.baths < minBaths) return false;
    return true;
  });

  switch (filters.sort) {
    case 'price-asc':
      return [...matches].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...matches].sort((a, b) => b.price - a.price);
    case 'newest':
      return [...matches].sort((a, b) => new Date(b.listed) - new Date(a.listed));
    default:
      return [...matches].sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price);
  }
}
