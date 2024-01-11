import { useMemo } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useLocations } from "../../context/LocationContext";
import { Icon } from "leaflet";
import selectedMarker from "../../assets/blue-marker.svg";

export const NewMarker = () => {
  const map = useMap();
  const { setNewMarker } = useLocations();
  const initPosition = useMemo(() => map.getCenter(), [map]);

  const customMarker = new Icon({
    iconUrl: selectedMarker,
    iconSize: [30, 40],
    className: "new-marker",
  });

  return (
    <Marker
      draggable
      position={initPosition}
      icon={customMarker}
      eventHandlers={{
        dragend: (e) => {
          setNewMarker((prev) => ({
            ...prev,
            position: e.target.getLatLng(),
          }));
        },
      }}
    >
      <Popup>Перетягніть маркер у необхідне місце</Popup>
    </Marker>
  );
};
