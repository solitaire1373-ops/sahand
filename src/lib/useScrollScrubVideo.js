import { useEffect } from 'react';

/*
 * Scroll-driven video scrubbing for the hero.
 *
 * The video is never played: it stays paused and we only move its timeline with
 * `video.currentTime`, mapped 1:1 onto how far the user has scrolled through the
 * hero's scroll runway.
 *
 * Performance notes
 * -----------------
 * - Scroll events are passive and only record the *target* progress. They never
 *   touch the video, so scrolling never forces layout or decoding work.
 * - A single requestAnimationFrame loop owns every mutation: it eases the shown
 *   progress towards the scroll target and writes `currentTime` at most once per
 *   rendered frame.
 * - The loop idles (no rAF scheduled) whenever target and shown progress match,
 *   so an idle page costs nothing.
 * - A new seek is issued only when the previous one has finished
 *   (`video.seeking` is false) and the requested time moved by more than
 *   MIN_SEEK_DELTA. Browsers queue seeks, so flooding `currentTime` with dozens of
 *   values per second is what produces the classic stutter; this gate keeps the
 *   decoder one step behind the scroll.
 * - No React state is involved: everything is written through refs / inline style.
 *
 * Encoding requirements for smooth scrubbing (see public/videos): a short
 * keyframe interval is essential — a video with one keyframe per clip forces the
 * decoder to walk from the first frame on every seek. The shipped clips use a
 * keyframe every 4 frames (0.167s), H.264 High with yuv420p, `+faststart`, no
 * audio track and a modest bitrate, which gives near-random-access seeking while
 * staying visually clean.
 */

const SMOOTHING_TAU = 0.07; // seconds — small enough to feel attached to the scroll
const MIN_SEEK_DELTA = 0.006; // seconds — ignore sub-frame noise
const TEXT_FADE_END = 0.36; // hero copy has fully cleared out at 36% of the runway

export default function useScrollScrubVideo({ sectionRef, videoRef, contentRef, cueRef, enabled = true }) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!enabled || !section || !video) return undefined;

    let sectionTop = 0;
    let scrollLength = 1;
    let target = 0; // progress implied by the current scroll position
    let shown = 0; // eased progress actually painted
    let lastSeek = -1;
    let frameId = 0;
    let lastTs = 0;
    let disposed = false;

    const paintText = (progress) => {
      const content = contentRef.current;
      if (content) {
        const t = Math.min(progress / TEXT_FADE_END, 1);
        const eased = t * t * (3 - 2 * t);
        content.style.opacity = (1 - eased).toFixed(3);
        content.style.transform = `translate3d(0, ${(-eased * 46).toFixed(2)}px, 0)`;
      }

      const cue = cueRef.current;
      if (cue) cue.style.opacity = Math.max(0, 1 - progress / 0.06).toFixed(3);
    };

    /** Returns false while the previous seek is still decoding (keep the loop alive). */
    const seekTo = (progress) => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return true;
      if (video.seeking) return false;

      const lastFrame = Math.max(duration - 0.05, 0);
      const time = Math.min(progress * lastFrame, lastFrame);
      if (lastSeek >= 0 && Math.abs(time - lastSeek) < MIN_SEEK_DELTA) return true;

      lastSeek = time;
      video.currentTime = time;
      return true;
    };

    const tick = (ts) => {
      frameId = 0;
      const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.064) : 1 / 60;
      lastTs = ts;

      // Frame-rate independent exponential smoothing: responsive, never jumpy.
      const alpha = 1 - Math.exp(-dt / SMOOTHING_TAU);
      shown += (target - shown) * alpha;
      if (Math.abs(target - shown) < 0.0006) shown = target;

      const seekSettled = seekTo(shown);
      paintText(shown);

      if (!seekSettled || shown !== target) {
        frameId = requestAnimationFrame(tick);
      } else {
        lastTs = 0;
      }
    };

    const start = () => {
      if (frameId || disposed) return;
      lastTs = 0;
      frameId = requestAnimationFrame(tick);
    };

    const readScroll = () => {
      const travelled = window.scrollY - sectionTop;
      const next = Math.min(1, Math.max(0, travelled / scrollLength));
      if (next === target) return;
      target = next;
      start();
    };

    const measure = () => {
      if (disposed) return;
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      scrollLength = Math.max(rect.height - window.innerHeight, 1);
      readScroll();
    };

    // Jump straight to the frame implied by the current scroll position (refresh,
    // restored scroll, or metadata arriving after the user already scrolled).
    const syncNow = () => {
      measure();
      shown = target;
      lastSeek = -1;
      seekTo(shown);
      paintText(shown);
    };

    const onMeta = () => {
      lastSeek = -1;
      syncNow();
    };

    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('durationchange', onMeta);

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(section);

    syncNow();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => measure()).catch(() => {});
    }

    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('durationchange', onMeta);
      observer?.disconnect();
    };
  }, [sectionRef, videoRef, contentRef, cueRef, enabled]);
}
