import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TimeChart from "../components/Charts/TimeChart";
import PrecipitationChart from "../components/Charts/PrecipitationChart";
import WindChart from "../components/Charts/WindChart";
import CityCard from "../components/CityCard";
import ToggleTemp from "../components/ToggleTemp";

const CityWeather = () => {
  const location = useLocation();
  const data = location.state?.data;
  console.log("Data:", data);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">No city selected</h1>
        <p className="text-zinc-400 mb-6">Please search for a city first.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-zinc-600 rounded hover:bg-zinc-500 transition">
          Go Home
        </Link>
      </div>
    );
  }

  const cityId = data.id;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 ">
        <Link
          to="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition  bg-zinc-700 p-2 px-4 ml-2 rounded-full">
          <ArrowLeft className="" size={20} />
          <span className="">Back</span>
        </Link>

        <ToggleTemp />
      </div>

      {/* Main Card */}
      <CityCard />

      {/* Chart Section */}
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center">
        {cityId ? (
          <div className="mt-10 flex flex-col md:flex-row flex-wrap ">
            <TimeChart cityId={cityId} />
            <PrecipitationChart cityId={cityId} />
            <WindChart cityId={cityId} />
          </div>
        ) : (
          <div className="mt-10 text-center text-zinc-400">
            City ID unavailable for charts.
          </div>
        )}
      </div>
    </div>
  );
};

export default CityWeather;
