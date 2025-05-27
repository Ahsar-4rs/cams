import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, ImageOverlay, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Icons for different types
const iconUrls = {
  Repair: "https://cdn-icons-png.flaticon.com/512/4979/4979585.png",
  Infected: "https://cdn-icons-png.flaticon.com/512/16558/16558503.png",
  "Fire Extinguisher": "https://cdn-icons-png.flaticon.com/512/1973/1973044.png",
  Emergency: "https://cdn-icons-png.flaticon.com/512/2960/2960203.png",
  SocialVenue: "https://cdn-icons-png.flaticon.com/512/11743/11743424.png",
  Default: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png"
};

const userLocationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [13, 41],
});

const createCustomIcon = (iconUrl) => {
  return new L.Icon({
    iconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
  });
};

// Optional: Default marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const LocationDisplay = () => {
  const [clickedCoords, setClickedCoords] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setClickedCoords({ lat, lng });
      console.log("Clicked Location:", lat, lng);
    },
  });

  return clickedCoords ? (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        background: "white",
        padding: "8px",
        borderRadius: "8px",
        boxShadow: "0px 0px 6px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <strong>Clicked Location:</strong><br />
      Lat: {clickedCoords.lat.toFixed(6)}<br />
      Lng: {clickedCoords.lng.toFixed(6)}
    </div>
  ) : null;
};

const LocationPicker = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSelect(lat, lng);
    },
  });
  return null;
};

const OpenStreetMapOverlay = ({ selectedFloor }) => {
  const center = [8.914, 76.632];
  const imageBounds = [
    [8.913300, 76.631394],
    [8.914956, 76.632824],
  ];
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const handleMapClick = (lat, lng) => {
    console.log("Clicked at:", lat, lng);
    setSelectedCoords({ lat, lng });
  };

  const floorImages = {
    0: "https://raw.githubusercontent.com/Ahsar-4rs/cams/main/map%20API/svg%20files/MAIN%20BLOCK%20GF_coloured-full.svg",
    1: "https://raw.githubusercontent.com/Ahsar-4rs/cams/main/map%20API/svg%20files/MAIN%20BLOCK%20FF_coloured-full.svg",
    2: "https://raw.githubusercontent.com/Ahsar-4rs/cams/refs/heads/main/map%20API/svg%20files/MAIN%20BLOCK%20SF_coloured-full.svg",
  };

  const overlayImageUrl = floorImages[selectedFloor] || floorImages[0];
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/area/get-areas");
        console.log("Markers from backend:", res.data);
        const filteredMarkers = res.data.filter(marker => marker.floor === selectedFloor);
        setMarkers(filteredMarkers);
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };

    fetchMarkers();
  }, [selectedFloor]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User Location:", latitude, longitude);
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={21}
      maxZoom={25}
      minZoom={18}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "70vh" }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
      />
      <ImageOverlay url={overlayImageUrl} bounds={imageBounds} opacity={0.8} />

      <LocationPicker onSelect={handleMapClick} />

      {selectedCoords && (
        <Marker position={[selectedCoords.lat, selectedCoords.lng]}>
          <Popup>
            Selected Position<br />
            Lat: {selectedCoords.lat.toFixed(6)}<br />
            Lng: {selectedCoords.lng.toFixed(6)}
          </Popup>
        </Marker>
      )}

      {markers.map((marker) => {
        const markerIcon = createCustomIcon(iconUrls[marker.type] || iconUrls["Default"]);
        return (
          <Marker key={marker._id} position={[marker.lat, marker.long]} icon={markerIcon}>
            <Popup>
              <strong>{marker.place}</strong><br />
              Type: {marker.type}<br />
              Floor: {marker.floor}
            </Popup>
          </Marker>
        );
      })}

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
          <Popup>
            <strong>Your Location</strong><br />
            Lat: {userLocation.lat.toFixed(6)}<br />
            Lng: {userLocation.lng.toFixed(6)}
          </Popup>
        </Marker>
      )}

      <LocationDisplay />
    </MapContainer>
  );
};

export default OpenStreetMapOverlay;
