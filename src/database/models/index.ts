import sequelize from "../index";

import { getColumns as getColumnsEarthQuake } from "./EarthQuake.model";

sequelize.define("EarthQuake", getColumnsEarthQuake(), {
  modelName: "EarthQuake",
  tableName: "earthquakes",
});

export const EarthQuake = sequelize.models.EarthQuake;
