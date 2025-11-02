import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchWeatherTrends = async (cityId) => {
  if (!cityId || !apiKey) {
    console.error("Missing cityId or API key");
    return null;
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          id: cityId,
          appid: apiKey,
        },
        timeout: 10000,
      }
    );

    const data = response.data;

    const hourly = data.list.slice(0, 12).map((item) => ({
      dt: item.dt,
      temp: item.main.temp,
    }));

    const dailyMap = {};
    data.list.forEach((item) => {
      const day = new Date(item.dt * 1000).toDateString();
      if (!dailyMap[day]) dailyMap[day] = { temps: [], dt: item.dt };
      dailyMap[day].temps.push(item.main.temp);
    });

    const daily = Object.values(dailyMap).map((d) => ({
      dt: d.dt,
      temp: {
        day: d.temps.reduce((a, b) => a + b, 0) / d.temps.length,
      },
    }));

    return { hourly, daily };
  } catch (error) {
    console.error(
      "Error fetching weather trends:",
      error.response?.data || error.message
    );
    return null;
  }
};
