"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES, PLACES, type CategoryId, type Place } from "@/data/places";
import BridgeIcon from "@/components/BridgeIcon";

// Leaflet uses window — load only on the client.
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center text-[var(--ink)]/60">
      <span className="font-display text-3xl wobble">finding the city…</span>
    </div>
  ),
});

const X_URL = "https://x.com/TarlonKhoubyari";
const LINKEDIN_URL = "https://www.linkedin.com/in/tarlon-khoubyari/";

const HOUSING_INTRO =
  "start with listingsproject and the apartment plug. fb groups when you're desperate.";

const HOUSING_LINKS: {
  label: string;
  href?: string;
  description: string;
}[] = [
  {
    label: "listingsproject.com",
    href: "https://www.listingsproject.com",
    description:
      "Curated weekly newsletter. Best for creative-leaning rentals — read it Sunday mornings.",
  },
  {
    label: "directorysf.com",
    href: "https://directorysf.com",
    description:
      "Community-built directory of housing co-ops, sublets, and group houses in the city.",
  },
  {
    label: "@theapartmentplugsf",
    href: "https://www.instagram.com/theapartmentplugsf/",
    description:
      "Instagram account that posts SF listings as they pop up. Fast.",
  },
  {
    label: "craigslist",
    href: "https://sfbay.craigslist.org/search/apa",
    description:
      "Loud and chaotic, but you'll find the occasional gem if you check daily.",
  },
  {
    label: "SF Crew",
    description:
      "Classic SF community group — listings + roommate requests. Find on Facebook.",
  },
  {
    label: "SF Housing",
    description:
      "Higher-volume housing-only group. Lots of noise; lots of options. Find on Facebook.",
  },
  {
    label: "Bay Area Rentals",
    description:
      "Broader Bay Area focus — good for East Bay & Peninsula options too. Find on Facebook.",
  },
];

const PLACEHOLDERS = [
  "search…",
  "try \"horsefeather\"",
  "where to cry?",
  "near the bridge",
  "best cappuccino",
  "a spot to be camera off",
];

