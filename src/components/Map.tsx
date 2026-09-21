"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
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

// Below or at this zoom, nearby pins collapse into clusters.
const CLUSTER_MAX_ZOOM = 14;
// Pins within this many screen pixels of each other get grouped.
const CLUSTER_RADIUS = 52;

function buildIcon(emoji: string, color: string, id: string, isNew: boolean) {
  const cls = `emoji-pin${isNew ? " is-new" : ""}`;
  const sparkle = isNew ? `<span class="pin-sparkle">✨</span>` : "";
  return L.divIcon({
    className: "",
    html: `<div class="${cls}" data-place-id="${id}" style="background:${color};--pin-color:${color}"><span>${emoji}</span>${sparkle}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -34],
  });
}

function buildClusterIcon(count: number, colors: string[]) {
  const size = count >= 20 ? 54 : count >= 10 ? 48 : 42;
  const dots = colors
    .slice(0, 3)
    .map((c) => `<i style="background:${c}"></i>`)
    .join("");
  return L.divIcon({
    className: "",
    html: `<div class="cluster-pin" style="width:${size}px;height:${size}px"><span class="cluster-count">${count}</span><span class="cluster-dots">${dots}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
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

type Cluster = {
  key: string;
  lat: number;
  lng: number;
  places: Place[];
};

function useZoom() {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());
  useEffect(() => {
    const onZoom = () => setZoom(map.getZoom());
    map.on("zoomend", onZoom);
    return () => {
      map.off("zoomend", onZoom);
    };
  }, [map]);
  return zoom;
}

function PlaceMarkers({
  visible,
  isNew,
  onSelect,
}: {
  visible: Place[];
  isNew?: (p: Place) => boolean;
  onSelect: (place: Place) => void;
}) {
  const map = useMap();
  const zoom = useZoom();

  // one icon per place so the pulse can target a specific pin;
  // rebuilt when isNew identity changes (after hydration)
  const iconCache = useMemo(() => {
    const m: Record<string, L.DivIcon> = {};
    for (const p of PLACES) {
      const cat = categoryById[p.category];
      m[p.id] = buildIcon(cat.emoji, cat.color, p.id, isNew ? isNew(p) : false);
    }
    return m;
  }, [isNew]);

  // grid-cluster in projected pixel space at the current zoom
  const { singles, clusters } = useMemo(() => {
    if (zoom > CLUSTER_MAX_ZOOM) {
      return { singles: visible, clusters: [] as Cluster[] };
    }
    // (plain object — the `Map` name is taken by this component)
    const cells: Record<string, Place[]> = {};
    for (const p of visible) {
      const pt = map.project([p.lat, p.lng], zoom);
      const key = `${Math.floor(pt.x / CLUSTER_RADIUS)}:${Math.floor(pt.y / CLUSTER_RADIUS)}`;
      (cells[key] ??= []).push(p);
    }
    const singles: Place[] = [];
    const clusters: Cluster[] = [];
    for (const [key, places] of Object.entries(cells)) {
      if (places.length === 1) {
        singles.push(places[0]);
        continue;
      }
      const lat = places.reduce((s: number, p: Place) => s + p.lat, 0) / places.length;
      const lng = places.reduce((s: number, p: Place) => s + p.lng, 0) / places.length;
      clusters.push({ key, lat, lng, places });
    }
    return { singles, clusters };
  }, [visible, zoom, map]);

  const clusterIcons = useMemo(() => {
    const m: Record<string, L.DivIcon> = {};
    for (const c of clusters) {
      const colors = [...new Set(c.places.map((p) => categoryById[p.category].color))];
      m[c.key] = buildClusterIcon(c.places.length, colors);
    }
    return m;
  }, [clusters]);

  const zoomIntoCluster = (c: Cluster) => {
    const bounds = L.latLngBounds(c.places.map((p) => [p.lat, p.lng]));
    map.flyToBounds(bounds, {
      padding: [48, 48],
      maxZoom: 16,
      duration: 0.6,
    });
  };

  return (
    <>
      {singles.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={iconCache[p.id]}
          eventHandlers={{ click: () => onSelect(p) }}
        />
      ))}
      {clusters.map((c) => (
        <Marker
          key={c.key}
          position={[c.lat, c.lng]}
          icon={clusterIcons[c.key]}
          eventHandlers={{ click: () => zoomIntoCluster(c) }}
        />
      ))}
    </>
  );
}

type Props = {
  visible: Place[];
  isNew?: (p: Place) => boolean;
  onSelect: (place: Place) => void;
  flyTo?: FlyTo;
};

export default function Map({ visible, isNew, onSelect, flyTo = null }: Props) {
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
        url={"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" + (process.env.NEXT_PUBLIC_CARTO_API_KEY ? "?key=" + process.env.NEXT_PUBLIC_CARTO_API_KEY : "")}
        attribution='&copy; <a href="https://openstreetmap.org">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />
      <FlyController target={flyTo} />
      <PlaceMarkers visible={visible} isNew={isNew} onSelect={onSelect} />
    </MapContainer>
  );
}
