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
import { fetchPrecipitationTrends } from "../../api/fetchPrecipitation";

const PrecipitationChart = ({ cityId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cityId) return;

    const loadData = async () => {
      setLoading(true);
      const result = await fetchPrecipitationTrends(cityId);
      if (result?.daily) {
        const formatted = result.daily.map((d) => ({
          name: new Date(d.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          precipitation: parseFloat(d.precipitation.toFixed(2)),
        }));
        setData(formatted);
      }
      setLoading(false);
    };

    loadData();
  }, [cityId]);

  if (loading) {
    return (
      <div className="text-center text-gray-400 p-8 bg-zinc-800 rounded-xl">
        Loading precipitation trends...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center text-red-400 p-8 bg-zinc-800 rounded-xl">
        No precipitation data available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-zinc-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-center text-xl font-semibold text-white mb-4">
        Daily Precipitation Trends
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="name"
            stroke="#ddd"
            tick={{ fill: "#aaa" }}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#ddd"
            label={{
              value: "Precipitation (mm)",
              angle: -90,
              position: "insideLeft",
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
            formatter={(value) => [`${value} mm`, "Precipitation"]}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: "10px" }}
          />
          <Line
            type="monotone"
            dataKey="precipitation"
            stroke="#60a5fa"
            strokeWidth={3}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
            name="Precipitation"
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-sm text-zinc-400 text-center mt-3">
        Total daily precipitation (rain + snow) in millimeters
      </p>
    </div>
  );
};

export default PrecipitationChart;
