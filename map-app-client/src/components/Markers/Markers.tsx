import MarkerClusterGroup from "react-leaflet-cluster";
import { Marker, useMap, useMapEvent } from "react-leaflet";
import { Icon, MarkerCluster, DivIcon } from "leaflet";
import { useLocations } from "../../context/LocationContext";
import { NewMarker } from "../NewMarker";
import marker from "../../assets/marker.svg";
import selectedMarker from "../../assets/blue-marker.svg";

import "./markers.css";

export const Markers = () => {
  const {
    locations,
    setVisibleLocations,
    setSelectedLocationId,
    selectedLocationId,
    newMarker,
  } = useLocations();

  const map = useMap();

  const customMarker = new Icon({
    iconUrl: marker,
    iconSize: [21, 30],
  });

  const customSelectedMarker = new Icon({
    iconUrl: selectedMarker,
    iconSize: [21, 30],
  });

  const createClusterCustomIcon = (cluster: MarkerCluster) => {
    return new DivIcon({
      html: `<div>${cluster.getChildCount()}</div>`,
      className: "cluster-icon",
      iconSize: [40, 40],
    });
  };

  useMapEvent("moveend", () => {
    const visibleMarkers = locations.filter((marker) =>
      map.getBounds().contains([marker.lat, marker.lng])
    );

    setVisibleLocations(visibleMarkers);
  });

  return (
    <>
      {newMarker.isAdded && <NewMarker />}

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        polygonOptions={{
          stroke: false,
          color: "transparent",
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location._id}
            position={[location.lat, location.lng]}
            icon={
              location._id === selectedLocationId
                ? customSelectedMarker
                : customMarker
            }
            eventHandlers={{
              click: () => {
                setSelectedLocationId(location._id);
              },
            }}
          />
        ))}
      </MarkerClusterGroup>
    </>
  );
};
