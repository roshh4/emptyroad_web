import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WasteCollectionMetricsProps {
  beltFillLevel: number;
  wasteCountPerHour: number;
  wasteSorting?: {
    organic?: number;
    plastic?: number;
    paper?: number;
    metal?: number;
    other?: number;
  };
  nextDockingTime: string;
}

const WasteCollectionMetrics: React.FC<WasteCollectionMetricsProps> = ({
  beltFillLevel = 0,
  wasteCountPerHour = 0,
  wasteSorting = {},
  nextDockingTime = 'N/A',
}) => {
  // Safely handle potential undefined values
  const safeSorting = {
    organic: 0,
    plastic: 0,
    paper: 0,
    metal: 0,
    other: 0,
    ...wasteSorting
  };

  const totalWasteCollected = Object.values(safeSorting).reduce((a, b) => a + b, 0);
  
  const wasteData = Object.entries(safeSorting)
    .filter(([_, count]) => count > 0)
    .map(([type, count]) => ({
      type,
      count,
    }));

  return (
    <div className="w-full h-full flex flex-col space-y-2 text-white">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Belt Fill */}
        <div className="bg-[#1c2333] p-2 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Belt Fill</p>
          <div className="flex items-center space-x-2">
            <div 
              className="h-2 w-full bg-gray-700 rounded-full overflow-hidden"
            >
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${Math.min(Math.max(beltFillLevel, 0), 100)}%` }}
              />
            </div>
            <span className="text-xs text-green-400">{beltFillLevel}%</span>
          </div>
        </div>

        {/* Waste Count */}
        <div className="bg-[#1c2333] p-2 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Waste/Hour</p>
          <p className="text-sm font-bold text-white">{wasteCountPerHour}</p>
        </div>

        {/* Next Docking */}
        <div className="bg-[#1c2333] p-2 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Next Dock</p>
          <p className="text-sm font-bold text-blue-400">{nextDockingTime}</p>
        </div>

        {/* Total Waste */}
        <div className="bg-[#1c2333] p-2 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Total Waste</p>
          <p className="text-sm font-bold text-white">{totalWasteCollected}</p>
        </div>
      </div>

      {/* Waste Composition Chart */}
      <div className="bg-[#1c2333] rounded-lg p-2 h-32">
        <p className="text-xs text-gray-400 mb-1">Waste Composition</p>
        {wasteData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={wasteData}>
              <XAxis 
                dataKey="type" 
                tick={{ fill: 'white', fontSize: 10 }} 
                axisLine={{ stroke: '#4a5568' }}
              />
              <YAxis 
                tick={{ fill: 'white', fontSize: 10 }} 
                axisLine={{ stroke: '#4a5568' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2d3748', 
                  borderColor: '#4a5568' 
                }}
                itemStyle={{ color: 'white' }}
              />
              <Bar dataKey="count" fill="#4299e1" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-xs text-gray-500 text-center py-4">No waste data available</p>
        )}
      </div>
    </div>
  );
};

export default WasteCollectionMetrics;