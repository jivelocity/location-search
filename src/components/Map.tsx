import "leaflet/dist/leaflet.css";
import type { Place } from "../api/Place";
import type { Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

interface MapProps {
  place: Place | null;
}

export default function Map({ place }: MapProps) {
  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    if (place && mapRef.current) {
      mapRef.current.flyTo([place.latitude, place.longitude], 13);
    }
  }, [place]);

  return (
    <MapContainer
      ref={mapRef}
      center={[51.505, -0.09]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {place && <Marker position={[place.latitude, place.longitude]} />}
    </MapContainer>
  );
}
