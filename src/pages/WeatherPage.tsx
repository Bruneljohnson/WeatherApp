import React, { useEffect, useState } from "react";
import { UIError } from "../components/Error";
import { TopButton } from "../components/TopButtons";
import { Input } from "../components/Input";
import { TimeAndLocation } from "../components/Location";
import { Temperature } from "../components/Temperature";
import { Forecast } from "../components/Forecast";
import { getFormattedWeatherData } from "../services";
import { setBackgroundColor } from "../helpers";
import { IError, IResponse, ISearchParams } from "@/types/";
import { Alerts } from "../components/Ui";

export const WeatherPage: React.FC = () => {
  const [unitFormat, setUnitFormat] = useState<string>("metric");
  const [weather, setWeather] = useState<IResponse>({});
  const [resetForecastPage, setResetForecastPage] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    type: string;
    message: string;
    isAlert: boolean;
  }>({
    type: "",
    message: "",
    isAlert: false,
  });
  const [query, setQuery] = useState<ISearchParams>({ q: "london" });
  const [error, setError] = useState<IError>({
    title: "",
    message: [""],
    isError: false,
  });

  useEffect(() => {
    /**
     * Async function that fetches weather data from database.
     * @return {}:IResponse - Stores response obj in state variable
     */
    const fetchWeather = async () => {
      const message = query?.q ?? "current location";
      try {
        setAlert({
          type: "info",
          message: `Fetching weather for ${message}.`,
          isAlert: true,
        });
        const data = await getFormattedWeatherData(query, unitFormat);
        setAlert({
          type: "success",
          message: `Successfully fetched weather for ${data.name},${data.country}`,
          isAlert: true,
        });
        setWeather(data);
        setResetForecastPage(true);
      } catch (err: any) {
        setAlert({
          type: "error",
          message: `Failed to fetch weather for ${message}`,
          isAlert: true,
        });

        setError({
          title: err.title,
          message: err.message,
          isError: err.isError,
        });
      }
    };

    fetchWeather();

    const AlertTimer = setTimeout(() => {
      setAlert({
        type: "",
        message: "",
        isAlert: false,
      });
      setResetForecastPage(false);
    }, 2000);

    return () => clearTimeout(AlertTimer);
  }, [query, unitFormat]);

  return (
    <div
      className={`mx-auto w-5/6 md:max-w-screen-sm mt-4 py-5 px-6 md:px-24 h-fit shadow-xl
  shadow-gray-400 rounded-md bg-gradient-to-br ${setBackgroundColor(
    weather,
    unitFormat
  )}`}
    >
      <TopButton setQuery={setQuery} setError={setError} />
      <Input
        setQuery={setQuery}
        units={unitFormat}
        setUnits={setUnitFormat}
        setError={setError}
      />

      {error.isError && (
        <UIError error={error} setError={setError} setQuery={setQuery} />
      )}

      {weather.name && !error.isError && (
        <>
          <TimeAndLocation
            name={weather.name}
            dt={weather.dt}
            country={weather.country}
            timezone={weather.timezone}
          />
          <Temperature
            units={unitFormat}
            sunrise={weather.sunrise}
            sunset={weather.sunset}
            details={weather.details}
            timezone={weather.timezone}
            realFell={weather.feels_like}
            humidity={weather.humidity}
            windSpeed={weather.speed}
            icon={weather.icon}
            temp={weather.temp}
            maxTemp={weather.temp_max}
            minTemp={weather.temp_min}
          />

          <Forecast
            title="hourly forecast"
            reset={resetForecastPage}
            forecasts={weather.hourly}
          />
          <Forecast
            title="daily forecast"
            reset={resetForecastPage}
            forecasts={weather.daily}
          />
        </>
      )}
      {alert.isAlert && <Alerts message={alert.message} type={alert.type} />}
    </div>
  );
};
