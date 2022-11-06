import { ITopButtonProps } from "@/types";
import React from "react";
import { cities } from "../../assets";

export const TopButton: React.FC<ITopButtonProps> = ({
  setQuery,
  setError,
}) => {
  return (
    <div className="flex items-center justify-around my-6 w-full">
      {/**
       * Maps cities array.
       * @return {tsx elements}.
       */}
      {cities.map((city, i) => (
        <button
          key={i + city.id + city.name}
          type="button"
          data-testid={"topButton" + i}
          onClick={() => {
            setQuery({ q: city.name });
            setError({
              title: "",
              message: [""],
              isError: false,
            });
          }}
          className="text-white text-lg font-medium capitalize transition 
          ease-out hover:scale-125 focus:outline-none outline-none"
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};
