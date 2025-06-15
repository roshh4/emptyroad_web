import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WasteData {
  beltFillLevel: number;
  wasteCountPerHour: number;
  wasteSorting: {
    organic: number;
    plastic: number;
    paper: number;
    metal: number;
    other: number;
  };
  nextDockingTime: string;
}

const WasteDashboard: React.FC<WasteData> = (props) => {
  const [data, setData] = useState<WasteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/waste-data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading waste data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const {
    beltFillLevel = 0,
    wasteCountPerHour = 0,
    nextDockingTime = "N/A",
    wasteSorting = {},
  } = data || {};

  const safeSorting = {
    organic: 0,
    plastic: 0,
    paper: 0,
    metal: 0,
    other: 0,
    ...wasteSorting,
  };

  const totalWasteCollected = Object.values(safeSorting).reduce((a, b) => a + b, 0);

  const wasteData = Object.entries(safeSorting)
    .filter(([_, count]) => count > 0)
    .map(([type, count]) => ({
      type,
      count,
    }));

  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <div className="grid grid-cols-2 gap-[2%] md:grid-cols-4">
        {/* Belt Fill */}
        <div className="bg-[#1c2333] p-[10%] rounded-lg flex flex-col justify-between">
          <p className="text-xs text-gray-400">Bin Fill</p>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full pl-[5%] bg-green-500"
                style={{ width: `${Math.min(Math.max(beltFillLevel, 0), 100)}%` }}
              />
            </div>
            <span className="text-xs text-green-400">{beltFillLevel}%</span>
          </div>
        </div>

        {/* Waste Count */}
        <div className="bg-[#1c2333] p-[10%] rounded-lg flex flex-col justify-between">
          <p className="text-xs text-gray-400">Waste/Hour</p>
          <p className="text-sm pl-[5%] font-bold text-white">{wasteCountPerHour}</p>
        </div>

        {/* Next Docking */}
        <div className="bg-[#1c2333] p-[10%] rounded-lg flex flex-col justify-between">
          <p className="text-xs text-gray-400">Next Dock</p>
          <p className="text-sm pl-[2%] font-bold text-blue-400">{nextDockingTime}</p>
        </div>

        {/* Total Waste */}
        <div className="bg-[#1c2333] p-[10%] rounded-lg flex flex-col justify-between">
          <p className="text-xs text-gray-400">Total Waste</p>
          <p className="text-sm pl-[5%] font-bold text-white">{totalWasteCollected}</p>
        </div>
      </div>

      {/* Waste Composition Chart */}
      <div className="w-full bg-[#1c2333] rounded-lg p-3 flex flex-col flex-grow min-h-[150]">
        <p className="text-xs text-gray-400">Waste Composition</p>
        {wasteData.length > 0 ? (
          <div className="flex justify-center items-center pt-1 pr-[4%]">
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={wasteData}>
                <XAxis
                  dataKey="type"
                  tick={{ fill: "white", fontSize: 10 }}
                  axisLine={{ stroke: "#4a5568" }}
                />
                <YAxis tick={{ fill: "white", fontSize: 10 }} axisLine={{ stroke: "#4a5568" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2d3748",
                    borderColor: "#4a5568",
                  }}
                  itemStyle={{ color: "white" }}
                />
                <Bar dataKey="count" fill="#4299e1" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-xs text-gray-500 text-center py-4">No waste data available</p>
        )}
      </div>
    </div>
  );
};

export default WasteDashboard;
