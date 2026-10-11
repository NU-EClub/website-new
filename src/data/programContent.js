/* Program page content.
 *
 * Split deliberately in two:
 *   - EDITABLE PROSE lives in content/pages/<slug>.json, exposed through
 *     Pages CMS. Headings, ledes, item labels and body copy.
 *   - STRUCTURE lives in SPEC below: which renderer a section uses, which
 *     colour band it sits on, which image it carries, the breadcrumb, whether
 *     the page has an Apply CTA or an Events block.
 *
 * Keeping them apart means an editor cannot delete a section type or point a
 * band at a missing image, and means Pages CMS rewriting a JSON file can never
 * drop a structural field it was not told about.
 *
 * Transcribed from the Figma comps: Desktop - 3 HSC, 4 Bolt, 5 Spark,
 * 6 Nexus, 7 Founder Circle.
 */
import hsc from '../../content/pages/hsc.json';
import spark from '../../content/pages/spark.json';
import bolt from '../../content/pages/bolt.json';
import nexus from '../../content/pages/nexus.json';
import founderCircle from '../../content/pages/founder-circle.json';

const COPY = { hsc, spark, bolt, nexus, 'founder-circle': founderCircle };

const SPEC = {
  hsc: {
    breadcrumb: ['Programs', 'HSC'],
    hero: 'hero-hsc.jpg',
    apply: false,
    missionAlign: 'center',
    events: false,
    sections: {
      tracks: {
        type: 'split',
        tone: 'black',
        images: { bolt: 'shot-bolt.png', spark: 'shot-spark.png' },
      },
      quotes: { type: 'quotes', avatar: 'hsc-avatar.png' },
    },
    /* trailing structural-only section with no copy of its own */
    extras: [{ type: 'image', src: 'hsc-bottom.jpg' }],
  },
  spark: {
    breadcrumb: ['Programs', 'Spark'],
    hero: 'hero-spark.jpg',
    apply: true,
    missionAlign: 'center',
    events: true,
    sections: {
      'how-it-works': { type: 'features', tone: 'accent', image: 'shot-spark.png' },
      timeline: { type: 'timeline', tone: 'accent' },
    },
  },
  bolt: {
    breadcrumb: ['Programs', 'Bolt'],
    hero: 'hero-bolt.jpg',
    apply: true,
    missionAlign: 'center',
    events: true,
    sections: {
      criteria: { type: 'criteria', tone: 'accent', image: 'shot-bolt.png' },
      provide: { type: 'features', tone: 'white' },
    },
  },
  nexus: {
    breadcrumb: ['Programs', 'Nexus'],
    hero: 'hero-nexus.jpg',
    apply: false,
    missionAlign: 'left',
    events: true,
    sections: {
      'our-events': { type: 'features', tone: 'accent' },
      'fc-cta': { type: 'cta', tone: 'accent', to: '/programs/founder-circle' },
    },
  },
  'founder-circle': {
    breadcrumb: ['Programs', 'Nexus', 'Founder Circle'],
    hero: 'hero-nexus.jpg', // the comp reuses the Nexus hero
    apply: false,
    missionAlign: 'left',
    events: true,
    /* The comp's mission and section headings are literal "..." -- this page
     * has not been written in Figma yet. */
    provisional: true,
    sections: {},
  },
};

const blank = (v) => v == null || v === '';

/* Each renderer wants a different shape; adapt the common JSON item list. */
const ADAPT = {
  features: (s, spec) => ({
    heading: s.heading,
    image: spec.image,
    items: s.items.map((i) => ({ name: i.label, body: blank(i.text) ? null : i.text })),
  }),
  criteria: (s, spec) => ({
    heading: s.heading,
    image: spec.image,
    items: s.items.map((i) => i.label),
  }),
  timeline: (s) => ({
    heading: s.heading,
    lede: blank(s.lede) ? null : s.lede,
    steps: s.items.map((i) => ({ name: i.label, body: blank(i.text) ? null : i.text })),
  }),
  split: (s, spec) => ({
    heading: s.heading,
    lede: blank(s.lede) ? null : s.lede,
    columns: s.items.map((i) => ({
      slug: i.key,
      name: i.label,
      image: spec.images?.[i.key],
      cta: i.text,
    })),
  }),
  quotes: (s, spec) => ({
    heading: s.heading,
    items: s.items.map((i) => ({
      quote: i.text,
      name: i.label,
      role: i.sublabel ?? '',
      avatar: spec.avatar,
    })),
  }),
  cta: (s, spec) => ({ heading: s.heading, sub: s.lede, to: spec.to }),
};

function buildPage(slug) {
  const copy = COPY[slug];
  const spec = SPEC[slug];

  /* SPEC key order defines section order -- the CMS cannot reorder or rename
   * sections, only edit the copy inside each one. */
  const sections = Object.entries(spec.sections)
    .map(([id, sspec]) => {
      const s = copy.sections?.[id];
      if (!s) {
        console.warn(`[programContent] content/pages/${slug}.json has no "${id}" section`);
        return null;
      }
      return {
        type: sspec.type,
        tone: sspec.tone,
        ...ADAPT[sspec.type]({ items: [], lede: '', ...s }, sspec),
      };
    })
    .filter(Boolean)
    .concat(spec.extras ?? []);

  return {
    breadcrumb: spec.breadcrumb,
    title: copy.title,
    lede: copy.lede,
    hero: spec.hero,
    apply: spec.apply,
    mission: {
      align: spec.missionAlign,
      heading: blank(copy.mission.heading) ? null : copy.mission.heading,
      /* a blank line in the CMS textarea becomes a new paragraph */
      paragraphs: blank(copy.mission.body) ? [] : copy.mission.body.split(/\n{2,}/),
    },
    sections,
    events: spec.events,
    ...(spec.provisional ? { provisional: true } : {}),
  };
}

export const PROGRAM_CONTENT = Object.fromEntries(
  Object.keys(SPEC).map((slug) => [slug, buildPage(slug)]),
);
