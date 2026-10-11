import { Link } from 'react-router-dom';
import { HSC, NEXUS, FOUNDER_CIRCLE } from '../data/programs.js';
import { PROGRAMS_INTRO } from '../data/site.js';
import './ProgramsSection.css';

/* One standalone program card, tinted with that program's primary. */
function ProgramCard({ program, className }) {
  return (
    <Link
      to={`/programs/${program.slug}`}
      className={`program-card ${className ?? ''}`}
      style={{ '--card-bg': program.accent, '--card-fg': program.onAccent }}
    >
      <h3 className="program-card__name">{program.name}</h3>
      <p className="program-card__blurb">{program.blurb}</p>
    </Link>
  );
}

/* HSC is the umbrella, not a sibling of Spark and Bolt -- so it is a single
 * card whose body splits into the two programs it contains. */
function HscCard() {
  return (
    <section className="hsc-card" aria-labelledby="hsc-card-title">
      <div className="hsc-card__head">
        <h3 className="hsc-card__name" id="hsc-card-title">
          <Link to={`/programs/${HSC.slug}`}>{HSC.name}</Link>
        </h3>
        <p className="hsc-card__blurb">{HSC.blurb}</p>
      </div>
      <div className="hsc-card__halves">
        {HSC.children.map((child) => (
          <Link
            key={child.slug}
            to={`/programs/${child.slug}`}
            className="hsc-half"
            style={{ '--card-bg': child.accent, '--card-fg': child.onAccent }}
          >
            <h4 className="hsc-half__name">{child.name}</h4>
            <p className="hsc-half__blurb">{child.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ProgramsSection() {
  return (
    <section className="programs" aria-labelledby="programs-title">
      <div className="programs__inner">
        <h2 className="programs__title" id="programs-title">{PROGRAMS_INTRO.title}</h2>
        <p className="programs__lead">{PROGRAMS_INTRO.lede}</p>
        <div className="programs__grid">
          <HscCard />
          <ProgramCard program={FOUNDER_CIRCLE} />
          <ProgramCard program={NEXUS} />
        </div>
      </div>
    </section>
  );
}
