export type CategoryId =
  | "bars"
  | "crash"
  | "cappuccinos"
  | "cry"
  | "dinner"
  | "breakup";

export type Category = {
  id: CategoryId;
  label: string;       // short — used in chips
  longLabel: string;   // shown in popups/detail
  emoji: string;
  color: string;       // pin color
};

export const CATEGORIES: Category[] = [
  {
    id: "bars",
    label: "Bars",
    longLabel: "Cocktail & wine bars",
    emoji: "🍸",
    color: "#E94B6A",
  },
  {
    id: "crash",
    label: "Crash out",
    longLabel: "Places to crash out",
    emoji: "😩",
    color: "#9B7EDC",
  },
  {
    id: "cappuccinos",
    label: "Cappuccinos",
    longLabel: "Best cappuccinos",
    emoji: "☕",
    color: "#B5713A",
  },
  {
    id: "cry",
    label: "Cry",
    longLabel: "Places to cry",
    emoji: "😢",
    color: "#4A90E2",
  },
  {
    id: "dinner",
    label: "Private dining",
    longLabel: "Private dining",
    emoji: "🍽️",
    color: "#5FA86F",
  },
  {
    id: "breakup",
    label: "Cofounder breakups",
    longLabel: "Where to break up with your cofounder",
    emoji: "💔",
    color: "#D26B8E",
  },
];

export type Place = {
  id: string;
  name: string;
  category: CategoryId;
  lat: number;
  lng: number;
  note?: string;
  needsReview?: boolean; // approximate coords; refine via CLI
};

