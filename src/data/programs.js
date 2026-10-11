/* Public-facing program model.
 *
 * Editable copy (name, blurb) lives in content/programs.json so it can be
 * changed through Pages CMS. Everything structural -- brand colours, the
 * umbrella relationships -- stays here, because it is not copy and editors
 * should not be able to break it.
 *
 * Spark and Bolt are sibling programs *inside* the HSC umbrella, not peers of
 * it. The landing grid reflects that: HSC renders as a single card whose body
 * splits into a Spark half and a Bolt half.
 *
 * The internal names ("Founder Development" for Spark, "Venture Development"
 * for Bolt) are deliberately absent -- they are not used publicly.
 */
import copy from '../../content/programs.json';

const BY_SLUG_COPY = Object.fromEntries(copy.map((p) => [p.slug, p]));

/* Structure, per slug. Not editable through the CMS. */
const STRUCTURE = {
  hsc: {
    /* The umbrella has no primary of its own; its comp uses black bands. */
    accent: 'var(--c-black)',
    onAccent: 'var(--c-white)',
    childSlugs: ['spark', 'bolt'],
  },
  spark: { accent: 'var(--c-program-spark)', onAccent: 'var(--c-on-spark)', parent: 'hsc' },
  bolt: { accent: 'var(--c-program-bolt)', onAccent: 'var(--c-on-bolt)', parent: 'hsc' },
  nexus: { accent: 'var(--c-program-nexus)', onAccent: 'var(--c-on-nexus)' },
  /* Founder Circle sits under Nexus (its comp breadcrumb reads
   * "Programs / Nexus / Founder Circle", and the comp paints its bands in
   * Nexus blue). Using Nexus's primary outright would make the two cards
   * identical on the landing grid, so it takes Nexus's OWN secondary, Mas Blue
   * -- same family, still distinguishable. */
  'founder-circle': {
    accent: 'var(--c-program-founder-circle)',
    onAccent: 'var(--c-on-founder-circle)',
    parent: 'nexus',
  },
};

const build = (slug) => {
  const c = BY_SLUG_COPY[slug];
  if (!c) throw new Error(`content/programs.json is missing the "${slug}" entry`);
  const { childSlugs, ...structure } = STRUCTURE[slug] ?? {};
  return { slug, name: c.name, blurb: c.blurb, ...structure };
};

export const SPARK = build('spark');
export const BOLT = build('bolt');
export const NEXUS = build('nexus');
export const FOUNDER_CIRCLE = build('founder-circle');
export const HSC = { ...build('hsc'), children: [SPARK, BOLT] };

/* Order matches the nav dropdown in Desktop - 2 */
export const NAV_PROGRAMS = [HSC, SPARK, BOLT, NEXUS, FOUNDER_CIRCLE];

export const BY_SLUG = Object.fromEntries(NAV_PROGRAMS.map((p) => [p.slug, p]));
