import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchPrecipitationTrends = async (cityId) => {
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

    const dailyMap = {};

    data.list.forEach((item) => {
      const day = new Date(item.dt * 1000).toDateString();
      const total = (item.rain?.["3h"] || 0) + (item.snow?.["3h"] || 0);

      if (!dailyMap[day]) dailyMap[day] = { values: [], dt: item.dt };

      dailyMap[day].values.push(total);
    });

    const daily = Object.values(dailyMap).map((d) => ({
      dt: d.dt,
      precipitation: d.values.reduce((a, b) => a + b, 0),
    }));

    return { daily };
  } catch (error) {
    console.error(
      "Error fetching precipitation trends:",
      error.response?.data || error.message
    );
    return null;
  }
};
