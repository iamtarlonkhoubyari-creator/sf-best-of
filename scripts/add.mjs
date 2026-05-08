#!/usr/bin/env node
// Add places to src/data/places.ts in one shot:
//   npm run add -- bars "bar crenn, bar darling, horsefeather"
//
// Each name is geocoded via OpenStreetMap Nominatim (bias: San Francisco).
// Misses are written with a sentinel comment so you can fill in coords later.
// No API key required.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLACES_FILE = resolve(__dirname, "..", "src", "data", "places.ts");
const MARKER = "// <ADD_PLACES_HERE>";

const VALID_CATEGORIES = new Set([
  "bars",
  "crash",
  "cappuccinos",
  "cry",
  "dinner",
  "breakup",
  "grass",
]);

// SF bounding box for Nominatim viewbox bias
//   left,top,right,bottom (lon/lat/lon/lat — yes, weird order)
const SF_VIEWBOX = "-122.55,37.83,-122.35,37.70";

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function geocode(name) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", `${name}, San Francisco, CA`);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("viewbox", SF_VIEWBOX);
  url.searchParams.set("bounded", "1");

  const res = await fetch(url, {
    headers: { "User-Agent": "sf-best-of/0.1 (personal map project)" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;
  const { lat, lon } = data[0];
  return { lat: Number(lat), lng: Number(lon) };
}

function fmtEntry({ id, name, category, lat, lng, note, needsReview }) {
  const parts = [
    `id: "${id}"`,
    `name: ${JSON.stringify(name)}`,
    `category: "${category}"`,
    `lat: ${lat}`,
    `lng: ${lng}`,
  ];
  if (note) parts.push(`note: ${JSON.stringify(note)}`);
  if (needsReview) parts.push(`needsReview: true`);
  return `  { ${parts.join(", ")} },`;
}

async function main() {
  const [, , category, namesArg, ...rest] = process.argv;
  if (!category || !namesArg) {
    console.error(
      'usage: npm run add -- <category> "name1, name2, name3"\n' +
        `       categories: ${[...VALID_CATEGORIES].join(", ")}`,
    );
    process.exit(1);
  }
  if (!VALID_CATEGORIES.has(category)) {
    console.error(
      `unknown category "${category}". valid: ${[...VALID_CATEGORIES].join(", ")}`,
    );
    process.exit(1);
  }
  const note = rest.length ? rest.join(" ") : undefined;

  const names = namesArg
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  console.log(`geocoding ${names.length} place(s) in "${category}"…\n`);

  const file = await readFile(PLACES_FILE, "utf8");
  if (!file.includes(MARKER)) {
    console.error(`could not find marker "${MARKER}" in ${PLACES_FILE}`);
    process.exit(1);
  }

  // pull existing IDs to avoid duplicates
  const existingIds = new Set(
    [...file.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]),
  );

  const newEntries = [];
  for (const name of names) {
    let id = slug(name);
    let suffix = 2;
    while (existingIds.has(id)) id = `${slug(name)}-${suffix++}`;
    existingIds.add(id);

    let coords = null;
    try {
      coords = await geocode(name);
    } catch (err) {
      console.warn(`  ${name}: geocode error — ${err.message}`);
    }

    if (coords) {
      console.log(`  ✓ ${name}  →  ${coords.lat}, ${coords.lng}`);
      newEntries.push(
        fmtEntry({ id, name, category, ...coords, note }),
      );
    } else {
      console.log(`  ✗ ${name}  →  no result; using SF center (review later)`);
      newEntries.push(
        fmtEntry({
          id,
          name,
          category,
          lat: 37.7849,
          lng: -122.4194,
          note,
          needsReview: true,
        }),
      );
    }
    // Nominatim asks for ≤1 req/sec — be polite
    await new Promise((r) => setTimeout(r, 1100));
  }

  const updated = file.replace(
    MARKER,
    newEntries.join("\n") + "\n  " + MARKER,
  );
  await writeFile(PLACES_FILE, updated);
  console.log(`\nwrote ${newEntries.length} entries to ${PLACES_FILE}`);
  console.log("commit + push and Vercel will redeploy.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
