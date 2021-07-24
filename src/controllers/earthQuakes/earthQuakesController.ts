import * as getEarthQuakesQuery from "../../queries/getEarthQuakesQuery";

const parseToIntIfValid = (stringVal: string, defaultVal: number): number =>
  (stringVal && Number.parseInt(stringVal)) || defaultVal;

export const getEarthQuakes = async (req, res) => {
  const {
    minSignificance: minSignificanceStr,
    minMagnitude: minMagnitudeStr,
    skip: skipStr,
    take: takeStr,
    startDate: startDateStr,
    endDate: endDateStr,
    fullSearch,
    sortBy: _inputSortBy,
    sortDirection: _inputSortDirection,
  } = req.query;

  const minSignificance = parseToIntIfValid(minSignificanceStr, 0);
  const minMagnitude = parseToIntIfValid(minMagnitudeStr, 0);

  const startDate = startDateStr && new Date(startDateStr);
  const endDate = endDateStr && new Date(endDateStr);

  const skip = parseToIntIfValid(skipStr, 0);
  const take = parseToIntIfValid(takeStr, 10);

  const lowerCasedSortBy = _inputSortBy?.toLowerCase();
  const upperCasedSortDirection = _inputSortDirection?.toUpperCase();

  const sortBy =
    lowerCasedSortBy === "significance"
      ? "sig"
      : lowerCasedSortBy === "magnitude"
      ? "magnitude"
      : undefined;

  const sortDirection =
    upperCasedSortDirection === "ASC" || upperCasedSortDirection === "DESC"
      ? _inputSortDirection
      : "ASC";

  const { earthQuakes, totalCount } = await getEarthQuakesQuery.execute({
    minSignificance,
    minMagnitude,
    skip,
    take,
    startDate,
    endDate,
    fullSearch,
    sortBy,
    sortDirection,
  });

  res.set("X-Total-Count", totalCount).json(earthQuakes);
};