// Coordinates are best-effort from public knowledge.
// Run `npm run geocode` (with a Mapbox token) to refine to exact lat/lng.
export const PLACES: Place[] = [
  // ───────── BARS ─────────
  { id: "bar-crenn",     name: "Bar Crenn",        category: "bars", lat: 37.7984, lng: -122.4368, note: "3131 Fillmore" },
  { id: "bar-sprez",     name: "Bar Sprez",        category: "bars", lat: 37.7770, lng: -122.4258, note: "Hayes Valley", needsReview: true },
  { id: "bar-bibi",      name: "Bar Bibi",         category: "bars", lat: 37.7882, lng: -122.4054, note: "27 Maiden Lane" },
  { id: "verjus",        name: "Verjus",           category: "bars", lat: 37.7960, lng: -122.4033, note: "528 Washington — wine bar" },
  { id: "anina",         name: "Anina",            category: "bars", lat: 37.7766, lng: -122.4258, note: "Hayes Valley cocktails" },
  { id: "geelou",        name: "Geelou",           category: "bars", lat: 37.7826, lng: -122.4192, needsReview: true },
  { id: "waystone",      name: "Waystone",         category: "bars", lat: 37.7521, lng: -122.4327, note: "Noe Valley" },
  { id: "key-klub",      name: "Key Klub",         category: "bars", lat: 37.7918, lng: -122.4216, note: "Polk St" },
  { id: "bar-darling",   name: "Bar Darling",      category: "bars", lat: 37.7733, lng: -122.4376, note: "Divisadero" },
  { id: "horsefeather",  name: "Horsefeather",     category: "bars", lat: 37.7740, lng: -122.4374, note: "528 Divisadero" },
  { id: "the-interval",  name: "The Interval",     category: "bars", lat: 37.8062, lng: -122.4310, note: "Long Now @ Fort Mason" },
  { id: "final-final",   name: "Final Final",      category: "bars", lat: 37.7980, lng: -122.4471, note: "2990 Baker St" },
  { id: "union-larder",  name: "Union Larder",     category: "bars", lat: 37.7984, lng: -122.4187, note: "1945 Hyde", needsReview: true },
  { id: "celeste",       name: "Celeste",          category: "bars", lat: 37.7991, lng: -122.4080, note: "522 Columbus" },
  { id: "harper-rye",    name: "Harper + Rye",     category: "bars", lat: 37.7920, lng: -122.4216, note: "Polk St", needsReview: true },
  { id: "side-a",        name: "Side A",           category: "bars", lat: 37.7607, lng: -122.4117, note: "2814 19th St" },
  { id: "buddy",         name: "Buddy",            category: "bars", lat: 37.7693, lng: -122.4290, note: "Church / Duboce" },
  { id: "beehive",       name: "Beehive",          category: "bars", lat: 37.7591, lng: -122.4214, note: "842 Valencia" },
  { id: "amelies",       name: "Amélie's",         category: "bars", lat: 37.7916, lng: -122.4216, note: "Polk St wine bar" },
  { id: "true-laurel",   name: "True Laurel",      category: "bars", lat: 37.7595, lng: -122.4112, note: "753 Alabama" },
  { id: "trick-dog",     name: "Trick Dog",        category: "bars", lat: 37.7592, lng: -122.4108, note: "3010 20th St" },
  { id: "abv",           name: "ABV",              category: "bars", lat: 37.7651, lng: -122.4218, note: "3174 16th St" },

  // ───────── CRASH OUT ─────────
  { id: "wework-embarcadero", name: "WeWork Embarcadero",  category: "crash", lat: 37.7950, lng: -122.3996 },
  { id: "the-landing",        name: "The Landing",         category: "crash", lat: 37.7945, lng: -122.4011, needsReview: true },
  { id: "fitness-sf-transbay",name: "Fitness SF Transbay", category: "crash", lat: 37.7916, lng: -122.3947, note: "1 Beale St" },
  { id: "fort-mason-crash",   name: "Fort Mason",          category: "crash", lat: 37.8068, lng: -122.4313 },
  { id: "blondies",           name: "Blondie's",           category: "crash", lat: 37.7644, lng: -122.4216, note: "540 Valencia" },
  { id: "dolores-park",       name: "Dolores Park",        category: "crash", lat: 37.7596, lng: -122.4269 },
  { id: "shanghai-kellys",    name: "Shanghai Kelly's",    category: "crash", lat: 37.7972, lng: -122.4216, note: "Polk St" },
  { id: "salesforce-park-crash", name: "Salesforce Park",  category: "crash", lat: 37.7898, lng: -122.3942 },
  { id: "equinox-union",      name: "Equinox on Union",    category: "crash", lat: 37.7976, lng: -122.4314, note: "1980 Union" },

  // ───────── CAPPUCCINOS ─────────
  { id: "st-frank",        name: "St. Frank",         category: "cappuccinos", lat: 37.7956, lng: -122.4365, note: "Fillmore" },
  { id: "the-mill",        name: "The Mill",          category: "cappuccinos", lat: 37.7762, lng: -122.4375, note: "736 Divisadero" },
  { id: "juniper",         name: "Juniper",           category: "cappuccinos", lat: 37.7826, lng: -122.4192, needsReview: true },
  { id: "andytown",        name: "Andytown",          category: "cappuccinos", lat: 37.7551, lng: -122.4977, note: "get the whipped cream" },
  { id: "hedge",           name: "Hedge",             category: "cappuccinos", lat: 37.7826, lng: -122.4192, needsReview: true },
  { id: "grand-coffee",    name: "Grand Coffee",      category: "cappuccinos", lat: 37.7619, lng: -122.4193, note: "2200 Mission" },
  { id: "third-wheel",     name: "Third Wheel Coffee",category: "cappuccinos", lat: 37.7826, lng: -122.4192, needsReview: true },
  { id: "wooden-coffee",   name: "Wooden Coffee House",category:"cappuccinos", lat: 37.7826, lng: -122.4192, needsReview: true },

  // ───────── CRY ─────────
  { id: "golden-gate-park", name: "Golden Gate Park", category: "cry", lat: 37.7694, lng: -122.4862 },
  { id: "crissy-fields",    name: "Crissy Field",     category: "cry", lat: 37.8033, lng: -122.4658 },
  { id: "rodeo-beach",      name: "Rodeo Beach",      category: "cry", lat: 37.8323, lng: -122.5365, note: "technically Marin but worth it" },
  { id: "buena-vista-park", name: "Buena Vista Park", category: "cry", lat: 37.7691, lng: -122.4399 },
  { id: "japantown",        name: "Japantown",        category: "cry", lat: 37.7855, lng: -122.4297 },
  { id: "ocean-beach",      name: "Ocean Beach",      category: "cry", lat: 37.7591, lng: -122.5108 },
  { id: "ferry-bldg-bench", name: "Ferry Building benches", category: "cry", lat: 37.7955, lng: -122.3937 },
  { id: "the-ferry",        name: "The Ferry",        category: "cry", lat: 37.7958, lng: -122.3933, note: "ride it" },
  { id: "lafayette-park-cry", name: "Lafayette Park",   category: "cry", lat: 37.7916, lng: -122.4274, note: "facing Washington St" },

  // ───────── DINNER ─────────
  { id: "arcana",         name: "Arcana",           category: "dinner", lat: 37.7864, lng: -122.4497 },
  { id: "lazy-bear",      name: "Lazy Bear",        category: "dinner", lat: 37.7607, lng: -122.4226 },
  { id: "the-progress",   name: "The Progress",     category: "dinner", lat: 37.7831, lng: -122.4327 },
  { id: "foreign-cinema", name: "Foreign Cinema",   category: "dinner", lat: 37.7559, lng: -122.4191 },
  { id: "la-mar",         name: "La Mar",           category: "dinner", lat: 37.7977, lng: -122.3954, note: "Pier 1.5" },
  { id: "penny-roma",     name: "Penny Roma",       category: "dinner", lat: 37.7626, lng: -122.4044 },
  { id: "flour-water",    name: "Flour + Water",    category: "dinner", lat: 37.7593, lng: -122.4119, note: "Mission" },
  { id: "piccino",        name: "Piccino",          category: "dinner", lat: 37.7569, lng: -122.3924, note: "Dogpatch" },
  { id: "dalida",         name: "Dalida",           category: "dinner", lat: 37.7995, lng: -122.4576, note: "Presidio" },
  { id: "park-tavern",    name: "Park Tavern",      category: "dinner", lat: 37.8005, lng: -122.4099 },
  { id: "saison",         name: "Saison",           category: "dinner", lat: 37.7848, lng: -122.3933, note: "178 Townsend — tasting menu" },

  // ───────── BREAKUP ─────────
  { id: "south-park",      name: "South Park",       category: "breakup", lat: 37.7811, lng: -122.3934 },
  { id: "chase-to-fortmason", name: "Chase Center → Fort Mason walk", category: "breakup", lat: 37.7874, lng: -122.4096, note: "the whole walk" },
  { id: "fort-mason-breakup", name: "Fort Mason",      category: "breakup", lat: 37.8068, lng: -122.4313 },
  { id: "the-battery",     name: "The Battery",      category: "breakup", lat: 37.7975, lng: -122.4007, note: "717 Battery St" },
  { id: "pacific-st-walk", name: "Pacific St walk",  category: "breakup", lat: 37.7940, lng: -122.4180, note: "Jackson Sq → Lafayette Park" },
  { id: "palace-hotel-lobby", name: "Palace Hotel lobby", category: "breakup", lat: 37.7882, lng: -122.4015 },
  { id: "salesforce-park-breakup", name: "Salesforce Park", category: "breakup", lat: 37.7898, lng: -122.3942, note: "loop for hours" },
  { id: "palace-of-fine-arts", name: "Palace of Fine Arts", category: "breakup", lat: 37.8029, lng: -122.4485 },
  // <ADD_PLACES_HERE>  ← do not remove. `npm run add` inserts new entries above this line.
];

export const SF_CENTER: [number, number] = [37.7849, -122.4194];
