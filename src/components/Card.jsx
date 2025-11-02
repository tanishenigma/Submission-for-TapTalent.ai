import { Droplets, Gauge, Heart, HeartIcon, Wind } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTemperature } from "../hooks/useTemperature";
import { useFavoritesStore } from "../store/useFavoritesStore";

const Card = ({ data }) => {
  const { formatTemp } = useTemperature();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const cityId = data?.id;
  const favorite = isFavorite(cityId);

  const feelsK = data?.main?.feels_like;
  const humidity = data?.main?.humidity ?? "—";
  const pressure = data?.main?.pressure ?? "—";
  const windMs = data?.wind?.speed;
  const windKmh = typeof windMs === "number" ? (windMs * 3.6).toFixed(1) : "—";

  const name = data?.name ?? "—";
  const country = data?.sys?.country ? `, ${data.sys.country}` : "";
  const description = data?.weather?.[0]?.description ?? "";
  const icon = data?.weather?.[0]?.icon;
  const imgSrc = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : null;
  const imgAlt = description || "weather icon";

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(cityId);
    } else {
      addFavorite(data); // Pass full data object
    }
  };

  return (
    <div className="bg-zinc-700 text-white flex flex-col p-3 py-5 rounded-md m-4 hover:scale-105 transition-transform duration-200 w-80 relative">
      {/* Favorite Heart */}
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

      <Link
        to={`/weather/${cityId}`}
        state={{ data }}
        className="text-white no-underline hover:text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {name}
              <span className="text-sm text-zinc-300 ml-1">{country}</span>
            </h2>
            <p className="text-sm capitalize text-zinc-300">{description}</p>
          </div>
          {imgSrc && <img src={imgSrc} alt={imgAlt} className="w-20 h-20" />}
        </div>

        {/* Temperature & Stats */}
        <div className="flex items-start gap-4">
          {/* Temperature */}
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white">
              {formatTemp(data?.main?.temp) || "N/A"}
            </span>
            <span className="text-xs text-zinc-400 mt-1">
              Feels like {formatTemp(feelsK) || "N/A"}
            </span>
          </div>

          {/* Weather Stats */}
          <div className="ml-auto text-sm text-zinc-300 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Droplets className="text-blue-400" size={18} />
              <span>
                Humidity: <strong className="text-white">{humidity}%</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="text-purple-400" size={18} />
              <span>
                Pressure: <strong className="text-white">{pressure} hPa</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="text-cyan-400" size={18} />
              <span>
                Wind: <strong className="text-white">{windKmh} km/h</strong>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
