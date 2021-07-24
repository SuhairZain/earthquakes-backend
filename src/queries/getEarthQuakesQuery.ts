import { Op, WhereOptions } from "sequelize";
import { EarthQuake } from "../database/models";
import { IEarthQuake, IEarthQuakeDbInstance } from "../interfaces";

interface IGetEarthQuakesParams {
  skip: number;
  take: number;
  startDate: Date;
  endDate: Date;
  minMagnitude: number;
  minSignificance: number;
  fullSearch: string;
  sortBy: "magnitude" | "sig" | undefined;
  sortDirection: "ASC" | "DESC";
}

export const execute = async (params: IGetEarthQuakesParams) => {
  const {
    minSignificance,
    minMagnitude,
    startDate,
    endDate,
    skip,
    take,
    fullSearch,
    sortBy,
    sortDirection,
  } = params;

  const where: WhereOptions = {
    sig: { [Op.gte]: minSignificance },
    magnitude: { [Op.gte]: minMagnitude },
  };

  if (startDate && endDate) {
    where["time"] = {
      [Op.gte]: startDate,
      [Op.lte]: endDate,
    };
  }

  if (fullSearch) {
    where["title"] = {
      [Op.iLike]: `%${fullSearch}%`,
    };
  }

  const earthQuakes = await EarthQuake.findAll({
    logging: false,
    where,
    limit: take,
    offset: skip,
    order: sortBy && sortDirection && [[sortBy, sortDirection]],
  });

  return earthQuakes.map((e) =>
    outputMapper(e.toJSON() as IEarthQuakeDbInstance)
  );
};

const outputMapper = (earthQuake: IEarthQuakeDbInstance): IEarthQuake => {
  const { sig, ...rest } = earthQuake;

  return { ...rest, significance: sig };
};
