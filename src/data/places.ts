export type CategoryId =
  | "bars"
  | "crash"
  | "cappuccinos"
  | "cry"
  | "dinner"
  | "breakup"
  | "sun";

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
  {
    id: "sun",
    label: "Sun spots",
    longLabel: "Sun spots",
    emoji: "☀️",
    color: "#E8A33C",
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
  addedAt?: string; // ISO date "YYYY-MM-DD" — surfaced as "new since last visit"
};

// Coordinates are best-effort from public knowledge.
// Run `npm run geocode` (with a Mapbox token) to refine to exact lat/lng.
export const PLACES: Place[] = [
  // ───────── BARS ─────────
  { id: "bar-crenn",     name: "Bar Crenn",        category: "bars", lat: 37.7984, lng: -122.4368, note: "3131 Fillmore" },
  { id: "bar-sprez",     name: "Bar Sprez",        category: "bars", lat: 37.7957, lng: -122.3993, note: "One Maritime Plaza" },
  { id: "bar-bibi",      name: "Bar Bibi",         category: "bars", lat: 37.7882, lng: -122.4054, note: "27 Maiden Lane" },
  { id: "verjus",        name: "Verjus",           category: "bars", lat: 37.7960, lng: -122.4033, note: "528 Washington — wine bar" },
  { id: "anina",         name: "Anina",            category: "bars", lat: 37.7766, lng: -122.4258, note: "Hayes Valley cocktails" },
  { id: "geelou",        name: "Geelou",           category: "bars", lat: 37.7998, lng: -122.4415, note: "3251 Scott St" },
  { id: "waystone",      name: "Waystone",         category: "bars", lat: 37.7521, lng: -122.4327, note: "Noe Valley" },
  { id: "key-klub",      name: "Key Klub",         category: "bars", lat: 37.7901, lng: -122.4114, note: "850 Bush St" },
  { id: "bar-darling",   name: "Bar Darling",      category: "bars", lat: 37.7733, lng: -122.4376, note: "Divisadero" },
  { id: "horsefeather",  name: "Horsefeather",     category: "bars", lat: 37.7740, lng: -122.4374, note: "528 Divisadero" },
  { id: "the-interval",  name: "The Interval",     category: "bars", lat: 37.8062, lng: -122.4310, note: "Long Now @ Fort Mason" },
  { id: "union-larder",  name: "Union Larder",     category: "bars", lat: 37.7988, lng: -122.4192, note: "1945 Hyde St" },
  { id: "celeste",       name: "Celeste",          category: "bars", lat: 37.7976, lng: -122.4314, note: "Union St", needsReview: true },
  { id: "harper-rye",    name: "Harper + Rye",     category: "bars", lat: 37.7922, lng: -122.4213, note: "1695 Polk St" },
  { id: "side-a",        name: "Side A",           category: "bars", lat: 37.7607, lng: -122.4117, note: "2814 19th St" },
  { id: "buddy",         name: "Buddy",            category: "bars", lat: 37.7693, lng: -122.4290, note: "Church / Duboce" },
  { id: "beehive",       name: "Beehive",          category: "bars", lat: 37.7591, lng: -122.4214, note: "842 Valencia" },
  { id: "amelies",       name: "Amélie's",         category: "bars", lat: 37.7916, lng: -122.4216, note: "Polk St wine bar" },
  { id: "true-laurel",   name: "True Laurel",      category: "bars", lat: 37.7595, lng: -122.4112, note: "753 Alabama" },
  { id: "trick-dog",     name: "Trick Dog",        category: "bars", lat: 37.7592, lng: -122.4108, note: "3010 20th St" },
  { id: "abv",           name: "ABV",              category: "bars", lat: 37.7651, lng: -122.4218, note: "3174 16th St" },
  { id: "fools-errand",  name: "Fool's Errand",    category: "bars", lat: 37.7704, lng: -122.4513, note: "1640 Haight" },
  { id: "leftdoor",      name: "Leftdoor",         category: "bars", lat: 37.7976, lng: -122.4314, note: "1905 Union" },

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
  { id: "juniper",         name: "Juniper",           category: "cappuccinos", lat: 37.7897, lng: -122.4207, note: "1401 Polk St" },
  { id: "andytown",        name: "Andytown",          category: "cappuccinos", lat: 37.7551, lng: -122.4977, note: "get the whipped cream" },
  { id: "hedge",           name: "Hedge",             category: "cappuccinos", lat: 37.7614, lng: -122.4161, note: "434 Shotwell St" },
  { id: "grand-coffee",    name: "Grand Coffee",      category: "cappuccinos", lat: 37.7619, lng: -122.4193, note: "2200 Mission" },
  { id: "third-wheel",     name: "Third Wheel Coffee",category: "cappuccinos", lat: 37.7732, lng: -122.4355, note: "991 Oak St" },
  { id: "wooden-coffee",   name: "Wooden Coffee House",category:"cappuccinos", lat: 37.7660, lng: -122.4498, note: "862 Cole St" },

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
  { id: "chase-to-fortmason", name: "Chase Center → Fort Mason walk", category: "breakup", lat: 37.7679, lng: -122.3874, note: "starts at Chase Center" },
  { id: "fort-mason-breakup", name: "Fort Mason",      category: "breakup", lat: 37.8068, lng: -122.4313 },
  { id: "the-battery",     name: "The Battery",      category: "breakup", lat: 37.7975, lng: -122.4007, note: "717 Battery St" },
  { id: "pacific-st-walk", name: "Pacific St walk",  category: "breakup", lat: 37.7940, lng: -122.4180, note: "Jackson Sq → Lafayette Park" },
  { id: "palace-hotel-lobby", name: "Palace Hotel lobby", category: "breakup", lat: 37.7882, lng: -122.4015 },
  { id: "salesforce-park-breakup", name: "Salesforce Park", category: "breakup", lat: 37.7898, lng: -122.3942, note: "loop for hours" },
  { id: "palace-of-fine-arts", name: "Palace of Fine Arts", category: "breakup", lat: 37.8029, lng: -122.4485 },
  // ───────── SOAK UP THE SUN ─────────
  { id: "baker-beach",       name: "Baker Beach",          category: "sun", lat: 37.7931, lng: -122.4838 },
  { id: "marina-green",      name: "Marina Green",         category: "sun", lat: 37.8066, lng: -122.4391 },
  { id: "ocean-beach-sun",   name: "Ocean Beach",          category: "sun", lat: 37.7562, lng: -122.5102 },
  { id: "golden-gate-park-sun", name: "Golden Gate Park",  category: "sun", lat: 37.7694, lng: -122.4822 },
  { id: "pan-handle-sun",    name: "The Panhandle",        category: "sun", lat: 37.7717, lng: -122.4513, note: "GG Park's eastern strip" },
  { id: "crissy-field-sun",  name: "Crissy Field",         category: "sun", lat: 37.8033, lng: -122.4658 },
  { id: "dolores-park-sun",  name: "Dolores Park",         category: "sun", lat: 37.7597, lng: -122.4271 },
  { id: "fort-funston",      name: "Fort Funston",         category: "sun", lat: 37.7191, lng: -122.5033 },
  { id: "marshalls-beach",   name: "Marshall's Beach",     category: "sun", lat: 37.8019, lng: -122.4793, note: "below the Presidio cliffs" },
  { id: "palace-of-fine-arts-sun", name: "Palace of Fine Arts", category: "sun", lat: 37.8029, lng: -122.4485, addedAt: "2026-05-18" },
  { id: "sutro-baths",       name: "Sutro Baths",          category: "sun", lat: 37.7803, lng: -122.5136, addedAt: "2026-05-18" },
  { id: "hellman-hollow",    name: "Hellman Hollow",       category: "sun", lat: 37.7692, lng: -122.4857, note: "Golden Gate Park", addedAt: "2026-05-18" },
  { id: "alamo-square-park", name: "Alamo Square Park",    category: "sun", lat: 37.7764, lng: -122.4347, addedAt: "2026-05-18" },
  { id: "lafayette-park-sun",name: "Lafayette Park",       category: "sun", lat: 37.7915, lng: -122.4279, addedAt: "2026-05-18" },
  { id: "fort-mason-sun",    name: "Fort Mason",           category: "sun", lat: 37.8063, lng: -122.4290, addedAt: "2026-05-18" },
  { id: "francisco-park",    name: "Francisco Park",       category: "sun", lat: 37.8039, lng: -122.4209, addedAt: "2026-05-18" },
  { id: "andytown-jackson-square", name: "Andytown", category: "cappuccinos", lat: 37.7971, lng: -122.4027, note: "437 Pacific Ave — Jackson Square", addedAt: "2026-05-19" },
  { id: "comptons-coffee",   name: "Compton's Coffee",      category: "cappuccinos", lat: 37.7874, lng: -122.4334, note: "1910 Fillmore", addedAt: "2026-05-19" },
  { id: "native-twins",      name: "Native Twins",          category: "cappuccinos", lat: 37.7910, lng: -122.4290, note: "near Lafayette Park", needsReview: true, addedAt: "2026-05-19" },
  { id: "motoring-coffee",   name: "Motoring Coffee",       category: "cappuccinos", lat: 37.7943, lng: -122.4183, needsReview: true, addedAt: "2026-05-19" },
  { id: "verve-mission",     name: "Verve Coffee",          category: "cappuccinos", lat: 37.7671, lng: -122.4291, note: "Mission", addedAt: "2026-05-19" },
  { id: "the-social-study",  name: "The Social Study",      category: "cappuccinos", lat: 37.7842, lng: -122.4325, addedAt: "2026-05-19" },
  { id: "jane-on-fillmore",  name: "Jane on Fillmore",      category: "cappuccinos", lat: 37.7894, lng: -122.4341, addedAt: "2026-05-19" },
  { id: "coit-tower-cry",    name: "Coit Tower",                  category: "cry",   lat: 37.8024, lng: -122.4058, addedAt: "2026-05-19" },
  { id: "fort-mason-cry",    name: "Fort Mason",                  category: "cry",   lat: 37.8063, lng: -122.4290, addedAt: "2026-05-19" },
  { id: "presidio-cry",      name: "Presidio",                    category: "cry",   lat: 37.7987, lng: -122.4646, addedAt: "2026-05-19" },
  { id: "coit-tower-crash",  name: "Coit Tower",                  category: "crash", lat: 37.8024, lng: -122.4058, addedAt: "2026-05-19" },
  { id: "presidio-crash",    name: "Presidio",                    category: "crash", lat: 37.7987, lng: -122.4646, addedAt: "2026-05-19" },
  { id: "gg-bridge-vista",   name: "Golden Gate Bridge Vista Point", category: "crash", lat: 37.8074, lng: -122.4750, note: "SF-side overlook", addedAt: "2026-05-19" },
  { id: "cotogna",        name: "Cotogna",        category: "dinner", lat: 37.7974, lng: -122.4035, note: "490 Pacific Ave", addedAt: "2026-05-21" },
  { id: "barrel-room",    name: "Barrel Room",    category: "dinner", lat: 37.7942, lng: -122.4015, addedAt: "2026-05-21" },
  { id: "tap-room",       name: "Tap Room",       category: "dinner", lat: 37.7889, lng: -122.4087, addedAt: "2026-05-21" },
  { id: "prelude",        name: "Prelude",        category: "dinner", lat: 37.7849, lng: -122.4194, needsReview: true, addedAt: "2026-05-21" },
  { id: "the-post-room",  name: "The Post Room",  category: "dinner", lat: 37.7849, lng: -122.4194, needsReview: true, addedAt: "2026-05-21" },
  { id: "camino-alto",    name: "Camino Alto",    category: "dinner", lat: 37.7849, lng: -122.4194, needsReview: true, addedAt: "2026-05-21" },
  { id: "angler",         name: "Angler",         category: "dinner", lat: 37.7931, lng: -122.3922, note: "132 The Embarcadero", addedAt: "2026-05-21" },
  { id: "piccino-2",      name: "Piccino (2nd location)", category: "dinner", lat: 37.7577, lng: -122.3900, needsReview: true, addedAt: "2026-05-21" },
  { id: "coffee-movement", name: "The Coffee Movement", category: "cappuccinos", lat: 37.7948, lng: -122.4103, addedAt: "2026-05-21" },
  // <ADD_PLACES_HERE>  ← do not remove. `npm run add` inserts new entries above this line.
];

export const SF_CENTER: [number, number] = [37.7849, -122.4194];
