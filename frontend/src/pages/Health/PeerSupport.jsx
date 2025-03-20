import React from "react";
import "./PeerSupport.css";
import { useNavigate } from "react-router-dom"; 


const diseases = ["Hepatitis", "Chicken Pox"];

const PeerSupport = () => {
  const navigate = useNavigate(); 
  return (
    <div className="peer-container">
      <h1 className="peer-title">Select a Support Group</h1>
      <div className="group-list">
        {diseases.map((disease, index) => (
          <button
            key={index}
            className="support-group-button"
            onClick={() => navigate(`/chat/${disease}`)} 
          >
            {disease}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeerSupport;
