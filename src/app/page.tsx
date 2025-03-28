"use client";

import React from "react";
import dynamic from "next/dynamic";
import WasteCollectionMetrics from "./components/WasteCollectionReport";
const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });
const SystemData = dynamic(() => import("@/app/components/SystemData"), { ssr: false });

import {
  Wifi,
  Phone,
  Clock,
  Compass,
  Box,
  AlertCircle,
  Download,
  Camera,
  Trash2,
  BarChart3,
  Navigation,
  Anchor,
  Droplet,
  Wind,
  Zap,
  FileDown,
  Cog,
  Satellite,
  Search,
} from "lucide-react";

const wasteData = {
  beltFillLevel: 75, // Example value
  wasteCountPerHour: 120,
  wasteSorting: {
    organic: 50,
    plastic: 30,
    paper: 20,
    metal: 10,
    other: 5,
  },
  nextDockingTime: "12:30 PM",
};

// 🔹 Reusable Card Component with Tailwind Styling
const Card = ({ title, icon1, icon2, children }) => {
  return (
    <div className="bg-[#0c1428] rounded-xl p-4 text-white flex flex-col h-full w-full">
      {/* Header */}
      <div className="border-b border-gray-600 pb-2 flex justify-between items-center w-full">
        <h2 className="text-xs font-semibold tracking-wide">{title}</h2>
        <div className="flex gap-3 text-lg px-2">
          {icon1 && <span className="text-white">{icon1}</span>}
          {icon2 && <span className="text-white">{icon2}</span>}
        </div>
      </div>

      {/* Card Content (Expanding Fully) */}
      <div className="flex-1 flex flex-col justify-center items-center w-full h-full pt-3">
        {children}
      </div>
    </div>
  );
};

const FlightDashboard = () => {
  return (
    <div className="h-screen w-screen bg-[#0a1020] flex p-4 gap-2">
      {/* Left Side (2/3 Width) */}
      <div className="w-2/3 flex flex-col gap-2">
        {/* Navigation & Telemetry Section */}
        <div className="flex h-[100%] gap-2">
          <Card title="Navigation Map" icon1={<Navigation size={16} />} icon2={<Anchor size={16} />}>
            <div className="h-full w-full">
              <Map />
            </div>
          </Card>
        </div>

        {/* Parameter Data Section */}
        <div className="h-[45%]">
          <Card title="Parameter Data" icon1={<Cog size={16} />} icon2={<Satellite size={16} />}>
            <div className="text-sm space-y-1">
              <p>IMU Data: <span className="font-bold">Stable</span></p>
              <p>Propeller RPM: <span className="font-bold">3500</span></p>
              <p>Obstacle Detection: <span className="font-bold text-green-400">Clear</span></p>
              {/* <WasteCollectionMetrics{...wasteData}/> */}
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side (1/3 Width) */}
      <div className="w-1/3 flex flex-col gap-2">
        <div className="h-[50%]">
          <Card title="Camera Feed" icon1={<Camera size={16} />} icon2={<Search size={16} />}>
            <p className="text-sm text-green-400">AI Object Detection: Active</p>
          </Card>
        </div>
        <div className="h-[35%]">
          <Card title="Weather Data" icon1={<Droplet size={16} />} icon2={<Wind size={16} />}>
            <div className="text-sm space-y-1">
              {/* <p>Temp: <span className="font-bold">25°C</span></p>
              <p>Windspeed: <span className="font-bold">15 km/h</span></p>
              <WasteCollectionMetrics{...wasteData} /> */}
            </div>
          </Card>
        </div>
        <div className="h-[15%]">
          <Card title="System Data" icon1={<Box size={16} />}>
            <div className="flex gap-4">
              <SystemData />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlightDashboard;