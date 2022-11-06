import { Dispatch, SetStateAction } from "react";
import { IError, IForecastObj, ISearchParams } from "./WeatherService.models";

export type EventFn = (event: any) => void;

export interface IHTMLINPUTProps {
  setQuery: Dispatch<SetStateAction<ISearchParams>>;
  setUnits: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<IError>>;
  units: string;
}

export interface ITopButtonProps {
  setQuery: Dispatch<SetStateAction<ISearchParams>>;
  setError: Dispatch<SetStateAction<IError>>;
}

export interface IForecastProps {
  title: string;
  forecasts: IForecastObj[];
  reset: boolean;
}

export interface ITimeAndLocationProps {
  name: string;
  timezone: string;
  country: string;
  dt: number;
}
export interface IErrorProps {
  error: IError;
  setError: Dispatch<SetStateAction<IError>>;
  setQuery: Dispatch<SetStateAction<ISearchParams>>;
}

export interface ITemperatureProps {
  details: string;
  timezone: string;
  temp: number;
  icon: string;
  realFell: number;
  humidity: number;
  windSpeed: number;
  sunrise: number;
  sunset: number;
  maxTemp: number;
  minTemp: number;
  units: string;
}

export interface IAlertProps {
  message: string;
  type: string;
}
