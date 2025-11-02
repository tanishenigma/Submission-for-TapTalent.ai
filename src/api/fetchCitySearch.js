import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchCitySearch = async (query) => {
  if (!query) return [];

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct`,
      {
        params: { q: query, limit: 5, appid: apiKey },
        timeout: 10000,
      }
    );

    // Fetch weather data for each city to get the city ID
    const citiesWithIds = await Promise.all(
      response.data.map(async (city) => {
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                lat: city.lat,
                lon: city.lon,
                appid: apiKey,
              },
              timeout: 5000,
            }
          );
          return {
            id: weatherResponse.data.id,
            name: city.name,
            country: city.country,
            state: city.state,
            lat: city.lat,
            lon: city.lon,
          };
        } catch (error) {
          console.error(`Error fetching city ID for ${city.name}:`, error);
          return null;
        }
      })
    );

    return citiesWithIds.filter((city) => city !== null);
  } catch (error) {
    console.error("Error fetching city search data:", error);
    return [];
  }
};
