/* Calendar + news content, editable through Pages CMS at content/events.json
 * and content/news.json.
 *
 * This is also the seam for the Notion integration discussed separately: when
 * that lands, the build step writes these same JSON files and nothing below
 * has to change.
 *
 * NOTE: the Figma comp labelled the Sept 18 entry "Founder Development
 * Bootcamp #1". "Founder Development" is an internal name -- the public name
 * is Spark -- so it ships renamed.
 */
import calendar from '../../content/events.json';
import news from '../../content/news.json';

export const CALENDAR_MONTH = calendar.month;

/* Empty strings are how the CMS represents "no value"; normalise them to null
 * so the components' `{cond && ...}` checks behave. */
const blankToNull = (v) => (v == null || v === '' ? null : v);

export const CALENDAR_EVENTS = calendar.events.map((e) => ({
  ...e,
  description: blankToNull(e.description),
  image: blankToNull(e.image),
}));

export const NEWS_ITEMS = news;
