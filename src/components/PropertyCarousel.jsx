import { useCallback, useEffect, useRef, useState } from 'react';
import PropertyCard from './PropertyCard';
import { ArrowLeft, ArrowRight } from './icons';

const pad = (value) => String(value).padStart(2, '0');

export default function PropertyCarousel({ properties }) {
  const trackRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [current, setCurrent] = useState(1);

  const syncState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);

    const items = Array.from(track.children);
    const viewportMiddle = track.scrollLeft + track.clientWidth / 2;
    const visibleIndex = items.findIndex(
      (item) => item.offsetLeft <= viewportMiddle && item.offsetLeft + item.offsetWidth > viewportMiddle
    );
    setCurrent((visibleIndex >= 0 ? visibleIndex : 0) + 1);
  }, []);

  useEffect(() => {
    syncState();
    window.addEventListener('resize', syncState);
    return () => window.removeEventListener('resize', syncState);
  }, [syncState]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const firstItem = track.firstElementChild;
    const step = firstItem ? firstItem.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse') return;
    const track = event.currentTarget;
    dragState.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
    };
    setDragging(true);
    try {
      track.setPointerCapture?.(event.pointerId);
    } catch {
      /* Capture can fail for a pointer that is already gone; dragging still works. */
    }
  };

  const onPointerMove = (event) => {
    if (!dragState.current.active) return;
    const delta = event.clientX - dragState.current.startX;
    dragState.current.moved = Math.max(dragState.current.moved, Math.abs(delta));
    event.currentTarget.scrollLeft = dragState.current.startScroll - delta;
  };

  const endDrag = (event) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    setDragging(false);
    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    } catch {
      /* Nothing to release. */
    }
    syncState();
  };

  const onClickCapture = (event) => {
    if (dragState.current.moved > 8) {
      event.preventDefault();
      event.stopPropagation();
      dragState.current.moved = 0;
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByCard(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel__nav carousel__nav--prev"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        aria-label="Show previous properties"
      >
        <ArrowLeft />
      </button>

      <div
        ref={trackRef}
        className={`carousel__track${dragging ? ' is-dragging' : ''}`}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured properties"
        tabIndex={0}
        onScroll={syncState}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(event) => {
          if (dragState.current.active) endDrag(event);
        }}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
      >
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={`carousel__item carousel__item--${index % 4 === 0 ? 'wide' : 'tall'}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${properties.length}`}
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel__nav carousel__nav--next"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        aria-label="Show next properties"
      >
        <ArrowRight />
      </button>

      <div className="carousel__footer">
        <p className="carousel__progress" aria-hidden="true">
          <b>{pad(current)}</b> / {pad(properties.length)}
        </p>
      </div>
    </div>
  );
}
