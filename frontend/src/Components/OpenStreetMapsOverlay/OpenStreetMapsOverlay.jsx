import React from "react";
import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OpenStreetMapOverlay = ({ selectedFloor }) => {
  const center = [8.914, 76.632]; // Centered on TKM College
  const imageBounds = [
    [8.913300, 76.631394], // Bottom Left
    [8.914956, 76.632824], // Top Right
  ];

  // Define image URLs for each floor
  const floorImages = {
    GF: "https://raw.githubusercontent.com/Ahsar-4rs/cams/main/map%20API/svg%20files/MAIN%20BLOCK%20GF_coloured-full.svg",
    FF: "https://raw.githubusercontent.com/Ahsar-4rs/cams/main/map%20API/svg%20files/MAIN%20BLOCK%20FF_coloured-full.svg",
    SF: "https://raw.githubusercontent.com/Ahsar-4rs/cams/main/map%20API/svg%20files/MAIN%20BLOCK%20SF_coloured-full.svg",
  };

  const overlayImageUrl = floorImages[selectedFloor] || floorImages["GF"]; // Default to GF

  return (
    <MapContainer
      center={center}
      zoom={21}
      maxZoom={25}
      minZoom={18}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "70vh" }}
    >
      {/* Tile Layer */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
      />

      {/* Overlay Image */}
      <ImageOverlay 
        url={overlayImageUrl} 
        bounds={imageBounds} 
        opacity={0.8} 
      />
    </MapContainer>
  );
};

export default OpenStreetMapOverlay;
