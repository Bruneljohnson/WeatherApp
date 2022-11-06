import { IResponse } from "@/types";
import {
  formatToLocalTime,
  paginate,
  splitErrorMessage,
  roundNumberTypeFields,
  getIconUrl,
  setNightOrDay,
  setBackgroundColor,
} from "../../../helpers";

describe("check if formatToLocalTime() formats time correctly", () => {
  test("Luxon returns a string exactly as the format arg passed through", () => {
    expect(
      formatToLocalTime(
        1667513400,
        "Europe/London",
        "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
      )
    ).toBe("Thursday, 03 Nov 2022 | Local Time: 10:10 PM");
  });
});

describe("check if splitErrorMessage() splits strings correctly", () => {
  test("splitErrorMessage() returns a string Array that is split by the /", () => {
    expect(
      splitErrorMessage(
        `Your request was sent, but we could not connect to "London" weather forecast./Please make sure the city is spelt correctly and try again.`
      )
    ).toHaveLength(2);
    expect(
      splitErrorMessage(
        `Your request was sent, but we could not connect to "London" weather forecast./Please make sure the city is spelt correctly and try again.`
      )[0]
    ).toBe(
      `Your request was sent, but we could not connect to "London" weather forecast.`
    );
    expect(
      splitErrorMessage(
        `Your request was sent, but we could not connect to "London" weather forecast./Please make sure the city is spelt correctly and try again.`
      )[1]
    ).toBe(`Please make sure the city is spelt correctly and try again.`);
  });

  test("splitErrorMessage() returns a full string if no split possible", () => {
    expect(splitErrorMessage(`Your request was sent.`)).not.toEqual([
      `Your request was sent.`,
      "",
    ]);
    expect(splitErrorMessage(`Your request was sent.`)).toBe(
      `Your request was sent.`
    );
  });
});

describe("check if getIconUrl() sets the url for the icon source correctly", () => {
  test("getIconUrl() with icon string", () => {
    expect(getIconUrl("04n")).toEqual(
      `http://openweathermap.org/img/wn/04n@2x.png`
    );
  });
});

describe("check if paginate() creates pages correctly", () => {
  test("paginate() with mock array", () => {
    expect(paginate([1, 2, 3, 4, 5, 6, 7], 1, 3)).toEqual({
      forecasts: [1, 2, 3],
      nextPage: 2,
      previousPage: null,
      total: 7,
      totalPages: 3,
    });
  });
});

describe("check if roundNumberTypeFields() rounds floats / integers to the nearest integers", () => {
  test("roundNumberTypeFields() with 3 decimal place float", () => {
    expect(roundNumberTypeFields(123.456)).toBe(123);
  });
  test("roundNumberTypeFields() with 1 decimal place float", () => {
    expect(roundNumberTypeFields(123.5)).toBe(124);
  });
  test("roundNumberTypeFields() with integer", () => {
    expect(roundNumberTypeFields(123)).toBe(123);
  });
});

describe("check if setNightOrDay() sets the time of day correctly.", () => {
  test("setNightOrDay() set time of day to night", () => {
    expect(setNightOrDay(123456, 123454, 123455)).toBe("night");
  });
  test("setNightOrDay() set time of day to day", () => {
    expect(setNightOrDay(123456, 123457, 123455)).toBe("day");
  });
});

describe("check if setBackgroundColor() sets app background colour correctly", () => {
  describe("SetBackgroundColor() using Metric unit format", () => {
    let weather: IResponse, units: string;
    beforeEach(() => {
      weather = {
        dt: 123456,
        sunset: 123454,
        sunrise: 123455,
        temp: 23,
      };
      units = "metric";
    });
    test("setBackgroundColor() set background to black at night", () => {
      expect(setBackgroundColor(weather, units)).toBe(`from-gray-600 to-black`);
    });

    test("setBackgroundColor() set background to orange during the day and temp over 20°C", () => {
      weather = {
        dt: 123456,
        sunset: 123457,
        sunrise: 123454,
        temp: 23,
      };
      expect(setBackgroundColor(weather, units)).toBe(
        `from-yellow-700 to-orange-700`
      );
    });

    test("setBackgroundColor() set background to blue during the day and temp below 20°C", () => {
      weather = {
        dt: 123456,
        sunset: 123457,
        sunrise: 123454,
        temp: 19,
      };
      expect(setBackgroundColor(weather, units)).toBe(
        `from-cyan-700 to-blue-700`
      );
    });
  });

  describe("SetBackgroundColor() using Imperial unit format", () => {
    let weather: IResponse, units: string;
    beforeEach(() => {
      weather = {
        dt: 123456,
        sunset: 123454,
        sunrise: 123455,
        temp: 69,
      };
      units = "imperial";
    });
    test("setBackgroundColor() set background to black at night", () => {
      expect(setBackgroundColor(weather, units)).toBe(`from-gray-600 to-black`);
    });

    test("setBackgroundColor() set background to orange during the day and temp over 68°F", () => {
      weather = {
        dt: 123456,
        sunset: 123457,
        sunrise: 123454,
        temp: 69,
      };
      expect(setBackgroundColor(weather, units)).toBe(
        `from-yellow-700 to-orange-700`
      );
    });

    test("setBackgroundColor() set background to blue during the day and temp below 68°F", () => {
      weather = {
        dt: 123456,
        sunset: 123457,
        sunrise: 123454,
        temp: 60,
      };
      expect(setBackgroundColor(weather, units)).toBe(
        `from-cyan-700 to-blue-700`
      );
    });
  });
});
