import React, { useState, useEffect } from "react";

import map from "../assets/map.png";
function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={map}
        alt="map"
        className="w-64 h-64 rounded-full border-gray-700 dark:border-white border-2"
      />
      <h2 className="text-gray-500 dark:text-gray-400">
        Your current location
      </h2>

      {position.latitude && position.longitude ? (
        <p className="text-gray-500 dark:text-gray-400">
          Latitude: {position.latitude}, Longitude: {position.longitude}
        </p>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      )}
    </div>
  );
}

export default MyLocation;
