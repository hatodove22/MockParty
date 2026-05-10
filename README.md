# MockContest

MockContest is a static React prototype for UX mock contests powered by AI-assisted creators. Clients can browse contests, review mock entries, compare feedback, and see clear responsibility boundaries before moving into real development.

## Local development

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Deploy

GitHub Pages is deployed by GitHub Actions. In repository settings, set Pages source to **GitHub Actions**.

The Vite base path is set to `/MockParty/`. If the repository name changes, update `vite.config.js` and `package.json`.

The app includes `noindex` metadata and a `robots.txt` disallow rule to discourage search indexing while the prototype is being reviewed. This is not access control.

### GitHub Pages quick start

```bash
git init
git add .
git commit -m "Initial MockContest app"
git branch -M main
git remote add origin https://github.com/hatodove22/MockParty.git
git push -u origin main
```

After the first push, open the repository settings and set **Pages > Source** to **GitHub Actions**.

### Vercel quick start

```bash
npm install
npx vercel deploy
```

For Vercel, the app can also be deployed by importing this repository in the Vercel dashboard. If the production URL is not under `/mockcontest/`, change `base` in `vite.config.js` to `/`.

## Important boundary

This project is a prototype for UX mock contests. It does not provide production development, maintenance, commercial release guarantee, or production security guarantee.
