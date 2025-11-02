import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const fetchData = async (cityId) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          id: cityId,
          appid: apiKey,
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default fetchData;
