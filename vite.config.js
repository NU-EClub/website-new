import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/* GitHub Pages serves static files only, so a deep link like /programs/bolt has
 * no file behind it.
 *
 * 404.html is the catch-all: Pages serves it for any unknown path and the SPA
 * router takes over. That renders correctly, but the response still carries a
 * 404 STATUS -- which keeps the program pages out of search indexes and makes
 * some link unfurlers skip them.
 *
 * So the known routes also get a real index.html at their own path, which Pages
 * serves as a 200. 404.html stays as the backstop for anything unlisted. */
function staticRoutes() {
  return {
    name: 'static-routes',
    closeBundle() {
      const out = resolve(__dirname, 'dist')
      const index = resolve(out, 'index.html')

      copyFileSync(index, resolve(out, '404.html'))

      const programs = JSON.parse(
        readFileSync(resolve(__dirname, 'content/programs.json'), 'utf8'),
      )
      const routes = programs.map((p) => `programs/${p.slug}`)

      for (const route of routes) {
        const dir = resolve(out, route)
        mkdirSync(dir, { recursive: true })
        copyFileSync(index, resolve(dir, 'index.html'))
      }
      console.log(`  pre-rendered ${routes.length} routes + 404.html fallback`)
    },
  }
}

// Deployed at https://nu-eclub.github.io/website-new/
export default defineConfig({
  base: '/website-new/',
  plugins: [react(), staticRoutes()],
  preview: {
    /* `tailscale serve` fronts the preview server with TLS and forwards the
     * tailnet Host header, which Vite otherwise rejects with a 403. Local
     * preview only -- has no effect on the built site. */
    allowedHosts: ['.ts.net'],
  },
})
