import "../../../testHelpers/initDatabase";

import { IEarthQuake } from "../../../interfaces";
import { getEarthQuakes } from "../../../testHelpers/requests";

describe("WHEN earthQuakesController", () => {
  beforeAll(() => {});

  describe("WHEN getEarthQuakes", () => {
    describe("WHEN called without any params", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (await getEarthQuakes({})).body;
      });

      it("SHOULD return 10 instances", () => {
        expect(earthQuakes).toHaveLength(10);
      });
    });

    describe("WHEN called without any params", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (await getEarthQuakes({ skip: 0, take: 1000 })).body;
      });

      it("SHOULD return 1000 instances", () => {
        expect(earthQuakes).toHaveLength(1000);
      });
    });

    describe("WHEN called with minSignificance 150", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (await getEarthQuakes({ minSignificance: 150 })).body;
      });

      it("SHOULD only return instances with significance >= 150", () => {
        expect(earthQuakes.length).toBeGreaterThanOrEqual(1);

        for (const earthQuake of earthQuakes) {
          expect(earthQuake.significance).toBeGreaterThanOrEqual(150);
        }
      });
    });

    describe("WHEN called with minMagnitude 8", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (await getEarthQuakes({ minMagnitude: 8 })).body;
      });

      it("SHOULD only return instances with magnitude >= 8", () => {
        expect(earthQuakes.length).toBeGreaterThanOrEqual(1);

        for (const earthQuake of earthQuakes) {
          expect(earthQuake.magnitude).toBeGreaterThanOrEqual(8);
        }
      });
    });

    describe("WHEN called with startDate and endDate", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (
          await getEarthQuakes({
            startDate: new Date("2021-03-03").toISOString(),
            endDate: new Date("2021-03-05").toISOString(),
            take: 10000,
          })
        ).body;
      });

      it("SHOULD only return instances within the time period", () => {
        expect(earthQuakes.length).toBeGreaterThanOrEqual(1);

        const startTime = new Date("2021-03-03").getTime();
        const endTime = new Date("2021-03-05").getTime();

        for (const earthQuake of earthQuakes) {
          const timeInMsSinceEpoch = new Date(earthQuake.time).getTime();

          expect(timeInMsSinceEpoch).toBeGreaterThanOrEqual(startTime);
          expect(timeInMsSinceEpoch).toBeLessThanOrEqual(endTime);
        }
      });

      it("SHOULD not be limited by the take limit (should have elements less than the take)", () => {
        expect(earthQuakes.length <= 10000).toBe(true);
      });
    });

    describe("WHEN called with fullSearch", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (await getEarthQuakes({ fullSearch: "koga, japan" }))
          .body;
      });

      it("SHOULD return only instances with the search term in them", () => {
        expect(earthQuakes.length).toBeGreaterThanOrEqual(1);

        for (const earthQuake of earthQuakes) {
          expect(earthQuake.title).toContain("Koga, Japan");
        }
      });
    });

    describe("WHEN called with sort magnitude ASC", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (
          await getEarthQuakes({ sortBy: "magnitude", sortDirection: "ASC" })
        ).body;
      });

      it("SHOULD return instances with the correct sort", () => {
        for (let i = 1; i < earthQuakes.length; i++) {
          expect(earthQuakes[i].magnitude).toBeGreaterThanOrEqual(
            earthQuakes[i - 1].magnitude
          );
        }
      });
    });

    describe("WHEN called with sort significance DESC", () => {
      let earthQuakes: IEarthQuake[];

      beforeAll(async () => {
        earthQuakes = (
          await getEarthQuakes({
            sortBy: "significance",
            sortDirection: "DESC",
          })
        ).body;
      });

      it("SHOULD return instances with the correct sort", () => {
        for (let i = 1; i < earthQuakes.length; i++) {
          expect(earthQuakes[i].significance).toBeLessThanOrEqual(
            earthQuakes[i - 1].significance
          );
        }
      });
    });
  });
});
