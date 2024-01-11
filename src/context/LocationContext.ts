import { createContext, useContext } from "react";
import { ILocation } from "../types/location";
import { INewMarker } from "../types/newMarker";

interface IProps {
  locations: ILocation[];
  visibleLocations: ILocation[];
  selectedLocationId: string | null;
  newMarker: INewMarker;
  setVisibleLocations: React.Dispatch<React.SetStateAction<ILocation[]>>;
  setSelectedLocationId: React.Dispatch<React.SetStateAction<string | null>>;
  setNewMarker: React.Dispatch<React.SetStateAction<INewMarker>>;
}

export const LocationsContext = createContext<IProps | null>(null);

export const useLocations = () => {
  const context = useContext(LocationsContext);

  if (!context) {
    throw new Error("useLocations must be used within a Provider");
  }
  
  return context;
};