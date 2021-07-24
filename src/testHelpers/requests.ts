import qs from "qs";
import { request } from "./initDatabase";

const getRequest = (url: string) => request.get(url);

interface IGetEarthQuakesParams {
  skip?: number;
  take?: number;
  startDate?: string;
  endDate?: string;
  minMagnitude?: number;
  minSignificance?: number;
  fullSearch?: string;
  sortBy?: "magnitude" | "significance";
  sortDirection?: "ASC" | "DESC";
}

export const getEarthQuakes = (params: IGetEarthQuakesParams) =>
  getRequest(`/earthQuakes?${qs.stringify(params)}`);
