import React, { useEffect, useState } from "react";
import { getIconUrl, paginate, roundNumberTypeFields } from "../../helpers";
import { IForecastProps } from "../../types";

export const Forecast: React.FC<IForecastProps> = ({
  title,
  forecasts,
  reset,
}) => {
  const [activePage, setActivePage] = useState<number>(1);
  const { totalPages, forecasts: paginatedForecasts } = paginate(
    forecasts,
    activePage
  );

  const nextPageHandler = () => {
    if (totalPages <= activePage) return;
    setActivePage((prev) => prev + 1);
  };

  const prevPageHandler = (index: number) => {
    if (index !== 0 || activePage - 1 === 0) return;
    setActivePage((prev) => prev - 1);
  };

  useEffect(() => {
    setActivePage(1);
  }, [reset]);

  return (
    <>
      <div className="flex items-center justify-start mt-6">
        <h2 className="text-white text-xl md:text-2xl font-medium uppercase">
          {title}
        </h2>
      </div>
      <hr className="my-2" />

      <ul
        className="flex flex-row items-center justify-between text-white 
        overflow-x-hidden"
      >
        {
          /**
           * Maps forecast array.
           * @return {tsx elements}.
           */

          paginatedForecasts.map((forecast, index) => (
            <div
              data-testid={"forecast-item"}
              key={forecast?.title}
              className={` ${index === 0 ? `opacity-100` : `opacity-25`} ${
                index === paginatedForecasts.length - 1 || index === 0
                  ? `cursor-pointer`
                  : `cursor-default`
              } flex flex-col items-center justify-center `}
              onClick={
                index === paginatedForecasts.length - 1
                  ? nextPageHandler
                  : () => prevPageHandler(index)
              }
            >
              <p className="font-light text-sm md:text-xl">{forecast?.title}</p>
              <figure className="w-16 md:w-20 my-1">
                <img
                  src={getIconUrl(forecast?.icon)}
                  alt="forecast"
                  className="w-full"
                />
              </figure>
              <p className="font-medium text-base md:text-xl">
                {roundNumberTypeFields(forecast?.temp)}°
              </p>
            </div>
          ))
        }
      </ul>
    </>
  );
};
