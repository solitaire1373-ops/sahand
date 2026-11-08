/**
 * Property catalogue.
 *
 * This is the single source of truth for the property experience. The screens
 * only consume `getProperties()` / `getPropertyBySlug()`, so swapping this
 * module for a database-backed repository later only means making these
 * functions async — no component changes required.
 */

const UNSPLASH = 'https://images.unsplash.com';

/** Build a single optimised Unsplash URL. */
export function photo(id, width = 1200) {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Responsive source set for a photo. */
export function photoSet(id) {
  return {
    src: photo(id, 1200),
    srcSet: [480, 800, 1200, 1800].map((w) => `${photo(id, w)} ${w}w`).join(', '),
  };
}

const properties = [
  {
    id: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    type: 'Villa',
    price: 2350000,
    beds: 5,
    baths: 6,
    sqft: 6200,
    year: 2021,
    lot: '0.9 acres',
    featured: true,
    listed: '2026-09-18',
    agentId: 'daniel-morgan',
    cover: 'photo-1613490493576-7fde63acd811',
    alt: 'Modern lakeside villa with floor-to-ceiling glass and a lit infinity pool at dusk',
    description:
      'A study in quiet modernism, this lakeside villa opens its entire western face to the water. Ten-foot sliding glass walls dissolve the line between the living room and a cantilevered terrace, while a stone-clad fireplace anchors the interior for cooler evenings.',
    features: [
      'Floor-to-ceiling glass walls',
      'Infinity pool with lake views',
      'Chef kitchen with stone island',
      'Primary suite with private terrace',
      'Home cinema and wine room',
      'Three-car garage with EV charging',
    ],
    amenities: [
      'Infinity pool',
      'Smart home system',
      'Home office',
      'Wine cellar',
      'Gym',
      'Fireplace',
      'Gated entry',
      'Lake access',
    ],
    images: [
      'photo-1613490493576-7fde63acd811',
      'photo-1600607687939-ce8a6c25118c',
      'photo-1600210492486-724fe5c67fb0',
      'photo-1600607688969-a5bfcd646154',
      'photo-1600585154526-990dced4db0d',
    ],
  },
  {
    id: 'pacific-glass-house',
    name: 'Pacific Glass House',
    city: 'Malibu',
    state: 'California',
    country: 'USA',
    type: 'House',
    price: 4800000,
    beds: 4,
    baths: 5,
    sqft: 5400,
    year: 2019,
    lot: '1.2 acres',
    featured: true,
    listed: '2026-10-02',
    agentId: 'olivia-carter',
    cover: 'photo-1600596542815-ffad4c1539a9',
    alt: 'Contemporary glass house with white volumes and a reflecting pool',
    description:
      'Perched above the Pacific, this residence is built around light. A double-height atrium connects three levels of living space, and every principal room frames an uninterrupted ocean horizon. The grounds include a heated lap pool and a sheltered outdoor dining terrace.',
    features: [
      'Uninterrupted ocean views',
      'Double-height living atrium',
      'Heated lap pool and spa',
      'Outdoor kitchen and fire pit',
      'Guest suite with separate entry',
      'Solar array with battery storage',
    ],
    amenities: [
      'Ocean view',
      'Pool and spa',
      'Outdoor kitchen',
      'Guest suite',
      'Garage',
      'Solar power',
      'Security system',
      'Beach access',
    ],
    images: [
      'photo-1600596542815-ffad4c1539a9',
      'photo-1616486338812-3dadae4b4ace',
      'photo-1600573472550-8090b5e0745e',
      'photo-1600585152220-90363fe7e115',
      'photo-1512918728675-ed5a9ecdebfd',
    ],
  },
  {
    id: 'desert-horizon-estate',
    name: 'Desert Horizon Estate',
    city: 'Scottsdale',
    state: 'Arizona',
    country: 'USA',
    type: 'Estate',
    price: 3150000,
    beds: 5,
    baths: 5,
    sqft: 7100,
    year: 2018,
    lot: '2.4 acres',
    featured: true,
    listed: '2026-08-21',
    agentId: 'james-wilson',
    cover: 'photo-1600585154340-be6161a56a0c',
    alt: 'Desert estate with floating roof planes, pool and mountain backdrop',
    description:
      'Low, horizontal and entirely at ease in the landscape, Desert Horizon Estate is organised around a central courtyard and a 60-foot pool. Rammed-earth walls temper the afternoon sun while clerestory glazing pulls desert light deep into the plan.',
    features: [
      'Courtyard plan with water feature',
      '60-foot heated pool',
      'Rammed-earth accent walls',
      'Panoramic mountain views',
      'Casita with private patio',
      'Desert-native landscaping',
    ],
    amenities: [
      'Pool',
      'Casita',
      'Mountain view',
      'Outdoor fireplace',
      'Covered terrace',
      'Three-car garage',
      'Gated entry',
      'Smart irrigation',
    ],
    images: [
      'photo-1600585154340-be6161a56a0c',
      'photo-1600566753190-17f0baa2a6c3',
      'photo-1600210492493-0946911123ea',
      'photo-1600566753086-00f18fb6b3ea',
      'photo-1600047509807-ba8f99d2cdde',
    ],
  },
  {
    id: 'oceanfront-residence',
    name: 'Oceanfront Residence',
    city: 'Miami',
    state: 'Florida',
    country: 'USA',
    type: 'Residence',
    price: 5200000,
    beds: 4,
    baths: 5,
    sqft: 4800,
    year: 2020,
    lot: '0.6 acres',
    featured: true,
    listed: '2026-07-11',
    agentId: 'sophia-bennett',
    cover: 'photo-1512917774080-9991f1c4c750',
    alt: 'White modern oceanfront residence with palm planting and pool',
    description:
      'Direct beachfront with 90 feet of private sand, this residence pairs a cool white palette with warm timber ceilings. The principal living floor is one continuous indoor-outdoor room, opening to a pool deck designed for long evenings.',
    features: [
      '90 feet of private beach',
      'Timber-ceiling living volume',
      'Infinity-edge pool deck',
      'Primary suite with ocean balcony',
      'Summer kitchen and bar',
      'Hurricane-rated glazing',
    ],
    amenities: [
      'Private beach',
      'Pool',
      'Summer kitchen',
      'Balcony',
      'Elevator',
      'Gym',
      'Staff quarters',
      'Two-car garage',
    ],
    images: [
      'photo-1512917774080-9991f1c4c750',
      'photo-1600607687920-4e2a09cf159d',
      'photo-1618221195710-dd6b41faaea6',
      'photo-1600047509358-9dc75507daeb',
      'photo-1600047509807-ba8f99d2cdde',
    ],
  },
  {
    id: 'modern-hillside-retreat',
    name: 'Modern Hillside Retreat',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    type: 'Retreat',
    price: 3750000,
    beds: 4,
    baths: 4,
    sqft: 4300,
    year: 2022,
    lot: '0.8 acres',
    featured: true,
    listed: '2026-10-14',
    agentId: 'olivia-carter',
    cover: 'photo-1600047509807-ba8f99d2cdde',
    alt: 'Hillside modern home with cantilevered terrace overlooking the city',
    description:
      'Cantilevered over a canyon ridge, this retreat was designed for the view. Glass on three sides, a wraparound terrace and a warm material palette of oak and travertine make the house feel both expansive and calm.',
    features: [
      'City and canyon views',
      'Wraparound terrace',
      'Oak and travertine interiors',
      'Infinity pool at the ridge line',
      'Media lounge',
      'Drought-tolerant planting',
    ],
    amenities: [
      'Pool',
      'City view',
      'Terrace',
      'Media room',
      'Fireplace',
      'Two-car garage',
      'Security system',
      'Outdoor shower',
    ],
    images: [
      'photo-1600047509807-ba8f99d2cdde',
      'photo-1512918728675-ed5a9ecdebfd',
      'photo-1600573472550-8090b5e0745e',
      'photo-1616486338812-3dadae4b4ace',
      'photo-1600585154526-990dced4db0d',
    ],
  },
  {
    id: 'palm-garden-residence',
    name: 'Palm Garden Residence',
    city: 'Beverly Hills',
    state: 'California',
    country: 'USA',
    type: 'Residence',
    price: 6400000,
    beds: 6,
    baths: 7,
    sqft: 8900,
    year: 2017,
    lot: '1.6 acres',
    featured: true,
    listed: '2026-06-29',
    agentId: 'daniel-morgan',
    cover: 'photo-1564013799919-ab600027ffc6',
    alt: 'Grand modern residence at dusk with mature palms and glowing interiors',
    description:
      'Set behind mature palms on one of the flats most coveted streets, this residence balances formal entertaining rooms with relaxed family spaces. A gallery hall connects the wings, opening onto a garden with a 75-foot pool and a pool house.',
    features: [
      '75-foot pool and pool house',
      'Formal gallery and dining room',
      'Chef and catering kitchens',
      'Paneled library',
      'Spa with sauna and steam',
      'Motor court for eight cars',
    ],
    amenities: [
      'Pool house',
      'Spa',
      'Library',
      'Wine cellar',
      'Gym',
      'Elevator',
      'Motor court',
      'Staff quarters',
    ],
    images: [
      'photo-1564013799919-ab600027ffc6',
      'photo-1600607687939-ce8a6c25118c',
      'photo-1600210492486-724fe5c67fb0',
      'photo-1600607688969-a5bfcd646154',
      'photo-1618221195710-dd6b41faaea6',
    ],
  },
  {
    id: 'contemporary-lake-house',
    name: 'Contemporary Lake House',
    city: 'Lake Tahoe',
    state: 'Nevada',
    country: 'USA',
    type: 'House',
    price: 2950000,
    beds: 4,
    baths: 4,
    sqft: 4600,
    year: 2021,
    lot: '1.1 acres',
    featured: false,
    listed: '2026-09-05',
    agentId: 'james-wilson',
    cover: 'photo-1580587771525-78b9dba3b914',
    alt: 'Contemporary lake house with timber cladding and large windows',
    description:
      'A contemporary reading of the classic lake house: charred timber outside, pale oak inside, and a wall of glass facing the water. A covered terrace with an outdoor fireplace extends the living season well into winter.',
    features: [
      'Direct lake frontage and dock',
      'Charred timber cladding',
      'Covered terrace with fireplace',
      'Boot room and ski storage',
      'Bunk room for guests',
      'Radiant heated floors',
    ],
    amenities: [
      'Lake access',
      'Dock',
      'Outdoor fireplace',
      'Ski storage',
      'Heated floors',
      'Two-car garage',
      'Fireplace',
      'Guest suite',
    ],
    images: [
      'photo-1580587771525-78b9dba3b914',
      'photo-1600566753086-00f18fb6b3ea',
      'photo-1600210492493-0946911123ea',
      'photo-1618221195710-dd6b41faaea6',
      'photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 'architectural-downtown-penthouse',
    name: 'Architectural Downtown Penthouse',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    type: 'Penthouse',
    price: 1850000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    year: 2023,
    lot: '—',
    featured: false,
    listed: '2026-10-21',
    agentId: 'sophia-bennett',
    cover: 'photo-1512918728675-ed5a9ecdebfd',
    alt: 'Penthouse living room with floor-to-ceiling windows and warm lighting',
    description:
      'A full-floor penthouse with 270-degree views of the downtown skyline. Interiors are deliberately restrained — white oak, honed limestone, blackened steel — so the city becomes the artwork. Two terraces extend the living space outdoors.',
    features: [
      'Full-floor private lift access',
      'Two landscaped terraces',
      '270-degree skyline views',
      'White oak and limestone finishes',
      'Concierge and valet service',
      'Two reserved parking spaces',
    ],
    amenities: [
      'Private lift',
      'Terraces',
      'Concierge',
      'Residents gym',
      'Pool',
      'Valet parking',
      'Storage',
      'Smart home system',
    ],
    images: [
      'photo-1512918728675-ed5a9ecdebfd',
      'photo-1600210492486-724fe5c67fb0',
      'photo-1616486338812-3dadae4b4ace',
      'photo-1600573472550-8090b5e0745e',
      'photo-1600607687939-ce8a6c25118c',
    ],
  },
];

/** "$2.35 Million" — matches the tone of the brochure copy. */
export function formatPrice(price) {
  const millions = price / 1000000;
  return `$${millions.toLocaleString('en-US', { maximumFractionDigits: 2 })} Million`;
}

export function formatLocation(property) {
  const { city, state, country } = property;
  return [city, state, country].filter(Boolean).join(', ');
}

export function formatPriceShort(price) {
  return `$${Math.round(price / 1000).toLocaleString('en-US')}K`;
}

export function getProperties() {
  return properties;
}

export function getPropertyBySlug(slug) {
  return properties.find((property) => property.id === slug) ?? null;
}

export function getFeaturedProperties() {
  return properties.filter((property) => property.featured);
}

export function getSimilarProperties(property, limit = 3) {
  return properties
    .filter((candidate) => candidate.id !== property.id)
    .sort((a, b) => {
      const scoreA = (a.type === property.type ? 2 : 0) + (a.state === property.state ? 1 : 0);
      const scoreB = (b.type === property.type ? 2 : 0) + (b.state === property.state ? 1 : 0);
      return scoreB - scoreA || Math.abs(a.price - property.price) - Math.abs(b.price - property.price);
    })
    .slice(0, limit);
}

export const PROPERTY_TYPES = [...new Set(properties.map((property) => property.type))].sort();

export const LOCATIONS = [...new Set(properties.map((property) => `${property.city}, ${property.state}`))].sort();
