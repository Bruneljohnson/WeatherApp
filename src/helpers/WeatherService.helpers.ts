import {
  IFormatCurrentWeather,
  IFormatForecastWeather,
  IResponse,
  ISearchParams,
} from "@/types";
import { DateTime } from "luxon";
import { Dispatch, SetStateAction } from "react";

/**
 * Function that delays sync code execution by number of seconds
 * @param {Number} seconds
 * @returns Promise<void>
 */
export const wait = (seconds: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

/**
 * Function that Throw an error if timeout reached after a number of seconds.
 * @param {Number} sec
 * @returns Promise<Error>
 */
export const TIMEOUT = (sec: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request Failed! Session Timeout after ${sec} seconds`));
    }, sec * 1000);
  });
};

/**
 * Function that formats city's current weather data from the Api Response obj.
 * @param {IFormatCurrentWeatherParams} - these are destructured from the Api Response obj.
 * @returns {IFormatCurrentWeatherReturn} - required data of the current city weather .
 */
export const formatCurrentWeather: IFormatCurrentWeather = ({
  coord,
  main,
  name,
  dt,
  sys,
  weather,
  wind,
}) => {
  const { lat, lon } = coord;
  const { temp, feels_like, temp_min, temp_max, humidity } = main;
  const { country, sunrise, sunset } = sys;
  const { speed } = wind;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
    details,
    icon,
  };
};

/**
 * Function that formats timestamp into local time using Luxon.
 * @param {Number} secs - the timestamp needed to be converted.
 * @param {String} timezone - the timezone of the city/ country
 * @param {String}format - the string format output desired.
 * @returns {String} - formatted time in the format required.
 */
export const formatToLocalTime = (
  secs: number,
  timezone: string,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(timezone).toFormat(format);

/**
 * Function that paginates forecast arrays into pages.
 * @param {Array} forecasts
 * @param {Number} page - sets which page to show on Ui
 * @param {Number} perPage - sets the number of items per page
 * @returns {Obj} - contains paginated forcasts array
 */
export const paginate = (
  forecasts: any[],
  page: number,
  perPage: number = 5
) => {
  const offset = perPage * (page - 1);
  const totalPages = Math.ceil(forecasts.length / perPage);
  const paginatedForecasts = forecasts.slice(offset, perPage * page);

  return {
    previousPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: forecasts.length,
    totalPages: totalPages,
    forecasts: paginatedForecasts,
  };
};

/**
 * Function that formats city's forecasts from the Api Response obj.
 * @param {IFormatForecastWeatherParams} - daily(Array), hourly(Array) and timezone(String) required
 * @returns {IFormatForecastWeatherReturn} - combinds timezone,hourly & daily forecasts arrays in an object
 */
export const formatForecastWeather: IFormatForecastWeather = ({
  timezone,
  daily,
  hourly,
}) => {
  const dailyForecast = daily.slice(1, 6).map((daily: any) => {
    return {
      title: formatToLocalTime(daily.dt, timezone, "ccc"),
      temp: daily.temp.day,
      icon: daily.weather[0].icon,
    };
  });

  const hourlyForecast = hourly.slice(1, 21).map((hourly: any) => {
    return {
      title: formatToLocalTime(hourly.dt, timezone, "hh:mm a"),
      temp: hourly.temp,
      icon: hourly.weather[0].icon,
    };
  });

  return { daily: dailyForecast, hourly: hourlyForecast, timezone };
};

/**
 * Function that splits Error message into an array.
 * @param {String} message - error message recieved from API catch block.
 * @returns {Array}
 */
export const splitErrorMessage = (message: string): string[] | string =>
  message.includes("/") ? message.split("/") : message;

/**
 * Function that rounds up number to nearest integer.
 * @param {Number} num - num is the fields with number types from our API Obj.
 * @returns
 */
export const roundNumberTypeFields = (num: number) => Math.round(num);

// get current Location of user
/**
 * Function that sets the user's current location.
 * @param {Dispatch<SetStateAction<ISearchParams>>} setQuery - this is used to update query state.
 * @return {void}
 */
export const getCurrentLocationHandler = (
  setQuery: Dispatch<SetStateAction<ISearchParams>>
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setQuery({ lat, lon });
    });
  }
};

/**
 * Function that dynamically returns the image src url for an icon.
 * @param {String} code - icon code to show image.
 * @returns {String} - used for image src attributes.
 */
export const getIconUrl = (code: string): string =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

/**
 * Function that sets the time of day (day/night)
 * @param {Number} dt - this is the current timestamp of the city fetched.
 * @param {Number} sunset - sunset timestamp of current city and date.
 * @param {Number} sunrise - sunrise timestamp of current city and date.
 * @returns {String} "night" | "day"
 */
export const setNightOrDay = (dt: number, sunset: number, sunrise: number) => {
  if (
    (dt > sunset && dt > sunrise) ||
    (dt > sunset && dt < sunrise) ||
    (dt < sunrise && dt < sunset)
  )
    return "night";

  if (dt > sunrise && dt < sunset) return "day";
};

/**
 * Function that sets the background colour depends on time of day & temperature
 * @param {IResponse} weather
 * @param {String} units - units of temperature format "metric" | "imperial"
 * @returns {String} - tailwindCSS to be used in className attribute.
 */
export const setBackgroundColor = (weather: IResponse, units: string) => {
  if (!weather) return `from-cyan-700 to-blue-700`;

  const timeOfDay = setNightOrDay(weather.dt, weather.sunset, weather.sunrise);

  if (timeOfDay === "night") return `from-gray-600 to-black`;
  if (timeOfDay === "day") {
    const threshold = units === "metric" ? 20 : 68;

    if (weather.temp >= threshold) return `from-yellow-700 to-orange-700`;
    else return `from-cyan-700 to-blue-700`;
  }
};
