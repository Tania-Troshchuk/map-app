import { useEffect, useMemo, useState } from "react";
import { MainButton, CardsList, Map, AddModalBox, Loader } from "./components";
import { ILocation } from "./types/location";
import { LocationsContext } from "./context/LocationContext";
import { INewMarker } from "./types/newMarker";
import { useQuery } from "react-query";
import { getLocations } from "./services/API";

function App() {
  const [visibleLocations, setVisibleLocations] = useState<ILocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [newMarker, setNewMarker] = useState<INewMarker>({
    isAdded: null,
    position: null,
  });

  const { data, isLoading } = useQuery("locations", getLocations);

  const contextValue = useMemo(
    () => ({
      locations: data ?? [],
      visibleLocations,
      setVisibleLocations,
      selectedLocationId,
      setSelectedLocationId,
      newMarker,
      setNewMarker,
    }),
    [data, newMarker, selectedLocationId, visibleLocations]
  );

  useEffect(() => {
    if (data) {
      setVisibleLocations(data);
    }
  }, [data]);

  return (
    <>
      {isLoading && <Loader />}

      <header>
        <h1>🇺🇦 Мандруй Україною</h1>

        <MainButton
          onClick={() => setShowModal(true)}
          text="+ Додати локацію"
        />
      </header>

      <main>
        <LocationsContext.Provider value={contextValue}>
          {showModal && (
            <AddModalBox onClose={() => setShowModal(false)} />
          )}

          <Map />

          <CardsList />
        </LocationsContext.Provider>
      </main>
    </>
  );
}

export default App;
