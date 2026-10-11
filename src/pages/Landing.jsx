import Hero from '../components/Hero.jsx';
import ProgramsSection from '../components/ProgramsSection.jsx';
import EventsCalendar from '../components/EventsCalendar.jsx';
import { NEWS_ITEMS } from '../data/events.js';
import { asset } from '../lib/asset.js';
import { MISSION, NEWS_TITLE, CALENDAR_TITLE } from '../data/site.js';
import './Landing.css';

function Mission() {
  return (
    <section className="mission shell">
      <h2 className="mission__title">{MISSION.title}</h2>
      <p className="mission__body">{MISSION.body}</p>
    </section>
  );
}

function News() {
  return (
    <section className="news shell" aria-labelledby="news-title">
      <h2 className="news__title" id="news-title">{NEWS_TITLE}</h2>
      <ul className="news__grid">
        {NEWS_ITEMS.map((n) => (
          <li className="news-card" key={n.id}>
            <img className="news-card__image" src={asset(n.image)} alt="" />
            <h3 className="news-card__title">{n.title}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Landing() {
  return (
    <>
      <Hero />
      <Mission />
      <ProgramsSection />
      <EventsCalendar heading={CALENDAR_TITLE} id="calendar" />
      <News />
    </>
  );
}
