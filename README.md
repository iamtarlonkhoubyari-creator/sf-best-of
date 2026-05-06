# the best of SF — Tarlon's version

a living, breathing map of my favorite places in San Francisco.
six categories, one squiggle, no API keys.

## stack

- Next.js 16 + Tailwind 4 + TypeScript
- Leaflet + OpenStreetMap (CARTO Voyager tiles) — no Mapbox/Google token
- one TS file as the source of truth: `src/data/places.ts`
- Vercel for deploy

## run it locally

```bash
npm install
npm run dev
```

→ open http://localhost:3000

## adding a new list

```bash
npm run add -- <category> "name 1, name 2, name 3"
```

example:

```bash
npm run add -- bars "bar crenn, ama, horsefeather"
npm run add -- cry "ocean beach, golden gate park"
```

categories: `bars`, `crash`, `cappuccinos`, `cry`, `dinner`, `breakup`

the script geocodes each name via OpenStreetMap Nominatim (no API key, no
billing, ~1 req/sec). misses are inserted at SF center with `needsReview: true`
so you can fix the lat/lng by hand later. then commit and push — Vercel
auto-deploys.

## adding a new *category*

edit `src/data/places.ts`:

1. add an id to the `CategoryId` union
2. add an entry in the `CATEGORIES` array (label, emoji, color, blurb)
3. (optional) add it to `VALID_CATEGORIES` in `scripts/add.mjs` so the CLI accepts it

## deploy

```bash
npx vercel --prod
```

or push to GitHub and import the repo at vercel.com/new.

## socials

links live in `src/app/page.tsx` — search for `X_HANDLE` and `LINKEDIN_HANDLE`.
