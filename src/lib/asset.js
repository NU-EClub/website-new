/* Resolve a file in public/assets against Vite's base path.
 * The site is served from a project subpath (/website-new/), so asset URLs
 * must not be root-relative. */
export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
