import { MapContainer, TileLayer } from "react-leaflet";
import { Markers } from "..";
import "leaflet/dist/leaflet.css";
import "./map.css";

export const Map = () => {
  return (
    <div className="map">
      <MapContainer center={[49.0, 31.0]} zoom={6} minZoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Markers />
      </MapContainer>
    </div>
  );
};
