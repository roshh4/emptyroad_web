"use client";

import React from "react";
import dynamic from "next/dynamic";
import WasteCollectionMetrics from "./components/WasteCollectionReport";
const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });
const SystemData = dynamic(() => import("@/app/components/SystemData"), { ssr: false });

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
        <div className="flex gap-2 text-lg">{icon1}{icon2}</div>
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
          <Card title="Navigation Map" icon1={"📡"} icon2={"⚓"}>
            <div className="h-full w-full">
              <Map />
            </div>
          </Card>
        </div>
        {/* Parameter Data Section */}
        <div className="h-[45%]">
          <Card title="Parameter Data" icon1={"⚙️"} icon2={"📡"}>
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
          <Card title="Camera Feed" icon1={"📷"} icon2={"🔍"}>
            <p className="text-sm text-green-400">AI Object Detection: Active</p>
          </Card>
        </div>
        <div className="h-[35%] flex">
        <Card title="Waste Collection" className="w-full h-full flex flex-col">
         <div className="flex-1 w-full">
          <WasteCollectionMetrics {...wasteData} />
         </div>
         </Card>
        </div>
        <div className="h-[15%]">
          <Card title="System Data">
            <div className="flex gap-4">
              <SystemData/>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlightDashboard;