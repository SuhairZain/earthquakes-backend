import { EarthQuake } from "../database/models";

export const execute = async () => {
  const earthQuakes = await EarthQuake.findAll({
    limit: 10,
    offset: 0,
  });

  return earthQuakes.map((e) => e.toJSON());
};
