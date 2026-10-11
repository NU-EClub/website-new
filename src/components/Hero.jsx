import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset.js';
import { HERO } from '../data/site.js';
import './Hero.css';

/* The comp shows a still, but the hero is meant to be video. Drop the encoded
 * file into public/assets and name it here -- the poster below is the fallback
 * (and what reduced-motion users see, since they get no autoplay). */
const HERO_VIDEO = null; // e.g. 'hero.mp4'

export default function Hero() {
  const videoRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) videoRef.current?.pause();
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <section className="hero">
      <video
        ref={videoRef}
        className="hero__media"
        poster={asset('hero-landing.jpg')}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload={HERO_VIDEO && !reduceMotion ? 'auto' : 'none'}
        aria-hidden="true"
        tabIndex={-1}
      >
        {HERO_VIDEO && !reduceMotion && (
          <source src={asset(HERO_VIDEO)} type="video/mp4" />
        )}
      </video>
      <div className="hero__scrim" />
      <h1 className="hero__headline">
        {HERO.headlineBefore}
        <em>{HERO.headlineEmphasis}</em>
        {HERO.headlineAfter}
      </h1>
    </section>
  );
}
