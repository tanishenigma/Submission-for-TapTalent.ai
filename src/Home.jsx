import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import fetchData from "./api/fetchCurrent";
import { getRandomCities } from "./data/cities";
import { useFavoritesStore } from "./store/useFavoritesStore";
import { Globe, Heart } from "lucide-react";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getFavorites } = useFavoritesStore();
  const favorites = getFavorites();
  useEffect(() => {
    const loadRandomCities = async () => {
      setLoading(true);
      const randomCities = getRandomCities(10);

      const results = await Promise.all(
        randomCities.map(async (city) => {
          try {
            const data = await fetchData(city.id);
            return data;
          } catch (error) {
            console.error(`Failed to fetch ${city.name}:`, error);
            return null;
          }
        })
      );

      const validResults = results.filter(
        (data) => data && data.id && data.name && data.main
      );

      setWeatherData(validResults);
      setLoading(false);
    };

    loadRandomCities();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center text-white">
          <p className="text-xl">Loading cities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="bg-zinc-800/50 rounded-xl p-6 ">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-red-500 " size={28} fill="currentColor" />
            <div>
              <h2 className="text-2xl font-bold text-white">My Favorites</h2>
              <p className="text-zinc-400 text-sm">
                {favorites.length} {favorites.length === 1 ? "city" : "cities"}{" "}
                saved
              </p>
            </div>
          </div>

          <div className="flex justify-start flex-wrap ">
            {favorites.map((fav) => (
              <Card key={fav.id} data={fav.data} />
            ))}
          </div>
        </div>
      )}

      {/* Explore Cities Section */}
      <div>
        <div className="flex items-center gap-3 mb-6 mt-10">
          <Globe className="text-cyan-500" size={28} />
          <div>
            <h2 className="text-2xl font-bold text-white">Explore Cities</h2>
            <p className="text-zinc-400 text-sm">
              Discover weather around the world
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {weatherData.length === 0 ? (
            <div className="text-center text-white p-8">
              <p className="text-xl">No cities available</p>
              <p className="text-zinc-400 mt-2">Try refreshing the page</p>
            </div>
          ) : (
            weatherData.map((data) => <Card key={data.id} data={data} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