function useNewSinceLastVisit() {
  const [state, setState] = useState<{
    ready: boolean;
    lastVisit: string | null;
  }>({ ready: false, lastVisit: null });

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("sf-best-of:lastVisit");
    } catch {}
    setState({ ready: true, lastVisit: stored });
    const t = setTimeout(() => {
      try {
        localStorage.setItem(
          "sf-best-of:lastVisit",
          new Date().toISOString().slice(0, 10),
        );
      } catch {}
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  const isNew = useCallback(
    (place: Place) => {
      if (!state.ready || !place.addedAt) return false;
      if (!state.lastVisit) {
        const thirty = new Date(Date.now() - 30 * 24 * 3600 * 1000)
          .toISOString()
          .slice(0, 10);
        return place.addedAt > thirty;
      }
      return place.addedAt > state.lastVisit;
    },
    [state],
  );

  return { isNew };
}

function matchesQuery(p: Place, q: string): boolean {
  if (!q.trim()) return true;
  const cat = CATEGORIES.find((c) => c.id === p.category);
  const haystack = `${p.name} ${p.note ?? ""} ${cat?.label ?? ""} ${cat?.longLabel ?? ""}`.toLowerCase();
  return haystack.includes(q.toLowerCase().trim());
}

export default function Home() {
  const [active, setActive] = useState<Set<CategoryId>>(
    () => new Set(CATEGORIES.map((c) => c.id)),
  );
  const [selected, setSelected] = useState<Place | null>(null);
  const [flyTo, setFlyTo] = useState<{
    place: Place;
    nonce: number;
    duration: number;
    pulse?: boolean;
  } | null>(null);

  const [query, setQuery] = useState("");
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [housingOpen, setHousingOpen] = useState(false);
  const { isNew } = useNewSinceLastVisit();

  // rotate placeholder while empty
  useEffect(() => {
    if (query) return;
    const t = setInterval(
      () => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length),
      3400,
    );
    return () => clearInterval(t);
  }, [query]);

  // ⌘K / Ctrl+K opens the palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectOne = (id: CategoryId) => {
    setShowNewOnly(false);
    setActive((prev) => {
      // Clicking the currently-soloed category resets to "all"
      if (prev.size === 1 && prev.has(id)) {
        return new Set(CATEGORIES.map((c) => c.id));
      }
      return new Set([id]);
    });
  };

  const selectAll = () => {
    setShowNewOnly(false);
    setActive(new Set(CATEGORIES.map((c) => c.id)));
  };

  const placeCounts = useMemo(() => {
    const counts = {} as Record<CategoryId, number>;
    for (const c of CATEGORIES) counts[c.id] = 0;
    for (const p of PLACES) counts[p.category]++;
    return counts;
  }, []);

  const newCounts = useMemo(() => {
    const counts = {} as Record<CategoryId, number>;
    for (const c of CATEGORIES) counts[c.id] = 0;
    for (const p of PLACES) if (isNew(p)) counts[p.category]++;
    return counts;
  }, [isNew]);

  const newTotal = useMemo(
    () => PLACES.filter((p) => isNew(p)).length,
    [isNew],
  );

  // surface a top banner when returning visitors land on the page
  useEffect(() => {
    if (newTotal <= 0 || bannerDismissed) return;
    setBannerVisible(true);
    const t = setTimeout(() => setBannerVisible(false), 9000);
    return () => clearTimeout(t);
  }, [newTotal, bannerDismissed]);

  const totalCount = PLACES.length;
  const allActive = active.size === CATEGORIES.length;

  const visiblePlaces = useMemo(() => {
    return PLACES.filter((p) => {
      if (showNewOnly) {
        if (!isNew(p)) return false;
      } else {
        if (!active.has(p.category)) return false;
      }
      if (!matchesQuery(p, query)) return false;
      return true;
    });
  }, [active, showNewOnly, isNew, query]);

  const luckyPick = () => {
    if (!visiblePlaces.length) return;
    const place =
      visiblePlaces[Math.floor(Math.random() * visiblePlaces.length)];
    setSelected(place);
    setFlyTo({
      place,
      nonce: performance.now(),
      duration: 0.9,
      pulse: true,
    });
  };

  const pickFromPalette = (place: Place) => {
    setSelected(place);
    setFlyTo({
      place,
      nonce: performance.now(),
      duration: 0.9,
      pulse: true,
    });
    setPaletteOpen(false);
  };

  return (
    <main className="relative flex flex-col flex-1 min-h-screen">
      {/* "what's new" top banner */}
      <div className="fixed inset-x-0 top-3 sm:top-4 z-[2500] flex justify-center pointer-events-none px-4">
        <div
          className={`new-banner ${bannerVisible && !bannerDismissed && newTotal > 0 ? "is-visible" : ""}`}
        >
          <button
            onClick={() => {
              setShowNewOnly(true);
              setBannerVisible(false);
              setBannerDismissed(true);
            }}
            className="inline-flex items-center gap-2 pointer-events-auto"
          >
            <span className="text-base">✨</span>
            <span>
              {newTotal} new spot{newTotal === 1 ? "" : "s"} since you were last here
            </span>
            <span className="opacity-70">→</span>
          </button>
          <button
            onClick={() => {
              setBannerVisible(false);
              setBannerDismissed(true);
            }}
            aria-label="dismiss"
            className="ml-2 opacity-60 hover:opacity-100 pointer-events-auto"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="px-4 pt-5 pb-4 sm:px-8 sm:pt-7 z-[1000]">
        <BridgeIcon className="w-44 sm:w-56 h-auto -mb-2 -ml-1 -rotate-1" />
        <h1 className="font-display text-4xl sm:text-6xl leading-[1] font-semibold">
          <span className="accent-underline">best of SF</span>{" "}
          <span className="italic font-normal" style={{ color: "#708238" }}>
            (tarlon&rsquo;s version)
          </span>
        </h1>
        <p className="text-sm opacity-70 leading-relaxed mt-3 max-w-2xl">
          A curated map of my favorite places in San Francisco. Tap any pin.
          Share the link. Updated whenever I find something new.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <SocialLink
            href={X_URL}
            label="X"
            svgPath="M18.244 2H21.5l-7.5 8.572L22.5 22h-6.844l-5.36-7.013L4.18 22H.918l8.022-9.166L.5 2h7l4.844 6.41L18.244 2zm-2.4 18h1.876L7.25 4H5.27l10.574 16z"
          />
          <SocialLink
            href={LINKEDIN_URL}
            label="LinkedIn"
            svgPath="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
          />
        </div>
      </header>

      {/* Body: sidebar + map */}
      <div className="flex-1 flex flex-col md:flex-row gap-3 md:gap-5 px-4 sm:px-8 pb-4 min-h-0">
        <aside className="md:w-60 lg:w-72 shrink-0 z-[1000] md:overflow-y-auto md:max-h-full no-scrollbar md:pb-2">
          {/* Search input */}
          <div className="relative mb-1.5">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value) setShowNewOnly(false);
              }}
              placeholder={PLACEHOLDERS[phIdx]}
              className="w-full bg-[var(--paper)]/85 backdrop-blur-sm border border-[var(--ink)]/15 rounded-full pl-3.5 pr-12 py-1.5 text-sm placeholder:text-[var(--ink)]/40 focus:outline-none focus:border-[var(--ink)]/40 transition"
              aria-label="search places"
            />
            <kbd
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono bg-[var(--ink)]/10 text-[var(--ink)]/55 px-1.5 py-0.5 rounded"
              title="open the command palette"
            >
              ⌘K
            </kbd>
          </div>

          <div className="flex items-center gap-3 text-[10px] mb-3 pl-1">
            <button
              onClick={luckyPick}
              className="text-[var(--ink)]/60 hover:text-[var(--ink)] italic transition"
            >
              i&rsquo;m feeling lucky →
            </button>
            {newTotal > 0 && (
              <button
                onClick={() => {
                  setShowNewOnly((s) => !s);
                  setQuery("");
                }}
                className={`ml-auto inline-flex items-center gap-1 transition ${showNewOnly ? "text-[var(--ink)] font-medium" : "text-[var(--ink)]/60 hover:text-[var(--ink)]"}`}
              >
                <span className="text-sm">✨</span>
                <span>
                  {newTotal} new{showNewOnly ? " · clear" : ""}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <h2 className="font-display italic text-sm text-[var(--ink)]/55">
              the menu
            </h2>
            <span className="text-[9px] uppercase tracking-[0.18em] opacity-45">
              tap to filter
            </span>
          </div>
          <ol className="space-y-0">
            <MenuItem
              n={0}
              label="all"
              count={totalCount}
              newCount={newTotal}
              color="#2E2438"
              active={!showNewOnly && allActive}
              onClick={selectAll}
            />
            {CATEGORIES.map((c, i) => (
              <MenuItem
                key={c.id}
                n={i + 1}
                label={c.label.toLowerCase()}
                emoji={c.emoji}
                count={placeCounts[c.id]}
                newCount={newCounts[c.id]}
                color={c.color}
                active={!showNewOnly && !allActive && active.has(c.id)}
                onClick={() => selectOne(c.id)}
              />
            ))}
          </ol>

          {/* Resources — non-map links, collapsible */}
          <div className="mt-5 pt-4 border-t border-[var(--ink)]/10">
            <button
              onClick={() => setHousingOpen((o) => !o)}
              className="housing-toggle w-full flex items-center justify-between gap-2 px-2.5 py-2 -mx-2 rounded-xl bg-[var(--ink)]/5 hover:bg-[var(--ink)]/10 active:scale-[0.99] transition group"
              aria-expanded={housingOpen}
            >
              <h3 className="font-display italic text-sm text-[var(--ink)] group-hover:translate-x-0.5 transition">
                finding a place to live in SF
              </h3>
              <span className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--ink)]/55 font-semibold">
                  {housingOpen ? "hide" : `show ${HOUSING_LINKS.length}`}
                </span>
                <span
                  className={`text-[11px] grid place-items-center w-5 h-5 rounded-full bg-[var(--ink)] text-white transition-transform duration-300 ${housingOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▾
                </span>
              </span>
            </button>
            <div className={`housing-list mt-2 ${housingOpen ? "is-open" : ""}`}>
              <p className="text-[11px] text-[var(--ink)]/65 italic mb-3 leading-snug px-1">
                {HOUSING_INTRO}
              </p>
              <ul className="space-y-3">
                {HOUSING_LINKS.map((link) => (
                  <li key={link.label} className="housing-card">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <span className="font-display italic text-base text-[var(--ink)] leading-tight">
                        {link.label}
                      </span>
                      {link.href ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="housing-visit text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--ink)]/55 hover:text-[var(--ink)] transition shrink-0"
                        >
                          visit ↗
                        </a>
                      ) : (
                        <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--ink)]/35 shrink-0">
                          fb group
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--ink)]/60 leading-snug">
                      {link.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </aside>

        <section className="relative flex-1 min-h-[60vh] md:min-h-0 rounded-3xl overflow-hidden border-2 border-[var(--ink)]/10 shadow-[0_10px_40px_-10px_rgba(46,36,56,0.25)]">
          <Map
            visible={visiblePlaces}
            isNew={isNew}
            onSelect={setSelected}
            flyTo={flyTo}
          />
        </section>
      </div>
      
      {/* Command palette (⌘K) */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onPick={pickFromPalette}
        isNew={isNew}
      />

      {/* Detail sheet */}
      {selected && (
        <DetailSheet
          place={selected}
          isNew={isNew(selected)}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Tiny footer */}
      <footer className="px-4 sm:px-8 pt-2 pb-4 text-xs opacity-60 flex items-center justify-between flex-wrap gap-2 shrink-0">
        <span className="whitespace-nowrap">By Tarlon Khoubyari</span>
        <span className="font-display italic">
          {CATEGORIES.length} categories, always growing.
        </span>
      </footer>
    </main>
  );
}

function MenuItem({
  n,
  label,
  emoji,
  count,
  newCount = 0,
  color,
  active,
  onClick,
}: {
  n: number;
  label: string;
  emoji?: string;
  count: number;
  newCount?: number;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`menu-item w-full flex items-baseline gap-2 py-[3px] text-left ${active ? "is-active" : ""}`}
        style={{ ["--menu-color" as string]: color }}
      >
        <span className="menu-number font-display tabular-nums text-xs w-6 text-right">
          {String(n).padStart(2, "0")}.
        </span>
        <span className="menu-label-wrapper font-display italic text-base">
          {label}
        </span>
        {newCount > 0 && (
          <span
            className="menu-new-badge"
            style={{ background: color }}
            title={`${newCount} new`}
          >
            +{newCount}
          </span>
        )}
        <span className="flex-1" />
        <span className="menu-count text-[10px] tabular-nums">{count}</span>
        {emoji && (
          <span className="menu-emoji text-xs w-4 text-center">{emoji}</span>
        )}
      </button>
    </li>
  );
}

function CommandPalette({
  open,
  onClose,
  onPick,
  isNew,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (p: Place) => void;
  isNew: (p: Place) => boolean;
}) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (open) {
      setQ("");
      setCursor(0);
    }
  }, [open]);

  const results = useMemo(() => {
    if (!open) return [] as Place[];
    return PLACES.filter((p) => matchesQuery(p, q)).slice(0, 40);
  }, [open, q]);

  useEffect(() => {
    setCursor(0);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const p = results[cursor];
        if (p) onPick(p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, cursor, onPick]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-start justify-center pt-[14vh] px-4 bg-[var(--ink)]/40 backdrop-blur-sm sheet-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[var(--paper)] rounded-2xl shadow-[0_24px_60px_-12px_rgba(46,36,56,0.45)] border border-[var(--ink)]/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--ink)]/8">
          <span className="text-[var(--ink)]/40 text-sm">⌕</span>
          <input
            autoFocus
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search the whole map…"
            className="flex-1 bg-transparent text-base focus:outline-none placeholder:text-[var(--ink)]/35"
          />
          <kbd className="text-[10px] font-mono text-[var(--ink)]/50 bg-[var(--ink)]/8 px-1.5 py-0.5 rounded">
            esc
          </kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-sm text-[var(--ink)]/50 italic text-center">
              nothing matches &ldquo;{q}&rdquo;
            </div>
          ) : (
            <ul>
              {results.map((p, i) => {
                const cat = CATEGORIES.find((c) => c.id === p.category)!;
                return (
                  <li key={p.id}>
                    <button
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => onPick(p)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition ${i === cursor ? "bg-[var(--ink)]/6" : ""}`}
                    >
                      <span
                        className="w-1.5 h-8 rounded-full shrink-0"
                        style={{ background: cat.color }}
                      />
                      <span className="text-lg shrink-0">{cat.emoji}</span>
                      <span className="flex-1 min-w-0">
                        <span className="font-display text-base font-semibold block leading-tight truncate">
                          {p.name}
                          {isNew(p) && (
                            <span className="ml-1.5 text-[9px] uppercase tracking-wide font-semibold opacity-70">
                              ✨ new
                            </span>
                          )}
                        </span>
                        <span className="text-xs opacity-60 truncate block">
                          {cat.label}
                          {p.note ? ` · ${p.note}` : ""}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="px-4 py-2 border-t border-[var(--ink)]/8 flex items-center justify-between text-[10px] text-[var(--ink)]/50">
          <span>
            ↑↓ navigate · ↵ open · esc close
          </span>
          <span className="font-display italic">{results.length} matches</span>
        </div>
      </div>
    </div>
  );
}

