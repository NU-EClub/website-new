import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

/* GitHub Pages serves static files only -- a deep link like /programs/bolt has
 * no file behind it and 404s. Pages falls back to 404.html, so shipping a copy
 * of index.html under that name lets the SPA router take over. */
function spaFallback() {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const out = resolve(__dirname, 'dist')
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'))
    },
  }
}

// Deployed at https://nu-eclub.github.io/website-new/
export default defineConfig({
  base: '/website-new/',
  plugins: [react(), spaFallback()],
  preview: {
    /* `tailscale serve` fronts the preview server with TLS and forwards the
     * tailnet Host header, which Vite otherwise rejects with a 403. Local
     * preview only -- has no effect on the built site. */
    allowedHosts: ['.ts.net'],
  },
})
