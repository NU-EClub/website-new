# website-new

Northeastern E-Club website. React + Vite, deployed to GitHub Pages.

**Live:** https://nu-eclub.github.io/website-new/

## Develop

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. No manual step needed.

If the repo is ever renamed, update `base` in `vite.config.js` to match.
