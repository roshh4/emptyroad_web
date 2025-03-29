"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const pinIcon = L.icon({
  iconUrl: "/pin.png", 
  iconSize: [32, 32], 
  iconAnchor: [16, 32],
  popupAnchor: [0, -32], 
});

const MapComponent = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="h-full w-full">
      {position ? (
        <MapContainer center={position} zoom={13} className="h-full w-full rounded-2xl overflow-hidden">
          {/* OpenStreetMap Layer */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Marker with Custom Pin Image */}
          <Marker position={position} icon={pinIcon}>
            <Popup>You are here! 📍</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-center text-white">Fetching your location...</p>
      )}
    </div>
  );
};

export default MapComponent;
