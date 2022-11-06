import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { IHTMLINPUTProps } from "../../types/UIProps.model";
import { getCurrentLocationHandler, splitErrorMessage } from "../../helpers";

export const Input: React.FC<IHTMLINPUTProps> = ({
  setQuery,
  setUnits,
  setError,
  units: unitFormat,
}) => {
  const [city, setCity] = useState<string>("");

  /**
   * Function that stores input value in City state variable.
   * @param event - the event of the onChange
   * @return {void} updates city state.
   */
  const cityInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCity(event.target.value);
  };

  /**
   * Function that sets User's current location.
   * @return {void} updates Query state.
   */
  /** */
  const locationHandler = async () => {
    try {
      const response = await navigator.permissions.query({
        name: "geolocation",
      });
      if (response.state === "granted") {
        getCurrentLocationHandler(setQuery);
      } else {
        throw new Error(
          "We tried to accces your current location, but access was denied./Please allow access and try again."
        );
      }
    } catch (error: any) {
      const message = splitErrorMessage(error.message);
      setError({
        title: "Denied access to your current location.",
        message,
        isError: true,
      });
    }
  };

  /**
   * Function that triggers get-http call with user input data.
   * @param event - the event of the form onSumbit
   * @returns {void} updates Query state and resets City state.
   */
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!city) return;

    setQuery({ q: city });
    setCity("");
  };

  /**
   * Function that switches the temperature unit
   * @param {string} unit - "metric" || "imperial"
   * @returns {void} updates Units state.
   */
  const changeUnitHandler = (unit: string) => {
    if (unitFormat === unit) return;
    setUnits(unit);
  };

  return (
    <div className={`flex flex-col md:flex-row justify-around my-6`}>
      <form
        data-testid={"city-form"}
        className={`flex flex-row w-full md:w-4/6 justify-center items-align space-x-4 `}
        onSubmit={submitFormHandler}
      >
        <input
          data-testid={"city-input"}
          id={"city-input"}
          type="text"
          value={city}
          onChange={cityInputChangeHandler}
          placeholder="Search for city..."
          className={`text-xl font-light p-2 w-full shadow-xl rounded-md bg-white 
          first-letter:capitalize focus:outline-none outline-none placeholder:lowercase`}
          required
        />
        <button
          type="submit"
          className="cursor-pointer transition ease-out hover:scale-125 
          focus:outline-none outline-none"
        >
          <UilSearch size={18} className=" fill-white" />
        </button>

        <button
          type="button"
          className="cursor-pointer transition ease-out hover:scale-125 
          focus:outline-none outline-none"
          onClick={locationHandler}
        >
          <UilLocationPoint size={18} className=" fill-white" />
        </button>
      </form>
      <div
        className="flex flex-row items-center justify-start md:justify-end 
      w-full md:w-1/6 gap-2 mt-2 md:mt-0"
      >
        <button
          name="metric"
          className="text-xl md:text-2xl text-white font-light focus cursor-pointer 
          transition ease-out hover:scale-125 focus:outline-none outline-none"
          onClick={() => changeUnitHandler("metric")}
        >
          °C
        </button>
        <p className="text-xl md:text-2xl text-white font-light">|</p>
        <button
          name="imperial"
          className="text-xl md:text-2xl text-white font-light cursor-pointer 
          transition ease-out hover:scale-125 focus:outline-none outline-none"
          onClick={() => changeUnitHandler("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};
