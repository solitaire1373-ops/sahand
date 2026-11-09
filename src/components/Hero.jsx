import { useCallback, useRef, useState } from 'react';
import { photo } from '../data/properties';
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion';
import useScrollScrubVideo from '../lib/useScrollScrubVideo';

const HERO_IMAGE = 'photo-1613490493576-7fde63acd811';

/* Both clips are re-encoded for random-access seeking: keyframe every 4 frames,
   H.264 High / yuv420p, faststart, no audio track. See useScrollScrubVideo.js. */
const VIDEO_DESKTOP = '/videos/hero-scrub.mp4';
const VIDEO_MOBILE = '/videos/hero-scrub-mobile.mp4';
const VIDEO_POSTER = '/videos/hero-poster.jpg';

function pickVideoSource() {
  if (typeof window === 'undefined') return VIDEO_DESKTOP;
  const compact = window.matchMedia('(max-width: 900px)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  return compact || coarse ? VIDEO_MOBILE : VIDEO_DESKTOP;
}

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const [videoSource] = useState(pickVideoSource);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const cueRef = useRef(null);

  const scrubbing = !reduceMotion && !failed;

  // Scrubbing starts only once the clip has a decodable first frame, so the
  // experience never opens on a blank or half-buffered video.
  useScrollScrubVideo({ sectionRef, videoRef, contentRef, cueRef, enabled: scrubbing && ready });

  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => setFailed(true), []);

  return (
    <section
      className={`hero${scrubbing ? '' : ' hero--static'}`}
      ref={sectionRef}
      aria-labelledby="hero-title"
    >
      <div className="hero__sticky">
        <div className="hero__media">
          {scrubbing ? (
            <>
              <img
                className="hero__poster"
                src={VIDEO_POSTER}
                alt=""
                aria-hidden="true"
                decoding="async"
              />
              <video
                ref={videoRef}
                className={`hero__video${ready ? ' is-ready' : ''}`}
                src={videoSource}
                poster={VIDEO_POSTER}
                preload="auto"
                muted
                playsInline
                disablePictureInPicture
                tabIndex={-1}
                aria-hidden="true"
                onLoadedData={handleReady}
                onCanPlay={handleReady}
                onError={handleError}
              />
            </>
          ) : (
            <img
              className="hero__image"
              src={failed ? photo(HERO_IMAGE, 1800) : VIDEO_POSTER}
              alt="Sunlit architectural view of a modern luxury residence"
              decoding="async"
            />
          )}
        </div>
        <div className="hero__overlay" aria-hidden="true" />

        <div className="container hero__content" ref={contentRef}>
          <h1 id="hero-title">
            Discover Exceptional
            <br className="hero__br" /> Homes &amp; Investments
          </h1>
          <p className="hero__text">
            Premium properties in prime locations. Find your dream home
            <br className="hero__br" /> or the perfect investment with confidence.
          </p>
        </div>

        {scrubbing && ready && (
          <div className="hero__cue" ref={cueRef} aria-hidden="true">
            <span className="hero__cue-label">Scroll to explore</span>
            <span className="hero__cue-line" />
          </div>
        )}

        {scrubbing && (
          <div className={`hero__loader${ready ? ' is-hidden' : ''}`} role="status" aria-live="polite">
            <span className="hero__loader-label">
              {ready ? 'Experience ready' : 'Preparing the experience'}
            </span>
            <span className="hero__loader-bar" aria-hidden="true">
              <span />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
