import React from "react";
import { UilHistoryAlt } from "@iconscout/react-unicons";
import { IErrorProps } from "@/types";
import { getCurrentLocationHandler } from "../../helpers";

export const UIError: React.FC<IErrorProps> = ({
  error,
  setError,
  setQuery,
}) => {
  /**
   * Clears error UI once user clicks on button.
   * sets Error state to default.
   * @return setQuery({lat,lon}) - sets Query state to users current location.
   */
  const clearErrorHandler = async () => {
    try {
      setError({
        title: "",
        message: [""],
        isError: false,
      });
      const response = await navigator.permissions.query({
        name: "geolocation",
      });
      if (response.state === "granted") {
        getCurrentLocationHandler(setQuery);
      } else return;
    } catch (error) {
      return;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center my-24 h-96 
        rounded-md text-white"
    >
      <h2
        className="text-white text-xl md:text-4xl font-medium pb-4
           border-b-2"
      >
        {error.title}
      </h2>
      <div
        className="flex flex-col items-start justify-center
            mt-3 px-3 py-6 w-full rounded-md text-white"
      >
        <p
          data-testid="error-msg"
          className="text-lg md:text-2xl font-medium mt-6"
        >
          {error.message[0]}
        </p>
        <p data-testid="error-msg" className="text-base md:text-xl font-medium">
          {error.message[1]}
        </p>
        <button
          type="button"
          className=" flex self-center bg-gradient-to-br from-orange-300 to-red-300 p-2 
            rounded-md shadow-sm space-x-2 items-center 
            justify-center gap-2 cursor-pointer mt-6 transition ease-out text-lg md:text-2xl
             text-white font-light hover:bg-gradient-to-br hover:from-green-700 
             hover:to-green-400 focus:outline-none outline-none"
          onClick={clearErrorHandler}
        >
          {error.isError && "Try Again!"}
          {error.isError && <UilHistoryAlt size={18} className=" fill-white" />}
        </button>
      </div>
    </div>
  );
};
