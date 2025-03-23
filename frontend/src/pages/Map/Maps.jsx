import React, { useEffect, useState } from 'react';
import './Maps.css';
import map from '../../../../map API/svg files/MAIN BLOCK GF_coloured-full.svg';

// Example function to convert Lat/Lng to SVG Coordinates
const convertLatLngToSVG = (lat, lng, mapBounds, svgWidth, svgHeight) => {
  const { minLat, maxLat, minLng, maxLng } = mapBounds;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * svgWidth;
  const y = svgHeight - ((lat - minLat) / (maxLat - minLat)) * svgHeight;

  return { x, y };
};

function Maps() {
  const [repairAreas, setRepairAreas] = useState([]);

  useEffect(() => {
    // Fetch repair area locations (Replace with actual API)
    fetch('https://your-api.com/repair-areas')
      .then(res => res.json())
      .then(data => setRepairAreas(data))
      .catch(err => console.error('Error fetching repair areas:', err));
  }, []);

  // Define Map Boundaries (Min/Max lat/lng of your campus)
  const mapBounds = {
    minLat: 12.34, maxLat: 12.35, // Replace with actual values
    minLng: 77.56, maxLng: 77.57
  };

  return (
    <div className='Maps'>
      <div className='geoBar'>
        <h1 className='geoTitle'>Geolocation Services</h1>
        <div className='floorOptions'>
          <ul>
            <li>Ground Floor</li>
            <li>First Floor</li>
            <li>Second Floor</li>
          </ul>
        </div>
      </div>

      <div className="mapContainer">
        <svg width="800" height="600" viewBox="0 0 800 600">
          {/* Embed the campus map */}
          <image href={map} width="800" height="600" />

          {/* Render Repair Area Markers */}
          {repairAreas.map((area, index) => {
            const { x, y } = convertLatLngToSVG(area.lat, area.lng, mapBounds, 800, 600);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="10"
                fill="blue"
                stroke="white"
                strokeWidth="2"
                onClick={() => alert(`Repair Area: ${area.name}`)}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default Maps;
