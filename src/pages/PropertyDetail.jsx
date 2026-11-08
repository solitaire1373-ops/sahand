import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  formatLocation,
  formatPrice,
  getPropertyBySlug,
  getSimilarProperties,
} from '../data/properties';
import PropertyGallery from '../components/PropertyGallery';
import AgentCard from '../components/AgentCard';
import EnquiryModal from '../components/EnquiryModal';
import FavoriteButton from '../components/FavoriteButton';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import NotFound from './NotFound';
import { Area, ArrowLeft, Bath, Bed, Calendar, Compass, Pin } from '../components/icons';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function PropertyDetail() {
  const { id } = useParams();
  const property = getPropertyBySlug(id);
  const [modal, setModal] = useState(null);

  useDocumentTitle(property ? `${property.name} — Horizon Properties` : 'Property not found');

  if (!property) {
    return <NotFound />;
  }

  const similar = getSimilarProperties(property, 3);
  const price = formatPrice(property.price);

  const facts = [
    { label: 'Bedrooms', value: property.beds, icon: Bed },
    { label: 'Bathrooms', value: property.baths, icon: Bath },
    { label: 'Interior', value: `${property.sqft.toLocaleString('en-US')} sq ft`, icon: Area },
    { label: 'Property type', value: property.type, icon: Compass },
    { label: 'Year built', value: property.year, icon: Calendar },
    { label: 'Lot size', value: property.lot, icon: Pin },
  ];

  return (
    <>
      <div className="detail">
        <div className="container">
          <Link className="detail__back" to="/properties">
            <ArrowLeft />
            All properties
          </Link>

          <div className="detail__head">
            <div className="detail__head-copy">
              <span className="label">{property.type}</span>
              <h1 className="detail__title">{property.name}</h1>
              <p className="detail__location">
                <Pin />
                {formatLocation(property)}
              </p>
            </div>
            <div className="detail__head-right">
              <p className="detail__price">{price}</p>
              <FavoriteButton
                plain
                propertyId={property.id}
                propertyName={property.name}
                className="detail__favorite"
              />
            </div>
          </div>

          <PropertyGallery property={property} />

          <div className="detail__body">
            <div>
              <div className="facts">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div className="fact" key={fact.label}>
                      <span className="fact__label">
                        <Icon />
                        {fact.label}
                      </span>
                      <span className="fact__value">{fact.value}</span>
                    </div>
                  );
                })}
              </div>

              <section className="detail__section" aria-labelledby="overview-title">
                <h2 id="overview-title">About this property</h2>
                <p>{property.description}</p>
              </section>

              <section className="detail__section" aria-labelledby="features-title">
                <h2 id="features-title">Key features</h2>
                <ul className="feature-list">
                  {property.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </section>

              <section className="detail__section" aria-labelledby="amenities-title">
                <h2 id="amenities-title">Amenities</h2>
                <ul className="amenities">
                  {property.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="detail__aside" aria-label="Contact the listing agent">
              <AgentCard
                property={property}
                onContact={() => setModal('contact')}
                onSchedule={() => setModal('viewing')}
              />
            </aside>
          </div>

          <section className="similar" aria-labelledby="similar-title">
            <div className="similar__head">
              <div>
                <span className="label">Similar</span>
                <h2 id="similar-title">You may also like</h2>
              </div>
              <Link className="text-link" to="/properties">
                View all properties
              </Link>
            </div>
            <div className="property-grid">
              {similar.map((item, index) => (
                <Reveal key={item.id} delay={(index % 3) + 1}>
                  <PropertyCard property={item} layout="grid" />
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mobile-cta">
        <div className="mobile-cta__copy">
          <span className="mobile-cta__price">{price}</span>
          <span className="mobile-cta__name">{property.name}</span>
        </div>
        <div className="mobile-cta__actions">
          <FavoriteButton plain propertyId={property.id} propertyName={property.name} />
          <Button variant="primary" size="sm" onClick={() => setModal('viewing')}>
            Schedule viewing
          </Button>
        </div>
      </div>

      {modal ? (
        <EnquiryModal mode={modal} property={property} onClose={() => setModal(null)} />
      ) : null}
    </>
  );
}
