"use client";

import React from "react";

// Reusable Card Component
const Card = ({ title, icon1, icon2, children }) => {
  return (
    <div className="bg-[#0c1428] rounded-xl p-4 text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          {icon1}
          {icon2}
        </div>
      </div>
      {/* Card Content */}
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
};

const FlightDashboard = () => {
  return (
    <div className="h-screen w-screen bg-[#0a1020] flex p-4 gap-2">
      {/* Left Side (2/3 Width) */}
      <div className="w-2/3 flex flex-col gap-2">
        {/* Navigation & Telemetry Section */}
        <div className="flex h-[55%] gap-2">
          <Card title="Navigation Map" icon1={"📡"} icon2={"⚓"}>
            <p>Lat: 37.7749° N</p>
            <p>Long: 122.4194° W</p>
            <p>Heading: 45°</p>
            <p>Distance to dest: 1.2 km</p>
          </Card>
          <Card title="Telemetry Data" icon1={"📊"} icon2={"🛰️"}>
            <p>Speed: 30 knots</p>
            <p>Battery: 85%</p>
            <p>Altitude: 100m</p>
          </Card>
        </div>
        {/* Parameter Data Section */}
        <div className="h-[45%]">
          <Card title="Parameter Data" icon1={"⚙️"} icon2={"📡"}>
            <p>IMU Data: Stable</p>
            <p>Propeller RPM: 3500</p>
            <p>Obstacle Detection: Clear</p>
          </Card>
        </div>
      </div>

      {/* Right Side (1/3 Width) */}
      <div className="w-1/3 flex flex-col gap-2">
        <div className="h-[45%]">
          <Card title="Camera Feed" icon1={"📷"} icon2={"🔍"}>
            <p>AI Object Detection: Active</p>
          </Card>
        </div>
        <div className="h-[35%]">
          <Card title="Weather Data" icon1={"🌦"} icon2={"📡"}>
            <p>Temp: 25°C</p>
            <p>Windspeed: 15 km/h</p>
          </Card>
        </div>
        <div className="h-[20%]">
          <Card title="Emergency Controls" icon1={"⚠️"} icon2={"🆘"}>
            <button className="bg-red-600 text-white px-4 py-2 rounded">Stop</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded ml-2">Start</button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlightDashboard;
