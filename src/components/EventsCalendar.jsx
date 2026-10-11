import { CALENDAR_MONTH, CALENDAR_EVENTS } from '../data/events.js';
import { asset } from '../lib/asset.js';
import './EventsCalendar.css';

/* Shared between the landing page (headed "Calendar") and the program pages
 * (headed "Events"), per the comps. */
export default function EventsCalendar({ heading = 'Calendar', id = 'events' }) {
  return (
    <section className="calendar shell" aria-labelledby={id}>
      <h2 className="calendar__title" id={id}>{heading}</h2>
      <p className="calendar__month">{CALENDAR_MONTH}</p>
      <hr className="calendar__rule" />

      <ol className="calendar__list">
        {CALENDAR_EVENTS.map((e) => (
          <li className="event" key={e.day}>
            <div className="event__when">
              <span className="event__day">{e.day}</span>
              <span className="event__time">
                {e.weekday}
                <br />
                {e.time}
              </span>
            </div>
            <div className="event__body">
              <h3 className="event__title">{e.title}</h3>
              {e.description && <p className="event__desc">{e.description}</p>}
            </div>
            {e.image ? (
              <img className="event__image" src={asset(e.image)} alt="" loading="lazy" />
            ) : (
              <div className="event__image event__image--empty" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      <hr className="calendar__rule" />
      <p className="calendar__next">
        <a href={`#${id}`}>next month &rarr;</a>
      </p>
    </section>
  );
}
