import { request } from "./initDatabase";

const getRequest = (url: string) => request.get(url);

export const getEarthQuakes = () => getRequest("/earthQuakes");
