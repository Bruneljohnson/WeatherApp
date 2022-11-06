import React from "react";
import { ITemperatureProps } from "@/types";
import {
  formatToLocalTime,
  getIconUrl,
  roundNumberTypeFields,
} from "../../helpers";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";

export const Temperature: React.FC<ITemperatureProps> = ({
  details,
  realFell,
  icon,
  humidity,
  windSpeed,
  sunrise,
  sunset,
  temp,
  maxTemp,
  minTemp,
  timezone,
  units,
}) => {
  return (
    <>
      <div
        data-testid="details"
        className="flex items-center justify-center py-6 
      text-xl md:text-2xl text-cyan-300 capitalize"
      >
        <p>{details}</p>
      </div>
      <div
        data-testid="small-details"
        className="flex flex-row items-center mt-3 justify-between 
      text-white py-3"
      >
        <figure className="flex items-center justify-center w-24">
          <img src={getIconUrl(icon)} alt={details} className="w-full" />
        </figure>
        <p className="text-5xl">{roundNumberTypeFields(temp)}°</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real Fell:
            <span className="font-medium ml-1">
              {roundNumberTypeFields(realFell)}°
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">
              {roundNumberTypeFields(humidity)}%
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">
              {roundNumberTypeFields(windSpeed)}{" "}
              {units === "metric" ? "mp/h" : "km/h"}
            </span>
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:flex md:flex-row items-center 
        justify-center space-x-2  text-white text-base py-3 "
      >
        <div className="flex flex-row items-center justify-center space-x-2">
          <UilSun />
          <p className="font-light">
            Rise:{" "}
            <span className="font-medium ml-1">
              {formatToLocalTime(sunrise, timezone, "hh:mm a")}
            </span>
          </p>
        </div>
        <p className="font-light hidden md:block">|</p>
        <div className="flex flex-row items-center justify-center space-x-2">
          <UilSunset />
          <p className="font-light">
            Set:{" "}
            <span className="font-medium ml-1">
              {formatToLocalTime(sunset, timezone, "hh:mm a")}
            </span>
          </p>
        </div>
        <p className="font-light hidden md:block">|</p>
        <div className="flex flex-row items-center justify-center space-x-2">
          <UilArrowUp />
          <p className="font-light">
            High:{" "}
            <span className="font-medium ml-1">
              {roundNumberTypeFields(maxTemp)}°
            </span>
          </p>
        </div>
        <p className="font-light hidden md:block">|</p>
        <div className="flex flex-row items-center justify-center space-x-2">
          <UilArrowDown />
          <p className="font-light">
            Low:{" "}
            <span className="font-medium ml-1">
              {roundNumberTypeFields(minTemp)}°
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
