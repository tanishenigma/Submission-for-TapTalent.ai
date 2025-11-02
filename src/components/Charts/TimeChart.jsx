import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { fetchWeatherTrends } from "../../api/fetchHourlyWeekly";
import { useTemperature } from "../../hooks/useTemperature";

export default function TimeChart({ cityId }) {
  const { unit, convertTemp, getTempSymbol } = useTemperature();
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);
      const result = await fetchWeatherTrends(cityId);
      if (result) {
        const formattedHourly = result.hourly.slice(0, 12).map((hour) => ({
          time: new Date(hour.dt * 1000).getHours() + ":00",
          temp: convertTemp(hour.temp),
        }));

        const formattedDaily = result.daily.map((day) => ({
          day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          temp: convertTemp(day.temp.day),
        }));

        setHourlyData(formattedHourly);
        setDailyData(formattedDaily);
      }
      setLoading(false);
    };

    if (cityId) {
      loadWeatherData();
    }
  }, [cityId, unit, convertTemp]);

  if (loading) {
    return (
      <div className="text-center text-gray-400 p-8 bg-zinc-800 rounded-xl">
        Loading temperature trends...
      </div>
    );
  }
  const tempLabel = getTempSymbol();
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Hourly Chart */}
      <div className="p-6 bg-zinc-800 rounded-xl shadow-lg">
        <h2 className="text-center text-xl font-semibold text-white mb-4">
          Hourly Temperature Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={hourlyData}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="time" stroke="#ddd" tick={{ fill: "#aaa" }} />
            <YAxis
              stroke="#ddd"
              label={{
                value: tempLabel,
                position: "insideLeft",
                angle: -90,
                fill: "#ddd",
                offset: 10,
              }}
              tick={{ fill: "#aaa" }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "8px",
              }}
              formatter={(value) => [`${value}${tempLabel}`, "Temperature"]}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Temperature"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-zinc-400 text-center mt-3">
          Next 12 hours temperature forecast
        </p>
      </div>

      {/* Daily Chart */}
      <div className="p-6 bg-zinc-800 rounded-xl shadow-lg">
        <h2 className="text-center text-xl font-semibold text-white mb-4">
          Daily Temperature Trends
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
                value: tempLabel,
                position: "insideLeft",
                angle: -90,
                fill: "#ddd",
                offset: 10,
              }}
              tick={{ fill: "#aaa" }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "8px",
              }}
              formatter={(value) => [`${value}${tempLabel}`, "Avg Temperature"]}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Avg Temperature"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-zinc-400 text-center mt-3">
          Average daily temperature forecast
        </p>
      </div>
    </div>
  );
}
