import React from "react";
import { IAlertProps } from "@/types";
import {
  UilExclamationTriangle,
  UilCheckCircle,
  UilInfoCircle,
} from "@iconscout/react-unicons";

export const Alerts: React.FC<IAlertProps> = ({ type, message }) => {
  return (
    <div
      data-testid="alerts"
      className={`fixed top-1 right-7 md:right-10 z-20 text-lg md:text-2xl font-medium flex items-center 
      justify-center gap-2 text-white shadow-xl py-7 px-10 md:w-2/4 
      lg:w-2/5 rounded-md ${
        type === "error"
          ? `bg-red-500`
          : type === "info"
          ? `bg-blue-500`
          : `bg-green-500`
      }`}
    >
      {type === "error" && <UilExclamationTriangle size={20} />}
      {type === "success" && <UilCheckCircle size={20} />}
      {type === "info" && <UilInfoCircle size={20} />}
      {message}
    </div>
  );
};
