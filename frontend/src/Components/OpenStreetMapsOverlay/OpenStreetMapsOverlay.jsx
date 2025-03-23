import React from "react";
import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Create a CSS class for the rotation
const rotationStyle = {
  transform: "rotate(180deg)",
  transformOrigin: "center center"
};

const OpenStreetMapOverlay = () => {
  const center = [8.914, 76.632]; // Centered on TKM College
  const imageBounds = [
    [8.913300, 76.631394], // Bottom Left
    [8.914956, 76.632824], // Top Right
  ];

  const overlayImageUrl =
    "https://raw.githubusercontent.com/Ahsar-4rs/cams/main/map%20API/svg%20files/MAIN%20BLOCK%20GF_coloured-full.svg";

  return (
    <MapContainer
      center={center}
      zoom={21} // Increased zoom level
      maxZoom={25} // Allow even further zooming
      minZoom={18} // Prevent excessive zooming out
      scrollWheelZoom={true} // Enable scroll zooming
      style={{ width: "100%", height: "70vh" }}
    >
      {/* Label-Free OpenStreetMap Tiles */}
      <TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
/>



      {/* Rotated Overlay Image */}
      <ImageOverlay 
        url={overlayImageUrl} 
        bounds={imageBounds} 
        opacity={0.8} 
        style={rotationStyle}
      />
    </MapContainer>
  );
};

export default OpenStreetMapOverlay;