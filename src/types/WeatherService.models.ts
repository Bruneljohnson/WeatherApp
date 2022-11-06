export interface ISearchParams {
  [props: string]: string | number;
}
export interface ICoords {
  lat: number;
  lon: number;
}
export interface IError {
  title: string;
  message: string[] | string;
  isError?: boolean;
}

export interface IResponse {
  [props: string]: any;
}

/** These Types are for FormatCurrentWeather() */
export interface IFormatCurrentWeatherParams {
  coord: { lat: number; lon: number };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  name: string;
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number };
}

export interface IFormatCurrentWeatherReturn {
  lat: number;
  lon: number;
  temp: number;
  feels_like: number;
  temp_max: number;
  temp_min: number;
  humidity: number;
  name: string;
  dt: number;
  country: string;
  sunrise: number;
  sunset: number;
  speed: number;
  details: string;
  icon: string;
}

export type IFormatCurrentWeather = (
  data: IFormatCurrentWeatherParams
) => IFormatCurrentWeatherReturn;

/** These Types are for FormatForecastWeather() */
export interface IForecastHourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  pop: number;
}

export interface IForecastDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  pop: number;
}

export interface IFormatForecastWeatherParams {
  timezone: string;
  daily: IForecastDaily[];
  hourly: IForecastHourly[];
}

export interface IForecastObj {
  title: string;
  temp: number;
  icon: string;
}

export interface IFormatForecastWeatherReturn {
  daily: IForecastObj[];
  hourly: IForecastObj[];
  timezone: string;
}

export type IFormatForecastWeather = (
  data: IFormatForecastWeatherParams
) => IFormatForecastWeatherReturn;

/** These Types are for getCurrentWeatherData() */

type CurrentWeatherReturnTypes = Promise<IFormatCurrentWeatherReturn> | void;

export interface IGetCurrentWeatherService {
  (
    infoType: string,
    searchParams: ISearchParams,
    unit?: string
  ): CurrentWeatherReturnTypes;
}

/** These Types are for getForecastWeatherData() */

type ForecastWeatherReturnTypes = Promise<IFormatForecastWeatherReturn> | void;

export interface IGetForecastWeatherService {
  (infoType: string, searchParams: ISearchParams): ForecastWeatherReturnTypes;
}
