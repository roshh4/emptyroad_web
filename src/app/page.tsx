"use client";

import React from "react";
import dynamic from "next/dynamic";
import WasteCollectionMetrics from "./components/WasteCollectionReport";
import ParameterDataCard from "./components/ParameterData";
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
import BatteryComponent from "./components/Battery";

const wasteData = {
  beltFillLevel: 75,
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

const Card = ({ title, icon1, icon2, children }) => {
  return (
    <div className="bg-[#0c1428] rounded-xl p-4 text-white flex flex-col h-full w-full">
      <div className="border-b border-gray-600 pb-2 flex justify-between items-center w-full h-[10%]">
        <h2 className="text-xs font-semibold tracking-wide">{title}</h2>
        <div className="flex gap-2 text-sm px-2 py-1">
          {icon1 && <span className="text-white">{icon1}</span>}
          {icon2 && <span className="text-white">{icon2}</span>}
        </div>
      </div>
      <div className="flex-1 w-full h-[85%] pt-2">{children}</div>
    </div>
  );
};

const FlightDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-[#0a1020] flex flex-col lg:flex-row p-4 gap-4">
      
      {/* Left Side (Map + Parameter Data) */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="h-[50vh] md:h-[60vh] flex gap-4">
          <Card title="Navigation Map" icon1={<Navigation size={16} />} icon2={<Anchor size={16} />}>
            <Map />
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 h-[40vh]">
          <div className="w-full sm:w-1/2">
            <Card title="Parameter Data" icon1={<Cog size={16} />} icon2={<Satellite size={16} />}>
              <ParameterDataCard />
            </Card>
          </div>

          <div className="w-full sm:w-1/2">
            <Card title="System Performance" icon1={<BarChart3 size={16} />} icon2={<AlertCircle size={16} />}>
              <BatteryComponent />
            </Card>
          </div>
        </div>
      </div>

      {/* Right Side (Camera Feed, Waste Collection, System Data) */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="h-[35vh]">
          <Card title="Camera Feed" icon1={<Camera size={16} />} icon2={<Search size={16} />}>
            <p className="text-sm text-green-400">AI Object Detection: Active</p>
          </Card>
        </div>

        <div className="h-[45vh]">
          <Card title="Waste Collection">
            <WasteCollectionMetrics {...wasteData} />
          </Card>
        </div>

        <div className="h-[20vh]">
          <Card title="System Data" icon1={<Box size={16} />}>
            <SystemData />
          </Card>
        </div>
      </div>

    </div>
  );
};

export default FlightDashboard;
