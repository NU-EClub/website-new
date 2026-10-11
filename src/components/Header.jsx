import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_PROGRAMS } from '../data/programs.js';
import { asset } from '../lib/asset.js';
import { SITE_NAME, SOCIAL } from '../data/site.js';
import './Header.css';

const LINKS = [
  { label: 'Events', to: '/events' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'News', to: '/news' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [openPrograms, setOpenPrograms] = useState(false);
  const programsRef = useRef(null);

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    if (!openPrograms) return;
    const onDown = (e) => {
      if (!programsRef.current?.contains(e.target)) setOpenPrograms(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpenPrograms(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openPrograms]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/">
          <img
            className="site-header__logo"
            src={asset('logo-mark.png')}
            alt=""
            width="57"
            height="59"
          />
          <span className="site-header__wordmark">{SITE_NAME}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <div
            className="site-nav__group"
            ref={programsRef}
            onMouseEnter={() => setOpenPrograms(true)}
            onMouseLeave={() => setOpenPrograms(false)}
          >
            <button
              type="button"
              className="site-nav__pill"
              aria-expanded={openPrograms}
              aria-haspopup="true"
              onClick={() => setOpenPrograms((v) => !v)}
            >
              Programs
            </button>
            <ul className="site-nav__menu" data-open={openPrograms || undefined}>
              {NAV_PROGRAMS.map((p) => (
                <li key={p.slug}>
                  <NavLink
                    className="site-nav__menu-item"
                    to={`/programs/${p.slug}`}
                    onClick={() => setOpenPrograms(false)}
                  >
                    {p.slug === 'hsc' ? 'HSC' : p.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {LINKS.map((l) => (
            <NavLink key={l.to} className="site-nav__pill" to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__social">
          <a href={SOCIAL.instagram} aria-label="Instagram">
            <img src={asset('icon-instagram.svg')} alt="" width="24" height="24" />
          </a>
          <a href={SOCIAL.linkedin} aria-label="LinkedIn">
            <img src={asset('icon-linkedin.svg')} alt="" width="24" height="24" />
          </a>
        </div>
      </div>
    </header>
  );
}
