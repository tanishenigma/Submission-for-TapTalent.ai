import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchWindTrends = async (cityId) => {
  if (!cityId || !apiKey) {
    console.error("Missing cityId or API key");
    return null;
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          id: cityId,
          units: "metric",
          appid: apiKey,
        },
        timeout: 10000,
      }
    );

    const data = response.data;

    // Hourly wind data (next 12 hours)
    const hourly = data.list.slice(0, 12).map((item) => ({
      dt: item.dt,
      speed: item.wind.speed,
      direction: item.wind.deg,
      gust: item.wind.gust || item.wind.speed,
    }));

    // Daily wind averages
    const dailyMap = {};

    data.list.forEach((item) => {
      const day = new Date(item.dt * 1000).toDateString();

      if (!dailyMap[day]) {
        dailyMap[day] = {
          speeds: [],
          directions: [],
          gusts: [],
          dt: item.dt,
        };
      }

      dailyMap[day].speeds.push(item.wind.speed);
      dailyMap[day].directions.push(item.wind.deg);
      dailyMap[day].gusts.push(item.wind.gust || item.wind.speed);
    });

    const daily = Object.values(dailyMap).map((d) => ({
      dt: d.dt,
      speed: d.speeds.reduce((a, b) => a + b, 0) / d.speeds.length,
      direction: d.directions.reduce((a, b) => a + b, 0) / d.directions.length,
      gust: Math.max(...d.gusts),
    }));

    return { hourly, daily };
  } catch (error) {
    console.error(
      "Error fetching wind trends:",
      error.response?.data || error.message
    );
    return null;
  }
};
