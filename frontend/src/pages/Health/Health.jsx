import React from "react";
import "./Health.css";
import reviewImage from "./review.avif";
import locationImage from "./geolocation.jpg";
import peerImage from "./psg.png";
import { useSession } from '../../context/SessionContext';
import { Link } from "react-router-dom";

function Health() {
  const { getCurrentAccessRights } = useSession();
  const rights = getCurrentAccessRights();
  
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
                />
                {!hasReviewPrivilege && <div className="tooltip">Reserved for authorized users only</div>}
            </div>
            <Link to="/map"><img src={locationImage} alt="View Locations" className="health-image" /></Link>
            <img src={peerImage} alt="Peer Support Groups" className="health-image" />
        </div>
      </div>
    </div>
  );
}

export default Health;