"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { CATEGORIES, type CategoryId, type Place } from "@/data/places";

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

export default function Home() {
  const [active, setActive] = useState<Set<CategoryId>>(
    () => new Set(CATEGORIES.map((c) => c.id)),
  );
  const [selected, setSelected] = useState<Place | null>(null);

  const toggle = (id: CategoryId) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      // never allow zero — at least one category on
      if (next.size === 0) next.add(id);
      return next;
    });
  };

  const selectAll = () => setActive(new Set(CATEGORIES.map((c) => c.id)));

  return (
    <main className="relative flex flex-col flex-1 min-h-screen">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 sm:px-8 sm:pt-8 z-[1000]">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-5xl sm:text-7xl leading-[0.95] font-semibold">
              The Best of <span className="accent-underline">SF</span>
            </h1>
            <p className="font-display italic text-2xl sm:text-3xl text-[var(--rose)] mt-1">
              Tarlon&rsquo;s version
            </p>
          </div>
          <p className="text-sm opacity-70 max-w-sm leading-relaxed">
            A curated map of my favorite places in San Francisco. Tap any pin.
            Share the link. Updated whenever I find something new.
          </p>
        </div>
      </header>

      {/* Category chips */}
      <nav className="px-4 sm:px-8 pb-3 z-[1000]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <Chip
            label="all"
            emoji="✨"
            color="var(--ink)"
            active={active.size === CATEGORIES.length}
            onClick={selectAll}
          />
          {CATEGORIES.map((c) => (
            <Chip
              key={c.id}
              label={c.label}
              emoji={c.emoji}
              color={c.color}
              active={active.has(c.id)}
              onClick={() => toggle(c.id)}
            />
          ))}
        </div>
      </nav>

      {/* Map */}
      <section className="relative flex-1 mx-4 sm:mx-8 mb-4 rounded-3xl overflow-hidden border-2 border-[var(--ink)]/10 shadow-[0_10px_40px_-10px_rgba(46,36,56,0.25)]">
        <Map active={active} onSelect={setSelected} />
        <Socials />
      </section>

      {/* Detail sheet */}
      {selected && <DetailSheet place={selected} onClose={() => setSelected(null)} />}

      {/* Tiny footer */}
      <footer className="px-4 sm:px-8 pb-4 text-xs opacity-60 flex items-center justify-between flex-wrap gap-2">
        <span>
          By Tarlon Khoubyari ·{" "}
          <a
            className="underline decoration-[var(--rose)] underline-offset-2"
            target="_blank"
            rel="noreferrer"
            href={X_URL}
          >
            X
          </a>{" "}
          ·{" "}
          <a
            className="underline decoration-[var(--ocean)] underline-offset-2"
            target="_blank"
            rel="noreferrer"
            href={LINKEDIN_URL}
          >
            LinkedIn
          </a>
        </span>
        <span className="font-display italic">
          {CATEGORIES.length} categories, always growing.
        </span>
      </footer>
    </main>
  );
}

function Chip({
  label,
  emoji,
  color,
  active,
  onClick,
}: {
  label: string;
  emoji: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-sm font-medium transition-all"
      style={{
        borderColor: active ? color : "rgba(46,36,56,0.15)",
        background: active ? color : "var(--paper)",
        color: active ? "white" : "var(--ink)",
        boxShadow: active ? "0 4px 14px -4px " + color : "none",
      }}
    >
      <span>{emoji}</span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function DetailSheet({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === place.category)!;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.name + " San Francisco",
  )}`;
  return (
    <div
      role="dialog"
      className="fixed inset-x-0 bottom-0 z-[2000] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
    >
      <div
        className="bg-[var(--paper)] rounded-t-3xl sm:rounded-3xl p-5 shadow-[0_-10px_40px_rgba(46,36,56,0.18)] border-2 border-[var(--ink)]/10"
        style={{ borderTopColor: cat.color }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-60">
              {cat.emoji} {cat.longLabel}
            </div>
            <h2 className="font-display text-3xl leading-tight mt-1">
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

function Socials() {
  return (
    <div className="absolute right-3 bottom-3 z-[1000] flex gap-2">
      <a
        href={X_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="X"
        className="w-10 h-10 grid place-items-center rounded-full bg-[var(--paper)] border-2 border-[var(--ink)]/10 shadow hover:scale-105 transition"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M18.244 2H21.5l-7.5 8.572L22.5 22h-6.844l-5.36-7.013L4.18 22H.918l8.022-9.166L.5 2h7l4.844 6.41L18.244 2zm-2.4 18h1.876L7.25 4H5.27l10.574 16z" />
        </svg>
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="w-10 h-10 grid place-items-center rounded-full bg-[var(--paper)] border-2 border-[var(--ink)]/10 shadow hover:scale-105 transition"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      </a>
    </div>
  );
}
