import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Health.css";
import reviewImage from "./review.avif";
import locationImage from "./geolocation.jpg";
import peerImage from "./psg.png";
import { useSession } from '../../context/SessionContext';
import { useNavigate } from 'react-router-dom';

function Health() {
  const navigate = useNavigate(); 
  const { getCurrentAccessRights } = useSession();
  const rights = getCurrentAccessRights();
  
  const routeHealthLocation = () => {
    navigate("/Health-location");
  }

  // Check if user can review health

  const hasReviewPrivilege = rights.canReviewHealth;

  return (
    <div className="health-container">
      <div className="content-wrapper">
        <h1 className="health-title">Health Services</h1>
        <div className="button-group">

            <div className="tooltip-container">
            <img 
              src={reviewImage} 
              alt="Vouch" 
              className={`health-image ${!hasReviewPrivilege ? 'disabled' : ''}`}
              onClick={() => hasReviewPrivilege && navigate("/review-health")}
              style={{ cursor: hasReviewPrivilege ? "pointer" : "not-allowed" }}
            /> 
            {!hasReviewPrivilege && <div className="tooltip">Reserved for authorized users only</div>}
            </div>

          <img 
            src={locationImage} 
            alt="View Locations" 
            className="health-image" 
            onClick={() => navigate("/locations")} 
            style={{ cursor: "pointer" }}
          />

          <img 
            src={peerImage} 
            alt="Peer Support Groups" 
            className="health-image" 
            onClick={() => navigate("/peersupport")} 
            style={{ cursor: "pointer" }} 
          />
          
        </div>
      </div>
    </div>
  );
}

export default Health;
