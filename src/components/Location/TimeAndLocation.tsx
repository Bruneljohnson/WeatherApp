import { formatToLocalTime } from "../../helpers";
import { ITimeAndLocationProps } from "@/types";
import React from "react";

export const TimeAndLocation: React.FC<ITimeAndLocationProps> = ({
  dt,
  name,
  timezone,
  country,
}) => {
  return (
    <>
      <div className="flex  items-center justify-center my-6">
        <p className="text-white text-base md:text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex  items-center justify-center my-3">
        <p
          data-testid="day-country"
          className="text-white text-2xl md:text-3xl font-medium 
        capitalize flex gap-2"
        >
          {name}, <span className="uppercase">{country}</span>
        </p>
      </div>
    </>
  );
};
