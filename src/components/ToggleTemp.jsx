import { Thermometer } from "lucide-react";
import React from "react";
import useStore from "../store/useStore";

const ToggleTemp = () => {
  const { unit, toggleUnit } = useStore();
  return (
    <div className="cursor-pointer  text-zinc-400 hover:text-white  text-sm md:text-xl font-semibold bg-zinc-700 py-2 md:p-0 px-4 ml-2 rounded-full md:rounded-full  duration-400 transition-colors w-15 md:w-20 text-center ">
      <button onClick={toggleUnit}>
        {unit === "C" ? (
          <div className="flex items-center cursor-pointer text-md">
            <div className="hidden md:block">
              <Thermometer />
            </div>{" "}
            °C
          </div>
        ) : (
          <div className="flex items-center cursor-pointer text-md">
            <div className="hidden md:block">
              <Thermometer />
            </div>{" "}
            °F
          </div>
        )}
      </button>
    </div>
  );
};

export default ToggleTemp;
