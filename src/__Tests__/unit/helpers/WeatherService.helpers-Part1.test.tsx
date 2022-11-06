import {
  formatCurrentWeather,
  formatForecastWeather,
  getCurrentLocationHandler,
} from "../../../helpers";

describe("check if formatCurrentWeather() formats current weather into useable data", () => {
  let coord: any,
    main: any,
    name: any,
    dt: any,
    sys: any,
    weather: any,
    wind: any;

  beforeEach(() => {
    coord = {
      lon: 10.99,
      lat: 44.34,
    };
    main = {
      temp: 29.48,
      feels_like: 29.74,
      temp_min: 29.56,
      temp_max: 30.05,
      pressure: 1015,
      humidity: 64,
      sea_level: 1015,
      grnd_level: 933,
    };
    sys = {
      type: 2,
      id: 2075663,
      country: "IT",
      sunrise: 1661834187,
      sunset: 1661882248,
    };
    weather = [
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
        icon: "10d",
      },
    ];
    wind = {
      speed: 0.62,
      deg: 349,
      gust: 1.18,
    };
    dt = 1661870592;
    name = "Zocca";
  });

  test("formatCurrentWeather() format and destructure data", () => {
    expect(
      formatCurrentWeather({ coord, weather, wind, sys, dt, name, main })
    ).toEqual({
      lat: 44.34,
      lon: 10.99,
      temp: 29.48,
      feels_like: 29.74,
      temp_min: 29.56,
      temp_max: 30.05,
      humidity: 64,
      name: "Zocca",
      dt: 1661870592,
      country: "IT",
      sunrise: 1661834187,
      sunset: 1661882248,
      speed: 0.62,
      details: "Rain",
      icon: "10d",
    });
  });
});

describe("check if formatForecastWeather() formats forecasts of city weather into useable data", () => {
  let timezone: string, daily: any, hourly: any;

  beforeEach(() => {
    timezone = "Europe/London";
    daily = [
      {
        dt: 1661870592,
        weather: [
          {
            id: 501,
            main: "Rain",
            description: "moderate rain",
            icon: "10d",
          },
        ],
        temp: {
          day: 25,
        },
      },
      {
        dt: 1661875000,
        weather: [
          {
            id: 501,
            main: "Rain",
            description: "moderate rain",
            icon: "10d",
          },
        ],
        temp: {
          day: 25,
        },
      },
    ];
    hourly = [
      {
        dt: 1661870592,
        weather: [
          {
            id: 501,
            main: "Rain",
            description: "moderate rain",
            icon: "10d",
          },
        ],
        temp: 25,
      },
      {
        dt: 1661875000,
        weather: [
          {
            id: 501,
            main: "Rain",
            description: "moderate rain",
            icon: "10d",
          },
        ],
        temp: {
          day: 25,
        },
      },
    ];
  });
  test("formatForecastWeather() format and destructure data", () => {
    expect(formatForecastWeather({ timezone, daily, hourly })).toEqual({
      daily: [{ icon: "10d", temp: 25, title: "Tue" }],
      hourly: [{ icon: "10d", temp: { day: 25 }, title: "04:56 PM" }],
      timezone: "Europe/London",
    });
  });
});

describe("check if getCurrentLocationHandler() sets current users location to fetch weather data", () => {
  let setQuery = jest.fn();

  test("getCurrentLocationHandler() set users current location", () => {
    expect(getCurrentLocationHandler(setQuery)).toBeUndefined();
  });
});
