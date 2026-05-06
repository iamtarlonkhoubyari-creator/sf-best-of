"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
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

function buildIcon(emoji: string, color: string) {
  return L.divIcon({
    className: "",
    html: `<div class="emoji-pin" style="background:${color}"><span>${emoji}</span></div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -34],
  });
}

type Props = {
  active: Set<CategoryId>;
  onSelect: (place: Place) => void;
};

export default function Map({ active, onSelect }: Props) {
  const visible = useMemo(
    () => PLACES.filter((p) => active.has(p.category)),
    [active],
  );

  // memoize icons by category so we don't rebuild per pin
  const iconCache = useMemo(() => {
    const m: Record<CategoryId, L.DivIcon> = {} as Record<CategoryId, L.DivIcon>;
    for (const c of CATEGORIES) m[c.id] = buildIcon(c.emoji, c.color);
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
      {visible.map((p) => {
        const cat = categoryById[p.category];
        return (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={iconCache[p.category]}
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