function DetailSheet({
  place,
  isNew,
  onClose,
}: {
  place: Place;
  isNew: boolean;
  onClose: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === place.category)!;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.name + " San Francisco",
  )}`;
  return (
    <div
      role="dialog"
      className="sheet-in fixed inset-x-0 bottom-0 z-[2000] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
    >
      <div
        className="bg-[var(--paper)] rounded-t-3xl sm:rounded-3xl p-5 shadow-[0_-10px_40px_rgba(46,36,56,0.18)] border-2 border-[var(--ink)]/10"
        style={{ borderTopColor: cat.color }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-60 flex items-center gap-2">
              <span>
                {cat.emoji} {cat.longLabel}
              </span>
              {isNew && (
                <span
                  className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: cat.color, color: "white" }}
                >
                  ✨ new
                </span>
              )}
            </div>
            <h2
              className="font-display text-4xl sm:text-5xl leading-[1] mt-1 font-semibold"
              style={{ color: cat.color }}
            >
              {place.name}
            </h2>
            {place.note && (
              <p className="text-sm opacity-80 mt-1">{place.note}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="close"
            className="rounded-full w-8 h-8 grid place-items-center bg-[var(--ink)]/5 hover:bg-[var(--ink)]/10"
          >
            ✕
          </button>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full font-medium"
          style={{ background: cat.color, color: "white" }}
        >
          open in Google Maps →
        </a>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  svgPath,
}: {
  href: string;
  label: string;
  svgPath: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--paper)] border border-[var(--ink)]/15 text-xs font-medium hover:bg-[var(--ink)] hover:text-white transition"
    >
      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
        <path d={svgPath} />
      </svg>
      {label}
    </a>
  );
}
