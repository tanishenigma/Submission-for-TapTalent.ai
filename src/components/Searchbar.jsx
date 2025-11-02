import { SearchIcon } from "lucide-react";
import { fetchCitySearch } from "../api/fetchCitySearch";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const cities = await fetchCitySearch(query);
        setResults(cities);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = async (city) => {
    if (!city || !city.id) {
      console.error("Invalid city data:", city);
      return;
    }

    setLoading(true);
    setQuery("");
    setResults([]);

    try {
      // Fetch full weather data using city ID
      const fetchData = (await import("../api/fetchCurrent")).default;
      const weatherData = await fetchData(city.id);

      if (weatherData) {
        navigate(`/weather/${city.id}`, { state: { data: weatherData } });
      } else {
        console.error("Failed to fetch weather data for city:", city.name);
      }
    } catch (error) {
      console.error("Error handling city selection:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form className="flex" onSubmit={(e) => e.preventDefault()}>
        <div className="p-2 ml-5 bg-zinc-600 rounded-md text-white flex items-center">
          <SearchIcon className="inline-block" size={20} />
          <input
            className="bg-transparent focus-within:outline-none pl-2 w-full"
            placeholder="Search for a city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      {loading && <p className="text-sm text-zinc-400 mt-1 ml-5">Loading...</p>}

      {results.length > 0 && (
        <ul className="absolute left-5 right-5 bg-zinc-800 mt-2 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelect(city)}
              className="p-3 cursor-pointer hover:bg-zinc-700 transition border-b border-zinc-700 last:border-0">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {city.name}, {city.country}
                </span>
                {city.state && (
                  <span className="text-xs text-zinc-400">{city.state}</span>
                )}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {city.lat.toFixed(2)}, {city.lon.toFixed(2)} • ID: {city.id}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
