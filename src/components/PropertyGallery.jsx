import { useCallback, useEffect, useRef, useState } from 'react';
import { photo } from '../data/properties';
import { ArrowLeft, ArrowRight, Close, Sparkle } from './icons';

const pad = (value) => String(value).padStart(2, '0');

function Lightbox({ property, index, setIndex, onClose }) {
  const closeRef = useRef(null);
  const total = property.images.length;

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIndex((current) => (current + 1) % total);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIndex((current) => (current - 1 + total) % total);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, setIndex, total]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${property.name} image gallery`}>
      <div className="lightbox__bar">
        <span className="lightbox__title">{property.name}</span>
        <span>
          {pad(index + 1)} / {pad(total)}
        </span>
        <button
          ref={closeRef}
          type="button"
          className="icon-btn icon-btn--ghost"
          onClick={onClose}
          aria-label="Close image gallery"
        >
          <Close />
        </button>
      </div>

      <div className="lightbox__stage">
        <img
          src={photo(property.images[index], 1800)}
          alt={`${property.name} — image ${index + 1} of ${total}`}
        />
        <button
          type="button"
          className="icon-btn icon-btn--ghost lightbox__nav lightbox__nav--prev"
          onClick={() => setIndex((current) => (current - 1 + total) % total)}
          aria-label="Previous image"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--ghost lightbox__nav lightbox__nav--next"
          onClick={() => setIndex((current) => (current + 1) % total)}
          aria-label="Next image"
        >
          <ArrowRight />
        </button>
      </div>

      <div className="lightbox__thumbs">
        {property.images.map((image, imageIndex) => (
          <button
            key={`${image}-${imageIndex}`}
            type="button"
            className={`lightbox__thumb${imageIndex === index ? ' is-active' : ''}`}
            onClick={() => setIndex(imageIndex)}
            aria-label={`Show image ${imageIndex + 1}`}
            aria-current={imageIndex === index}
          >
            <img src={photo(image, 200)} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PropertyGallery({ property }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef(null);
  const total = property.images.length;

  useEffect(() => {
    setIndex(0);
    setOpen(false);
  }, [property.id]);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    openButtonRef.current?.focus();
  }, []);

  return (
    <div className="gallery">
      <button
        ref={openButtonRef}
        type="button"
        className="gallery__main"
        onClick={() => setOpen(true)}
        aria-label={`Open ${property.name} gallery, image ${index + 1} of ${total}`}
      >
        <img
          src={photo(property.images[index], 1600)}
          alt={index === 0 ? property.alt : `${property.name} — view ${index + 1}`}
          decoding="async"
        />
        <span className="gallery__count">
          <Sparkle />
          View gallery · {total} photos
        </span>
      </button>

      <div className="gallery__thumbs">
        {property.images.map((image, imageIndex) => (
          <button
            key={`${image}-${imageIndex}`}
            type="button"
            className={`gallery__thumb${imageIndex === index ? ' is-active' : ''}`}
            onClick={() => setIndex(imageIndex)}
            aria-label={`Show image ${imageIndex + 1} of ${total}`}
            aria-current={imageIndex === index}
          >
            <img src={photo(image, 400)} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {open ? (
        <Lightbox property={property} index={index} setIndex={setIndex} onClose={closeLightbox} />
      ) : null}
    </div>
  );
}
