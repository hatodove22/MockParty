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

Vercel builds with base path `/`.

The app includes `noindex` metadata and a `robots.txt` disallow rule to discourage search indexing while the prototype is being reviewed. This is not access control.

### Vercel quick start

```bash
npm install
npx vercel deploy
```

For limited review, use Vercel Deployment Protection and share the protected deployment URL instead of a public production alias.

## Important boundary

This project is a prototype for UX mock contests. It does not provide production development, maintenance, commercial release guarantee, or production security guarantee.
