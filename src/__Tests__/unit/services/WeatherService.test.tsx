import { rest } from "msw";
import { setupServer } from "msw/node";
import { dataLDN, ForecastsLDN } from "../../../assets";
import {
  setUrlParams,
  getFormattedWeatherData,
  getCurrentWeatherData,
  getForecastWeatherData,
} from "../../../services";

class NoErrorThrownError extends Error {}

const getError = async <TError,>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};
const server = setupServer(
  rest.get(`${process.env.REACT_APP_BASE_URL}/weather`, (req, res, ctx) => {
    req.url.searchParams.get("q");
    req.url.searchParams.get("appid");
    req.url.searchParams.get("units");

    return res(ctx.status(200), ctx.json(dataLDN));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**Test SetUrlParmas()  */
describe("Testing API Call in SetUrlParmas()", () => {
  describe("Testing Base Url", () => {
    test("success calling with base url", async () => {
      const response = await setUrlParams("weather", { q: "london" }, "metric");
      expect(response).toEqual(dataLDN);
    });
    test("fail: should throw error message if city or country is incorrect.", async () => {
      server.use(
        rest.get(
          `${process.env.REACT_APP_BASE_URL}/weather`,
          (req, res, ctx) => {
            req.url.searchParams.get("q");
            req.url.searchParams.get("appid");
            req.url.searchParams.get("units");

            return res(ctx.status(404));
          }
        )
      );

      const searchParams = { q: "de" };

      const error = await getError(async () =>
        setUrlParams("weather", searchParams, "metric")
      );
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toHaveProperty(
        "message",
        `Your request was sent, but we failed to fetch "${searchParams.q}" weather forecast./Please make sure the city is spelt correctly and try again.`
      );
    });
  });

  describe("Testing Onecall Url", () => {
    test("success calling with onecall url", async () => {
      const response = await setUrlParams("weather", { q: "london" }, "metric");
      expect(response).toEqual(dataLDN);
    });
    test("fail: should throw error message if city or country is incorrect.", async () => {
      server.use(
        rest.get(
          `${process.env.REACT_APP_BASE_URL}/weather`,
          (req, res, ctx) => {
            req.url.searchParams.get("q");
            req.url.searchParams.get("appid");
            req.url.searchParams.get("units");

            return res(ctx.status(404));
          }
        )
      );

      const searchParams = { q: "de" };

      const error = await getError(async () =>
        setUrlParams("weather", searchParams, "metric")
      );
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toHaveProperty(
        "message",
        `Your request was sent, but we failed to fetch "${searchParams.q}" weather forecast./Please make sure the city is spelt correctly and try again.`
      );
    });
  });
});

/**Test getCurrentWeatherData()  */
describe("getCurrentWeatherData()", () => {
  test("successfully obtain formatted current weather data", async () => {
    const response = await getCurrentWeatherData(
      "weather",
      { q: "london" },
      "metric"
    );
    expect(response).toHaveProperty("lat");
    expect(response).toHaveProperty("feels_like");
    expect(response).toHaveProperty("sunrise");
    expect(response).toHaveProperty("dt");
    expect(response).toHaveProperty("icon");
  });
  test("failure to throw error,if city or country incorrect.", async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BASE_URL}/weather`, (req, res, ctx) => {
        req.url.searchParams.get("q");
        req.url.searchParams.get("appid");
        req.url.searchParams.get("units");

        return res(ctx.status(404));
      })
    );

    const searchParams = { q: "de" };

    const error = await getError(async () =>
      getCurrentWeatherData("weather", searchParams, "metric")
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty(
      "message",
      `Your request was sent, but we failed to fetch "${searchParams.q}" weather forecast./Please make sure the city is spelt correctly and try again.`
    );
  });
});

/**Test getForecastWeatherData()  */
describe("getForecastWeatherData()", () => {
  test("successfully obtain formatted forcast weather data", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_ONECALL_URL}/onecall`,
        (req, res, ctx) => {
          req.url.searchParams.get("lat");
          req.url.searchParams.get("lon");
          req.url.searchParams.get("units");
          req.url.searchParams.get("exclude");

          return res(ctx.status(200), ctx.json(ForecastsLDN));
        }
      )
    );
    const response = await getForecastWeatherData("onecall", {
      lat: 51.5085,
      lon: -0.1257,
      exclude: "current,minutely,alerts",
      units: "metric",
    });

    expect(response).toHaveProperty("daily");
    expect(response).toHaveProperty("timezone");
    expect(response).toHaveProperty("hourly");
  });

  test("failure to throw error,if city or country incorrect.", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_ONECALL_URL}/onecall`,
        (req, res, ctx) => {
          req.url.searchParams.get("lat");
          req.url.searchParams.get("lon");
          req.url.searchParams.get("units");
          req.url.searchParams.get("exclude");

          return res(ctx.status(404));
        }
      )
    );

    const searchParams = {
      lat: 51.7685,
      lon: -0.1237,
      exclude: "current,minutely,alerts",
      units: "metric",
    };

    const error = await getError(async () =>
      getForecastWeatherData("onecall", searchParams)
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty(
      "message",
      'Your request was sent, but we failed to fetch "undefined" weather forecast./Please make sure the city is spelt correctly and try again.'
    );
  });
});

/**Test getFormattedWeatherData()  */
describe("getFormattedWeatherData()", () => {
  test("successfully obtain formatted forcast weather data", async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BASE_URL}/weather`, (req, res, ctx) => {
        req.url.searchParams.get("q");
        req.url.searchParams.get("appid");
        req.url.searchParams.get("units");

        return res(ctx.status(200), ctx.json(dataLDN));
      }),
      rest.get(
        `${process.env.REACT_APP_ONECALL_URL}/onecall`,
        (req, res, ctx) => {
          req.url.searchParams.get("lat");
          req.url.searchParams.get("lon");
          req.url.searchParams.get("units");
          req.url.searchParams.get("exclude");

          return res(ctx.status(200), ctx.json(ForecastsLDN));
        }
      )
    );
    const response = await getFormattedWeatherData(
      {
        q: "london",
      },
      "metric"
    );

    expect(response).toHaveProperty("daily");
    expect(response).toHaveProperty("timezone");
    expect(response).toHaveProperty("hourly");
  });

  test("failure to throw error,if city or country incorrect.", async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BASE_URL}/weather`, (req, res, ctx) => {
        req.url.searchParams.get("q");
        req.url.searchParams.get("appid");
        req.url.searchParams.get("units");

        return res(ctx.status(404));
      }),
      rest.get(
        `${process.env.REACT_APP_ONECALL_URL}/onecall`,
        (req, res, ctx) => {
          req.url.searchParams.get("lat");
          req.url.searchParams.get("lon");
          req.url.searchParams.get("units");
          req.url.searchParams.get("exclude");

          return res(ctx.status(404));
        }
      )
    );

    const searchParams = {
      q: "london",
    };
    const error = await getError(async () =>
      getFormattedWeatherData(searchParams, "metric")
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty("message", [
      `Your request was sent, but we failed to fetch "${searchParams.q}" weather forecast.`,
      `Please make sure the city is spelt correctly and try again.`,
    ]);
  });
});
