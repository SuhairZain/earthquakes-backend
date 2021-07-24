import * as getEarthQuakesQuery from "../../queries/getEarthQuakesQuery";

export const getEarthQuakes = async (req, res) => {
  const earthQuakes = await getEarthQuakesQuery.execute();
  res.json(earthQuakes);
};
