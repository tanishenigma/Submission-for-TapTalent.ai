import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Wind,
  Droplets,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Sun,
  Thermometer,
  Heart,
  HeartIcon,
} from "lucide-react";
import { useTemperature } from "../hooks/useTemperature";
import { useFavoritesStore } from "../store/useFavoritesStore";

const CityCard = () => {
  const { formatTemp } = useTemperature();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const location = useLocation();
  const data = location.state?.data;

  const formatTime = (ts) =>
    ts
      ? new Date(ts * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

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

  const icon = data.weather?.[0]?.icon;
  const imgSrc = icon
    ? `https://openweathermap.org/img/wn/${icon}@4x.png`
    : null;
  const description = data.weather?.[0]?.description ?? "";
  const cityId = data.id;

  const favorite = isFavorite(cityId);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(cityId);
    } else {
      addFavorite(data);
    }
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-8 shadow-2xl border border-zinc-700 relative">
      <div className="absolute top-2 right-2 z-10">
        {favorite ? (
          <HeartIcon
            className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition"
            fill="currentColor"
            onClick={handleFavoriteClick}
          />
        ) : (
          <Heart
            className="w-6 h-6 text-zinc-300 cursor-pointer hover:text-red-400 hover:scale-110 transition"
            onClick={handleFavoriteClick}
          />
        )}
      </div>
      {/* City Header */}
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-4xl font-bold mb-2">
            {data.name ?? "Unknown"}
            <span className="text-sm opacity-0 md:opacity-100 md:text-2xl text-zinc-400 ml-2">
              {data.sys?.country ?? ""}
            </span>
          </h1>
          <p className="text-zinc-300 capitalize text-lg">{description}</p>
        </div>

        {imgSrc && (
          <img
            src={imgSrc}
            alt={description}
            className="w-10 h-10 md:w-32 md:h-32 drop-shadow-lg"
          />
        )}
      </div>

      {/* Temperature Display */}
      <div className="flex items-end gap-4 mb-8">
        <div className="text-6xl md:text-7xl font-bold">
          {formatTemp(data.main?.temp)}
        </div>
        <div className="text-xs md:text-xl text-zinc-400 mb-2">
          Feels like {formatTemp(data.main?.feels_like)}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-zinc-700 rounded-lg p-4 flex items-center gap-3">
          <Droplets className="text-blue-400" size={24} />
          <div>
            <p className="text-sm text-zinc-400">Humidity</p>
            <p className="text-xl font-semibold">
              {data.main?.humidity ?? "—"}%
            </p>
          </div>
        </div>
        <div className="bg-zinc-700 rounded-lg p-4 flex items-center gap-3">
          <Wind className="text-cyan-400" size={24} />
          <div>
            <p className="text-sm text-zinc-400">Wind</p>
            <p className="text-xl font-semibold">
              {data.wind?.speed
                ? (data.wind.speed * 3.6).toFixed(1) + " km/h"
                : "—"}
            </p>
          </div>
        </div>
        <div className="bg-zinc-700 rounded-lg p-4 flex items-center gap-3">
          <Gauge className="text-purple-400" size={24} />
          <div>
            <p className="text-sm text-zinc-400">Pressure</p>
            <p className="text-xl font-semibold">
              {data.main?.pressure ?? "—"} hPa
            </p>
          </div>
        </div>
        <div className="bg-zinc-700 rounded-lg p-4 flex items-center gap-3">
          <Eye className="text-gray-400" size={24} />
          <div>
            <p className="text-sm text-zinc-400">Visibility</p>
            <p className="text-xl font-semibold">
              {data.visibility
                ? (data.visibility / 1000).toFixed(1) + " km"
                : "—"}
            </p>
          </div>
        </div>
        <div className="bg-zinc-700 rounded-lg p-4 flex items-center gap-3">
          <Thermometer className="text-red-400" size={24} />
          <div>
            <p className="text-sm text-zinc-400">Dew Point</p>
            <p className="text-xl font-semibold">
              {data?.dew_point ? data.dew_point + "°C" : "—"}
            </p>
          </div>
        </div>
        <div className="bg-zinc-700 rounded-lg p-4 flex items-center gap-3">
          <Sun className="text-yellow-400" size={24} />
          <div>
            <p className="text-sm text-zinc-400">UV Index</p>
            <p className="text-xl font-semibold">{data?.uvi ?? "—"}</p>
          </div>
        </div>

        <div className="col-span-2 gap-4 bg-zinc-700 rounded-lg p-4">
          <div className="flex items-center justify-around gap-3 flex-1">
            <div className="flex justify-center items-center gap-3">
              <Sunrise className="text-orange-400" size={28} />
              <div>
                <p className="text-sm text-zinc-400">Sunrise</p>
                <p className="text-lg font-semibold">
                  {formatTime(data.sys?.sunrise)}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <Sunset className="text-amber-400" size={28} />
              <div>
                <p className="text-sm text-zinc-400">Sunset</p>
                <p className="text-lg font-semibold">
                  {formatTime(data.sys?.sunset)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-zinc-700 flex flex-wrap gap-4 text-sm text-zinc-400">
        <span>
          Coordinates: {data.coord?.lat?.toFixed(2)},{" "}
          {data.coord?.lon?.toFixed(2)}
        </span>
        <span>•</span>
        <span>Cloud Cover: {data.clouds?.all ?? "—"}%</span>
        {data.rain?.["1h"] && (
          <>
            <span>•</span>
            <span>Rain (1h): {data.rain["1h"]} mm</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CityCard;
