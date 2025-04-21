import React, { useState } from 'react';
import OpenStreetMapOverlay from '../../Components/OpenStreetMapsOverlay/OpenStreetMapsOverlay.jsx';
import './Maps.css';

function Maps() {
  const [menu, setMenu] = useState("GF"); // Default to Ground Floor

  // Map floor names to floor numbers
  const floorMap = {
    GF: 0,
    FF: 1,
    SF: 2
  };

  return (
    <div className='Maps'>
      <h1>TKM COLLEGE OF ENGINEERING</h1>
      <div className='MenuBar'>
        <ul>
          <li onClick={() => setMenu("GF")} className={menu === "GF" ? "active" : ""}>Ground Floor</li>
          <li onClick={() => setMenu("FF")} className={menu === "FF" ? "active" : ""}>First Floor</li>
          <li onClick={() => setMenu("SF")} className={menu === "SF" ? "active" : ""}>Second Floor</li>
        </ul>
      </div>
      {/* Pass selected floor as a prop */}
      <OpenStreetMapOverlay selectedFloor={floorMap[menu]} />
    </div>
  );
}

export default Maps;
