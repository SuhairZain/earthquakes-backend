import "../../../testHelpers/initDatabase";

import { IEarthQuake } from "../../../interfaces";
import { getEarthQuakes } from "../../../testHelpers/requests";

describe("WHEN earthQuakesController", () => {
  beforeAll(() => {});

  describe("WHEN getEarthQuakes", () => {
    describe("WHEN called without any params", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (await getEarthQuakes()).body;
      });

      it("SHOULD return 10 instances", () => {
        expect(earthQuakes).toHaveLength(10);
      });
    });
  });
});
