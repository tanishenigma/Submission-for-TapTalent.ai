import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchWindTrends } from "../../api/fetchWind";

const WindChart = ({ cityId }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const degreesToDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  useEffect(() => {
    if (!cityId) return;

    const loadData = async () => {
      setLoading(true);
      const result = await fetchWindTrends(cityId);
      if (result) {
        const formattedHourly = result.hourly.map((item) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          speed: parseFloat(item.speed.toFixed(1)),
          gust: parseFloat(item.gust.toFixed(1)),
          direction: degreesToDirection(item.direction),
        }));

        const formattedDaily = result.daily.map((item) => ({
          day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          speed: parseFloat(item.speed.toFixed(1)),
          gust: parseFloat(item.gust.toFixed(1)),
          direction: degreesToDirection(item.direction),
        }));

        setHourlyData(formattedHourly);
        setDailyData(formattedDaily);
      }
      setLoading(false);
    };

    loadData();
  }, [cityId]);

  if (loading) {
    return (
      <div className="text-center text-gray-400 p-8 bg-zinc-800 rounded-xl">
        Loading wind data...
      </div>
    );
  }

  if (hourlyData.length === 0 && dailyData.length === 0) {
    return (
      <div className="text-center text-red-400 p-8 bg-zinc-800 rounded-xl">
        No wind data available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Hourly Wind Chart */}
      <div className="p-6 bg-zinc-800 rounded-xl shadow-lg">
        <h2 className="text-center text-xl font-semibold text-white mb-4">
          Hourly Wind Speed & Gusts
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={hourlyData}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="time"
              stroke="#ddd"
              tick={{ fill: "#aaa" }}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis
              stroke="#ddd"
              label={{
                value: "Speed (m/s)",
                position: "insideLeft",
                angle: -90,
                fill: "#ddd",
                offset: 10,
              }}
              tick={{ fill: "#aaa" }}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "8px",
              }}
              formatter={(value, name, props) => {
                if (name === "speed")
                  return [
                    `${value} m/s (${props.payload.direction})`,
                    "Wind Speed",
                  ];
                return [`${value} m/s`, "Gust"];
              }}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Wind Speed"
            />
            <Line
              type="monotone"
              dataKey="gust"
              stroke="#f97316"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              name="Gusts"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-zinc-400 text-center mt-3">
          Wind speed and gust forecast for the next 12 hours
        </p>
      </div>

      {/* Daily Wind Chart */}
      <div className="p-6 bg-zinc-800 rounded-xl shadow-lg">
        <h2 className="text-center text-xl font-semibold text-white mb-4">
          Daily Average Wind Speed
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={dailyData}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="day"
              stroke="#ddd"
              tick={{ fill: "#aaa" }}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis
              stroke="#ddd"
              label={{
                value: "Speed (m/s)",
                position: "insideLeft",
                angle: -90,
                fill: "#ddd",
                offset: 10,
              }}
              tick={{ fill: "#aaa" }}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "8px",
              }}
              formatter={(value, name, props) => {
                if (name === "speed")
                  return [
                    `${value} m/s (${props.payload.direction})`,
                    "Avg Wind Speed",
                  ];
                return [`${value} m/s`, "Max Gust"];
              }}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Avg Wind Speed"
            />
            <Line
              type="monotone"
              dataKey="gust"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              name="Max Gust"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-zinc-400 text-center mt-3">
          Daily average wind speed and maximum gusts
        </p>
      </div>
    </div>
  );
};

export default WindChart;
