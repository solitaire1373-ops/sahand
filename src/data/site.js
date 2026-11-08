/** Static brand, navigation and editorial content. */

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
];

export const CONTACT = {
  phone: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  address: '2100 Lakeshore Drive, Suite 1200, Austin, TX 78701',
  hours: 'Monday – Friday, 9:00 – 18:00',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'Facebook', href: 'https://www.facebook.com' },
  ],
};

export const SERVICES = [
  {
    id: 'luxury-home-sales',
    title: 'Luxury Home Sales',
    description:
      'Discreet representation for exceptional residences — from first valuation to a considered closing, handled by one senior advisor.',
  },
  {
    id: 'property-investment',
    title: 'Property Investment',
    description:
      'Acquisition strategy grounded in yield, location fundamentals and long-term value rather than short-term noise.',
  },
  {
    id: 'property-marketing',
    title: 'Property Marketing',
    description:
      'Architectural photography, film and a curated buyer network that puts your property in front of the right audience.',
  },
  {
    id: 'real-estate-advisory',
    title: 'Real Estate Advisory',
    description:
      'Independent advice on portfolio structure, financing and the timing of a sale, with no conflict of interest.',
  },
  {
    id: 'property-valuation',
    title: 'Property Valuation',
    description:
      'Evidence-based appraisals built from comparable sales, condition assessments and current market demand.',
  },
  {
    id: 'relocation-services',
    title: 'Relocation Services',
    description:
      'A single point of contact for moving, schooling, interiors and settling into a new city, arranged end to end.',
  },
];

export const WHY_POINTS = [
  {
    value: '18',
    suffix: 'years',
    title: 'A considered practice',
    description:
      'Nearly two decades advising buyers and sellers across the country’s most desirable addresses.',
  },
  {
    value: '$1.2',
    suffix: 'B',
    title: 'Property transacted',
    description:
      'A record built on repeat clients and referrals rather than volume for its own sake.',
  },
  {
    value: '340',
    suffix: '+',
    title: 'Homes placed',
    description:
      'Families, founders and investors matched with properties that hold their value.',
  },
  {
    value: '98',
    suffix: '%',
    title: 'Client retention',
    description:
      'Almost every client returns for their next move — the clearest measure of our work.',
  },
];

export const TEAM = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    email: 'daniel@horizonproperties.com',
    photo: 'photo-1560250097-0b93528c311a',
    bio: 'Daniel founded Horizon after fifteen years in architectural practice and private sales.',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    email: 'olivia@horizonproperties.com',
    photo: 'photo-1573496359142-b8d87734a5a2',
    bio: 'Olivia represents coastal and hillside residences across California.',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    email: 'james@horizonproperties.com',
    photo: 'photo-1500648767791-00dcc994a43e',
    bio: 'James advises private clients on income property and long-hold acquisitions.',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    email: 'sophia@horizonproperties.com',
    photo: 'photo-1580489944761-15a19d654956',
    bio: 'Sophia leads our city residences and penthouse portfolio.',
  },
];

export function getAgent(agentId) {
  return TEAM.find((member) => member.id === agentId) ?? TEAM[0];
}

export const STATS = [
  { label: 'Years of practice', value: '18' },
  { label: 'Properties sold', value: '340+' },
  { label: 'Client retention', value: '98%' },
];
