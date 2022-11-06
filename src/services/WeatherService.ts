import {
  IError,
  ISearchParams,
  IGetCurrentWeatherService,
  IGetForecastWeatherService,
} from "@/types";
import {
  formatCurrentWeather,
  formatForecastWeather,
  splitErrorMessage,
  TIMEOUT,
} from "../helpers";

/**
 * Function that sets the params for API Call depending on the type.
 * @param {String} infoType - a string that sets which url is called.
 * @param searchParams - object with all the required params for API Call.
 * @param unit - "metric" | "imperial" that sets the temperature format.
 * @returns Promise | Error
 */
export const setUrlParams = async (
  infoType: string,
  searchParams: ISearchParams,
  unit?: string
) => {
  try {
    const baseUrl =
      infoType === "weather"
        ? process.env.REACT_APP_BASE_URL
        : process.env.REACT_APP_ONECALL_URL;

    const params = Object.entries(searchParams)
      .map((params) => `${params.join("=")}&`)
      .join("");

    let url: string;
    if (unit) {
      url = `${baseUrl}/${infoType}?${params}appid=${process.env.REACT_APP_API_KEY}&units=${unit}`;
    } else {
      url = `${baseUrl}/${infoType}?${params}appid=${process.env.REACT_APP_API_KEY}`;
    }

    const response: any = await Promise.race([
      fetch(url, {
        method: `GET`,
      }),
      TIMEOUT(5),
    ]);

    if (!response.ok)
      throw new Error(
        `Your request was sent, but we failed to fetch "${searchParams.q}" weather forecast./Please make sure the city is spelt correctly and try again.`
      );

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Function that fetches the current citys weather data and formats it.
 * @param {String} infoType - a string that sets which url is called.
 * @param searchParams - object with all the required params for API Call.
 * @param unit - "metric" | "imperial" that sets the temperature format.
 * @returns {CurrentWeatherReturnTypes}
 */
export const getCurrentWeatherData: IGetCurrentWeatherService = async (
  infoType,
  searchParams,
  unit
) => {
  try {
    const response = await setUrlParams(infoType, searchParams, unit);

    return formatCurrentWeather(response);
  } catch (error) {
    throw error;
  }
};

/**
 * Function that fetches the current city's forecast data and formats it.
 * @param {String} infoType - a string that sets which url is called.
 * @param searchParams - object with all the required params for API Call.
 * @returns {ForecastWeatherReturnType}
 */
export const getForecastWeatherData: IGetForecastWeatherService = async (
  infoType,
  searchParams
) => {
  try {
    const response = await setUrlParams(infoType, searchParams);

    return formatForecastWeather(response);
  } catch (error) {
    throw error;
  }
};

/**
 * Function that returns the formatted data of the current city and its forecasts.
 * @param searchParams - object with all the required params for API Call.
 * @param unit - "metric" | "imperial" that sets the temperature format.
 * @returns {Object} {...formattedCurrentWeather, ...formattedForecastWeater} - this will contain all the data required for thsi app.
 */
export const getFormattedWeatherData = async (
  searchParams: ISearchParams,
  unit: string
) => {
  try {
    const formattedCurrentWeather = await getCurrentWeatherData(
      "weather",
      searchParams,
      unit
    );

    if (formattedCurrentWeather) {
      const { lon, lat } = formattedCurrentWeather;

      const formattedForeCastWeather = await getForecastWeatherData("onecall", {
        lat,
        lon,
        units: unit,
        exclude: "current,minutely,alerts",
      });

      return { ...formattedCurrentWeather, ...formattedForeCastWeather };
    } else {
      throw new Error(
        `Your request was sent, but we failed to fetch "${searchParams.q}" weather forecast./Please make sure the city is spelt correctly and try again.`
      );
    }
  } catch (error: any) {
    const message = splitErrorMessage(error.message);
    const err: IError = {
      title: "Unable to retrieve weather forcast.",
      message,
      isError: true,
    };
    throw err;
  }
};
