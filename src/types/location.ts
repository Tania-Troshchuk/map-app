export interface ILocation {
  _id: string;
  title: string;
  info: string;
  location: string;
  lat: number;
  lng: number;
  rating: number;
  img: string;
}

export type ILocationErrors = Record<
  keyof Omit<ILocation, "_id">,
  string | null
>;
