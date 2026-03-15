import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cities } from '../data/mockData';

// Fix default marker icon in Vite (Leaflet uses relative paths that break in bundlers)
const greenIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Optional: use a green tint by creating a custom icon (emoji or SVG)
function createEcoIcon() {
  return L.divIcon({
    className: 'eco-marker',
    html: '<span style="font-size:28px;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5));">🌱</span>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
}

const ecoIcon = createEcoIcon();

function MapCenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom ?? map.getZoom());
  }, [center, zoom, map]);
  return null;
}

export default function EcoMap() {
  const center = [41.3111, 69.2797]; // Tashkent
  const mapRef = useRef(null);

  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 shadow-glass h-[400px] w-full">
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenter center={center} zoom={6} />
        {cities.map(({ city, lat, lng, growpacks }) => (
          <Marker key={city} position={[lat, lng]} icon={ecoIcon}>
            <Popup>
              <strong>{city}</strong>
              <br />
              GrowPacks planted: <span className="text-emerald-600">{growpacks}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
