export type CategoryId =
  | "bars"
  | "crash"
  | "cappuccinos"
  | "cry"
  | "dinner"
  | "breakup"
  | "sun"
  | "solo";

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
  {
    id: "solo",
    label: "Solo date spots",
    longLabel: "Solo date spots",
    emoji: "🍜",
    color: "#2FA8A0",
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
  { id: "bar-sprez",     name: "Bar Sprezzatura",  category: "bars", lat: 37.7957, lng: -122.3993, note: "One Maritime Plaza (300 Clay St)" },
  { id: "bar-bibi",      name: "Bar Bibi",         category: "bars", lat: 37.7955, lng: -122.4189, note: "1448 Pacific Ave — Russian Hill", needsReview: true },
  { id: "verjus",        name: "Verjus",           category: "bars", lat: 37.7960, lng: -122.4033, note: "528 Washington — wine bar" },
  { id: "anina",         name: "Anina",            category: "bars", lat: 37.7766, lng: -122.4258, note: "Hayes Valley cocktails" },
  { id: "geelou",        name: "Geelou",           category: "bars", lat: 37.7998, lng: -122.4415, note: "3251 Scott St" },
  { id: "waystone",      name: "Waystone",         category: "bars", lat: 37.7996, lng: -122.4110, note: "1609 Powell St — North Beach", needsReview: true },
  { id: "key-klub",      name: "Key Klub",         category: "bars", lat: 37.7901, lng: -122.4114, note: "850 Bush St" },
  { id: "bar-darling",   name: "Bar Darling",      category: "bars", lat: 37.8004, lng: -122.4400, note: "2263 Chestnut St — Marina", needsReview: true },
  { id: "horsefeather",  name: "Horsefeather",     category: "bars", lat: 37.7740, lng: -122.4374, note: "528 Divisadero" },
  { id: "the-interval",  name: "The Interval",     category: "bars", lat: 37.8062, lng: -122.4310, note: "Long Now @ Fort Mason" },
  { id: "union-larder",  name: "Union Larder",     category: "bars", lat: 37.7988, lng: -122.4192, note: "1945 Hyde St" },
  { id: "celeste",       name: "Céleste",          category: "bars", lat: 37.7970, lng: -122.4349, note: "2165 Union St" },
  { id: "harper-rye",    name: "Harper & Rye",     category: "bars", lat: 37.7922, lng: -122.4213, note: "1695 Polk St" },
  { id: "side-a",        name: "Side A",           category: "bars", lat: 37.7607, lng: -122.4117, note: "2814 19th St" },
  { id: "buddy",         name: "Buddy",            category: "bars", lat: 37.7553, lng: -122.4172, note: "3115 22nd St — Mission", needsReview: true },
  { id: "beehive",       name: "Beehive",          category: "bars", lat: 37.7591, lng: -122.4214, note: "842 Valencia" },
  { id: "amelies",       name: "Amélie",           category: "bars", lat: 37.7932, lng: -122.4214, note: "1754 Polk St — wine bar" },
  { id: "true-laurel",   name: "True Laurel",      category: "bars", lat: 37.7595, lng: -122.4112, note: "753 Alabama" },
  { id: "trick-dog",     name: "Trick Dog",        category: "bars", lat: 37.7592, lng: -122.4108, note: "3010 20th St" },
  { id: "abv",           name: "ABV",              category: "bars", lat: 37.7651, lng: -122.4218, note: "3174 16th St" },
  { id: "fools-errand",  name: "Fool's Errand",    category: "bars", lat: 37.7749, lng: -122.4380, note: "639A Divisadero" },
  { id: "leftdoor",      name: "Left Door",        category: "bars", lat: 37.7976, lng: -122.4314, note: "1905 Union" },
  { id: "ruby-wine-bar",  name: "Ruby Wine",        category: "bars", lat: 37.7626, lng: -122.3976, note: "1419 18th St — Potrero Hill natural wine", addedAt: "2026-07-14" },
  { id: "twenty-spot-bar",name: "20 Spot",          category: "bars", lat: 37.7586, lng: -122.4203, note: "3565 20th St — Mission wine bar", addedAt: "2026-07-14" },
  { id: "starlite",       name: "Starlite",         category: "bars", lat: 37.7889, lng: -122.4086, note: "450 Powell — Beacon Grand rooftop, 21st floor", addedAt: "2026-07-14" },
  { id: "lobalita",       name: "Lobalita",         category: "bars", lat: 37.8005, lng: -122.4394, note: "2231 Chestnut St — Marina, by the Bar Darling team", addedAt: "2026-07-14" },
  { id: "el-chato",       name: "El Chato",         category: "bars", lat: 37.7576, lng: -122.4097, note: "2301 Bryant St — Spanish taberna", addedAt: "2026-07-14" },
  { id: "pearl-6101",     name: "Pearl 6101",       category: "bars", lat: 37.7842, lng: -122.4831, note: "6101 California St — bar seats for walk-ins", addedAt: "2026-07-14" },

  // ───────── CRASH OUT ─────────
  { id: "wework-embarcadero", name: "WeWork Embarcadero",  category: "crash", lat: 37.7950, lng: -122.3996 },
  { id: "the-landing",        name: "The Landing",         category: "crash", lat: 37.7798, lng: -122.5116, note: "680 Point Lobos Ave" },
  { id: "the-landing-22nd",   name: "The Landing",         category: "crash", lat: 37.7569, lng: -122.3947, note: "1395 22nd St — Dogpatch" },
  { id: "fitness-sf-transbay",name: "Fitness SF Transbay", category: "crash", lat: 37.7899, lng: -122.3966, note: "425 Mission St — Transit Center" },
  { id: "fort-mason-crash",   name: "Fort Mason",          category: "crash", lat: 37.8068, lng: -122.4313 },
  { id: "blondies",           name: "Blondie's",           category: "crash", lat: 37.7644, lng: -122.4216, note: "540 Valencia" },
  { id: "dolores-park",       name: "Dolores Park",        category: "crash", lat: 37.7596, lng: -122.4269 },
  { id: "shanghai-kellys",    name: "Shanghai Kelly's",    category: "crash", lat: 37.7972, lng: -122.4216, note: "Polk St" },
  { id: "salesforce-park-crash", name: "Salesforce Park",  category: "crash", lat: 37.7898, lng: -122.3942 },
  { id: "equinox-union",      name: "Equinox on Union",    category: "crash", lat: 37.7973, lng: -122.4326, note: "2055 Union St" },

  // ───────── CAPPUCCINOS ─────────
  { id: "st-frank",        name: "Saint Frank",       category: "cappuccinos", lat: 37.7975, lng: -122.4222, note: "2340 Polk St — Russian Hill" },
  { id: "juniper",         name: "Juniper",           category: "cappuccinos", lat: 37.7897, lng: -122.4207, note: "1401 Polk St" },
  { id: "andytown",        name: "Andytown",          category: "cappuccinos", lat: 37.7551, lng: -122.4977, note: "get the whipped cream" },
  { id: "hedge",           name: "Hedge",             category: "cappuccinos", lat: 37.7614, lng: -122.4161, note: "434 Shotwell St" },
  { id: "grand-coffee",    name: "Grand Coffee",      category: "cappuccinos", lat: 37.7539, lng: -122.4185, note: "2663 Mission St", needsReview: true },
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
  { id: "arcana",         name: "Arcana",           category: "dinner", lat: 37.7566, lng: -122.4187, note: "2512 Mission St" },
  { id: "lazy-bear",      name: "Lazy Bear",        category: "dinner", lat: 37.7607, lng: -122.4226 },
  { id: "the-progress",   name: "The Progress",     category: "dinner", lat: 37.7831, lng: -122.4327 },
  { id: "foreign-cinema", name: "Foreign Cinema",   category: "dinner", lat: 37.7559, lng: -122.4191 },
  { id: "la-mar",         name: "La Mar",           category: "dinner", lat: 37.7977, lng: -122.3954, note: "Pier 1.5" },
  { id: "penny-roma",     name: "Penny Roma",       category: "dinner", lat: 37.7626, lng: -122.4044 },
  { id: "flour-water",    name: "Flour + Water",    category: "dinner", lat: 37.7593, lng: -122.4119, note: "Mission" },
  { id: "piccino",        name: "Piccino",          category: "dinner", lat: 37.7577, lng: -122.3901, note: "1001 Minnesota St — Dogpatch" },
  { id: "dalida",         name: "Dalida",           category: "dinner", lat: 37.7995, lng: -122.4576, note: "101 Montgomery St — Presidio" },
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
  { id: "andytown-jackson-square", name: "Andytown", category: "cappuccinos", lat: 37.7986, lng: -122.3996, note: "747 Front St — downtown kiosk, weekdays", needsReview: true, addedAt: "2026-05-19" },
  { id: "comptons-coffee",   name: "Compton's Coffee",      category: "cappuccinos", lat: 37.7874, lng: -122.4334, note: "1910 Fillmore", addedAt: "2026-05-19" },
  { id: "native-twins",      name: "Native Twins",          category: "cappuccinos", lat: 37.7916, lng: -122.4274, note: "coffee trailer, top of Lafayette Park — Wed–Sun", addedAt: "2026-05-19" },
  { id: "motoring-coffee",   name: "Motoring Coffee",       category: "cappuccinos", lat: 37.7982, lng: -122.4246, note: "1525 Union St", addedAt: "2026-05-19" },
  { id: "verve-mission",     name: "Verve Coffee",          category: "cappuccinos", lat: 37.7671, lng: -122.4291, note: "2101 Market St", addedAt: "2026-05-19" },
  { id: "the-social-study",  name: "The Social Study",      category: "cappuccinos", lat: 37.7842, lng: -122.4325, note: "more wine bar these days — opens ~1pm", addedAt: "2026-05-19" },
  { id: "jane-on-fillmore",  name: "Jane on Fillmore",      category: "cappuccinos", lat: 37.7894, lng: -122.4341, addedAt: "2026-05-19" },
  { id: "coit-tower-cry",    name: "Coit Tower",                  category: "cry",   lat: 37.8024, lng: -122.4058, addedAt: "2026-05-19" },
  { id: "fort-mason-cry",    name: "Fort Mason",                  category: "cry",   lat: 37.8063, lng: -122.4290, addedAt: "2026-05-19" },
  { id: "presidio-cry",      name: "Presidio",                    category: "cry",   lat: 37.7987, lng: -122.4646, addedAt: "2026-05-19" },
  { id: "coit-tower-crash",  name: "Coit Tower",                  category: "crash", lat: 37.8024, lng: -122.4058, addedAt: "2026-05-19" },
  { id: "presidio-crash",    name: "Presidio",                    category: "crash", lat: 37.7987, lng: -122.4646, addedAt: "2026-05-19" },
  { id: "gg-bridge-vista",   name: "Golden Gate Bridge Vista Point", category: "crash", lat: 37.8074, lng: -122.4750, note: "SF-side overlook", addedAt: "2026-05-19" },
  { id: "cotogna",        name: "Cotogna",        category: "dinner", lat: 37.7974, lng: -122.4035, note: "490 Pacific Ave", addedAt: "2026-05-21" },
  { id: "barrel-room",    name: "The Barrel Room", category: "dinner", lat: 37.7942, lng: -122.4015, note: "415 Sansome St", addedAt: "2026-05-21" },
  { id: "tap-room",       name: "Golden Gate Tap Room", category: "dinner", lat: 37.7889, lng: -122.4087, note: "449 Powell St", addedAt: "2026-05-21" },
  { id: "prelude",        name: "Prelude",        category: "dinner", lat: 37.7947, lng: -122.4004, note: "333 Battery St", addedAt: "2026-05-21" },
  { id: "the-post-room",  name: "The Post Room",  category: "dinner", lat: 37.7890, lng: -122.4083, note: "450 Powell St", addedAt: "2026-05-21" },
  { id: "camino-alto",    name: "Camino Alto",    category: "dinner", lat: 37.7979, lng: -122.4276, note: "1715 Union St", addedAt: "2026-05-21" },
  { id: "angler",         name: "Angler",         category: "dinner", lat: 37.7931, lng: -122.3922, note: "132 The Embarcadero", addedAt: "2026-05-21" },
  { id: "coffee-movement", name: "The Coffee Movement", category: "cappuccinos", lat: 37.7948, lng: -122.4103, addedAt: "2026-05-21" },
  { id: "pier-14",        name: "Pier 14",        category: "sun",   lat: 37.7940, lng: -122.3906, addedAt: "2026-05-22" },
  { id: "pier-7",         name: "Pier 7",         category: "crash", lat: 37.7994, lng: -122.3955, addedAt: "2026-05-22" },
  // ───────── SOLO DATE SPOTS ─────────
  { id: "saru-handroll",  name: "Saru Handroll Bar", category: "solo", lat: 37.7972, lng: -122.4219, note: "2206 Polk St — counter seats, walk-in only", addedAt: "2026-07-14" },
  { id: "mensho-tokyo",   name: "Mensho Tokyo",      category: "solo", lat: 37.7866, lng: -122.4137, note: "676 Geary St — ramen counter", addedAt: "2026-07-14" },
  { id: "bar-crenn-solo", name: "Bar Crenn",         category: "solo", lat: 37.7984, lng: -122.4368, note: "3131 Fillmore", addedAt: "2026-07-14" },
  { id: "bodega-wine-bar",name: "Bodega",            category: "solo", lat: 37.8014, lng: -122.4128, note: "700 Columbus Ave — North Beach wine bar", addedAt: "2026-07-14" },
  { id: "cheese-plus",    name: "Cheese Plus",       category: "solo", lat: 37.7953, lng: -122.4218, note: "2001 Polk St — corner of Polk & Pacific", addedAt: "2026-07-14" },
  { id: "ruby-wine",      name: "Ruby Wine",         category: "solo", lat: 37.7626, lng: -122.3976, note: "1419 18th St — Potrero Hill natural wine", addedAt: "2026-07-14" },
  { id: "rt-rotisserie",  name: "RT Rotisserie",     category: "solo", lat: 37.7752, lng: -122.4212, note: "101 Oak St — Hayes Valley", addedAt: "2026-07-14" },
  { id: "house-of-prime-rib", name: "House of Prime Rib", category: "solo", lat: 37.7938, lng: -122.4234, note: "1906 Van Ness Ave", addedAt: "2026-07-14" },
  { id: "palmers",        name: "Palmer's Tavern",   category: "solo", lat: 37.7897, lng: -122.4344, note: "2298 Fillmore St", addedAt: "2026-07-14" },
  { id: "golden-gate-park-solo", name: "Golden Gate Park", category: "solo", lat: 37.7694, lng: -122.4862, addedAt: "2026-07-14" },
  { id: "alamo-square-solo", name: "Alamo Square Park", category: "solo", lat: 37.7764, lng: -122.4347, addedAt: "2026-07-14" },
  { id: "conservatory-of-flowers", name: "Conservatory of Flowers", category: "solo", lat: 37.7725, lng: -122.4602, note: "100 JFK Dr — Golden Gate Park", addedAt: "2026-07-14" },
  { id: "asian-art-museum", name: "Asian Art Museum", category: "solo", lat: 37.7802, lng: -122.4162, note: "200 Larkin St", addedAt: "2026-07-14" },
  { id: "hamburguesa-bar", name: "Hamburguesa Bar",  category: "solo", lat: 37.7880, lng: -122.4005, note: "78 2nd St — SoMa", addedAt: "2026-07-14" },
  { id: "verjus-solo",    name: "Verjus",            category: "solo", lat: 37.7960, lng: -122.4033, note: "528 Washington — wine bar", addedAt: "2026-07-14" },
  { id: "twenty-spot",    name: "20 Spot",           category: "solo", lat: 37.7586, lng: -122.4203, note: "3565 20th St — Mission wine bar", addedAt: "2026-07-14" },
  { id: "golden-sardine", name: "Golden Sardine",    category: "solo", lat: 37.7986, lng: -122.4075, note: "362 Columbus Ave — North Beach", addedAt: "2026-07-14" },
  // ───────── PRIVATE DINING — actual private rooms ─────────
  { id: "quince",         name: "Quince",            category: "dinner", lat: 37.7974, lng: -122.4033, note: "470 Pacific Ave — West Room, seats 16, above the wine cellar", addedAt: "2026-07-30" },
  { id: "nisei",          name: "Nisei",             category: "dinner", lat: 37.7982, lng: -122.4220, note: "2316 Polk St — Kimono Room, 6–12 tasting / up to 20 custom", addedAt: "2026-07-30" },
  { id: "liholiho",       name: "Liholiho Yacht Club", category: "dinner", lat: 37.7882, lng: -122.4146, note: "871 Sutter St — the old Gen-Gen Room downstairs, 10–20", addedAt: "2026-07-30" },
  { id: "happy-crane",    name: "The Happy Crane",   category: "dinner", lat: 37.7775, lng: -122.4232, note: "451 Gough St — Silk Room, 12 seated", addedAt: "2026-07-30" },
  { id: "nari",           name: "Nari",              category: "dinner", lat: 37.7854, lng: -122.4286, note: "1625 Post St — Wine Room (12) or Suda Room (24–40), Hotel Kabuki", addedAt: "2026-07-30" },
  { id: "che-fico",       name: "Che Fico",          category: "dinner", lat: 37.7774, lng: -122.4380, note: "838 Divisadero — Celentano Room, 14–16", addedAt: "2026-07-30" },
  { id: "spruce",         name: "Spruce",            category: "dinner", lat: 37.7877, lng: -122.4528, note: "3640 Sacramento St — several rooms, 12–40, custom menus", addedAt: "2026-07-30" },
  { id: "ernest",         name: "Ernest",            category: "dinner", lat: 37.7632, lng: -122.4110, note: "1890 Bryant St — private room, 7–14 family style", addedAt: "2026-07-30" },
  { id: "san-ho-won",     name: "San Ho Won",        category: "dinner", lat: 37.7596, lng: -122.4102, note: "2170 Bryant St — private room up to 16, set menu, 5:30 or 8:30", addedAt: "2026-07-30" },
  { id: "wolfsbane",      name: "Wolfsbane",         category: "dinner", lat: 37.7581, lng: -122.3882, note: "2495 3rd St — The Den, 22 seated, ~7 courses", addedAt: "2026-07-30" },
  { id: "arquet",         name: "Arquet",            category: "dinner", lat: 37.7955, lng: -122.3935, note: "1 Ferry Building — PDR seats 18, patio 48 with bridge views", addedAt: "2026-07-30" },
  { id: "mister-jius",    name: "Mister Jiu's",      category: "dinner", lat: 37.7937, lng: -122.4067, note: "28 Waverly Pl — Double Happiness room, glass panels + velvet curtain", addedAt: "2026-07-30" },
  { id: "moongate-lounge",name: "Moongate Lounge",   category: "dinner", lat: 37.7937, lng: -122.4067, note: "28 Waverly Pl — upstairs at Mister Jiu's, buyout 80–100", addedAt: "2026-07-30" },
  { id: "roka-akor",      name: "Roka Akor",         category: "dinner", lat: 37.7965, lng: -122.4037, note: "801 Montgomery St — private room seats 18, robata + sushi", addedAt: "2026-07-30" },
  { id: "gigis",          name: "GiGi's",            category: "dinner", lat: 37.7717, lng: -122.4372, note: "299 Divisadero St — wine bar", addedAt: "2026-08-03" },
  { id: "gigis-solo",     name: "GiGi's",            category: "solo",   lat: 37.7717, lng: -122.4372, note: "299 Divisadero St — wine bar", addedAt: "2026-08-03" },
  { id: "double-black",   name: "Double Black",      category: "cappuccinos", lat: 37.7654, lng: -122.4502, note: "925 Cole St — inside Yardsale, Cole Valley", addedAt: "2026-08-03" },
{ id: "side-characters",name: "Side Characters",   category: "cappuccinos", lat: 37.7973, lng: -122.4219, note: "2216 Polk St — records + coffee", addedAt: "2026-08-03" },
{ id: "sohn",           name: "SOHN",              category: "cappuccinos", lat: 37.7577, lng: -122.3884, note: "2535 3rd St — Korean-inspired café, Dogpatch", addedAt: "2026-08-03" },
  { id: "crissy-field-crash", name: "Crissy Field", category: "crash", lat: 37.8033, lng: -122.4658, addedAt: "2026-08-03" },
  { id: "bar-part-time",    name: "Bar Part Time",   category: "crash", lat: 37.7681, lng: -122.4242, note: "496 14th St — natural wine + disco", addedAt: "2026-08-03" },
  { id: "the-midway",       name: "The Midway",      category: "crash", lat: 37.7495, lng: -122.3861, note: "900 Marin St — Bayview warehouse venue", addedAt: "2026-08-03" },
  { id: "celeste-solo",     name: "Céleste",         category: "solo", lat: 37.7970, lng: -122.4349, note: "2165 Union St", addedAt: "2026-08-03" },
  { id: "amelie-solo",      name: "Amélie",          category: "solo", lat: 37.7932, lng: -122.4214, note: "1754 Polk St — wine bar", addedAt: "2026-08-03" },
  { id: "ken-solo",         name: "Ken",             category: "solo", lat: 37.7715, lng: -122.4369, note: "252 Divisadero St — omakase counter", addedAt: "2026-08-03" },
  { id: "horsefeather-solo",name: "Horsefeather",    category: "solo", lat: 37.7740, lng: -122.4374, note: "528 Divisadero", addedAt: "2026-08-03" },
  { id: "key-klub-solo",    name: "Key Klub",        category: "solo", lat: 37.7901, lng: -122.4114, note: "850 Bush St", addedAt: "2026-08-03" },
  // <ADD_PLACES_HERE>  ← do not remove. `npm run add` inserts new entries above this line.
];

export const SF_CENTER: [number, number] = [37.7849, -122.4194];
