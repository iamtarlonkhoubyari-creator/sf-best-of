"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import {
  CATEGORIES,
  type CategoryId,
  type Place,
  PLACES,
  SF_CENTER,
} from "@/data/places";

const categoryById = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, (typeof CATEGORIES)[number]>;

function buildIcon(emoji: string, color: string, id: string) {
  return L.divIcon({
    className: "",
    html: `<div class="emoji-pin" data-place-id="${id}" style="background:${color}"><span>${emoji}</span></div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -34],
  });
}

type FlyTo = {
  place: Place;
  nonce: number;
  duration?: number;
  pulse?: boolean;
} | null;

function FlyController({ target }: { target: FlyTo }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    const duration = target.duration ?? 1;
    map.flyTo([target.place.lat, target.place.lng], 15, { duration });
    if (!target.pulse) return;
    const t = setTimeout(() => {
      const el = document.querySelector(
        `[data-place-id="${target.place.id}"]`,
      ) as HTMLElement | null;
      if (!el) return;
      el.classList.remove("pulse");
      void el.offsetWidth; // restart animation
      el.classList.add("pulse");
      setTimeout(() => el.classList.remove("pulse"), 1000);
    }, duration * 1000);
    return () => clearTimeout(t);
  }, [target?.nonce, target, map]);
  return null;
}

type Props = {
  visible: Place[];
  onSelect: (place: Place) => void;
  flyTo?: FlyTo;
};

export default function Map({ visible, onSelect, flyTo = null }: Props) {
  // build one icon per place so we can target a specific pin for the pulse
  const iconCache = useMemo(() => {
    const m: Record<string, L.DivIcon> = {};
    for (const p of PLACES) {
      const cat = categoryById[p.category];
      m[p.id] = buildIcon(cat.emoji, cat.color, p.id);
    }
    return m;
  }, []);

  return (
    <MapContainer
      center={SF_CENTER}
      zoom={13}
      minZoom={11}
      maxZoom={18}
      scrollWheelZoom
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://openstreetmap.org">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />
      <FlyController target={flyTo} />
      {visible.map((p) => {
        const cat = categoryById[p.category];
        return (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={iconCache[p.id]}
            eventHandlers={{ click: () => onSelect(p) }}
          >
            <Popup>
              <div className="text-[var(--ink)] min-w-[180px]">
                <div className="text-[10px] uppercase tracking-[0.15em] opacity-60 font-medium">
                  {cat.emoji} {cat.longLabel}
                </div>
                <div
                  className="font-display text-2xl font-semibold leading-tight mt-0.5"
                  style={{ color: cat.color }}
                >
                  {p.name}
                </div>
                {p.note && (
                  <div className="text-xs opacity-75 mt-1">{p.note}</div>
                )}
                {p.needsReview && (
                  <div className="text-[10px] mt-1 opacity-50 italic">
                    approximate location
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
