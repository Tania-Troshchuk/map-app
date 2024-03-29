import axios from "axios";
import { ILocation } from "../types/location";
import { responseHandler } from "./responseHandler";

const BASE_URL = "https://map-app-server-one.vercel.app/locations";

export const getLocations = async (): Promise<ILocation[]> => {
  return await responseHandler(axios.get(BASE_URL));
};

export const createLocation = async (
  data: Omit<ILocation, "_id">
): Promise<ILocation> => {
  return await responseHandler(axios.post(BASE_URL, data));
};