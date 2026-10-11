import { Link, useParams, Navigate } from 'react-router-dom';
import { BY_SLUG } from '../data/programs.js';
import { PROGRAM_CONTENT } from '../data/programContent.js';
import EventsCalendar from '../components/EventsCalendar.jsx';
import { asset } from '../lib/asset.js';
import './ProgramPage.css';

/* Every comp opens the same way: a full-bleed photo, the breadcrumb, a 128px
 * title, the lede, and -- on the programs you apply to -- a CTA. */
function ProgramHero({ content }) {
  return (
    <header className="p-hero">
      <img className="p-hero__media" src={asset(content.hero)} alt="" />
      <div className="p-hero__scrim" />
      <div className="p-hero__inner shell">
        <nav className="p-hero__crumbs" aria-label="Breadcrumb">
          {content.breadcrumb.map((crumb, i) => (
            <span key={crumb}>
              {i > 0 && <span className="p-hero__sep" aria-hidden="true">/</span>}
              <span {...(i === content.breadcrumb.length - 1 ? { 'aria-current': 'page' } : {})}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
        <h1 className="p-hero__title">{content.title}</h1>
        <p className="p-hero__lede">{content.lede}</p>
        {content.apply && (
          <Link className="p-hero__cta" to="/contact">Apply Now</Link>
        )}
      </div>
    </header>
  );
}

function Mission({ mission }) {
  if (!mission?.paragraphs?.length && !mission?.heading) return null;
  return (
    <section className={`p-mission p-mission--${mission.align} shell`}>
      {mission.heading && <h2 className="p-mission__heading">{mission.heading}</h2>}
      {mission.paragraphs.map((t) => (
        <p className="p-mission__body" key={t.slice(0, 40)}>{t}</p>
      ))}
    </section>
  );
}

/* Heading + list of named items. The comps carry lorem body copy under each
 * name; `body` is null until real copy exists, and the name stands alone. */
function Features({ section }) {
  return (
    <section className={`p-band p-band--${section.tone}`}>
      <div className="shell p-band__inner">
        <h2 className="p-band__heading">{section.heading}</h2>
        <ul className="p-features">
          {section.items.map((it, i) => (
            <li key={i}>
              <h3>{it.name}</h3>
              {it.body && <p>{it.body}</p>}
            </li>
          ))}
        </ul>
        {section.image && (
          <img className="p-band__aside" src={asset(section.image)} alt="" loading="lazy" />
        )}
      </div>
    </section>
  );
}

function Criteria({ section }) {
  return (
    <section className={`p-band p-band--${section.tone}`}>
      <div className="shell p-band__inner">
        <h2 className="p-band__heading">{section.heading}</h2>
        <ul className="p-criteria">
          {section.items.map((t) => <li key={t}>{t}</li>)}
        </ul>
        {section.image && (
          <img className="p-band__aside" src={asset(section.image)} alt="" loading="lazy" />
        )}
      </div>
    </section>
  );
}

function Timeline({ section }) {
  return (
    <section className={`p-band p-band--${section.tone}`}>
      <div className="shell p-band__inner">
        <h2 className="p-band__heading">{section.heading}</h2>
        {section.lede && <p className="p-band__lede">{section.lede}</p>}
        <ol className="p-timeline">
          {section.steps.map((s, i) => (
            <li key={i}>
              <span className="p-timeline__marker" aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{s.name}</h3>
                {s.body && <p>{s.body}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* HSC's "Spark & Bolt" band: the umbrella pointing at its two tracks.
 * Spark always leads -- it is the early-stage entry point, Bolt the later one. */
function Split({ section }) {
  return (
    <section className={`p-band p-band--${section.tone}`}>
      <div className="shell p-band__inner">
        <h2 className="p-band__heading">{section.heading}</h2>
        {section.lede && <p className="p-band__lede">{section.lede}</p>}
        <div className="p-split">
          {section.columns.map((col) => {
            const child = BY_SLUG[col.slug];
            return (
              <Link className="p-split__col" to={`/programs/${col.slug}`} key={col.slug}>
                <img src={asset(col.image)} alt="" loading="lazy" />
                <h3 style={{ color: child?.accent }}>{col.name}</h3>
                <p>{col.cta} &rarr;</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Quotes({ section }) {
  return (
    <section className="p-quotes shell">
      <h2 className="p-quotes__heading">{section.heading}</h2>
      <div className="p-quotes__grid">
        {section.items.map((q, i) => (
          <figure className="p-quote" key={i}>
            <div className="p-quote__who">
              <img src={asset(q.avatar)} alt="" width="80" height="80" loading="lazy" />
              <figcaption>
                <strong>{q.name}</strong> | {q.role}
              </figcaption>
            </div>
            <blockquote>&ldquo;{q.quote}&rdquo;</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CtaBand({ section }) {
  return (
    <section className={`p-band p-band--${section.tone} p-cta`}>
      <Link className="shell p-cta__inner" to={section.to}>
        <h2>{section.heading}</h2>
        <p>{section.sub} &rarr;</p>
      </Link>
    </section>
  );
}

function ImageBand({ section }) {
  return (
    <div className="p-imageband shell">
      <img src={asset(section.src)} alt="" loading="lazy" />
    </div>
  );
}

const RENDERERS = {
  features: Features,
  criteria: Criteria,
  timeline: Timeline,
  split: Split,
  quotes: Quotes,
  cta: CtaBand,
  image: ImageBand,
};

export default function ProgramPage() {
  const { slug } = useParams();
  const program = BY_SLUG[slug];
  const content = PROGRAM_CONTENT[slug];

  if (!program || !content) return <Navigate to="/" replace />;

  return (
    <article
      className="program-page"
      style={{
        '--accent': program.accent ?? 'var(--c-black)',
        '--on-accent': program.onAccent ?? 'var(--c-white)',
      }}
    >
      <ProgramHero content={content} />

      {content.provisional && (
        <p className="program-page__notice shell">
          This page is a stub: the {content.title} comp has its mission and
          section headings still set to placeholder text in Figma.
        </p>
      )}

      <Mission mission={content.mission} />

      {content.sections.map((section, i) => {
        const Renderer = RENDERERS[section.type];
        return Renderer ? <Renderer section={section} key={`${section.type}-${i}`} /> : null;
      })}

      {content.events && <EventsCalendar heading="Events" id="program-events" />}

      <nav className="program-page__back shell">
        <Link to="/">&larr; All programs</Link>
      </nav>
    </article>
  );
}
