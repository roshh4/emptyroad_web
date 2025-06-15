import React, { useState, useEffect } from "react";
import { Navigation2, Battery, Compass, Cpu, Wifi, Signal } from "lucide-react";

const ParameterDataCard = () => {
  const [telemetry, setTelemetry] = useState({
    gps: {
      status: "3D Fix",
      lat: 13.082700,
      lng: 80.270700,
      alt: 120.7,
      satellites: 8,
      hdop: 1.2
    },
    ekf: {
      status: "Healthy",
      velocity: [1.2, 0.5, 0.1],
      position: [13.1, 80.3, 120.5],
      heading: 45.2
    },
    system: {
      groundSpeed: 14.5,
      airSpeed: 12.3,
      throttle: 65,
      mode: "GUIDED",
      armed: true
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        gps: {
          ...prev.gps,
          lat: prev.gps.lat + (Math.random() - 0.5) * 0.0001,
          lng: prev.gps.lng + (Math.random() - 0.5) * 0.0001,
          alt: prev.gps.alt + (Math.random() - 0.5) * 0.1
        },
        system: {
          ...prev.system,
          groundSpeed: prev.system.groundSpeed + (Math.random() - 0.5) * 0.5,
          airSpeed: prev.system.airSpeed + (Math.random() - 0.5) * 0.3,
          throttle: Math.max(0, Math.min(100, prev.system.throttle + (Math.random() - 0.5) * 2))
        }
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full rounded-lg text-white mb-0">
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Navigation2 className="h-4 w-4 text-blue-400" />
            <p className="text-xs text-gray-400">GPS Status</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-green-400">{telemetry.gps.status}</p>
            <div className="flex items-center gap-1">
              <Signal className="h-3 w-3 text-blue-400" />
              <span className="text-xs">{telemetry.gps.satellites} sats</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="h-4 w-4 text-purple-400" />
            <p className="text-xs text-gray-400">Heading</p>
          </div>
          <p className="text-sm font-bold">{telemetry.ekf.heading.toFixed(1)}°</p>
        </div>
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="h-4 w-4 text-green-400" />
            <p className="text-xs text-gray-400">GPS Coordinates</p>
          </div>
          <p className="text-sm font-bold p-1">Lat: {telemetry.gps.lat.toFixed(6)}</p>
          <p className="text-sm font-bold p-1">Lng: {telemetry.gps.lng.toFixed(6)}</p>
          <p className="text-sm font-bold p-1">Alt: {telemetry.gps.alt.toFixed(1)} m MSL</p>
        </div>
        <div className="bg-[#1c2333] p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-4 w-4 text-yellow-400" />
            <p className="text-xs text-gray-400">EKF Status</p>
          </div>
          <p className="text-md font-bold text-green-400 pt-3">{telemetry.ekf.status}</p>
          <p className="text-sm mt-1">HDOP: {telemetry.gps.hdop.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default ParameterDataCard;