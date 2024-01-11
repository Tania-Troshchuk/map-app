export interface INewMarker {
  isAdded: boolean | null;
  position: {
    lat: number;
    lng: number;
  } | null;
}
