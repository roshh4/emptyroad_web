import React, { useState } from "react";
import { Navigation2, Battery, Compass, Cpu } from "lucide-react";


const ParameterDataCard = () => {
    const [activeTab, setActiveTab] = useState("telemetry");
  return (
    <div className="w-full h-full rounded-lg text-white">
      <div className="grid grid-cols-4 bg-gray-700 rounded-lg p-2 mb-4">

      </div>
      
      <div className="grid grid-cols-3 gap-x-2 gap-y-2 pt-2 ">
        {/* Row 1 */}
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <p className="text-xs text-gray-400">GPS Status</p>
          <p className="text-sm font-bold text-green-400">3D Fix</p>
        </div>
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <p className="text-xs text-gray-400">GPS Coordinates</p>
          <p className="text-xs font-bold">Lat: 13.082700</p>
          <p className="text-xs font-bold">Lng: 80.270700</p>
        </div>
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <p className="text-xs text-gray-400">GPS Altitude</p>
          <p className="text-xs font-bold">120.7 m MSL</p>
        </div>
        
        {/* Row 2 */}
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <p className="text-xs text-gray-400">Ground Speed</p>
          <p className="text-xs font-bold">14.5 m/s</p>
        </div>
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <p className="text-xs text-gray-400">EKF Status</p>
          <p className="text-sm font-bold text-green-400">Healthy</p>
        </div>
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <p className="text-xs text-gray-400">EKF Estimates</p>
          <p className="text-xs font-bold">Velocity: [1.2, 0.5, 0.1]</p>
          <p className="text-xs font-bold">Position: [13.1, 80.3, 120.5]</p>
        </div>
      </div>
    </div>
  );
};

export default ParameterDataCard;